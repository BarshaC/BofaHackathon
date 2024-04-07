CREATE DATABASE project_data;

CREATE TABLE user_info(
userid INTEGER PRIMARY KEY,
email TEXT,
pass TEXT,
user_name TEXT
); 

CREATE TABLE placement(
userid INTEGER PRIMARY KEY,
major TEXT,
class_year INTEGER
);

CREATE TABLE school_sort(
department PRIMARY KEY,
FORIEGN KEY (major) REFERENCES placement(major)
);

CREATE TABLE career_info(
    
);
DECLARE @email AS VARCHAR(100), @password AS VARCHAR(100), @user_name AS VARCHAR(100)
