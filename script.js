const scoreElement = document.querySelector('#score');
const attemptsElement = document.querySelector('#attempts');
const messageElement = document.querySelector('#message');
const guessInput = document.querySelector('#guess-input');
const guessForm = document.querySelector('#guess-form');
const guessButton = document.querySelector('.guess-button');
const newGameButton = document.querySelector('#new-game');
const resetScoreButton = document.querySelector('#reset-score');
const installButton = document.querySelector('#install-app');
const rangeForm = document.querySelector('#range-form');
const minimumInput = document.querySelector('#range-min-input');
const maximumInput = document.querySelector('#range-max-input');
const minimumLabel = document.querySelector('#range-min-label');
const maximumLabel = document.querySelector('#range-max-label');
const rangeSummary = document.querySelector('#range-summary');
const subtitleMinimum = document.querySelector('#subtitle-min');
const subtitleMaximum = document.querySelector('#subtitle-max');
const scoreKey = 'guess-the-number-score';

let score = Number.parseInt(localStorage.getItem(scoreKey), 10) || 0;
let secretNumber;
let attempts;
let roundComplete;
let installPrompt;
let minimumNumber = 1;
let maximumNumber = 100;

function startNewGame() {
  secretNumber = Math.floor(Math.random() * (maximumNumber - minimumNumber + 1)) + minimumNumber;
  attempts = 0;
  roundComplete = false;
  attemptsElement.textContent = attempts;
  messageElement.textContent = 'Take a guess to get started.';
  messageElement.className = 'message';
  guessInput.value = '';
  guessInput.disabled = false;
  guessButton.disabled = false;
  guessInput.focus();
}

function updateScore() {
  scoreElement.textContent = score;
  scoreElement.classList.remove('pulse');
  void scoreElement.offsetWidth;
  scoreElement.classList.add('pulse');
}

function showMessage(text, type = '') {
  messageElement.textContent = text;
  messageElement.className = `message ${type}`;
}

function handleGuess(event) {
  event.preventDefault();
  if (roundComplete) return;

  const guess = Number(guessInput.value);
  if (!Number.isInteger(guess) || guess < minimumNumber || guess > maximumNumber) {
    showMessage(`Enter a whole number between ${minimumNumber} and ${maximumNumber}.`, 'error');
    guessInput.classList.remove('shake');
    void guessInput.offsetWidth;
    guessInput.classList.add('shake');
    guessInput.focus();
    return;
  }

  attempts += 1;
  attemptsElement.textContent = attempts;

  if (guess === secretNumber) {
    score += 1;
    localStorage.setItem(scoreKey, String(score));
    updateScore();
    roundComplete = true;
    guessInput.disabled = true;
    guessButton.disabled = true;
    showMessage(`You got it! ${secretNumber} was the number. +1 point`, 'success');
    newGameButton.focus();
    window.setTimeout(startNewGame, 1400);
  } else if (guess < secretNumber) {
    showMessage('Go higher. You are getting warmer.', 'up');
  } else {
    showMessage('Go lower. The answer is just below that.', 'down');
  }

  if (!roundComplete) {
    guessInput.select();
  }
}

function applyRange(event) {
  event.preventDefault();
  const newMinimum = Number(minimumInput.value);
  const newMaximum = Number(maximumInput.value);

  if (!Number.isInteger(newMinimum) || !Number.isInteger(newMaximum) || newMinimum < 1 || newMaximum > 5000 || newMinimum >= newMaximum) {
    showMessage('Choose two whole numbers with the minimum below the maximum.', 'error');
    return;
  }

  minimumNumber = newMinimum;
  maximumNumber = newMaximum;
  minimumLabel.textContent = String(minimumNumber).padStart(2, '0');
  maximumLabel.textContent = maximumNumber;
  subtitleMinimum.textContent = minimumNumber;
  subtitleMaximum.textContent = maximumNumber;
  rangeSummary.textContent = `${minimumNumber}–${maximumNumber}`;
  guessInput.min = minimumNumber;
  guessInput.max = maximumNumber;
  startNewGame();
  showMessage(`New round: pick a number from ${minimumNumber} to ${maximumNumber}.`);
}

function previewRange() {
  const previewMinimum = Number(minimumInput.value);
  const previewMaximum = Number(maximumInput.value);

  if (Number.isInteger(previewMinimum) && previewMinimum >= 1) {
    minimumLabel.textContent = String(previewMinimum).padStart(2, '0');
    subtitleMinimum.textContent = previewMinimum;
  }

  if (Number.isInteger(previewMaximum) && previewMaximum >= 2) {
    maximumLabel.textContent = previewMaximum;
    subtitleMaximum.textContent = previewMaximum;
  }
}

function resetScore() {
  score = 0;
  localStorage.removeItem(scoreKey);
  updateScore();
  showMessage('Score reset. Your next win starts a fresh tally.', '');
  guessInput.focus();
}

guessForm.addEventListener('submit', handleGuess);
rangeForm.addEventListener('submit', applyRange);
minimumInput.addEventListener('input', previewRange);
maximumInput.addEventListener('input', previewRange);
newGameButton.addEventListener('click', startNewGame);
resetScoreButton.addEventListener('click', resetScore);

updateScore();
startNewGame();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('service-worker.js'));
}

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  installPrompt = event;
  installButton.hidden = false;
});

installButton.addEventListener('click', async () => {
  if (!installPrompt) return;
  installPrompt.prompt();
  await installPrompt.userChoice;
  installPrompt = null;
  installButton.hidden = true;
});
