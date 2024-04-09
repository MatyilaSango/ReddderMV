export const enum MEDIA {
    video = "video",
    Image = "image",
    Gif = "gif"
}

export const enum PAGES {
    home = "home",
    bookmarks = "bookmarks",
    search = "search",
    fullscreenPost = "fullscreen-post"
}

export const enum VOLUME_ICON_NAMES {
    VolumeHigh = "volume-high",
    VolumeMute = "volume-mute"
}

export const enum TOAST_MESSAGES {
    searchAccountFound = "Account found and set!",
    searchAccountNotFound = "Account not found!"
}

export const enum STATES {
    AppState = "AppState",
    searchAccount = "searchAccount",
    bookmarks = "bookmarks",
    fullscreenPost = "fullscreenPost"
}

export const enum URL_PAGES {
    Home = "/tabs/" + PAGES.home,
    search = "/tabs/" + PAGES.search,
    Bookmarks = "/tabs/" + PAGES.bookmarks,
    FullscreenPost = "/" + PAGES.fullscreenPost
}