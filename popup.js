// Get references to DOM elements
const puzzlesList = document.getElementById('puzzles');
const openNowButton = document.querySelector('button');
const optionsButton = document.getElementById('optionsButton');

// Load user puzzles from chrome.storage.local
chrome.storage.local.get('userPuzzles', (data) => {
  userPuzzles = Array.isArray(data.userPuzzles) ? data.userPuzzles : [];

  // Add puzzles to the DOM
  userPuzzles.forEach(addPuzzleToDOM);
});

// Function to add a puzzle to the DOM
function addPuzzleToDOM(puzzle) {
  // Only add the puzzle if it's enabled
  if (puzzle.enabled) {
    // Create a new list item
    const li = document.createElement('li');

    // Create a new text node for the puzzle name
    const text = document.createTextNode(puzzle.name);

    // Add the text to the list item
    li.appendChild(text);

    // Add the list item to the puzzles list
    puzzlesList.appendChild(li);
  }
}

openNowButton.addEventListener('click', () => {
  chrome.storage.local.get('userPuzzles', (data) => {
    userPuzzles = Array.isArray(data.userPuzzles) ? data.userPuzzles : [];

    // Open each enabled puzzle in a new tab
    userPuzzles.forEach(puzzle => {
      if (puzzle.enabled) {
        chrome.tabs.create({ url: puzzle.url });
      }
    });

    const today = new Date().toLocaleDateString();
    chrome.storage.local.set({ 'lastCheck': today });
  });
});

// Add event listener to the options button
optionsButton.addEventListener('click', () => {
  chrome.runtime.openOptionsPage();
});