import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import JobDetailsItem from '../JobDetailsItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

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
  state = {profileData: {}, jobsList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getProfileDetails()
    this.getJobsDetails()
  }

  getJobsDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jobsApiUrl = 'https://apis.ccbp.in/jobs'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobsApiUrl, options)
    const fetchedData = await response.json()
    const updatedData = fetchedData.jobs.map(eachJob => ({
      companyLogoUrl: eachJob.company_logo_url,
      employmentType: eachJob.employment_type,
      id: eachJob.id,
      jobDescription: eachJob.job_description,
      location: eachJob.location,
      packagePerAnnum: eachJob.package_per_annum,
      rating: eachJob.rating,
      title: eachJob.title,
    }))
    console.log(updatedData)
    if (response.ok === true) {
      this.setState({
        apiStatus: apiStatusConstants.success,
        jobsList: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(profileApiUrl, options)
    const profileDetails = await response.json()
    const updatedProfileData = {
      name: profileDetails.profile_details.name,
      profileImageUrl: profileDetails.profile_details.profile_image_url,
      shortBio: profileDetails.profile_details.short_bio,
    }

    this.setState({profileData: updatedProfileData})
  }

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

  renderSuccessView = () => {
    const {jobsList} = this.state
    return (
      <ul className="jobs-list">
        {jobsList.map(eachJob => (
          <JobDetailsItem key={eachJob.id} jobDetails={eachJob} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-view">
      <img
        className="failure-view-image"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="failure view"
      />
      <h1 className="failure-view-heading">Oops!Something Went Wrong</h1>
      <p className="failure-view-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="retry-button" type="button">
        Retry
      </button>
    </div>
  )

  renderAllViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  renderJobsList = () => (
    <div className="jobs-list-container">
      <div className="search-input-container">
        <input type="search" className="search" placeholder="Search" />
        <button className="search-button" type="button">
          <BsSearch className="search-icon" />
        </button>
      </div>
      {this.renderAllViews()}
    </div>
  )

  render() {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData
    const isProfile = profileData.length !== 0
    return (
      <div className="jobs-container">
        <Header />
        <div className="job-details-container">
          <div className="jobs-filter-container">
            {isProfile && (
              <div className="profile-container">
                <img className="profile" src={profileImageUrl} alt="profile" />
                <h1 className="name">{name}</h1>
                <p className="job-role">{shortBio}</p>
              </div>
            )}
            {!isProfile && (
              <div className="profile-failure">
                <button className="retry-button" type="button">
                  Retry
                </button>
              </div>
            )}
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
