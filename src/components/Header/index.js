import {Link, withRouter} from 'react-router-dom'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {AiFillHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="navbar-container">
      <img
        className="website-logo"
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
      />
      <div className="nav-items-lg-container">
        <ul className="nav-items-list">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/jobs" className="nav-link">
              Jobs
            </Link>
          </li>
        </ul>
        <button onClick={onClickLogout} type="button" className="logout-button">
          Logout
        </button>
      </div>
      <div className="nav-items-sm-container">
        <Link to="/" className="nav-link">
          <AiFillHome className="nav-icon" />
        </Link>
        <Link to="/jobs" className="nav-link">
          <BsFillBriefcaseFill className="nav-icon" />
        </Link>
        <FiLogOut onClick={onClickLogout} className="nav-icon" />
      </div>
    </nav>
  )
}

export default withRouter(Header)
