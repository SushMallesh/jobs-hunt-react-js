import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobDetailsItem = props => {
  const {jobDetails} = props

  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobDetails

  return (
    <Link className="job-link" to={`/jobs/${id}`}>
      <li className="job-item-container">
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
        <h1 className="description-title">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobDetailsItem
