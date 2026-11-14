const quotes = [
  { text: "Có công mài sắt, có ngày nên kim.", author: "Tục ngữ Việt Nam" },
  { text: "Đi một ngày đàng, học một sàng khôn.", author: "Tục ngữ Việt Nam" },
  { text: "Thất bại là mẹ thành công.", author: "Tục ngữ Việt Nam" },
  { text: "Có chí thì nên.", author: "Tục ngữ Việt Nam" },
  { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
  { text: "Premature optimization is the root of all evil.", author: "Donald Knuth" },
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  { text: "Một cây làm chẳng nên non, ba cây chụm lại nên hòn núi cao.", author: "Tục ngữ Việt Nam" },
  { text: "Uống nước nhớ nguồn.", author: "Tục ngữ Việt Nam" },
  { text: "Lá lành đùm lá rách.", author: "Tục ngữ Việt Nam" },
  { text: "Programs must be written for people to read.", author: "Harold Abelson" },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
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

const copyBtn = document.getElementById("copy");

copyBtn.addEventListener("click", () => {
    const content = `${quoteEl.textContent} ${authorEl.textContent}`;
    navigator.clipboard.writeText(content);
    copyBtn.textContent = "Đã copy!";
    setTimeout(() => {
        copyBtn.textContent = "Copy";
    }, 1500);
});

function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 5) return "Chào buổi tối";
    if (hour < 11) return "Chào buổi sáng";
    if (hour < 13) return "Chào buổi trưa";
    if (hour < 18) return "Chào buổi chiều";
    return "Chào buổi tối";
}

document.getElementById("greeting").textContent = getGreeting();


document.addEventListener("keydown", (event) => {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    if (event.key === "n" || event.key === "N") {
        showRandomQuote();
    }
});