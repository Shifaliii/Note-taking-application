import express from "express";
import {getNoteById,updateNote,deleteNote,createNote, getAllNotes} from "../controllers/notesController.js";


const router=express.Router();

router.get("/",getAllNotes);
router.get("/:id",getNoteById);

router.post("/",createNote);

router.put("/:id",updateNote);

router.delete("/:id",deleteNote);

export default router;
