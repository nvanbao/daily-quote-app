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

const CUSTOM_KEY = "daily-quote-custom";

function loadCustomQuotes() {
    try {
        return JSON.parse(localStorage.getItem(CUSTOM_KEY)) || [];
    } catch (error) {
        return [];
    }
}

function saveCustomQuotes(list) {
    try {
        localStorage.setItem(CUSTOM_KEY, JSON.stringify(list));
    } catch (error) {
        // bỏ qua nếu trình duyệt chặn localStorage
    }
}

quotes.push(...loadCustomQuotes());

const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");

let currentQuote = null;
let selectedAuthor = "";

function displayQuote(quote) {
    currentQuote = quote;
    quoteEl.textContent = quote.text;
    authorEl.textContent = "— " + quote.author;
}

function getPool() {
    return selectedAuthor ? quotes.filter((q) => q.author === selectedAuthor) : quotes;
}

function showRandomQuote() {
    const pool = getPool();
    let quote;
    do {
        quote = pool[Math.floor(Math.random() * pool.length)];
    } while (pool.length > 1 && quote === currentQuote);
    displayQuote(quote);
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

function removeFavorite(text) {
    const list = loadFavorites().filter((q) => q.text !== text);
    saveFavorites(list);
    renderFavorites();
}

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
        li.textContent = `${q.text} — ${q.author} `;
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "✕";
        removeBtn.className = "remove";
        removeBtn.addEventListener("click", () => removeFavorite(q.text));
        li.appendChild(removeBtn);
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

function getQuoteOfDay() {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const dayOfYear = Math.floor((today - startOfYear) / 86400000);
    return quotes[dayOfYear % quotes.length];
}

document.getElementById("daily").addEventListener("click", () => {
    displayQuote(getQuoteOfDay());
});

const authorFilter = document.getElementById("author-filter");

function renderAuthorOptions() {
    const authors = [...new Set(quotes.map((q) => q.author))];
    authorFilter.innerHTML = "";
    const all = document.createElement("option");
    all.value = "";
    all.textContent = "Tất cả tác giả";
    authorFilter.appendChild(all);
    authors.forEach((name) => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        authorFilter.appendChild(option);
    });
    authorFilter.value = selectedAuthor;
}

renderAuthorOptions();
updateCount();

authorFilter.addEventListener("change", () => {
    selectedAuthor = authorFilter.value;
    showRandomQuote();
});

document.getElementById("clear-favorites").addEventListener("click", () => {
    if (loadFavorites().length === 0) return;
    if (confirm("Xóa tất cả câu yêu thích?")) {
        saveFavorites([]);
        renderFavorites();
    }
});

const newTextEl = document.getElementById("new-text");
const newAuthorEl = document.getElementById("new-author");
const formStatusEl = document.getElementById("form-status");

document.getElementById("add-quote").addEventListener("click", () => {
    const text = newTextEl.value.trim();
    const author = newAuthorEl.value.trim() || "Ẩn danh";
    if (!text) {
        formStatusEl.textContent = "Vui lòng nhập nội dung câu";
        return;
    }
    const quote = { text, author };
    quotes.push(quote);
    saveCustomQuotes([...loadCustomQuotes(), quote]);
    renderAuthorOptions();
    displayQuote(quote);
    newTextEl.value = "";
    newAuthorEl.value = "";
    formStatusEl.textContent = "Đã thêm câu của bạn!";
});

const countEl = document.getElementById("count");

function updateCount() {
    countEl.textContent = `Có ${quotes.length} câu trích dẫn`;
}

updateCount();