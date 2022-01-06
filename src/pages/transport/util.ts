//@ts-nocheck
/* eslint-disable */
function $i(t) {
  return document.getElementById(t);
}
function $r(t, r) {
  document.getElementById(t).removeChild(document.getElementById(r));
}
function $t(t) {
  return document.getElementsByTagName(t);
}
function $c(t) {
  return String.fromCharCode(t);
}
function $h(t) {
  return ('0' + Math.max(0, Math.min(255, Math.round(t))).toString(16)).slice(-2);
}
function _i(t, r) {
  $t('div')[t].innerHTML += r;
}
function _h(t) {
  return hires ? Math.round(t / 2) : t;
}
function get_screen_size() {
  const t = document.documentElement.clientWidth,
    r = document.documentElement.clientHeight;
  return [t, r];
}
function init(r) {
  for (let t = 0; n > t; t++)
    (star[t] = new Array(5)),
      (star[t][0] = Math.random() * w * 2 - 2 * x),
      (star[t][1] = Math.random() * h * 2 - 2 * y),
      (star[t][2] = Math.round(Math.random() * z)),
      (star[t][3] = 0),
      (star[t][4] = 0);
  (r.style.position = 'absolute'),
    (r.width = w),
    (r.height = h),
    (context = r.getContext('2d')),
    (context.fillStyle = 'rgb(0,0,0)'),
    (context.strokeStyle = 'rgb(255,255,255)');
}
function anim() {
  (mouse_x = cursor_x - x), (mouse_y = cursor_y - y), context.fillRect(0, 0, w, h);
  for (let t = 0; n > t; t++)
    (test = !0),
      (star_x_save = star[t][3]),
      (star_y_save = star[t][4]),
      (star[t][0] += mouse_x >> 4),
      star[t][0] > x << 1 && ((star[t][0] -= w << 1), (test = !1)),
      star[t][0] < -x << 1 && ((star[t][0] += w << 1), (test = !1)),
      (star[t][1] += mouse_y >> 4),
      star[t][1] > y << 1 && ((star[t][1] -= h << 1), (test = !1)),
      star[t][1] < -y << 1 && ((star[t][1] += h << 1), (test = !1)),
      (star[t][2] -= star_speed),
      star[t][2] > z && ((star[t][2] -= z), (test = !1)),
      star[t][2] < 0 && ((star[t][2] += z), (test = !1)),
      (star[t][3] = x + (star[t][0] / star[t][2]) * star_ratio),
      (star[t][4] = y + (star[t][1] / star[t][2]) * star_ratio),
      star_x_save > 0 &&
        w > star_x_save &&
        star_y_save > 0 &&
        h > star_y_save &&
        test &&
        ((context.lineWidth = 2 * (1 - star_color_ratio * star[t][2])),
        context.beginPath(),
        context.moveTo(star_x_save, star_y_save),
        context.lineTo(star[t][3], star[t][4]),
        context.stroke(),
        context.closePath());
  timeout = setTimeout(anim, fps);
}
const url = document.location.href;
let flag,
  test,
  n,
  w,
  h,
  x,
  y,
  z,
  star_color_ratio,
  star_x_save,
  star_y_save,
  star_ratio,
  star_speed,
  star_speed_save,
  star,
  color,
  opacity,
  cursor_x,
  cursor_y,
  mouse_x,
  mouse_y,
  canvas_x,
  canvas_y,
  canvas_w,
  canvas_h,
  context,
  key,
  ctrl,
  timeout,
  fps;
export function start1(dom) {
  (flag = !0),
    (test = !0),
    (n = parseInt(
      -1 != url.indexOf('n=')
        ? url.substring(
            url.indexOf('n=') + 2,
            -1 != url.substring(url.indexOf('n=') + 2, url.length).indexOf('&')
              ? url.indexOf('n=') +
                  2 +
                  url.substring(url.indexOf('n=') + 2, url.length).indexOf('&')
              : url.length,
          )
        : 812,
    )),
    (w = 0),
    (h = 0),
    (x = 0),
    (y = 0),
    (z = 0),
    (star_color_ratio = 0),
    star_x_save,
    star_y_save,
    (star_ratio = 115),
    (star_speed = 2),
    (star_speed_save = 0),
    (star = new Array(n)),
    color,
    (opacity = 0.1),
    (cursor_x = 0),
    (cursor_y = 0),
    (mouse_x = 0),
    (mouse_y = 0),
    (canvas_x = 0),
    (canvas_y = 0),
    (canvas_w = 0),
    (canvas_h = 0),
    context,
    key,
    ctrl,
    timeout,
    (fps = 1);
  resize(dom);
  anim();
}
function resize(r) {
  (w = parseInt(
    -1 != url.indexOf('w=')
      ? url.substring(
          url.indexOf('w=') + 2,
          -1 != url.substring(url.indexOf('w=') + 2, url.length).indexOf('&')
            ? url.indexOf('w=') + 2 + url.substring(url.indexOf('w=') + 2, url.length).indexOf('&')
            : url.length,
        )
      : get_screen_size()[0],
  )),
    (h = parseInt(
      -1 != url.indexOf('h=')
        ? url.substring(
            url.indexOf('h=') + 2,
            -1 != url.substring(url.indexOf('h=') + 2, url.length).indexOf('&')
              ? url.indexOf('h=') +
                  2 +
                  url.substring(url.indexOf('h=') + 2, url.length).indexOf('&')
              : url.length,
          )
        : get_screen_size()[1],
    )),
    (x = Math.round(w / 2)),
    (y = Math.round(h / 2)),
    (z = (w + h) / 2),
    (star_color_ratio = 1 / z),
    (cursor_x = x),
    (cursor_y = y),
    init(r);
}
