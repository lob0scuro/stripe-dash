from app.extensions import db
from flask_login import UserMixin
from sqlalchemy import Integer, String, Boolean, Column, ForeignKey

class User(db.Model, UserMixin):
    id = Column(Integer, primary_key=True)
    first_name = Column(String(150), nullable=False)
    last_name = Column(String(150), nullable=False)
    email = Column(String(255), nullable=False, unique=True)
    is_admin = Column(Boolean, nullable=False, default=False)
    
    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "full_name": f"{self.first_name} {self.last_name}",
            "email": self.email,
            "is_admin": self.is_admin
        }

