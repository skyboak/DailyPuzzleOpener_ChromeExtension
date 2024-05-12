// Get references to DOM elements
const userPuzzlesList = document.getElementById('user-puzzles');
const newPuzzleNameInput = document.getElementById('new-puzzle-name');
const newPuzzleUrlInput = document.getElementById('new-puzzle-url');
const addPuzzleButton = document.getElementById('add-puzzle-btn');

// Load user puzzles from chrome.storage.local
chrome.storage.local.get('userPuzzles', (data) => {
  userPuzzles = Array.isArray(data.userPuzzles) ? data.userPuzzles : [];

  // Function to add a puzzle
  function addPuzzle(name, url) {
    // Create a new puzzle object
    const puzzle = { name, url, enabled: true };

    // Add the puzzle to the array
    userPuzzles.push(puzzle);

    // Save the updated array to chrome.storage.local
    chrome.storage.local.set({ 'userPuzzles': userPuzzles});

    // Add the puzzle to the DOM
    addUserPuzzleToDOM(puzzle);
  }

  // Function to remove a puzzle
  function removePuzzle(name) {
    // Find the index of the puzzle to remove
    const index = userPuzzles.findIndex(puzzle => puzzle.name === name);

    // Remove the puzzle from the array
    userPuzzles.splice(index, 1);

    // Save the updated array to chrome.storage.local
    chrome.storage.local.set({ 'userPuzzles': userPuzzles });

    // Remove the puzzle from the DOM
    document.getElementById(name).remove();
  }

  // Function to add a user puzzle to the DOM
  function addUserPuzzleToDOM(puzzle) {
    // Create a new list item
    const li = document.createElement('li');
    li.id = puzzle.name;

    // Create a new checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = puzzle.enabled;
    checkbox.addEventListener('change', () => {
      // Update the puzzle's enabled status when the checkbox is changed
      puzzle.enabled = checkbox.checked;
      chrome.storage.local.set({ 'userPuzzles': userPuzzles });
    });

    // Create a new text node for the puzzle name
    const text = document.createTextNode(puzzle.name);

    // Create a new button for removing the puzzle
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => removePuzzle(puzzle.name));

    // Add the checkbox, text, and remove button to the list item
    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(removeButton);

    // Add the list item to the user puzzles list
    userPuzzlesList.appendChild(li);
  }

  // Add event listener to the add puzzle button
  addPuzzleButton.addEventListener('click', () => {
    // Get the name and URL from the input fields
    const name = newPuzzleNameInput.value;
    const url = newPuzzleUrlInput.value;

    // Add the puzzle
    addPuzzle(name, url);

    // Clear the input fields
    newPuzzleNameInput.value = '';
    newPuzzleUrlInput.value = '';
  });

  // Add existing user puzzles to the DOM
  userPuzzles.forEach(addUserPuzzleToDOM);
});