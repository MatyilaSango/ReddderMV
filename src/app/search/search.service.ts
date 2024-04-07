import { Injectable } from '@angular/core';
import axios from 'axios';
import { MEDIA } from '../emums/enums';
import { Post } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private name: string;
  private type: string;
  private lastPostAfter: string | undefined;
  private userData: Post[]

  constructor() {
    this.name = ""
    this.type = ""
    this.userData = []
    this.lastPostAfter = undefined
  }

  async getData(name: string, type: string) {
    if (type === "subreddit" || type === undefined || type === null || type === "") type = "r";

    if(this.name !== name || this.type !== type){
      this.name = name
      this.type = type
      this.lastPostAfter = undefined
      this.userData = []
    }

    try {
      const data = await this.fetchData(name, type, this.lastPostAfter);
      this.lastPostAfter = data?.data?.after ? data.data.after : "";
      data?.data?.children.map((child: any) => {
        this.formatData(child.data);
      })
    } catch (error) {
    }

    return {name: this.name, type_: this.type, data: this.userData}
  }

  private async fetchData(name: string, type: string, lastPostAfter?: string | undefined) {
    try {
      return (await axios.get(lastPostAfter
        ? `https://www.reddit.com/${type}/${name}.json?limit=10&after=${lastPostAfter}`
        : `https://www.reddit.com/${type}/${name}.json?limit=10`
      )).data;

    } catch (AxiosError) {
      alert(
        `No such account ${name} found with type ${type}! ${this.lastPostAfter}`
      );
    }  
  }

  private formatData = (data: any) => {
    if (data.is_video) {
      if (!this.userData.includes(data.media?.reddit_video?.fallback_url) && data.media?.reddit_video?.fallback_url !== undefined) {
        const postData: Post = {
          link: data.media?.reddit_video?.fallback_url, 
          type: MEDIA.video, 
          ups: data?.ups, 
          title: data?.title,
          downs: data?.downs,
          author: data?.author
        }
        this.userData = [...this.userData, postData];
      }
    } else {
      if (this.isMedia(data.url)) {
        if (data.url.includes("redgifs") || data.url.includes("gifv")) {
          if (!this.userData.includes(data.preview?.reddit_video_preview?.fallback_url) && data.preview?.reddit_video_preview?.fallback_url !== undefined) {
            const postData: Post = {
              link: data.preview?.reddit_video_preview?.fallback_url, 
              type: MEDIA.video, 
              ups: data?.ups, 
              title: data?.title,
              downs: data?.downs,
              author: data?.author
            }
            this.userData = [...this.userData, postData];
          }
        } else {
          if (!this.userData.includes(data.url) && data.url !== undefined) {
            const postData: Post = {
              link: data.url, 
              type: MEDIA.Image, 
              ups: data?.ups, 
              title: data?.title,
              downs: data?.downs,
              author: data?.author
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
    if (this.isImage(e) || this.isVideo(e)) return true;
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
    if (e.includes("redgif") || e.includes(".mp4") || e.includes(".gifv") || e.includes(".gif") || e.includes(".ts")) return true;
    return false;
  };
}
