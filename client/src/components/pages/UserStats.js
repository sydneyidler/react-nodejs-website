import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useParams, useLocation, Link } from 'react-router-dom';
import Chart from 'chart.js/auto';
import axios from 'axios';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function UserStats(props) {
  let { id } = useParams();
  const location = useLocation();
  const { fullName } = location.state;
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [data, setData] = useState({});

  useEffect(async () => {
    const result = await axios.post(`/statistic/user/${id}`, { dateFrom: dateRange[0].getTime() / 1000, dateTo: dateRange[1].getTime() / 1000 });
    
    const monthFrom = dateRange[0].getMonth();
    const yearFrom = dateRange[0].getFullYear();
    const monthTo = dateRange[1].getMonth();
    const yearTo = dateRange[1].getFullYear();

    const howManyMonthToShow = (yearTo - yearFrom) * 12 + monthTo - monthFrom + 1;

    const dataClicks = [], dataViews = [];
    const categories = [];

    for (let i = 0; i < howManyMonthToShow; i++) {
      categories[i] = monthNames[(howManyMonthToShow + i) % 12];
      dataClicks[i] = 0; 
      dataViews[i] = 0;
    } 

    let arrayPos;
    let tempMonth, tempYear;
    for (let i = 0; i < result.data.length; i++) {
      tempMonth = result.data[i].month;
      tempYear = result.data[i].year;
      arrayPos = (tempYear - yearFrom) * 12 + tempMonth - monthFrom;
      dataClicks[arrayPos] = result.data[i].total_clicks;
      dataViews[arrayPos] = result.data[i].total_views;
    }

    setData({
      labels: categories,
      datasets: [{
        label: 'Views',
        data: dataViews,
        borderColor: '#3A80BA',
        backgroundColor: '#3A80BA',
      }, {
        label: 'Clicks',
        data: dataClicks,
        borderColor: '#3A80BA',
        backgroundColor: '#3A80BA',
      }],
    });
  }, [dateRange]);

  useEffect(() => {
    console.log(data);
    const config = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
      },
    };

    const prevCanvas = document.getElementById('container-chart').firstChild;
    const canvas = document.createElement('canvas') 
    const containerChart = document.getElementById('container-chart'); 
    const myChart = new Chart(canvas, config);

    if (prevCanvas)
      containerChart.replaceChild(canvas, prevCanvas);
    else
      containerChart.appendChild(canvas);

  }, [data]);

  function handleCalendar(dates) {
    setDateRange(dates);
  }

  return (
    <div className="container-fluid p-0">

      <div className="header text-start py-1">
        <p className="fs-3 text-center mb-0 text-md-start">AppCo</p>
      </div>

      <div className="wrapper mx-auto">
        <p className="my-1 links"><Link to="/">Main page</Link> > <Link to="/stats">User statistics</Link> > <a className="active-link">{fullName}</a></p>
        <h1>{fullName}</h1>

        <Calendar className="mx-auto" onChange={(dates) => handleCalendar(dates)} selectRange={true} />
        <div id="container-chart"></div>
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

export default UserStats;
