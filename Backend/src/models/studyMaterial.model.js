import mongoose, {Schema} from "mongoose";

const studyMaterialSchema = new Schema({

    title: {
        type: String,
        trim: true
    },
    type: {
        type: String,
        enum: ["notes", "question_paper"],
        required: true
    },
    file: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        index: true
    },
    course: {
        type: String,
        index: true
    },
    branch: {
        type: String,
        index: true
    },
    semester: {
        type: Number,
        min: 1,
        max: 8,
        index: true
    },
    approved: {
        type: Boolean,
        default: true
    },
    uploaded_by: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

}, {timestamps: true})

export const StudyMaterial = mongoose.model("StudyMaterial", studyMaterialSchema)