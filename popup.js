const puzzleListElement = document.getElementById("puzzleList");

// Display existing puzzles
chrome.storage.local.get("puzzleUrls", (data) => {
  const puzzleUrls = data.puzzleUrls || [];
  puzzleUrls.forEach((url) => {
    const listItem = document.createElement("li");
    listItem.textContent = url;
    puzzleListElement.appendChild(listItem);
  });
});

function addPuzzle() {
  // Prompt user for URL and store it in Chrome storage
  const newUrl = prompt("Enter the URL of the new puzzle:");
  if (newUrl) {
    chrome.storage.local.get("puzzleUrls", (data) => {
      const puzzleUrls = data.puzzleUrls || [];
      puzzleUrls.push(newUrl);
      chrome.storage.local.set({ puzzleUrls });
      // Update the list dynamically
      const listItem = document.createElement("li");
      listItem.textContent = newUrl;
      puzzleListElement.appendChild(listItem);
    });
  }
}

function openAllPuzzles() {
  // Access stored URLs and open them in new tabs
  chrome.storage.local.get("puzzleUrls", (data) => {
    const puzzleUrls = data.puzzleUrls || [];
    puzzleUrls.forEach((url) => {
      chrome.tabs.create({ url });
    });
  });
}
