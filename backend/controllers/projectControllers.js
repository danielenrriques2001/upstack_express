import Project from '../models/Project.js'
import Task from '../models/Task.js';
import User from '../models/User.js';

const getProjects = async (req, res ) => {
    const projects = await Project
        .find({
            '$or' : [
                {'collaborators': {$in: req.user}},
                {'owner': {$in: req.user}},
            ],
        })
        .select('-tasks')

    res.json(projects);

}
const getProject = async (req, res ) => {
        const {id} = req.params;
    
    const project = await Project.findById(id)
    .populate('tasks')
    .populate('collaborators', 'name email ');

    if(!project) {
        return res.status(404).json({message: 'Not found'})
    }

    if(project.owner.toString() !== req.user._id.toString() && 
    !project.collaborators.some( 
    (collaborator) => collaborator._id.toString() === req.user._id.toString()
    )) {
        const error = new Error('You dont have the rights ')
        return res.status(404).json({message: error.message })
    }

    //get project's tasks
    const tasks = await Task.find().where('project').equals(project._id);

    res.json(project)


    
}

const createProject = async (req, res ) => {

    const project = new Project(req.body);

    project.owner = req.user._id;

    try {
        const storedProject = await project.save();
        res.json(storedProject);

    } catch (error) {
        console.log(error)
    }
 
}

const editProject = async (req, res ) => {

    const {id} = req.params;
    
    const project = await Project.findById(id);

    if(!project) {
        return res.status(404).json({message: 'Not found'})
    }

    if(project.owner.toString() !== req.user._id.toString() ) {
        const error = new Error('You dont have the rights ')
        return res.status(404).json({message: error.message })
    }

    project.name = req.body.name || project.name
    project.description = req.body.description || project.description
    project.dispatch_Date = req.body.dispatch_Date || project.dispatch_Date
    project.costumer = req.body.costumer || project.costumer


   try {
        const storedProject = await project.save();
        res.json(storedProject);

   } catch (error) {
        console.log(error)
   }


    
}
const deleteProject = async (req, res ) => {

    const {id} = req.params;
    
    const project = await Project.findById(id);

    if(!project) {
        return res.status(404).json({message: 'Not found'})
    }

    if(project.owner.toString() !== req.user._id.toString() ) {
        const error = new Error('You dont have the rights ')
        return res.status(404).json({message: error.message })
    }

    try {
        await project.deleteOne();
        res.json({message: 'Project successfully deleted' })
    } catch (error) {
        console.log(error)
    }
}
const searchCollaborator = async (req, res ) => {

   const {email} = req.body;

   const user = await User.findOne({email}).select('-confirmed -createdAt -password -token -updatedAt -__v');

   if(!user) { 
    const error = new Error('User not found')
    
    return res.status(404).json({message: error.message });

    }




   return res.json({user})

    
}
const addCollaborator = async (req, res ) => {

   const {id} = req.params;
   const {email} = req.body;



   const project = await Project.findById(id);

   


   if(!project) {
    const error = new Error('Project not found.')
    return res.status(404).json({message: error.message})
   }

   if(project.owner.toString() !== req.user._id.toString() ) {
            const error = new Error('You dont have the rights')
           return res.status(404).json({message: error.message })
    }

    const user = await User.findOne({email}).select('-confirmed -createdAt -password -token -updatedAt -__v');



   if(!user) { 
    const error = new Error('User not found')
    return res.status(404).json({message: error.message });
    }


    if(project.owner.toString() === user._id.toString() ) {
        const error = new Error('The Admin cant be collaborator')
       return res.status(404).json({message: error.message })
}


    if(project.collaborators.includes(user._id)) {
        const error = new Error('The User is already a Collaborator')
        return res.status(404).json({message: error.message })
    }

    project.collaborators.push(user._id);
    await project.save();

    return res.json({message: 'Collaborator has been added'})

    
}
const deleteCollaborator = async (req, res ) => {

    const {id} = req.params;
 
    const project = await Project.findById(id);
    
 
 
    if(!project) {
     const error = new Error('Project not found.')
     return res.status(404).json({message: error.message})
    }
 
    if(project.owner.toString() !== req.user._id.toString() ) {
             const error = new Error('You dont have the rights')
            return res.status(404).json({message: error.message })
     }


 
     project.collaborators.pull(req.body.id);
     await project.save();

     return res.json({message: 'Collaborator has been deleted'})
    
}


export {
    getProjects,
    getProject,
    editProject,
    createProject,
    addCollaborator,
    deleteProject,
    deleteCollaborator,
    searchCollaborator

}