import React from 'react';

export const SkeletonItem = ({ itemCount, cN }) => {
  const skeletonItems = Array.from({ length: itemCount }, (_, index) => (
    <div key={index} className="px-6 py-3 rounded-md animate-pulse">
      <div className={`rounded-md ${cN}`}></div>
    </div>
  ));
  return <div>{skeletonItems}</div>;
};

export const SkeletonInput = ({ itemCount }) => {
  const skeletonItems = Array.from({ length: itemCount }, (_, index) => (
    <div key={index} className="mb-6 rounded-md animate-pulse">
      <div className="w-40 h-4 mb-4 bg-gray-200 rounded-lg" />
      <div className="w-full h-8 mt-2 bg-gray-200 rounded-lg" />
    </div>
  ));
  return <div>{skeletonItems}</div>;
};

export const SkletonSetting = ({ itemCount }) => {
  const skeletonItems = Array.from({ length: itemCount }, (_, index) => (
    <div key={index} className="flex flex-row items-center mt-5 animate-pulse">
      <div className="float-right w-32 h-4 mr-4 bg-gray-200" />
      <div className="flex-1">
        <div className="w-full h-8 p-1 px-3 bg-gray-200 rounded-lg" />
      </div>
    </div>
  ));
  return <div>{skeletonItems}</div>;
};
