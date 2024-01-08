import React, { useState, useEffect } from "react";

const AddContact = ({ addContactHandler, editContactHandler, contactToEdit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (contactToEdit) {
      // Set initial values when component mounts (for editing existing contact)
      setIsEditing(true);
      setFormData({
        name: contactToEdit.name || "",
        email: contactToEdit.email || "",
      });
    } else {
      setIsEditing(false);
      setFormData({ name: "", email: "" });
    }
  }, [contactToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name === "" || formData.email === "") {
      alert("All the fields are mandatory!");
      return;
    }

    if (isEditing) {
      // Call a function to update the existing contact
      editContactHandler(contactToEdit.id, formData);
    } else {
      // Call a function to add a new contact
      addContactHandler(formData);
    }

    // Reset the state after editing or adding
    setFormData({ name: "", email: "" });
  };

  return (
    <div className=" ui main">
      <h2 >{isEditing ? "Edit Contact" : "Add Contact"}</h2>
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <button className="ui button blue">{isEditing ? "Update" : "Add"}</button>
      </form>
    </div>
  );
};

export default AddContact;
