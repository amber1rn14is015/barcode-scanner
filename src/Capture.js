import { Button } from '@material-ui/core';
import React, { Component } from 'react';
import './Capture.css';


class Capture extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imageURL: ''
        }

        this.videoEle = React.createRef();
        this.canvasEle = React.createRef();
        this.imageEle = React.createRef();
    }

    componentDidMount = async () => {
        this.startCamera();
    }

    startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: "environment"
                }
            });

            this.videoEle.current.srcObject = stream;

        } catch (err) {
            console.log(err);
        }
    }

    stopCam = () => {
        const stream = this.videoEle.current.srcObject;
        stream.getTracks()[0].stop();
    }

    capturePhoto = async () => {
        // Get the exact size of the video element.
        const width = this.videoEle.current.videoWidth;
        const height = this.videoEle.current.videoHeight;

        // get the context object of hidden canvas
        const ctx = this.canvasEle.current.getContext('2d');

        // Set the canvas to the same dimensions as the video.
        this.canvasEle.current.width = width;
        this.canvasEle.current.height = height;

        // Draw the current frame from the video on the canvas.
        ctx.drawImage(this.videoEle.current, 0, 0, width, height);

        // Get an image dataURL from the canvas.
        const imageDataURL = this.canvasEle.current.toDataURL('image/png');

        // Set the dataURL as source of an image element, showing the captured photo.
        this.stopCam();
        this.setState({
            imageURL: imageDataURL
        })
    }

    backToCam = () => {
        this.setState({
            imageURL: ''
        }, () => {
            this.startCamera();
        })
    }

    render() {
        return (<div className="selfie">
            {this.state.imageURL === '' && <div className="cam">
                <video width="100%" height="100%" className="video-player" autoPlay={true} ref={this.videoEle}></video>
            </div>
            }

            <canvas ref={this.canvasEle} style={{ display: 'none' }}></canvas>
            {this.state.imageURL !== '' && <div className="preview">
                <img className="preview-img" src={this.state.imageURL} ref={this.imageEle} alt="photo_capture" />

            </div>
            }

            {this.state.imageURL === '' && <Button variant="contained" color="primary" onClick={this.capturePhoto}>Capture</Button>}
            {this.state.imageURL !== '' && <div className="afterCaptureButton">
            <Button variant="contained" color="primary" onClick={this.backToCam}>Back</Button>
            <a href={this.state.imageURL} download="capture.png">Download</a>
            </div>}
        </div>)
    }
}

export default Capture;