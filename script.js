const author = document.getElementById("author");
const quote = document.getElementById("quote");
const newQuoteBtn = document.getElementById("new-quote");
const copyClipboard = document.getElementById("copy-clipboard");
const twitterShare = document.getElementById("twitter-share");
const exportImage = document.getElementById("export-image");
const quoteBox = document.getElementById("quote-box");

// function to fetch random quote from url
async function generateQuote() {
  const url = "https://api.freeapi.app/api/v1/public/quotes/quote/random";
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

// function to display the quote on the browser or website
async function displayRandomQuote() {
  let response = await generateQuote();
  quote.innerText = ` " ${response.data.content}`;
  author.innerText = ` ~ ${response.data.author}`;
}
displayRandomQuote();

// function to generate new quote when clicks on a button

newQuoteBtn.addEventListener("click", displayRandomQuote);

// function to copy the quote on the clipboard

async function writeToClipboard() {
  const copiedQuote = `${quote.innerText} ${author.innerText}`;
  try {
    await navigator.clipboard.writeText(copiedQuote);
    this.innerText = "Copied!";
    setTimeout(() => {
      this.innerText = "Copy to Clipboard";
    }, 1000);
  } catch (error) {
    console.log(error.message);
  }
}

// adding eventlisteners to copy the text to the clipboard

copyClipboard.addEventListener("click", writeToClipboard);

// adding eventlisteners to share the quote on twitter

twitterShare.addEventListener("click", () => {
  const finalContent = `${quote.innerText} ${author.innerText}`;
  const twitterURL = `https://x.com/intent/post?text=${finalContent}`;
  window.open(twitterURL, "_blank");
});

// adding eventlistener to export or save the quote on user machine

exportImage.addEventListener("click", () => {
  // html2canvas is a third party library that is used to capture the html dom and paint it on the canvas (you can call it as scrrenshot also)
  html2canvas(quoteBox, {
    // they are different options
    useCORS: false,
  }).then(function (canvas) {
    // conver the html text into a image using toDataURL method
    let imageData = canvas.toDataURL("image/png");
    // creating a element to hang on the image
    const link = document.createElement("a");
    //set the download attribute of the 'anchor' tag
    link.download = "quote.png";
    link.href = imageData;
    // append this link to the website
    document.body.appendChild(link);
    // user click to download the image
    link.click();
    // after the work done the link is removed from the DOM
    document.body.removeChild(link);
  });
});
