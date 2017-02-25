/**------------------------------------------------------------
// Initialization
//-----------------------------------------------------------*/
window.onload = function init() {

  var desiredHeight = document.body.clientHeight * 0.96;
  var desiredWidth = document.body.clientWidth ;//* 0.991;
  $("#gl-canvas").width(desiredWidth);
  $("#gl-canvas").height(desiredHeight);
  $("#instrBox").width(desiredWidth);

  var canvas = document.getElementById('gl-canvas');
  // These next two lines give canvas correct resolution
  canvas.width = $("#gl-canvas").width();
  canvas.height = $("#gl-canvas").height();

  physics.init();
  graphics.init(canvas);
  controls.setUpEvents(canvas);
  tick();
};

//------------------------------------------------------------
// Game Loop
//------------------------------------------------------------
function tick() {
  requestAnimFrame(tick);
  graphics.render();
  physics.animate();
}

/**------------------------------------------------------------
// Destruction
//-----------------------------------------------------------*/
window.onunload = function destroy() {
  graphics.destroy();
  physics.destroy();
};
