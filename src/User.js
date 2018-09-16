import React from 'react'


const User = ({ user })=> {
  return (
    <div>
      { user.name }
      ({ user.userThings.length })
    </div>
  )  
}

export default User