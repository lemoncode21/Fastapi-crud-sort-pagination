/* eslint-disable no-loop-func */
/* eslint-disable no-sequences */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */

import axios from "axios";
import React, { useEffect, useState } from "react";

export default function App() {
  // content
  const [tableData, setTableData] = useState([]);
  // page_number
  const [pageNumber, setPageNumber] = useState([]);
  // page_size
  const [pageSize, setPageSize] = useState([]);
  // total_pages
  const [totalPages, setTotalPages] = useState([]);
  // total_record
  const [totalRecord, setTotalRecord] = useState([]);
  // table head
  const [tableHead, setTableHead] = useState([
    "no",
    "name",
    "sex",
    "birth date",
    "birth place",
    "country",
  ]);

  // selected column
  const [selectedColumn, setSelectedColumn] = useState("all");
  // sorted column
  const [sortedColumn, setSortedColumn] = useState(null);
  // filtered column
  const [filteredColumn, setFilteredColumn] = useState(null);

  // default page option
  const [pageOption, setPageOption] = useState([5, 10, 20]);

  // select column
  const [selectColumn, setSelectColumn] = useState({
    name: true,
    sex: true,
    birth_date: true,
    birth_place: true,
    country: true,
  });

  // sort column
  const [sortColumn, setSortColumn] = useState({
    name: false,
    sex: false,
    birth_date: false,
    birth_place: false,
    country: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:8888/person")
      .then((response) => {
        // remove key id, modified_at, create_at
        response.data.result.content.forEach((element) => {
          delete element.id,
            delete element.modified_at,
            delete element.create_at;
        });

        setTableData(response.data.result.content);
        setPageNumber(response.data.result.page_number);
        setPageSize(response.data.result.page_size);
        setTotalPages(response.data.result.total_pages);
        setTotalRecord(response.data.result.total_record);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // capitalize first letter
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // modifiedTable td
  const tdTable = (data) => {
    const td_list = [];
    for (const [key, value] of Object.entries(data)) {
      td_list.push(<td key={key}>{capitalizeFirstLetter(value)}</td>);
    }
    return td_list;
  };

  // onClick render pagination
  const renderPagination = async (page) => {
    const url = `http://localhost:8888/person?page=${page}&limit=${pageSize}&columns=${selectedColumn}&sort=${sortedColumn}&filter=${filteredColumn}`;
    await axios
      .get(url)
      .then((response) => {
        // remove key id, modified_at, create_at
        response.data.result.content.forEach((element) => {
          delete element.id,
            delete element.modified_at,
            delete element.create_at;
        });

        setTableData(response.data.result.content);
        setPageNumber(response.data.result.page_number);
        setPageSize(response.data.result.page_size);
        setTotalPages(response.data.result.total_pages);
        setTotalRecord(response.data.result.total_record);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // pagination
  const pageRows = () => {
    const rows = [];
    for (let index = 1; index <= totalPages; index++) {
      rows.push(
        <button
          key={index}
          onClick={() => {
            renderPagination(index);
          }}
          className={`btn ${
            pageNumber === index
              ? "bg-neutral"
              : "bg-base-200 text-black hover:text-white"
          }`}
        >
          {index}
        </button>
      );
    }
    return rows;
  };

  //  onChange pageOption
  const onChangePageLimit = async (pageLimit) => {
    const url = `http://localhost:8888/person?page=${pageNumber}&limit=${pageLimit}&columns=${selectedColumn}&sort=${sortedColumn}&filter=${filteredColumn}`;
    await axios
      .get(url)
      .then((response) => {
        // remove key id, modified_at, create_at
        response.data.result.content.forEach((element) => {
          delete element.id,
            delete element.modified_at,
            delete element.create_at;
        });

        setTableData(response.data.result.content);
        setPageNumber(response.data.result.page_number);
        setPageSize(response.data.result.page_size);
        setTotalPages(response.data.result.total_pages);
        setTotalRecord(response.data.result.total_record);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // dropdown select column
  const dropdownSelectColumn = () => {
    const list = [];
    for (const [key, value] of Object.entries(selectColumn)) {
      list.push(
        <li key={key}>
          <label className="flex justify-between label cursor-pointer">
            <span className="label-text">{capitalizeFirstLetter(key)}</span>
            {value === true ? (
              <input
                type="checkbox"
                onChange={() => {
                  setSelectColumn({ ...selectColumn, [key]: false });
                }}
                className="checkbox"
                checked
              />
            ) : (
              <input
                type="checkbox"
                onChange={() => {
                  setSelectColumn({ ...selectColumn, [key]: true });
                }}
                className="checkbox"
              />
            )}
          </label>
        </li>
      );
    }
    return list;
  };

  // chose selecetd column
  const choseSelectedColumnHandler = async () => {
    // filter value is true in column
    const true_keys = Object.keys(selectColumn).filter(
      (key) => selectColumn[key]
    );
    let columns = true_keys.join("-");

    setSelectedColumn(columns);
    let url = `http://localhost:8888/person?page=${pageNumber}&limit=${pageSize}&columns=${columns}&sort=${sortedColumn}&filter=${filteredColumn}`;
    await axios
      .get(url)
      .then((response) => {
        setTableData(response.data.result.content);

        let newTableHead = [];
        for (const key in response.data.result.content[0]) {
          newTableHead.push(key);
        }
        newTableHead.unshift("no");

        setTableHead(newTableHead);
        setPageNumber(response.data.result.page_number);
        setPageSize(response.data.result.page_size);
        setTotalPages(response.data.result.total_pages);
        setTotalRecord(response.data.result.total_record);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // dropdown sort column
  const dropdownSortColumn = () => {
    const list = [];
    for (const [key, value] of Object.entries(sortColumn)) {
      list.push(
        <li key={key}>
          <label className="flex justify-between label cursor-pointer">
            <span className="label-text">{capitalizeFirstLetter(key)}</span>
            {value === true ? (
              <input
                onChange={() => {
                  setSortColumn({ ...sortColumn, [key]: false });
                }}
                type="checkbox"
                className="checkbox"
                checked
              />
            ) : (
              <input
                onChange={() => {
                  setSortColumn({ ...sortColumn, [key]: true });
                }}
                type="checkbox"
                className="checkbox"
              />
            )}
          </label>
        </li>
      );
    }
    return list;
  };

  // chose selecetd column
  const choseSortedColumnHandler = async () => {
    // filter value if true in sort
    const true_keys = Object.keys(sortColumn).filter((key) => sortColumn[key]);
    let sorts = true_keys.join("-");

    setSortedColumn(sorts);
    let url = `http://localhost:8888/person?page=${pageNumber}&limit=${pageSize}&columns=${selectedColumn}&sort=${sorts}&filter=${filteredColumn}`;
    await axios
      .get(url)
      .then((response) => {
        // remove key id, modified_at, create_at
        response.data.result.content.forEach((element) => {
          delete element.id,
            delete element.modified_at,
            delete element.create_at;
        });

        setTableData(response.data.result.content);
        setPageNumber(response.data.result.page_number);
        setPageSize(response.data.result.page_size);
        setTotalPages(response.data.result.total_pages);
        setTotalRecord(response.data.result.total_record);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // search handler
  const onSearchHandler = async (data) => {
    // we just filter 3 column name, birth place, country
    const filter = `name*${data}-birth_place*${data}-country*${data}`
    setFilteredColumn(filter)
    let url = `http://localhost:8888/person?page=${pageNumber}&limit=${pageSize}&columns=${selectedColumn}&sort=${sortedColumn}&filter=${filter}`;
    await axios
      .get(url)
      .then((response) => {
        // remove key id, modified_at, create_at
        response.data.result.content.forEach((element) => {
          delete element.id,
            delete element.modified_at,
            delete element.create_at;
        });

        setTableData(response.data.result.content);
        setPageNumber(response.data.result.page_number);
        setPageSize(response.data.result.page_size);
        setTotalPages(response.data.result.total_pages);
        setTotalRecord(response.data.result.total_record);
      })
      .catch((error) => {
        console.log(error);
      }); 
  }
  


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
            onChange={(e)=>{
              onSearchHandler(e.target.value)
            }}
          />

          {/* select page */}
          <select
            className="select select-bordered w-full max-w-xs my-4"
            defaultValue={pageSize}
            onChange={(e) => {
              onChangePageLimit(e.target.value);
            }}
          >
            {pageOption.map((data, index) => {
              if (data === pageSize) {
                return (
                  <option
                    className="bg-gray-200"
                    key={index}
                    value={data}
                    selected
                    disabled
                  >
                    Page Limit {data}
                  </option>
                );
              } else {
                return (
                  <option key={index} value={data}>
                    Page Limit {data}
                  </option>
                );
              }
            })}
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
              {dropdownSelectColumn()}
              <li>
                <button
                  className="btn bg-base-200 text-black hover:text-white"
                  onClick={choseSelectedColumnHandler}
                >
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
              {dropdownSortColumn()}
              <li>
                <button
                  onClick={choseSortedColumnHandler}
                  className="btn bg-base-200 text-black hover:text-white"
                >
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
                  {tableHead.map((data, index) => {
                    return (
                      <th className="cursor-pointer" key={index}>
                        {data}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {tableData.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      {tdTable(data)}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between my-5">
          <div className="btn-group">{pageRows()}</div>
          <div className="content-center">
            <p>
              showing {pageNumber} to {totalPages} of {totalRecord} entires
            </p>
          </div>
        </div>

      </div>
    </React.Fragment>
  );
}
