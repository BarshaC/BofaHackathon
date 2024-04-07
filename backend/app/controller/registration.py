import mysql.connector
from mysql.connector import errorcode
import json

try:
    mydb = mysql.connector.connect(
        user = "root",
        password = '12345678'
        )
    print(mydb)
except mysql.connector.connect as err:
    if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
        print('username or password is wrong')
    elif err.errno == errorcode.ER_BAD_DB_ERROR:
        print('database doent exsist')
    else:
        print(err)
else:
    mydb.close()

cursor= mydb.cursor

def user_registration(user_name, email, passw):
    cursor('INSERT INTO user_info (email,passw,user_name) VALUES ('username','email','passw');')
    return()
user_registration()
