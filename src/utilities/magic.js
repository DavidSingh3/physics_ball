!function (a) {'object' == typeof exports ? module.exports = a() : 'function' == typeof define && define.amd ? define(a) : 'undefined' != typeof window ? window.decomp = a() : 'undefined' != typeof global ? global.decomp = a() : 'undefined' != typeof self && (self.decomp = a())}(function () {
  return function a (b, c, d) {
    function e (g, h) {
      if (!c[g]) {
        if (!b[g]) {
          var i = 'function' == typeof require && require
          if (!h && i) return i(g, !0)
          if (f) return f(g, !0)
          throw new Error('Cannot find module ' + g)
        }
        var j = c[g] = {exports: {}}
        b[g][0].call(j.exports, function (a) {
          var c = b[g][1][a]
          return e(c ? c : a)
        }, j, j.exports, a, b, c, d)
      }
      return c[g].exports
    }

    for (var f = 'function' == typeof require && require, g = 0; g < d.length; g++) e(d[g])
    return e
  }({
    1: [function (a, b) {
      function c () {}

      var d = a('./Scalar')
      b.exports = c, c.lineInt = function (a, b, c) {
        c = c || 0
        var e, f, g, h, i, j, k, l = [0, 0]
        return e = a[1][1] - a[0][1], f = a[0][0] - a[1][0], g = e * a[0][0] + f * a[0][1], h = b[1][1] - b[0][1], i = b[0][0] - b[1][0], j = h * b[0][0] + i * b[0][1], k = e * i - h * f, d.eq(k, 0, c) || (l[0] = (i * g - f * j) / k, l[1] = (e * j - h * g) / k), l
      }, c.segmentsIntersect = function (a, b, c, d) {
        var e = b[0] - a[0], f = b[1] - a[1], g = d[0] - c[0], h = d[1] - c[1]
        if (0 == g * f - h * e) return !1
        var i = (e * (c[1] - a[1]) + f * (a[0] - c[0])) / (g * f - h * e),
          j = (g * (a[1] - c[1]) + h * (c[0] - a[0])) / (h * e - g * f)
        return i >= 0 && 1 >= i && j >= 0 && 1 >= j
      }
    }, {'./Scalar': 4}],
    2: [function (a, b) {
      function c () {}

      b.exports = c, c.area = function (a, b, c) {return (b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1])}, c.left = function (a, b, d) {return c.area(a, b, d) > 0}, c.leftOn = function (a, b, d) {return c.area(a, b, d) >= 0}, c.right = function (a, b, d) {return c.area(a, b, d) < 0}, c.rightOn = function (a, b, d) {return c.area(a, b, d) <= 0}
      var d = [], e = []
      c.collinear = function (a, b, f, g) {
        if (g) {
          var h = d, i = e
          h[0] = b[0] - a[0], h[1] = b[1] - a[1], i[0] = f[0] - b[0], i[1] = f[1] - b[1]
          var j = h[0] * i[0] + h[1] * i[1], k = Math.sqrt(h[0] * h[0] + h[1] * h[1]),
            l = Math.sqrt(i[0] * i[0] + i[1] * i[1]), m = Math.acos(j / (k * l))
          return g > m
        }
        return 0 == c.area(a, b, f)
      }, c.sqdist = function (a, b) {
        var c = b[0] - a[0], d = b[1] - a[1]
        return c * c + d * d
      }
    }, {}],
    3: [function (a, b) {
      function c () {this.vertices = []}

      function d (a, b, c, d, e) {
        e = e || 0
        var f = b[1] - a[1], h = a[0] - b[0], i = f * a[0] + h * a[1], j = d[1] - c[1], k = c[0] - d[0],
          l = j * c[0] + k * c[1], m = f * k - j * h
        return g.eq(m, 0, e) ? [0, 0] : [(k * i - h * l) / m, (f * l - j * i) / m]
      }

      var e = a('./Line'), f = a('./Point'), g = a('./Scalar')
      b.exports = c, c.prototype.at = function (a) {
        var b = this.vertices, c = b.length
        return b[0 > a ? a % c + c : a % c]
      }, c.prototype.first = function () {return this.vertices[0]}, c.prototype.last = function () {return this.vertices[this.vertices.length - 1]}, c.prototype.clear = function () {this.vertices.length = 0}, c.prototype.append = function (a, b, c) {
        if ('undefined' == typeof b) throw new Error('From is not given!')
        if ('undefined' == typeof c) throw new Error('To is not given!')
        if (b > c - 1) throw new Error('lol1')
        if (c > a.vertices.length) throw new Error('lol2')
        if (0 > b) throw new Error('lol3')
        for (var d = b; c > d; d++) this.vertices.push(a.vertices[d])
      }, c.prototype.makeCCW = function () {
        for (var a = 0, b = this.vertices, c = 1; c < this.vertices.length; ++c) (b[c][1] < b[a][1] || b[c][1] == b[a][1] && b[c][0] > b[a][0]) && (a = c)
        f.left(this.at(a - 1), this.at(a), this.at(a + 1)) || this.reverse()
      }, c.prototype.reverse = function () {
        for (var a = [], b = 0, c = this.vertices.length; b !== c; b++) a.push(this.vertices.pop())
        this.vertices = a
      }, c.prototype.isReflex = function (a) {return f.right(this.at(a - 1), this.at(a), this.at(a + 1))}
      var h = [], i = []
      c.prototype.canSee = function (a, b) {
        var c, d, g = h, j = i
        if (f.leftOn(this.at(a + 1), this.at(a), this.at(b)) && f.rightOn(this.at(a - 1), this.at(a), this.at(b))) return !1
        d = f.sqdist(this.at(a), this.at(b))
        for (var k = 0; k !== this.vertices.length; ++k) if ((k + 1) % this.vertices.length !== a && k !== a && f.leftOn(this.at(a), this.at(b), this.at(k + 1)) && f.rightOn(this.at(a), this.at(b), this.at(k)) && (g[0] = this.at(a), g[1] = this.at(b), j[0] = this.at(k), j[1] = this.at(k + 1), c = e.lineInt(g, j), f.sqdist(this.at(a), c) < d)) return !1
        return !0
      }, c.prototype.copy = function (a, b, d) {
        var e = d || new c
        if (e.clear(), b > a) {for (var f = a; b >= f; f++) e.vertices.push(this.vertices[f])} else {
          for (var f = 0; b >= f; f++) e.vertices.push(this.vertices[f])
          for (var f = a; f < this.vertices.length; f++) e.vertices.push(this.vertices[f])
        }
        return e
      }, c.prototype.getCutEdges = function () {
        for (var a = [], b = [], d = [], e = new c, f = Number.MAX_VALUE, g = 0; g < this.vertices.length; ++g) if (this.isReflex(g)) for (var h = 0; h < this.vertices.length; ++h) if (this.canSee(g, h)) {
          b = this.copy(g, h, e).getCutEdges(), d = this.copy(h, g, e).getCutEdges()
          for (var i = 0; i < d.length; i++) b.push(d[i])
          b.length < f && (a = b, f = b.length, a.push([this.at(g), this.at(h)]))
        }
        return a
      }, c.prototype.decomp = function () {
        var a = this.getCutEdges()
        return a.length > 0 ? this.slice(a) : [this]
      }, c.prototype.slice = function (a) {
        if (0 == a.length) return [this]
        if (a instanceof Array && a.length && a[0] instanceof Array && 2 == a[0].length && a[0][0] instanceof Array) {
          for (var b = [this], c = 0; c < a.length; c++) for (var d = a[c], e = 0; e < b.length; e++) {
            var f = b[e], g = f.slice(d)
            if (g) {
              b.splice(e, 1), b.push(g[0], g[1])
              break
            }
          }
          return b
        }
        var d = a, c = this.vertices.indexOf(d[0]), e = this.vertices.indexOf(d[1])
        return -1 != c && -1 != e ? [this.copy(c, e), this.copy(e, c)] : !1
      }, c.prototype.isSimple = function () {
        for (var a = this.vertices, b = 0; b < a.length - 1; b++) for (var c = 0; b - 1 > c; c++) if (e.segmentsIntersect(a[b], a[b + 1], a[c], a[c + 1])) return !1
        for (var b = 1; b < a.length - 2; b++) if (e.segmentsIntersect(a[0], a[a.length - 1], a[b], a[b + 1])) return !1
        return !0
      }, c.prototype.quickDecomp = function (a, b, e, g, h, i) {
        h = h || 100, i = i || 0, g = g || 25, a = 'undefined' != typeof a ? a : [], b = b || [], e = e || []
        var j = [0, 0], k = [0, 0], l = [0, 0], m = 0, n = 0, o = 0, p = 0, q = 0, r = 0, s = 0, t = new c, u = new c,
          v = this, w = this.vertices
        if (w.length < 3) return a
        if (i++, i > h) return console.warn('quickDecomp: max level (' + h + ') reached.'), a
        for (var x = 0; x < this.vertices.length; ++x) if (v.isReflex(x)) {
          b.push(v.vertices[x]), m = n = Number.MAX_VALUE
          for (var y = 0; y < this.vertices.length; ++y) f.left(v.at(x - 1), v.at(x), v.at(y)) && f.rightOn(v.at(x - 1), v.at(x), v.at(y - 1)) && (l = d(v.at(x - 1), v.at(x), v.at(y), v.at(y - 1)), f.right(v.at(x + 1), v.at(x), l) && (o = f.sqdist(v.vertices[x], l), n > o && (n = o, k = l, r = y))), f.left(v.at(x + 1), v.at(x), v.at(y + 1)) && f.rightOn(v.at(x + 1), v.at(x), v.at(y)) && (l = d(v.at(x + 1), v.at(x), v.at(y), v.at(y + 1)), f.left(v.at(x - 1), v.at(x), l) && (o = f.sqdist(v.vertices[x], l), m > o && (m = o, j = l, q = y)))
          if (r == (q + 1) % this.vertices.length) { l[0] = (k[0] + j[0]) / 2, l[1] = (k[1] + j[1]) / 2, e.push(l), q > x ? (t.append(v, x, q + 1), t.vertices.push(l), u.vertices.push(l), 0 != r && u.append(v, r, v.vertices.length), u.append(v, 0, x + 1)) : (0 != x && t.append(v, x, v.vertices.length), t.append(v, 0, q + 1), t.vertices.push(l), u.vertices.push(l), u.append(v, r, x + 1)) } else {
            if (r > q && (q += this.vertices.length), p = Number.MAX_VALUE, r > q) return a
            for (var y = r; q >= y; ++y) f.leftOn(v.at(x - 1), v.at(x), v.at(y)) && f.rightOn(v.at(x + 1), v.at(x), v.at(y)) && (o = f.sqdist(v.at(x), v.at(y)), p > o && (p = o, s = y % this.vertices.length))
            s > x ? (t.append(v, x, s + 1), 0 != s && u.append(v, s, w.length), u.append(v, 0, x + 1)) : (0 != x && t.append(v, x, w.length), t.append(v, 0, s + 1), u.append(v, s, x + 1))
          }
          return t.vertices.length < u.vertices.length ? (t.quickDecomp(a, b, e, g, h, i), u.quickDecomp(a, b, e, g, h, i)) : (u.quickDecomp(a, b, e, g, h, i), t.quickDecomp(a, b, e, g, h, i)), a
        }
        return a.push(this), a
      }, c.prototype.removeCollinearPoints = function (a) {
        for (var b = 0, c = this.vertices.length - 1; this.vertices.length > 3 && c >= 0; --c) f.collinear(this.at(c - 1), this.at(c), this.at(c + 1), a) && (this.vertices.splice(c % this.vertices.length, 1), c--, b++)
        return b
      }
    }, {'./Line': 1, './Point': 2, './Scalar': 4}],
    4: [function (a, b) {
      function c () {}

      b.exports = c, c.eq = function (a, b, c) {return c = c || 0, Math.abs(a - b) < c}
    }, {}],
    5: [function (a, b) {b.exports = {Polygon: a('./Polygon'), Point: a('./Point')}}, {'./Point': 2, './Polygon': 3}]
  }, {}, [5])(5)
})

function loadGitHubScript (url) {
  return fetch(url).then(function (res) {
    return res.blob()
  }).then(function (body) {
    return loadScript(URL.createObjectURL(body))
  })
}

function loadScript (url) {
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script')
    script.src = url
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })
}