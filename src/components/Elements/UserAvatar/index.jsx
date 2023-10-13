import React, { useEffect, useRef, useState } from 'react';
import Avatar from '../../../assets/avatar.svg';

export const UserAvatar = ({ dropdownContent, user, emailUser }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    if (!isDropdownOpen) {
      setDropdownOpen(!isDropdownOpen);
    } else {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    const closeDropdown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', closeDropdown);
    return () => {
      document.removeEventListener('mousedown', closeDropdown);
    };
  }, []);

  return (
    <div className="relative px-8">
      <div className="cursor-pointer" onClick={toggleDropdown}>
        <img
          src={Avatar}
          alt="profileImg"
          className="w-8 h-8 bg-white rounded-full ring-2 ring-white"
        />
      </div>
      {isDropdownOpen && (
        <div
          className="absolute right-0 w-48 mt-2 bg-white border divide-y divide-gray-300 rounded shadow-lg"
          ref={dropdownRef}
        >
          <div className="px-4 py-3">
            <span className="block text-sm text-gray-900 ">{user}</span>
            <span className="block text-sm text-gray-500 truncate ">
              {emailUser}
            </span>
          </div>

          {dropdownContent(toggleDropdown)}
        </div>
      )}
    </div>
  );
};
