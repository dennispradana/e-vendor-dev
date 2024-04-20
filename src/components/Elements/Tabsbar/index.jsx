import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const TabsBar = ({ items }) => {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <div className="mb-5 border-b border-gray-200">
      <ul className="flex flex-wrap -mb-px text-center text-gray-500 ">
        {items.map((item, index) => (
          <li className="mr-2" key={index}>
            <Link
              to={item.url}
              className={`inline-flex items-center justify-center border-b p-2 rounded-t-lg ease-in-out duration-150  ${
                pathname.startsWith(item.url)
                  ? 'bg-violet-600 text-white border-transparent'
                  : 'hover:text-violet-500 hover:border-violet-600 hover:font-semibold '
              }`}
            >
              <div className="flex items-center gap-1 capitalize">
                {item.icon}
                <span className="2xl:ml-1">{item.label}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
