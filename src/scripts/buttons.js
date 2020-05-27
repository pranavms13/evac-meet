import React, { Component } from 'react';

import './buttons.css';

class MutedMic extends Component {
    render(){
        return(
            <button className='controlbtns' style={{backgroundColor: '#f5483f', borderRadius:'50%', margin:this.props.margin}} onClick={this.props.onClick}>
                <svg viewBox="0 0 20 20" width="20" height="20">
                    <path fill="white" d="M12.51525,12.51525 C12.51525,14.44525 10.94525,16.01525 9.01525,16.01525 C7.14925,16.01525 5.63425,14.54425 5.53425,12.70325 L12.51525,5.72225 L12.51525,12.51525 Z M5.51525,4.51525 C5.51525,2.58525 7.08525,1.01525 9.01525,1.01525 C10.88125,1.01525 12.39625,2.48625 12.49625,4.32725 L5.51525,11.30825 L5.51525,4.51525 Z M17.38425,0.14625 C17.18925,-0.04875 16.87225,-0.04875 16.67725,0.14625 L13.37425,3.44925 C12.89325,1.48125 11.13125,0.01525 9.01525,0.01525 C6.53025,0.01525 4.51525,2.03025 4.51525,4.51525 L4.51525,12.30825 L0.64625,16.17725 C0.45125,16.37225 0.45125,16.68825 0.64625,16.88425 C0.74425,16.98125 0.87225,17.03025 1.00025,17.03025 C1.12825,17.03025 1.25625,16.98125 1.35325,16.88425 L4.65825,13.57925 C5.10225,15.38425 6.62825,16.75425 8.51825,16.96525 C8.51825,16.96925 8.51725,17.65225 8.51525,19.01525 L6.51525,19.01525 C6.24025,19.01525 6.01525,19.23925 6.01525,19.51525 C6.01525,19.79125 6.24025,20.01525 6.51525,20.01525 L11.51525,20.01525 C11.79125,20.01525 12.01525,19.79125 12.01525,19.51525 C12.01525,19.23925 11.79125,19.01525 11.51525,19.01525 L9.51525,19.01525 L9.51525,16.98225 C11.76025,16.71425 13.51525,14.83025 13.51525,12.51525 L13.51525,4.72225 L17.38425,0.85325 C17.57925,0.65825 17.57925,0.34125 17.38425,0.14625 L17.38425,0.14625 Z" transform="translate(1)"></path>                    
                </svg>
            </button>
        )
    }
}   
class UnmutedMic extends Component{
    render(){
        return(
            <button className='controlbtns' style={{background:'transparent', borderRadius:'50%', borderStyle:'solid', borderColor:'#ffffff', borderWidth:'1px' ,margin:this.props.margin}} onClick={this.props.onClick}>
                <svg viewBox="0 0 20 20" width="20" height="20">
                    <path fill="white" d="M12.51525,12.51525 C12.51525,14.44525 10.94525,16.01525 9.01525,16.01525 C7.14925,16.01525 5.63425,14.54425 5.53425,12.70325 L12.51525,5.72225 L12.51525,12.51525 Z M5.51525,4.51525 C5.51525,2.58525 7.08525,1.01525 9.01525,1.01525 C10.88125,1.01525 12.39625,2.48625 12.49625,4.32725 L5.51525,11.30825 L5.51525,4.51525 Z M17.38425,0.14625 C17.18925,-0.04875 16.87225,-0.04875 16.67725,0.14625 L13.37425,3.44925 C12.89325,1.48125 11.13125,0.01525 9.01525,0.01525 C6.53025,0.01525 4.51525,2.03025 4.51525,4.51525 L4.51525,12.30825 L0.64625,16.17725 C0.45125,16.37225 0.45125,16.68825 0.64625,16.88425 C0.74425,16.98125 0.87225,17.03025 1.00025,17.03025 C1.12825,17.03025 1.25625,16.98125 1.35325,16.88425 L4.65825,13.57925 C5.10225,15.38425 6.62825,16.75425 8.51825,16.96525 C8.51825,16.96925 8.51725,17.65225 8.51525,19.01525 L6.51525,19.01525 C6.24025,19.01525 6.01525,19.23925 6.01525,19.51525 C6.01525,19.79125 6.24025,20.01525 6.51525,20.01525 L11.51525,20.01525 C11.79125,20.01525 12.01525,19.79125 12.01525,19.51525 C12.01525,19.23925 11.79125,19.01525 11.51525,19.01525 L9.51525,19.01525 L9.51525,16.98225 C11.76025,16.71425 13.51525,14.83025 13.51525,12.51525 L13.51525,4.72225 L17.38425,0.85325 C17.57925,0.65825 17.57925,0.34125 17.38425,0.14625 L17.38425,0.14625 Z" transform="translate(1)"></path>
                </svg>
            </button>
        )
    }
}
class MutedVideo extends Component{
    render(){
        return(
            <button className='controlbtns' style={{backgroundColor: '#f5483f', borderRadius:'50%',margin:this.props.margin}} onClick={this.props.onClick}>
                <svg viewBox="0 0 20 20" width="20" height="20">
                    <path fill="white" d="M19.0050447,11.855 C19.0050447,11.936 18.959093,11.972 18.9191349,11.989 C18.8701863,12.011 18.8192398,12.001 18.7772839,11.959 L14.9842665,8.107 L14.9842665,7.89 L18.7772839,4.041 C18.8192398,3.999 18.8691874,3.987 18.9191349,4.01 C18.959093,4.027 19.0050447,4.063 19.0050447,4.144 L19.0050447,11.855 Z M13.9853154,12.502 C13.9853154,13.33 13.3130213,14.002 12.4868888,14.002 L2.7231407,14.002 L13.8414665,2.872 C13.9313721,3.064 13.9853154,3.277 13.9853154,3.502 L13.9853154,12.502 Z M1.60831127,13.704 C1.24069727,13.43 0.998951101,12.996 0.998951101,12.502 L0.998951101,3.502 C0.998951101,2.675 1.67024624,2.002 2.49737775,2.002 L12.4868888,2.002 C12.7216423,2.002 12.9424105,2.062 13.1412017,2.16 L1.60831127,13.704 Z M19.2967384,3.085 C18.8731832,2.91 18.3926877,3.008 18.0700265,3.337 L14.9842665,6.47 L14.9842665,3.502 C14.9842665,2.998 14.831427,2.53 14.5746966,2.138 L15.8583487,0.854 C16.0531442,0.658 16.0531442,0.342 15.8583487,0.147 C15.6625543,-0.049 15.3468858,-0.049 15.1520903,0.147 L13.8744318,1.425 C13.4778483,1.159 13.0003496,1.002 12.4868888,1.002 L2.49737775,1.002 C1.11782628,1.002 0,2.122 0,3.502 L0,12.502 C0,13.272 0.354627641,13.953 0.902052845,14.411 L0.167823785,15.147 C-0.0279706308,15.342 -0.0279706308,15.658 0.167823785,15.854 C0.264722042,15.951 0.392587783,16 0.520453524,16 C0.648319265,16 0.776185006,15.951 0.874082214,15.854 L1.82608261,14.9 C2.04185605,14.96 2.26262424,15.002 2.49737775,15.002 L12.4868888,15.002 C13.8654413,15.002 14.9842665,13.883 14.9842665,12.502 L14.9842665,9.53 L18.0700265,12.662 C18.2857999,12.882 18.5744968,12.999 18.8691874,12.999 C19.0130363,12.999 19.1568853,12.971 19.2967384,12.914 C19.7242895,12.738 20,12.322 20,11.855 L20,4.144 C20,3.677 19.7242895,3.261 19.2967384,3.085 L19.2967384,3.085 Z" transform="translate(0 2)"></path>                    
                </svg>
            </button>
        )
    }
}

