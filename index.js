function currentTime() {
  let date = new Date(); 
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();
  let session = "AM";

  if(hh === 0){
      hh = 12;
  }
  if(hh > 12){
      hh = hh - 12;
      session = "PM";
   }

   hh = (hh < 10) ? "0" + hh : hh;
   mm = (mm < 10) ? "0" + mm : mm;
   ss = (ss < 10) ? "0" + ss : ss;
    
   let time = hh + ":" + mm + ":" + ss + " " + session;

  document.getElementById("clock").innerText = time; 
  let t = setTimeout(function(){ currentTime() }, 1000);
}

currentTime();
//posture


function posture() {
  var audio = new Audio('music/posture.mp3');
  audio.volume = 1
  audio.play();
}

setInterval(posture, 300000)

//music
const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')
const tab = document.getElementById('tab-title')


//song titles

const songs = ['Beethoven - Für Elise', 'Bizet - Habanera','CHOPIN - NOCTURNE NO.20 IN C-SHARP MINOR OP.POSTH','CLAUDE DEBUSSY_  CLAIR DE LUNE','Dmitri Shostakovich - Waltz No. 2','Grieg_ Peer Gynt Suite No. 1, _In the Hall of the Mountain King_', 'Haendel - Sarabande', 'Johannes Brahms - Hungarian Dance No. 5' , 'Mozart - Piano Sonata No. 16 in C Major, K.545 (1st Mvt)', 'Tchaikovsky - Valse Sentimentale','Tchaikovsky - Waltz of the Flowers','Wagner - Das Rheingold - Entry of the Gods Into Valhalla','Mozart - Lacrimosa','Prokofiev - Dance of the Knights','Beethoven - Virus']
//keep track of songs

let songIndex = 13

//initially load somg info DOM
loadSong(songs[songIndex])


//update song details
function loadSong(song) {
  title.innerText = song
  audio.src = `music/${song}.mp3`
  cover.src = `images/${song}.jpg`
  tab.innerText = song
  document.getElementById('title-img').href = cover.src
if ('mediaSession' in navigator) {
  navigator.mediaSession.metadata = new MediaMetadata({
    title: song,
    artist: 'Classical Music',
    artwork: [
      { src: cover.src, sizes: '96x96',   type: 'image/jpg' },
      { src: cover.src, sizes: '128x128', type: 'image/jpg' },
      { src: cover.src, sizes: '192x192', type: 'image/jpg' },
      { src: cover.src, sizes: '256x256', type: 'image/jpg' },
      { src: cover.src, sizes: '384x384', type: 'image/jpg' },
      { src: cover.src, sizes: '512x512', type: 'image/jpg' },
    ]
    
  });
  navigator.mediaSession.setActionHandler('play', playSong);
    navigator.mediaSession.setActionHandler('pause', pauseSong);
    navigator.mediaSession.setActionHandler('previoustrack', prevSong);
    navigator.mediaSession.setActionHandler('nexttrack', nextSong);
}
}

function playSong() {
  musicContainer.classList.add('play')
  playBtn.querySelector('i.fas').classList.remove('fa-play')
  playBtn.querySelector('i.fas').classList.add('fa-pause')
  audio.play()

}

function pauseSong() {
  musicContainer.classList.remove('play')
  playBtn.querySelector('i.fas').classList.add('fa-play')
  playBtn.querySelector('i.fas').classList.remove('fa-pause')
  audio.pause()
}

function prevSong() {
  songIndex--
  if (songIndex < 0) {
    songIndex = songs.length - 1
  }

  loadSong(songs[songIndex])
  playSong()
}
function nextSong () {
  songIndex++
  if (songIndex > songs.length -1) {
    songIndex = 0
  }


  loadSong(songs[songIndex])
  playSong()
  
}

function updateProgress(e) {
  const{duration, currentTime} = e.srcElement
  const progressPercent = (currentTime / duration) * 100
  progress.style.width = `${progressPercent}%`
}

function setProgress(e) {
  const width = this.clientWidth
  const clickX = e.offsetX
  const duration = audio.duration

  audio.currentTime = (clickX / width) * duration
}

// function playPause(key) {
//   const isPlaying = musicContainer.classList.contains('play')
//   if (key.code = 'space' && isPlaying) {
//     pauseSong()
//   } else {
//     playSong()
//   }
  
// }
//event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play')


  if(isPlaying) {
    pauseSong()
  } else {
    playSong()
  }
})

//change song events
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)


audio.addEventListener('timeupdate', updateProgress)
progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)
// document.addEventListener('keypress', playPause)
document.addEventListener('keydown', function(key) {
    if (key.key === 'ArrowRight') {
      nextSong()
    } 
})
document.addEventListener('keypress', function(key) {
   const isPlaying = musicContainer.classList.contains('play')
    if (key.key === ' '&& isPlaying) {
    pauseSong()
  } else if(key.key === ' ') {
    playSong()
  }
})
document.addEventListener('keydown', function(key) {
    if (key.key === 'ArrowLeft') {
      prevSong()
    } 
})
audio.volume = 1
document.addEventListener('keydown', function(key) {
    
    if (key.key === 'ArrowUp') {
      audio.volume = audio.volume+ 0.08
    } 
})
document.addEventListener('keydown', function(key) {
    
    if (key.key === 'ArrowDown') {
      audio.volume = audio.volume-0.08
    } 
})



//pomodoro

var minutes = 49;
var seconds = 60;
var beep = new Audio('music/beep.mp3')

function template(){
  document.getElementById('minutes').innerHTML = minutes;
  document.getElementById('seconds').innerHTML = seconds;
}
function stop() {
    beep.play()
    clearInterval(minutes_interval);
    clearInterval(seconds_interval);
    document.querySelector('.start').disabled = false
    document.querySelector('.start').classList.remove('tint')
  }
function start(){
  beep.play()
  document.querySelector('.start').disabled = true
  document.querySelector('.start').classList.add('tint')
   // minutes = 49
   // seconds = 59
  document.getElementById('minutes').innerHTML = minutes;
  document.getElementById('seconds').innerHTML = seconds;

   minutes_interval = setInterval(minutesTimer, 60000);
   seconds_interval = setInterval(secondsTimer, 1000);
  // if(start() === true){
  //   alert("Timer is already running")
  //   document.querySelector('.start').disabled = true
  // }
  function minutesTimer(){
    minutes = minutes-1
    document.getElementById('minutes').innerHTML = minutes;
  }
   function secondsTimer(){
    seconds = seconds- 1
    document.getElementById('seconds').innerHTML = seconds;


    if (seconds<=0) {
      if (minutes<=0) {
        beep.play()
        clearInterval(minutes_interval)
        clearInterval(seconds_interval)
        document.getElementById('done').innerHTML = 'Pomodoro session completed! take a break!'
        document.getElementById('done').classList.add('show_message');
      }
      seconds = 60
    }
  }
}




function restart(){
  beep.play()
  minutes = 50;
  seconds = 60
}
document.addEventListener('keypress', enter) 
function enter(key){
  if(key.key === 'Enter'){
      start()
  }
  document.removeEventListener('keypress', enter, false);
}


document.addEventListener('keydown', backspace)
function backspace(key){
  if(key.key === 'Backspace'){
      restart()
  }
  document.removeEventListener('keydown', backspace , false);
}


