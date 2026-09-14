from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Todo
from schemas import CreateTodo, UpdateTodo

router = APIRouter()

@router.get("/todos")
def get_todos(db: Session = Depends(get_db)):
    return db.query(Todo).all()

@router.post("/todos")
def post_todo(todo: CreateTodo, db: Session = Depends(get_db)):
    new_todo = Todo(text = todo.text)

    db.add(new_todo)
    db.commit()
    db.refresh(new_todo)

    return new_todo

@router.put("/todos/{todo_id}")
def edit_todo(todo_id: int, data: UpdateTodo, db: Session = Depends(get_db)):
    todo = db.query(Todo).filter(Todo.id == todo_id).first()

    if todo:
        todo.checked = data.checked
        db.commit()

    return {"ok": True}

@router.delete("/todos/{todo_id}")
def del_todo(todo_id: int, db: Session = Depends(get_db)):
    todo = db.query(Todo).filter(Todo.id == todo_id).first()

    if not todo:
        raise HTTPException(status_code=404, detail="Todo Not Found")

    db.delete(todo)
    db.commit()

    return {"ok": True}