import { useState, useRef, useEffect } from 'react';

const EditableTitle = () => {
  const [title, setTitle] = useState('Untitled spreadsheet');
  
  // New state to hold the value before editing starts
  const [previousTitle, setPreviousTitle] = useState('');

  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  // --- Event Handlers ---

  const handleTitleClick = () => {
    // Before entering edit mode, save the current title as the "backup"
    setPreviousTitle(title);
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setTitle(e.target.value);
  };

  // This function now handles the logic for finishing an edit
  const handleCommit = () => {
    // If the input is empty or only contains whitespace, revert to the previous title
    if (title.trim() === '') {
      setTitle(previousTitle);
    }
    // Otherwise, the new title is kept automatically because the 'title' state is already updated.
    
    setIsEditing(false);
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommit(); // Use the same commit logic
    } else if (e.key === 'Escape') {
      // Bonus: Allow user to cancel edit with Escape key
      setTitle(previousTitle);
      setIsEditing(false);
    }
  };

  return (
    <div className="p-4 flex w-90">
      {isEditing ? (
        // --- EDIT MODE ---
        <div className="grid">
          <span className="invisible text-m font-semibold px-2 py-0.5 col-start-1 row-start-1">
            {title}{' '}
          </span>
          <input
            ref={inputRef}
            type="text"
            value={title}
            onChange={handleInputChange}
            onBlur={handleCommit} // Use the commit logic on blur
            onKeyDown={handleKeyDown}
            className="text-m font-semibold px-2 py-0.5 border-2 border-blue-500 rounded-md outline-none bg-transparent col-start-1 row-start-1 w-full"
          />
        </div>
      ) : (
        // --- VIEW MODE ---
        <h1
          onClick={handleTitleClick}
          className="text-m font-semibold px-2 py-0.5 rounded-md cursor-pointer hover:bg-gray-200"
        >
          {title}
        </h1>
      )}
    </div>
  );
};

export default EditableTitle;