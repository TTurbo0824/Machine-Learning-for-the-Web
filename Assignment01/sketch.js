// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using MobileNet and p5.js
This example uses a callback pattern to create the classifier
=== */

let classifier;
let video;
let resultsP;
let myScale = 4;
let objects = ["pop bottle, soda bottle", "hand blower, blow dryer, blow drier, hair dryer, hair drier", "dumbbell", "lotion", "teddy, teddy bear"];
let emojis = ["🥤", "💇", "🏋️", "🧴", "🧸"];
let messages = ["How can I stop drinking so much soda? Any advice?", "Is it better to let your hair dry naturally?", "Have you worked out today?", "Don't forget to moisturize your skin.", "It's not a teddy bear but it's undeniably cute."]

function setup() {
  // noCanvas();
  createCanvas(680, 480);
  textAlign(CENTER, CENTER);

  // Create a camera input
  video = createCapture(VIDEO);
  video.size(width / myScale, height / myScale);

  // Initialize the Image Classifier method with MobileNet and the video as the second argument
  classifier = ml5.imageClassifier('MobileNet', video, modelReady);
  resultsP = createP('Loading model and video...');
}

function modelReady() {
  console.log('Model Ready');
  classifyVideo();
}

// Get a prediction for the current video frame
function classifyVideo() {
  classifier.classify(gotResult);
}

// When we get a result
function gotResult(err, results) {
  // The results are in an array ordered by confidence.
  resultsP.html(results[0].label + ' ' + nf(results[0].confidence, 0, 2));
  // console.log(results[0].label);

  background(255);
  for (var i = 0; i <= objects.length; i++) {
    if (results[0].label === objects[i]) {
      textSize(150);
      text(emojis[i], width / 2, height / 2);
      textSize(24);
      text(messages[i], width / 2, height / 2 + 150);
    }
  }
  classifyVideo();
}
