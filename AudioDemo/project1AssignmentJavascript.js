const audioPlayer = document.getElementById('audio-player');
const rewindBtn = document.getElementById('rewind-btn');
const forwardBtn = document.getElementById('forward-btn');
const currentTimeDisplay = document.getElementById('current-time');



// Sample titles and times
const titles = ["Springtime is upon us.", "Birds celebrate the return of spring", "Ritornello 2", "Murmuring streams are caressed by the breezes","Ritornello3" , "The thunderstorms of Spring roar", "Ritornello 4", "The Storm passes, and the birs start to sing again", "Ritornello 5", "Ritornello 6", "Murmuring of leaves, plants, and a barking dog"];
const times = [0, 29, 63, 77, 101, 108, 137, 146, 163, 190, 219]; // Corresponding times in seconds
let currentTitle = ''; // Variable to store the current title



// Display titles as buttons
for (let i = 0; i < titles.length; i++) {
    const title = titles[i];
    playlist.insertAdjacentHTML('beforeend', '<button class="playlist-button" onclick="playSegmentByTitle(\'' + title + '\')">' + title + '</button>');

}
  




// Function to play a segment based on the title
function playSegmentByTitle(title) {
  const index = titles.indexOf(title);
  if (index !== -1) {
    const startTime = times[index];
    let endTime;
    if (index < titles.length - 1) {
      endTime = times[index + 1];
    } else {
      // If it's the last title, set endTime to the end of the audio
      endTime = audioPlayer.duration;
    }
    audioPlayer.currentTime = startTime;
    audioPlayer.play();
    currentTitle = title; // Update the current title
    const interval = setInterval(() => {
      if (audioPlayer.currentTime >= endTime) {
        audioPlayer.pause();
        clearInterval(interval);
        currentTitle = ''; // Clear the current title when playback ends
      }
    }, 1000);
  } else {
    console.error("Title not found in the playlist.");
  }
}

  

// Event listeners
// Define the function to toggle play/pause
function togglePlayPause() {
    if (audioPlayer.paused) {
      audioPlayer.play();
      playPauseBtn.textContent = 'Pause';
    } else {
      audioPlayer.pause();
      playPauseBtn.textContent = 'Play';
    }
}
  

rewindBtn.addEventListener('click', () => {
  audioPlayer.currentTime -= 5;
});

forwardBtn.addEventListener('click', () => {
  audioPlayer.currentTime += 5;
});

audioPlayer.addEventListener('timeupdate', () => {
  const currentTime = Math.floor(audioPlayer.currentTime);
  currentTimeDisplay.textContent = 'Current Time: ' + formatTime(currentTime);

});

//Helper function to format time (e.g., convert seconds to HH:MM:SS)
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  return minutes + ':' + (remainingSeconds < 10 ? '0' : '') + remainingSeconds;

}

// Function to add a new title at the current play time
function addTitleAtCurrentTime() {
  if (titles.length >= 50) {
    alert("Maximum limit of 50 titles reached.");
    return;
  }
  const newTitle = prompt("Enter the new title:");
  if (newTitle) {
    const currentTime = Math.floor(audioPlayer.currentTime);
    let index = 0;
    while (index < times.length && times[index] < currentTime) {
      index++;
    }
    titles.splice(index, 0, newTitle);
    times.splice(index, 0, currentTime);
    updatePlaylist();
  }
}


// Function to remove the current title from the playlist
function removeCurrentTitle() {
  if (titles.length <= 6) {
    alert("Minimum limit of 6 titles reached.");
    return;
  }
  const index = titles.indexOf(currentTitle);
  if (index !== -1) {
    titles.splice(index, 1);
    times.splice(index, 1);
    updatePlaylist();
    currentTitle = ''; // Clear the current title
  }
}


// Function to update the playlist display
function updatePlaylist() {
  playlist.innerHTML = ''; // Clear the playlist
  // Display titles as buttons
  for (let i = 0; i < titles.length; i++) {
    const title = titles[i];
    playlist.insertAdjacentHTML('beforeend', '<button class="playlist-button" onclick="playSegmentByTitle(\'' + title + '\')">' + title + '</button>');

  }
}

// Event listeners for add and remove buttons
const addTitleBtn = document.getElementById('add-title-btn');
const removeTitleBtn = document.getElementById('remove-title-btn');

addTitleBtn.addEventListener('click', addTitleAtCurrentTime);
removeTitleBtn.addEventListener('click', removeCurrentTitle);

