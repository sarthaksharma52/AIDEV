import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name:{
        type: String,
        unique: true,
        lowercase: true,
        required: [true , 'project already exist'],
        trim: true,
    },
    user: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        }
    ]

});

const Project = mongoose.model('project',projectSchema);

export default Project;