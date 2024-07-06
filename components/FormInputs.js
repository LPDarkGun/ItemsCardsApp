// components/FormInputs.js
import React from 'react';

const FormInputs = ({
  isDarkMode,
  newItemText, setNewItemText,
  newItemImage, setNewItemImage,
  newItemDesc, setNewItemDesc,
  newItemTags, setNewItemTags,
  handleAddItem, handleClearItems
}) => {
  return (
    <div className="flex space-x-2 mb-6 w-full max-w-5xl">
      <input 
        type="text" 
        value={newItemText} 
        onChange={(e) => setNewItemText(e.target.value)} 
        className="input input-bordered bg-gray-800 text-white w-full max-w-xs" 
        placeholder="Enter new item text" 
      />
      <input 
        type="text" 
        value={newItemImage} 
        onChange={(e) => setNewItemImage(e.target.value)} 
        className="input input-bordered bg-gray-800 text-white w-full max-w-xs" 
        placeholder="Enter image URL" 
      />
      <input 
        type="text" 
        value={newItemDesc} 
        onChange={(e) => setNewItemDesc(e.target.value)} 
        className="input input-bordered bg-gray-800 text-white w-full mb-2" 
        placeholder="Enter Description" 
      />
      <input 
        type="text" 
        value={newItemTags} 
        onChange={(e) => setNewItemTags(e.target.value)} 
        className="input input-bordered bg-gray-800 text-white w-full mb-2" 
        placeholder="Enter tags (comma separated)" 
      />
      <button className="btn btn-primary" onClick={handleAddItem}>Add Item</button>
      <button className="btn btn-secondary" onClick={handleClearItems}>Clear Items</button>
    </div>
  );
};

export default FormInputs;
