const quotes = [
  { text: "Có công mài sắt, có ngày nên kim.", author: "Tục ngữ Việt Nam" },
  { text: "Đi một ngày đàng, học một sàng khôn.", author: "Tục ngữ Việt Nam" },
  { text: "Thất bại là mẹ thành công.", author: "Tục ngữ Việt Nam" },
  { text: "Có chí thì nên.", author: "Tục ngữ Việt Nam" },
  { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
  { text: "Premature optimization is the root of all evil.", author: "Donald Knuth" },
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
];

const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");

let lastIndex = -1;

function showRandomQuote() {
  let index;
  do {
    index = Math.floor(Math.random() * quotes.length);
  } while (index === lastIndex);
  lastIndex = index;
  const { text, author } = quotes[index];
  quoteEl.textContent = text;
  authorEl.textContent = "— " + author;
}

showRandomQuote();

document.getElementById("new-quote").addEventListener("click", showRandomQuote);