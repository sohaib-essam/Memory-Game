// Main Vars
let duration = 1000;
let blocksContainer = document.querySelector(".memory-game");
let blocks = [...document.querySelectorAll(".memory-game .block")];
let range = [...Array(blocks.length).keys()];
let backFace = document.querySelectorAll(".block .back");
let frontFace = document.querySelectorAll(".block .front");

// Remove Overlay And Change The Value Of The Name Span {********On Start The Game********}
document.querySelector(".overlay span").addEventListener("click", () => {
  // Get The Name From The Prompt
  let yourName = prompt("Whats Your Name");
  document.querySelector(".overlay").remove();
  // Check If Nam eIs Null Or Not Been Written
  yourName == null || yourName == ""
    ? document.querySelector(".name span").innerHTML = "Unknown"
    : document.querySelector(".name span").innerHTML = yourName;
  // Show Imgs For A Period
  setInterval(() => {
    backFace.forEach(face => face.style.transform = "rotateY(180deg)");
    frontFace.forEach(face => face.style.transform = "rotateY(0)");
    blocksContainer.classList.remove("stop-clicking");
  }, 3000)
});

shuffle(range);

// Change The Order Of The Blocks And Add Event Listener On "Click" To Flip
blocks.forEach((block, index) => {
  block.style.order = range[index];
  block.addEventListener("click", () => {
    flip(block);
  })
});

// Shuffle The Array Elements
function shuffle(array) {
  let current = array.length;
  while (current  > 0) {
    // Get Random Num
    random = Math.floor(Math.random() * current);
    current--;
    // Swap Elements
    [array[current], array[random]] = [array[random], array[current]]
  }
  return array;
}

// Ckeck If Flipped Blocks Is == 2 For Stop Clicking On The Blocks And Check If They Matched
function flip(block) {
  block.classList.add("flipped");
  let flippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains("flipped"));
  if (flippedBlocks.length === 2) {
    stopClick();
    ifMatched(flippedBlocks[0], flippedBlocks[1]);
  }
}

// Disable Clicking On The Blocks For A Duration
function stopClick() {
  blocksContainer.classList.add("stop-clicking");
  setTimeout(() => {
    blocksContainer.classList.remove("stop-clicking");
  }, duration)
}

// Check Matched Blocks
function ifMatched(first, second) {
  let wrongTriesSpan = document.querySelector(".wrong-tries span");
  if (first.dataset.category === second.dataset.category) {
    first.classList.remove("flipped");
    second.classList.remove("flipped");
    first.classList.add("matched");
    second.classList.add("matched");

    document.getElementById("win").play();
  } else {
    wrongTriesSpan.innerHTML = parseInt(wrongTriesSpan.innerHTML) + 1;
    setTimeout(() => {
      first.classList.remove("flipped");
      second.classList.remove("flipped");
    }, duration);
    document.getElementById("fail").play();
  }
}