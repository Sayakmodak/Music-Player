let songs = [
    {
        songName:"a-sinister-power-rising-epic-dark-gothic-soundtrac", filePath:"audios/1.mp3", coverPath:"covers/1.png"
    },
    {
        songName:"legendary-cinematic-piano-by-ob", filePath:"audios/2.mp3", coverPath:"covers/2.png"
    },
    {
        songName:"sleep", filePath:"audios/3.mp3", coverPath:"covers/3.png"
    },
    {
        songName:"stomp-rap-adrenaline-133120", filePath:"audios/4.mp3", coverPath:"covers/4.png"
    },
    {
        songName:"underwater-for-meditation-by-ob-14278", filePath:"audios/5.mp3", coverPath:"covers/5.png"
    },
    {
        songName:"In The Forest", filePath:"audios/7.mp3", coverPath:"covers/7.png"
    },
    {
        songName:"Happy Day Music", filePath:"audios/6.mp3", coverPath:"covers/6.png"
    },
    {
        songName:"One Last Time", filePath:"audios/8.mp3", coverPath:"covers/8.png"
    },
    {
        songName:"Summer Party", filePath:"audios/9.mp3", coverPath:"covers/9.png"
    },
    {
        songName:"Tvari Tokyo Cafe", filePath:"audios/10.mp3", coverPath:"covers/10.png"
    }
] ;

let progressBar = document.querySelector("input");
let masterPlayPause = document.getElementById("masterPlayPause");
let audioElement = new Audio('audios/1.mp3');

audioElement.onloadeddata = function(){
    progressBar.max = audioElement.duration;
    progressBar.value = audioElement.currentTime;
}
masterPlayPause.addEventListener("click", function(){
    if(masterPlayPause.classList.contains("bi-play-circle")){
        audioElement.play();
        masterPlayPause.classList.remove("bi-play-circle");
        masterPlayPause.classList.add("bi-pause-circle");
    }
    else{
        audioElement.pause();
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
    masterPlayPause.classList.add("bi-play-circle");
    masterPlayPause.classList.remove("bi-pause-circle");
})

let songItems = document.querySelectorAll(".songItems");
songItems.forEach((elm,i)=>{
   elm.getElementsByTagName("img")[0].src = songs[i].coverPath;
   elm.getElementsByTagName("h4")[0].innerHTML = songs[i].songName;
})

let bi = document.querySelectorAll(".bi");
const makeAllPlays = ()=>{
    bi.forEach((elm)=>{
        elm.classList.remove("bi-pause-circle");
        elm.classList.add("bi-play-circle");
    })
}
let songIndex = 0;
songItems.forEach((elm)=>{
    elm.addEventListener("click",function(e){
        let bi = elm.querySelector(".bi");
        songIndex = parseInt(elm.getAttribute("id"));
        console.log(songIndex);
        if(bi.classList.contains("bi-play-circle")){
            makeAllPlays();
            bi.classList.remove("bi-play-circle");
            bi.classList.add("bi-pause-circle");
            audioElement.src = `audios/${songIndex+1}.mp3`;
            audioElement.play();
            masterPlayPause.classList.remove("bi-play-circle");
            masterPlayPause.classList.add("bi-pause-circle");
        }
        else if(bi.classList.contains("bi-pause-circle")){
            bi.classList.remove("bi-pause-circle");
            bi.classList.add("bi-play-circle");
            audioElement.pause();
            masterPlayPause.classList.add("bi-play-circle");
            masterPlayPause.classList.remove("bi-pause-circle");
        }
    })
})

let next = document.querySelector(".next");
next.addEventListener("click", function(){
    // The value of songIndex is updating
    //console.log(songIndex); // == id
    // let parseSongIndex = parseInt(songIndex);
    // console.log(parseSongIndex);
    /*if(parseSongIndex>=1 && parseSongIndex<=10){
        parseSongIndex += 1;
    }
    else if(parseSongIndex>10){
        parseSongIndex = 1;
    }*/
    if(songIndex>=9){
        songIndex = 0;
    }else{
        songIndex += 1;
    }
    // console.log(parseSongIndex);
    /*songItems.forEach((elm)=>{
        let i = elm.getAttribute("id");
        if(i == songIndex){
            elm.style.backgroundColor = "black";
        }
    })*/
    audioElement.src = `audios/${songIndex+1}.mp3`;
    audioElement.play();
    masterPlayPause.classList.remove("bi-play-circle");
    masterPlayPause.classList.add("bi-pause-circle");
})