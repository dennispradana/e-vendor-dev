import { Menu, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/logo.png';

const NavAuth = () => {
  return (
    <nav className="container fixed top-0 z-10 p-4 shadow-xl h-18 bg-slate-600">
      <div className="flex items-center justify-between w-full px-4">
        <Link to="/">
          <div className="p-1 bg-white rounded-sm">
            <img src={Logo} alt="logo" className="h-10" />
          </div>
        </Link>
        <Menu as="div" className="relative text-left rounded-lg bg-violet-500">
          <div>
            <Menu.Button>
              <p className="px-4 py-2 font-semibold text-white capitalize">
                options
              </p>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 py-3 mt-3 font-medium capitalize origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg w-44 ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/register-penyedia"
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2`}
                  >
                    Register Penyedia
                  </Link>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </nav>
  );
};

export default NavAuth;
