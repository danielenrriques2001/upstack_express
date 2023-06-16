import { Link } from "react-router-dom"
import UseAuth from "../hooks/UseAuth"

const PreviewProject = ({project}) => {

  const {auth} = UseAuth();

  


  return (
    <div className='border-b p-5 flex  justify-between'>
      <div className="flex items-center gap-2">
        <h3 className="flex-1 capitalize">
          {project.name}

          <span className="text-sm text-gray-500 uppercase">
            {''} {project.costumer}
            </span>  
        </h3>

        { auth._id  !== project.owner && (
          <p className="p-1 text-xs text-white bg-green-600 font-bold rounded-lg">Collaborator</p>
        )
        
        }
      </div>

      <Link
        to={`${project._id}`}
        className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold"
      >
     See Project
      </Link>
       
    </div>
  )
}

export default PreviewProject