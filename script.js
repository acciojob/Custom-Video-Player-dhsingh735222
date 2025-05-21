// Get elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Play/Pause toggle
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Update play/pause button icon
function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

// Skip functionality
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Handle range updates (volume, playbackRate)
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// Progress bar update
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

// Scrub (seek) functionality
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Error handling for video load failure
video.onerror = function() {
  alert('Error: Video failed to load.');
};

// Event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => {
  range.addEventListener('change', handleRangeUpdate);
  range.addEventListener('mousemove', handleRangeUpdate);
});

video.addEventListener('timeupdate', handleProgress);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

// Initialize button state
updateButton();