class UnmutedVideo extends Component{
    render(){
        return(
            <button className='controlbtns' style={{background:'transparent', borderRadius:'50%', borderStyle:'solid', borderColor:'#ffffff', borderWidth:'1px' ,margin:this.props.margin}} onClick={this.props.onClick}>
                <svg viewBox="0 0 20 20" width="20" height="20">
                    <path fill="white" d="M19.0050447,11.855 C19.0050447,11.936 18.959093,11.972 18.9191349,11.989 C18.8701863,12.011 18.8192398,12.001 18.7772839,11.959 L14.9842665,8.107 L14.9842665,7.89 L18.7772839,4.041 C18.8192398,3.999 18.8691874,3.987 18.9191349,4.01 C18.959093,4.027 19.0050447,4.063 19.0050447,4.144 L19.0050447,11.855 Z M13.9853154,12.502 C13.9853154,13.33 13.3130213,14.002 12.4868888,14.002 L2.7231407,14.002 L13.8414665,2.872 C13.9313721,3.064 13.9853154,3.277 13.9853154,3.502 L13.9853154,12.502 Z M1.60831127,13.704 C1.24069727,13.43 0.998951101,12.996 0.998951101,12.502 L0.998951101,3.502 C0.998951101,2.675 1.67024624,2.002 2.49737775,2.002 L12.4868888,2.002 C12.7216423,2.002 12.9424105,2.062 13.1412017,2.16 L1.60831127,13.704 Z M19.2967384,3.085 C18.8731832,2.91 18.3926877,3.008 18.0700265,3.337 L14.9842665,6.47 L14.9842665,3.502 C14.9842665,2.998 14.831427,2.53 14.5746966,2.138 L15.8583487,0.854 C16.0531442,0.658 16.0531442,0.342 15.8583487,0.147 C15.6625543,-0.049 15.3468858,-0.049 15.1520903,0.147 L13.8744318,1.425 C13.4778483,1.159 13.0003496,1.002 12.4868888,1.002 L2.49737775,1.002 C1.11782628,1.002 0,2.122 0,3.502 L0,12.502 C0,13.272 0.354627641,13.953 0.902052845,14.411 L0.167823785,15.147 C-0.0279706308,15.342 -0.0279706308,15.658 0.167823785,15.854 C0.264722042,15.951 0.392587783,16 0.520453524,16 C0.648319265,16 0.776185006,15.951 0.874082214,15.854 L1.82608261,14.9 C2.04185605,14.96 2.26262424,15.002 2.49737775,15.002 L12.4868888,15.002 C13.8654413,15.002 14.9842665,13.883 14.9842665,12.502 L14.9842665,9.53 L18.0700265,12.662 C18.2857999,12.882 18.5744968,12.999 18.8691874,12.999 C19.0130363,12.999 19.1568853,12.971 19.2967384,12.914 C19.7242895,12.738 20,12.322 20,11.855 L20,4.144 C20,3.677 19.7242895,3.261 19.2967384,3.085 L19.2967384,3.085 Z" transform="translate(0 2)"></path>                    
                </svg>
            </button>
        )
    }
}
class Screen extends Component{
    render(){
        return(
            <button className='controlbtns' style={{background:'transparent', borderRadius:'50%', borderStyle:'solid', borderColor:'#ffffff', borderWidth:'1px', margin:this.props.margin}} onClick={this.props.onClick}>
                <svg width="20" height="20" viewBox="0 0 20 20">
                    <path fill="#ffffff" d="M17.5 2h-16c-0.827 0-1.5 0.673-1.5 1.5v10c0 0.827 0.673 1.5 1.5 1.5h7.5v2h-3.5c-0.276 0-0.5 0.224-0.5 0.5s0.224 0.5 0.5 0.5h8c0.276 0 0.5-0.224 0.5-0.5s-0.224-0.5-0.5-0.5h-3.5v-2h7.5c0.827 0 1.5-0.673 1.5-1.5v-10c0-0.827-0.673-1.5-1.5-1.5zM18 13.5c0 0.276-0.224 0.5-0.5 0.5h-16c-0.276 0-0.5-0.224-0.5-0.5v-10c0-0.276 0.224-0.5 0.5-0.5h16c0.276 0 0.5 0.224 0.5 0.5v10z"/>
                </svg>
            </button>
        )
    }
}
class Unscreen extends Component{
    render(){
        return(
            <button className='controlbtns' style={{backgroundColor: '#f5483f', borderRadius:'50%',margin:this.props.margin}} onClick={this.props.onClick}>
                <svg width="20" height="20" viewBox="0 0 20 20">
                    <path fill="#ffffff" d="M17.5 2h-16c-0.827 0-1.5 0.673-1.5 1.5v10c0 0.827 0.673 1.5 1.5 1.5h7.5v2h-3.5c-0.276 0-0.5 0.224-0.5 0.5s0.224 0.5 0.5 0.5h8c0.276 0 0.5-0.224 0.5-0.5s-0.224-0.5-0.5-0.5h-3.5v-2h7.5c0.827 0 1.5-0.673 1.5-1.5v-10c0-0.827-0.673-1.5-1.5-1.5zM18 13.5c0 0.276-0.224 0.5-0.5 0.5h-16c-0.276 0-0.5-0.224-0.5-0.5v-10c0-0.276 0.224-0.5 0.5-0.5h16c0.276 0 0.5 0.224 0.5 0.5v10z"/>
                </svg>
            </button>
        )
    }
}
class Msg extends Component{
    render(){
        return(
            <button className='controlbtns' style={{background:'transparent', borderRadius:'50%', borderStyle:'solid', borderColor:'#ffffff', borderWidth:'1px' ,margin:this.props.margin}} onClick={this.props.onClick}>
                <svg width="24" height="24" viewBox="0 0 20 20">
                    <path fill="#ffffff" d="M14.999,8.543c0,0.229-0.188,0.417-0.416,0.417H5.417C5.187,8.959,5,8.772,5,8.543s0.188-0.417,0.417-0.417h9.167C14.812,8.126,14.999,8.314,14.999,8.543 M12.037,10.213H5.417C5.187,10.213,5,10.4,5,10.63c0,0.229,0.188,0.416,0.417,0.416h6.621c0.229,0,0.416-0.188,0.416-0.416C12.453,10.4,12.266,10.213,12.037,10.213 M14.583,6.046H5.417C5.187,6.046,5,6.233,5,6.463c0,0.229,0.188,0.417,0.417,0.417h9.167c0.229,0,0.416-0.188,0.416-0.417C14.999,6.233,14.812,6.046,14.583,6.046 M17.916,3.542v10c0,0.229-0.188,0.417-0.417,0.417H9.373l-2.829,2.796c-0.117,0.116-0.71,0.297-0.71-0.296v-2.5H2.5c-0.229,0-0.417-0.188-0.417-0.417v-10c0-0.229,0.188-0.417,0.417-0.417h15C17.729,3.126,17.916,3.313,17.916,3.542 M17.083,3.959H2.917v9.167H6.25c0.229,0,0.417,0.187,0.417,0.416v1.919l2.242-2.215c0.079-0.077,0.184-0.12,0.294-0.12h7.881V3.959z"></path>
                </svg>
            </button>
        )
    }
}
class SendMsg extends Component{
    render(){
        return(
            <button className='controlbtns' style={{backgroundImage: 'linear-gradient(to right, #00eb81, #00b19c)', borderRadius:'50%' ,margin:this.props.margin}} onClick={this.props.onClick}>
                <svg width="24" height="24" viewBox="0 0 24 24" >
                    <path fill="#ffffff" d="M8.014,24.003c-0.27,0-0.525-0.105-0.716-0.296c-0.189-0.189-0.297-0.451-0.297-0.718v-4.921l-6.273-3.873   c-0.713-0.433-0.941-1.368-0.507-2.082c0.149-0.245,0.363-0.442,0.618-0.57L23.273,0.058c0.012-0.006,0.026-0.012,0.04-0.016   c0.008-0.003,0.017-0.006,0.022-0.008c0.032-0.012,0.076-0.023,0.12-0.027c0.008-0.001,0.038-0.002,0.046-0.002   c0.053,0,0.1,0.008,0.145,0.022c0.013,0.002,0.016,0.004,0.028,0.008c0.052,0.02,0.097,0.045,0.136,0.076   c0.004,0.004,0.025,0.021,0.031,0.026c0.016,0.014,0.028,0.029,0.036,0.041c0.024,0.028,0.045,0.059,0.062,0.092   c0.004,0.008,0.019,0.038,0.022,0.046C23.985,0.37,23.997,0.425,24,0.479c0,0.01,0,0.021,0,0.032c0,0.037-0.004,0.075-0.013,0.111   L18.56,22.835c-0.12,0.481-0.466,0.876-0.926,1.058c-0.182,0.073-0.376,0.11-0.576,0.11c-0.291,0-0.574-0.08-0.821-0.231   l-4.682-2.89L8.73,23.706C8.539,23.898,8.285,24.003,8.014,24.003L8.014,24.003z M16.762,22.92c0.088,0.054,0.19,0.083,0.295,0.083   c0.072,0,0.142-0.013,0.208-0.04c0.162-0.063,0.282-0.201,0.323-0.367l4.969-20.337L8.281,17.683L16.762,22.92z M8.001,22.99   l2.68-2.65l-2.68-1.654V22.99z M7.413,17.148L21.218,2.234L1.29,12.436c-0.091,0.045-0.164,0.113-0.215,0.197   c-0.071,0.118-0.093,0.256-0.06,0.391c0.033,0.134,0.116,0.248,0.234,0.319c0.001,0,0.003,0.002,0.003,0.002L7.413,17.148z"/>
                </svg>
            </button>
        )
    }
}
class EndCall extends Component{
    render(){
        return(
            <button className='controlbtns' style={{marginLeft:'10px', backgroundColor: '#3f3f3f', borderRadius:'50%', margin:this.props.margin}} onClick={this.props.onClick}>
                <svg width="20" height="20" viewBox="0 0 20 20">
                    {/*<path fill="#ffffff" d="M16 20c-1.771 0-3.655-0.502-5.6-1.492-1.793-0.913-3.564-2.22-5.122-3.78s-2.863-3.333-3.775-5.127c-0.988-1.946-1.49-3.83-1.49-5.601 0-1.148 1.070-2.257 1.529-2.68 0.661-0.609 1.701-1.32 2.457-1.32 0.376 0 0.816 0.246 1.387 0.774 0.425 0.394 0.904 0.928 1.383 1.544 0.289 0.372 1.73 2.271 1.73 3.182 0 0.747-0.845 1.267-1.739 1.816-0.346 0.212-0.703 0.432-0.961 0.639-0.276 0.221-0.325 0.338-0.333 0.364 0.949 2.366 3.85 5.267 6.215 6.215 0.021-0.007 0.138-0.053 0.363-0.333 0.207-0.258 0.427-0.616 0.639-0.961 0.55-0.894 1.069-1.739 1.816-1.739 0.911 0 2.81 1.441 3.182 1.73 0.616 0.479 1.15 0.958 1.544 1.383 0.528 0.57 0.774 1.011 0.774 1.387 0 0.756-0.711 1.799-1.319 2.463-0.424 0.462-1.533 1.537-2.681 1.537zM3.994 1c-0.268 0.005-0.989 0.333-1.773 1.055-0.744 0.686-1.207 1.431-1.207 1.945 0 6.729 8.264 15 14.986 15 0.513 0 1.258-0.465 1.944-1.213 0.723-0.788 1.051-1.512 1.056-1.781-0.032-0.19-0.558-0.929-1.997-2.037-1.237-0.952-2.24-1.463-2.498-1.469-0.018 0.005-0.13 0.048-0.357 0.336-0.197 0.251-0.408 0.594-0.613 0.926-0.56 0.911-1.089 1.772-1.858 1.772-0.124 0-0.246-0.024-0.363-0.071-2.625-1.050-5.729-4.154-6.779-6.779-0.126-0.315-0.146-0.809 0.474-1.371 0.33-0.299 0.786-0.579 1.228-0.851 0.332-0.204 0.676-0.415 0.926-0.613 0.288-0.227 0.331-0.339 0.336-0.357-0.007-0.258-0.517-1.261-1.469-2.498-1.108-1.439-1.847-1.964-2.037-1.997z"/>*/}
                    <path fill="#ffffff" d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
                </svg>
            </button>
        )
    }
}
class CCbtn extends Component{
    render(){
        return(
            <button className='controlbtns' style={{background:'transparent', borderRadius:'50%', borderStyle:'solid', borderColor:'#ffffff', borderWidth:'1px' ,margin:this.props.margin}} onClick={this.props.onClick}>
                <svg viewBox="0 0 20 20" width="20" height="20">
                    <path fill="#ffffff" d="M4.15 9.279c0-.408.068-.81.205-1.205.137-.395.336-.75.599-1.064.262-.314.581-.568.955-.762.374-.195.801-.292 1.281-.292.575 0 1.073.133 1.495.4 .422.267 .736.62 .942 1.059l-1.248.998c-.056-.163-.13-.298-.222-.405-.092-.107-.194-.191-.306-.254s-.228-.107-.348-.132c-.12-.025-.236-.038-.348-.038-.234 0-.437.052-.607.155-.17.104-.31.238-.419.405-.109.166-.19.355-.243.565-.053.21-.079.419-.079.626 0 .232.031 .455.092 .668s.151.402 .268.565c.117.163 .261.293 .431.391 .17.097 .362.146 .574.146 .112 0 .226-.014.343-.042.117-.028.23-.075.339-.141s.207-.151.293-.254c.087-.104.155-.231.205-.381l1.332.894c-.089.245-.225.464-.406.659s-.388.358-.62.49c-.232.132-.48.232-.745.301-.265.069-.523.104-.775.104-.441 0-.844-.099-1.21-.296-.366-.198-.681-.46-.946-.786s-.47-.697-.615-1.111c-.145-.414-.218-.835-.218-1.261zM2.567 0h14.867c.707 0 1.348.289 1.813.753 .465.465 .753 1.107.753 1.813v13.556c0 .707-.288 1.348-.753 1.813-.465.465-1.107.753-1.813.753H2.567c-.707 0-1.348-.288-1.813-.753C.288 17.471 0 16.83 0 16.123V2.567c0-.707.289-1.348.753-1.813C1.218.289 1.86 0 2.567 0zm14.867 1.613H2.567c-.261 0-.5.108-.673.281-.173.173-.281.411-.281.673v13.556c0 .261.108 .5.281 .673s.411.281 .673.281h14.867c.261 0 .5-.108.673-.281s.281-.411.281-.673V2.567c0-.261-.108-.5-.281-.673-.173-.173-.411-.281-.673-.281zM10.315 9.279c0-.408.068-.81.205-1.205s.336-.75.599-1.064c.262-.314.581-.568.955-.762.374-.195.801-.292 1.281-.292.575 0 1.073.133 1.495.4 .422.267 .736.62 .942 1.059l-1.248.998c-.056-.163-.13-.298-.222-.405-.092-.107-.194-.191-.306-.254s-.228-.107-.348-.132c-.12-.025-.236-.038-.348-.038-.234 0-.437.052-.607.155-.17.104-.31.238-.419.405-.109.166-.19.355-.243.565-.053.21-.08.419-.08.626 0 .232.031 .455.092 .668s.151.402 .268.565c.117.163 .261.293 .431.391 .17.097 .361.146 .574.146 .112 0 .226-.014.343-.042.117-.028.23-.075.339-.141.109-.066.207-.151.293-.254.087-.104.155-.231.205-.381l1.331.894c-.089.245-.225.464-.406.659s-.388.358-.62.49c-.232.132-.48.232-.745.301-.265.069-.523.104-.775.104-.441 0-.844-.099-1.21-.296-.366-.198-.681-.46-.946-.786-.265-.326-.47-.697-.616-1.111-.145-.414-.218-.835-.218-1.261h0z"/>
                </svg>
            </button>
        )
    }
}
class UpArrow extends Component{
    render(){
        return(
            <button className='controlbtns' style={{background:'transparent', borderRadius:'50%', borderStyle:'solid', borderColor:'#ffffff', borderWidth:'1px' ,margin:this.props.margin}} onClick={this.props.onClick}>
                <svg viewBox="0 0 24 24" width="20" height="20">
                    <path fill="#ffffff" d="M0 15c0 0.128 0.049 0.256 0.146 0.354 0.195 0.195 0.512 0.195 0.707 0l8.646-8.646 8.646 8.646c0.195 0.195 0.512 0.195 0.707 0s0.195-0.512 0-0.707l-9-9c-0.195-0.195-0.512-0.195-0.707 0l-9 9c-0.098 0.098-0.146 0.226-0.146 0.354z"/>
                </svg>
            </button>
        )
    }
}

