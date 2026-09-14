from pydantic import BaseModel

class CreateTodo(BaseModel):
    text: str

class UpdateTodo(BaseModel):
    checked: bool
