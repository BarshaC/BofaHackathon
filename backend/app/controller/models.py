from app import db  # Assuming you have a database instance

class User(db.Model):
    email = db.Column(db.String(100), primary_key=True)
    password = db.Column(db.String(100))
    user_name = db.Column(db.String(50), unique=True)
    college_year = db.Column(db.String(50))
    department = db.Column(db.String(100))
    college_major = db.Column(db.String(100))
    career_interests = db.Column(db.String(200))

    def __repr__(self):
        return f"<User {self.user_name}>"

class Post(db.Model):
    postID = db.Column(db.Integer, primary_key=True)
    fullName = db.Column(db.String(100), nullable=False)
    user_name = db.Column(db.String(50), unique=True)
    postText = db.Column(db.Text)
    postImage = db.Column(db.String(200))
    date = db.Column(db.DateTime, nullable=False)

    def __repr__(self):
        return f"CareerPost(username='{self.username}', fullName='{self.fullName}', date='{self.date}')"
    
    def to_dict(self):
        return {
            'postID': self.postID,
            'username': self.user_name,
            'fullName': self.fullName,
            'postText': self.postText,
            'postImage': self.postImage,
            'date': self.date.strftime('%Y-%m-%d %H:%M:%S')
        }    
