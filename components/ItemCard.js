import React from 'react';

const colors = [
  'bg-red-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-teal-500',
  'bg-indigo-500',
];

const ItemCard = ({
  item, index, itemsRef, editingIndex,
  setEditingIndex, newItemText, setNewItemText,
  newItemImage, setNewItemImage, newItemDesc, setNewItemDesc,
  newItemTags, setNewItemTags, handleUpdateItem,
  handleEditItem, handleRemoveItem, highlightText,
  searchText, isDarkMode
}) => {
  const getColor = (idx) => colors[idx % colors.length];

  return (
    <div ref={el => itemsRef.current[index] = el} className="card shadow-lg p-4 flex flex-col justify-between w-full sm:w-80 lg:w-96">
      <figure className="flex justify-center items-center h-3/5 w-full overflow-hidden rounded-lg">
        <img src={item.image} alt={item.text} className="object-cover h-full w-full rounded-lg" />
      </figure>
      <div className="card-body flex flex-col justify-between">
        {editingIndex === item._id ? (
          <div>
            <input 
              type="text" 
              value={newItemText} 
              onChange={(e) => setNewItemText(e.target.value)} 
              className={`input input-bordered bg-gray-800 text-white w-full mb-2`} 
              placeholder="Enter item text" 
            />
            <input 
              type="text" 
              value={newItemImage} 
              onChange={(e) => setNewItemImage(e.target.value)} 
              className={`input input-bordered bg-gray-800 text-white w-full mb-2`} 
              placeholder="Enter image URL" 
            />
            <input 
              type="text" 
              value={newItemDesc} 
              onChange={(e) => setNewItemDesc(e.target.value)} 
              className={`input input-bordered bg-gray-800 text-white w-full mb-2`} 
              placeholder="Enter Description" 
            />
            <input 
              type="text" 
              value={newItemTags} 
              onChange={(e) => setNewItemTags(e.target.value)} 
              className={`input input-bordered bg-gray-800 text-white w-full mb-2`} 
              placeholder="Enter tags (comma separated)" 
            />
            <div className="flex gap-2 mt-2">
              <button className="btn btn-success btn-sm" onClick={() => handleUpdateItem(item._id)}>Update</button>
              <button className="btn btn-secondary btn-sm ml-2" onClick={() => setEditingIndex(null)}>Cancel</button>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="card-title text-xl" dangerouslySetInnerHTML={{ __html: highlightText(item.text, searchText) }}></h2>
            <p className="caret-secondary-content text-l break-words" style={{ maxHeight: '200px', overflow: 'auto' }} dangerouslySetInnerHTML={{ __html: highlightText(item.desc, searchText) }}></p>
            <div className="mt-2 flex flex-col flex-wrap gap-1">
              <h1>Tags:</h1>
              <div className='flex gap-1'>
                {item.tags.map((tag, idx) => (
                  <span key={idx} className={`badge ${getColor(idx)} text-white`} dangerouslySetInnerHTML={{ __html: highlightText(tag, searchText) }}></span>
                ))}
              </div>
            </div>
            <div className="flex mt-4">
              <button className="btn btn-warning btn-sm" onClick={() => handleEditItem(item._id, item)}>Edit</button>
              <button className="btn btn-error btn-sm ml-2" onClick={() => handleRemoveItem(item._id)}>Remove</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
