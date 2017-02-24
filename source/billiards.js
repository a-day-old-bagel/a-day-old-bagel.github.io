/**------------------------------------------------------------
// Initialization
//-----------------------------------------------------------*/
window.onload = function init() {

  var desiredHeight = document.body.clientHeight * 0.95;
  var desiredWidth = document.body.clientWidth * 0.995;
  console.log(document.body.clientHeight);
  console.log(desiredHeight);
  $("#gl-canvas").width(desiredWidth);
  $("#gl-canvas").height(desiredHeight);
  $("#instrBox").width(desiredWidth);

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
