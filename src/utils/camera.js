export class Camera {
  constructor(video, props) {
    this.video = video;
    this.props = props;
  }

  getVideoStream = async (width, height) => {
    return await navigator.mediaDevices.getUserMedia({
      video: {
        aspectRatio: width / height,
        width: width,
        height: height,
        // https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/facingMode
        facingMode: "user",
      },
    });
  };

  start() {
    this.getVideoStream(this.props.width, this.props.height)
      .then((stream) => {
        this.video.srcObject = stream;
      })
      .catch((err) => {
        console.log("getUserMedia error", err);
      });
      
    // metadata for video consists of: duration, dimensions and text tracks.
    this.video.onloadedmetadata = () => {
      this.video.play();
      this.drawSegmentation();
    };
  }

  async drawSegmentation() {
    await this.props.onFrame();
    window.requestAnimationFrame(() => this.drawSegmentation());
  }
}
