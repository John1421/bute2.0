import { Artist } from '@/lib/database/definitions';
import React, { useState } from 'react';


interface MultiSelectProps {
  options: Artist[];
  selectedOptions: Artist[];
  onChange: (selected: Artist[]) => void;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}


const MultiSelect: React.FC<MultiSelectProps> = ({ options, selectedOptions, onChange, icon: Icon  }) => {
  const [isOpen, setIsOpen] = useState(false);

  const setDropdown = (on:boolean) => {
    setIsOpen(on);
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
        className="border border-surface-200 dark:border-surface-dark-500 bg-surface-600 dark:bg-surface-dark-300 rounded-md cursor-pointer"
        onClick={setDropdown.bind(null, true)}
        onBlur={setDropdown.bind(null, false)}
        tabIndex={0}
      >
        <div className="peer block w-full rounded-md border border-surface-200 dark:border-surface-dark-500 bg-surface-600 dark:bg-surface-dark-300 p-2  text-sm outline-2 placeholder:text-placeholder dark:placeholder:text-placeholder-dark pl-10">
          {selectedOptions.length === 0 ? (
            <span className="text-placeholder dark:text-placeholder-dark">Select options...</span>
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
          <Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 icon" aria-hidden="true" />
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

    </div>
  );
};

export default MultiSelect;
