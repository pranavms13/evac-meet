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
                <svg width="24" height="24" viewBox="0 0 24 24">
                    <path fill="#ffffff" d="M14.5,12c-0.075,0-0.147-0.016-0.216-0.049C14.111,11.868,14,11.691,14,11.5V10h-0.5C13.224,10,13,9.776,13,9.5   S13.224,9,13.5,9h1C14.776,9,15,9.224,15,9.5v0.96l1.688-1.35C16.776,9.039,16.887,9,17,9h2c2.206,0,4-1.794,4-4s-1.794-4-4-4h-6   c-2.206,0-4,1.794-4,4c0,0.276-0.224,0.5-0.5,0.5S8,5.276,8,5c0-2.757,2.243-5,5-5h6c2.757,0,5,2.243,5,5s-2.243,5-5,5h-1.825   l-2.363,1.89C14.724,11.961,14.613,12,14.5,12z"/>
                    <path fill="#ffffff" d="M0.5,24c-0.132,0-0.262-0.054-0.355-0.148C0.05,23.755-0.002,23.629,0,23.494c0.014-1.215,0.263-2.396,0.74-3.513   c0.55-1.103,2.317-1.753,4.763-2.652l0.635-0.234c0.015-0.01,0.081-0.088,0.131-0.296c0.13-0.535,0.008-1.209-0.063-1.322   c-1.066-1.153-1.601-2.725-1.46-4.305c-0.084-1.007,0.223-1.991,0.867-2.772c0.655-0.794,1.58-1.286,2.605-1.385   C8.308,7.008,8.397,7.003,8.487,7c1.046,0.025,2.007,0.45,2.719,1.196c0.712,0.746,1.09,1.723,1.064,2.751   c-0.002,0.075-0.006,0.15-0.012,0.225c0.141,1.58-0.394,3.152-1.471,4.318c-0.061,0.101-0.182,0.775-0.052,1.309   c0.051,0.207,0.116,0.286,0.135,0.298l0.63,0.232c2.445,0.899,4.213,1.549,4.75,2.625c0.487,1.139,0.738,2.325,0.753,3.54   c0.001,0.135-0.05,0.262-0.145,0.357C16.766,23.946,16.636,24,16.504,24H0.5z M15.983,23c-0.066-0.905-0.28-1.787-0.639-2.626   c-0.348-0.694-2.127-1.348-4.188-2.106l-0.636-0.234c-0.258-0.096-0.598-0.346-0.756-0.997c-0.173-0.709-0.087-1.81,0.286-2.221   c0.897-0.971,1.337-2.28,1.208-3.593c-0.003-0.033-0.003-0.065,0-0.098c0.006-0.067,0.01-0.134,0.012-0.202   C11.309,9.353,10.065,8.043,8.495,8C8.441,8.002,8.377,8.006,8.313,8.012C7.554,8.085,6.869,8.449,6.384,9.037   s-0.712,1.33-0.639,2.089c0.003,0.033,0.003,0.065,0,0.097c-0.129,1.312,0.311,2.621,1.206,3.59   c0.375,0.413,0.462,1.514,0.289,2.224c-0.158,0.651-0.498,0.901-0.755,0.997l-0.637,0.235c-2.061,0.758-3.841,1.412-4.201,2.133   C1.299,21.22,1.087,22.096,1.021,23H15.983z"/>
                </svg   >
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
                <svg width="20" height="20" viewBox="0 0 20 20" style={{transform:'rotate(135deg)'}}>
                    <path fill="#ffffff" d="M16 20c-1.771 0-3.655-0.502-5.6-1.492-1.793-0.913-3.564-2.22-5.122-3.78s-2.863-3.333-3.775-5.127c-0.988-1.946-1.49-3.83-1.49-5.601 0-1.148 1.070-2.257 1.529-2.68 0.661-0.609 1.701-1.32 2.457-1.32 0.376 0 0.816 0.246 1.387 0.774 0.425 0.394 0.904 0.928 1.383 1.544 0.289 0.372 1.73 2.271 1.73 3.182 0 0.747-0.845 1.267-1.739 1.816-0.346 0.212-0.703 0.432-0.961 0.639-0.276 0.221-0.325 0.338-0.333 0.364 0.949 2.366 3.85 5.267 6.215 6.215 0.021-0.007 0.138-0.053 0.363-0.333 0.207-0.258 0.427-0.616 0.639-0.961 0.55-0.894 1.069-1.739 1.816-1.739 0.911 0 2.81 1.441 3.182 1.73 0.616 0.479 1.15 0.958 1.544 1.383 0.528 0.57 0.774 1.011 0.774 1.387 0 0.756-0.711 1.799-1.319 2.463-0.424 0.462-1.533 1.537-2.681 1.537zM3.994 1c-0.268 0.005-0.989 0.333-1.773 1.055-0.744 0.686-1.207 1.431-1.207 1.945 0 6.729 8.264 15 14.986 15 0.513 0 1.258-0.465 1.944-1.213 0.723-0.788 1.051-1.512 1.056-1.781-0.032-0.19-0.558-0.929-1.997-2.037-1.237-0.952-2.24-1.463-2.498-1.469-0.018 0.005-0.13 0.048-0.357 0.336-0.197 0.251-0.408 0.594-0.613 0.926-0.56 0.911-1.089 1.772-1.858 1.772-0.124 0-0.246-0.024-0.363-0.071-2.625-1.050-5.729-4.154-6.779-6.779-0.126-0.315-0.146-0.809 0.474-1.371 0.33-0.299 0.786-0.579 1.228-0.851 0.332-0.204 0.676-0.415 0.926-0.613 0.288-0.227 0.331-0.339 0.336-0.357-0.007-0.258-0.517-1.261-1.469-2.498-1.108-1.439-1.847-1.964-2.037-1.997z"/>
                </svg>
            </button>
        )
    }
}
export {MutedMic, UnmutedMic, MutedVideo, UnmutedVideo, Screen, Unscreen, Msg, SendMsg, EndCall};