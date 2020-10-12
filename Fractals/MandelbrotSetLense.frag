#ifdef GL_ES
precision mediump float;
#endif

#define ITER 100.
#define PI 3.14159265359
#define FMAX 65535.
#define product(a, b) vec2(a.x*b.x-a.y*b.y, a.x*b.y+a.y*b.x)

uniform vec2 u_resolution;
uniform float u_time;

float lense(vec2 uv, float r, float s) {
  return smoothstep(r, r - s, length(uv));
}

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
  float m;

  // lense
  vec2 uvL = vec2(uv.x + 0.76 + sin(u_time / 5.) / 25., 
                  uv.y - 0.15 + cos(u_time / 5.) / 25.);
  if (length(uvL) < 0.3)
  {
    vec2 uvM = vec2((uv.x / 25. - 1.21), (uv.y / 25. + 0.1));
    float l = lense(uvL, 0.3, 0.015);
    float l2 = lense(uvL, 0.41, 0.2);
    m = mandelbrot(uvM);
    m = mandelbrot(uvM) * l2 + (1. - l) / 2.;
    //float m2 = mandelbrot(vec2((uv.x / 10. - 1.17), (uv.y / 10. + 0.09)));
    //m = mix(m * l, m2 * l, sin(u_time) / 2. + .5);
  }
  else
    m = mandelbrot(uv);

  vec3 color = vec3(1. - m);
  color = mix(color, vec3(0.3, 0.4, 0.7), 0.3);
  gl_FragColor = vec4(color, 1.);
}