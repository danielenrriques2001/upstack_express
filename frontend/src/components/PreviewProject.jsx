import { Link } from "react-router-dom"
const PreviewProject = ({project}) => {
  return (
    <div className='border-b p-5 flex'>
      <h3 className="flex-1 capitalize">
        {project.name}

        <span className="text-sm text-gray-500 uppercase">
          {''} {project.costumer}
          </span>  
      </h3>

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