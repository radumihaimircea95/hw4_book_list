class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  static addBookToList(book) {
    const list = document.querySelector(".book-row");

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
    <td><button type=button class='remove-el'><i class="fa-solid fa-trash"></i></button></td>
    `;

    list.appendChild(row);
  }
  static deleteBook(item) {
    if (item.classList.contains("remove-el")) {
      item.parentElement.parentElement.remove();
    }
  }

  static alertMessage(message, className) {
    const messageContainer = document.createElement("div");
    messageContainer.className = `alert alert-${className}`;
    messageContainer.appendChild(document.createTextNode(message));
    const appContainer = document.querySelector(".container");
    const formContainer = document.querySelector(".form");
    appContainer.insertBefore(messageContainer, formContainer);

    setTimeout(() => document.querySelector(".alert").remove(), 2000);
  }
  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
}

document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  if (title === "" || author === "" || isbn === "") {
    UI.alertMessage(
      "Some fields are empty. Fill in all of them to proceed.",
      "danger"
    );
  } else {
    const book = new Book(title, author, isbn);
    UI.addBookToList(book);
    UI.alertMessage("Book successfully added", "info");
    UI.clearFields();
  }
});

document.querySelector(".book-row").addEventListener("click", (e) => {
  UI.deleteBook(e.target);
  UI.alertMessage("Book succesfully removed", "warning");
});
