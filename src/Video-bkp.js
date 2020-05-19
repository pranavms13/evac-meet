import React, { Component } from 'react';
import io from 'socket.io-client';
import faker from "faker";

import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { Input, Button } from '@material-ui/core';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import ScreenShareIcon from '@material-ui/icons/ScreenShare';
import StopScreenShareIcon from '@material-ui/icons/StopScreenShare';
import CallEndIcon from '@material-ui/icons/CallEnd';
import ChatIcon from '@material-ui/icons/Chat';

import LoadingOverlay from 'react-loading-overlay';

import { message } from 'antd';
import 'antd/dist/antd.css';

import cookie from 'react-cookies';
import verifytok from './scripts/verifyuser';

import { Row } from 'reactstrap';
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.css';
import "./Video.css";

const server_url = 'http://localhost:4001' //'https://evac-signal.herokuapp.com'

var connections = {}
const peerConnectionConfig = {
	'iceServers': [
		// { 'urls': 'stun:stun.services.mozilla.com' },
		{ 'urls': 'stun:stun.l.google.com:19302' },
	]
}
var socket = null
var socketId = null

var elms = 0

class Video extends Component {
	constructor(props) {
		super(props)

		this.localVideoref = React.createRef()

		this.videoAvailable = false
		this.audioAvailable = false

		this.video = false
		this.audio = false
		this.screen = false

		this.state = {
			video: false,
			audio: false,
			screen: false,
			showModal: false,
			screenAvailable: false,
			messages: [],
			message: "",
			newmessages: 0,
			username: faker.internet.userName(),
			fullName: "",
			waiting:false
		}
		connections = {}

		this.addMessage = this.addMessage.bind(this)

		this.getPermissions()
	}
	componentDidMount(){
		if((!cookie.load('EVAC')||(!verifytok(cookie.load('EVAC'))))){
			try{cookie.remove('EVAC')}catch(e){}
			if((window.location.pathname.split('/')[2])&&(window.location.pathname.split('/')[2].length===14)){
				window.location.href = '/login/' + window.location.pathname.split('/')[2]
			}else{
				window.location.href = '/login'
			}
		}else{
			this.setState({username:cookie.load('EVAC').email,fullName:cookie.load('EVAC').name}, () => {
				this.getMedia()
			})
		}
    }
	getPermissions = async () => {
		await navigator.mediaDevices.getUserMedia({ video: true })
			.then((stream) => {
				this.videoAvailable = true
				// this.setState({video:true})
				// this.video = true
			})
			.catch((e) => {
				this.videoAvailable = false
			})

		await navigator.mediaDevices.getUserMedia({ audio: true })
			.then((stream) => {
				this.audioAvailable = true
				// this.setState({audio:true})
				// this.audio = true
			})
			.catch((e) => {
				this.audioAvailable = false
			})

		if (navigator.mediaDevices.getDisplayMedia) {
			this.setState({
				screenAvailable: true,
			})
		} else {
			this.setState({
				screenAvailable: false,
			})
		}

		if (this.videoAvailable || this.audioAvailable) {
			navigator.mediaDevices.getUserMedia({ video: this.videoAvailable, audio: this.audioAvailable })
				.then((stream) => {
					stream.removeTrack(stream.getVideoTracks()[0])
					stream.addTrack(this.generateNametrack(cookie.load('EVAC').name))
					stream.removeTrack(stream.getAudioTracks()[0])
					window.localStream = stream
					this.localVideoref.current.srcObject = stream
				})
				.then((stream) => {})
				.catch((e) => console.log(e))
		}
	}

	generateNametrack = (name) => {
		let canvas = document.createElement("canvas");
		canvas.width = 640;
		canvas.height = 480;
		var c = canvas.getContext('2d');
		c.fillStyle = "#ffffff";
		c.font = "30px Arial";
		c.textAlign = "center";
		c.fillText(name,canvas.width/2,canvas.height/2);
		return(canvas.captureStream().getVideoTracks()[0])
	}

	getMedia = () => {
		this.setState({
			video: this.videoAvailable,
		// 	audio: this.audio,
		// 	screen: this.screen
		}, () => {
			this.getUserMedia()
			this.connectToSocketServer()
		})
	}


