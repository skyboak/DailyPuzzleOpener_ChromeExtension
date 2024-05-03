// Get references to DOM elements
const defaultPuzzlesList = document.getElementById('default-puzzles');
const userPuzzlesList = document.getElementById('user-puzzles');
const newPuzzleNameInput = document.getElementById('new-puzzle-name');
const newPuzzleUrlInput = document.getElementById('new-puzzle-url');
const addPuzzleButton = document.getElementById('add-puzzle-btn');

// Define initial data structure for puzzles
let puzzles = {
  default: [],
  user: []
};

// Load user-defined puzzles from storage (replace with your storage implementation)
// You can use Chrome storage APIs like chrome.storage.sync or chrome.storage.local
let userPuzzles = localStorage.getItem('userPuzzles');
if (userPuzzles) {
  puzzles.user = JSON.parse(userPuzzles);
}

// Populate default puzzles list
defaultPuzzlesList.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
  const puzzle = {
    name: checkbox.name,
    url: '', // Replace with actual URL if needed
    enabled: checkbox.checked
  };
  puzzles.default.push(puzzle);
});

// Update checkbox state based on puzzle data
puzzles.default.forEach(puzzle => {
  const checkbox = document.getElementById(puzzle.name);
  if (checkbox) {
    checkbox.checked = puzzle.enabled;
  }
});

// Add event listener for checkbox changes
defaultPuzzlesList.addEventListener('change', (event) => {
  const checkbox = event.target;
  const puzzle = puzzles.default.find(p => p.name === checkbox.name);
  if (puzzle) {
    puzzle.enabled = checkbox.checked;
  }
});

// Function to add a new user puzzle
const addUserPuzzle = () => {
  const name = newPuzzleNameInput.value.trim();
  const url = newPuzzleUrlInput.value.trim();
  // Validate name and URL (add your validation logic here)
  if (name && url) {
    const puzzle = { name, url };
    puzzles.user.push(puzzle);
    // Add the puzzle to the user list UI
    const listItem = document.createElement('li');
    listItem.textContent = name;
    // Add edit/delete buttons if needed
    // ...
    userPuzzlesList.appendChild(listItem);
    // Update user storage (replace with your storage implementation)
    localStorage.setItem('userPuzzles', JSON.stringify(puzzles.user));
    newPuzzleNameInput.value = '';
    newPuzzleUrlInput.value = '';
  }
};

// Add event listener for add button
addPuzzleButton.addEventListener('click', addUserPuzzle);

// Save puzzles on page close (optional)
window.addEventListener('beforeunload', () => {
  // Update storage with latest puzzle data (replace with your storage implementation)
  localStorage.setItem('userPuzzles', JSON.stringify(puzzles.user));
});

