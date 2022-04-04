import React from "react";
import { IData } from "../Cards";

export default function Pagination({ length, page }: IData): JSX.Element {
    let arr: number[] = [];
    for (let i = 1; i <= Math.ceil(length / 32); i++) {
        arr.push(i)
    }

  return (
    <div className="d-flex justify-content-center">
      <ul className="pagination mt-4">
        <li className="page-item disabled">
          <a className="page-link" href="#">
            &laquo;
          </a>
        </li>
        {arr.map((e, i) => {
          return (
            <li key={i} className="page-item">
              <button className="page-link" onClick={() => page(e)}>
                {e}
              </button>
            </li>
          );
        })}
        <li className="page-item disabled">
          <a className="page-link" href="#">
            &raquo;
          </a>
        </li>
      </ul>
    </div>
  );
}


// import React, { useEffect, useState } from 'react';
// import ReactDOM from 'react-dom';
// import ReactPaginate from 'react-paginate';

// export default function PaginatedItems({ itemsPerPage, page }: IData) {
//   // We start with an empty list of items.
//   const [currentItems, setCurrentItems] = useState(null);
//   const [pageCount, setPageCount] = useState(0);
//   // Here we use item offsets; we could also use page offsets
//   // following the API or data you're working with.
//   const [itemOffset, setItemOffset] = useState(0);

//   useEffect(() => {
//     // Fetch items from another resources.
//     const endOffset = itemOffset + itemsPerPage;
//     console.log(`Loading items from ${itemOffset} to ${endOffset}`);
//     setCurrentItems(items.slice(itemOffset, endOffset));
//     setPageCount(Math.ceil(items.length / itemsPerPage));
//   }, [itemOffset, itemsPerPage]);

//   // Invoke when user click to request another page.
//   const handlePageClick = (event) => {
//     const newOffset = (event.selected * itemsPerPage) % items.length;
//     console.log(
//       `User requested page number ${event.selected}, which is offset ${newOffset}`
//     );
//     setItemOffset(newOffset);
//   };

//   return (
//     <>
//       <Items currentItems={currentItems} />
//       <ReactPaginate
//         breakLabel="..."
//         nextLabel="next >"
//         onPageChange={handlePageClick}
//         pageRangeDisplayed={5}
//         pageCount={pageCount}
//         previousLabel="< previous"
//         renderOnZeroPageCount={null}
//       />
//     </>
//   );
// }