class WhatsappBtn extends Component{
    constructor(props){
        super(props);
        this.handleWAShare = this.handleWAShare.bind(this);
        this.textmessage = `${this.props.host}%20is%20inviting%20you%20to%20a%20meeting%20on%20%0Ahttps%3A%2F%2Fevac.herokuapp.com%0A%0AMeeting%20Code%20%3A%20${this.props.mc}%20%0A%0ALink%20%3A%20${this.props.ml}%0AClick%20on%20the%20Link%20to%20Join%20directly.`;
    }
    handleWAShare(){
        var text = `
        ${this.props.host}%20is%20inviting%20you%20to%20a%20meeting%20on%20%0Ahttps%3A%2F%2Fevac.herokuapp.com%0A%0AMeeting%20Code%20%3A%20${this.props.mc}%20%0A%0ALink%20%3A%20${this.props.ml}%0AClick%20on%20the%20Link%20to%20Join%20directly.
        `
        window.open(`https://api.whatsapp.com/send?text=${text}`,"_blank")
    }
    render(){
        return(
            <button className='controlbtns' style={{backgroundImage: 'linear-gradient(to right, #00eb81, #00b19c)', borderRadius:'50%', borderStyle:'solid', borderColor:'#ffffff', borderWidth:'1px' ,margin:this.props.margin}} onClick={this.handleWAShare}>
                <svg viewBox="0 0 24 24" width="24" height="24">
                    <path fill="#ffffff" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
            </button>
        )
    }
}

