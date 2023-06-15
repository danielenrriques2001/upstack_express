import UseAuth from "./UseAuth";
import UseProject from "./UseProject";


const UseAdmin = () => {

    const {project} = UseProject();
    const {auth} = UseAuth();

    return project.owner === auth._id;

    
 

}

export default UseAdmin;