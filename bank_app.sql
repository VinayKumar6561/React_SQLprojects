create database test;
use test;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    accnumber DECIMAL(20,0) UNIQUE NOT NULL,
    balance DECIMAL(15,2) DEFAULT 0
);
INSERT INTO users (username, password, accnumber, balance) VALUES ('vinay', 'password123', 10000000001, 5000.00),
 ('Durga', 'durga@123', 10000000002, 10000.00), ('eshwar', 'eshwar456', 10000000003, 15000.00);
-- truncate table users;
select * from users;
commit;


select * from users;
-- drop table transactions;
CREATE TABLE transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    accnum BIGINT NOT NULL,
    transaction_type VARCHAR(50) NOT NULL,
    transaction_amount DOUBLE NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
alter table transactions rename column accnum to accountnumber;
select * from transactions;
alter table transactions add column Cur_balance decimal(10,2) not null;
CREATE TABLE log_details (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    logintime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) NOT NULL
);