import React from 'react'

const InfoMessage = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="infoStyle">
        {message}
      </div>
    )
  }

  export default InfoMessage