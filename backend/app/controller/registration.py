import mysql.connector
from mysql.connector import errorcode


try:
    mydb = mysql.connector.connect(
        user = "root",
        password = '12345678',
        database = 'project_data'
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

new_user = ("INSERT INTO user_info "
               "(email, passw, username) "
               "VALUES (%s, %s, %s)")

new_post = ("INSERT INTO post_data "
               "(posttext, userid) "
               "VALUES (%s, %s)") 

def create_new_user(user_name, email, passw):
    acc_created=False
    while acc_created!=True:
        try:
            acc_info={
            'email': email,
            'user_name':user_name,
            'passw':passw
            }
            acc_created=1
            
        except:
            email=input('enter your email: ')
            user_name=input('create a username: ')
            passw=input('enter a password: ')
    cursor.execute(new_user,acc_info)
    mydb.commit()
    mydb.close()
def create_new_post(posttext):
    pass
# def user_registration(user_name, email, passw):
#     cursor('INSERT INTO user_info (email,passw,user_name) VALUES ('username','email','passw');')
#     return()
# user_registration()
for line in mydb:
    print(mydb)
