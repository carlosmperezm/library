const library = [];
const addButton = document.querySelector("button");

function Book(title, author, pageNumbers) {
    const book = {
        title: title,
        author: author,
        pages: pageNumbers,
    }

    return book;
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
    readIcon.classList.add("icon")


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
    readButton.textContent = "Read";
    readButton.classList.add("read-button")
    readButton.classList.add('clickable');
    readButton.appendChild(readIcon);


    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(deleteButton);
    card.appendChild(readButton);

    return card;
}


// function displayBook(book) {
//     let cardsContainer = document.querySelector(".cards-container");
//     let card = createBookCardUI(book);
//     cardsContainer.appendChild(card);
// }

function displayBooks(library) {
    let i = 0;
    const cardsContainer = document.querySelector(".cards-container");
    cardsContainer.innerHTML = "";

    library.forEach(book => {
        const card = createBookCardUI(book);
        card.setAttribute("index-number", `${i}`)
        cardsContainer.appendChild(card);
        i += 1;
        // displayBook(book);
    })
}

function createBookForm() {

    const bookForm = document.createElement("form");
    bookForm.method = "POST";
    bookForm.classList.add("card")


    const titleP = document.createElement("p");
    const titleInput = document.createElement("input");
    titleInput.id = "title"
    const titleLabel = document.createElement("label");
    titleLabel.textContent = "Title:";
    titleLabel.htmlFor = titleInput.id;
    titleP.appendChild(titleLabel);
    titleP.appendChild(titleInput);

    const authorP = document.createElement("p");
    const authorInput = document.createElement("input");
    authorInput.id = "author";
    const authorLabel = document.createElement("label");
    authorLabel.textContent = "Author:";
    authorLabel.htmlFor = authorInput;
    authorP.appendChild(authorLabel);
    authorP.appendChild(authorInput);

    const pagesP = document.createElement("p");
    const pagesInput = document.createElement("input");
    pagesInput.type = "number";
    pagesInput.id = "pages-number";
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

addButton.addEventListener("click", () => {
    displayFormUi(bookForm);
});


document.body.addEventListener("submit", event => {
    const bookTitle = document.querySelector("#title");
    const bookAuthor = document.querySelector("#author");
    const pagesNumber = document.querySelector("#pages-number");

    const book = Book(bookTitle.value, bookAuthor.value, pagesNumber.value);
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

})



