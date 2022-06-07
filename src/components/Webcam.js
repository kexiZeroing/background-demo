import React, { Component } from "react";
import { SelfieSegmentation } from "@mediapipe/selfie_segmentation";
import { Camera } from "../utils/camera";

export default class Webcam extends Component {
  webcamRef = React.createRef();
  canvasRef = React.createRef();
  contentRef = React.createRef();
  
  camera = null;
  selfieSegmentation = null;

  videoStyle = {
    width: "100%",
    borderRadius: "4px",
    backgroundColor: "#333",
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const canvasElement = this.canvasRef.current;
    if (!canvasElement) return;

    /*
      * HTMLCanvasElement.captureStream() returns a MediaStream, a real-time video capture of the canvas's contents.
      * The parameter is frameRate(FPS) that indicates the rate of capture of each frame;
      * If not set, a new frame will be captured each time the canvas changes.
    */
    const contentElement = this.contentRef.current;
    contentElement.srcObject = canvasElement.captureStream(30);
    
    this.selfieSegmentation = new SelfieSegmentation({
      locateFile: (file) => {
        // https://github.com/google/mediapipe/issues/2407
        return `background-demo/assets/selfie_segmentation/${file}`;
      },
    });

    this.selfieSegmentation.setOptions({
      modelSelection: 1,
      selfieMode: true,
    });

    this.selfieSegmentation.onResults((res) => {
      const context = canvasElement.getContext("2d");
      context.save();
      context.clearRect(0, 0, canvasElement.width, canvasElement.height);
      context.drawImage(
        res.image,
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );

      if (this.props.filter) {
        context.globalCompositeOperation = "destination-atop";
        context.drawImage(
          res.segmentationMask,
          0,
          0,
          canvasElement.width,
          canvasElement.height
        );

        this.props.filter.apply(
          res.image,
          context,
          canvasElement.width,
          canvasElement.height
        );
      }

      context.restore();
    });

    this.camera = new Camera(this.webcamRef.current, {
      onFrame: async () => {
        await this.selfieSegmentation.send({ image: this.webcamRef.current });
      },
      width: this.props.resolution.width,
      height: this.props.resolution.height,
    });

    this.camera.start();
  }

  componentWillUnmount() {
    this.selfieSegmentation
      ?.close()
      .then(() => console.log("Segmentation stoped"))
      .catch((err) => console.log("Segmentation stop error", err));
  }

  render() {
    return (
      <div style={{ width: "100%" }}>
        <video style={this.videoStyle} autoPlay ref={this.contentRef} />

        <div style={{ display: "none" }}>
          <video
            ref={this.webcamRef}
            style={{
              height: this.props.resolution.height,
              width: this.props.resolution.width,
            }}
          />
          <canvas
            ref={this.canvasRef}
            width={this.props.resolution.width}
            height={this.props.resolution.height}
          />
        </div>
      </div>
    );
  }
}
