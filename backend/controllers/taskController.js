import Task from '../models/Task.js'
import Project from '../models/Project.js'


const getTask = async (req, res ) => {
    const {id} = req.params;
    
    const task = await Task.findById(id).populate("project");

    if(task.project.owner.toString() !== req.user._id.toString()) {
        return res.status(403).json({message: 'You dont have the rights'})
    }

    res.json(task);

    
}

const createTask = async (req, res ) => {

    const {project} = req.body;

    const projectExists = await Project.findById(project);

 

    if(!projectExists ) {
        return res.status(404).json({message: 'Not found'})
    }

    if(projectExists.owner.toString() !== req.user._id.toString() ) {
        return res.status(404).json({message: 'You dont have the rights'})
    }

    try {
        const storedTask = await Task.create(req.body);

        projectExists.tasks.push(storedTask._id)
        await projectExists.save();


        return res.status(200).json({message: 'Task has been save successfully', data: storedTask})
    } catch (error) {
        console.log(error)
    }
 
}

const editTask = async (req, res ) => {

    const {id} = req.params;
    
    const task = await Task.findById(id).populate("project");

    if(task.project.owner.toString() !== req.user._id.toString()) {
        return res.status(403).json({message: 'You dont have the rights'})
    }



    task.name = req.body.name || task.name
    task.description = req.body.description || task.description
    task.priority = req.body.priority || task.priority
    task.dispatch_Date = req.body.dispatch_Date || task.dispatch_Date


   try {
        const storedTask = await task.save();
        
        return res.status(200).json({message: 'Task has been edited successfully', data: storedTask})

   } catch (error) {
        console.log(error)
   }

}
const deleteTask = async (req, res ) => {

    const {id} = req.params;
    
    const task = await Task.findById(id).populate('project');

    if(!task) {
        return res.status(404).json({message: 'Not found'})
    }

    if(task.project.owner.toString() !== req.user._id.toString() ) {
        const error = new Error('You dont have the rights ')

        return res.status(403).json({message: error.message })

    }

    try {

        const project  = await Project.findById(task.project);
        project.tasks.pull(task._id);
        await Promise.allSettled([await project.save(), await task.deleteOne() ])

        res.json({message: 'Task successfully deleted', task  })
    } catch (error) {
        console.log(error)
    }
}

const changeTaskStatus =  async (req, res ) => {
    const {id} = req.params;

    const task = await Task
    .findById(id)
    .populate('project');

    if(!task) {
        return res.status(404).json({message: 'Not found'})
    }

    if(task.project.owner.toString() !== req.user._id.toString() && 
    !task.project.collaborators.some( 
    (collaborator) => collaborator._id.toString() === req.user._id.toString()

    )) {
        const error = new Error('You dont have the rights ')
        return res.status(404).json({message: error.message })
    }

    task.status = !task.status;
    task.completed = req.user._id;
    
    await task.save();

    const storedTask = await Task
    .findById(id)
    .populate('project')
    .populate('completed');
    res.json(storedTask);






    
}


export {
   getTask,
   createTask,
   editTask,
   deleteTask,
   changeTaskStatus
}