import React from 'react';
import Error404 from '../assets/404.svg';
import ErrorLayouts from '../components/Layouts/ErrorLayouts';

const NotFound = () => {
  return (
    <ErrorLayouts>
      <div className="flex flex-col items-center my-10">
        <div className="my-10 ">
          <img src={Error404} alt="Unauthorized" className=" w-[45rem]" />
        </div>
        <button
          onClick={() => history.back()}
          className="font-bold uppercase text-sky-400 hover:underline hover:text-blue-600"
        >
          go back
        </button>
      </div>
    </ErrorLayouts>
  );
};

export default NotFound;
