import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class JobRoute extends Component {
  renderTypeOfEmployment = () => (
    <ul className="list-items-container">
      {employmentTypesList.map(eachType => (
        <li key={eachType.employmentTypeId}>
          <input id={eachType.employmentTypeId} type="checkbox" />
          <label className="label" htmlFor={eachType.employmentTypeId}>
            {eachType.label}
          </label>
        </li>
      ))}
    </ul>
  )

  renderSalaryRanges = () => (
    <ul className="list-items-container">
      {salaryRangesList.map(eachItem => (
        <li key={eachItem.salaryRangeId}>
          <input id={eachItem.salaryRangeId} type="radio" />
          <label className="label" htmlFor={eachItem.salaryRangeId}>
            {eachItem.label}
          </label>
        </li>
      ))}
    </ul>
  )

  renderJobsList = () => (
    <div className="jobs-list-container">
      <div className="search-input-container">
        <input type="search" className="search" placeholder="Search" />
        <button className="search-button" type="button">
          <BsSearch className="search-icon" />
        </button>
      </div>
      <div className="jobs-list">list</div>
    </div>
  )

  render() {
    return (
      <div className="jobs-container">
        <Header />
        <div className="job-details-container">
          <div className="jobs-filter-container">
            <div className="profile-container">
              <img
                className="profile"
                src="https://assets.ccbp.in/frontend/react-js/profile-img.png"
                alt="profile"
              />
              <h1 className="name">Rahul Attuluri</h1>
              <p className="job-role">
                Lead Software Developer and AI-ML expert
              </p>
            </div>
            <hr className="separator" />
            <h1 className="side-heading">Type of Employment</h1>
            {this.renderTypeOfEmployment()}
            <hr className="separator" />
            <h1 className="side-heading">Salary Range</h1>
            {this.renderSalaryRanges()}
          </div>
          {this.renderJobsList()}
        </div>
      </div>
    )
  }
}

export default JobRoute
