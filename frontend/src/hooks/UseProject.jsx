import { useContext } from "react"
import ProjectContext from "../context/ProjectProvider";



const UseProject = () => {
  return useContext(ProjectContext);
}

export default UseProject;