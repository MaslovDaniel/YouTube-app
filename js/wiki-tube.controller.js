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

function renderVideos(videos) {
    var strHTMLs = videos.map(video => {
        return `<article class="video-preview" >
        <button onclick="playVideo('${video.id}')">▶</button>
        <img src="${video.img.url}" width="${video.img.width}" height="${video.img.height}">
        <span>${video.title}</span>
        </article>`
    })
    const elSearchResults = document.querySelector('.search-results')
    elSearchResults.innerHTML = strHTMLs.join('')
}


function playVideo(videoId) {
    const elVideoPlayer = document.querySelector('.video-play iframe')
    elVideoPlayer.src = `https://www.youtube.com/embed/${videoId}?controls=0`
}


function renderWikis(wikis) {
    var strHTMLs = wikis.map(wiki => {
        return `<article class="wiki-preview">
        <h3 class="title">${wiki.title}</h3>
        <span class="snippet>${wiki.snippet}</span>
        </article>`
    })
    const elWikiResults = document.querySelector('.wiki-results')
    elWikiResults.innerHTML = strHTMLs.join('')
}