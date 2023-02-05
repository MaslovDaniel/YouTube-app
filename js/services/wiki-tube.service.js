import { storageService } from './storage.service.js'

const KEY = 'videoDB'
const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=AIzaSyCp8KMTEjR9frWUGpSnc8Cw5cLVe7wRRDM&q=${term}`


export const wtService = {
    getVideos,

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


















// const STORAGE_KEY_CITIES = 'citiesDB'
// const url = 'http://www.filltext.com/?rows=10&name={city}&population={numberRange|1000,7000}'

function getCities() {

    let cities = loadFromStorage(STORAGE_KEY_CITIES)
    if (cities && cities.length) {
        console.log('cities from CACHE', cities)
        // return cities
        return Promise.resolve(cities)
    }


    return axios.get(url).then(res => {
        console.log('FROM AXIOS');
        cities = res.data
        saveToStorage(STORAGE_KEY_CITIES, cities)

        // Cache Invalidation
        setTimeout(() => {
            saveToStorage(STORAGE_KEY_CITIES, null)
        }, 5000)

        return cities
    })
}