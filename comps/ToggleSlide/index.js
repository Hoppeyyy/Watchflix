import React, { useState } from 'react'
import styled from "styled-components";

const ToggleSlide = ({  
  isOn, 
  handleToggle =() =>{}, 
  onColor 
}) => {
  return (
    <>
      <input
        checked={isOn}
        onChange={handleToggle}
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
      />
      <label
        style={{ background: isOn }}
        className="react-switch-label"
        htmlFor={`react-switch-new`}
      >
        <span className={`react-switch-button`} />
      </label>
    </>
  );
};

export default ToggleSlide;



// const ToggleSlide = () => {
//   const [toggle, setToggle] = useState(false)

//   return(
//     <>
//       <button onClick={() => setToggle(!toggle)}>List View</button>
//       {toggle && (
//         <button>
//           Column View
//         </button>
//       )}
//     </>
//   )
// }

// export default ToggleSlide;

