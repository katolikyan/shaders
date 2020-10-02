#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

void main(){
  vec2 coords = 6.0 * gl_FragCoord.xy / u_resolution;

  for (int i = 1; i < 8; i++)
  {
    float n = float(i);
    coords += vec2(1.7 / n * sin(n * coords.y + u_time), 
                   1.9 / n * sin(coords.x + u_time * 0.3));
  }

  vec3 color = vec3(0.5 * sin(coords.x) + 0.5, 
                    0.07,
                    sin(coords.x + coords.y));
  /*
    vec3 color = vec3(0.5 * sin(coords.x), 
                    0.5 * sin(coords.x) + 0.3,
                    0.5 * sin(coords.x) + 0.4);
  */
  gl_FragColor = vec4(color, 1.);
}