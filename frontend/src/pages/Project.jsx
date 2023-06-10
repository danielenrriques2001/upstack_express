import { useParams } from "react-router-dom"
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
    <div>
        <h1 className="font-black text-5xl text-gray-700">{project?.name}</h1>
    </div>
  )
}

export default Project