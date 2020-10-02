#ifdef GL_ES
precision mediump float;
#endif

#define ITER 500.
#define FMAX 65536.
#define product(a, b) vec2(a.x*b.x-a.y*b.y, a.x*b.y+a.y*b.x)
#define conjugate(a) vec2(a.x,-a.y)
#define divide(a, b) vec2(((a.x*b.x+a.y*b.y)/(b.x*b.x+b.y*b.y)),((a.y*b.x-a.x*b.y)/(b.x*b.x+b.y*b.y)))

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
    //if (length(z) > FMAX)
    //if (z.y > FMAX)
    //  return i / ITER;
    if (z.y > FMAX)
      return i / iter;
    if (i >= iter)
      return 1.;
  }
  return 1.;
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_resolution;
  uv.x *= u_resolution.x / u_resolution.y;
  uv -= 0.5;
  uv *= pow((cos(u_time / 3.) + 1.), 5.);
  uv.y -= -1.;
  /*
  uv -= 0.5;
  uv.x -= 3.;
  uv.y -= 743.25;
  uv *= .001;
  */
  /*
  uv -= 0.5;
  uv.x -= .3;
  uv.y -= 81.;
  uv *= .01;
  uv.x *= u_resolution.x / u_resolution.y;
  */

  vec3 color = vec3(1.0, 0.0, 0.051);
  //float m = mandelbrot(uv, (sin(u_time / 3.) + 1.) * 16.);
  float m = mandelbrot(uv, 2.1 * 16.);
  //float m = mandelbrot(uv, 55.);
  //m *= 3.;
  if (m < 0.1666) color = vec3(1.0, remap(0., 0.1666, 0., 1., m), 0.0);
  else if (m < 0.1666 * 2.) color = vec3(1. - remap(0.1666, 0.1666 * 2., 0., 1., m), 1.0, 0.0);
  else if (m < 0.1666 * 3.) color = vec3(0., 1., remap(0.1666 * 2., 0.1666 * 3., 0., 1., m));
  else if (m < 0.1666 * 4.) color = vec3(0., 1. - remap(0.1666 * 3., 0.1666 * 4., 0., 1., m), 1.0);
  else if (m < 0.1666 * 5.) color = vec3(remap(0.1666 * 4., 0.1666 * 5., 0., 1., m), 0.0, 1.0);
  else if (m < 0.1666 * 6.) color = vec3(1., 0.0, 1. - remap(0.1666 * 5., 0.1666 * 6., 0., 1., m));
  else color = vec3(0.);
  //color = vec3(remap(0., 1., 0., .33, m), remap(0., 1., .33, .66, m), remap(0., 1., .66, 1., m));
  //if (m < 0.3) color = vec3(m, 0., 0.);
  //else if (m < 0.6) color = vec3(1., m * 1.8, 0.);
  //else color = vec3(1., 1., m);
  //color *= m;

  //color = mix(color, vec3(0.3, 0.3, 0.6), 0.3);

  gl_FragColor = vec4(color, 1.);
}