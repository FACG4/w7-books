BEGIN;

DROP TABLE IF EXISTS users, books, reserve cascade;

CREATE TABLE books (
  id serial PRIMARY KEY,
  book_name VARCHAR(50) NOT NULL UNIQUE,
  year INTEGER NOT NULL,
  author VARCHAR(50) NOT NULL
);

CREATE TABLE users (
  id serial PRIMARY KEY,
  first_name  VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(50) NOT NULL CHECK (length(password)>=6)
);

CREATE TABLE reserve (
  id serial PRIMARY KEY,
  user_id INTEGER REFERENCES users (id),
  book_id INTEGER REFERENCES books (id),
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL
);

INSERT INTO books (book_name, year, author) VALUES
('Eloquent JavaScript', 2017, 'Marijn Haverbeke'),
('You Dont Know JS', 2014,'Kyle Simpson'),
('Automate the Boring Stuff with Python', 2015, 'Al Sweigart'),
('Think Python', 2015, 'Allen B. Downey'),
('JavaScript Patterns', 2010, 'Stoyan Stefanov');

INSERT INTO users (first_name, last_name, email, password) VALUES
('Haneen', 's', 'haneen@gmail.com', '1212133'),
('Abdalsamad', 'm', 'abdalsamad.y.m@gmail.com', '1434359'),
('John', 'Doe', 'johndoe@gmail.com', 'jo125353'),
('Jane', 'Doete', 'jane@gmail.com', 'je85652');

INSERT INTO reserve (user_id, book_id, start_date, end_date) VALUES
(1,1,'2018-01-05', '2018-02-15'),
(2,2, '2018-03-11','2018-08-15'),
(3,4, '2018-04-17', '2018-04-25');

COMMIT;
