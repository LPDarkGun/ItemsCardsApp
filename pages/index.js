import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchItems, addItemToDB, updateItemInDB, removeItemFromDB, clearItemsFromDB,
} from '../store/itemSlice';
import Sortable from 'sortablejs';
import { gsap } from 'gsap';
import FormInputs from '../components/FormInputs';
import ItemCard from '../components/ItemCard';
import DarkModeToggle from '../components/DarkModeToggle';

export default function Home() {
  const items = useSelector((state) => state.items.list);
  const dispatch = useDispatch();

  const [newItemText, setNewItemText] = useState('');
  const [newItemImage, setNewItemImage] = useState('');
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemTags, setNewItemTags] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchText, setSearchText] = useState('');

  const itemsRef = useRef([]);
  const sortableContainer = useRef(null);

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, items.length);
  }, [items]);

  useEffect(() => {
    if (sortableContainer.current) {
      Sortable.create(sortableContainer.current, {
        animation: 150,
        onEnd: (evt) => {},
      });
    }
  }, []);

  useEffect(() => {
    dispatch(fetchItems());
    const interval = setInterval(() => {
      checkStorageSize();
    }, 60000); // Check every 60 seconds
    return () => clearInterval(interval);
  }, [dispatch]);

  const formatTags = (tagsString) => {
    return tagsString.split(',').map(tag => `#${tag.trim()}`).filter(tag => tag !== '#');
  };

  const handleAddItem = async () => {
    if (newItemText.trim() !== '' && newItemImage.trim() !== '') {
      const newItem = {
        text: newItemText,
        image: newItemImage,
        desc: newItemDesc.slice(0, 200),  
        tags: formatTags(newItemTags),
      };
      dispatch(addItemToDB(newItem)).then(() => {
        setNewItemText('');
        setNewItemImage('');
        setNewItemDesc('');
        setNewItemTags('');
      });
    }
  };

  const handleEditItem = (id, item) => {
    setEditingIndex(id);
    setNewItemText(item.text);
    setNewItemImage(item.image);
    setNewItemDesc(item.desc);
    setNewItemTags(item.tags.map(tag => tag.replace('#', '')).join(', '));
  };

  const handleUpdateItem = async (id) => {
    if (newItemText.trim() !== '' && newItemImage.trim() !== '') {
      const updatedItem = {
        text: newItemText,
        image: newItemImage,
        desc: newItemDesc.slice(0, 200),  // Limit description length
        tags: formatTags(newItemTags),
      };
      dispatch(updateItemInDB({ id, newItem: updatedItem })).then(() => {
        setEditingIndex(null);
        setNewItemText('');
        setNewItemImage('');
        setNewItemDesc('');
        setNewItemTags('');
      });
    }
  };

  const handleRemoveItem = async (id) => {
    const index = items.findIndex(i => i._id === id);
    if (index !== -1) {
      const itemElement = itemsRef.current[index];
      gsap.to(itemElement, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          dispatch(removeItemFromDB(id)).then(() => {
            gsap.set(itemElement, { opacity: 1 });
          });
        },
      });
    }
  };

  const handleClearItems = async () => {
    dispatch(clearItemsFromDB()).then(() => dispatch(fetchItems()));
  };

  const checkStorageSize = async () => {
    try {
      const response = await axios.post('/api/items', { method: 'CHECK_STORAGE' });
      console.log(response.data.message);
      if (response.data.message === 'Storage limit exceeded. All items deleted.') {
        dispatch(clearItemsFromDB());
      }
    } catch (error) {
      console.error('Error checking storage size:', error);
    }
  };

  const highlightText = (text, highlight) => {
    if (!highlight.trim()) {
      return text;
    }
    const regex = new RegExp(`(${highlight})`, 'gi');
    return text.replace(regex, "<mark>$1</mark>");
  };

  const filteredItems = items.filter(item => {
    const lowerSearch = searchText.toLowerCase();
    return (
      item.text.toLowerCase().includes(lowerSearch) ||
      item.desc.toLowerCase().includes(lowerSearch) ||
      item.tags.some(tag => tag.toLowerCase().includes(lowerSearch) || tag.toLowerCase().includes(`#${lowerSearch}`))
    );
  });

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-100 text-black' : 'bg-gray-900 text-white'} flex flex-col items-center p-5`}>
      <div className="flex justify-between w-full max-w-5xl mb-4">
        <h1 className="text-4xl font-bold">Items Cards</h1>
        <DarkModeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </div>
      <FormInputs
        newItemText={newItemText} setNewItemText={setNewItemText}
        newItemImage={newItemImage} setNewItemImage={setNewItemImage}
        newItemDesc={newItemDesc} setNewItemDesc={setNewItemDesc}
        newItemTags={newItemTags} setNewItemTags={setNewItemTags}
        handleAddItem={handleAddItem}
        handleClearItems={handleClearItems}
        isDarkMode={isDarkMode}
      />
      <input 
        type="text" 
        value={searchText} 
        onChange={(e) => setSearchText(e.target.value)} 
        className="input input-bordered input-primary w-full max-w-5xl mb-6" 
        placeholder="Search items" 
      />
      <div ref={sortableContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
        {filteredItems.map((item, index) => (
          <ItemCard
            key={item._id}
            item={item}
            index={index}
            itemsRef={itemsRef}
            editingIndex={editingIndex}
            setEditingIndex={setEditingIndex}
            newItemText={newItemText}
            setNewItemText={setNewItemText}
            newItemImage={newItemImage}
            setNewItemImage={setNewItemImage}
            newItemDesc={newItemDesc}
            setNewItemDesc={setNewItemDesc}
            newItemTags={newItemTags}
            setNewItemTags={setNewItemTags}
            handleUpdateItem={handleUpdateItem}
            handleEditItem={handleEditItem}
            handleRemoveItem={() => handleRemoveItem(item._id)}
            highlightText={highlightText}
            searchText={searchText}
            isDarkMode={isDarkMode}
          />
        ))}
      </div>
    </div>
  );
}
