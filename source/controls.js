function sign(x) { // http://stackoverflow.com/questions/7624920/number-sign-in-javascript
  return typeof x === 'number' ? x ? x < 0 ? -1 : 1 : x === x ? 0 : NaN : NaN;
}

var controls = {
  setUpEvents: function(canvas) {

    function doNothing(e) {
      // just ditch that ratty context menu
      return false;
    };
    function setTipPoint(e) {
      if (e.button == 0 && physics.readyToStrike) {
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

//    canvas.ontouchstart = setTipPoint;
//    canvas.ontouchend = setTailPoint;
  }
};
