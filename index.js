const library = [];

function Book(title, author, pageNumbers) {
    this.title = title;
    this.author = author;
    this.pageNumbers = pageNumbers;

    return this
}

function addBookToLibrary(book) {
    library.push(book);
    return;
}

function displayBooks() {
    library.forEach(() => {
        let card = document.createElement("div");
        let cardTitle = document.createElement("p").classList.add("card-title");
        let author = document.createElement("p");
        let pages = document.createElement("p");

        let deleteButton = document.createElement("button");
        deleteButton.value = "Delete";

        let readButton = document.createElement("button");
        readButton.value = "Read";
    })

}
