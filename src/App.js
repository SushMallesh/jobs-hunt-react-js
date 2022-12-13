import {Switch, Route} from 'react-router-dom'
import LoginRoute from './components/LoginRoute'
import Home from './components/Home'
import JobRoute from './components/JobRoute'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginRoute} />
    <Route exact path="/" component={Home} />
    <Route exact path="/jobs" component={JobRoute} />
  </Switch>
)

export default App
