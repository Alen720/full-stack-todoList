from pydantic import BaseModel

class CreateTodo(BaseModel):
    text: str

class UpdateTodo(BaseModel):
    checked: bool

class TodoResponse(BaseModel):
    id: int
    text: str
    checked: bool

    class config:
        from_attributes = True
