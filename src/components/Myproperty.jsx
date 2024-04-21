import React from 'react'
import Addproperty from './Addproperty'

function Myproperty() {
    return (
        <div className='card shadow p-4'>
            <div className='d-flex justify-content-between'>
                <h3 className='text-success'>My Project</h3>
                <Addproperty/>
    
            </div>
          
        </div>
      )
    }

export default Myproperty