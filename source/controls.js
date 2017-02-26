function sign(x) { // http://stackoverflow.com/questions/7624920/number-sign-in-javascript
  return typeof x === 'number' ? x ? x < 0 ? -1 : 1 : x === x ? 0 : NaN : NaN;
}

var controls = {

  hammer: undefined,
  hMan: undefined,
  hPan: undefined,
  hPinch: undefined,
  hSwipe: undefined,
  hTap: undefined,
  
  touchMousePrevent: false,
  lastPinch: 1.0,
  touchHasTapped: false,

  setUpEvents: function(canvas) {
    
    function doNothing(e) {
      return false;
    };
    function setTipPoint(e) {
      if (e.button == 0 && physics.readyToStrike && !controls.touchHasTapped) {
        var rect = canvas.getBoundingClientRect();
        var yPlaneIntersect = rayCastPlaneY(e.clientX -
            rect.left, e.clientY - rect.top);
        if (yPlaneIntersect != null) {
          arrow.setTip(yPlaneIntersect);
          arrow.setTail(yPlaneIntersect);
          cue.updateMat(arrow.tail_angle, arrow.current_mag);
          arrow.isDragging = true;
          cue.isVisible = true;
        }
      }
    };
    function setTailPoint(e) {
      if (e.button == 0 && arrow.isDragging) {
        var rect = canvas.getBoundingClientRect();
        var yPlaneIntersect = rayCastPlaneY(e.clientX -
          rect.left, e.clientY - rect.top);
        if (yPlaneIntersect != null) {
          arrow.isDragging = false;
          arrow.setTail(yPlaneIntersect);
          cue.updateMat(arrow.tail_angle, arrow.current_mag);
          physics.strikeCueBall();
          cue.startStrikeAnimation();
        }
      }
    };
    function pan(e) {
      if (e.buttons & 2) { // if right click held
        camera.rotateTheta(-0.005 * e.movementX);
        camera.rotatePhi(-0.005 * e.movementY);
      }
      if (e.buttons & 1) { // if left click held
        if (arrow.isDragging) {
          var rect = canvas.getBoundingClientRect();
          var yPlaneIntersect = rayCastPlaneY(e.clientX -
            rect.left, e.clientY - rect.top);
          if (yPlaneIntersect != null) {
            arrow.setTail(yPlaneIntersect);
            cue.updateMat(arrow.tail_angle, arrow.current_mag);
          }
        }
      } else { // if left click not held
        if (arrow.isDragging) {
          arrow.isDragging = false;
          cue.isVisible = false;
        }
      }
      // prevent touch move events from being triggered redundantly
      controls.touchMousePrevent = true; 
    };
    function zoom(e) {
      camera.applyZoom(0.25 * sign(e.deltaY));
      return false;
    };
    function renewTime(e) {
      physics.oldTime = performance.now();
    };

    window.onfocus = renewTime; 
    canvas.onmousedown = setTipPoint;
    canvas.onmouseup = setTailPoint;
    canvas.oncontextmenu = doNothing;
    canvas.onmousemove = pan; 
    canvas.onwheel = zoom;


    // TOUCH CONTROLS

    this.hMan = new Hammer.Manager(canvas);
    this.hPan = new Hammer.Pan('pan', 1, 10);
    this.hPinch = new Hammer.Pinch();
    this.hTap = new Hammer.Tap({ event:'singletap' })
    
    this.hMan.add(this.hPan);
    this.hMan.add(this.hPinch);
    this.hMan.add(this.hTap);
    
    function touchPanStart(e) {
      if (controls.touchHasTapped && physics.readyToStrike) {
        var rect = canvas.getBoundingClientRect();
        var yPlaneIntersect = rayCastPlaneY(e.center.x -
            rect.left, e.center.y - rect.top);
        if (yPlaneIntersect != null) {
          arrow.setTip(yPlaneIntersect);
          arrow.setTail(yPlaneIntersect);
          cue.updateMat(arrow.tail_angle, arrow.current_mag);
          arrow.isDragging = true;
          cue.isVisible = true;
        }
      }
      controls.touchHasTapped = false;
    }
    function touchPanMove(e) {
      // prevent touch move events from triggering mouse move events
      e.preventDefault();
      // prevent mouse move events from triggering touch move events
      if (controls.touchMousePrevent == true) {
        controls.touchMousePrevent = false;
        return false;
      }  
      if (arrow.isDragging) {
        var rect = canvas.getBoundingClientRect();
        var yPlaneIntersect = rayCastPlaneY(e.center.x -
          rect.left, e.center.y - rect.top);
        if (yPlaneIntersect != null) {
          arrow.setTail(yPlaneIntersect);
          cue.updateMat(arrow.tail_angle, arrow.current_mag);
        }
      } else {
        camera.rotateTheta(/*sign(e.deltaX) **/ -0.000000001 * e.deltaX * e.deltaX * e.deltaX);
        camera.rotatePhi(/*sign(e.deltaY) **/ -0.000000001 * e.deltaY * e.deltaY * e.deltaY);
      }
    }
    function touchPanStop(e) {
      if (arrow.isDragging) {
        var rect = canvas.getBoundingClientRect();
        var yPlaneIntersect = rayCastPlaneY(e.center.x -
          rect.left, e.center.y - rect.top);
        if (yPlaneIntersect != null) {
          arrow.isDragging = false;
          arrow.setTail(yPlaneIntersect);
          cue.updateMat(arrow.tail_angle, arrow.current_mag);
          physics.strikeCueBall();
          cue.startStrikeAnimation();
        }
      }
    }
    function touchPanCancel(e) {
      if (arrow.isDragging) {
        arrow.isDragging = false;
        cue.isVisible = false;
      }
    }
    function touchPinchStart(e) {
      controls.lastPinch = 1.0;
    }
    function touchPinchMove(e) {
      camera.applyZoom((controls.lastPinch - e.scale) * 2.0);
      controls.lastPinch = e.scale;
    }
    function touchTap(e) {
      controls.touchHasTapped = true;
    }

    this.hMan.on('panstart', touchPanStart);
    this.hMan.on('panmove', touchPanMove);
    this.hMan.on('panend', touchPanStop);
    this.hMan.on('pancancel', touchPanCancel);
    this.hMan.on('pinchmove', touchPinchMove);
    this.hMan.on('pinchstart', touchPinchStart);
    this.hMan.on('singletap', touchTap);
  }
};
