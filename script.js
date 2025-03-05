document.addEventListener("DOMContentLoaded", () => {
    const englishText = document.getElementById("english-text")
    const hindiText = document.getElementById("hindi-text")
    const statusElement = document.getElementById("status")
  
    let translationTimeout
  
    // Add an event listener for input changes
    englishText.addEventListener("input", () => {
      // Clear any pending translation request
      clearTimeout(translationTimeout)
  
      const text = englishText.value.trim()
  
      // Don't translate if the text is empty
      if (text === "") {
        hindiText.value = ""
        statusElement.textContent = ""
        return
      }
  
      // Set a small delay to avoid too many API calls while typing
      translationTimeout = setTimeout(() => {
        translateText(text)
      }, 800)
    })
  
    // Function to translate text
    function translateText(text) {
      statusElement.textContent = "Translating..."
      statusElement.className = "loading"
  
      // Using the free MyMemory Translation API
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|hi`
  
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok")
          }
          return response.json()
        })
        .then((data) => {
          if (data.responseStatus === 200) {
            hindiText.value = data.responseData.translatedText
            statusElement.textContent = "Translation complete"
  
            // Clear the status after 2 seconds
            setTimeout(() => {
              statusElement.textContent = ""
            }, 2000)
          } else {
            throw new Error("Translation failed")
          }
        })
        .catch((error) => {
          console.error("Error:", error)
          statusElement.textContent = "Translation error. Please try again."
          statusElement.className = "error"
        })
    }
  })
  
  