import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

const Home = props => {
  const onClickFindJobs = () => {
    const {history} = props
    history.replace('/jobs')
  }
  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <div className="home-container">
      <Header />
      <div className="home-page-container">
        <div className="find-job-details-container">
          <h1 className="heading">Find The Job That Fits Your Life</h1>
          <p className="description">
            Millions of people are searching for jobs,salary information,company
            reviews.Find the job that fits your abilities and potential.
          </p>
          <button
            onClick={onClickFindJobs}
            type="button"
            className="find-jobs-button"
          >
            Find Jobs
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
