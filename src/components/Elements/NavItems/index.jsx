import React from 'react';
import { Link } from 'react-router-dom';

export const NavItems = ({ menuItems }) => {
  return (
    <div className="px-4 mb-6">
      <ul className="flex flex-col gap-3 pt-6">
        {menuItems.map((link) => (
          <Link
            to={link.link}
            key={link.label}
            className="px-3 py-4 font-medium text-white capitalize duration-150 ease-in rounded-xl hover:bg-violet-500 hover:pl-6"
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </div>
  );
};
