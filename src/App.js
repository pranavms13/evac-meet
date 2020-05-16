import React, { Component } from 'react'
import Video from './Video'
import Home from './Home'
import Login from './Login'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends Component {
	render() {
		return (
			<div>
				<Router>
					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/login" component={Login} />
						<Route path="/meet/:url" component={Video} />
					</Switch>
				</Router>
			</div>
		)
	}
}

export default App;