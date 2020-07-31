import React, { Component } from 'react';
import io from 'socket.io-client';
import faker from "faker";

import Badge from '@material-ui/core/Badge';
import { Input, Button } from '@material-ui/core';

import LoadingOverlay from 'react-loading-overlay';

import { Modal as Cmod, message } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import {MutedMic, UnmutedMic, MutedVideo, UnmutedVideo, Screen, Unscreen, 
	Msg, SendMsg, EndCall, CCbtn, UpArrow, WhatsappBtn, MailBtn, RecBtn} from './scripts/buttons';

import 'antd/dist/antd.css';

import cookie from 'react-cookies';
import verifytok from './scripts/verifyuser';
import Speech from './scripts/CC';

import { Row } from 'reactstrap';
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.css';
import "./Video.css";

import MeetRec from './scripts/meetrecorder';

const { confirm } = Cmod;
var VideoStreamMerger = require('video-stream-merger')

const server_url = 'https://evac-signal.herokuapp.com' //'http://localhost:4001' 

var joinbling = require('./sounds/join_call_mp3.mp3')
var notifybling = require('./sounds/notify_mp3.mp3')
var leavebling = require('./sounds/leave_call_mp3.mp3')
var logo = require('./images/logo.png')

var connections = {}
const peerConnectionConfig = {
	'iceServers': [
		{ 'urls': 'stun:stun.l.google.com:19302' },
		{ 'urls' : 'turn:turn.pranavms.ml:3478' ,'username':'pranavms', 'credential':'pranavms@13'},
		{ 'urls' : 'turn:turn.pranavms.ml:5349' ,'username':'pranavms', 'credential':'pranavms@13'},
		// { 'urls': 'stun:stun.services.mozilla.com' },	
	]
}
var socket = null
var socketId = null

var elms = 0

