create database Bank;
create table accountholders(
aid int auto_increment primary key,accountnumber varchar(20) unique not null,
fname varchar(50),lname varchar(50),email varchar(100) unique,balance decimal(15,2) not null,
 phnumber varchar(10),password varchar(20));
-- drop table accountholders;
select * from accountholders;


create table transactions(tid int auto_increment primary key,accountnumber varchar(20),
withdrawed decimal(10,2) default 0,debited decimal(10,2) default 0,status varchar(50),Transaction_time datetime default current_timestamp,
foreign key(accountnumber) references accountholders(accountnumber) );
alter table transactions rename column debited to deposit ;
drop table transactions;
select * from transactions;
use JDBCTask;
create table logindetails(lid int primary key auto_increment,
accountnumber varchar(20), status varchar(100),Logined datetime default current_timestamp,foreign key(accountnumber)
references accountholders(accountnumber));
select * from logindetails;
drop table logindetails;


create table transfer(tid int primary key auto_increment,
sender_accountnumber varchar(20) not null,receiver_accountnumber varchar(20) not null,
transaction_time datetime default current_timestamp);
alter table transfer add column description varchar(200);
select * from transfer;

