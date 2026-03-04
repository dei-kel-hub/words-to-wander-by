// Star animation
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const stars = Array.from({ length: 120 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  radius: Math.random() * 2.5 + 0.5,
  opacity: Math.random() * 0.5 + 0.3,
  speed: Math.random() * 0.008 + 0.003
}));

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(star => {
    star.opacity += star.speed;
    if (star.opacity > 1 || star.opacity < 0) star.speed *= -1;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}

drawStars();

const quotes = [
  { text: "We are all just walking each other home.", author: "Ram Dass" },
  { text: "At the touch of love, everyone becomes a poet.", author: "Plato" },
  { text: "The most beautiful things are not associated with money; they are memories and moments.", author: "Alek Wek" },
  { text: "I exist as I am, that is enough.", author: "Walt Whitman" },
  { text: "There is a crack in everything, that's how the light gets in.", author: "Leonard Cohen" },
  { text: "She was a girl who knew how to be happy even when she was sad.", author: "Marilyn Monroe" },
  { text: "In the middle of winter, I at last discovered that there was in me an invincible summer.", author: "Albert Camus" },
  { text: "To love and be loved is to feel the sun from both sides.", author: "David Viscott" },
  { text: "I took a deep breath and listened to the old brag of my heart: I am, I am, I am.", author: "Sylvia Plath" },
  { text: "The soul that sees beauty may sometimes walk alone.", author: "Johann Wolfgang von Goethe" },
  { text: "Be soft. Do not let the world make you hard.", author: "Iain Thomas" },
  { text: "You are enough just as you are.", author: "Meghan Markle" },
  { text: "She is a friend of my mind. She gather me, man.", author: "Toni Morrison" },
  { text: "The quieter you become, the more you are able to hear.", author: "Rumi" },
  { text: "Even the darkest night will end and the sun will rise.", author: "Victor Hugo" },
  { text: "I am not afraid of storms, for I am learning how to sail my ship.", author: "Louisa May Alcott" },
  { text: "Somewhere, something incredible is waiting to be known.", author: "Sharon Begley" },
  { text: "What is coming is better than what is gone.", author: "Unknown" },
  { text: "You carry so much love in your heart. Give some to yourself.", author: "R.Z." },
  { text: "The world is full of magic things, patiently waiting for our senses to grow sharper.", author: "W.B. Yeats" },
  { text: "I am made of water; of course I am emotional.", author: "Rupi Kaur" },
  { text: "Happiness is the consequence of personal effort.", author: "Elizabeth Gilbert" },
  { text: "She was never quite ready, but she was brave, and the universe listens to brave.", author: "Rebecca Ray" },
  { text: "Do anything, but let it produce joy.", author: "Walt Whitman" },
  { text: "The heart was made to be broken.", author: "Oscar Wilde" },
  { text: "I wonder if the snow loves the trees and fields.", author: "Lewis Carroll" },
  { text: "One must always be careful of bookshelves and what is written inside them.", author: "Cassandra Clare" },
  { text: "There is freedom waiting for you, on the breezes of the sky.", author: "Erin Hanson" },
  { text: "Loneliness is the poverty of self; solitude is the richness of self.", author: "May Sarton" },
  { text: "Keep some room in your heart for the unimaginable.", author: "Mary Oliver" }
];

function getRandomQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

function displayQuote() {
  const quote = getRandomQuote();
  const quoteText = document.getElementById("quote-text");
  const quoteAuthor = document.getElementById("quote-author");
  const tweetBtn = document.getElementById("tweet-btn");

  quoteText.classList.add("fade");
  quoteAuthor.classList.add("fade");

  setTimeout(() => {
    quoteText.textContent = `"${quote.text}"`;
    quoteAuthor.textContent = `— ${quote.author}`;
    tweetBtn.href = `https://twitter.com/intent/tweet?text="${quote.text}" — ${quote.author}`;

    quoteText.classList.remove("fade");
    quoteAuthor.classList.remove("fade");
  }, 300);
}

document.getElementById("new-quote-btn").addEventListener("click", displayQuote);

displayQuote();


// Favourites
document.getElementById("fav-btn").addEventListener("click", () => {
  const text = document.getElementById("quote-text").textContent;
  const author = document.getElementById("quote-author").textContent;

  if (!text || text === "Click the button to get a quote!") return;

  const list = document.getElementById("favourites-list");
  const section = document.getElementById("favourites-section");

  // Don't add duplicates
  const existing = Array.from(list.querySelectorAll("span")).map(s => s.textContent);
  if (existing.includes(text + " " + author)) return;

  section.classList.remove("hidden");

  const item = document.createElement("li");
  item.innerHTML = `<span>${text} <br><em>${author}</em></span><button class="remove-fav">✕</button>`;
  list.prepend(item);

  document.getElementById("fav-btn").textContent = "💜 Saved!";
  setTimeout(() => {
    document.getElementById("fav-btn").textContent = "🤍 Save";
  }, 1500);
});

// Remove individual favourite
document.getElementById("favourites-list").addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-fav")) {
    e.target.parentElement.remove();
    if (document.getElementById("favourites-list").children.length === 0) {
      document.getElementById("favourites-section").classList.add("hidden");
    }
  }
});

// Clear all favourites
document.getElementById("clear-favs-btn").addEventListener("click", () => {
  document.getElementById("favourites-list").innerHTML = "";
  document.getElementById("favourites-section").classList.add("hidden");
});

// Copy to clipboard
document.getElementById("copy-btn").addEventListener("click", () => {
  const text = document.getElementById("quote-text").textContent;
  const author = document.getElementById("quote-author").textContent;
  navigator.clipboard.writeText(text + " " + author);

  document.getElementById("copy-btn").textContent = "✅ Copied!";
  setTimeout(() => {
    document.getElementById("copy-btn").textContent = "📋 Copy";
  }, 1500);
});

// Spacebar shortcut
document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && e.target === document.body) {
    e.preventDefault();
    displayQuote();
  }
});