import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

function Stats() {
  const [statistic, setStatistic] = useState([]);
  const [pages, setPages] = useState([1, 2, 3, 4, 5]);
  const [activePage, setActivePage] = useState(1);
  const history = useHistory();

  useEffect(async () => {
    const result = await axios.post("statistic/users", {
      page: activePage,
      limit: 50,
    });
    setStatistic(result.data);
  }, [activePage]);

  function handlePage(newPage) {
    if (newPage < 1) {
      return;
    }

    let temp = 0;
    if (newPage === 2) temp = 1;
    else if (newPage > 2) temp = 2;

    const newPages = pages.map(() => {
      const result = newPage - temp;
      temp -= 1;
      return result;
    });

    setActivePage(newPage);
    setPages(newPages);
  }

  function handleRow(id, fullName) {
    history.push({
      pathname: `/user-stats/${id}`,
      state: { fullName: fullName },
    });
  }

  return (
    <div className="container-fluid p-0">
      <div className="header text-start py-1">
        <p className="fs-3 text-center mb-0 text-md-start">AppCo</p>
      </div>

      <div className="wrapper mx-auto">
        <p className="my-1 links">
          <Link to="/">Main page</Link> >{" "}
          <a className="active-link">User statistics</a>
        </p>
        <h1>Users statistics</h1>
        <div className="table-responsive rounded ">
          <table className="table table-striped text-center">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Gender</th>
                <th scope="col">IP address</th>
                <th scope="col">Total clicks</th>
                <th scope="col">Total page views</th>
              </tr>
            </thead>
            <tbody>
              {statistic.map((row) => (
                <tr
                  onClick={() =>
                    handleRow(row.user_id, `${row.first_name} ${row.last_name}`)
                  }
                >
                  <th scope="row">{row.user_id}</th>
                  <th>{row.first_name}</th>
                  <th>{row.last_name}</th>
                  <th>{row.email}</th>
                  <th>{row.gender}</th>
                  <th>{row.ip_address}</th>
                  <th>{row.total_clicks}</th>
                  <th>{row.total_views}</th>
                </tr>
              ))}{" "}
            </tbody>
          </table>
        </div>

        <nav aria-label="Page navigation text-center">
          <ul className="pagination d-flex justify-content-center">
            <li
              onClick={() => handlePage(activePage - 1)}
              className="page-item"
            >
              <a className="page-link" aria-label="Previous">
                <span aria-hidden="true">&#10096;</span>
              </a>
            </li>
            {pages.map((page) => (
              <li onClick={() => handlePage(page)} className="page-item">
                <a
                  className={`page-link ${
                    activePage === page ? "active-page" : ""
                  }`}
                >
                  {page}
                </a>
              </li>
            ))}
            <li
              onClick={() => handlePage(activePage + 1)}
              className="page-item"
            >
              <a className="page-link" aria-label="Next">
                <span aria-hidden="true">&#10095;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="footer footer-stat text-start py-1">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <p className="fs-5 text-start m-0">AppCo</p>
          </div>
          <div>
            <p className="text-center m-0">All rights reserved by ThemeTags</p>
          </div>
          <div>
            <p className="text-end m-0">Copyrights 2021.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
