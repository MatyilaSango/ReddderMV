import { Injectable } from '@angular/core';
import cheerio from "cheerio"
import { User } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class SearchComponentService {
  isFound: boolean;

  constructor() { 
    this.isFound = false
  }

  async getData(name: string){
    this.isFound = false
    // const communitiesPage =  await (await fetch(`https://www.reddit.com/search/?q=${name}&type=sr`)).text();
    // const peoplePage = await (await fetch(`https://www.reddit.com/search/?q=${name}&type=user`)).text();
    // const accounts = [...new Set([...this.getSearchAccounts(communitiesPage), ...this.getSearchAccounts(peoplePage)])]
    const accounts = [{name, type_: "r"}, {name, type_: "u"}]
    if (accounts.length > 1) this.isFound = true
    return {isFound: this.isFound, accounts}
  }

  private getSearchAccounts = (page: string) => {
    let subreditsFound: User[] = []
    let $ = cheerio.load(page)
    $("body").find("a").each(function (this) {
      if ($(this).attr("href")?.includes("/r/")) {
        let textLink = $(this).attr("href")
        const name = String(textLink?.substring(1, textLink.length)).replaceAll("/", "")
        subreditsFound.push({name , type_: "r"})
      }
      else if($(this).attr("href")?.includes("/user/")){
        let textLink = $(this).attr("href")
        const name = String(textLink?.substring(1, textLink.length)).replaceAll("/", "")
        subreditsFound.push({name, type_: "u"})
      }
    })
    return subreditsFound
  }
}
