import React from "react";

export default function BaseDesign() {
  return (
    <React.Fragment>
      <div className="md:px-32 py-8 w-full">
        {/* Header */}
        <div className="w-max relative my-5 ">
          {/* Search */}
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered input-base-200 w-full max-w-xs"
          />

          {/* select page */}
          <select className="select select-bordered w-full max-w-xs my-4">
            <option disabled selected>
              Page limit 10
            </option>
            <option disabled selected>
              Page limit 5
            </option>
            <option disabled selected>
              Page limit 10
            </option>
            <option disabled selected>
              Page limit 20
            </option>
          </select>

          {/* select  column */}
          <div className="dropdown dropdown-bottom">
            <label tabIndex={0} className="btn m-1">
              Select Column
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <label className="flex justify-between label cursor-pointer">
                  <span className="label-text">Name</span>
                  <input type="checkbox" checked className="checkbox" />
                </label>
              </li>
              <li>
                <a>Item 2</a>
              </li>
              <li>
                <button className="btn bg-base-200 text-black hover:text-white">
                  Chose
                </button>
              </li>
            </ul>
          </div>
          {/* sort column */}
          <div className="dropdown dropdown-bottom">
            <label tabIndex={0} className="btn m-1">
              Sort Column
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <label className="flex justify-between label cursor-pointer">
                  <span className="label-text">Name</span>
                  <input type="checkbox" checked className="checkbox" />
                </label>
              </li>
              <li>
                <a>Item 2</a>
              </li>
              <li>
                <button className="btn bg-base-200 text-black hover:text-white">
                  Chose
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* main table */}
        <div className="shadow overflow-hidden rounded border-b border-gray-200">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Job</th>
                  <th>Favorite Color</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1</th>
                  <th>Cy Garderton</th>
                  <th>Quility Control Specialist</th>
                  <th>Blue</th>
                </tr>
                <tr>
                  <th>1</th>
                  <th>Cy Garderton</th>
                  <th>Quility Control Specialist</th>
                  <th>Blue</th>
                </tr>
                <tr>
                  <th>1</th>
                  <th>Cy Garderton</th>
                  <th>Quility Control Specialist</th>
                  <th>Blue</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between my-5">
          <div className="btn-group">
            <button className="btn bg-base-200 text-black hover:text-white">
                1
            </button>
            <button className="btn btn-neutral">
                2
            </button>
            <button className="btn bg-base-200 text-black hover:text-white">
                3
            </button>
          </div>
          <div className="content-center">
            <p>showing 2 to 2 of 12 entires</p>
          </div>

        </div>
      </div>
    </React.Fragment>
  );
}
