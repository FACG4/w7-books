
const request =  (method, url, payload, cb) => {
  var xhr = new XMLHttpRequest();
  var payloadString = JSON.stringify(payload);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        cb(null, JSON.parse(xhr.responseText));
      } else {
        cb(true);
      }
    }
  };
  xhr.open(method, url);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(payloadString);
}

request('GET', '/booksList', null, (err, books) => {
  if(err) {
    throw new Error(err);
  } else {
    const container = document.getElementById('reserveBook');
    const ul = document.createElement('ul');
    const head = document.createElement('li');

    const bookNam= document.createElement('span');
    const auth = document.createElement('span');
    const year = document.createElement('span');

    bookNam.textContent = "Book Name";
    auth.textContent = "Author";
    year.textContent = "Year";
    head.appendChild(bookNam);
  head.appendChild(auth);
  head.appendChild(year);
  ul.appendChild(head);

    books.forEach((book) => {
      const {book_name, author , year} = book;
      const li = document.createElement('li');
      const bookNameLi = document.createElement('span');
      const authorLi = document.createElement('span');
      const yearLi = document.createElement('span');
      bookNameLi.textContent = book_name;
      authorLi.textContent = author;
      yearLi.textContent = year;
      li.appendChild(bookNameLi);
      li.appendChild(authorLi);
      li.appendChild(yearLi);
      ul.appendChild(li);
    })
    container.replaceChild(ul, container.firstElementChild)
  }
});
