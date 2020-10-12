#ifdef GL_ES
precision mediump float;
#endif

#define ITER 100.
#define PI 3.14159265359
#define FMAX 65535.
#define product(a, b) vec2(a.x*b.x-a.y*b.y, a.x*b.y+a.y*b.x)

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

float mandelbrot(vec2 uv) {
  uv *= 1.4;
  uv.x += 0.4;
  for (float i = 0.; i < ITER; i += 1.)
  {
    uv = product(uv, uv) + u_mouse / u_resolution * u_resolution.x/u_resolution.y;
    if (length(uv) > FMAX)
      return i / ITER;
  }
  return 1.;
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_resolution;
  uv.x *= u_resolution.x / u_resolution.y;
  uv -= .5;
  uv *= 2.;
  uv.x -= 1.;
  float m = mandelbrot(uv);

  vec3 color = vec3(1. - m);
  color = mix(color, vec3(1., 1., 1.), 0.14);
  gl_FragColor = vec4(color, 1.);
}