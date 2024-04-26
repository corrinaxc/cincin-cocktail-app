import React from 'react';

const DeleteButton = ({ id, onDelete }) => {
  const handleDelete = async () => {
    onDelete();
  };

  return (
    <button className="delete-button" onClick={handleDelete}><img className="deleteIcon" src="/resources/delete.png"></img></button>
  );
};

export default DeleteButton;
