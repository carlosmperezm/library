const library = [];
const addButton = document.querySelector('button');


class Book {
  #title;
  #author;
  #pages;
  #read = false;

  constructor(title, author, pages) {
    this.#title = title;
    this.#author = author;
    this.#pages = pages;
  }

  get title() { return this.#title; }
  get author() { return this.#author; }
  get pages() { return this.#pages; }
  get isRead() { return this.#read; }

  toggleRead() {
    if (this.#read) this.#read = false;
    else this.#read = true;
  }

}

class BookCardUI {
  #card;
  #book;
  #trashIcon;
  #readIcon;
  #doneIcon;
  #title;
  #author;
  #pages;
  #deleteButton;
  #readButton;

  constructor(book) {
    this.#card = document.createElement('div');
    this.#book = book;
    this.#createTrasIcon('icons/delete.svg');
    this.#createReadIcon('icons/read.svg');
    this.#createDoneIcon('icons/done.svg');
    this.#createTitleElement();
    this.#createAuthorElement();
    this.#createPagesElement();
    this.#createDeleteButton();
    this.#createReadButton();

    this.#card.classList.add('book-card');
    this.#card.classList.add('card');


    if (book.isRead) {
      this.#doneIcon.classList.toggle('hidden');
      this.#card.classList.toggle('read');
      this.#readButton.textContent = 'Mark as Not Read';
      this.#readIcon.src = 'icons/not-read.svg';
    }
    this.#readButton.appendChild(this.#readIcon);


    this.#card.appendChild(this.#doneIcon);
    this.#card.appendChild(this.#title);
    this.#card.appendChild(this.#author);
    this.#card.appendChild(this.#pages);
    this.#card.appendChild(this.#deleteButton);
    this.#card.appendChild(this.#readButton);

    return this.#card;

  }

  #createReadIcon(src) {
    this.#readIcon = document.createElement('img');
    this.#readIcon.src = src;
    this.#readIcon.textContent = 'Mark as read';
    this.#readIcon.classList.add('icon');
  }

  #createDoneIcon(src) {
    this.#doneIcon = document.createElement('img');
    this.#doneIcon.src = src;
    this.#doneIcon.classList.add('icon');
    this.#doneIcon.classList.add('done-icon');
    this.#doneIcon.classList.add('hidden');

  }
  #createTitleElement() {
    this.#title = document.createElement('p');
    this.#title.classList.add('book-title');
    this.#title.textContent = `${this.#book.title}`;

  }
  #createAuthorElement() {
    this.#author = document.createElement('p');
    this.#author.textContent = `By: ${this.#book.author} `;

  }
  #createPagesElement() {
    this.#pages = document.createElement('p');

    this.#pages.textContent = `Pages: ${this.#book.pages}`;
  }
  #createDeleteButton() {
    this.#deleteButton = document.createElement('button');
    this.#deleteButton.textContent = 'Delete';
    this.#deleteButton.classList.add('delete-button');
    this.#deleteButton.classList.add('clickable');
    this.#deleteButton.appendChild(this.#trashIcon);

  }
  #createReadButton() {
    this.#readButton = document.createElement('button');
    this.#readButton.textContent = 'Mark as Read';
    this.#readButton.classList.add('clickable');
    this.#readButton.classList.add('read-button');

  }

  #createTrasIcon(src) {
    this.#trashIcon = document.createElement('img');
    this.#trashIcon.src = src;
    this.#trashIcon.classList.add('icon');
  }
}

class BookForm {
  #instance;

