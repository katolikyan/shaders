#ifdef GL_ES
precision mediump float;
#endif

#define MAX_STEPS 100
#define MIN_DIST 0.01
#define MAX_DIST 100.

uniform vec2 u_resolution;
uniform float u_time;

float getDist(vec3 p) {
  vec3 pl = vec3(0., 0., 0.);
  vec4 sp = vec4(0, 1, 6, 1);
  float dPl = p.y - pl.y;
  float dSp = length(sp.xyz - p) - sp.w;
  return min(dPl, dSp);
}

float rayMarch(vec3 ro, vec3 rd) {
  float dO = 0.;
  for (int i = 0; i < MAX_STEPS; i++)
  {
    vec3 p = ro + dO * rd;
    float dS = getDist(p);
    dO += dS;
    if (dS < MIN_DIST || dO > MAX_DIST)
      break;
  }
  return dO;
}

vec3 getNormal(vec3 p) {
  float d = getDist(p);
  vec2 e = vec2(.01, 0.);
  vec3 n = vec3(d) - vec3(getDist(p - e.xyy), getDist(p - e.yxy), getDist(p - e.yyx));
  return normalize(n);
}

float getLight(vec3 p) {
  vec3 l = vec3(0., 5., 6.);
  l.xz += vec2(sin(u_time), cos(u_time)) * 2.;
  vec3 ld = normalize((l - p));
  vec3 n = getNormal(p);
  float dif = clamp(dot(n, ld), 0., 1.);
  float d = rayMarch(p + n * .02, ld);
  return d < length(l - p) ? dif * .1 : dif;
}

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / u_resolution.y;

  vec3 ro = vec3(0., 1., 0.);
  vec3 rd = normalize(vec3(uv.x, uv.y, 1.));
  float d = rayMarch(ro, rd);
  vec3 p = ro + rd * d;
  float dif = getLight(p);

  vec3 color = vec3(dif);
  gl_FragColor = vec4(color, 1.);
}