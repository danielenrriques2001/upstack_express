import { Link } from "react-router-dom"
import UseAuth from '../hooks/UseAuth'
const Sidebar = () => {

  const {auth} = UseAuth();
  console.log(auth)
  return (
    <aside
      className="md:w-80 lg:w-96 px-5 py-10 "
    >
      <p className="text-xl font-bold">Hey! Daniel</p>

      <Link
        to={'create-project'}
        className="bg-sky-600 w-full p-3 text-white uppercase font-bold block  mt-5 rounded-lg text-center"
      >
        New Project
      </Link>
    </aside>
  )
}

export default Sidebar