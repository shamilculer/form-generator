import Form from "../models/form.model";
import { Request, Response } from "express";
import Submission from "../models/submission.model";

export const addForm = async (req: Request, res: Response) => {
    const { name, fields } = req.body;
    try {
        if (!name || !fields) {
            console.log(req.body)
            res.status(400).json({ message: "Name and fields are required" });
            return
        }

        const newForm = await Form.create({
            name,
            fields
        })

        res.status(201).json({
            message: "Form created successfully",
            form: newForm
        })
        return
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
        return
    }
};


export const getForm = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        if (!id) {
            console.log(id)
            res.status(400).json({ message: "Id is required" });
            return
        }

        const form = await Form.findById(id);

        res.status(200).json({ form });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
        return
    }
}

export const postSubmission = async (req: Request, res: Response) => {
    const { formId } = req.params;
    const { fields } = req.body;
    try {
        if (!fields) {
            res.status(400).json({ message: "Fields are required" });
            return
        }

        const doesFormExists = await Form.findById(formId)

        if (!doesFormExists) {
            res.status(400).json({ message: "Form doesn't exists" });
            return
        }

        const newSubmission = await Submission.create({
            formId,
            fields
        })

        res.status(201).json({ message: "Submission added successfully", submission: newSubmission });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
        return
    }
};

export const getForms = async (req: Request, res: Response) => {
    try {
        const forms = await Form.find().sort({ createdAt: -1 });
        res.status(200).json({ forms });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
        return
    }
}

export const getSubmissions = async (req: Request, res: Response) => {
    const { formId } = req.params;
    try {
        const form = await Form.findById(formId)
        if (!form) {
            res.status(400).json({ message: "Form doesn't exists" });
            return
        }

        const submissions = await Submission.find({ formId }).populate("formId").sort({ createdAt: -1 });

        res.status(200).json({ submissions, formName: form.name })
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
        return
    }
}