const delay = ms => new Promise(res => setTimeout(res, ms));

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
			showChat: false,
			showMeet: false,
			screenAvailable: false,
			messages: [],
			message: "",
			newmessages: 0,
			username: faker.internet.userName(),
			fullName: "",
			waiting:false,
			captionsison:false, 
			captiondata:false
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
				this.captions = new Speech({
					"emitcc":this.ccsender
				})
				this.recorder = new MeetRec();
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
		// var s = new MediaStream();

		console.log(this.state.video, this.state.audio, this.state.screen);
		if(!this.state.video && !this.state.audio && !this.state.screen){
			this.getMediaSuccess(this.generateNameStream(this.state.fullName))
				// .then(this.getMediaSuccess)
				// .then((stream) => {})
				// .catch((e) => console.log(e))
			// this.getMediaSuccess(this.generateNameStream(this.state.fullName))
		}else if(!this.state.video && !this.state.audio && this.state.screen && this.state.screenAvailable){
			// var screen = await 
			navigator.mediaDevices.getDisplayMedia({ video:this.state.screen, audio: this.state.screen})
				.then(this.getMediaSuccess)
				.then((stream) => {})
				.catch((e) => {
					console.log(e)
					this.setState({screen:false});
					this.getMedia();
				})
			// this.getMediaSuccess(screen)
		}else if(!this.state.video && this.state.audio && !this.state.screen && this.audioAvailable){
			// var mic = await 
			navigator.mediaDevices.getUserMedia({ audio: { echoCancellation:true }})
				.then((stream) => {
					stream.addTrack(this.generateNameStream(this.state.fullName).getVideoTracks()[0])
				})
				.then(this.getMediaSuccess)
				.catch((e) => console.log(e))
			// await mic.addTrack(this.generateNameStream(this.state.fullName).getVideoTracks()[0])
			// this.getMediaSuccess(mic)
		}else if(!this.state.video && this.state.audio && this.state.screen && this.audioAvailable && this.state.screenAvailable){
			// var screen = await 
			navigator.mediaDevices.getDisplayMedia({ video:this.state.screen, audio: this.state.screen})
				.then((stream) => {
					navigator.mediaDevices.getUserMedia({ audio: { echoCancellation:true }})
					.then((micstream) => {
						stream.addTrack(micstream.getAudioTracks[0])
					})
				})
				.then(this.getMediaSuccess)
				.catch((e) => console.log(e))
			// var mic = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation:true }});
			// if(screen.getAudioTracks().length>0){
			// 	screen.removeTrack(screen.getAudioTracks()[0])
			// }
			// screen.addTrack(mic.getAudioTracks()[0])
			// this.getMediaSuccess(screen)
		}else if(this.state.video && !this.state.audio && !this.state.screen && this.videoAvailable){
			// var cam = await 
			navigator.mediaDevices.getUserMedia({ video: true })
				.then(this.getMediaSuccess)
				.then((stream) => {})
				.catch((e) => console.log(e))
			// this.getMediaSuccess(cam)
		}else if(this.state.video && this.state.screen && this.videoAvailable && this.state.screenAvailable){
			// var cam = await 
			var merger = new VideoStreamMerger();
			navigator.mediaDevices.getUserMedia({ video: true , audio: true})
				.then((cam) => {
					navigator.mediaDevices.getDisplayMedia({ video: true, audio: true})
					.then((disp) => {
						merger.addStream(disp, {
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
					})
				})	
				// .then(this.getMediaSuccess)
				.catch((e) => console.log(e))
			// var screen = await 

		}else if(this.state.video && this.state.audio && !this.state.screen && this.videoAvailable && this.audioAvailable){
			// var cam = await 
			navigator.mediaDevices.getUserMedia({ video: true , audio:true})
				// .then((stream) => {})
				.then(this.getMediaSuccess)
				.catch((e) => console.log(e))
			// this.getMediaSuccess(cam)
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
		try {
			window.localStream.getTracks().forEach(track => track.stop())
		} catch (e) {
			console.log(e)
		}
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

		stream.getVideoTracks()[0].onended = async () => {
			if(this.state.video){
				this.setState({video:false});
			}
			if(this.state.screen){
				this.setState({screen:false});
			}
			this.getMedia();
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
			socket.on('join-success', async () => {
				var audio = new Audio(joinbling);
				audio.play()
				await delay(1000)
				this.setState({waiting:false})
			})

			socket.on('user-joined', async (id, clients) => {
				var audio = new Audio(joinbling);
				await delay(500)
				audio.play();
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
								if(elms === 1){
									width = "45%"
									height = "30%"
								}else if (elms === 2) {
									width = "45%"
									height = "100%"
								} else if (elms === 3 || elms === 4) {
									width = "35%"
									height = "50%"
								} else {
									width = String(100 / elms) + "%"
								}
								// if(elms <= 1){
								// 	width = '75%'
								// 	height = '50%'
								// }else if(elms <= 2){
								// 	width = '45%';
								// 	height = '75%';
								// }else if(elms <= 4){
								// 	width = '35%';
								// 	height = '50%';
								// }else{
								//	width=String(100 / elms) + '%'
								// }
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
				var audio = new Audio(leavebling);
				audio.play()
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

			socket.on('closed-captions', this.recievecc)

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
		this.state.screen ? message.error('Screen Sharing is OFF') : message.success('Screen Sharing is ON')
	}

	handleEndCall = () => {
		try {
			let tracks = this.localVideoref.current.srcObject.getTracks()
			tracks.forEach(track => track.stop())
		} catch (e) {

		}
		window.location.href = "/"
	}
	ccsender = (data) => {
		socket.emit('closed-captions',{speaker:this.state.fullName,msg:data})
	}
	recievecc = (data) => {
		this.setState({
			captionsison:this.state.captionsison,
			captiondata:this.state.captionsison ? data : false
		})
	}
	handlecc = () => {
		this.setState({
			captionsison:!this.state.captionsison
		})
		if('webkitSpeechRecognition' in window){
			this.captions.toggleListen()
		}else{
			message.error('Closed Captions not Supported on ' + window.navigator.appName)
		}
	}
	openChat = () => {this.setState({showChat: true,newmessages: 0,})}
	openMeet = () => {this.setState({showMeet: true})}

	closeChat = () => {this.setState({showChat: false,})}
	closeMeet = () => {this.setState({showMeet: false,})}

	handleRec = () => {
		this.recorder.handlerecord();
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
			var audio = new Audio(notifybling)
			audio.play()
			this.setState({
				newmessages: this.state.newmessages + 1
			})
		}

	}

	sendMessage = () => {
		if(this.state.message===""){
			message.error("Cannot Send Empty Message",3)
			this.setState({showChat: false})
		}else{
			socket.emit('chat-message', {sender:this.state.fullName,msg:this.state.message})
			this.setState({
				message: "",
			})
		}
	}

	copyUrl = (e) => {
		var text = window.location.href
		this.setState({showMeet:false})
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
						{this.state.captiondata && this.state.captionsison &&
							<div className="ccdisplay">
								{this.state.captiondata.speaker} : {this.state.captiondata.msg}
							</div>
						}
						{/*this.state.captions.ison ? <div className="ccdisplay">{this.state.captions.data ? this.state.captions.data.speaker :null}</div>:null*/}
						{/*this.state.captions.ison && this.state.captions.data &&
							<div className="ccdisplay">
								{this.state.captions.data.speaker} : {this.state.captions.data.msg}
							</div>
						*/}
						<div className="logoheader">
							<image src={logo} style={{width:'100%',height:'100%'}}/>
						</div>
						<div className="btn-down bombat" style={{ height:'70px',maxHeight:'70px', paddingTop:'3px', textAlign: "center" }}>
							<UpArrow margin='5px' onClick={this.openMeet}/>
							{this.state.video ? <UnmutedVideo margin='5px' onClick={this.handleVideo}/>:<MutedVideo margin='5px' onClick={this.handleVideo}/>}
							{this.state.audio ?<UnmutedMic margin='5px' onClick={this.handleAudio}/> : <MutedMic margin='5px' onClick={this.handleAudio}/>}
							
							<span style={{marginLeft:'3%', marginRight:'3%'}}><EndCall margin='5px' onClick={this.handleEndCall}/></span>
							
							{this.state.screenAvailable && this.state.screen && <Screen margin='5px' onClick={this.handleScreen}/>}
							{this.state.screenAvailable && !this.state.screen && <Unscreen margin='5px' onClick={this.handleScreen}/>}
							
							<Badge color="secondary" badgeContent={this.state.newmessages} max={999} anchorOrigin={{vertical: 'top',horizontal: 'right'}} onClick={this.openChat}>
								<Msg margin='5px' onClick={this.openChat}/>
							</Badge>
							<CCbtn margin='5px'onClick={this.handlecc}/>
							{this.state.screenAvailable && <RecBtn margin='5px' onClick={this.handleRec}/>}
						</div>

						<Modal show={this.state.showChat} onHide={this.closeChat} style={{ zIndex: "999999" }}>
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
								<SendMsg margin='5px' onClick={this.sendMessage}/>
								{/*<Button variant="contained" color="primary" onClick={this.sendMessage}>Send</Button>*/}
							</Modal.Footer>
						</Modal>
						
						<Modal show={this.state.showMeet} onHide={this.closeMeet} style={{ zIndex: "999999" }}>
							<Modal.Header  className="bombat" closeButton>
								<Modal.Title>EVAC Meeting Details</Modal.Title>
							</Modal.Header>
							<Modal.Body style={{ overflow: "auto", overflowY: "auto", height: "220px" }} >
							<div style={{ paddingTop: "20px" }}>
								<span style={{color: "#000000"}}>{window.location.href}</span>
								<Button style={{
										backgroundImage: 'linear-gradient(to right, #00eb81, #00b19c)',
										color: "#ffffff",
										marginLeft: "20px",
										// marginTop: "10px",
										width: "120px",
										fontSize: "10px"
									}} onClick={this.copyUrl}>Copy Invite Link</Button>
								</div>
								<div style={{paddingTop:'20px'}}>
									Meeting Code : {window.location.href.split("/")[4]}
								</div>
								<div style={{textAlign: 'center',marginTop:'10px'}}>
									<WhatsappBtn margin='5px' host={this.state.fullName} ml={window.location.href} mc={window.location.href.split("/")[4]}/>
									<MailBtn margin='5px' host={this.state.fullName} ml={window.location.href} mc={window.location.href.split("/")[4]}/>
								</div>
							</Modal.Body>
						</Modal>

						<div className="container">
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