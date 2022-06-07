# Getting Started with Create React App

**Live demo:** https://kexizeroing.github.io/background-demo

**Basic process:**  
getUserMedia -> video -> selfieSegmentation -> draw canvas -> apply filter -> captureStream -> video

**Project details:**  
1. The project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
2. For deployment, refer to [Github Pages](https://create-react-app.dev/docs/deployment/#github-pages).
3. Experiment with [MediaPipe Selfie Segmentation](https://google.github.io/mediapipe/solutions/selfie_segmentation.html) using npm pacakge [@mediapipe/selfie_segmentation](https://www.npmjs.com/package/@mediapipe/selfie_segmentation)

> If the deploy complains error `A branch named 'gh-pages' already exists`, just deleting the folder `node_modules/.cache/gh-pages` works.
