// Adapted for Three.js / React Three Fiber.

uniform float uTime;
uniform vec2 uResolution;

#define SPEED .5
#define FOV 1.5

#define MAX_STEPS 100
#define EPS .00001
#define RENDER_DIST 10.
#define AO_SAMPLES 5.
#define AO_RANGE 10.

#define PI 3.14159265359

float _twist = 0.;

float hash(vec3 uv) {
  float f = fract(sin(dot(uv ,vec3(.009123898,.00231233, .00532234)))* 111111.5452313);
    return f;
}

float noise(vec3 uv) {
    vec3 fuv = floor(uv);
    vec4 cell0 = vec4(
        hash(fuv + vec3(0, 0, 0)),
        hash(fuv + vec3(0, 1, 0)),
        hash(fuv + vec3(1, 0, 0)),
        hash(fuv + vec3(1, 1, 0))
    );
    vec2 axis0 = mix(cell0.xz, cell0.yw, fract(uv.y));
    float val0 = mix(axis0.x, axis0.y, fract(uv.x));
    vec4 cell1 = vec4(
        hash(fuv + vec3(0, 0, 1)),
        hash(fuv + vec3(0, 1, 1)),
        hash(fuv + vec3(1, 0, 1)),
        hash(fuv + vec3(1, 1, 1))
    );
    vec2 axis1 = mix(cell1.xz, cell1.yw, fract(uv.y));
    float val1 = mix(axis1.x, axis1.y, fract(uv.x));
    return mix(val0, val1, fract(uv.z));
}

float fbm(vec3 uv) {
    float f = 0.;
    float r = 1.;
    for (int i = 0; i < 5; ++i) {
        f += noise((uv + 10.) * r) / (r *= 2.);
    }
    return f / (1. - 1. / r);
}

void tRotate(inout vec2 p, float angel) {
    float s = sin(angel), c = cos(angel);
	p *= mat2(c, -s, s, c);
}

void tTwist(inout vec3 p, float a) {
    tRotate(p.xy, p.z * a);
}

float tRepeat1(inout float p, float r) {
    float id = floor((p + r * .5) / r);
    p = mod(p + r * .5, r) - r * .5;
    return id;
}

vec2 tRepeat2(inout vec2 p, vec2 r) {
    vec2 id = floor((p + r * .5) / r);
    p = mod(p + r * .5, r) - r * .5;
    return id;
}

float sdRect(vec2 p, vec2 r) {
    p = abs(p) - r;
	return min(max(p.x, p.y), 0.) + length(max(p, 0.));
}

float sdCircle(vec2 p, float r) {
    return length(p) - r;
}

float opU(float a, float b) {
    return min(a, b);
}

float opS(float a, float b) {
    return max(a, -b);
}

float map(vec3 p)
{
    tTwist(p, _twist);
    tRepeat2(p.xz, vec2(.7, 1.));
    p.x = abs(p.x);
    p.y += .5;
    float d = abs(p.z) - .15;
    float w = opU(sdCircle(p.xy - vec2(0, .75), .25), sdRect(p.xy - vec2(0, .375), vec2(.25, .375)));
    d = opS(d, w);
    d = opS(d, sdRect(p.xy - vec2(0,.35), vec2(.45,.3)));
    d = opU(d, sdCircle(p.xz - vec2(.35, 0), .075));
    p.z = abs(p.z);
    d = opS(d, sdRect(p.yz - vec2(.6, .5), vec2(.6,.4)));
    d = opU(d, -abs(p.y - .5) + .8);
    return d;
}

float trace(vec3 ro, vec3 rd, float maxDist, out float steps) {
    float total = 0.;
    steps = 0.;
    
    for (int i = 0; i < MAX_STEPS; ++i) {
        ++steps;
        float d = map(ro + rd * total);
        total += d;
        if (d < EPS || maxDist < total) break;
    }
    
    return total;
}

vec3 getNormal(vec3 p) {
    vec2 e = vec2(.0001, 0);
    return normalize(vec3(
        map(p + e.xyy) - map(p - e.xyy),
        map(p + e.yxy) - map(p - e.yxy),
        map(p + e.yyx) - map(p - e.yyx)
	));
}

float calculateAO(vec3 p, vec3 n) {
    float r = 0., w = 1., d;
    
    for (float i = 1.; i <= AO_SAMPLES; i++){
        d = i / AO_SAMPLES / AO_RANGE;
        r += w * (d - map(p + n * d));
        w *= .5;
    }
    
    return 1.-saturate(r * AO_RANGE);
}

bool isWall(vec3 p) {
    p.x += .35;
    tRepeat2(p.xz, vec2(.7, 1));
    return .375 < abs(p.y + .15) + length(p.xz);
}

vec3 sampleTexture(vec3 p) {
    vec3 t;
    tTwist(p, _twist);
    bool wall = isWall(p);
    t = fbm((p + (wall ? 0. : .1 + .9 * fbm(p * 5.))) * vec3(5., 20., 5.)) * vec3(1., .7, .4) * .75
        + fbm(p * vec3(2., 10., 2.)) * vec3(1., .8, .5) * .25;
    if (wall) t = mix(t, vec3(1), .5);
    return saturate(t);
}

vec4 render(vec2 fragCoord) {
	vec2 uv = fragCoord / uResolution.xy * 2. - 1.;
    uv.x *= uResolution.x / uResolution.y;
    
    float time = uTime * SPEED;
    _twist = sin(time) * .4;
    
    vec3 ro = vec3(sin(time * PI / 2. + 1.) * 1., 0, time);
    vec3 rd = normalize(vec3(uv, FOV));
    
    time += 2.;
    vec3 light = vec3(sin(time * PI / 2. + 1.) * 1., 0, time);
    time -= 2.;
    
    tRotate(rd.xz, -cos(time * PI / 2. + 1.) * .5);
    tRotate(ro.xy, -ro.z * _twist);
    tRotate(light.xy, -light.z * _twist);
    tRotate(rd.xy, -ro.z * _twist);
    
    float steps, dist = trace(ro, rd, RENDER_DIST, steps); 
    vec3 p = ro + rd * dist;
    vec3 normal = getNormal(p);
    vec3 l = normalize(light - p);
    
    vec3 shadowStart = p + normal * EPS * 10.;
    float shadowDistance = distance(shadowStart,light);
    float shadowSteps, shadow = float(trace(shadowStart, l, shadowDistance, shadowSteps) > shadowDistance);
    shadow *= 1. - sqrt(shadowSteps / float(MAX_STEPS));
    
    float ambient = .25;
    float diffuse = max(0., dot(l, normal));
    float specular = pow(max(0., dot(reflect(-l, normal), -rd)), 8.);
    float ao = calculateAO(p, normal);
    
    vec4 fragColor;
	fragColor.rgb = (ao * sampleTexture(p)) * (ambient + (specular + diffuse) * shadow);
    fragColor *= sqrt(steps / float(MAX_STEPS));
    fragColor = mix(fragColor, vec4(.9, .8, .7, 1.), saturate(dist * dist * .03));
    fragColor = pow(fragColor, vec4(1. / 2.2));
    fragColor.a = 1. - dist / 10.;
    return fragColor;
}

void main() {
    gl_FragColor = render(gl_FragCoord.xy);
}
