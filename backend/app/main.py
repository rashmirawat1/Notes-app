from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import crud, models, schemas
from .database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/notes/", response_model=list[schemas.Note])
def read_notes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_notes(db, skip=skip, limit=limit)

@app.get("/notes/{note_id}", response_model=schemas.Note)
def read_note(note_id: int, db: Session = Depends(get_db)):
    note = crud.get_note(db, note_id)
    if note is None:
        raise HTTPException(status_code=404, detail="Note not found")
    return note

@app.post("/notes/", response_model=schemas.Note)
def create_note(note: schemas.NoteCreate, db: Session = Depends(get_db)):
    return crud.create_note(db, note)

@app.put("/notes/{note_id}", response_model=schemas.Note)
def update_note(note_id: int, note: schemas.NoteCreate, db: Session = Depends(get_db)):
    updated_note = crud.update_note(db, note_id, note)
    if updated_note is None:
        raise HTTPException(status_code=404, detail="Note not found")
    return updated_note

@app.delete("/notes/{note_id}")
def delete_note(note_id: int, db: Session = Depends(get_db)):
    deleted_note = crud.delete_note(db, note_id)
    if deleted_note is None:
        raise HTTPException(status_code=404, detail="Note not found")
    return {"message": "Note deleted"}