import React from 'react'
import Helmet from 'react-helmet'
const MetData = ({title}) => {
  return (
   <Helmet>
       <title>{title}</title>
   </Helmet>
  )
}

export default MetData