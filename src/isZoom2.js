/**
 * 检测浏览器缩放
 */
export default function isZoom2() {
  const detectZoomFunc = {
    ie: () => {
      return window.screen.deviceXDPI / window.screen.logicalXDPI;
    },
    firefox: () => {
      return window.devicePixelRatio
        ? window.devicePixelRatio
        : n("min--moz-device-pixel-ratio", "", 0, 10, 20, 1e-4);
    },
    opera: () => {
      return window.outerWidth / window.innerWidth;
    },
    chrome: () => {
      if (window.devicePixelRatio) {
        return window.devicePixelRatio;
      }
      const o = window.document;
      const t = o.createElement("div");
      t.innerHTML = "1";
      t.setAttribute(
        "style",
        "font:100px/1em sans-serif-webkit-text-size-adjust:noneposition: absolutetop:-100%"
      );
      o.body.appendChild(t);
      let n = 1e3 / t.clientHeight;
      n = Math.round(100 * n) / 100;
      o.body.removeChild(t);
      return n;
    },
    safari: () => {
      return window.outerWidth / window.innerWidth;
    }
  };

  function round2(number, fractionDigits) {
    return (
      Math.round(number * Math.pow(10, fractionDigits)) /
      Math.pow(10, fractionDigits)
    );
  }

  function n(t, n, i, a, s, c) {
    function l(e, o, i) {
      const a = (e + o) / 2;
      if (i <= 0 || o - e < c) return a;
      const s = "(" + t + ":" + a + n + ")";
      return r(s).matches ? l(a, o, i - 1) : l(e, a, i - 1);
    }
    let r, d, m, p;
    let e = window;
    let o = window.document;
    if (e.matchMedia) {
      r = e.matchMedia;
    } else {
      d = o.getElementsByTagName("head")[0];
      m = o.createElement("style");
      d.appendChild(m);
      p = o.createElement("div");
      p.className = "mediaQueryBinarySearch";
      p.style.display = "none";
      o.body.appendChild(p);
      r = function (e) {
        m.sheet.insertRule(
          "@media " +
            e +
            "{.mediaQueryBinarySearch {text-decoration: underline} }",
          0
        );
        const t =
          window.getComputedStyle(p, null).textDecoration === "underline";
        m.sheet.deleteRule(0);
        return { matches: t };
      };
    }

    let u = l(i, a, s);
    if (p) {
      d.removeChild(m);
      o.body.removeChild(p);
    }
    return u;
  }

  function system() {
    let ua = navigator.userAgent.toLowerCase();
    return ua.indexOf("win") >= 0
      ? "win"
      : ua.indexOf("mac") >= 0
      ? "mac"
      : false;
  }

  function getBrowser() {
    let ua = navigator.userAgent.toLowerCase();
    return window.ActiveXObject || "ActiveXObject" in window
      ? "ie"
      : ua.indexOf("firefox") >= 0
      ? "firefox"
      : ua.indexOf("chrome") >= 0
      ? "chrome"
      : ua.indexOf("opera") >= 0
      ? "opera"
      : ua.indexOf("safari") >= 0
      ? "safari"
      : void 0;
  }

  function detectZoom() {
    return detectZoomFunc[getBrowser() || "chrome"]();
  }

  function iszoom(e) {
    return (
      (e.system === "win" && e.zoom !== 1) ||
      (e.system === "mac" && e.zoom % 1 !== 0 && e.zoom % 2 !== 0)
    );
  }

  const zoomData = { zoom: round2(detectZoom(), 2), system: system() };
  return iszoom(zoomData);
}
