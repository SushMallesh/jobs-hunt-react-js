import {Switch, Route} from 'react-router-dom'
import LoginRoute from './components/LoginRoute'
import Home from './components/Home'
import JobRoute from './components/JobRoute'
import JobItemDetails from './components/JobItemDetails'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginRoute} />
    <Route exact path="/" component={Home} />
    <Route exact path="/jobs" component={JobRoute} />
    <Route exact path="/jobs/:id" component={JobItemDetails} />
  </Switch>
)

export default App
