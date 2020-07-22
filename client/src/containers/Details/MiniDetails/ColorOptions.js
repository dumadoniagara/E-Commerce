import React from 'react'

export default function ColorOptions(props) {
   const { colors, activeColor } = props
   console.log(props)
   return (
      <div>
         <h6><small className="text-muted">Choose Color</small></h6>
         <div className="btn-group btn-group-toggle"
            data-toggle="buttons"
         >

            {colors.map((color, index) => (
               <label
                  key={index}
                  className={`btn mx-1 btn-sm`}
                  style={{ backgroundColor: color }}
               >
                  <input
                     type="radio"
                     name="options"
                     id={`color${index}`}
                     className="col-2"
                  />
                  <i className="fa fa-check text-white"></i>
               </label>
            ))}
         </div>
      </div>
   )
}