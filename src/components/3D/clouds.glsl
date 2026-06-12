// Copyright Inigo Quilez, 2013 - https://iquilezles.org/
// Adapted for Three.js / React Three Fiber.

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform sampler2D uNoiseTexture;
uniform sampler2D uDitherTexture;

#define NOISE_METHOD 1
#define TURBULENCE 0

mat3 setCamera(in vec3 ro, in vec3 ta, float cr) {
  vec3 cw = normalize(ta - ro);
  vec3 cp = vec3(sin(cr), cos(cr), 0.0);
  vec3 cu = normalize(cross(cw, cp));
  vec3 cv = normalize(cross(cu, cw));
  return mat3(cu, cv, cw);
}

float noise(in vec3 x) {
#if TURBULENCE == 1
  x *= 0.5;
#endif

  vec3 p = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);

#if NOISE_METHOD == 1
  vec2 uv = (p.xy + vec2(37.0, 239.0) * p.z) + f.xy;
  vec2 rg = textureLod(uNoiseTexture, (uv + 0.5) / 256.0, 0.0).yx;
  float n = mix(rg.x, rg.y, f.z) * 2.0 - 1.0;
#endif

#if TURBULENCE == 0
  return n;
#else
  return 2.0 * abs(n) - 1.0;
#endif
}

float map5(in vec3 p) {
  vec3 q = p - vec3(0.0, 0.1, 1.0) * uTime;
  float f;
  float a = 0.5;
  f = a * noise(q);
  q = q * 2.02;
  a = a * 0.5;
  f += a * noise(q);
  q = q * 2.03;
  a = a * 0.5;
  f += a * noise(q);
  q = q * 2.01;
  a = a * 0.5;
  f += a * noise(q);
  q = q * 2.02;
  a = a * 0.5;
  f += a * noise(q);
  return clamp(1.5 - p.y - 2.0 + 1.75 * f, 0.0, 1.0);
}

float map4(in vec3 p) {
  vec3 q = p - vec3(0.0, 0.1, 1.0) * uTime;
  float f;
  float a = 0.5;
  f = a * noise(q);
  q = q * 2.02;
  a = a * 0.5;
  f += a * noise(q);
  q = q * 2.03;
  a = a * 0.5;
  f += a * noise(q);
  q = q * 2.01;
  a = a * 0.5;
  f += a * noise(q);
  return clamp(1.5 - p.y - 2.0 + 1.75 * f, 0.0, 1.0);
}

float map3(in vec3 p) {
  vec3 q = p - vec3(0.0, 0.1, 1.0) * uTime;
  float f;
  float a = 0.5;
  f = a * noise(q);
  q = q * 2.02;
  a = a * 0.5;
  f += a * noise(q);
  q = q * 2.03;
  a = a * 0.5;
  f += a * noise(q);
  return clamp(1.5 - p.y - 2.0 + 1.75 * f, 0.0, 1.0);
}

float map2(in vec3 p) {
  vec3 q = p - vec3(0.0, 0.1, 1.0) * uTime;
  float f;
  float a = 0.5;
  f = a * noise(q);
  q = q * 2.02;
  a = a * 0.5;
  f += a * noise(q);
  return clamp(1.5 - p.y - 2.0 + 1.75 * f, 0.0, 1.0);
}

const vec3 sundir = vec3(-0.7071, 0.0, -0.7071);

#define MARCH(STEPS, MAPLOD) \
  for (int i = 0; i < STEPS; i++) { \
    vec3 pos = ro + t * rd; \
    if (pos.y < -3.0 || pos.y > 2.0 || sum.a > 0.99) break; \
    float den = MAPLOD(pos); \
    if (den > 0.015) { \
      float dif = clamp((den - MAPLOD(pos + 0.3 * sundir)) / 0.6, 0.0, 1.0); \
      vec3 lin = vec3(1.0, 0.6, 0.3) * dif + vec3(0.91, 0.98, 1.05); \
      vec4 col = vec4(mix(vec3(1.0, 0.95, 0.8), vec3(0.25, 0.3, 0.35), den), den); \
      col.xyz *= lin; \
      col.xyz = mix(col.xyz, bgcol, 1.0 - exp(-0.003 * t * t)); \
      col.w *= 0.4; \
      col.rgb *= col.a; \
      sum += col * (1.0 - sum.a); \
    } \
    t += max(0.03, 0.025 * t); \
  }

vec4 raymarch(in vec3 ro, in vec3 rd, in vec3 bgcol, in ivec2 px) {
  vec4 sum = vec4(0.0);
  float t = 0.05 * texelFetch(uDitherTexture, px & 255, 0).x;
  MARCH(40, map5);
  MARCH(40, map4);
  MARCH(30, map3);
  MARCH(30, map2);
  return clamp(sum, 0.0, 1.0);
}

vec4 render(in vec3 ro, in vec3 rd, in ivec2 px) {
  float sun = clamp(dot(sundir, rd), 0.0, 1.0);
  vec3 col = vec3(0.6, 0.71, 0.75) - rd.y * 0.2 * vec3(1.0, 0.5, 1.0) + 0.15 * 0.5;
  col += 0.2 * vec3(1.0, 0.6, 0.1) * pow(sun, 8.0);

  vec4 res = raymarch(ro, rd, col, px);
  col = col * (1.0 - res.w) + res.xyz;
  col += vec3(0.2, 0.08, 0.04) * pow(sun, 3.0);

  return vec4(col, 1.0);
}

void main() {
  vec2 fragCoord = gl_FragCoord.xy;
  vec2 p = (2.0 * fragCoord - uResolution.xy) / uResolution.y;
  vec2 m = uMouse / uResolution;

  vec3 ro = 4.0 * normalize(vec3(sin(3.0 * m.x), 0.8 * m.y, cos(3.0 * m.x))) - vec3(0.0, 0.1, 0.0);
  vec3 ta = vec3(0.0, -1.0, 0.0);
  mat3 ca = setCamera(ro, ta, 0.07 * cos(0.25 * uTime));
  vec3 rd = ca * normalize(vec3(p.xy, 1.5));

  gl_FragColor = render(ro, rd, ivec2(fragCoord - 0.5));
}
