import React, { Fragment } from 'react'
import UseProject from '../hooks/UseProject'
const Projects = () => {

  const {projects} = UseProject();
  console.log(projects)
  return (
  <Fragment>
      <h1 className='text-4xl text-gray-800 font-black '>Projects</h1>
  </Fragment>    
  )
}

export default Projects