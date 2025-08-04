import mongoose from 'mongoose';
import projectModel from '../models/project.model.js';

export const createProject = async ({ name, userId }) => {
    if (!name) {
        throw new Error('Name is required');
    }

    if (!userId) {
        throw new Error('userId is required');
    }

    let project;
    try {
        project = await projectModel.create({
            name,
            user: [userId]  // Keep as 'user'
        });
    } catch (error) {
        if (error.code === 11000) {
            throw new Error('Project name already exists');
        }
    }

    return project;
}

export const getAllProjectByUserId = async ({ userId }) => {
    if (!userId) {
        throw new Error('UserId is required');
    }

    const allUserProjects = await projectModel.find({
        user: userId  // Fix here (was users)
    });

    return allUserProjects;
}

export const addUserToProject = async ({ projectId, users, userId }) => {
    if (!projectId) {
        throw new Error('projectId required');
    }

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error("Invalid projectId");
    }

    if (!users) {
        throw new Error('users are required');
    }

    if (!userId) {
        throw new Error('userId are required');
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid userId");
    }

    if (!Array.isArray(users) || users.some(userId => !mongoose.Types.ObjectId.isValid(userId))) {
        throw new Error("Invalid userId(s) in users array");
    }

    const project = await projectModel.findOne({
        _id: projectId,
        user: userId   // Fix here (was users)
    });

    if (!project) {
        throw new Error("user not belong to this project");
    }

    const updatedProject = await projectModel.findOneAndUpdate(
        { _id: projectId },
        {
            $addToSet: {
                user: {
                    $each: users
                }
            }
        },
        { new: true }
    );

    return updatedProject;
}