class MailBtn extends Component{
    constructor(props){
        super(props);
        this.handleMailShare = this.handleMailShare.bind(this);
    }
    handleMailShare(){
        var text = `
        ${this.props.host}%20is%20inviting%20you%20to%20a%20meeting%20on%20%0Ahttps%3A%2F%2Fevac.herokuapp.com%0A%0AMeeting%20Code%20%3A%20${this.props.mc}%20%0A%0ALink%20%3A%20${this.props.ml}%0AClick%20on%20the%20Link%20to%20Join%20directly.
        `
        window.open(`mailto:?subject=Meeting%20invite%20from%20${this.props.host}&body=${text}`,"_blank")
    }
    render(){
        return(
            <button className='controlbtns' style={{backgroundImage: 'linear-gradient(to right, #00eb81, #00b19c)', borderRadius:'50%', borderStyle:'solid', borderColor:'#ffffff', borderWidth:'1px' ,margin:this.props.margin}} onClick={this.handleMailShare}>
                <svg viewBox="0 0 24 24" width="20" height="20">
                    <path fill="#ffffff" d="M24 4.5v15c0 .85-.65 1.5-1.5 1.5H21V7.387l-9 6.463-9-6.463V21H1.5C.649 21 0 20.35 0 19.5v-15c0-.425.162-.8.431-1.068C.7 3.16 1.076 3 1.5 3H2l10 7.25L22 3h.5c.425 0 .8.162 1.069.432.27.268.431.643.431 1.068z"/>
                </svg>
            </button>
        )
    }
}

class RecBtn extends Component{
    render(){
        return(
            <button className='controlbtns' style={{background: 'transparent', borderRadius:'50%', borderStyle:'solid', borderColor:'#ffffff', borderWidth:'1px' ,margin:this.props.margin}} onClick={this.props.onClick}>
                <svg viewBox="0 0 64 64" width="24" height="24">
                    <circle xmlns="http://www.w3.org/2000/svg" data-name="layer1" cx="32" cy="32" r="26" fill="#f5483f" stroke="#ffffff" stroke-miterlimit="10" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
                </svg>
            </button>
        )
    }
}
// <circle xmlns="http://www.w3.org/2000/svg" data-name="layer1" cx="32" cy="32" r="26" fill="none" stroke="#202020" stroke-miterlimit="10" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
export {MutedMic, UnmutedMic, MutedVideo, UnmutedVideo, Screen, Unscreen, 
    Msg, SendMsg, EndCall, CCbtn, UpArrow, WhatsappBtn, MailBtn, RecBtn};