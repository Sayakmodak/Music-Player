let songs = [
    {
        songName:"a-sinister-power-rising-epic-dark-gothic-soundtrac", filePath:"audios/1.mp3", coverPath:"covers/1.png", duration: "01:13"
    },
    {
        songName:"legendary-cinematic-piano-by-ob", filePath:"audios/2.mp3", coverPath:"covers/2.png", duration: "03:06"
    },
    {
        songName:"sleep", filePath:"audios/3.mp3", coverPath:"covers/3.png", duration: "12:45"
    },
    {
        songName:"stomp-rap-adrenaline-133120", filePath:"audios/4.mp3", coverPath:"covers/4.png", duration: "00:56"
    },
    {
        songName:"underwater-for-meditation-by-ob-14278", filePath:"audios/5.mp3", coverPath:"covers/5.png", duration: "09:38"
    },
    {
        songName:"Happy Day Music", filePath:"audios/6.mp3", coverPath:"covers/6.png", duration: "01:48"
    },
    {
        songName:"In The Forest", filePath:"audios/7.mp3", coverPath:"covers/7.png", duration: "07:27"
    },
    {
        songName:"One Last Time", filePath:"audios/8.mp3", coverPath:"covers/8.png", duration: "08:12"
    },
    {
        songName:"Summer Party", filePath:"audios/9.mp3", coverPath:"covers/9.png", duration: "01:41"
    },
    {
        songName:"Tvari Tokyo Cafe", filePath:"audios/10.mp3", coverPath:"covers/10.png", duration: "02:33"
    }
] ;

let progressBar = document.querySelector("input");
let masterPlayPause = document.getElementById("masterPlayPause");
let audioElement = new Audio('audios/1.mp3');
let playing_gif = document.getElementById("playing_gif");
let songTitle = document.querySelector(".songTitle");
audioElement.onloadeddata = function(){
    progressBar.max = audioElement.duration;
    progressBar.value = audioElement.currentTime;
}
masterPlayPause.addEventListener("click", function(){
    if(masterPlayPause.classList.contains("bi-play-circle")){
        audioElement.play();
        playing_gif.style.opacity = 1;
        masterPlayPause.classList.remove("bi-play-circle");
        masterPlayPause.classList.add("bi-pause-circle");
    }
    else{
        audioElement.pause();
        playing_gif.style.opacity = 0;
        masterPlayPause.classList.add("bi-play-circle");
        masterPlayPause.classList.remove("bi-pause-circle");
        makeAllPlays();
    }
})

if(audioElement.play()){
    setInterval(()=>{
        progressBar.value = audioElement.currentTime;
    },500);
}

progressBar.addEventListener("change", function(){
    audioElement.play();
    audioElement.currentTime = progressBar.value ;
    masterPlayPause.classList.remove("bi-play-circle");
    masterPlayPause.classList.add("bi-pause-circle");
})

audioElement.addEventListener("ended", function(){
    playing_gif.style.opacity = 0;
    masterPlayPause.classList.add("bi-play-circle");
    masterPlayPause.classList.remove("bi-pause-circle");
})

let songItems = document.querySelectorAll(".songItems");
songItems.forEach((elm,i)=>{
    elm.getElementsByTagName("img")[0].src = songs[i].coverPath;
    elm.getElementsByTagName("h4")[0].innerHTML = songs[i].songName;
    elm.querySelector(".timeSpan").innerText = songs[i].duration;
})

let bi = document.querySelectorAll(".bi");
const makeAllPlays = ()=>{
    bi.forEach((elm)=>{
        elm.classList.remove("bi-pause-circle");
        elm.classList.add("bi-play-circle");
    })
}
songItems.forEach((elm)=>{
    elm.addEventListener("click",function(e){
        let bi = elm.querySelector(".bi");
        songIndex = parseInt(elm.getAttribute("id"));
        console.log(songIndex, typeof(songIndex));
        if(bi.classList.contains("bi-play-circle")){
            makeAllPlays();
            bi.classList.remove("bi-play-circle");
            bi.classList.add("bi-pause-circle");
            audioElement.src = `audios/${songIndex}.mp3`;
            audioElement.play();
            playing_gif.style.opacity = 1;
            masterPlayPause.classList.remove("bi-play-circle");
            masterPlayPause.classList.add("bi-pause-circle");
            songTitle.innerText = songs[songIndex-1].songName;
            audioElement.addEventListener("ended", function(){
                bi.classList.add("bi-play-circle");
                bi.classList.remove("bi-pause-circle");
            })
        }
        else if(bi.classList.contains("bi-pause-circle")){
            bi.classList.remove("bi-pause-circle");
            bi.classList.add("bi-play-circle");
            audioElement.pause();
            playing_gif.style.opacity = 0;
            masterPlayPause.classList.add("bi-play-circle");
            masterPlayPause.classList.remove("bi-pause-circle");
        }
    })
})

let next = document.querySelector(".next");
let previous = document.querySelector(".previous");
next.addEventListener("click", function(){
    if(songIndex>=10){
        songIndex = 1;
    }else{
        songIndex += 1;
    }
    console.log(songIndex, typeof(songIndex));
    songItems.forEach((elm)=>{
        let index = parseInt(elm.getAttribute("id"));
        if(index == songIndex){
            let playPause = elm.querySelector(".bi");
            if(playPause.classList.contains("bi-play-circle")){
                makeAllPlays();
                playing_gif.style.opacity = 1;
                playPause.classList.remove("bi-play-circle");
                playPause.classList.add("bi-pause-circle");
            }
            else{
                playing_gif.style.opacity = 0;
                playPause.classList.add("bi-play-circle");
                playPause.classList.remove("bi-pause-circle");
            }
        }
    })
    audioElement.src = `audios/${songIndex}.mp3`;
    audioElement.play();
    masterPlayPause.classList.remove("bi-play-circle");
    masterPlayPause.classList.add("bi-pause-circle");
})


previous.addEventListener("click", function(){
    if(songIndex<=1){
        songIndex = 10;
    }else{
        songIndex -= 1;
    }
    console.log(songIndex, typeof(songIndex));
    songItems.forEach((elm)=>{
        let index = parseInt(elm.getAttribute("id"));
        if(index == songIndex){
            let playPause = elm.querySelector(".bi");
            if(playPause.classList.contains("bi-play-circle")){
                makeAllPlays();
                playing_gif.style.opacity = 1;
                playPause.classList.remove("bi-play-circle");
                playPause.classList.add("bi-pause-circle");
            }
            else{
                playing_gif.style.opacity = 0;
                playPause.classList.add("bi-play-circle");
                playPause.classList.remove("bi-pause-circle");
            }
        }
    })
    audioElement.src = `audios/${songIndex}.mp3`;
    audioElement.play();
    masterPlayPause.classList.remove("bi-play-circle");
    masterPlayPause.classList.add("bi-pause-circle");
})