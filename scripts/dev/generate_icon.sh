#!/bin/bash
# brew install imagemagick
# convert $1 -resize 120x120 -set filename:f '%t' output/'%[filename:f].jpg'

# Input icon should be 2048x2048
# usage: bash generate_icon.sh <InputIcon>

mkdir output

convert $1 -resize 120x120  output/logo_120.png
convert $1 -resize 180x180  output/logo_180.png
convert $1 -resize 76x76    output/logo_76.png
convert $1 -resize 152x152  output/logo_152.png
convert $1 -resize 167x167  output/logo_167.png
convert $1 -resize 29x29    output/logo_29.png
convert $1 -resize 58x58    output/logo_58.png
convert $1 -resize 87x87    output/logo_87.png
convert $1 -resize 40x40    output/logo_40.png
convert $1 -resize 80x80    output/logo_80.png
convert $1 -resize 48x48    output/logo_48.png
convert $1 -resize 72x72    output/logo_72.png
convert $1 -resize 96x96    output/logo_96.png
convert $1 -resize 144x144  output/logo_144.png
convert $1 -resize 192x192  output/logo_192.png
convert $1 -resize 1024x1024 output/logo_1024.png

echo "
mobile-config.js should have the following lines
--------------
App.icons({
  'iphone_2x': 'output/logo_120.png',
  'iphone_3x': 'output/logo_180.png',
  'ipad': 'output/logo_76.png',
  'ipad_2x': 'output/logo_152.png',
  'ipad_pro': 'output/logo_167.png',
  'ios_settings': 'output/logo_29.png',
  'ios_settings_2x': 'output/logo_58.png',
  'ios_settings_3x': 'output/logo_87.png',
  'ios_spotlight': 'output/logo_40.png',
  'ios_spotlight_2x': 'output/logo_80.png',
  'android_mdpi': 'output/logo_48.png',
  'android_hdpi': 'output/logo_72.png',
  'android_xhdpi': 'output/logo_96.png',
  'android_xxhdpi': 'output/logo_144.png',
  'android_xxxhdpi': 'output/logo_192.png'
});
"

