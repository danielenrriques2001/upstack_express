import React, { Fragment } from 'react'
import UseProject from '../hooks/UseProject'
import PreviewProject from '../components/PreviewProject';

const Projects = () => {

  const {projects} = UseProject();
  console.log(projects)
  return (
  <Fragment>
      <h1 className='text-4xl text-gray-800 font-black  p-5'>Projects</h1>
      <div className='bg-white shadow mt-10 rounded-lg'>
          {projects.length ? 
              projects.map(project => (
                  <PreviewProject 
                      key={project._id}
                      project={project}
                  />
              ))
          
        
          : <p className='mt-5 text-center text-gray-600 uppercase'>There's not project yet</p>}
      </div>
  </Fragment>    
  )
}

export default Projects