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

