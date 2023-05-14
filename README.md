# Virtual background demo with the help of MediaPipe

**Live demo:** https://kexizeroing.github.io/background-demo

**About MediaPipe**  
MediaPipe can create custom cross-platform ML solutions for common tasks without ML expertise.

- Create a custom object detection web app with MediaPipe: https://codelabs.developers.google.com/mp-object-detection-web
- MediaPipe Studio: https://mediapipe-studio.webapps.google.com

**Basic process:**  
getUserMedia -> video -> selfieSegmentation -> draw canvas -> apply filter -> captureStream -> video

**Project details:**  
1. The project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
2. For deployment, refer to [Github Pages](https://create-react-app.dev/docs/deployment/#github-pages).
3. Experiment with [MediaPipe Selfie Segmentation](https://google.github.io/mediapipe/solutions/selfie_segmentation.html) using npm pacakge [@mediapipe/selfie_segmentation](https://www.npmjs.com/package/@mediapipe/selfie_segmentation)

> If the deploy complains error `A branch named 'gh-pages' already exists`, just deleting the folder `node_modules/.cache/gh-pages` works.
