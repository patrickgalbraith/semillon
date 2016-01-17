const easeInOutQuad = function (t, b, c, d) {
  t /= d/2;
  if (t < 1) {
    return c/2*t*t + b
  }
  t--;
  return -c/2 * (t*(t-2) - 1) + b;
};

const _requestAnimationFrame = function() {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function( callback ){ window.setTimeout(callback, 1000 / 60); };
};

// Get document offset for element
const getOffset = function(el) {
  let y = 0, x = 0;

  while (el) {
    x += el.offsetLeft;
    y += el.offsetTop;
    el = el.offsetParent;
  }

  return { x: x, y: y };
}

export function scrollToElement(element, duration = 500, callback = null, easeFn = easeInOutQuad) {
  return scrollTo(getOffset(element).y, duration, callback, easeFn);
}

// https://gist.github.com/james2doyle/5694700
export function scrollTo(to, duration = 500, callback = null, easeFn = easeInOutQuad) {

  // because it's so fucking difficult to detect the scrolling element, just move them all
  function move(amount) {
    document.documentElement.scrollTop = amount;
    document.body.parentNode.scrollTop = amount;
    document.body.scrollTop = amount;
  }

  function position() {
    return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop;
  }

  const start     = position(),
        change    = to - start,
        increment = 20;

  let currentTime = 0;

  var animateScroll = function() {
    // increment the time
    currentTime += increment;

    // find the value with the easing function
    const val = easeFn(currentTime, start, change, duration);

    // move the document.body
    move(val);

    // do the animation unless its over
    if (currentTime < duration) {
      _requestAnimationFrame()(animateScroll);
    } else {
      if (callback && typeof(callback) === 'function') {
        // the animation is done so lets callback
        callback();
      }
    }
  };

  animateScroll();
}