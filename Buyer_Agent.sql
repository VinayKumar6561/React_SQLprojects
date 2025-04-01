-- 1️⃣ Create Database
CREATE DATABASE buyeragentapp;
USE buyeragentapp;

-- 2️⃣ Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    contact VARCHAR(15) NOT NULL
);

-- 3️⃣ Roles Table
CREATE TABLE roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_name ENUM('Buyer', 'Agent') UNIQUE NOT NULL
);

-- 4️⃣ Role Lookup Table
CREATE TABLE role_lookup (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(role_id) ON DELETE CASCADE
);

-- 5️⃣ Insert Default Roles
INSERT INTO roles (role_name) VALUES ('Buyer'), ('Agent');
CREATE TABLE properties (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    agent_id INT NOT NULL,
    FOREIGN KEY (agent_id) REFERENCES users(id)
);



-- drop table properties;

CREATE TABLE properties (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    agent_id INT NOT NULL,
    owner_name VARCHAR(255) NOT NULL,
    owner_contact VARCHAR(20) NOT NULL,
    FOREIGN KEY (agent_id) REFERENCES users(id)
);

commit;

select * from users;
select * from roles;
select * from role_lookup ;
select * from properties;



