const words = ['abc', 'abcd', 'abcde', 'abcdef', 'abcdefg'];
let selectedWord = '';
let attemptsLeft = 10;
let guessedLetters = [];
let gameEnded = false;
const gallowsStages = [
    '',
    '________      ',
    '|....       |',
    '|....       |',
    '|....       |',
    '|....       O',
    '|....      /|\\',
    '|....      / \\',
    '|             ',
    '|             ',
    '________      ',
];



//document.getElementById('startGameButton').addEventListener('click', startGame);

const startBtn = document.getElementById('startGameButton');
//const removeTitleBtn = document.getElementById('remove-title-btn');

startBtn.addEventListener('click', startGame);
//removeTitleBtn.addEventListener('click', removeCurrentTitle);

async function startGame() {
  try {
    // Fetch the word from the server
    const response = await fetch('getWord.php');
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    if (data.error) {
      console.error(data.error);
      return;
    }

    selectedWord = data.word.toLowerCase();
    attemptsLeft = 10;
    guessedLetters = Array(selectedWord.length).fill('_');
    gameEnded = false;
    document.getElementById("status").innerText = "";
    document.getElementById("gallows").innerText = "";

    document.getElementById('attemptsLeft').innerText = `Attempts Left: ${attemptsLeft}`;
    updateWordDisplay();
    handleCheatMode();
    generateLetterButtons();
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}


function generateLetterButtons() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lettersDiv = document.getElementById('letters');
  lettersDiv.innerHTML = ''; // Clear previous buttons
  letters.split('').forEach(letter => {
      const button = document.createElement('button');
      button.textContent = letter;
      button.onclick = () => guessLetter(letter); // Pass letter to guessLetter function
      lettersDiv.appendChild(button);
  });
}



function handleCheatMode() {
  const cheatModeCheckbox = document.getElementById('cheatModeCheckbox');
  if (cheatModeCheckbox && cheatModeCheckbox.checked) {
    alert(`Cheat Mode ON: The word is "${selectedWord}"`);
  }
}

function updateWordDisplay() {
  document.getElementById('wordToGuess').innerText = guessedLetters.join(' ');
}

function updateGallowsDisplay() {
    // Calculate the current stage (total attempts minus remaining attempts)
    const stage = 10 - attemptsLeft;

    // Get the gallows element and update its content
    const gallows = document.getElementById('gallows');
    gallows.innerText = gallowsStages.slice(0, stage + 1).join('\n');
}

function guessLetter(guess) {
    if (gameEnded || !guess) return;

    guess = guess.toLowerCase();

    if (selectedWord.includes(guess)) {
        // Update the guessed letters and the word display
        selectedWord.split('').forEach((letter, index) => {
            if (letter === guess) {
                guessedLetters[index] = guess;
            }
        });

        updateWordDisplay();
    } else {
        // Wrong guess
        attemptsLeft--;
        document.getElementById('attemptsLeft').innerText = `Attempts Left: ${attemptsLeft}`;

        updateGallowsDisplay(); // Update the gallows display for each wrong guess

        if (attemptsLeft == 0) {
            document.getElementById('status').innerText = 'Game Over! You lost.';
            gameEnded = true;
        }
    }

    if (!guessedLetters.includes('_')) {
        document.getElementById('status').innerText = 'Congratulations! You won!';
        gameEnded = true;
    }
}