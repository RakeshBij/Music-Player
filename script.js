const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const durationEl = document.getElementById("duration");
const currentTimeEl = document.getElementById("current-time");

const finalArr = [
  {
    name: "jacinto-1",
    singer: "Jacinto Design",
    tit: "Electric Chill Machine",
  },
  {
    name: "jacinto-2",
    singer: "Jacinto Design",
    tit: "Seven Nation Army (Remix)",
  },
  {
    name: "jacinto-3",
    singer: "Jacinto Design",
    tit: "Goodnight Disco Queen",
  },
  {
    name: "metric-1",
    singer: "Metric/Jacinto Design",
    tit: "Front Row (Remix)",
  },
];

let ind = 0;

// console.log(finalArr[0].title);
// Check if Playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

// THe info of the song being played
function curSong() {
  title.textContent = finalArr[ind].tit;
  artist.textContent = finalArr[ind].singer;
  music.src = `music/${finalArr[ind].name}.mp3`;
  image.src = `img/${finalArr[ind].name}.jpg`;
  isPlaying ? playSong() : pauseSong();
}

// Play Previous Song
function playPrev() {
  ind === 0 ? (ind = finalArr.length - 1) : ind--;
  curSong();
}

// Play Next Song
function playNext() {
  ind === finalArr.length - 1 ? (ind = 0) : ind++;
  curSong();
}

let startTime = 0;

// Update Progress Bar and Time
function updateProgressBar(e) {
  const { duration, currentTime } = e.srcElement;
  // Update progress bar width
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
  // Calculate display for duration
  const durationMinutes = Math.floor(duration / 60);
  let durationSeconds = Math.floor(duration % 60);
  if (durationSeconds < 10) {
    durationSeconds = `0${durationSeconds}`;
  }
  // Delay switching duration Element to avoid NaN
  if (durationSeconds) {
    durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
  }
  // Calculate display for current
  const currentMinutes = Math.floor(currentTime / 60);
  let currentSeconds = Math.floor(currentTime % 60);
  if (currentSeconds < 10) {
    currentSeconds = `0${currentSeconds}`;
  }
  currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
}

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  console.log(width);
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// Event Listener
prevBtn.addEventListener("click", playPrev);
nextBtn.addEventListener("click", playNext);
music.addEventListener("ended", playNext);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
