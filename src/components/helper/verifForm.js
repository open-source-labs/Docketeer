// import React, { useState } from "react";

// export function VerifForm(props) {
//   const [code, setCode] = useState("");
  
//   const handleSubmit = (evt) => {
//       evt.preventDefault();
//       alert(`Submitting code ${code}`)
//   }
//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Verification code
//         <input
//           type="text"
//           value={code}
//           onChange={e => setCode(e.target.value)}
//         />
//       </label>
//       <input type="submit" value="Submit" />
//     </form>
//   );
// }