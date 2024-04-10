import { Injectable } from '@angular/core';
import { Post } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class FullscreenPostService {
  constructor() { }

  getReOrganisedData(post: Post, posts: Post[]) {
    const tmpPost = { ...post };
    const tmpPosts = [...posts];
    const postIndx = this.getPostIndex(tmpPost, tmpPosts);
    if (!postIndx) return posts;
    const prevPosts: Post[] = tmpPosts.slice(0, postIndx);
    const nextPosts: Post[] = tmpPosts.slice(postIndx+1);
    return [tmpPost, ...nextPosts, ...prevPosts];
  }

  getPostIndex(post: Post, posts: Post[]) {
    delete post.pageFrom;
    // @ts-ignore
    delete post.type;
    for (let postIndx = 0; postIndx < posts.length; postIndx++) {
      const tmpPost = {... posts[postIndx]};
      // @ts-ignore
      delete tmpPost?.type
      if (JSON.stringify(post) === JSON.stringify(tmpPost))
        return postIndx;
    }
    return undefined;
  }
}
