import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'
import Header from '../Header'

import './index.css'

const apisStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {jobDetailsData: {}, apiStatus: apisStatusConstants.initial}

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobDetailsFormat = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    skills: data.skills.map(skill => ({
      imageUrl: skill.image_url,
      name: skill.name,
    })),
    title: data.title,
  })

  getJobItemDetails = async () => {
    this.setState({apiStatus: apisStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jobDetailsApiUrl = `https://apis.ccbp.in/jobs/${id}`

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(jobDetailsApiUrl, options)
    const fetchedData = await response.json()
    const updatedData = {
      jobDetails: this.getJobDetailsFormat(fetchedData.job_details),
      similarJobs: fetchedData.similar_jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        rating: job.rating,
        title: job.title,
      })),
    }

    if (response.ok === true) {
      this.setState({
        jobDetailsData: updatedData,
        apiStatus: apisStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apisStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {jobDetailsData} = this.state
    const {jobDetails, similarJobs} = jobDetailsData
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
    } = jobDetails
    return (
      <div className="job-item-details-container">
        <div className="job-details-item-card">
          <div className="logo-title-container">
            <img
              className="company-logo"
              src={companyLogoUrl}
              alt="job details company logo"
            />
            <div className="job-title-and-rating">
              <h1 className="job-title">{title}</h1>
              <div className="job-details-card">
                <AiFillStar className="star" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-salary-container">
            <div className="job-details-card">
              <MdLocationOn size="20" color="#ffffff" />
              <p className="job-details">{location}</p>
            </div>
            <div className="job-details-card">
              <BsFillBriefcaseFill size="20" color="#ffffff" />
              <p className="job-details">{employmentType}</p>
            </div>
            <p className="salary">{packagePerAnnum}</p>
          </div>
          <hr className="hr-line" />
          <div className="website-container">
            <h1 className="job-description-title">Description</h1>
            <a href={companyWebsiteUrl} className="visit-link">
              Visit
              <BiLinkExternal size="20" />
            </a>
          </div>
          <p className="job-details-description">{jobDescription}</p>
          <h1 className="details-heading">Skills</h1>
          <ul className="skills-container">
            {skills.map(skill => (
              <li className="skill-card" key={skill.name}>
                <img
                  className="skill-image"
                  src={skill.imageUrl}
                  alt={skill.name}
                />
                <p className="skill-name">{skill.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="details-heading">Life at Company</h1>
          <div className="life-at-company-card">
            <p className="life-at-company">{lifeAtCompany.description}</p>
            <img
              className="life-at-company-image"
              src={lifeAtCompany.imageUrl}
              alt="life at company"
            />
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar jobs</h1>
        <ul className="similar-jobs-container">
          {similarJobs.map(job => (
            <li className="similar-job-list-container">
              <div className="similar-job-logo-title-container">
                <img
                  className="company-logo"
                  src={job.companyLogoUrl}
                  alt="similar job company logo"
                />
                <div className="job-title-and-rating">
                  <h1 className="job-title">{job.title}</h1>
                  <div className="job-details-card">
                    <AiFillStar className="star" />
                    <p className="rating">{job.rating}</p>
                  </div>
                </div>
              </div>
              <h1 className="job-description-title">Description</h1>
              <p className="job-details-description">{jobDescription}</p>
              <div className="location-salary-container">
                <div className="job-details-card">
                  <MdLocationOn size="20" color="#ffffff" />
                  <p className="job-details">{job.location}</p>
                </div>
                <div className="job-details-card">
                  <BsFillBriefcaseFill size="20" color="#ffffff" />
                  <p className="job-details">{job.employmentType}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
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
        We cannot seem to to find the page you are looking for.
      </p>
      <button type="button" className="retry-button">
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobItemDetailsViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apisStatusConstants.success:
        return this.renderSuccessView()
      case apisStatusConstants.failure:
        return this.renderFailureView()
      case apisStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderJobItemDetailsViews()}
      </>
    )
  }
}

export default JobItemDetails
