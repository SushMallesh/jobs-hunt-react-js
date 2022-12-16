import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import './index.css'

const apisStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {jobDetails: {}, apiStatus: apisStatusConstants.initial}

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
        jobDetails: updatedData,
        apiStatus: apisStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apisStatusConstants.failure})
    }
  }

  renderSuccessView = () => {}

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
