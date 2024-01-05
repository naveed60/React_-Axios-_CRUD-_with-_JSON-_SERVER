import React from "react";

const ContactCard = ({ contact, deleteHandler, editHandler }) => {
  return (
    <div className="item">
      <div className="content">
        <div className="header">{contact.name}</div>
        <div>{contact.email}</div>
      </div>
      <div className="right floated content">
        <button className="ui button blue" onClick={() => editHandler(contact.id)}>
          Edit
        </button>
        <button className="ui button red" onClick={() => deleteHandler(contact.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
