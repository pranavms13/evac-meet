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

import { Modal as Cmod, message } from 'antd';
import { ExclamationCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';

import 'antd/dist/antd.css';

import cookie from 'react-cookies';
import verifytok from './scripts/verifyuser';

import { Row } from 'reactstrap';
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.css';
import "./Video.css";

const { confirm } = Cmod;
var VideoStreamMerger = require('video-stream-merger')

const server_url = 'https://evac-signal.herokuapp.com' //'http://localhost:4001' 

var connections = {}
const peerConnectionConfig = {
	'iceServers': [
		{ 'urls': 'stun:stun.l.google.com:19302' },
		{ 'urls' : 'turn:turn.pranavms.ml:3480' ,'username':'pranavms', 'credential':'pranavms@13'},
		{ 'urls': 'stun:stun1.l.google.com:19302' },
		{ 'urls' : 'turn:turn.pranavms.ml:3481' ,'username':'pranavms', 'credential':'pranavms@13'},
		// { 'urls': 'stun:stun.services.mozilla.com' },
		
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
				// this.getPermissions()
				this.getMedia()
				this.connectToSocketServer()
			})
		}
		document.getElementById('my-video').addEventListener("ended", () => {
			this.setState({video:false,audio:false,screen:false})
		});
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
	}

	generateNameStream = (name) => {
		let canvas = document.createElement("canvas");
		canvas.width = 640;
		canvas.height = 480;
		canvas.style.backgroundColor = '#ffffff'
		var c = canvas.getContext('2d');
		// c.fillStyle = '#ffffff';

		var gradient = c.createLinearGradient(0, 0, canvas.width, 0);
		gradient.addColorStop("0",'#00eb81');
		gradient.addColorStop("1", '#00b19c');		
		// Fill with gradient
		c.fillStyle = gradient;
		// c.fillText("Big smile!", 10, 90);
		// c.fillStyle = "#ffffff";
		c.font = "50px Arial";
		c.textAlign = "center";
		c.fillText(name,canvas.width/2,canvas.height/2);
		return(canvas.captureStream())
	}

	getMedia = async () => {
		//-------------------------------------------------------------------------------------------------------------------------------
		try{
			var tracks = window.localStream.getTracks()
			tracks.forEach(function(track) {
				track.stop();
			  });
		}catch(e){console.log(e)}
		var s = new MediaStream();

		console.log(this.state.video, this.state.audio, this.state.screen);
		if(!this.state.video && !this.state.audio && !this.state.screen){
			this.getMediaSuccess(this.generateNameStream(this.state.fullName))
		}else if(!this.state.video && !this.state.audio && this.state.screen && this.state.screenAvailable){
			var screen = await navigator.mediaDevices.getDisplayMedia({ video:this.state.screen, audio: this.state.screen});
			this.getMediaSuccess(screen)
		}else if(!this.state.video && this.state.audio && !this.state.screen && this.audioAvailable){
			var mic = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation:true }});
			await mic.addTrack(this.generateNameStream(this.state.fullName).getVideoTracks()[0])
			this.getMediaSuccess(mic)
		}else if(!this.state.video && this.state.audio && this.state.screen && this.audioAvailable && this.state.screenAvailable){
			var screen = await navigator.mediaDevices.getDisplayMedia({ video:this.state.screen, audio: this.state.screen});
			var mic = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation:true }});
			if(screen.getAudioTracks().length>0){
				screen.removeTrack(screen.getAudioTracks()[0])
			}
			screen.addTrack(mic.getAudioTracks()[0])
			this.getMediaSuccess(screen)
		}else if(this.state.video && !this.state.audio && !this.state.screen && this.videoAvailable){
			var cam = await navigator.mediaDevices.getUserMedia({ video: true });
			this.getMediaSuccess(cam)
		}else if(this.state.video && this.state.screen && this.videoAvailable && this.state.screenAvailable){
			var cam = await navigator.mediaDevices.getUserMedia({ video: true , audio: true});
			var screen = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true});
			var merger = new VideoStreamMerger();
			merger.addStream(screen, {
				x:0,y:0,
				width:merger.width,
				height:merger.height,
				mute:true // Neglet audio from screen
			})
			merger.addStream(cam, {
				x:merger.width - 125, y:merger.height - 125,
				width:100,height:100,
				mute : (this.state.audio && this.audioAvailable)
			})
			merger.start()
			this.getMediaSuccess(merger.result)

		}else if(this.state.video && this.state.audio && !this.state.screen && this.videoAvailable && this.audioAvailable){
			var cam = await navigator.mediaDevices.getUserMedia({ video: true , audio: { echoCancellation:true }});
			this.getMediaSuccess(cam)
		}

		//-------------------------------------------------------------------------------------------------------------------------------

		// else if(this.state.video && this.state.screen && this.videoAvailable && this.state.screenAvailable){
		// 	var cam = await navigator.mediaDevices.getUserMedia({ video: true , audio: true});
		// 	var screen = await navigator.mediaDevices.getDisplayMedia({ video:this.state.screen, audio: this.state.screen});
		// 	var merger = new VideoStreamMerger();
		// 	merger.addStream(screen, {
		// 		x:0,y:0,
		// 		width:merger.width,
		// 		height:merger.height,
		// 		mute:true // Neglet audio from screen
		// 	})
		// 	merger.addStream(cam, {
		// 		x:merger.width - 125, y:merger.height - 125,
		// 		width:100,height:100,
		// 		mute : this.state.audio
		// 	})
		// 	merger.start()
		// 	stream = merger.result
		// }

		// else if(this.state.video && this.state.audio &&!this.state.screen && this.videoAvailable && this.audioAvailable){
		// 	var cam = await navigator.mediaDevices.getUserMedia({ video: true , audio: true })
		// 	stream = cam;
		// }else if(this.state.video && !this.state.audio &&!this.state.screen && this.videoAvailable){
		// 	var cam = await navigator.mediaDevices.getUserMedia({ video: true , audio: false})
		// 	stream = cam;
		// }else if(!this.state.video && !this.state.audio &&!this.state.screen){
		// 	stream = this.generateNameStream(this.state.fullName)
		// }else if(!this.state.video && this.state.audio &&!this.state.screen && this.audioAvailable){
		// 	var mic = await navigator.mediaDevices.getUserMedia({ audio: true })
		// 	mic.addTrack(this.generateNameStream(this.state.fullName).getVideoTracks()[0])
		// 	stream = mic
		// }else if(!this.state.video && this.state.screen && this.state.screenAvailable){
		// 	var screen = await navigator.mediaDevices.getDisplayMedia({ video:this.state.screen, audio: this.state.screen});
		// 	stream = screen
		// }
		// if(stream.getVideoTracks().length===0){
		// 	stream.addTrack(this.generateNameStream(this.state.fullName).getVideoTracks()[0])
		// }
		// this.getMediaSuccess(stream)
	}
	
	// getAudioMedia = async () => {
	// 	if(this.state.audio && this.audioAvailable){
	// 		var mic = await navigator.mediaDevices.getUserMedia({ audio: {echoCancellation: true,noiseSuppression: true } })
	// 		window.localStream.addTrack(mic.getAudioTracks()[0])
	// 	}else if(window.localStream.getAudioTracks().length>0){
	// 		window.localStream.removeTrack(window.localStream.getAudioTracks()[0])
	// 	}
	// 	// if(window.localStream.getVideoTracks().length===0){
	// 	// 	window.localStream.addTrack(this.generateNameStream(this.state.fullName).getVideoTracks()[0])
	// 	// }
	// 	this.getMediaSuccess(window.localStream)
	// }


	getMediaSuccess = async (stream) => {
		// try {
		// 	window.localStream.getTracks().forEach(track => track.stop())
		// } catch (e) {
		// 	console.log(e)
		// }
		window.localStream = stream
		this.localVideoref.current.srcObject = stream

		// if(window.localStream.getVideoTracks().length===0){
		// 	await window.localStream.addTrack(this.generateNameStream(this.state.fullName).getVideoTracks()[0])
		// }

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
			console.log('Connected to Server');
			socket.emit('join-call', window.location.href, {name:this.state.fullName,email:this.state.username})
			socketId = socket.id

			socket.on('waiting', () => {this.setState({waiting:true})})
			socket.on('join-success', () => {this.setState({waiting:false})})

			socket.on('user-joined', (id, clients) => {
				console.log("User Joined")
				clients.forEach(client => {
					connections[client] = undefined;
					if(connections[client] === undefined){
						connections[client] = new RTCPeerConnection(peerConnectionConfig);
						connections[client].onicecandidate = (event) => {
							if(event.candidate != null){
								socket.emit('signal', client, JSON.stringify({ 'ice': event.candidate }));
							}
						}
						connections[client].onaddstream = (event) => {
							let clientvideo = document.querySelector(`[data-socket="${client}"]`);
							if(clientvideo !== null){
								clientvideo.srcObject = event.stream;
							}else{
								elms = clients.length
								//--------------------------- Video Size Calculation ------------------------
								var main = document.getElementById('main')
								var videos = main.querySelectorAll('video');
								
								var widthMain = main.offsetWidth;
								var minWidth = '30%';
								if((widthMain * 30 / 100) < 300){
									minWidth = '300px';
								}

								var minHeight = '40%';
								var height = String(100 / elms) + '%';
								var width;
								if(elms <= 1){
									width = '75%'
									height = '100%'
								}else if(elms <= 2){
									width = '45%';
									height = '75%';
								}else if(elms <= 4){
									width = '35%';
									height = '50%';
								}else{
									width=String(100 / elms) + '%'
								}
								//-------------------------------------------------------------------------

								for(let a = 0;a< videos.length; ++a){
									videos[a].style.minWidth = minWidth;
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

								video.setAttribute('data-socket', client);
								video.setAttribute("controls", "controls");
								video.srcObject = event.stream;
								video.autoplay = true;
								// video.muted       = true;
								video.playsinline = true;

								main.appendChild(video)
							}
						}
						// if(window.localStream===null || window.localStream===undefined){
							// connections[client].addStream(this.generateNameStream(this.state.fullName))
						// }else{
							connections[client].addStream(window.localStream)
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

			socket.on('chat-message', this.addMessage)

			socket.on('participation-request', function(path,id,extra){
				confirm({
					title: `Add ${extra.name} to the meeting ?`,
					icon: <InfoCircleOutlined />,
					content: `${extra.name}(${extra.email}) is trying to join the Meeting. Click Ok to Add. `,
					onOk() {
					  return new Promise((resolve, reject) => {
						socket.emit('confirm-user',path,id)
						setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
					  }).catch(() => console.log('Oops errors!'));
					},
					onCancel() {
						return new Promise((resolve, reject) => {
							setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
							socket.emit('reject-user',path,id,extra)
						  }).catch(() => console.log('Oops errors!'));
					},
				  });
			})

			socket.on('rejected', () => {
				message.error('Host rejected you to join the meeting',3,() => {
					window.location.href='/';
				});
			})

			socket.on('banned', () => {
				message.error('You are banned from joining this meeting',3,() => {
					window.location.href = '/'
				})
			})
		});
	}
	handleVideo = () => {
		this.setState({
			video: !this.state.video
		}, () => {
			this.getMedia()
		})
		this.state.video ? message.error('Video is Off') : message.success('Video is On')
	}

	handleAudio = () => {
		this.setState({
			audio: !this.state.audio,
		}, () => {
			this.getMedia()
		})
		this.state.audio ? message.error('Microphone is muted') : message.success('Microphone is unmuted')
	}

	handleScreen = () => {
		this.setState({
			screen: !this.state.screen
		}, () => {
			this.getMedia()
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


	render() {
		return (
			<LoadingOverlay
			active={this.state.waiting}
			spinner
			text='Waiting for Host to Accept the Connection.'
			>
				<div>
					<div>
						<div className="btn-down bombat" style={{ height:'65px',maxHeight:'65px', paddingTop:'8px', textAlign: "center" }}>
							<IconButton style={{ color: "#424242" }} onClick={this.handleVideo}>
								{(this.state.video === true) ? <VideocamIcon /> : <VideocamOffIcon style={{ color: "#f44336" }}/>}
							</IconButton>

							<IconButton style={{ color: "#424242" }} onClick={this.handleAudio}>
								{this.state.audio === true ? <MicIcon /> : <MicOffIcon style={{ color: "#f44336" }}/>}
							</IconButton>
							
							<IconButton style={{ paddingLeft:'5%',paddingRight:'5%', color: "#f44336" }} onClick={this.handleEndCall}>
								<CallEndIcon />
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