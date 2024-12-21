import mongoose from "mongoose";

const fromSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    fields: [{
        label: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true,
        },
        required: {
            type: Boolean,
            default: true
        }
    }],
},
{ timestamps: true })

const Form = mongoose.model('Form', fromSchema);

export default Form;

