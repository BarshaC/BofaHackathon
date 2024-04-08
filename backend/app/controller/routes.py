from flask import Blueprint, request, jsonify
from app.controller.models import User, Post  # Assuming you have a User model
from app import db  # Assuming you have a database instance

register_blueprint = Blueprint('register', __name__)
posts_blueprint = Blueprint('posts', __name__)

@register_blueprint.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()

    # Extract registration data from request
    email = data.get('email')
    password = data.get('password')
    user_name = data.get('user_name')
    college_year = data.get('collegeYear')
    department = data.get('department')
    college_major = data.get('collegeMajor')
    career_interests = data.get('careerInterests')

    # Create a new user object
    new_user = User(
        email=email,
        password=password,
        user_name=user_name,
        college_year=college_year,
        department=department,
        college_major=college_major,
        career_interests=career_interests
    )

    # Add the new user to the database
    db.session.add(new_user)
    db.session.commit()

    # Return a success response
    return jsonify({'message': 'User registered successfully'})

@posts_blueprint.route('/post', methods=['GET'])
def get_post():
    posts = Post.query.all()
    posts_data= [post.to_dict() for post in posts]
    return jsonify(posts_data)

#needs additional code 
