#ifdef GL_ES
precision mediump float;
#endif

#define ITER 100.
#define PI 3.14159265359
#define FMAX 65536.
#define product(a, b) vec2(a.x*b.x-a.y*b.y, a.x*b.y+a.y*b.x)
#define conjugate(a) vec2(a.x,-a.y)

uniform vec2 u_resolution;
uniform float u_time;

float remap01(float a, float b, float t){
  return (t - a) / (b - a);
}

float remap(float a, float b, float c, float d, float t) {
  return remap01(a, b, t) * (d - c) + c;
}

float mandelbrot(vec2 uv, float iter) {
  vec2 z = vec2(0., 0.); 

  for (float i = 0.; i < ITER; i += 1.)
  {
    z = product(z, z) + uv;
    if (z.y > 4.)
      return i / iter;
    if (i >= iter)
      return 1.;
  }
  return 1.;
}

float look01(vec2 uv) {
  uv -= 0.5;
  uv.x -= .3;
  uv.y -= 81.;
  uv *= .01;
  return mandelbrot(uv, (sin(u_time / 3.) + 1.) * 16.);
}

float look02(vec2 uv) {
  uv -= 0.5;
  uv.x -= 3.13;
  uv.y -= 745.06;
  uv *= .001;
  return mandelbrot(uv, (cos(u_time / 3. - 2.) + 1.) * 55.);
  //return mandelbrot(uv, (cos(u_time / 3. - PI / 2.) + 1.7) * 55.);
}

/*
float look03(vec2 uv) {
  uv -= 0.5;
  uv /= pow(u_time + 3., 8.) / 60000.;
  uv.y -= -1.;
  return mandelbrot(uv, (sin(u_time / 3.) + 1.) * 16.);
}
*/

void main(){
  vec2 uv = gl_FragCoord.xy / u_resolution;
  uv.x *= u_resolution.x / u_resolution.y;

  vec3 color = vec3(0.);
  float m = look02(uv);

  if (m < 1.)
    color = vec3(sin(m * 2. * PI - PI/2.) + 1., 
                 sin(m * 2. * PI) + 1., 
                 sin(m * 2. * PI - PI) + 1.);
  color = mix(color, vec3(0.3, 0.3, 0.6), 0.4);

  gl_FragColor = vec4(color, 1.);
}