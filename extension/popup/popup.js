let selectedText = '';
let currentUrl = '';

// Get the selected text from background script
chrome.runtime.onMessage.listener((request, sender, sendResponse) => {
  if (request.type === 'SELECTION') {
    selectedText = request.text;
    currentUrl = request.url;
    document.getElementById('selected-text').textContent = selectedText;
  }
});

document.getElementById('search-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const additionalInput = document.getElementById('additional-input').value;
  
  try {
    const response = await fetch('http://localhost:5000/api/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: selectedText,
        additionalInput,
        url: currentUrl
      })
    });

    const data = await response.json();
    
    // Open chat window
    chrome.windows.create({
      url: `http://localhost:5000/chat?id=${data.conversation_id}`,
      type: 'popup',
      width: 800,
      height: 600
    });
    
    // Close the popup
    window.close();
  } catch (error) {
    console.error('Error:', error);
  }
});