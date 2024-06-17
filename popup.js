let jsFileCounter = 0;
let currentTabId;

document.addEventListener('DOMContentLoaded', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  currentTabId = tab.id;


  await loadStoredResults(currentTabId);

  await extractAndDisplayJSFiles(currentTabId);


  document.getElementById('copyButton').addEventListener('click', () => {
    const jsFiles = getJSFilesFromTable();
    const urlsText = jsFiles.join('\n');
    navigator.clipboard.writeText(urlsText).then(() => {
      alert('URLs copied to clipboard!');
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  });


  document.getElementById('deleteButton').addEventListener('click', () => {
    clearResults(currentTabId);
  });
});

async function extractAndDisplayJSFiles(tabId) {
  const results = await chrome.scripting.executeScript({
    target: { tabId: tabId },
    func: extractJSFiles
  });

  const jsFiles = results[0].result.map(url => url.split('?')[0]);
  displayJSFiles(jsFiles, tabId);
}

function displayJSFiles(jsFiles, tabId) {
  const fileListElement = document.getElementById('fileList');
  const currentFiles = getJSFilesFromTable();
  const newFiles = jsFiles.filter(url => !currentFiles.includes(url));

  if (newFiles.length > 0) {
    jsFileCounter += newFiles.length;
    chrome.action.setBadgeText({ text: jsFileCounter.toString() });
    chrome.action.setBadgeBackgroundColor({ color: '#4CAF50' });

    newFiles.forEach(url => {
      const urlObj = new URL(url);
      const fileName = urlObj.pathname.substring(urlObj.pathname.lastIndexOf('/') + 1);

      const row = document.createElement('tr');

      const fileCell = document.createElement('td');
      fileCell.textContent = fileName;

      const urlCell = document.createElement('td');
      const link = document.createElement('a');
      link.href = url;
      link.textContent = url;
      link.target = '_blank'; 
      urlCell.appendChild(link);

      row.appendChild(fileCell);
      row.appendChild(urlCell);
      fileListElement.appendChild(row);
    });


    saveResults(tabId, [...currentFiles, ...newFiles]);
  }
}

function getJSFilesFromTable() {
  const rows = document.querySelectorAll('#fileList tr');
  const jsFiles = [];
  rows.forEach(row => {
    const link = row.querySelector('a');
    if (link) {
      jsFiles.push(link.href);
    }
  });
  return jsFiles;
}

async function loadStoredResults(tabId) {
  const key = `jsFiles_${tabId}`;
  chrome.storage.local.get(key, (data) => {
    if (data[key]) {
      displayJSFiles(data[key], tabId);
    }
  });
}

function saveResults(tabId, jsFiles) {
  const key = `jsFiles_${tabId}`;
  chrome.storage.local.set({ [key]: jsFiles }, () => {
    console.log(`JavaScript files for tab ${tabId} saved.`);
  });
}

function clearResults(tabId) {
  const key = `jsFiles_${tabId}`;
  chrome.storage.local.remove(key, () => {
    document.getElementById('fileList').innerHTML = '';
    jsFileCounter = 0;
    chrome.action.setBadgeText({ text: '' }); 
    console.log(`JavaScript files for tab ${tabId} cleared.`);
  });
}

function extractJSFiles() {
  return performance.getEntriesByType('resource')
    .filter(entry => entry.initiatorType === 'script')
    .map(entry => entry.name);
}
