const library = [];
const addButton = document.querySelector("button");

function Book(title, author, pageNumbers) {
    this.title = title;
    this.author = author;
    this.pages = pageNumbers;

    return this
}

function addBookToLibrary(book) {
    library.push(book);
    return;
}

function createBookCardUI(book) {
    let trashIcon = document.createElement("img");
    trashIcon.src = "icons/delete.svg";
    trashIcon.classList.add("icon")

    let readIcon = document.createElement("img");
    readIcon.src = "icons/read.svg";
    readIcon.classList.add("icon")


    let card = document.createElement("div");
    card.classList.add("card");

    let title = document.createElement("p");
    title.classList.add("card-title");
    title.textContent = `${book.title}`

    let author = document.createElement("p");
    author.textContent = `By: ${book.author} `

    let pages = document.createElement("p");
    pages.textContent = `Pages: ${book.pages}`


    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete"
    deleteButton.classList.add("delete-button")
    deleteButton.appendChild(trashIcon);

    let readButton = document.createElement("button");
    readButton.textContent = "Read";
    readButton.classList.add("read-button")
    readButton.appendChild(readIcon);

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(deleteButton);
    card.appendChild(readButton);

    return card;
}

function displayBook(book) {
    let cardsContainer = document.querySelector(".cards-container");
    let card = createBookCardUI(book);
    cardsContainer.appendChild(card);
}

function displayBooks(library) {
    let cardsContainer = document.querySelector(".cards-container");
    library.forEach((book) => {
        let card = createBookCardUI(book);
        cardsContainer.appendChild(card);
    })
}


addButton.addEventListener("click", () => {
    let book = Book("title test", "author test", "pages test");
    addBookToLibrary(book);
    displayBook(book);
});
