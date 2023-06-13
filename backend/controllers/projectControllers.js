import Project from '../models/Project.js'
import Task from '../models/Task.js';

const getProjects = async (req, res ) => {
    const projects = await Project
        .find()
        .where('owner')
        .equals(req.user)
        .select('-tasks')

    res.json(projects);

}
const getProject = async (req, res ) => {
        const {id} = req.params;
    
    const project = await Project.findById(id).populate('tasks');

    if(!project) {
        return res.status(404).json({message: 'Not found'})
    }

    if(project.owner.toString() !== req.user._id.toString() ) {
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

const addCollaborator = (req, res ) => {
    
}
const deleteCollaborator = (req, res ) => {
    
}


export {
    getProjects,
    getProject,
    editProject,
    createProject,
    addCollaborator,
    deleteProject,
    deleteCollaborator,

}