from sqlalchemy import Column, String, Integer, Boolean
from database import Base

class Todo(Base):
    __tablename__ = "todo"

    id = Column(Integer, primary_key=True)
    text = Column(String)
    checked = Column(Boolean, default=False)
