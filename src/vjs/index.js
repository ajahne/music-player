const songs = [
  {
    title: "Intro",
    artist: 'Blade Runner',
    icon: 'http://best-sci-fi-books.com/wp-content/uploads/2017/03/deep_space.jpg',
    url: 'http://www.moviewavs.com/0053148414/MP3S/Movies/Blade_Runner/time2die.mp3'
  },
  {
    title: 'Synths',
    artist: 'Freesounds',
    icon: 'https://www.designformusic.com/wp-content/uploads/2016/09/electro-synthwave-album-cover-500x500.jpg',
    url: 'https://freesound.org/data/previews/500/500509_6917846-lq.mp3'
  },
  {
    title: 'Audacity of Dope',
    artist: 'Skyzoo',
    icon: 'https://f4.bcbits.com/img/a2403689430_16.jpg',
    url: 'https://t4.bcbits.com/stream/fb6c6ac00cbff8796f39f7c12e2ecf74/mp3-128/1332434702?p=0&ts=1578001006&t=12245c16e23c46823423e5c36c6324c96db3a1bb&token=1578001006_089db4f9923666b2efd8295811ba85c574fa0e65'
  },
  {
    title: "I Did",
    artist: 'Black Beans',
    icon: 'https://f4.bcbits.com/img/a1151387807_16.jpg',
    url: 'https://t4.bcbits.com/stream/f3ffc7609e689a6d91af770acb2bc5c5/mp3-128/3001411506?p=0&ts=1578002427&t=2b30a13093db4f3fcdedecd5b4ac76586979651c&token=1578002427_bea7301e7da68ac399d205cbf849357b15616478',
    album: 'https://choosey.bandcamp.com/album/black-beans'
  },
  {
    title: "Freedom",
    artist: 'Sampa The Great',
    icon: 'https://f4.bcbits.com/img/a1878237415_16.jpg',
    url: 'https://t4.bcbits.com/stream/c36f7563cc5bae1f1e11cc9fe1f01555/mp3-128/1106695208?p=0&ts=1578002605&t=af4bf1f58fe55285de5b53e1e96ff37181a9cf26&token=1578002605_a1f96930d569569f4c2577c7d6b8d59fc94bdb1b',
    album: 'https://sampathegreat.bandcamp.com/album/the-return'
  },
    {
    title: "Watch Em Holla",
    artist: 'Ghostface ft Raekown, Masta Killa, and Cappadonna',
    icon: 'https://f4.bcbits.com/img/a1305903098_16.jpg',
    url: 'https://t4.bcbits.com/stream/c289162741f79918d98430e40bc8dcb0/mp3-128/1147547758?p=0&ts=1578002800&t=c4aa47e68f8280d3728d2b639ef3b0ecc458d7cc&token=1578002800_afb25cc747b0dc234558589e097d77bc7688a52b',
    album: 'https://ghostfacekillahlosttapes.bandcamp.com/album/the-lost-tapes'
  },
];

function audioPlayer() {
  const audioElement = new Audio(songs[0].url);
  const isPlayingClass = 'is-playing';
  const isPausedClass = 'is-paused';
  const barWidthBuffer = 1.5; //used to align bar with finger of cursor

  let playing = false;
  let currentSong = 0;
  let barWidth = 0;

  let playButton;
  let nextButton;
  let icon;
  let title;
  let artist;
  let bar;
  let progress;
  let musicPlayer;

  function appendAudioElement() {
    document.body.appendChild(audioElement);
  }

  function createMusicPlayer() {
    function getTemplate() {
        const template = `<div id="music-player">
        <div class="wrapper">
          <img class="image">
          <div class="song-info">
            <div class="song-title"></div>
            <div class="song-artist"></div>
          </div>
          <div class="play-button is-paused"></div>
          <div class="next-button"></div>
        </div>
        <div class='progress'>
          <div class='bar'></div>
        </div>
      </div>`;

      return template;
    }
    
    musicPlayer = document.getElementById('music-player');
    musicPlayer.innerHTML = getTemplate();
  }

  function createMusicPlayerElements() {
    musicPlayer = document.getElementById('music-player');
    playButton = musicPlayer.getElementsByClassName('play-button')[0];
    nextButton = musicPlayer.getElementsByClassName('next-button')[0];
    icon = musicPlayer.getElementsByClassName('image')[0];
    title = musicPlayer.getElementsByClassName('song-title')[0];
    artist = musicPlayer.getElementsByClassName('song-artist')[0];
    bar = musicPlayer.getElementsByClassName('bar')[0];
    progress = musicPlayer.getElementsByClassName('progress')[0];
  }

  function init() {
    appendAudioElement();
    createMusicPlayer();
    createMusicPlayerElements();
  }

  init();

  audioElement.addEventListener('loadeddata', () => {
    loadFirstSong();
  });

  audioElement.addEventListener('timeupdate', () => {
    barWidth = (audioElement.currentTime/audioElement.duration) * 100;
    setBarWidth(barWidth);
    if(barWidth === 100) {
      next();
    }
  });

  progress.addEventListener('click', (e) => {
    let position = e.pageX - progress.offsetLeft - 10;
    let percentage = position/progress.offsetWidth * 100;
    audioElement.currentTime = audioElement.duration * (percentage/100);
    setBarWidth(percentage);
  });

  function setBarWidth(value) {
    value += barWidthBuffer;
    //clamp value
    value = value < 100 ? value : 100;
    bar.style.width = `${value}%`;
  }

  function toggle() {
    if (!playing) {
      play();
    } else {
      pause();
    }
  }

  function loadFirstSong() {
    changePlayerIcon();
    changeTrackInfo();
  }

  playButton.addEventListener('click', () => {
    toggle();
  });

  nextButton.addEventListener('click', () => {
    next();
  });

  function changePlayerIcon() {
    icon.src = songs[currentSong].icon;
  }

  function changeTrackInfo() {
    title.innerHTML = songs[currentSong].title;
    artist.innerHTML = songs[currentSong].artist;
  }

  function play() {
    audioElement.play();
    playing = true;
    //change to play button
    playButton.classList.remove(isPausedClass);
    playButton.classList.add(isPlayingClass);
  }

  function pause() {
    audioElement.pause();
    playing = false;
    //change to pause button
    playButton.classList.add(isPausedClass);
    playButton.classList.remove(isPlayingClass);
  }

  function next() {
    //set bar with to 0 on new song
    //done here to remove lag of the width being set to 0 on time update
    setBarWidth(0);
    if (currentSong < songs.length-1) {
      currentSong++;
    } else {
      currentSong = 0;
    }
    audioElement.src = songs[currentSong].url;

    changePlayerIcon();
    changeTrackInfo();

    play();
  }
}

function createList() {
  //go through list of songs and make list to click on and play
}

function main() {
  audioPlayer();
  createList();
}

main();
