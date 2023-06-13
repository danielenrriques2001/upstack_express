import mongoose from 'mongoose';

const projectsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true, 
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    dispatch_Date: {
        type: Date,
        default: Date.now(),
    },
    costumer: {
        type: String,
        required: true,
        trim: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',

    },
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task',
        }
    ],
    collaborators: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }

    ],
}, {
    timestamps: true
}
);

const Project = mongoose.model('Project', projectsSchema)

export default Project;