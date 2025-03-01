const library = [];
const addButton = document.querySelector("button");

function Book(title, author, pageNumbers) {
    this.title = title;
    this.author = author;
    this.pages = pageNumbers;
    this.read = false;

    return this;
}

function addBookToLibrary(book) {
    library.push(book);

}

function createBookCardUI(book) {
    const trashIcon = document.createElement("img");
    trashIcon.src = "icons/delete.svg";
    trashIcon.classList.add("icon")


    const readIcon = document.createElement("img");
    readIcon.src = "icons/read.svg";
    readIcon.textContent = "Mark as read"
    readIcon.classList.add("icon")

    const doneIcon = document.createElement("img");
    doneIcon.src = "icons/done.svg";
    doneIcon.classList.add("icon");
    doneIcon.classList.add("done-icon");
    doneIcon.classList.add("hidden");


    const card = document.createElement("div");
    card.classList.add("book-card");
    card.classList.add("card");


    const title = document.createElement("p");
    title.classList.add("book-title");
    title.textContent = `${book.title}`

    const author = document.createElement("p");
    author.textContent = `By: ${book.author} `

    const pages = document.createElement("p");
    pages.textContent = `Pages: ${book.pages}`


    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete"
    deleteButton.classList.add("delete-button")
    deleteButton.classList.add("clickable")
    deleteButton.appendChild(trashIcon);

    const readButton = document.createElement("button");
    readButton.textContent = "Mark as Read";
    readButton.classList.add('clickable');
    readButton.classList.add("read-button")
    if (book.read) {
        doneIcon.classList.toggle("hidden");
        card.classList.toggle("read");
        readButton.textContent = "Mark as Not Read";
        readIcon.src = "icons/not-read.svg"
    }
    readButton.appendChild(readIcon);


    card.appendChild(doneIcon);
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(deleteButton);
    card.appendChild(readButton);

    return card;
}


function displayBooks(library) {
    let i = 0;
    const cardsContainer = document.querySelector(".cards-container");
    cardsContainer.replaceChildren();

    library.forEach(book => {
        const card = createBookCardUI(book);
        card.dataset.indexNumber = i;
        cardsContainer.appendChild(card);
        i += 1;
    })
}

function createBookForm() {

    const bookForm = document.createElement("form");
    bookForm.method = "POST";
    bookForm.classList.add("card")



    const titleP = document.createElement("p");
    const titleInput = document.createElement("input");
    titleInput.id = "title"
    titleInput.required = true;
    const titleLabel = document.createElement("label");
    titleLabel.textContent = "Title:";
    titleLabel.htmlFor = titleInput.id;
    titleP.appendChild(titleLabel);
    titleP.appendChild(titleInput);

    const authorP = document.createElement("p");
    const authorInput = document.createElement("input");
    authorInput.id = "author";
    authorInput.required = true;
    const authorLabel = document.createElement("label");
    authorLabel.textContent = "Author:";
    authorLabel.htmlFor = authorInput;
    authorP.appendChild(authorLabel);
    authorP.appendChild(authorInput);

    const pagesP = document.createElement("p");
    const pagesInput = document.createElement("input");
    pagesInput.type = "number";
    pagesInput.id = "pages-number";
    pagesInput.required = true;
    const pagesLabel = document.createElement("label");
    pagesLabel.textContent = "Number of pages:";
    pagesLabel.htmlFor = pagesInput.id;
    pagesP.appendChild(pagesLabel);
    pagesP.appendChild(pagesInput);

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Submit";
    submitButton.classList.add('clickable');

    const cancelIcon = document.createElement("img");
    cancelIcon.src = "icons/cancel.svg";
    cancelIcon.classList.add('cancel-button');
    cancelIcon.classList.add('clickable');



    bookForm.appendChild(titleP);
    bookForm.appendChild(authorP);
    bookForm.appendChild(pagesP);
    bookForm.appendChild(submitButton)
    bookForm.appendChild(cancelIcon);


    return bookForm;
}

function displayFormUi(form) {
    blurBackgroundElement.classList.add("blur");
    blurBackgroundElement.appendChild(form);
    document.body.appendChild(blurBackgroundElement);
}

const blurBackgroundElement = document.createElement("div");
const bookForm = createBookForm();

Book.prototype.toggleRead = function() {
    if (this.read) this.read = false;
    else this.read = true;
}
Book.prototype.isRead = function() {
    return this.read;
}

addButton.addEventListener("click", () => {
    displayFormUi(bookForm);
});


document.body.addEventListener("submit", event => {
    const bookTitle = document.querySelector("#title");
    const bookAuthor = document.querySelector("#author");
    const pagesNumber = document.querySelector("#pages-number");

    const book = new Book(bookTitle.value, bookAuthor.value, pagesNumber.value);
    addBookToLibrary(book);
    displayBooks(library);

    bookForm.reset();
    document.body.removeChild(blurBackgroundElement);
    event.preventDefault();
})


document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("cancel-button") || event.target.className == "blur") {
        bookForm.reset();
        document.body.removeChild(blurBackgroundElement);
    }
    else if (event.target.classList.contains("delete-button")) {
        const elementIndex = event.target.parentNode.dataset.indexNumber;
        library.splice(elementIndex, 1);
        displayBooks(library);
    }
    else if (event.target.classList.contains("read-button")) {
        const elementIndex = event.target.parentNode.dataset.indexNumber;
        const book = library[elementIndex];
        book.toggleRead();
        const isRead = book.isRead();
        const bookCards = document.querySelectorAll(".book-card");
        const currentBookCard = bookCards[elementIndex];
        const readButton = currentBookCard.querySelector(".read-button");


        currentBookCard.classList.toggle("read");
        const readIcon = document.createElement("img");
        readIcon.classList.add("icon")
        const doneIcon = currentBookCard.querySelector(".done-icon");
        doneIcon.classList.toggle("hidden");

        if (isRead) {
            readIcon.src = "icons/not-read.svg";
            readButton.textContent = "Mark as Not Read";
        }
        else {
            readIcon.src = "icons/read.svg";
            readButton.textContent = "Mark as Read";

        }
        readButton.appendChild(readIcon);

    }


})

