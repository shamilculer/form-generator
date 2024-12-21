import express from "express";
import { addForm, getForm, getForms, getSubmissions, postSubmission } from "../controllers/form.controller";

const router = express.Router();

router.post("/new", addForm)
router.get('/:id', getForm)
router.post('/:formId/submit', postSubmission)
router.get('/', getForms)
router.get('/submissions/:formId', getSubmissions)


export default router;