CREATE DATABASE project_data;

CREATE TABLE user_info(
userid INTEGER PRIMARY KEY AUTO_INCREMENT,
email TEXT,
pass TEXT,
user_name TEXT
); 

CREATE TABLE placement(
userid INTEGER,
major TEXT PRIMARY KEY NOT NULL,
class_year INTEGER,
FOREIGN KEY (userid) REFERENCES user_info(userid)
);

CREATE TABLE school_sort(
departmentid INTEGER PRIMARY KEY AUTO_INCREMENT,
major TEXT,
FOREIGN KEY (major) REFERENCES placement(major)
);

CREATE TABLE postdata(
postid INTEGER PRIMARY KEY AUTO_INCREMENT,
posttext TEXT,
likes INTEGER
);
