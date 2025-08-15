import { useState, useRef, useEffect } from 'react';

const EditableTitle = () => {
  const [title, setTitle] = useState('Untitled spreadsheet');
  const [previousTitle, setPreviousTitle] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleTitleClick = () => {
    setPreviousTitle(title);
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCommit = () => {
    if (title.trim() === '') {
      setTitle(previousTitle);
    }
    setIsEditing(false);
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommit();
    } else if (e.key === 'Escape') {
      setTitle(previousTitle);
      setIsEditing(false);
    }
  };

  return (
    // The parent div's height and padding are now consistent.
    // The flex layout helps align content vertically.
    <div className="flex items-center px-4 h-12">
      {isEditing ? (
        // --- EDIT MODE ---
        // This input is given a consistent size and styling.
        <input
          ref={inputRef}
          type="text"
          value={title}
          onChange={handleInputChange}
          onBlur={handleCommit}
          onKeyDown={handleKeyDown}
          // The padding and height are matched with the h1 element below.
          className="text-lg font-semibold px-2 py-0.5 border-2 border-blue-500 rounded-md outline-none bg-transparent w-full"
        />
      ) : (
        // --- VIEW MODE ---
        // The h1 element is also given a consistent size and styling.
        <h1
          onClick={handleTitleClick}
          // The padding and height are matched with the input element above.
          className="text-lg font-semibold px-2 py-0.5 rounded-md cursor-pointer hover:bg-gray-200"
        >
          {title}
        </h1>
      )}
    </div>
  );
};

export default EditableTitle;