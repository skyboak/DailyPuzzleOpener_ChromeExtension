
let userPuzzles = [];


chrome.storage.local.get('userPuzzles', (result) => {
  userPuzzles = result.userPuzzles || [];

  function addPuzzle(name, url) {
    // Create a new puzzle object
    const puzzle = { name, url, enabled: true };

    // Add the puzzle to the array
    userPuzzles.push(puzzle);

    // Save the updated array to chrome.storage.local
    chrome.storage.local.set({ 'userPuzzles': JSON.stringify(userPuzzles) });
  }

  // Code to run when the extension is first installed or updated (optional)


});

// Check if today's date has changed
const isNewDay = () => {
  return new Promise((resolve, reject) => {
    const today = new Date().toLocaleDateString();

    chrome.storage.local.get('lastCheck', (result) => {
      const lastCheck = result.lastCheck;

      if (!lastCheck || lastCheck !== today) {
        chrome.storage.local.set({ 'lastCheck': today }, () => {
          resolve(true);
        });
      } else {
        resolve(false);
      }
    });
  });
};



chrome.runtime.onStartup.addListener(() => {
  isNewDay().then(isNew => {
    if (isNew) {
      // Ensure userPuzzles is an array
      if (Array.isArray(userPuzzles)) {
        userPuzzles.forEach(puzzle => {
          if (puzzle.enabled) {
            chrome.tabs.create({ url: puzzle.url });
          }
        });
      }

      const today = new Date().toLocaleDateString();
      chrome.storage.local.set({ 'lastCheck': today }, function () {
        console.log('Last check date is set to ' + today);
      });
    }
  });
});

chrome.runtime.onInstalled.addListener(() => {
  // Code to run when the extension is first installed or updated (optional)
  // Add some default puzzles
  // Ensure userPuzzles is an array
  let userPuzzles = [];
  chrome.storage.local.set({ 'userPuzzles': userPuzzles });

  addPuzzle("NYT Wordle", "https://www.nytimes.com/games/wordle");
  addPuzzle("NYT Connections", "https://www.nytimes.com/games/connections");
  addPuzzle("NYT Mini", "https://www.nytimes.com/crosswords/game/mini");
  addPuzzle("NYT Spelling Bee", "https://www.nytimes.com/puzzles/spelling-bee");
  addPuzzle("NYT Strands", "https://www.nytimes.com/games/strands");
  addPuzzle("Heardle", "https://www.heardle.app/");
  addPuzzle("Nerdle", "https://nerdlegame.com/");
  addPuzzle("Globle", "https://globle-game.com/");
  addPuzzle("Worldle", "https://worldle.teuteuf.fr/");

  // Save the updated array to localStorage
});

function addPuzzle(name, url) {
  // Create a new puzzle object
  const puzzle = { name, url, enabled: false };

  // Add the puzzle to the array
  userPuzzles.push(puzzle);

  // Save the updated array to chrome.storage.local
  chrome.storage.local.set({ 'userPuzzles': userPuzzles });
}
