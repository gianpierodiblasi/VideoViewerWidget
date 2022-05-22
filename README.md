# VideoViewerWidget
An extension to show a video viewer.

## Description
This extension provides a widget to show a video viewer; the widget allows to provide a platform-independent user experience.

## Properties
- debugMode - BOOLEAN (default = false): if set to true it sends to the browser's JS console a set of information useful for debugging the widget
- url - STRING (no default value): the URL to retrieve the video
- autoplay - BOOLEAN (default = false): true for the autoplay
- startTime - INTEGER (default = 0): the start time (in seconds)
- currentTime - NUMBER (default = 0): the current time (in seconds)
- videoJS - BOOLEAN (default = false): true to use the video.js library
- srcMode - STRING (default = 'URL'): how to assign the video source (options: URL, BASE64)

## Services
- Load: service to load the video

## Events
- Loaded: event to notify that the video has been loaded
- Failed: event to notify that the video loading has failed
- CurrentTimeChanged: event to notify that the current time has changed

## Dependencies
- video.js - [link](https://github.com/videojs/video.js)

## Donate
If you would like to support the development of this and/or other extensions, consider making a [donation](https://www.paypal.com/donate/?business=HCDX9BAEYDF4C&no_recurring=0&currency_code=EUR).
