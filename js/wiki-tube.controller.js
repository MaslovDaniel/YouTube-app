import {wtService} from './services/wiki-tube.service.js'

window.onInit = onInit
window.onSearch = onSearch
window.playVideo = playVideo

function onInit() {
    onSearch()
}


function onSearch(ev) {
    if (ev) ev.preventDefault()
    const elInputSearch = document.querySelector('input[name=search]')
    wtService.getVideos(elInputSearch.value)
        .then(videos => {
            if (!videos.length) return
            renderVideos(videos)
            playVideo(videos[0].id)
        })
    wtService.getWikis(elInputSearch.value)
        .then(wikis => {
            renderWikis(wikis)
        })
}