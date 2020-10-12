#ifdef GL_ES
precision mediump float;
#endif

#define ITER 100.
#define PI 3.14159265359
#define FMAX 65535.
#define product(a, b) vec2(a.x*b.x-a.y*b.y, a.x*b.y+a.y*b.x)

uniform vec2 u_resolution;
uniform float u_time;


float mandelbrot(vec2 uv) {
  vec2 z = vec2(0., 0.); 

  for (float i = 0.; i < ITER; i += 1.)
  {
    z = product(z, z) + uv;
    if (length(z) > FMAX)
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

  // zoom 1
  uv /= pow(u_time + 2., 8.) / 60000. + 2.;
  // zoom 2
  //uv /= sin(u_time / 10. - PI / 2.) * 2000.+ 2005.;

  uv.y -= .6975;
  uv.x -= .23;

  float m = mandelbrot(uv);
  vec3 color = vec3(1. - m);

  color = mix(color, vec3(0.3, 0.4, 0.7), 0.3);

  gl_FragColor = vec4(color, 1.);
}