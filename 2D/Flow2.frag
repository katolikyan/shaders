#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

void main(){
  vec2 uv = 3.0 * gl_FragCoord.xy / u_resolution;
  uv.x *= u_resolution.x / u_resolution.y;

  for (int i = 1; i < 10; i++)
  {
    float n = float(i);
    uv += vec2(2. / n * sin(n * uv.y + u_time), 
                   2. / n * cos(uv.x + u_time * 0.3));
    uv += vec2(2. / n * cos(n * uv.y + u_time), 
                   2. / n * sin(uv.x + u_time * 0.3));
  }

  vec3 color = vec3(0.5 * sin(uv.x), 
                    0.5 * sin(uv.x) + 0.3,
                    0.5 * sin(uv.x) + 0.4);
  gl_FragColor = vec4(color, 1.);
}