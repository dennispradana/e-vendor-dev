import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const NavItems = ({ menuItems }) => {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <div className="px-4 mb-6">
      <ul className="flex flex-col gap-3 pt-6">
        {menuItems.map((link) => (
          <Link
            to={link.link}
            key={link.label}
            className={`px-3 py-4 capitalize duration-150 ease-in rounded-xl  ${
              pathname.startsWith(link.link)
                ? 'text-sky-400 font-bold'
                : 'text-white font-medium hover:pl-6 hover:bg-violet-500'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </div>
  );
};
