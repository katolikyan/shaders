#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float circleshape(vec2 position, float radius){
  return step(radius, length(position - vec2(0.5)));
}

mat2 scale(float x, float y){
  return mat2(x, 0., 0., y);
}

void main(){
  vec2 coords = gl_FragCoord.xy / u_resolution;
  //coords -= 0.5;
  vec3 color = vec3(0.0);
  vec2 translate = vec2(sin(u_time * 2.), cos(u_time * 2.)) * .3;

  //coords = scale(2., 2.) * coords;

  color = vec3(circleshape(coords + translate, 0.1));

  gl_FragColor = vec4(color, 1.0);
}