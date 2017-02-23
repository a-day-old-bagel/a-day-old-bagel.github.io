/**------------------------------------------------------------
// Initialization
//-----------------------------------------------------------*/
window.onload = function init() {

  $("#gl-canvas").width($("#gl-canvas").width() * 1.0);
  $("#gl-canvas").height($("#gl-canvas").height() * 0.9);
  var canvas = document.getElementById('gl-canvas');
  canvas.width = $("#gl-canvas").width();
  canvas.height = $("#gl-canvas").height();

  physics.init();
  graphics.init(canvas);  // CHANGES CANVAS
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
