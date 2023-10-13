import React from 'react';

const Modal = (props) => {
  const {
    onBack,
    onContinue,
    modalText,
    onContinueText,
    onBackText,
    showContinueButton,
    showBackButton,
  } = props;
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative w-[20rem] mx-auto my-6">
          <div className="relative flex flex-col w-full px-3 py-6 bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
            <h3 className="pb-6 font-semibold text-center border-b border-solid rounded-t border-slate-200">
              {modalText}
            </h3>
            {showContinueButton && (
              <button
                type="button"
                onClick={onContinue}
                className="p-3 font-bold text-blue-500 border-b border-solid rounded-md rounded-t hover:text-blue-600 hover:bg-slate-300 border-slate-200"
              >
                {onContinueText}
              </button>
            )}
            {showBackButton && (
              <button
                onClick={onBack}
                className="p-3 font-bold text-red-500 border-b border-solid rounded-md rounded-t hover:text-red-600 hover:bg-slate-300 border-slate-200"
                type="button"
              >
                {onBackText}
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-30"></div>
    </>
  );
};

export default Modal;
