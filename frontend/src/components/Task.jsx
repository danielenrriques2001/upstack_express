import { getDateFormat } from "../helpers/getDateFormat";
import UseProject from '../hooks/UseProject'
const Task = ({task}) => {

    const {description, name, priority, dispatch_Date, _id, status} = task;
    const {setModal, editTask} = UseProject();
    


  return (
    <div className="border-b p-5 flex justify-between items-center ">
        <div>
            <p className="text-xl mb-1">{name}</p>
            <p className="text-sm uppercase mb-1">{description}</p>
            <p className="text-xl mb-1">{getDateFormat(dispatch_Date)}</p>
            <p className="text-xl text-gray-600 mb-1">Priority: {priority}</p>

        </div>

        <div className="flex gap-1">

        <button
            className="text-sm px-10 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-blue-700 text-white text-center mt-5 flex gap-2 justify-center items-center "
            onClick={() => {editTask(task)}}
    >
            Edit

    </button>

    {
        status ? (
            <button
            className="text-sm px-10 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-green-700 text-white text-center mt-5 flex gap-2 justify-center items-center "
            >
                    Complete
        
            </button>
        )
        
        
        : (

            <button
            className="text-sm px-10 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-gray-700 text-white text-center mt-5 flex gap-2 justify-center items-center "
            >
                    Incomplete
        
            </button>

        )
    }

   

   

    <button
    className="text-sm px-10 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-red-700 text-white text-center mt-5 flex gap-2 justify-center items-center "
    >
            Delete

    </button>




        </div>


    </div>
  )
}

export default Task