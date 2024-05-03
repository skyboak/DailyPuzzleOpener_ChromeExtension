document.addEventListener('DOMContentLoaded', function() {

  // Get references to button elements
  const predefinedButtons = document.querySelectorAll('#predefined-puzzles li button');
  const userPuzzleList = document.querySelector('#user-puzzles ul');

  // Function to open a new tab with the given URL
  function openPuzzleTab(url) {
    chrome.tabs.create({ url: url });
  }

  // Add click event listeners to predefined buttons
  predefinedButtons.forEach(button => {
    button.addEventListener('click', () => {
      const puzzleUrl = button.dataset.url;
      openPuzzleTab(puzzleUrl);
    });
  });

  // Fetch user-defined URLs from storage and populate the list
  chrome.storage.sync.get('userPuzzles', data => {
    if (data && data.userPuzzles) {
      const userPuzzles = data.userPuzzles;
      userPuzzles.forEach(puzzle => {
        const listItem = document.createElement('li');
        const userButton = document.createElement('button');
        userButton.textContent = puzzle.name;
        userButton.dataset.url = puzzle.url;
        userButton.addEventListener('click', () => {
          openPuzzleTab(puzzle.url);
        });
        listItem.appendChild(userButton);
        userPuzzleList.appendChild(listItem);
      });
    }
  });

});
