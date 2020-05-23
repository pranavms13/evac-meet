const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()

recognition.continous = true
recognition.interimResults = false
recognition.lang = 'en-US'

//------------------------COMPONENT-----------------------------

class Speech{
    constructor(handlers) {
        // super()
        this.listening = false
        this.toggleListen = this.toggleListen.bind(this)
        // this.handleListen = this.handleListen.bind(this)
        this.handlers = handlers;
        recognition.onresult = event => {
            this.handlers['emitcc'](event.results[event.results.length-1][0].transcript)
        }
    }
    async toggleListen () {
        this.listening = !this.listening
        console.log("Closed Captions : " + this.listening)
        // this.handleListen(this.listening)
        if (this.listening){
            recognition.start()
            recognition.onend = () => {
                if(this.listening) recognition.start()
            }
        }else if(!this.listening){
            recognition.stop()
        }
    }
}

export default Speech;