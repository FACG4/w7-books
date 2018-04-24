
# books
![alt text](https://dailygenius.com/wp-content/uploads/2014/06/stack_of_books.jpg)

What?

Our website that give you ability to reservation books thats is available

How?

First together we worked on the architecture of the code , then we chose the data that we will use it in our website , then we did a special function for use this data.

How to use ?

our site view available books list to the user ,
user can enter the book name , author of book and the date of deploy


```
CREATE DATABASE [db_name];
   CREATE USER [user_name] WITH SUPERUSER PASSWORD ['password'];
```
Now you can set the test database url in your config.env as follows (setting the values in square brackets to the values you defined in the steps above):
TEST_DB_URL = postgres://[user_name]:[password]@localhost:5432/[db_name]

```
Next open psql/pgcli in terminal and connect to your test database: \c [test_database_name]
```

Next you will run the db_build.sql file to create the schema and populate your test database with data: \i [full_path_to_db_build.sql]




Done By : Abdalsamad ,Inass, Haneen,Razan.
