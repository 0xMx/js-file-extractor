# JS File Extractor

JS File Extractor is a powerful Chrome extension designed to extract and manage JavaScript files from web pages. It helps developers and security analysts by providing an organized list of JavaScript files used on the current page. The extension includes features for copying, saving, and deleting the extracted file URLs, making it an essential tool for web development and vulnerability detection.

## Features

- **Automatic Extraction:** Automatically extracts all JavaScript file URLs from the current web page when the extension icon is clicked.
- **Organized Display:** Displays the extracted URLs in a neatly organized table with columns for the file name and URL.
- **Copy URLs:** Provides a button to copy all extracted URLs to the clipboard with a single click.
- **Persistent Storage:** Saves the extracted results uniquely for each tab using the tab ID, ensuring that results are not mixed between tabs.
- **Automatic Update:** Automatically clears and updates stored results when the tab's URL changes.
- **Delete Output:** Includes a button to delete the extracted results and clear the display table.
- **Badge Counter:** Shows the number of JavaScript files extracted in a badge on the extension icon.
- **Developer Tools Integration:** Utilizes the "Tab Source" in the Developer Tools (F12) for extraction, ensuring accurate and comprehensive results.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/0xMx/js-file-extractor.git
   cd js-file-extractor
2. Open Chrome and navigate to chrome://extensions/.

3. Enable "Developer mode" by toggling the switch in the top right corner.

4. Click on the "Load unpacked" button and select the directory where you cloned the repository.

5. The extension should now appear in your extensions list with the name "JS File Extractor".

## Usage
1. Open any web page in Chrome.
2. Click on the JS File Extractor icon in the toolbar.
3. The extension will automatically extract all JavaScript file URLs from the current page and display them in a table.
4. Use the "Copy All URLs" button to copy all extracted URLs to the clipboard.
5. Use the "Delete Output" button to clear the results and reset the table.
6. The extraction process utilizes the "Tab Source" in the Developer Tools (F12) to ensure accurate and comprehensive results.

## How It Works
### Extracting JavaScript Files
The extension uses the performance.getEntriesByType('resource') method to gather all resources of type script. It then filters and extracts the URLs of these resources, displaying them in a user-friendly table. The extraction process is integrated with the "Tab Source" in the Developer Tools (F12) to ensure it captures all relevant JavaScript files.

### Persistent Storage
Results are saved using Chrome's storage.local API. Each tab's results are stored uniquely using the tab ID to ensure no mixing of results between different tabs.

### Automatic Updates
The background script listens for changes in the tab's URL. If a change is detected, it clears the stored results for that tab and updates the display, ensuring that only relevant JavaScript files are shown.

## Contact
[Meshari Almalki](https://www.x.com/slv0d)
