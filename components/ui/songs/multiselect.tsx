import { Artist } from '@/app/lib/database/definitions';
import React, { useState } from 'react';


interface MultiSelectProps {
  options: Artist[];
  selectedOptions: Artist[];
  onChange: (selected: Artist[]) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ options, selectedOptions, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: Artist) => {
    if (selectedOptions.find(selected => selected.name === option.name)) {
      onChange(selectedOptions.filter(selected => selected.name !== option.name));
    } else {
      onChange([...selectedOptions, option]);
    }
  };

  return (
    <div className="relative bg-surface-400 dark:bg-surface-dark-300 text-text dark:text-text-dark">
      <div
        className="p-2 border border-surface-200 dark:border-surface-dark-500 bg-surface-600 dark:bg-surface-dark-300 rounded-md cursor-pointer"
        onClick={toggleDropdown}
      >
        <div className="flex flex-wrap">
          {selectedOptions.length === 0 ? (
            <span className="text-gray-400">Select options...</span>
          ) : (
            selectedOptions.map(option => (
              <span
                key={option.id}
                className="bg-primary-200 text-placeholder dark:text-placeholder-dark text-xs font-medium mr-2 mb-1 px-2.5 py-0.5 rounded"
              >
                {option.name}
              </span>
            ))
          )}
        </div>
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-1 bg-surface-400 dark:bg-surface-dark-300 text-text dark:text-text-dark border border-gray-300 rounded shadow-lg w-full max-h-60 overflow-y-auto">
          {options.map(option => (
            <div
              key={option.id}
              className={`cursor-pointer px-4 py-2  ${
                selectedOptions.find(selected => selected.name === option.name)
                  ? 'bg-primary-600 dark:bg-primary-200'
                  : ''
              }`}
              onClick={() => handleSelect(option)}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
