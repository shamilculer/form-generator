import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
    formId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Form',
        required: true
    },
    fields: [{
        label: {
            type: String,
            required: true
        },
        value: {
            type: mongoose.Schema.Types.Mixed,
            required: true
        }
    }]
},
{ timestamps: true });

const Submission = mongoose.model('Submission', submissionSchema);

export default Submission;