#!/usr/local/bin/node
/*
# brew install imagemagick
# convert $1 -resize 120x120 -set filename:f '%t' output/'%[filename:f].jpg'

# Splash image should be 2048x2048
# usage: bash generate_splash.sh <InputIcon> <outputFolder>
*/

var spawn = require('child_process').spawn;

var inputFile = process.argv[2];
var outputFolder = process.argv[3];

var bgColor = "white";
var padding = 20;

var command = "convert";

var sizes = [
  [640,960],
  [640,1136],
  [750,1334],
  [1242,2208],
  [2208,1242],
  [768,1024],
  [1536,2048],
  [1024,768],
  [2048,1536],
  [320,470],
  [470,320],
  [480,640],
  [640,480],
  [720,960],
  [960,720],
  [1080,1440],
  [1440,1080]
]

for(let i=0; i<sizes.length; i++) {
  let w=sizes[i][0];
  let h=sizes[i][1];

  let rs = ((w<h?w:h) - (padding * 2));
  let resizeTo = rs.toString() + 'x' + rs.toString();
  let finalSize = w.toString() + 'x' + h.toString();

  let args = [
    inputFile,
    '-resize', resizeTo,
    '-background', bgColor,
    '-gravity', 'center',
    '-extent', finalSize,
    outputFolder + '/splash_' + finalSize + '.png' 
  ];
  console.log("Processing " + finalSize + "..." + resizeTo);
  let process = spawn(command, args);
  process.on('close', function(err) {
    if (err) {
      console.error(err);
    }
    console.log("Processed " + finalSize + "...");
  });
}

console.log("
mobile-config.js should have the following lines
--------------
App.launchScreens({
  'iphone_2x': 'splash_640x960.png',
  'iphone5': 'splash_640x1136.png',
  'iphone6': 'splash_750x1334.png',
  'iphone6p_portrait': 'splash_1242x2208.png',
  'iphone6p_landscape': 'splash_2208x1242.png',
  'ipad_portrait': 'splash_768x1024.png',
  'ipad_portrait_2x': 'splash_1536x2048.png',
  'ipad_landscape': 'splash_1024x768.png',
  'ipad_landscape_2x': 'splash_2048x1536.png',
  'android_mdpi_portrait': 'splash_320x470.png',
  'android_mdpi_landscape': 'splash_470x320.png',
  'android_hdpi_portrait': 'splash_480x640.png',
  'android_hdpi_landscape': 'splash_640x480.png',
  'android_xhdpi_portrait': 'splash_720x960.png',
  'android_xhdpi_landscape': 'splash_960x720.png',
  'android_xxhdpi_portrait': 'splash_1080x1440.png',
  'android_xxhdpi_landscape': 'splash_1440x1080.png'
});
");
