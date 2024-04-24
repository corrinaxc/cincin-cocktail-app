import React from 'react';

const DeleteButton = ({ id, onDelete }) => {
  const handleDelete = async () => {
    // Call the onDelete function passed from the parent component
    onDelete();
  };

  return (
    <button onClick={handleDelete}>Delete</button>
  );
};

export default DeleteButton;
