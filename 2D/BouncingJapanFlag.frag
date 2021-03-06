#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float circleshape(vec2 position, float radius){
  return smoothstep(radius, radius + 0.005, length(position));
}

void main(){
  vec2 position = gl_FragCoord.xy / u_resolution;
  position -= .5;
  position.x *= u_resolution.x / u_resolution.y;
  vec3 color = vec3(.0);

  float circle = circleshape(position, abs(sin(u_time * 3.)) / 4.);

  color = vec3(1., circle, circle);

  gl_FragColor = vec4(color, 1.);
}