import { getDateFormat } from "../helpers/getDateFormat";
import UseProject from '../hooks/UseProject'
import UseAdmin from "../hooks/UseAdmin";
const Task = ({task}) => {

    const {description, name, priority, dispatch_Date, _id, status} = task;
    const {setModal, editTask, handleDeleteTask, modalDelete, completeTask} = UseProject();
    const admin = UseAdmin();
    


  return (
    <div className="border-b p-5 flex justify-between items-center ">
        <div>
            <p className="text-xl mb-1">{name}</p>
            <p className="text-sm uppercase mb-1">{description}</p>
            <p className="text-xl mb-1">{getDateFormat(dispatch_Date)}</p>
            <p className="text-xl text-gray-600 mb-1">Priority: {priority}</p>
            {status && <p>Completed by: {task?.completed?.name}</p> }

        </div>

        <div className="flex gap-1">

        {admin && <button
            className="text-sm px-10 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-blue-700 text-white text-center mt-5 flex gap-2 justify-center items-center "
            onClick={() => {editTask(task)}}
        >
            Edit

        </button>}


            <button
            className={`text-sm px-10 py-3 w-full md:w-auto rounded-lg uppercase font-bold ${status ?' bg-green-700' : ' bg-neutral-600'} text-white text-center mt-5 flex gap-2 justify-center items-center`} 
            onClick={() => completeTask(_id)}
            >
                    {status ? 'complete' : 'Incomplete'}
        
            </button>

   

   

               { admin && <button
                className="text-sm px-10 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-red-700 text-white text-center mt-5 flex gap-2 justify-center items-center "
                onClick={() => {handleDeleteTask(task)}}
                >
                        Delete

                </button>
                }



        </div>


    </div>
  )
}

export default Task