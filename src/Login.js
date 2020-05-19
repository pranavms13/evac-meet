import React, { Component } from 'react';
import { Input, Button } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import cookie from 'react-cookies';
import verifytok from './scripts/verifyuser';

import "./Home.css"


class Login extends Component {
	constructor(props){
        super(props);
        this.state = {
            failed : false
        }
        this.successlogin = this.successlogin.bind(this);
        this.faillogin = this.faillogin.bind(this);
        // this.logout = this.logout.bind(this);
    }
    componentDidMount(){
        if(cookie.load('EVAC')){
            if(verifytok(cookie.load('EVAC'))){
                window.location = '/';
            }else{
                cookie.remove('EVAC');
            }
        }

    }
    successlogin(e){
        var user = {
            name:e.profileObj.name,
            email:e.profileObj.email,
            token:e.tokenObj.id_token
        }
        cookie.save('EVAC', user, { path: '/' , maxAge:e.tokenObj.expires_in});
        if((window.location.pathname.split('/')[2])&&(window.location.pathname.split('/')[2].length===14)){
            window.location.href = '/meet/' + window.location.pathname.split('/')[2]
        }else{
            window.location.href = '/'
        }
        console.log()
        // if(window.location.path)
        
        // window.location.reload();
    }
    faillogin(e){
        this.setState({failed:true});
    }


	render() {
		return (
			<div className="container2">
				<div>
                    <h1 style={{ fontSize: "45px" }}>EVAC Video Meeting</h1>
                    <p style={{ fontWeight: "200" }}>EVAC is a WebRTC JavaScript based peer-to-peer application with features like screen sharing, audio/video conferencing, file sharing, media streaming etc.</p>
				</div>

				<div className="bombat" style={{
					width: "30%", height: "auto", padding: "20px", minWidth: "400px",
					textAlign: "center", margin: "auto", marginTop: "100px"
				}}>
					<p style={{ margin: 0, fontWeight: "bold", width:'100%',textAlign:'center' }}>Login</p><hr/>
                    <p>
                        <GoogleLogin
                            clientId="727089831121-gpsgina9etaqqbb8a97av6gn3uo6t0f9.apps.googleusercontent.com"
                            buttonText="Login with Google to Continue"
                            onSuccess={this.successlogin}
                            onFailure={this.faillogin}
                            cookiePolicy={'single_host_origin'}
                        />
                    </p>
                    {this.state.failed && <p style={{color:'red'}}> Login Failed !</p>}
				</div>
			</div>
		)
	}
}

export default Login;