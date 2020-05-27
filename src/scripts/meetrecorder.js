import RecordRTC from 'recordrtc';
var FileSaver = require('file-saver');

class MeetRec {
    constructor(){       
        this.recording = false; 
        this.handlerecord = this.handlerecord.bind(this);
    }
    handlerecord(){
        if(!this.recording){
            navigator.mediaDevices.getDisplayMedia({ video: true, audio: true})
                .then((stream) => {
                    this.recorder = RecordRTC(stream,{
                        type:'video'
                    });
                    this.recorder.startRecording();
                    this.recording = true;
                    stream.getVideoTracks()[0].onended = () => {
                        this.recorder.stopRecording(() => {
                            let blob = this.recorder.getBlob();
                            FileSaver.saveAs(blob,'recording'+Date.now())
                            this.recording = false;
                        });            
                    }
                })
                .catch((e) => console.log(e))
        }else if(this.recording){
            this.recorder.stopRecording(() => {
                let blob = this.recorder.getBlob();
                FileSaver.saveAs(blob,'recording'+Date.now())
                this.recording = false;
            });
        }
    }
}

export default MeetRec;