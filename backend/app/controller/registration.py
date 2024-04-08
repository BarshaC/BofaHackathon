# import mysql.connector


# mydb = mysql.connector.connect(
#     host = "localhost",
#     user = "root",
#     password = "kiki89kiki89", 
#     database = "project_data"

# )
# # print(mydb)

# cursor = mydb.cursor()


# cursor.execute("CREATE DATABASE project_data")
# cursor.execute("CREATE TABLE user_info(userid INTEGER PRIMARY KEY,email TEXT, pass TEXT,user_name TEXT )")
# cursor.execute("CREATE TABLE placement(userid INTEGER PRIMARY KEY,major TEXT )")
# cursor.execute("CREATE TABLE school_sort(school PRIMARY KEY, FORIEGN KEY (major) REFERENCES placement(major) )")
# cursor.execute("DECLARE @email AS VARCHAR ")

# def log_data():
#     cursor.execute('INSERT INTO project_data VALUES( )')

import sqlite3 as db

conn = db.connect

