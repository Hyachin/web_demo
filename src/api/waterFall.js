import requests from "./request";
// const baseURL = "https://picsum.photos"
export const reqWaterFallImages = (page, limit) => requests({
    url: '/search/albumsdata',
    params: {
        pn: page,
        rn: limit,
        word: '城市建筑摄影专题',
        album_tab: '建筑',
        album_id: 7
    },
    method: 'GET'
})