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
let currentQuote = null;

function showRandomQuote() {
    let index;
    do {
        index = Math.floor(Math.random() * quotes.length);
    } while (index === lastIndex);
    lastIndex = index;
    currentQuote = quotes[index];
    quoteEl.textContent = currentQuote.text;
    authorEl.textContent = "— " + currentQuote.author;
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

const FAVORITES_KEY = "daily-quote-favorites";

function loadFavorites() {
    try {
        return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
    } catch (error) {
        return [];
    }
}

function saveFavorites(list) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(list));
}

const favoriteBtn = document.getElementById("favorite");

const favoritesEl = document.getElementById("favorites");

function renderFavorites() {
    const list = loadFavorites();
    favoritesEl.innerHTML = "";
    if (list.length === 0) {
        const empty = document.createElement("li");
        empty.textContent = "Chưa có câu nào.";
        favoritesEl.appendChild(empty);
        return;
    }
    list.forEach((q) => {
        const li = document.createElement("li");
        li.textContent = `${q.text} — ${q.author}`;
        favoritesEl.appendChild(li);
    });
}

favoriteBtn.addEventListener("click", () => {
    const list = loadFavorites();
    const exists = list.some((q) => q.text === currentQuote.text);
    if (!exists) {
        list.push(currentQuote);
        saveFavorites(list);
        renderFavorites();
    }
    favoriteBtn.textContent = exists ? "Đã có rồi" : "Đã lưu!";
    setTimeout(() => {
        favoriteBtn.textContent = "Yêu thích";
    }, 1500);
});

renderFavorites();