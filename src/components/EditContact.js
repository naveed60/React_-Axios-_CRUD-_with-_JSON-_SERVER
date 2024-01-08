// import React, { useState, useEffect } from "react";

// const EditContact = ({ contactToEdit, editContactHandler }) => {

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");

//   useEffect(() => {
//     // Set initial values when component mounts (for editing existing contact)
//     setName(contactToEdit.name || "");
//     setEmail(contactToEdit.email || "");
//   }, [contactToEdit]);

//   const update = (e) => {
//     e.preventDefault();
//     if (name === "" || email === "") {
//       alert("All the fields are mandatory!");
//       return;
//     }
//     // Extract the id from contactToEdit
//     const { id } = contactToEdit;
//     // Call a function to update the existing contact
//     editContactHandler(id, { name, email });
//     // Reset the state after editing
//     setName("");
//     setEmail("");
//   };


//   return (
//     <div className="ui main">
//       <h2>Edit Contact</h2>
//       <form className="ui form" onSubmit={update}>
//         <div className="field">
//           <label>Name</label>
//           <input
//             type="text"
//             name="name"
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//         <div className="field">
//           <label>Email</label>
//           <input
//             type="text"
//             name="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <button className="ui button blue">Update</button>
//       </form>
//     </div>
//   );
// };

// export default EditContact;
