import React from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const handlePageChange = (pageNumber) => {
    if (pageNumber !== currentPage) {
      onPageChange(pageNumber);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="flex items-center h-10 -space-x-px text-base font-semibold">
        <li>
          <button
            className={`flex items-center justify-center h-10 px-4 ml-0 leading-tight border border-gray-700 rounded-l-lg hover:bg-gray-700 hover:text-white ${
              currentPage === 1
                ? 'bg-gray-700 text-white cursor-not-allowed'
                : 'bg-gray-800 text-gray-400'
            }`}
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            <span className="sr-only">Previous</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </button>
        </li>
        {pageNumbers.map((page) => (
          <li key={page}>
            <button
              className={`flex items-center justify-center h-10 px-4 leading-tight  border border-gray-700 hover:bg-gray-700 hover:text-white ${
                page === currentPage
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-800 text-gray-400 '
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            className={`flex items-center justify-center h-10 px-4 leading-tight border border-gray-700 rounded-r-lg hover:bg-gray-700 hover:text-white ${
              currentPage === totalPages
                ? 'bg-gray-700 text-white cursor-not-allowed'
                : 'bg-gray-800 text-gray-400'
            }`}
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            <span className="sr-only">Next</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
