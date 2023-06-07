import React from 'react'

const Alert = ({alert}) => {
  return (
    <div className={`${alert.error ? ' from-red-400 to-red-600' : 'from-sky-400 to-sky-700' } bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white mt-5  font-medium`}>
        <h1>{alert.message}</h1>
    </div>
  )
}

export default Alert