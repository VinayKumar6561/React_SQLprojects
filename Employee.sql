CREATE DATABASE EMP;
USE EMP;

CREATE DATABASE productdb;

USE productdb;

CREATE TABLE product (
   id INT PRIMARY KEY,
   name VARCHAR(50),
   price DOUBLE
);
INSERT INTO product VALUES (1, 'Laptop', 50000);
INSERT INTO product VALUES (2, 'Mobile', 20000);
commit;
select * from product;
drop table product;
DROP TABLE EMPLOYEE;



CREATE TABLE EMPLOYEE (ID INT,ENAME VARCHAR(50),ROLE VARCHAR(50));
-- truncate table EMPLOYEE;
SELECT * FROM EMPLOYEE;
commit;
SHOW TABLES;
