import React from "react";

const Filter = () => {
  return (
    <div className="card mt-3">
      <div className="card-body m-1 d-flex">
        <ul className="nav-item dropdown p-0 m-0">
          <a
            className="dropdown-toggle text-decoration-none"
            data-bs-toggle="dropdown"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Order by
          </a>
          <div className="dropdown-menu">
            <a className="dropdown-item">Higher price</a>
            <a className="dropdown-item">Lower price</a>

            <div className="dropdown-divider"></div>
            <a className="dropdown-item">A - Z</a>
            <a className="dropdown-item">Z - A</a>
          </div>
        </ul>
        <p className="d-flex ms-auto m-0">100 products</p>
      </div>
    </div>
  );
};

export default Filter;
