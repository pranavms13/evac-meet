import React, { Component } from 'react';
import { Input, Button } from '@material-ui/core';
import {Row, Col, Container} from 'react-bootstrap';
import cookie from 'react-cookies';
import verifytok from './scripts/verifyuser';
import "./Home.css"

var appdetails = require('./details.json');
var changelog = require('./changelog.json');
var randomize = require('randomatic');

class Home extends Component {
  	constructor (props) {
		super(props)
		this.state = {
			url: '',
		}
	}
	componentWillMount(){
		// this.changelog = fs.readFileSync('./CHANGELOG.MD')
	}
	componentDidMount(){
		if((!cookie.load('EVAC')||(!verifytok(cookie.load('EVAC'))))){
			try{cookie.remove('EVAC')}catch(e){}
			window.location.href = '/login';
		}
    }
	handleChange = (e) => {
		this.setState({
			url: e.target.value
		})
	}

	join = () => {
		if (this.state.url !== "") {
			if (this.state.url.includes(window.location.href) || this.state.url.includes(window.location.href.substring(8, window.location.href.length))) {
				window.location.href = this.state.url
			}
			window.location.href = `/meet/${this.state.url}`
		} else {
			alert('Enter Meeting ID')
		}
	}
	create = () => {
		var url = randomize('aAa0') + '-' + randomize('0aA0') + '-' + randomize('00aA')
		window.location.href = `/meet/${url}`
	}

	render() {
		return (
			<div className="container2">
				<div>
					<h1 style={{ fontSize: "45px" }}>EVAC Video Meeting <sub><small>v{appdetails.version}</small></sub></h1>
					<p style={{ fontWeight: "200" }}>EVAC is a WebRTC JavaScript based peer-to-peer application with features like screen sharing, audio/video conferencing, file sharing, media streaming etc.</p>
				</div>

				<Container>
					<Row>
						<Col xs={12} md={6}>
							<div style={{
								background: "whitesmoke", width: "30%", padding: "20px", minWidth: "400px",
								textAlign: "center", margin: "auto", marginTop: "100px"
							}}>
								<p style={{ margin: 0, fontWeight: "bold", width:'100%',textAlign:'center' }}>Create New meeting</p>
								<p><Button variant="contained" className="bombat" color="primary" onClick={this.create} style={{ margin: "20px" }}>New Meeting</Button></p><hr/>
								<p style={{ margin: 0, fontWeight: "bold", width:'100%',textAlign:'center' }}>Join meeting</p>
								<p><Input placeholder="Meeting ID" onChange={e => this.handleChange(e)} />
								<Button variant="contained" className="bombat" color="primary" onClick={this.join} style={{ margin: "20px" }}>Join Meeting</Button></p>
							</div>
						</Col>
						<Col xs={12} md={6}>
							<div className="bombat" style={{
								 width: "50%", height: "auto", padding: "20px", minWidth: "500px",
								 margin: "auto", marginTop: "100px", maxHeight:"40%", overflow:"scroll"
							}}>
								{Object.keys(changelog).map((version) => {
									return (
										<div>
											<h4 style={{color:'#ffffff'}}>{version}</h4>
											<ul>{changelog[version].map((change) => {
												return <li><small>{change}</small></li>
											})}</ul>
											<hr/>
										</div>
									)
								})}
							</div>
						</Col>
					</Row>
				</Container>
			</div>
		)
	}
}

export default Home;