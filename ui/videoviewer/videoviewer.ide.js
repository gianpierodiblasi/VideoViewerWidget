/* global TW */
TW.IDE.Widgets.videoviewer = function () {
  this.widgetIconUrl = function () {
    return '../Common/extensions/VideoViewerWidget/ui/videoviewer/video.png';
  };

  this.widgetProperties = function () {
    return {
      'name': 'VideoViewer',
      'description': 'Widget to show a video viewer',
      'category': ['Common'],
      'iconImage': 'video.png',
      'supportsAutoResize': true,
      'properties': {
        'Width': {
          'description': 'width',
          'defaultValue': 200
        },
        'Height': {
          'description': 'height',
          'defaultValue': 28
        },
        'url': {
          'baseType': 'STRING',
          'isBindingTarget': true,
          description: "The URL to retrieve the video"
        },
        'debugMode': {
          'isVisible': true,
          'baseType': 'BOOLEAN',
          'isEditable': true,
          'defaultValue': false,
          'description': 'true to activate the debug'
        },
        'autoplay': {
          'isVisible': true,
          'baseType': 'BOOLEAN',
          'isEditable': true,
          'defaultValue': false,
          'description': 'true for the autoplay'
        },
        'startTime': {
          'isVisible': true,
          'baseType': 'INTEGER',
          'isEditable': true,
          'isBindingTarget': true,
          'defaultValue': 0,
          'description': 'the start time (in seconds)'
        },
        'currentTime': {
          'isVisible': true,
          'baseType': 'NUMBER',
          'isEditable': false,
          'isBindingSource': true,
          'defaultValue': 0,
          'description': 'the current time (in seconds)'
        },
        'videoJS': {
          'isVisible': true,
          'baseType': 'BOOLEAN',
          'isEditable': true,
          'defaultValue': false,
          'description': 'true to use the video.js library'
        },
        'srcMode': {
          'description': 'how to assign the video source',
          'baseType': 'STRING',
          'defaultValue': 'URL',
          'selectOptions': [
            {value: 'URL', text: 'URL'},
            {value: 'BASE64', text: 'BASE64'}
          ]
        }
      }
    };
  };

  this.renderHtml = function () {
    return '<div class="widget-content widget-videoviewer">' + '<span class="videoviewer-property">Video Viewer</span>' + '</div>';
  };

  this.widgetServices = function () {
    return {
      'Load': {}
    };
  };

  this.widgetEvents = function () {
    return {
      'Loaded': {},
      'Failed': {},
      'CurrentTimeChanged': {}
    };
  };
};