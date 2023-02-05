import { storageService } from './storage.service.js'
const KEY = 'videoDB'

export const wtService = {
    getVideos,
    getWikis
}

function getVideos(term) {
    console.log('hi')
    const termVideoMap = storageService.load(KEY) || {}
    if (termVideoMap[term]) return Promise.resolve(termVideoMap[term])
    console.log('Getting from Network')

    return axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=AIzaSyCp8KMTEjR9frWUGpSnc8Cw5cLVe7wRRDM&q=${term}`)
        .then(res => res.data.items)
        .then(ytVideos => ytVideos.map(ytVideo => ({
            id: ytVideo.id.ytVideoId,
            title: ytVideo.snippet.title,
            img: {
                url: ytVideo.snippet.thumbnails.default.url,
                width: ytVideo.snippet.thumbnails.default.width,
                height: ytVideo.snippet.thumbnails.default.height,
            }
        })))
.then(videos => {
    termVideoMap[term] = videos
    storageService.save(KEY , termVideoMap)
    return videos
})
  
}

function getWikis(term) {
    return axios.get(`https://en.wikipedia.org/w/api.php?&origin=*&action=query&list=search&srsearch=${term}&format=json`)
        .then(res => res.data.query.search.splice(0, 5))
}
