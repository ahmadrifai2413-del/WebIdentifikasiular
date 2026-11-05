from pydantic import BaseModel, Field
class NoteUpdate(BaseModel):
    note: str = Field(default='', max_length=2000)
