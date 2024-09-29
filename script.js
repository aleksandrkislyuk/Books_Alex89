document.addEventListener('DOMContentLoaded', () => {
  displayBooks();
});

const books = JSON.parse(localStorage.getItem('books')) || [];

const bookList = document.querySelector("#bookList");

function displayBooks() {
  bookList.innerHTML = "";
  books.forEach(displayBook);
}

function displayBook(book) {
  const bookNumber = books.indexOf(book);
  bookList.innerHTML += `
  <div id="book">
  <h2>${book.title}</h2>
  <p>${book.author}</p>
  <p>${book.year}</p>
  <p>${book.genre}</p>
  <span>${book.status}</span>
  <button id="button_delete" onclick="deleteBook(${bookNumber})">Удалить</button>
  <button id="button_change" onclick="changeBook(${bookNumber})">Изменить</button> 
  </div>
  `; 
}

function loadBooks() {
  const bookList = document.getElementById('bookList');
  bookList.innerHTML = '';
  books.forEach(displayBook);
}

function addBook() {
  const book = {};
  book.title = document.getElementById('title').value;
  book.author = document.getElementById('author').value;
  book.year = parseInt(document.getElementById('year').value);
  book.genre = document.getElementById('genre').value;
  book.status = document.getElementById('status').value;
  books.push(book);
  displayBooks();
  saveBooks();
  filterBooks();
  filter_Books();
  document.forms[0].reset();
  return false;
  
}

function add_Book() {
  addBook();
  window.location.reload();
}

function deleteBook(bookNumber) {
  books.splice(bookNumber, 1);
  displayBooks();
  saveBooks();
  filterBooks();
  filter_Books();
}

function delete_Book () {
  localStorage.clear();
 window.location.reload();
 }

function reload() {
  window.location.reload();
}

function saveBooks() {
  localStorage.setItem("books", JSON.stringify(books));
}

function changeBook(bookNumber) {
  /*очистка формы*/
  document.forms[0].reset();
  /*определение идентификатора для поиска книги в массиве*/
  const selectedBookList = books[bookNumber];
  /*Заполнение формы*/
  document.getElementById('title').value = selectedBookList.title;
  document.getElementById('author').value = selectedBookList.author;
  document.getElementById('year').value = selectedBookList.year;
  document.getElementById('genre').value = selectedBookList.genre;
  document.getElementById('status').value = selectedBookList.status;
  /*удалениие предыдущего варианта карточки книги*/
  deleteBook(bookNumber);
  filterBooks();
  filter_Books();
}

/*составление списка книг по шаблону*/
const bookListHTML = books.map(book => {
  return `<li>${book.title},  ${book.author}, ${book.year}, ${book.genre}, ${book.status}.</li>`;
}).join('\n');
document.getElementById('list').innerHTML = bookListHTML;

/*количество книг в библиотеке*/
const numOfBooks = books.length;
document.getElementById('allList').innerHTML = `Всего книг: ${numOfBooks}`;

/*количество прочитанных книг*/
function readBook() {
  let readBooks = books.filter(book => book.status === 'Да, прочитана');
  return readBooks.length;
}
let read = readBook();
document.getElementById('read').innerHTML = `${read}`;

/*количество не прочитанных книг*/

function notReadBook() {
  let notReadBooks = books.filter(book => book.status === 'Не прочитана');
  return notReadBooks.length;
}
let notRead = notReadBook();
document.getElementById('notRead').innerHTML = `${notRead}`;

//окно выбора - удалять/не удалять весь массив
//function deleteArray() {
 // if (confirm("Вы уверены, что хотите всё удалить ?\n OK - УДАЛИТЬ, \n Отмена - НЕ УДАЛЯТЬ,")) {
  //  alert("УДАЛЯТЬ - нажмите OK!");
    //тут удаление записи из базы  }
  //else {
    //alert("НЕ УДАЛЯТЬ - нажмите OK!");
    //тут просто остаемся на странице }}

function filterBooks() {
  const filterBooks = document.getElementById('filterBooks');
  const filterText = filterBooks.value.toLowerCase();
  const bookList = document.getElementById('bookList')
  Array.from(bookList.children).forEach(book => {
    const bookText = book.querySelector('h2').textContent.toLowerCase();
    
    if (bookText.includes(filterText)) {
      book.style.display = '';
    }
    else {
      book.style.display = 'none';
    } 
  });
}

function filter_Books() {
  const filter_Books = document.getElementById('filter_Books');
  const filter_Text = filter_Books.value.toLowerCase();
  const bookList = document.getElementById('bookList')
  Array.from(bookList.children).forEach(book => {
    const bookText = book.querySelector('span').textContent.toLowerCase();
    
    if (bookText.includes(filter_Text)) {
      book.style.display = '';
    }
    else {
      book.style.display = 'none';
    } 
  });
}












