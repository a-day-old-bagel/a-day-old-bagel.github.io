var arrow = {
  mat_model: [mat4()],
  isActive: [true],
  tex_split: vec2(1.0, 1.0),
  tex_which: [0.0],
  yPlane: 0.001,
  isDragging: false,
  vec_tip: vec2(),
  vec_tail: vec2(),
  vec_whack: vec2(),
  tail_angle: 0,
  current_mag: 0,
  max_mag: 0.9,
  recalcMat: function() {
    this.vec_whack = subtract(this.vec_tip, this.vec_tail);
    var magnitude = length(this.vec_whack);
    if (magnitude > this.max_mag) {
      var scalar = this.max_mag / magnitude;
      this.vec_whack = vec2(this.vec_whack[0] * scalar,
        this.vec_whack[1] * scalar);
      magnitude = this.max_mag;
    }
    this.tail_angle = Math.atan2(-this.vec_whack[0], -this.vec_whack[1]);
    this.tail_angle *= -(180 / Math.PI);
    this.mat_model[0] = mat4();
    this.mat_model[0] = mult(this.mat_model[0], translate(this.vec_tip[0],
                              0.0, this.vec_tip[1]));
    this.mat_model[0] = mult(this.mat_model[0], rotateY(this.tail_angle));
    this.mat_model[0] = mult(this.mat_model[0], scalem(1, 1, magnitude));
    this.current_mag = magnitude * -0.2;
    //return magnitude * -0.2;
    //cue.updateMat(this.tail_angle, magnitude * -0.2);
  },
  setTip: function(vec) {
    this.vec_tip = vec;
    this.recalcMat();
  },
  setTail: function(vec) {
    this.vec_tail = vec;
    this.recalcMat();
    //return this.recalcMat();
  },
  vertices:
  [0.0, 0.001, 0.0,
  -0.04, 0.001, 0.25,
  0.04, 0.001, 0.25,
  -0.01, 0.001, 0.25,
  -0.01, 0.001, 1.0,
  0.01, 0.001, 1.0,
  -0.01, 0.001, 0.25,
  0.01, 0.001, 1.0,
  0.01, 0.001, 0.25],
  uvs:
  [0.9, 0.9,
  0.9, 0.9,
  0.9, 0.9,
  0.9, 0.9,
  0.9, 0.9,
  0.9, 0.9,
  0.9, 0.9,
  0.9, 0.9,
  0.9, 0.9],
  normals:
  [0.0, 0.5, -0.5,
  -0.5, 0.5, 0.5,
  0.5, 0.5, 0.5,
  -0.5, 1.0, 0.0,
  -0.5, 0.5, 0.15,
  0.5, 0.5, 0.15,
  -0.5, 1.0, 0.0,
  0.5, 0.5, 0.15,
  0.5, 1.0, 0.0]
};
