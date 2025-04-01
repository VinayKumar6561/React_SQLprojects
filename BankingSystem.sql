CREATE DATABASE Bank;
USE Bank;
-- drop database Bank;
commit;
CREATE TABLE AccountHolders (
    aid INT AUTO_INCREMENT PRIMARY KEY,
    account_number VARCHAR(20) UNIQUE NOT NULL,
    fname VARCHAR(50),
    lname VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    balance DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    phone_number VARCHAR(10),
    password VARCHAR(64) NOT NULL -- Store hashed passwords
);
select * from AccountHolders;

CREATE TABLE Transactions (
    tid INT AUTO_INCREMENT PRIMARY KEY,
    account_number VARCHAR(20),
    amount DECIMAL(10,2) NOT NULL,
    transaction_type ENUM('CREDIT', 'DEBIT') NOT NULL, 
    description VARCHAR(100),
    transaction_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_number) REFERENCES AccountHolders(account_number)
);
select * from Transactions;

CREATE TABLE LoginDetails (
    lid INT AUTO_INCREMENT PRIMARY KEY,
    account_number VARCHAR(20),
    status VARCHAR(50),
    login_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_number) REFERENCES AccountHolders(account_number)
);

CREATE TABLE Transfers (
    tid INT AUTO_INCREMENT PRIMARY KEY,
    sender_account_number VARCHAR(20) NOT NULL,
    receiver_account_number VARCHAR(20) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    transaction_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    description VARCHAR(200),
    FOREIGN KEY (sender_account_number) REFERENCES AccountHolders(account_number),
    FOREIGN KEY (receiver_account_number) REFERENCES AccountHolders(account_number)
);
select * from Transfers;

CREATE TABLE LoginDetails (
    lid INT AUTO_INCREMENT PRIMARY KEY,
    account_number VARCHAR(20),
    status VARCHAR(50),
    login_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_number) REFERENCES AccountHolders(account_number) ON DELETE CASCADE
);

select * from LoginDetails;
-- drop table LoginDetails;

create table transfer(tid int primary key auto_increment,
sender_accountnumber varchar(20) not null,receiver_accountnumber varchar(20) not null,
transaction_time datetime default current_timestamp);
alter table transfer add column description varchar(200);
select * from transfer;

INSERT INTO AccountHolders (account_number, fname, lname, email, balance, phone_number, password)
VALUES 
('10001', 'John', 'Doe', 'john@example.com', 5000.00, '9876543210', SHA2('password123', 256)),
('10002', 'Alice', 'Smith', 'alice@example.com', 7000.00, '9123456789', SHA2('alicepass', 256)),
('10003', 'Bob', 'Johnson', 'bob@example.com', 3000.00, '9988776655', SHA2('bobsecure', 256));
select * from AccountHolders;
