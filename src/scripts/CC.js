class CloseCaption {
    constructor(handlers){
        // window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
        this.recognition = new window.SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.onresult = (event) => {
            this.handlers['emitcc'](event.results[event.results.length-1][0].transcript)
        }
        this.recognition.start();
        this.handlers = handlers;
    }
    stoprecog(){
        this.recognition.stop();
    }
}
export default CloseCaption;