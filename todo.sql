CREATE DATABASE ToDoApp;
use ToDoApp;
-- drop database ToDoApp;


CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);


CREATE TABLE tasks (
    task_id INT AUTO_INCREMENT PRIMARY KEY,
    task_name VARCHAR(100) NOT NULL,
    status VARCHAR(20) DEFAULT 'Pending',
    due_date DATE NOT NULL,
    user_id INT NOT NULL
);



commit;
-- truncate table users;
-- truncate table tasks;
-- drop table tasks;


select * from users;
select * from tasks;