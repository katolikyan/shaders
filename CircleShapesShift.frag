#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float circleShapeShift(vec2 position, float radius, vec2 shift){
  return smoothstep(radius, radius + 0.005, length(
                    position - vec2(
                    shift.x * u_resolution.x / u_resolution.y, shift.y) ));
}

void main(){
  vec2 position = gl_FragCoord.xy / u_resolution;
  position.x *= u_resolution.x / u_resolution.y;
  vec3 color = vec3(0.0);

  // static circles;
  //float circle = circleShapeShift(position, 0.25, vec2(0.5, 0.6));
  //float circle2 = circleShapeShift(position, 0.2, vec2(0.4, 0.4));
  //float circle3 = circleShapeShift(position, 0.35, vec2(0.6, 0.4));

  float circle = circleShapeShift(
                 position, (2. + sin(u_time)) / 10., vec2(0.5, 0.6));
  float circle2 = circleShapeShift(
                  position, (2. + sin(u_time + .5)) / 15., vec2(0.4, 0.4));
  float circle3 = circleShapeShift(
                  position, (2. + sin(u_time + 1.)) / 9., vec2(0.6, 0.4));

  //color = vec3(1. - circle, 1. - circle2, 1. - circle3);
  color = vec3(circle, circle2, circle3);

  gl_FragColor = vec4(color, 1.);
}