const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

let joke = "";

// To toggle the button between enable/disable state
function toggleButton() {
  button.disabled = !button.disabled;
}

// passing joke to VoiceRSS API
function tellJoke(joke) {
  VoiceRSS.speech({
    key: apiKey,
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// Fetching jokes from JokesAPI(url: https://sv443.net/jokeapi/v2/)
async function getJokes() {
  const apiURL = "https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist";
  try {
    // disable the button
    toggleButton();
    // get the joke
    const response = await fetch(apiURL);
    const data = await response.json();
    joke = data.setup ? `${data.setup} ... ${data.delivery}` : `${data.joke}`;
    // text-to-speech
    tellJoke(joke);
  } catch (error) {
    console.log("getJokes catchBlock: ", error);
  }
}

// Event Listeners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
