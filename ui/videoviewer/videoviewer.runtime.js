/* global TW */
$("head").append('<link href="../Common/extensions/VideoViewerWidget/ui/videoviewer/jslibrary/video-js.css" rel="stylesheet">');
$("body").append('<script type="text/javascript" src="../Common/extensions/VideoViewerWidget/ui/videoviewer/jslibrary/video.js"></script>');

document.addEventListener("fullscreenchange", function () {
  $('.widget-videoviewer .video-js .vjs-control-bar').each(function () {
    var display = $(this).width() < 310 ? "none" : "flex";
    $('.vjs-volume-panel', this).css("display", display);
    $('.vjs-progress-control', this).css("display", display);
    $('.vjs-remaining-time', this).css("display", display);
  });
});

TW.Runtime.Widgets.videoviewer = function () {
  var thisWidget = this;
  var uid = new Date().getTime() + "_" + Math.floor(1000 * Math.random());

  this.runtimeProperties = function () {
    return {
      'supportsAutoResize': true,
      'needsDataLoadingAndError': false
    };
  };

  this.renderHtml = function () {
    var html = '';
    html = '<div class="widget-content widget-videoviewer widget-videoviewer-' + uid + '"></div>';
    return html;
  };

  this.afterRender = function () {
  };

  this.resize = function (width, height) {
  };

  this.serviceInvoked = function (serviceName) {
    if (serviceName === 'Load') {
      $('.widget-videoviewer-' + uid).empty();

      var url = thisWidget.getProperty('url');
      var videoJS = thisWidget.getProperty('videoJS');
      var srcMode = thisWidget.getProperty('srcMode');
      var autoplay = thisWidget.getProperty('autoplay');
      var debugMode = thisWidget.getProperty('debugMode');

      if (debugMode) {
        console.log("VideoViewer - Load -> url = " + url + ", videoJS = " + videoJS + ", srcMode = " + srcMode + ", autoplay = " + autoplay);
      }

      switch (srcMode) {
        case "URL":
          thisWidget.createVideoTag(url, "", videoJS, autoplay);
          break;
        case "BASE64":
          thisWidget.loadVideo(url, videoJS, autoplay, debugMode);
          break;
      }
    }
  };

  this.createVideoTag = function (src, mimeType, videoJS, autoplay) {
    var videoUID = uid + "_" + Math.floor(1000 * Math.random());

    if (videoJS) {
      $('<video id="widget-videoviewer-' + videoUID + '" class="video-js" controls preload="auto"></video>').
              append('<source src="' + src + '" type="' + mimeType + '"></source>').
              appendTo($('.widget-videoviewer-' + uid));

      videojs('widget-videoviewer-' + videoUID, {"fluid": true}, function () {
        thisWidget.jqElement.triggerHandler("Loaded");

        var display = $('.widget-videoviewer-' + uid + ' .video-js .vjs-control-bar').width() < 310 ? "none" : "flex";
        $('.widget-videoviewer-' + uid + ' .video-js .vjs-control-bar .vjs-volume-panel').css("display", display);
        $('.widget-videoviewer-' + uid + ' .video-js .vjs-control-bar .vjs-progress-control').css("display", display);
        $('.widget-videoviewer-' + uid + ' .video-js .vjs-control-bar .vjs-remaining-time').css("display", display);

        if (autoplay) {
          this.play();
        }
      });
    } else {
      $('<video id="widget-videoviewer-' + videoUID + '" class="widget-videoviewer-video" controls preload="auto"' + (autoplay ? ' autoplay' : '') + '></video>').
              append('<source src="' + src + '" type="' + mimeType + '"></source>').
              appendTo($('.widget-videoviewer-' + uid));
    }
  };

  this.loadVideo = function (url, videoJS, autoplay, debugMode) {
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', url);
    xhttp.responseType = 'arraybuffer';
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          var mimeType = this.getResponseHeader("Content-Type");

          var bin = "";
          new Uint8Array(this.response).forEach(byte => bin += String.fromCharCode(byte));
          var base64 = "data:" + mimeType + ";base64," + btoa(bin);
          thisWidget.createVideoTag(base64, mimeType, videoJS, autoplay);
        } else {
          if (debugMode) {
            console.log("VideoViewer - error");
          }

          thisWidget.jqElement.triggerHandler('Failed');
        }
      }
    };
    xhttp.send();
  };

  this.updateProperty = function (updatePropertyInfo) {
    if (updatePropertyInfo.TargetProperty === 'url') {
      this.setProperty("url", updatePropertyInfo.RawSinglePropertyValue);
    } else if (updatePropertyInfo.TargetProperty === 'autoplay') {
      this.setProperty("autoplay", updatePropertyInfo.RawSinglePropertyValue);
    } else if (updatePropertyInfo.TargetProperty === 'videoJS') {
      this.setProperty("videoJS", updatePropertyInfo.RawSinglePropertyValue);
    } else if (updatePropertyInfo.TargetProperty === 'srcMode') {
      this.setProperty("srcMode", updatePropertyInfo.RawSinglePropertyValue);
    }
  };
};