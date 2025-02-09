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
