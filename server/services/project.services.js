import projectModel from '../models/project.model.js';

export const createProject = async ({
    name,userId
}) => {
    if(!name){
        throw new Error('Name is required');
    }

    if(!userId){
        throw new Error('userId is required');
    }
    
    let project;
    try {
        project = await projectModel.create({
            name,
            user: [userId]
        });
    } catch (error) {
        if (error.code === 11000){
            throw new Error('Project name already exists');
        }
    }
    

    return project;
}

export const getAllProjectByUserId = async({ userId }) => {
    if(!userId) {
        throw new Error('UserId is required');
    }

    const allUserProjects = await projectModel.find({
        user : userId
    })

    return allUserProjects;
}