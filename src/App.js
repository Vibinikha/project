import React, { useState, useEffect } from 'react';
import './index.css';

const jobListings = [
  { title: "Web Developer", type: "fulltime", location: "City A", salary: 60000 },
  { title: "UX Designer", type: "parttime", location: "City B", salary: 40000 },
{
  "title": "Software Engineer",
  "type": "FullTime",
  "location": "City C",
  "salary": 80000
},
{
  "title": "Data Analyst",
  "type": "PartTime",
  "location": "City D",
  "salary": 50000
},
{
  "title": "Marketing Manager",
  "type": "FullTime",
  "location": "City E",
  "salary": 90000
},
{
  "title": "UX Designer",
  "type": "Contract",
  "location": "City F",
  "salary": 60000
},
{
  "title": "Backend Developer",
  "type": "FullTime",
  "location": "City G",
  "salary": 70000
},
{
  "title": "Frontend Developer",
  "type": "PartTime",
  "location": "City H",
  "salary": 40000
},
{
  "title": "DevOps Engineer",
  "type": "FullTime",
  "location": "City I",
  "salary": 85000
},
{
  "title": "QA Engineer",
  "type": "PartTime",
  "location": "City J",
  "salary": 45000
}

];

function App() {
  const [jobs, setJobs] = useState(jobListings);
  const [filteredJobs, setFilteredJobs] = useState(jobListings);
  const [jobType, setJobType] = useState('all');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState(5000);

  useEffect(() => {
    renderJobListings(filteredJobs);
  }, [filteredJobs]);

  const handleFilterChange = (event) => {
    const { target } = event;
    const { value, id } = target;

    switch (id) {
      case 'jobType':
        setJobType(value);
        break;
      case 'location':
        setLocation(value.toLowerCase());
        break;
      case 'salary':
        setSalary(parseInt(value));
        break;
      default:
        break;
    }

    filterJobListings();
  };
  

  const filterJobListings = () => {
    const filteredJobs = jobListings.filter((job) => {
      return (jobType === 'all' || job.type === jobType) &&
        (job.location.toLowerCase().includes(location)) &&
        (job.salary >= salary);
    });

    setFilteredJobs(filteredJobs);
  };

  const renderJobListings = (jobs) => {
    const jobListingsContainer = document.getElementById('jobListings');
    jobListingsContainer.innerHTML = '';

    jobs.forEach((job) => {
      const listingDiv = document.createElement('div');
      listingDiv.innerHTML = `
        <h3>${job.title}</h3>
        <p>Type: ${job.type}</p>
        <p>Location: ${job.location}</p>
        <p>Salary: ${job.salary}</p>
      `;
      jobListingsContainer.appendChild(listingDiv);
    });
  };

  return (
    <div>
      
      <h1 align="center">JOB PORTAL</h1>
      <div id="filters">
        <label htmlFor="jobType">Job Type:</label>
        <select id="jobType" value={jobType} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="FullTime">Full Time</option>
          <option value="PartTime">Part Time</option>
        </select>
        <label htmlFor="location">Location:</label>
        <input type="text" id="location" value={location} onChange={handleFilterChange} />
        <label htmlFor="salary">Salary Range:</label>
        <input type="range" id="salary" min="0" max="100000" value={salary} onChange={handleFilterChange} />
        <span id="salaryValue">{salary}</span>
        <button id="filterBtn" onClick={filterJobListings}>Apply Filters</button>
      </div>
      <div id="jobListings"></div>
    </div>
  );
}

export default App;