import React from 'react';

export const Tooltip = ({ text, children }) => {
  return (
    <div className="relative inline-block">
      <div className="relative group">
        {children}
        <div className="absolute hidden px-3 py-1 text-sm text-white transition duration-200 transform -translate-x-1/2 bg-black rounded-lg opacity-0 -translate-y-1/3 group-hover:block bottom-full -left-1 group-hover:opacity-100">
          <div className="tooltip-arrow"></div>
          {text}
        </div>
      </div>
    </div>
  );
};
