class MeetRec {
    constructor(){
        super();
        this.recorder = new window.RecordRTC(window.document.getElementById("main"),{
            type:'video'
        });
    }
    startrecord(){
        this.recorder.startRecording();
    }
    stoprecord(){
        this.recorder.stopRecording(() => {
            let blob = this.recorder.getBlob();
            navigator.invokeSaveAsDialog(blob);
        });
    }
}

export default MeetRec;