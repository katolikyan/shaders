#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

void main(){
  vec2 coords = gl_FragCoord.xy / u_resolution;
  vec3 color = vec3(0.);

  color += sin(coords.x * cos(u_time / 60.) * 60.) + 
           sin(coords.y * cos(u_time / 60.) * 15.);
  color += cos(coords.y * sin(u_time / 30.) * 90.) + 
           cos(coords.x * sin(u_time / 40.) * 15.);

  gl_FragColor = vec4(color, 1.);
}
