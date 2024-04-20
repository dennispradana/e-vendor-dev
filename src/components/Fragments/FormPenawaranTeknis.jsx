import React from 'react';

const FormPenawaranTeknis = ({ data, modal, type }) => {
  const renderTextButton = () => {
    return type === 'readOnly' ? 'Lihat dokumen' : 'Upload Dokumen';
  };
  return (
    <>
      {data.checklist?.teknis?.map((item, index) => (
        <div key={item.chk_id} className="mb-6 border border-black rounded">
          <div className="bg-gray-600 border-b rounded">
            <p className="px-3 py-2 text-white">{item.chk_nama}</p>
          </div>
          <div className="flex items-center h-20 px-3">
            <button
              type="button"
              onClick={() => modal(index)}
              className="w-[10rem] px-3 py-2 font-bold text-white duration-200 ease-in rounded bg-violet-400 hover:bg-violet-500"
            >
              {renderTextButton()}
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default FormPenawaranTeknis;
