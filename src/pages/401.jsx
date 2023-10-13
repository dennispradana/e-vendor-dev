import React from 'react';
import Error401 from '../assets/401.svg';
import ErrorLayouts from '../components/Layouts/ErrorLayouts';

const Unauthorized = () => {
  return (
    <ErrorLayouts>
      <div className="flex flex-col items-center my-10">
        <div>
          <h1 className="pb-3 text-3xl italic font-bold text-center text-black">
            Opsss....
          </h1>
          <h1 className="text-2xl font-bold text-black uppercase">
            Access is Allowed only for registred users
          </h1>
        </div>
        <div className="my-10 bg-blue-200 rounded-full">
          <img src={Error401} alt="Unauthorized" className=" w-[35rem]" />
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

export default Unauthorized;
