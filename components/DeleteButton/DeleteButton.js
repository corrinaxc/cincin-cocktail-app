import React from 'react';

const DeleteButton = ({ id, onDelete }) => {
  const handleDelete = async () => {
    // Call the onDelete function passed from the parent component
    onDelete();
  };

  return (
    <button className="delete-button" onClick={handleDelete}><img className="deleteIcon" src="/resources/delete.png"></img></button>
  );
};

export default DeleteButton;
