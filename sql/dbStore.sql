create database storeDB;
 use storeDB;
 create table userInfo(
    user_id int primary key auto_increment,
    userName char (40) not null unique,
    password char (40) not null ,
    userPhoneNumber char(11) null
 )