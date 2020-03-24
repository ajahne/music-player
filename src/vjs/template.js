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
