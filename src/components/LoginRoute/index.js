import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class LoginRoute extends Component {
  state = {username: '', password: '', showErrMsg: false, errMsg: ''}

  loginSuccessView = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  loginFailureView = errMsg => {
    this.setState({showErrMsg: true, errMsg})
  }

  onClickLogin = async event => {
    event.preventDefault()
    const loginApiUrl = 'https://apis.ccbp.in/login'
    const {username, password} = this.state

    const userDetails = {username, password}

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(loginApiUrl, options)
    const fetchedData = await response.json()

    if (response.ok === true) {
      this.loginSuccessView(fetchedData.jwt_token)
    } else {
      this.loginFailureView(fetchedData.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, showErrMsg, errMsg} = this.state
    return (
      <div className="login-page-container">
        <form onSubmit={this.onClickLogin} className="login-page-form">
          <img
            className="logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <div className="login-details-container">
            <label htmlFor="username" className="input-label">
              USERNAME
            </label>
            <input
              value={username}
              onChange={this.onChangeUsername}
              className="input"
              id="username"
              type="text"
            />
            <label htmlFor="password" className="input-label">
              PASSWORD
            </label>
            <input
              value={password}
              onChange={this.onChangePassword}
              className="input"
              id="password"
              type="password"
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showErrMsg && <p className="error-message">*{errMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginRoute
