import { Injectable } from '@angular/core';
import axios from 'axios';
import { MEDIA } from '../enums/enums';
import { Post } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class SearchComponentService {
  private name: string;
  private type: string;
  private lastPostAfter: string | undefined;
  private userData: Post[];
  private isFound: boolean;
  private isFetchingData: boolean

  constructor() {
    this.name = ""
    this.type = ""
    this.userData = []
    this.lastPostAfter = undefined
    this.isFound = true
    this.isFetchingData = false
  }

  async getData(name: string, type: string) {
    if(this.isFetchingData) return {name: this.name, type_: this.type, data: this.userData, isFound: this.isFound}
    if (type === undefined || type === null || type === "") type = "r";

    if(this.name !== name || this.type !== type){
      this.name = name
      this.type = type
      this.lastPostAfter = undefined
      this.userData = []
      this.isFound = true
    }

    try {
      this.isFetchingData = true
      if(this.lastPostAfter === "" || !name || !type){
        this.isFetchingData = false
        return {name: this.name, type_: this.type, data: this.userData, isFound: this.isFound}
      } 
      const data = await this.fetchData(name, type, this.lastPostAfter);
      this.lastPostAfter = data?.data?.after ? data.data.after : "";
      data?.data?.children.map((child: any) => {
        this.formatData(child.data);
      })
    } catch (error) {
    }

    this.isFetchingData = false
    return {name: this.name, type_: this.type, data: this.userData, isFound: this.isFound}
  }

  private async fetchData(name: string, type: string, lastPostAfter?: string | undefined) {
    try {
      return (await axios.get(lastPostAfter
        ? `https://www.reddit.com/${type}/${name}.json?limit=10&after=${lastPostAfter}`
        : `https://www.reddit.com/${type}/${name}.json?limit=10`
      )).data;

    } catch (AxiosError) {
      this.isFound = false
    }  
  }

  private formatData = (data: any) => {
    if (data.is_video) {
      if (!this.userData.includes(data.media?.reddit_video?.fallback_url) && data.media?.reddit_video?.fallback_url !== undefined) {
        const postData: Post = {
          link: data.media?.reddit_video?.fallback_url, 
          _type: MEDIA.video, 
          ups: data?.ups, 
          title: data?.title,
          downs: data?.downs,
          author: data?.author,
          thumbnail: data?.thumbnail
        }
        this.userData = [...this.userData, postData];
      }
    } else {
      if (this.isMedia(data.url)) {
        if (data.url.includes("redgifs") || data.url.includes("gifv")) {
          if (!this.userData.includes(data.preview?.reddit_video_preview?.fallback_url) && data.preview?.reddit_video_preview?.fallback_url !== undefined) {
            const postData: Post = {
              link: data.preview?.reddit_video_preview?.fallback_url, 
              _type: MEDIA.video, 
              ups: data?.ups, 
              title: data?.title,
              downs: data?.downs,
              author: data?.author,
              thumbnail: data?.thumbnail
            }
            this.userData = [...this.userData, postData];
          }
        } else {
          if (!this.userData.includes(data.url) && data.url !== undefined) {
            const postData: Post = {
              link: data.url, 
              _type: this.isGif(data.url) ? MEDIA.Gif : MEDIA.Image, 
              ups: data?.ups, 
              title: data?.title,
              downs: data?.downs,
              author: data?.author,
              thumbnail: data?.thumbnail
            }
            this.userData = [...this.userData, postData]
          }
        }
      }
    }
  };

  
  /**
   * Check if is media.
   * 
   * @param e link
   * @returns boolean
   */
  isMedia = (e: string) => {
    if (typeof e === "undefined") return false;
    if (this.isImage(e) || this.isVideo(e) || this.isGif(e)) return true;
    return false;
  };

  /**
   * Check if is image.
   * 
   * @param e link
   * @returns boolean
   */
  isImage = (e: string) => {
    if (e.includes(".png") || e.includes(".jpg") || e.includes(".jpeg") || e.includes(".webp")) return true;
    return false;
  };

  /**
   * Check if is video.
   * 
   * @param e link
   * @returns boolean
   */
  isVideo = (e: string) => {
    if (e.includes("redgif") || e.includes(".mp4") || e.includes(".gifv") || e.includes(".ts")) return true;
    return false;
  };

  /**
   * Check if is gif.
   * 
   * @param e link
   * @returns boolean
   */
  isGif = (e: string) => {
    if(e.includes(".gif")) return true;
    return false;
  }
}