	getUserMedia = () => {
		if ((this.videoAvailable) || (this.audioAvailable)) {
			// console.log(this.state.video,this.state.audio)
			navigator.mediaDevices.getUserMedia({ video: this.videoAvailable, audio: this.audioAvailable })
				.then(this.getUserMediaSuccess)
				.then((stream) => {})
				.catch((e) => console.log(e))
		} else {
			try {
				let tracks = this.localVideoref.current.srcObject.getTracks()
				tracks.forEach(track => track.stop())
			} catch (e) {
				
			}
		}
	}

	getUserMediaSuccess = (stream) => {
		// console.log(stream)

		if(!this.state.video){
			stream.removeTrack(stream.getVideoTracks()[0])
			stream.addTrack(this.generateNametrack(this.state.fullName))
		}
		if(!this.state.audio){
			stream.removeTrack(stream.getAudioTracks()[0])
		}

		window.localStream = stream
		this.localVideoref.current.srcObject = stream

		for (let id in connections) {
			if (id === socketId) continue

			connections[id].addStream(window.localStream);

			connections[id].createOffer().then((description) => {
				connections[id].setLocalDescription(description)
					.then(() => {
						socket.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }));
					})
					.catch(e => console.log(e));
			});
		}

		// stream.getVideoTracks()[0].onended = () => {
		// 	this.setState({
		// 		video: false,
		// 		audio: false,
		// 	}, () => {
		// 		try {
		// 			let tracks = this.localVideoref.current.srcObject.getTracks()
		// 			tracks.forEach(track => track.stop())
		// 		} catch (e) {
		// 			console.log(e)
		// 		}

		// 		let silence = () => {
		// 			let ctx = new AudioContext()
		// 			let oscillator = ctx.createOscillator()
		// 			let dst = oscillator.connect(ctx.createMediaStreamDestination())
		// 			oscillator.start()
		// 			ctx.resume()
		// 			return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false });
		// 		}

		// 		let black = ({ width = 640, height = 480 } = {}) => {
		// 			let canvas = Object.assign(document.createElement("canvas"), { width, height });
		// 			canvas.getContext('2d').fillRect(0, 0, width, height);
		// 			let stream = canvas.captureStream();
		// 			return Object.assign(stream.getVideoTracks()[0], { enabled: false });
		// 		}

		// 		let blackSilence = (...args) => new MediaStream([black(...args), silence()]);

		// 		window.localStream = blackSilence()
		// 		this.localVideoref.current.srcObject = window.localStream

		// 		for (let id in connections) {
		// 			// connections[id].addStream(window.localStream);
		// 			connections[id].addStream(blackSilence())

		// 			connections[id].createOffer().then((description) => {
		// 				connections[id].setLocalDescription(description)
		// 					.then(() => {
		// 						socket.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }));
		// 					})
		// 					.catch(e => console.log(e));
		// 			});
		// 		}
		// 	})
		// };

	}


	getDislayMedia = () => {
		if (this.state.screen) {
			if (navigator.mediaDevices.getDisplayMedia) {
				navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
					.then(this.getDislayMediaSuccess)
					.then((stream) => {})
					.catch((e) => console.log(e))
			}
		}
	}

	addMicSpeprate = () => {
		if ((this.audioAvailable)) {
			// console.log(this.state.video,this.state.audio)
			navigator.mediaDevices.getUserMedia({ audio: this.audioAvailable })
				.then(this.getUserMediaSuccess)
				.then((stream) => {
					return stream.getAudioTracks()[0];
				})
				.catch((e) => console.log(e))
		}
	}

	getDislayMediaSuccess = (stream) => {
		if(!this.state.screen){
			stream.removeTrack(stream.getVideoTracks()[0])
			stream.addTrack(this.generateNametrack(this.state.fullName))
		}
		if(!this.state.audio){
			stream.removeTrack(stream.getAudioTracks()[0])
		}else{
			stream.addTrack(this.addMicSpeprate());
		}

		// try {
		// 	window.localStream.getTracks().forEach(track => track.stop())
		// } catch (e) {
		// 	console.log(e)
		// }

		window.localStream = stream
		this.localVideoref.current.srcObject = stream

		for (let id in connections) {
			if (id === socketId) continue

			connections[id].addStream(window.localStream);

			connections[id].createOffer().then((description) => {
				connections[id].setLocalDescription(description)
					.then(() => {
						socket.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }));
					})
					.catch(e => console.log(e));
			});
		}


		// stream.getVideoTracks()[0].onended = () => {
		// 	this.setState({
		// 		screen: false,
		// 	}, () => {
		// 		try {
		// 			let tracks = this.localVideoref.current.srcObject.getTracks()
		// 			tracks.forEach(track => track.stop())
		// 		} catch (e) {
		// 			console.log(e)
		// 		}

		// 		let silence = () => {
		// 			let ctx = new AudioContext()
		// 			let oscillator = ctx.createOscillator()
		// 			let dst = oscillator.connect(ctx.createMediaStreamDestination())
		// 			oscillator.start()
		// 			ctx.resume()
		// 			return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false });
		// 		}

		// 		// let black = ({ width = 640, height = 480 } = {}) => {
		// 		// 	let canvas = Object.assign(document.createElement("canvas"), { width, height });
		// 		// 	canvas.getContext('2d').fillRect(0, 0, width, height);
		// 		// 	let stream = canvas.captureStream();
		// 		// 	return Object.assign(stream.getVideoTracks()[0], { enabled: false });
		// 		// }

		// 		let canvas = document.createElement("canvas");
		// 		canvas.width = 640
		// 		canvas.height = 480
		// 		var c = canvas.getContext('2d');
		// 		c.fillStyle = "#ffffff";
		// 		c.font = "30px Arial";
		// 		c.textAlign = "center";
		// 		c.fillText("hi",canvas.width/2,canvas.height/2);

		// 		// stream.removeTrack(stream.getVideoTracks()[0])
		// 		// stream.addTrack(canvas.captureStream().getVideoTracks()[0])
		// 		// stream.getVideoTracks()[0] = canvas.captureStream()
		// 		// let blackSilence = (...args) => new MediaStream([black(...args), silence()]);
		// 		window.localStream = canvas.captureStream();//blackSilence()
		// 		this.localVideoref.current.srcObject = canvas.captureStream();

		// 		this.getUserMedia()
		// 	})
		// };
	}


	gotMessageFromServer = (fromId, message) => {
		var signal = JSON.parse(message)

		if (fromId !== socketId) {
			if (signal.sdp) {
				connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(() => {
					if (signal.sdp.type === 'offer') {
						connections[fromId].createAnswer().then((description) => {
							connections[fromId].setLocalDescription(description).then(() => {
								socket.emit('signal', fromId, JSON.stringify({ 'sdp': connections[fromId].localDescription }));
							}).catch(e => console.log(e));
						}).catch(e => console.log(e));
					}
				}).catch(e => console.log(e));
			}

			if (signal.ice) {
				connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(e => console.log(e));
			}
		}
	}

	connectToSocketServer = () => {
		socket = io.connect(server_url, { secure: true })

		socket.on('signal', this.gotMessageFromServer)

		socket.on('connect', () => {

			console.log("connected")
			console.log(window.location.href)
			socket.emit('join-call', window.location.href, {name:this.state.fullName,email:this.state.username})
			socketId = socket.id

			socket.on('chat-message', this.addMessage)

			socket.on('waiting', () => {this.setState({waiting:true})})
			socket.on('join-success', () => {this.setState({waiting:false})})

			socket.on('user-joined', (id, clients, uextra) => {
				console.log("joined")

				clients.forEach( (socketListId) => {
					connections[socketListId] = undefined
					if (connections[socketListId] === undefined) {
						console.log("new entry")
						connections[socketListId] = new RTCPeerConnection(peerConnectionConfig);
						//Wait for their ice candidate       
						connections[socketListId].onicecandidate = function (event) {
							if (event.candidate != null) {
								socket.emit('signal', socketListId, JSON.stringify({ 'ice': event.candidate }));
							}
						}
						
						//Wait for their video stream
						connections[socketListId].onaddstream = (event) => {
							console.log(connections[socketListId])
							// TODO mute button, full screen button
							var searchVidep = document.querySelector(`[data-socket="${socketListId}"]`);
							if (searchVidep !== null) { // se non faccio questo check crea un quadrato vuoto inutile
								searchVidep.srcObject = event.stream
							} else {
								elms = clients.length
								var main = document.getElementById('main')
								var videos = main.querySelectorAll("video")

								var widthMain = main.offsetWidth

								var minWidth = "30%"
								if ((widthMain * 30 / 100) < 300) {
									minWidth = "300px"
								}

								var minHeight = "40%"

								var height = String(100 / elms) + "%"
								var width = ""
								if (elms === 1 || elms === 2) {
									width = "45%"
									height = "100%"
								} else if (elms === 3 || elms === 4) {
									width = "35%"
									height = "50%"
								} else {
									width = String(100 / elms) + "%"
								}


								for (let a = 0; a < videos.length; ++a) {
									videos[a].style.minWidth = minWidth
									videos[a].style.minHeight = minHeight
									videos[a].style.setProperty("width", width)
									videos[a].style.setProperty("height", height)
								}

								var video = document.createElement('video')
								video.style.minWidth = minWidth
								video.style.minHeight = minHeight
								video.style.maxHeight = "100%"
								video.style.setProperty("width", width)
								video.style.setProperty("height", height)
								video.style.margin = "10px"
								// video.style.borderStyle = "solid"
								// video.style.borderColor = "#bdbdbd"
								video.style.borderRadius = '10px'
								video.style.objectFit = "fill"

								video.setAttribute('data-socket', socketListId);
								video.srcObject = event.stream
								video.autoplay = true;
								// video.muted       = true;
								video.playsinline = true;

								main.appendChild(video)
							}
						}
						
						// console.log(window.localStream)
						//Add the local video stream

						if (window.localStream !== undefined && window.localStream !== null) {
							connections[socketListId].addStream(window.localStream);
						} else {
							let canvas = document.createElement("canvas");
							canvas.width = 640;
							canvas.height = 480;
							var c = canvas.getContext('2d');
							c.fillStyle = "#ffffff";
							c.font = "30px Arial";
							c.textAlign = "center";
							c.fillText(cookie.load('EVAC').name,canvas.width/2,canvas.height/2);

							connections[socketListId].addStream(canvas.captureStream());
						}
						// 	console.log(uextra)
						// 	let stream = new MediaStream([this.generateNametrack(uextra[socketListId][0].name)]);
						// 	connections[socketListId].addStream(stream)
						// 	// connections[socketListId]
						// }
						// 	let canvas = document.createElement("canvas");
						// 	canvas.width = 640;
						// 	canvas.height = 480;
						// 	var c = canvas.getContext('2d');
						// 	c.fillStyle = "#ffffff";
						// 	c.font = "30px Arial";
						// 	c.textAlign = "center";
						// 	c.fillText(cookie.load('EVAC').name,canvas.width/2,canvas.height/2);
							
						// 	connections[socketListId].addStream(canvas.captureStream());
						// 	// let silence = () => {
						// 	// 	let ctx = new AudioContext()
						// 	// 	let oscillator = ctx.createOscillator()
						// 	// 	let dst = oscillator.connect(ctx.createMediaStreamDestination())
						// 	// 	oscillator.start()
						// 	// 	ctx.resume()
						// 	// 	return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false });
						// 	// }

						// 	// let black = ({ width = 640, height = 480 } = {}) => {
						// 	// 	let canvas = Object.assign(document.createElement("canvas"), { width, height });
						// 	// 	let c = canvas.getContext('2d')//.fillRect(0, 0, width, height);
						// 	// 	c.fillStyle = "#ffffff";
						// 	// 	c.font = "30px Arial";
						// 	// 	c.textAlign = "center";
						// 	// 	c.fillText("hi",canvas.width/2,canvas.height/2);

						// 	// 	let stream = canvas.captureStream();
						// 	// 	return Object.assign(stream.getVideoTracks()[0], { enabled: false });
						// 	// }

						// 	// let canvas = document.createElement("canvas");
						// 	// canvas.width = 640
						// 	// canvas.height = 480
						// 	// var c = canvas.getContext('2d');
						// 	// c.fillStyle = "#ffffff";
						// 	// c.font = "30px Arial";
						// 	// c.textAlign = "center";
						// 	// c.fillText("hi",canvas.width/2,canvas.height/2);

						// 	// stream.getVideoTracks()[0] = canvas.captureStream()
						// 	// let blackSilence = (...args) => new MediaStream([black(...args), silence()]);
						// 	// window.localStream = canvas.captureStream();//blackSilence()
						// 	// connections[socketListId].addStream(canvas.captureStream());
						// }
					}
				});

				if (id !== socketId) {
					// Create an offer to connect with your local description
					connections[id].createOffer().then((description) => {
						connections[id].setLocalDescription(description)
							.then(() => {
								socket.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }));
							})
							.catch(e => console.log(e));
					});
				}
			});

			socket.on('user-left', function (id) {
				var video = document.querySelector(`[data-socket="${id}"]`);
				if (video !== null) {
					elms--
					video.parentNode.removeChild(video);

					var main = document.getElementById('main')
					var videos = main.querySelectorAll("video")

					var widthMain = main.offsetWidth

					var minWidth = "30%"
					if ((widthMain * 30 / 100) < 300) {
						minWidth = "300px"
					}

					var minHeight = "40%"

					var height = String(100 / elms) + "%"
					var width = ""
					if (elms === 1 || elms === 2) {
						width = "45%"
						height = "100%"
					} else if (elms === 3 || elms === 4) {
						width = "35%"
						height = "50%"
					} else {
						width = String(100 / elms) + "%"
					}


					for (let a = 0; a < videos.length; ++a) {
						videos[a].style.minWidth = minWidth
						videos[a].style.minHeight = minHeight
						videos[a].style.setProperty("width", width)
						videos[a].style.setProperty("height", height)
					}
				}
			});

			socket.on('participation-request', function(path,id,extra){
				var r = window.confirm(extra.name + ' (' + extra.email + ') is trying to join the meeting.\nClick OK to add the user')
				if(r){
					socket.emit('confirm-user',path,id)
				}else{
					socket.emit('reject-user',path,id,extra)
				}
			})

			socket.on('rejected', () => {
				message.error('Host rejected you to join the meeting',5,() => {
					window.location.href='/';
				});
			})

			socket.on('banned', () => {
				message.error('You are banned from joining this meeting',5,() => {
					window.location.href = '/'
				})
			})
		})
	}


	handleVideo = () => {
		this.setState({
			video: !this.state.video,
		}, () => {
			this.getUserMedia()
		})
	}

	handleAudio = () => {
		this.setState({
			audio: !this.state.audio,
		}, () => {
			this.getUserMedia()
		})
		this.state.audio ? message.info('Microphone is muted') : message.info('Microphone is unmuted')
	}

	handleScreen = () => {
		this.setState({
			screen: !this.state.screen
		}, () => {
			this.getDislayMedia()
		})
	}

	handleEndCall = () => {
		try {
			let tracks = this.localVideoref.current.srcObject.getTracks()
			tracks.forEach(track => track.stop())
		} catch (e) {

		}

		window.location.href = "/"
	}


	openChat = () => {
		this.setState({
			showModal: true,
			newmessages: 0,
		})
	}

	closeChat = () => {
		this.setState({
			showModal: false,
		})
	}

	handleMessage = (e) => {
		this.setState({
			message: e.target.value,
		})
	}

	addMessage = (data, sender) => {
		this.setState(prevState => ({
			messages: [...prevState.messages, { "sender": data.sender, "data": data.msg }],
		}))

		if (sender !== socketId) {
			this.setState({
				newmessages: this.state.newmessages + 1
			})
		}

	}

	sendMessage = () => {
		socket.emit('chat-message', {sender:this.state.fullName,msg:this.state.message})
		this.setState({
			message: "",
		})
	}

	copyUrl = (e) => {
		var text = window.location.href

		if (!navigator.clipboard) {
			var textArea = document.createElement("textarea")
			textArea.value = text
			document.body.appendChild(textArea)
			textArea.focus()
			textArea.select()
			try {
				document.execCommand('copy')
				message.success("Link copied to clipboard!")
			} catch (err) {
				message.error("Failed to copy")
			}
			document.body.removeChild(textArea)
			return
		}
		navigator.clipboard.writeText(text).then(function () {
			message.success("Link copied to clipboard!")
		}, function (err) {
			message.error("Failed to copy")
		})
	}

	handleUsername = (e) => {
		this.setState({
			username: e.target.value
		})
	}

	// connect = () => {
	// 	this.setState({
	// 		askForUsername: false,
	// 	}, () => {
	// 		this.getMedia()
	// 	})
	// }

	render() {
		return (
			<LoadingOverlay
			active={this.state.waiting}
			spinner
			text='Waiting for Host to Accept the Connection.'
			>
				<div>
					<div>
						<div className="btn-down bombat" style={{ height:'65px',paddingTop:'8px', textAlign: "center" }}>
							<IconButton style={{ color: "#424242" }} onClick={this.handleVideo}>
								{(this.state.video === true) ? <VideocamIcon /> : <VideocamOffIcon />}
							</IconButton>

							<IconButton style={{ color: "#f44336" }} onClick={this.handleEndCall}>
								<CallEndIcon />
							</IconButton>

							<IconButton style={{ color: "#424242" }} onClick={this.handleAudio}>
								{this.state.audio === true ? <MicIcon /> : <MicOffIcon style={{ color: "#f44336" }}/>}
							</IconButton>

							{this.state.screenAvailable === true ?
								<IconButton style={{ color: "#424242" }} onClick={this.handleScreen}>
									{this.state.screen === true ? <ScreenShareIcon /> : <StopScreenShareIcon />}
								</IconButton>
								: null}

							<Badge badgeContent={this.state.newmessages} max={999} color="secondary" onClick={this.openChat}>
								<IconButton style={{ color: "#424242" }} onClick={this.openChat}>
									<ChatIcon />
								</IconButton>
							</Badge>
						</div>

						<Modal show={this.state.showModal} onHide={this.closeChat} style={{ zIndex: "999999" }}>
							<Modal.Header  className="bombat" closeButton>
								<Modal.Title>EVAC ChatRoom</Modal.Title>
							</Modal.Header>
							<Modal.Body style={{ overflow: "auto", overflowY: "auto", height: "400px" }} >
								{this.state.messages.length > 0 ? this.state.messages.map((item, index) => (
									<div key={item.sender + item.data + index}>
										<div className="msg">{item.data}<br/><small>{item.sender}</small></div>
									</div>
								)) : <p>No message yet</p>}
							</Modal.Body>
							<Modal.Footer className="div-send-msg">
								<Input placeholder="Message" value={this.state.message} onChange={e => this.handleMessage(e)} />
								<Button variant="contained" color="primary" onClick={this.sendMessage}>Send</Button>
							</Modal.Footer>
						</Modal>

						<div className="container">
							<div style={{ paddingTop: "20px" }}>
								<span style={{color: "whitesmoke"}}>{window.location.href}</span>
								<Button style={{
									backgroundImage: 'linear-gradient(to right, #00eb81, #00b19c)',
									color: "whitesmoke",
									marginLeft: "20px",
									marginTop: "10px",
									width: "120px",
									fontSize: "10px"
								}} onClick={this.copyUrl}>Copy invite link</Button>
							</div>

							<Row id="main" className="flex-container" style={{ margin: 0, padding: 0 }}>
								<video id="my-video" ref={this.localVideoref} autoPlay muted style={{
									borderRadius:'10px',
									borderStyle: "none",
									margin: "10px",
									objectFit: "fill",
									width: "100%",
									height: "100%"
								}}></video>
							</Row>
						</div>
					</div>
				</div>
			</LoadingOverlay>
		)
	}
}

export default Video;