  constructor() {
    if (this.#instance) return this.#instance;
    return this.#createBookForm();

  }

  #createBookForm() {
    this.#instance = document.createElement('form');
    this.#instance.method = 'POST';
    this.#instance.classList.add('card');

    const titleP = document.createElement('p');
    const titleInput = document.createElement('input');
    titleInput.id = 'title';
    titleInput.required = true;
    const titleLabel = document.createElement('label');
    titleLabel.textContent = 'Title:';
    titleLabel.htmlFor = titleInput.id;
    titleP.appendChild(titleLabel);
    titleP.appendChild(titleInput);

    const authorP = document.createElement('p');
    const authorInput = document.createElement('input');
    authorInput.id = 'author';
    authorInput.required = true;
    const authorLabel = document.createElement('label');
    authorLabel.textContent = 'Author:';
    authorLabel.htmlFor = authorInput;
    authorP.appendChild(authorLabel);
    authorP.appendChild(authorInput);

    const pagesP = document.createElement('p');
    const pagesInput = document.createElement('input');
    pagesInput.type = 'number';
    pagesInput.id = 'pages-number';
    pagesInput.required = true;
    const pagesLabel = document.createElement('label');
    pagesLabel.textContent = 'Number of pages:';
    pagesLabel.htmlFor = pagesInput.id;
    pagesP.appendChild(pagesLabel);
    pagesP.appendChild(pagesInput);

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Submit';
    submitButton.classList.add('clickable');

    const cancelIcon = document.createElement('img');
    cancelIcon.src = 'icons/cancel.svg';
    cancelIcon.classList.add('cancel-button');
    cancelIcon.classList.add('clickable');



    this.#instance.appendChild(titleP);
    this.#instance.appendChild(authorP);
    this.#instance.appendChild(pagesP);
    this.#instance.appendChild(submitButton);
    this.#instance.appendChild(cancelIcon);


    return this.#instance;
  }

}


function addBookToLibrary(book) {
  library.push(book);

}

function displayBooks(library) {
  let i = 0;
  const cardsContainer = document.querySelector('.cards-container');
  cardsContainer.replaceChildren();

  library.forEach((book) => {
    const card = new BookCardUI(book);
    card.dataset.indexNumber = i;
    cardsContainer.appendChild(card);
    i += 1;
  });
}


function displayFormUi(form) {
  blurBackgroundElement.classList.add('blur');
  blurBackgroundElement.appendChild(form);
  document.body.appendChild(blurBackgroundElement);
}

const blurBackgroundElement = document.createElement('div');
const bookForm = new BookForm();


addButton.addEventListener('click', () => {
  displayFormUi(bookForm);
});


document.body.addEventListener('submit', (event) => {
  const bookTitle = document.querySelector('#title');
  const bookAuthor = document.querySelector('#author');
  const pagesNumber = document.querySelector('#pages-number');

  const book = new Book(bookTitle.value, bookAuthor.value, pagesNumber.value);
  addBookToLibrary(book);
  displayBooks(library);

  bookForm.reset();
  document.body.removeChild(blurBackgroundElement);
  event.preventDefault();
});


document.body.addEventListener('click', (event) => {
  if (event.target.classList.contains('cancel-button') || event.target.className === 'blur') {
    bookForm.reset();
    document.body.removeChild(blurBackgroundElement);
  }
  else if (event.target.classList.contains('delete-button')) {
    const elementIndex = event.target.parentNode.dataset.indexNumber;
    library.splice(elementIndex, 1);
    displayBooks(library);
  }
  else if (event.target.classList.contains('read-button')) {
    const elementIndex = event.target.parentNode.dataset.indexNumber;
    const book = library[elementIndex];
    book.toggleRead();
    const isRead = book.isRead;
    const bookCards = document.querySelectorAll('.book-card');
    const currentBookCard = bookCards[elementIndex];
    const readButton = currentBookCard.querySelector('.read-button');


    currentBookCard.classList.toggle('read');
    const readIcon = document.createElement('img');
    readIcon.classList.add('icon');
    const doneIcon = currentBookCard.querySelector('.done-icon');
    doneIcon.classList.toggle('hidden');

    if (isRead) {
      readIcon.src = 'icons/not-read.svg';
      readButton.textContent = 'Mark as Not Read';
    }
    else {
      readIcon.src = 'icons/read.svg';
      readButton.textContent = 'Mark as Read';

    }
    readButton.appendChild(readIcon);

  }


});

