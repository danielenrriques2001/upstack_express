import { Link, useParams } from "react-router-dom"
import UseProject from "../hooks/UseProject";
import { useEffect } from "react";

const Project = () => {

  const {getProject, project, loading, setLoading} = UseProject();
  const params = useParams();


  useEffect(() => {
      setLoading(true)
      getProject(params.id)
  }, [])
  


  if(loading) return (
    <div class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
  <div class="animate-pulse flex space-x-4">
    <div class="rounded-full bg-slate-700 h-10 w-10"></div>
    <div class="flex-1 space-y-6 py-1">
      <div class="h-2 bg-slate-700 rounded"></div>
      <div class="space-y-3">
        <div class="grid grid-cols-3 gap-4">
          <div class="h-2 bg-slate-700 rounded col-span-2"></div>
          <div class="h-2 bg-slate-700 rounded col-span-1"></div>
        </div>
        <div class="h-2 bg-slate-700 rounded"></div>
      </div>
    </div>
  </div>
</div>
  )

  return (
    <div className="flex justify-between">
        <h1 className="font-black text-5xl text-gray-700">{project?.name}</h1>
       
        {/* <p className="text-2xl font-thin text-gray-500 ">{project?.costumer}</p> */}

        <div className="flex  className='text-white bg-orange-200 p-3 rounded-md uppercase font-bold hover:cursor-pointer hover:bg-red-500 transition-colors'">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>

        <Link
          to={`/projects/edit/${params?.id}`}

        >
          Edit 
        </Link>


        </div>

    </div>
  )
}

export default Project