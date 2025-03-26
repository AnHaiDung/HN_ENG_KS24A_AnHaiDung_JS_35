const modal = document.querySelector("#modal");
const showFormButton = document.querySelector("#showFormButton");
const closeButton = document.querySelector(".close-button");
const formElement = document.querySelector("#bookmarkForm");
const nameInputElement = document.querySelector("#bookmarkName");
const urlInputElement = document.querySelector("#bookmarkURL");
const bookmarkContainer = document.querySelector("#bookmarkList");
const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

showFormButton.addEventListener("click", function () {
    modal.style.display = "block";
});

closeButton.addEventListener("click", function () {
    modal.style.display = "none";
});

window.addEventListener("click", function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

formElement.addEventListener("submit", function (event) {
    event.preventDefault();
    const nameValue = nameInputElement.value.trim();
    const urlValue = urlInputElement.value.trim();
    
    const bookmark = {
        id: Math.ceil(Math.random() * 100000),
        name: nameValue,
        url: urlValue
    };

    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    
    handleResetForm();
    renderBookmarks();
});

function renderBookmarks() {
    const bookmarkHtmls = bookmarks.map((bookmark, index) => {
        return `
        <li>
            <a href="${bookmark.url}" target="_blank">${bookmark.name}</a>
            <button onclick="handleDelete(${index})">X</button>
        </li>`;
    });
    bookmarkContainer.innerHTML = bookmarkHtmls.join("");
}

function handleDelete(index) {
    bookmarks.splice(index, 1);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    renderBookmarks();
}

function handleResetForm() {
    nameInputElement.value = "";
    urlInputElement.value = "";
    modal.style.display = "none";
}

renderBookmarks();