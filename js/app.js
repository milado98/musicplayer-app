
const container = document.querySelector(".app-body"),
musicImg = container.querySelector(".image-section img"),
musicName = container.querySelector(".song-info .song-title"),
musicArtist = container.querySelector(".song-info .song-artist"),
mainAudio = container.querySelector("#song-audio"),
playpauseBtn = container.querySelector(".play-pause"),
nextBtn = container.querySelector("#next"),
prevBtn = container.querySelector("#previous"),
progressArea = container.querySelector(".progress-section"),
progressBar = container.querySelector(".progress-bar"),
musicList = container.querySelector(".music-list"),
moreMusicBtn = container.querySelector("#more-music"),
closemoreMusic = container.querySelector("#close");



let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);

window.addEventListener("load", () => {
loadMusic(musicIndex);
playingSong();
})

// Function To Load A Particular Song

function loadMusic(indexNumb) {
musicName.innerText = allMusic[indexNumb - 1].name;
musicArtist.innerText = allMusic[indexNumb - 1].artist;
musicImg.src = `img/${allMusic[indexNumb - 1].img}.jpg`;
mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.mp3`;
}


// Function to play music

function playMusic() {
container.classList.add("paused");
playpauseBtn.innerHTML =
`<i class="bi bi-pause-fill fs-2"></i>`
mainAudio.play();
}

// pause music function
function pauseMusic() {
container.classList.remove("paused");
playpauseBtn.innerHTML =
`<i class="bi bi-play-fill fs-2"></i>`
mainAudio.pause();
}


// Next Music function
function nextMusic() {
musicIndex++; //increase musicIndex by 1

// if musicIndex is greater than array length then musicIndex will be 1 so the first music will play
musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
loadMusic(musicIndex);
playMusic();
playingSong();
}


// Prev Music function
function prevMusic() {
musicIndex--; //increase musicIndex by 1

// if musicIndex is less than array length then musicIndex will be 1 so the first music will play
musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
loadMusic(musicIndex);
playMusic();
playingSong();
}


// play or Pause button event
playpauseBtn.addEventListener("click", () => {
const isMusicPaused = container.classList.contains("paused");

isMusicPaused ? pauseMusic() : playMusic();

});

// next music button event
nextBtn.addEventListener("click", () => {
nextMusic();
});


// prev music button event
prevBtn.addEventListener("click", () => {
prevMusic();
});

// update progressbar width according to music current time
mainAudio.addEventListener("timeupdate", (e) => {
const currentTime = e.target.currentTime; //getting playing song current time

const duration = e.target.duration; //getting playing song total duration

let progressWidth = (currentTime / duration) * 100;

progressBar.style.width = `${progressWidth}%`;



let musicCurrentTime = container.querySelector(".current-time"),
    musicDuration = container.querySelector(".max-time");
mainAudio.addEventListener("loadeddata", () => {

    //  update song total duration
    let mainDuration = mainAudio.duration;
    let totalMin = Math.floor(mainDuration / 60);
    let totalSec = Math.floor(mainDuration % 60);
    if (totalSec < 10) { //if sec is less than 10 then add 0 before it
        totalSec = `0${totalSec}`;
    }

    musicDuration.innerText = `${totalMin}:${totalSec}`;

});

//update playing song current time
let currentMin = Math.floor(currentTime / 60);
let currentSec = Math.floor(currentTime % 60);
if (currentSec < 10) { //if sec is less than 10 then add 0 before it
    currentSec = `0${currentSec}`;
}

musicCurrentTime.innerText = `${currentMin}:${currentSec}`;

});


// update playing song current time according to the progress bar width

progressArea.addEventListener("click", (e) => {
let progressWidth = progressArea.clientWidth; //getting width of progress bar
let clickedOffsetX = e.offsetX; //getting offset x value
let songDuration = mainAudio.duration; //getting song total duration

mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
playMusic();

});


// show the music list onclick music icon


moreMusicBtn.addEventListener("click", () => {
musicList.classList.toggle("show");
});

closemoreMusic.addEventListener("click", () => {
moreMusicBtn.click();
});


const ulTag = container.querySelector("ul");

// let create li tags according to array lenght for list

for (let i = 0; i < allMusic.length; i++) {
let liTag = `<li li-index="${i + 1}">
<div class="row">
  <span>${allMusic[i].name}</span>
  <p>${allMusic[i].artist}</p>
</div>
<audio class="${allMusic[i].src} " src="songs/${allMusic[i].src}.mp3"></audio>
<span id="${allMusic[i].src}" class="audio-duration">${allMusic[i].duration}</span>
</li>`;
ulTag.insertAdjacentHTML("beforeend", liTag);

let liAudioDurationTag = ulTag.querySelector(`#${allMusic[i].src}`);
let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);

liAudioTag.addEventListener("loadeddata", () => {
let duration = liAudioTag.duration;
let totalMin = Math.floor(duration / 60);
let totalSec = Math.floor(duration % 60);
if (totalSec < 10) { //if sec is less than 10 then add 0 before it
    totalSec = `0${totalSec}`;
}

liAudioDurationTag.innerText = `${totalMin}:${totalSec}`;
// adding t-duration attribute with total duration value
liAudioDurationTag.setAttribute("t-duration", `${totalMin}:${totalSec}`);
});

}


// play particular song from the list on click of li tag

const allLiTags = ulTag.querySelectorAll("li");
function playingSong() {
for (let j = 0; j < allLiTags.length; j++) {
let audioTag = allLiTags[j].querySelector(".audio-duration");
    // let remove playing class from all other li expect the last one which is clicked
    if(allLiTags[j].classList.contains("playing")){
        allLiTags[j].classList.remove("playing");
    //  let's get that audio duration value and pass to .audio-duration innertext
    let adDuration = audioTag.getAttribute("t-duration");
    audioTag.innerText = adDuration;
    }

    // if there is an li tag which li index is equal to musicIndex
    // then this music is playing now and we'll style it

    if(allLiTags[j].getAttribute("li-index") == musicIndex){
        allLiTags[j].classList.add("playing");
        audioTag.innerText = "Now Playing";
    }

    // adding on click attribute in all li tags
    allLiTags[j].setAttribute("onclick", "clicked(this)");
}
}

// lets play song on click li 
function clicked(element){

// getting li index of particular clicked li tag
let getLiIndex = element.getAttribute("li-index");
musicIndex =  getLiIndex; //passing that liindex to musicIndex
loadMusic(musicIndex);
playMusic(); 
playingSong();

}