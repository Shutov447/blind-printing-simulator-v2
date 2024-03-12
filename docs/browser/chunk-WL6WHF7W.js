import { M as E, Y as gt, a as ue, c as pt } from './chunk-EBIFBJ4P.js';
var _ = (function (n) {
        return (
            (n[(n.State = 0)] = 'State'),
            (n[(n.Transition = 1)] = 'Transition'),
            (n[(n.Sequence = 2)] = 'Sequence'),
            (n[(n.Group = 3)] = 'Group'),
            (n[(n.Animate = 4)] = 'Animate'),
            (n[(n.Keyframes = 5)] = 'Keyframes'),
            (n[(n.Style = 6)] = 'Style'),
            (n[(n.Trigger = 7)] = 'Trigger'),
            (n[(n.Reference = 8)] = 'Reference'),
            (n[(n.AnimateChild = 9)] = 'AnimateChild'),
            (n[(n.AnimateRef = 10)] = 'AnimateRef'),
            (n[(n.Query = 11)] = 'Query'),
            (n[(n.Stagger = 12)] = 'Stagger'),
            n
        );
    })(_ || {}),
    B = '*';
function yt(n, e = null) {
    return { type: _.Sequence, steps: n, options: e };
}
function Me(n) {
    return { type: _.Style, styles: n, offset: null };
}
var U = class {
        constructor(e = 0, t = 0) {
            (this._onDoneFns = []),
                (this._onStartFns = []),
                (this._onDestroyFns = []),
                (this._originalOnDoneFns = []),
                (this._originalOnStartFns = []),
                (this._started = !1),
                (this._destroyed = !1),
                (this._finished = !1),
                (this._position = 0),
                (this.parentPlayer = null),
                (this.totalTime = e + t);
        }
        _onFinish() {
            this._finished ||
                ((this._finished = !0),
                this._onDoneFns.forEach((e) => e()),
                (this._onDoneFns = []));
        }
        onStart(e) {
            this._originalOnStartFns.push(e), this._onStartFns.push(e);
        }
        onDone(e) {
            this._originalOnDoneFns.push(e), this._onDoneFns.push(e);
        }
        onDestroy(e) {
            this._onDestroyFns.push(e);
        }
        hasStarted() {
            return this._started;
        }
        init() {}
        play() {
            this.hasStarted() || (this._onStart(), this.triggerMicrotask()),
                (this._started = !0);
        }
        triggerMicrotask() {
            queueMicrotask(() => this._onFinish());
        }
        _onStart() {
            this._onStartFns.forEach((e) => e()), (this._onStartFns = []);
        }
        pause() {}
        restart() {}
        finish() {
            this._onFinish();
        }
        destroy() {
            this._destroyed ||
                ((this._destroyed = !0),
                this.hasStarted() || this._onStart(),
                this.finish(),
                this._onDestroyFns.forEach((e) => e()),
                (this._onDestroyFns = []));
        }
        reset() {
            (this._started = !1),
                (this._finished = !1),
                (this._onStartFns = this._originalOnStartFns),
                (this._onDoneFns = this._originalOnDoneFns);
        }
        setPosition(e) {
            this._position = this.totalTime ? e * this.totalTime : 1;
        }
        getPosition() {
            return this.totalTime ? this._position / this.totalTime : 1;
        }
        triggerCallback(e) {
            let t = e == 'start' ? this._onStartFns : this._onDoneFns;
            t.forEach((s) => s()), (t.length = 0);
        }
    },
    ie = class {
        constructor(e) {
            (this._onDoneFns = []),
                (this._onStartFns = []),
                (this._finished = !1),
                (this._started = !1),
                (this._destroyed = !1),
                (this._onDestroyFns = []),
                (this.parentPlayer = null),
                (this.totalTime = 0),
                (this.players = e);
            let t = 0,
                s = 0,
                i = 0,
                r = this.players.length;
            r == 0
                ? queueMicrotask(() => this._onFinish())
                : this.players.forEach((o) => {
                      o.onDone(() => {
                          ++t == r && this._onFinish();
                      }),
                          o.onDestroy(() => {
                              ++s == r && this._onDestroy();
                          }),
                          o.onStart(() => {
                              ++i == r && this._onStart();
                          });
                  }),
                (this.totalTime = this.players.reduce(
                    (o, a) => Math.max(o, a.totalTime),
                    0,
                ));
        }
        _onFinish() {
            this._finished ||
                ((this._finished = !0),
                this._onDoneFns.forEach((e) => e()),
                (this._onDoneFns = []));
        }
        init() {
            this.players.forEach((e) => e.init());
        }
        onStart(e) {
            this._onStartFns.push(e);
        }
        _onStart() {
            this.hasStarted() ||
                ((this._started = !0),
                this._onStartFns.forEach((e) => e()),
                (this._onStartFns = []));
        }
        onDone(e) {
            this._onDoneFns.push(e);
        }
        onDestroy(e) {
            this._onDestroyFns.push(e);
        }
        hasStarted() {
            return this._started;
        }
        play() {
            this.parentPlayer || this.init(),
                this._onStart(),
                this.players.forEach((e) => e.play());
        }
        pause() {
            this.players.forEach((e) => e.pause());
        }
        restart() {
            this.players.forEach((e) => e.restart());
        }
        finish() {
            this._onFinish(), this.players.forEach((e) => e.finish());
        }
        destroy() {
            this._onDestroy();
        }
        _onDestroy() {
            this._destroyed ||
                ((this._destroyed = !0),
                this._onFinish(),
                this.players.forEach((e) => e.destroy()),
                this._onDestroyFns.forEach((e) => e()),
                (this._onDestroyFns = []));
        }
        reset() {
            this.players.forEach((e) => e.reset()),
                (this._destroyed = !1),
                (this._finished = !1),
                (this._started = !1);
        }
        setPosition(e) {
            let t = e * this.totalTime;
            this.players.forEach((s) => {
                let i = s.totalTime ? Math.min(1, t / s.totalTime) : 1;
                s.setPosition(i);
            });
        }
        getPosition() {
            let e = this.players.reduce(
                (t, s) => (t === null || s.totalTime > t.totalTime ? s : t),
                null,
            );
            return e != null ? e.getPosition() : 0;
        }
        beforeDestroy() {
            this.players.forEach((e) => {
                e.beforeDestroy && e.beforeDestroy();
            });
        }
        triggerCallback(e) {
            let t = e == 'start' ? this._onStartFns : this._onDoneFns;
            t.forEach((s) => s()), (t.length = 0);
        }
    },
    ce = '!';
function _t(n) {
    return new E(3e3, !1);
}
function Ht() {
    return new E(3100, !1);
}
function Yt() {
    return new E(3101, !1);
}
function Xt(n) {
    return new E(3001, !1);
}
function xt(n) {
    return new E(3003, !1);
}
function Zt(n) {
    return new E(3004, !1);
}
function Jt(n, e) {
    return new E(3005, !1);
}
function es() {
    return new E(3006, !1);
}
function ts() {
    return new E(3007, !1);
}
function ss(n, e) {
    return new E(3008, !1);
}
function is(n) {
    return new E(3002, !1);
}
function ns(n, e, t, s, i) {
    return new E(3010, !1);
}
function rs() {
    return new E(3011, !1);
}
function os() {
    return new E(3012, !1);
}
function as() {
    return new E(3200, !1);
}
function ls() {
    return new E(3202, !1);
}
function hs() {
    return new E(3013, !1);
}
function us(n) {
    return new E(3014, !1);
}
function cs(n) {
    return new E(3015, !1);
}
function fs(n) {
    return new E(3016, !1);
}
function ds(n) {
    return new E(3500, !1);
}
function ms(n) {
    return new E(3501, !1);
}
function ps(n, e) {
    return new E(3404, !1);
}
function gs(n) {
    return new E(3502, !1);
}
function ys(n) {
    return new E(3503, !1);
}
function _s() {
    return new E(3300, !1);
}
function Ss(n) {
    return new E(3504, !1);
}
function Es(n) {
    return new E(3301, !1);
}
function vs(n, e) {
    return new E(3302, !1);
}
function Ts(n) {
    return new E(3303, !1);
}
function ws(n, e) {
    return new E(3400, !1);
}
function bs(n) {
    return new E(3401, !1);
}
function Ps(n) {
    return new E(3402, !1);
}
function As(n, e) {
    return new E(3505, !1);
}
var Ns = new Set([
    '-moz-outline-radius',
    '-moz-outline-radius-bottomleft',
    '-moz-outline-radius-bottomright',
    '-moz-outline-radius-topleft',
    '-moz-outline-radius-topright',
    '-ms-grid-columns',
    '-ms-grid-rows',
    '-webkit-line-clamp',
    '-webkit-text-fill-color',
    '-webkit-text-stroke',
    '-webkit-text-stroke-color',
    'accent-color',
    'all',
    'backdrop-filter',
    'background',
    'background-color',
    'background-position',
    'background-size',
    'block-size',
    'border',
    'border-block-end',
    'border-block-end-color',
    'border-block-end-width',
    'border-block-start',
    'border-block-start-color',
    'border-block-start-width',
    'border-bottom',
    'border-bottom-color',
    'border-bottom-left-radius',
    'border-bottom-right-radius',
    'border-bottom-width',
    'border-color',
    'border-end-end-radius',
    'border-end-start-radius',
    'border-image-outset',
    'border-image-slice',
    'border-image-width',
    'border-inline-end',
    'border-inline-end-color',
    'border-inline-end-width',
    'border-inline-start',
    'border-inline-start-color',
    'border-inline-start-width',
    'border-left',
    'border-left-color',
    'border-left-width',
    'border-radius',
    'border-right',
    'border-right-color',
    'border-right-width',
    'border-start-end-radius',
    'border-start-start-radius',
    'border-top',
    'border-top-color',
    'border-top-left-radius',
    'border-top-right-radius',
    'border-top-width',
    'border-width',
    'bottom',
    'box-shadow',
    'caret-color',
    'clip',
    'clip-path',
    'color',
    'column-count',
    'column-gap',
    'column-rule',
    'column-rule-color',
    'column-rule-width',
    'column-width',
    'columns',
    'filter',
    'flex',
    'flex-basis',
    'flex-grow',
    'flex-shrink',
    'font',
    'font-size',
    'font-size-adjust',
    'font-stretch',
    'font-variation-settings',
    'font-weight',
    'gap',
    'grid-column-gap',
    'grid-gap',
    'grid-row-gap',
    'grid-template-columns',
    'grid-template-rows',
    'height',
    'inline-size',
    'input-security',
    'inset',
    'inset-block',
    'inset-block-end',
    'inset-block-start',
    'inset-inline',
    'inset-inline-end',
    'inset-inline-start',
    'left',
    'letter-spacing',
    'line-clamp',
    'line-height',
    'margin',
    'margin-block-end',
    'margin-block-start',
    'margin-bottom',
    'margin-inline-end',
    'margin-inline-start',
    'margin-left',
    'margin-right',
    'margin-top',
    'mask',
    'mask-border',
    'mask-position',
    'mask-size',
    'max-block-size',
    'max-height',
    'max-inline-size',
    'max-lines',
    'max-width',
    'min-block-size',
    'min-height',
    'min-inline-size',
    'min-width',
    'object-position',
    'offset',
    'offset-anchor',
    'offset-distance',
    'offset-path',
    'offset-position',
    'offset-rotate',
    'opacity',
    'order',
    'outline',
    'outline-color',
    'outline-offset',
    'outline-width',
    'padding',
    'padding-block-end',
    'padding-block-start',
    'padding-bottom',
    'padding-inline-end',
    'padding-inline-start',
    'padding-left',
    'padding-right',
    'padding-top',
    'perspective',
    'perspective-origin',
    'right',
    'rotate',
    'row-gap',
    'scale',
    'scroll-margin',
    'scroll-margin-block',
    'scroll-margin-block-end',
    'scroll-margin-block-start',
    'scroll-margin-bottom',
    'scroll-margin-inline',
    'scroll-margin-inline-end',
    'scroll-margin-inline-start',
    'scroll-margin-left',
    'scroll-margin-right',
    'scroll-margin-top',
    'scroll-padding',
    'scroll-padding-block',
    'scroll-padding-block-end',
    'scroll-padding-block-start',
    'scroll-padding-bottom',
    'scroll-padding-inline',
    'scroll-padding-inline-end',
    'scroll-padding-inline-start',
    'scroll-padding-left',
    'scroll-padding-right',
    'scroll-padding-top',
    'scroll-snap-coordinate',
    'scroll-snap-destination',
    'scrollbar-color',
    'shape-image-threshold',
    'shape-margin',
    'shape-outside',
    'tab-size',
    'text-decoration',
    'text-decoration-color',
    'text-decoration-thickness',
    'text-emphasis',
    'text-emphasis-color',
    'text-indent',
    'text-shadow',
    'text-underline-offset',
    'top',
    'transform',
    'transform-origin',
    'translate',
    'vertical-align',
    'visibility',
    'width',
    'word-spacing',
    'z-index',
    'zoom',
]);
function j(n) {
    switch (n.length) {
        case 0:
            return new U();
        case 1:
            return n[0];
        default:
            return new ie(n);
    }
}
function It(n, e, t = new Map(), s = new Map()) {
    let i = [],
        r = [],
        o = -1,
        a = null;
    if (
        (e.forEach((l) => {
            let h = l.get('offset'),
                c = h == o,
                u = (c && a) || new Map();
            l.forEach((S, y) => {
                let d = y,
                    g = S;
                if (y !== 'offset')
                    switch (((d = n.normalizePropertyName(d, i)), g)) {
                        case ce:
                            g = t.get(y);
                            break;
                        case B:
                            g = s.get(y);
                            break;
                        default:
                            g = n.normalizeStyleValue(y, d, g, i);
                            break;
                    }
                u.set(d, g);
            }),
                c || r.push(u),
                (a = u),
                (o = h);
        }),
        i.length)
    )
        throw gs(i);
    return r;
}
function tt(n, e, t, s) {
    switch (e) {
        case 'start':
            n.onStart(() => s(t && Ce(t, 'start', n)));
            break;
        case 'done':
            n.onDone(() => s(t && Ce(t, 'done', n)));
            break;
        case 'destroy':
            n.onDestroy(() => s(t && Ce(t, 'destroy', n)));
            break;
    }
}
function Ce(n, e, t) {
    let s = t.totalTime,
        i = !!t.disabled,
        r = st(
            n.element,
            n.triggerName,
            n.fromState,
            n.toState,
            e || n.phaseName,
            s ?? n.totalTime,
            i,
        ),
        o = n._data;
    return o != null && (r._data = o), r;
}
function st(n, e, t, s, i = '', r = 0, o) {
    return {
        element: n,
        triggerName: e,
        fromState: t,
        toState: s,
        phaseName: i,
        totalTime: r,
        disabled: !!o,
    };
}
function O(n, e, t) {
    let s = n.get(e);
    return s || n.set(e, (s = t)), s;
}
function St(n) {
    let e = n.indexOf(':'),
        t = n.substring(1, e),
        s = n.slice(e + 1);
    return [t, s];
}
var Ds = typeof document > 'u' ? null : document.documentElement;
function it(n) {
    let e = n.parentNode || n.host || null;
    return e === Ds ? null : e;
}
function Ms(n) {
    return n.substring(1, 6) == 'ebkit';
}
var Y = null,
    Et = !1;
function Cs(n) {
    Y ||
        ((Y = ks() || {}), (Et = Y.style ? 'WebkitAppearance' in Y.style : !1));
    let e = !0;
    return (
        Y.style &&
            !Ms(n) &&
            ((e = n in Y.style),
            !e &&
                Et &&
                (e =
                    'Webkit' + n.charAt(0).toUpperCase() + n.slice(1) in
                    Y.style)),
        e
    );
}
function Ai(n) {
    return Ns.has(n);
}
function ks() {
    return typeof document < 'u' ? document.body : null;
}
function Kt(n, e) {
    for (; e; ) {
        if (e === n) return !0;
        e = it(e);
    }
    return !1;
}
function qt(n, e, t) {
    if (t) return Array.from(n.querySelectorAll(e));
    let s = n.querySelector(e);
    return s ? [s] : [];
}
var zt = (() => {
        let e = class e {
            validateStyleProperty(s) {
                return Cs(s);
            }
            matchesElement(s, i) {
                return !1;
            }
            containsElement(s, i) {
                return Kt(s, i);
            }
            getParentElement(s) {
                return it(s);
            }
            query(s, i, r) {
                return qt(s, i, r);
            }
            computeStyle(s, i, r) {
                return r || '';
            }
            animate(s, i, r, o, a, l = [], h) {
                return new U(r, o);
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)();
        }),
            (e.ɵprov = gt({ token: e, factory: e.ɵfac }));
        let n = e;
        return n;
    })(),
    ut = class ut {};
ut.NOOP = new zt();
var vt = ut,
    Ie = class {},
    Ke = class {
        normalizePropertyName(e, t) {
            return e;
        }
        normalizeStyleValue(e, t, s, i) {
            return s;
        }
    },
    Fs = 1e3,
    Bt = '{{',
    Rs = '}}',
    nt = 'ng-enter',
    ye = 'ng-leave',
    fe = 'ng-trigger',
    _e = '.ng-trigger',
    Tt = 'ng-animating',
    qe = '.ng-animating';
function $(n) {
    if (typeof n == 'number') return n;
    let e = n.match(/^(-?[\.\d]+)(m?s)/);
    return !e || e.length < 2 ? 0 : ze(parseFloat(e[1]), e[2]);
}
function ze(n, e) {
    switch (e) {
        case 's':
            return n * Fs;
        default:
            return n;
    }
}
function Se(n, e, t) {
    return n.hasOwnProperty('duration') ? n : Os(n, e, t);
}
function Os(n, e, t) {
    let s =
            /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i,
        i,
        r = 0,
        o = '';
    if (typeof n == 'string') {
        let a = n.match(s);
        if (a === null)
            return e.push(_t(n)), { duration: 0, delay: 0, easing: '' };
        i = ze(parseFloat(a[1]), a[2]);
        let l = a[3];
        l != null && (r = ze(parseFloat(l), a[4]));
        let h = a[5];
        h && (o = h);
    } else i = n;
    if (!t) {
        let a = !1,
            l = e.length;
        i < 0 && (e.push(Ht()), (a = !0)),
            r < 0 && (e.push(Yt()), (a = !0)),
            a && e.splice(l, 0, _t(n));
    }
    return { duration: i, delay: r, easing: o };
}
function Ls(n) {
    return n.length
        ? n[0] instanceof Map
            ? n
            : n.map((e) => new Map(Object.entries(e)))
        : [];
}
function wt(n) {
    return Array.isArray(n) ? new Map(...n) : new Map(n);
}
function Q(n, e, t) {
    e.forEach((s, i) => {
        let r = rt(i);
        t && !t.has(i) && t.set(i, n.style[r]), (n.style[r] = s);
    });
}
function x(n, e) {
    e.forEach((t, s) => {
        let i = rt(s);
        n.style[i] = '';
    });
}
function ne(n) {
    return Array.isArray(n) ? (n.length == 1 ? n[0] : yt(n)) : n;
}
function Is(n, e, t) {
    let s = e.params || {},
        i = Qt(n);
    i.length &&
        i.forEach((r) => {
            s.hasOwnProperty(r) || t.push(Xt(r));
        });
}
var Be = new RegExp(`${Bt}\\s*(.+?)\\s*${Rs}`, 'g');
function Qt(n) {
    let e = [];
    if (typeof n == 'string') {
        let t;
        for (; (t = Be.exec(n)); ) e.push(t[1]);
        Be.lastIndex = 0;
    }
    return e;
}
function oe(n, e, t) {
    let s = `${n}`,
        i = s.replace(Be, (r, o) => {
            let a = e[o];
            return a == null && (t.push(xt(o)), (a = '')), a.toString();
        });
    return i == s ? n : i;
}
var Ks = /-+([a-z0-9])/g;
function rt(n) {
    return n.replace(Ks, (...e) => e[1].toUpperCase());
}
function Ni(n) {
    return n.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
function qs(n, e) {
    return n === 0 || e === 0;
}
function zs(n, e, t) {
    if (t.size && e.length) {
        let s = e[0],
            i = [];
        if (
            (t.forEach((r, o) => {
                s.has(o) || i.push(o), s.set(o, r);
            }),
            i.length)
        )
            for (let r = 1; r < e.length; r++) {
                let o = e[r];
                i.forEach((a) => o.set(a, ot(n, a)));
            }
    }
    return e;
}
function R(n, e, t) {
    switch (e.type) {
        case _.Trigger:
            return n.visitTrigger(e, t);
        case _.State:
            return n.visitState(e, t);
        case _.Transition:
            return n.visitTransition(e, t);
        case _.Sequence:
            return n.visitSequence(e, t);
        case _.Group:
            return n.visitGroup(e, t);
        case _.Animate:
            return n.visitAnimate(e, t);
        case _.Keyframes:
            return n.visitKeyframes(e, t);
        case _.Style:
            return n.visitStyle(e, t);
        case _.Reference:
            return n.visitReference(e, t);
        case _.AnimateChild:
            return n.visitAnimateChild(e, t);
        case _.AnimateRef:
            return n.visitAnimateRef(e, t);
        case _.Query:
            return n.visitQuery(e, t);
        case _.Stagger:
            return n.visitStagger(e, t);
        default:
            throw Zt(e.type);
    }
}
function ot(n, e) {
    return window.getComputedStyle(n)[e];
}
var Bs = new Set([
        'width',
        'height',
        'minWidth',
        'minHeight',
        'maxWidth',
        'maxHeight',
        'left',
        'top',
        'bottom',
        'right',
        'fontSize',
        'outlineWidth',
        'outlineOffset',
        'paddingTop',
        'paddingLeft',
        'paddingBottom',
        'paddingRight',
        'marginTop',
        'marginLeft',
        'marginBottom',
        'marginRight',
        'borderRadius',
        'borderWidth',
        'borderTopWidth',
        'borderLeftWidth',
        'borderRightWidth',
        'borderBottomWidth',
        'textIndent',
        'perspective',
    ]),
    Qe = class extends Ie {
        normalizePropertyName(e, t) {
            return rt(e);
        }
        normalizeStyleValue(e, t, s, i) {
            let r = '',
                o = s.toString().trim();
            if (Bs.has(t) && s !== 0 && s !== '0')
                if (typeof s == 'number') r = 'px';
                else {
                    let a = s.match(/^[+-]?[\d\.]+([a-z]*)$/);
                    a && a[1].length == 0 && i.push(Jt(e, s));
                }
            return o + r;
        }
    };
var Ee = '*';
function Qs(n, e) {
    let t = [];
    return (
        typeof n == 'string'
            ? n.split(/\s*,\s*/).forEach((s) => $s(s, t, e))
            : t.push(n),
        t
    );
}
function $s(n, e, t) {
    if (n[0] == ':') {
        let l = Vs(n, t);
        if (typeof l == 'function') {
            e.push(l);
            return;
        }
        n = l;
    }
    let s = n.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
    if (s == null || s.length < 4) return t.push(cs(n)), e;
    let i = s[1],
        r = s[2],
        o = s[3];
    e.push(bt(i, o));
    let a = i == Ee && o == Ee;
    r[0] == '<' && !a && e.push(bt(o, i));
}
function Vs(n, e) {
    switch (n) {
        case ':enter':
            return 'void => *';
        case ':leave':
            return '* => void';
        case ':increment':
            return (t, s) => parseFloat(s) > parseFloat(t);
        case ':decrement':
            return (t, s) => parseFloat(s) < parseFloat(t);
        default:
            return e.push(fs(n)), '* => *';
    }
}
var de = new Set(['true', '1']),
    me = new Set(['false', '0']);
function bt(n, e) {
    let t = de.has(n) || me.has(n),
        s = de.has(e) || me.has(e);
    return (i, r) => {
        let o = n == Ee || n == i,
            a = e == Ee || e == r;
        return (
            !o && t && typeof i == 'boolean' && (o = i ? de.has(n) : me.has(n)),
            !a && s && typeof r == 'boolean' && (a = r ? de.has(e) : me.has(e)),
            o && a
        );
    };
}
var $t = ':self',
    Us = new RegExp(`s*${$t}s*,?`, 'g');
function at(n, e, t, s) {
    return new $e(n).build(e, t, s);
}
var Pt = '',
    $e = class {
        constructor(e) {
            this._driver = e;
        }
        build(e, t, s) {
            let i = new Ve(t);
            return this._resetContextStyleTimingState(i), R(this, ne(e), i);
        }
        _resetContextStyleTimingState(e) {
            (e.currentQuerySelector = Pt),
                (e.collectedStyles = new Map()),
                e.collectedStyles.set(Pt, new Map()),
                (e.currentTime = 0);
        }
        visitTrigger(e, t) {
            let s = (t.queryCount = 0),
                i = (t.depCount = 0),
                r = [],
                o = [];
            return (
                e.name.charAt(0) == '@' && t.errors.push(es()),
                e.definitions.forEach((a) => {
                    if (
                        (this._resetContextStyleTimingState(t),
                        a.type == _.State)
                    ) {
                        let l = a,
                            h = l.name;
                        h
                            .toString()
                            .split(/\s*,\s*/)
                            .forEach((c) => {
                                (l.name = c), r.push(this.visitState(l, t));
                            }),
                            (l.name = h);
                    } else if (a.type == _.Transition) {
                        let l = this.visitTransition(a, t);
                        (s += l.queryCount), (i += l.depCount), o.push(l);
                    } else t.errors.push(ts());
                }),
                {
                    type: _.Trigger,
                    name: e.name,
                    states: r,
                    transitions: o,
                    queryCount: s,
                    depCount: i,
                    options: null,
                }
            );
        }
        visitState(e, t) {
            let s = this.visitStyle(e.styles, t),
                i = (e.options && e.options.params) || null;
            if (s.containsDynamicStyles) {
                let r = new Set(),
                    o = i || {};
                s.styles.forEach((a) => {
                    a instanceof Map &&
                        a.forEach((l) => {
                            Qt(l).forEach((h) => {
                                o.hasOwnProperty(h) || r.add(h);
                            });
                        });
                }),
                    r.size && t.errors.push(ss(e.name, [...r.values()]));
            }
            return {
                type: _.State,
                name: e.name,
                style: s,
                options: i ? { params: i } : null,
            };
        }
        visitTransition(e, t) {
            (t.queryCount = 0), (t.depCount = 0);
            let s = R(this, ne(e.animation), t),
                i = Qs(e.expr, t.errors);
            return {
                type: _.Transition,
                matchers: i,
                animation: s,
                queryCount: t.queryCount,
                depCount: t.depCount,
                options: X(e.options),
            };
        }
        visitSequence(e, t) {
            return {
                type: _.Sequence,
                steps: e.steps.map((s) => R(this, s, t)),
                options: X(e.options),
            };
        }
        visitGroup(e, t) {
            let s = t.currentTime,
                i = 0,
                r = e.steps.map((o) => {
                    t.currentTime = s;
                    let a = R(this, o, t);
                    return (i = Math.max(i, t.currentTime)), a;
                });
            return (
                (t.currentTime = i),
                { type: _.Group, steps: r, options: X(e.options) }
            );
        }
        visitAnimate(e, t) {
            let s = Hs(e.timings, t.errors);
            t.currentAnimateTimings = s;
            let i,
                r = e.styles ? e.styles : Me({});
            if (r.type == _.Keyframes) i = this.visitKeyframes(r, t);
            else {
                let o = e.styles,
                    a = !1;
                if (!o) {
                    a = !0;
                    let h = {};
                    s.easing && (h.easing = s.easing), (o = Me(h));
                }
                t.currentTime += s.duration + s.delay;
                let l = this.visitStyle(o, t);
                (l.isEmptyStep = a), (i = l);
            }
            return (
                (t.currentAnimateTimings = null),
                { type: _.Animate, timings: s, style: i, options: null }
            );
        }
        visitStyle(e, t) {
            let s = this._makeStyleAst(e, t);
            return this._validateStyleAst(s, t), s;
        }
        _makeStyleAst(e, t) {
            let s = [],
                i = Array.isArray(e.styles) ? e.styles : [e.styles];
            for (let a of i)
                typeof a == 'string'
                    ? a === B
                        ? s.push(a)
                        : t.errors.push(is(a))
                    : s.push(new Map(Object.entries(a)));
            let r = !1,
                o = null;
            return (
                s.forEach((a) => {
                    if (
                        a instanceof Map &&
                        (a.has('easing') &&
                            ((o = a.get('easing')), a.delete('easing')),
                        !r)
                    ) {
                        for (let l of a.values())
                            if (l.toString().indexOf(Bt) >= 0) {
                                r = !0;
                                break;
                            }
                    }
                }),
                {
                    type: _.Style,
                    styles: s,
                    easing: o,
                    offset: e.offset,
                    containsDynamicStyles: r,
                    options: null,
                }
            );
        }
        _validateStyleAst(e, t) {
            let s = t.currentAnimateTimings,
                i = t.currentTime,
                r = t.currentTime;
            s && r > 0 && (r -= s.duration + s.delay),
                e.styles.forEach((o) => {
                    typeof o != 'string' &&
                        o.forEach((a, l) => {
                            let h = t.collectedStyles.get(
                                    t.currentQuerySelector,
                                ),
                                c = h.get(l),
                                u = !0;
                            c &&
                                (r != i &&
                                    r >= c.startTime &&
                                    i <= c.endTime &&
                                    (t.errors.push(
                                        ns(l, c.startTime, c.endTime, r, i),
                                    ),
                                    (u = !1)),
                                (r = c.startTime)),
                                u && h.set(l, { startTime: r, endTime: i }),
                                t.options && Is(a, t.options, t.errors);
                        });
                });
        }
        visitKeyframes(e, t) {
            let s = { type: _.Keyframes, styles: [], options: null };
            if (!t.currentAnimateTimings) return t.errors.push(rs()), s;
            let i = 1,
                r = 0,
                o = [],
                a = !1,
                l = !1,
                h = 0,
                c = e.steps.map((b) => {
                    let P = this._makeStyleAst(b, t),
                        M = P.offset != null ? P.offset : Gs(P.styles),
                        N = 0;
                    return (
                        M != null && (r++, (N = P.offset = M)),
                        (l = l || N < 0 || N > 1),
                        (a = a || N < h),
                        (h = N),
                        o.push(N),
                        P
                    );
                });
            l && t.errors.push(os()), a && t.errors.push(as());
            let u = e.steps.length,
                S = 0;
            r > 0 && r < u ? t.errors.push(ls()) : r == 0 && (S = i / (u - 1));
            let y = u - 1,
                d = t.currentTime,
                g = t.currentAnimateTimings,
                T = g.duration;
            return (
                c.forEach((b, P) => {
                    let M = S > 0 ? (P == y ? 1 : S * P) : o[P],
                        N = M * T;
                    (t.currentTime = d + g.delay + N),
                        (g.duration = N),
                        this._validateStyleAst(b, t),
                        (b.offset = M),
                        s.styles.push(b);
                }),
                s
            );
        }
        visitReference(e, t) {
            return {
                type: _.Reference,
                animation: R(this, ne(e.animation), t),
                options: X(e.options),
            };
        }
        visitAnimateChild(e, t) {
            return (
                t.depCount++, { type: _.AnimateChild, options: X(e.options) }
            );
        }
        visitAnimateRef(e, t) {
            return {
                type: _.AnimateRef,
                animation: this.visitReference(e.animation, t),
                options: X(e.options),
            };
        }
        visitQuery(e, t) {
            let s = t.currentQuerySelector,
                i = e.options || {};
            t.queryCount++, (t.currentQuery = e);
            let [r, o] = js(e.selector);
            (t.currentQuerySelector = s.length ? s + ' ' + r : r),
                O(t.collectedStyles, t.currentQuerySelector, new Map());
            let a = R(this, ne(e.animation), t);
            return (
                (t.currentQuery = null),
                (t.currentQuerySelector = s),
                {
                    type: _.Query,
                    selector: r,
                    limit: i.limit || 0,
                    optional: !!i.optional,
                    includeSelf: o,
                    animation: a,
                    originalSelector: e.selector,
                    options: X(e.options),
                }
            );
        }
        visitStagger(e, t) {
            t.currentQuery || t.errors.push(hs());
            let s =
                e.timings === 'full'
                    ? { duration: 0, delay: 0, easing: 'full' }
                    : Se(e.timings, t.errors, !0);
            return {
                type: _.Stagger,
                animation: R(this, ne(e.animation), t),
                timings: s,
                options: null,
            };
        }
    };
function js(n) {
    let e = !!n.split(/\s*,\s*/).find((t) => t == $t);
    return (
        e && (n = n.replace(Us, '')),
        (n = n
            .replace(/@\*/g, _e)
            .replace(/@\w+/g, (t) => _e + '-' + t.slice(1))
            .replace(/:animating/g, qe)),
        [n, e]
    );
}
function Ws(n) {
    return n ? ue({}, n) : null;
}
var Ve = class {
    constructor(e) {
        (this.errors = e),
            (this.queryCount = 0),
            (this.depCount = 0),
            (this.currentTransition = null),
            (this.currentQuery = null),
            (this.currentQuerySelector = null),
            (this.currentAnimateTimings = null),
            (this.currentTime = 0),
            (this.collectedStyles = new Map()),
            (this.options = null),
            (this.unsupportedCSSPropertiesFound = new Set());
    }
};
function Gs(n) {
    if (typeof n == 'string') return null;
    let e = null;
    if (Array.isArray(n))
        n.forEach((t) => {
            if (t instanceof Map && t.has('offset')) {
                let s = t;
                (e = parseFloat(s.get('offset'))), s.delete('offset');
            }
        });
    else if (n instanceof Map && n.has('offset')) {
        let t = n;
        (e = parseFloat(t.get('offset'))), t.delete('offset');
    }
    return e;
}
function Hs(n, e) {
    if (n.hasOwnProperty('duration')) return n;
    if (typeof n == 'number') {
        let r = Se(n, e).duration;
        return ke(r, 0, '');
    }
    let t = n;
    if (t.split(/\s+/).some((r) => r.charAt(0) == '{' && r.charAt(1) == '{')) {
        let r = ke(0, 0, '');
        return (r.dynamic = !0), (r.strValue = t), r;
    }
    let i = Se(t, e);
    return ke(i.duration, i.delay, i.easing);
}
function X(n) {
    return (
        n ? ((n = ue({}, n)), n.params && (n.params = Ws(n.params))) : (n = {}),
        n
    );
}
function ke(n, e, t) {
    return { duration: n, delay: e, easing: t };
}
function lt(n, e, t, s, i, r, o = null, a = !1) {
    return {
        type: 1,
        element: n,
        keyframes: e,
        preStyleProps: t,
        postStyleProps: s,
        duration: i,
        delay: r,
        totalTime: i + r,
        easing: o,
        subTimeline: a,
    };
}
var se = class {
        constructor() {
            this._map = new Map();
        }
        get(e) {
            return this._map.get(e) || [];
        }
        append(e, t) {
            let s = this._map.get(e);
            s || this._map.set(e, (s = [])), s.push(...t);
        }
        has(e) {
            return this._map.has(e);
        }
        clear() {
            this._map.clear();
        }
    },
    Ys = 1,
    Xs = ':enter',
    xs = new RegExp(Xs, 'g'),
    Zs = ':leave',
    Js = new RegExp(Zs, 'g');
function ht(n, e, t, s, i, r = new Map(), o = new Map(), a, l, h = []) {
    return new Ue().buildKeyframes(n, e, t, s, i, r, o, a, l, h);
}
var Ue = class {
        buildKeyframes(e, t, s, i, r, o, a, l, h, c = []) {
            h = h || new se();
            let u = new je(e, t, h, i, r, c, []);
            u.options = l;
            let S = l.delay ? $(l.delay) : 0;
            u.currentTimeline.delayNextStep(S),
                u.currentTimeline.setStyles([o], null, u.errors, l),
                R(this, s, u);
            let y = u.timelines.filter((d) => d.containsAnimation());
            if (y.length && a.size) {
                let d;
                for (let g = y.length - 1; g >= 0; g--) {
                    let T = y[g];
                    if (T.element === t) {
                        d = T;
                        break;
                    }
                }
                d &&
                    !d.allowOnlyTimelineStyles() &&
                    d.setStyles([a], null, u.errors, l);
            }
            return y.length
                ? y.map((d) => d.buildKeyframes())
                : [lt(t, [], [], [], 0, S, '', !1)];
        }
        visitTrigger(e, t) {}
        visitState(e, t) {}
        visitTransition(e, t) {}
        visitAnimateChild(e, t) {
            let s = t.subInstructions.get(t.element);
            if (s) {
                let i = t.createSubContext(e.options),
                    r = t.currentTimeline.currentTime,
                    o = this._visitSubInstructions(s, i, i.options);
                r != o && t.transformIntoNewTimeline(o);
            }
            t.previousNode = e;
        }
        visitAnimateRef(e, t) {
            let s = t.createSubContext(e.options);
            s.transformIntoNewTimeline(),
                this._applyAnimationRefDelays(
                    [e.options, e.animation.options],
                    t,
                    s,
                ),
                this.visitReference(e.animation, s),
                t.transformIntoNewTimeline(s.currentTimeline.currentTime),
                (t.previousNode = e);
        }
        _applyAnimationRefDelays(e, t, s) {
            for (let i of e) {
                let r = i?.delay;
                if (r) {
                    let o =
                        typeof r == 'number'
                            ? r
                            : $(oe(r, i?.params ?? {}, t.errors));
                    s.delayNextStep(o);
                }
            }
        }
        _visitSubInstructions(e, t, s) {
            let r = t.currentTimeline.currentTime,
                o = s.duration != null ? $(s.duration) : null,
                a = s.delay != null ? $(s.delay) : null;
            return (
                o !== 0 &&
                    e.forEach((l) => {
                        let h = t.appendInstructionToTimeline(l, o, a);
                        r = Math.max(r, h.duration + h.delay);
                    }),
                r
            );
        }
        visitReference(e, t) {
            t.updateOptions(e.options, !0),
                R(this, e.animation, t),
                (t.previousNode = e);
        }
        visitSequence(e, t) {
            let s = t.subContextCount,
                i = t,
                r = e.options;
            if (
                r &&
                (r.params || r.delay) &&
                ((i = t.createSubContext(r)),
                i.transformIntoNewTimeline(),
                r.delay != null)
            ) {
                i.previousNode.type == _.Style &&
                    (i.currentTimeline.snapshotCurrentStyles(),
                    (i.previousNode = ve));
                let o = $(r.delay);
                i.delayNextStep(o);
            }
            e.steps.length &&
                (e.steps.forEach((o) => R(this, o, i)),
                i.currentTimeline.applyStylesToKeyframe(),
                i.subContextCount > s && i.transformIntoNewTimeline()),
                (t.previousNode = e);
        }
        visitGroup(e, t) {
            let s = [],
                i = t.currentTimeline.currentTime,
                r = e.options && e.options.delay ? $(e.options.delay) : 0;
            e.steps.forEach((o) => {
                let a = t.createSubContext(e.options);
                r && a.delayNextStep(r),
                    R(this, o, a),
                    (i = Math.max(i, a.currentTimeline.currentTime)),
                    s.push(a.currentTimeline);
            }),
                s.forEach((o) =>
                    t.currentTimeline.mergeTimelineCollectedStyles(o),
                ),
                t.transformIntoNewTimeline(i),
                (t.previousNode = e);
        }
        _visitTiming(e, t) {
            if (e.dynamic) {
                let s = e.strValue,
                    i = t.params ? oe(s, t.params, t.errors) : s;
                return Se(i, t.errors);
            } else
                return {
                    duration: e.duration,
                    delay: e.delay,
                    easing: e.easing,
                };
        }
        visitAnimate(e, t) {
            let s = (t.currentAnimateTimings = this._visitTiming(e.timings, t)),
                i = t.currentTimeline;
            s.delay && (t.incrementTime(s.delay), i.snapshotCurrentStyles());
            let r = e.style;
            r.type == _.Keyframes
                ? this.visitKeyframes(r, t)
                : (t.incrementTime(s.duration),
                  this.visitStyle(r, t),
                  i.applyStylesToKeyframe()),
                (t.currentAnimateTimings = null),
                (t.previousNode = e);
        }
        visitStyle(e, t) {
            let s = t.currentTimeline,
                i = t.currentAnimateTimings;
            !i && s.hasCurrentStyleProperties() && s.forwardFrame();
            let r = (i && i.easing) || e.easing;
            e.isEmptyStep
                ? s.applyEmptyStep(r)
                : s.setStyles(e.styles, r, t.errors, t.options),
                (t.previousNode = e);
        }
        visitKeyframes(e, t) {
            let s = t.currentAnimateTimings,
                i = t.currentTimeline.duration,
                r = s.duration,
                a = t.createSubContext().currentTimeline;
            (a.easing = s.easing),
                e.styles.forEach((l) => {
                    let h = l.offset || 0;
                    a.forwardTime(h * r),
                        a.setStyles(l.styles, l.easing, t.errors, t.options),
                        a.applyStylesToKeyframe();
                }),
                t.currentTimeline.mergeTimelineCollectedStyles(a),
                t.transformIntoNewTimeline(i + r),
                (t.previousNode = e);
        }
        visitQuery(e, t) {
            let s = t.currentTimeline.currentTime,
                i = e.options || {},
                r = i.delay ? $(i.delay) : 0;
            r &&
                (t.previousNode.type === _.Style ||
                    (s == 0 &&
                        t.currentTimeline.hasCurrentStyleProperties())) &&
                (t.currentTimeline.snapshotCurrentStyles(),
                (t.previousNode = ve));
            let o = s,
                a = t.invokeQuery(
                    e.selector,
                    e.originalSelector,
                    e.limit,
                    e.includeSelf,
                    !!i.optional,
                    t.errors,
                );
            t.currentQueryTotal = a.length;
            let l = null;
            a.forEach((h, c) => {
                t.currentQueryIndex = c;
                let u = t.createSubContext(e.options, h);
                r && u.delayNextStep(r),
                    h === t.element && (l = u.currentTimeline),
                    R(this, e.animation, u),
                    u.currentTimeline.applyStylesToKeyframe();
                let S = u.currentTimeline.currentTime;
                o = Math.max(o, S);
            }),
                (t.currentQueryIndex = 0),
                (t.currentQueryTotal = 0),
                t.transformIntoNewTimeline(o),
                l &&
                    (t.currentTimeline.mergeTimelineCollectedStyles(l),
                    t.currentTimeline.snapshotCurrentStyles()),
                (t.previousNode = e);
        }
        visitStagger(e, t) {
            let s = t.parentContext,
                i = t.currentTimeline,
                r = e.timings,
                o = Math.abs(r.duration),
                a = o * (t.currentQueryTotal - 1),
                l = o * t.currentQueryIndex;
            switch (r.duration < 0 ? 'reverse' : r.easing) {
                case 'reverse':
                    l = a - l;
                    break;
                case 'full':
                    l = s.currentStaggerTime;
                    break;
            }
            let c = t.currentTimeline;
            l && c.delayNextStep(l);
            let u = c.currentTime;
            R(this, e.animation, t),
                (t.previousNode = e),
                (s.currentStaggerTime =
                    i.currentTime -
                    u +
                    (i.startTime - s.currentTimeline.startTime));
        }
    },
    ve = {},
    je = class n {
        constructor(e, t, s, i, r, o, a, l) {
            (this._driver = e),
                (this.element = t),
                (this.subInstructions = s),
                (this._enterClassName = i),
                (this._leaveClassName = r),
                (this.errors = o),
                (this.timelines = a),
                (this.parentContext = null),
                (this.currentAnimateTimings = null),
                (this.previousNode = ve),
                (this.subContextCount = 0),
                (this.options = {}),
                (this.currentQueryIndex = 0),
                (this.currentQueryTotal = 0),
                (this.currentStaggerTime = 0),
                (this.currentTimeline = l || new Te(this._driver, t, 0)),
                a.push(this.currentTimeline);
        }
        get params() {
            return this.options.params;
        }
        updateOptions(e, t) {
            if (!e) return;
            let s = e,
                i = this.options;
            s.duration != null && (i.duration = $(s.duration)),
                s.delay != null && (i.delay = $(s.delay));
            let r = s.params;
            if (r) {
                let o = i.params;
                o || (o = this.options.params = {}),
                    Object.keys(r).forEach((a) => {
                        (!t || !o.hasOwnProperty(a)) &&
                            (o[a] = oe(r[a], o, this.errors));
                    });
            }
        }
        _copyOptions() {
            let e = {};
            if (this.options) {
                let t = this.options.params;
                if (t) {
                    let s = (e.params = {});
                    Object.keys(t).forEach((i) => {
                        s[i] = t[i];
                    });
                }
            }
            return e;
        }
        createSubContext(e = null, t, s) {
            let i = t || this.element,
                r = new n(
                    this._driver,
                    i,
                    this.subInstructions,
                    this._enterClassName,
                    this._leaveClassName,
                    this.errors,
                    this.timelines,
                    this.currentTimeline.fork(i, s || 0),
                );
            return (
                (r.previousNode = this.previousNode),
                (r.currentAnimateTimings = this.currentAnimateTimings),
                (r.options = this._copyOptions()),
                r.updateOptions(e),
                (r.currentQueryIndex = this.currentQueryIndex),
                (r.currentQueryTotal = this.currentQueryTotal),
                (r.parentContext = this),
                this.subContextCount++,
                r
            );
        }
        transformIntoNewTimeline(e) {
            return (
                (this.previousNode = ve),
                (this.currentTimeline = this.currentTimeline.fork(
                    this.element,
                    e,
                )),
                this.timelines.push(this.currentTimeline),
                this.currentTimeline
            );
        }
        appendInstructionToTimeline(e, t, s) {
            let i = {
                    duration: t ?? e.duration,
                    delay:
                        this.currentTimeline.currentTime + (s ?? 0) + e.delay,
                    easing: '',
                },
                r = new We(
                    this._driver,
                    e.element,
                    e.keyframes,
                    e.preStyleProps,
                    e.postStyleProps,
                    i,
                    e.stretchStartingKeyframe,
                );
            return this.timelines.push(r), i;
        }
        incrementTime(e) {
            this.currentTimeline.forwardTime(this.currentTimeline.duration + e);
        }
        delayNextStep(e) {
            e > 0 && this.currentTimeline.delayNextStep(e);
        }
        invokeQuery(e, t, s, i, r, o) {
            let a = [];
            if ((i && a.push(this.element), e.length > 0)) {
                (e = e.replace(xs, '.' + this._enterClassName)),
                    (e = e.replace(Js, '.' + this._leaveClassName));
                let l = s != 1,
                    h = this._driver.query(this.element, e, l);
                s !== 0 &&
                    (h =
                        s < 0
                            ? h.slice(h.length + s, h.length)
                            : h.slice(0, s)),
                    a.push(...h);
            }
            return !r && a.length == 0 && o.push(us(t)), a;
        }
    },
    Te = class n {
        constructor(e, t, s, i) {
            (this._driver = e),
                (this.element = t),
                (this.startTime = s),
                (this._elementTimelineStylesLookup = i),
                (this.duration = 0),
                (this.easing = null),
                (this._previousKeyframe = new Map()),
                (this._currentKeyframe = new Map()),
                (this._keyframes = new Map()),
                (this._styleSummary = new Map()),
                (this._localTimelineStyles = new Map()),
                (this._pendingStyles = new Map()),
                (this._backFill = new Map()),
                (this._currentEmptyStepKeyframe = null),
                this._elementTimelineStylesLookup ||
                    (this._elementTimelineStylesLookup = new Map()),
                (this._globalTimelineStyles =
                    this._elementTimelineStylesLookup.get(t)),
                this._globalTimelineStyles ||
                    ((this._globalTimelineStyles = this._localTimelineStyles),
                    this._elementTimelineStylesLookup.set(
                        t,
                        this._localTimelineStyles,
                    )),
                this._loadKeyframe();
        }
        containsAnimation() {
            switch (this._keyframes.size) {
                case 0:
                    return !1;
                case 1:
                    return this.hasCurrentStyleProperties();
                default:
                    return !0;
            }
        }
        hasCurrentStyleProperties() {
            return this._currentKeyframe.size > 0;
        }
        get currentTime() {
            return this.startTime + this.duration;
        }
        delayNextStep(e) {
            let t = this._keyframes.size === 1 && this._pendingStyles.size;
            this.duration || t
                ? (this.forwardTime(this.currentTime + e),
                  t && this.snapshotCurrentStyles())
                : (this.startTime += e);
        }
        fork(e, t) {
            return (
                this.applyStylesToKeyframe(),
                new n(
                    this._driver,
                    e,
                    t || this.currentTime,
                    this._elementTimelineStylesLookup,
                )
            );
        }
        _loadKeyframe() {
            this._currentKeyframe &&
                (this._previousKeyframe = this._currentKeyframe),
                (this._currentKeyframe = this._keyframes.get(this.duration)),
                this._currentKeyframe ||
                    ((this._currentKeyframe = new Map()),
                    this._keyframes.set(this.duration, this._currentKeyframe));
        }
        forwardFrame() {
            (this.duration += Ys), this._loadKeyframe();
        }
        forwardTime(e) {
            this.applyStylesToKeyframe(),
                (this.duration = e),
                this._loadKeyframe();
        }
        _updateStyle(e, t) {
            this._localTimelineStyles.set(e, t),
                this._globalTimelineStyles.set(e, t),
                this._styleSummary.set(e, { time: this.currentTime, value: t });
        }
        allowOnlyTimelineStyles() {
            return this._currentEmptyStepKeyframe !== this._currentKeyframe;
        }
        applyEmptyStep(e) {
            e && this._previousKeyframe.set('easing', e);
            for (let [t, s] of this._globalTimelineStyles)
                this._backFill.set(t, s || B), this._currentKeyframe.set(t, B);
            this._currentEmptyStepKeyframe = this._currentKeyframe;
        }
        setStyles(e, t, s, i) {
            t && this._previousKeyframe.set('easing', t);
            let r = (i && i.params) || {},
                o = ei(e, this._globalTimelineStyles);
            for (let [a, l] of o) {
                let h = oe(l, r, s);
                this._pendingStyles.set(a, h),
                    this._localTimelineStyles.has(a) ||
                        this._backFill.set(
                            a,
                            this._globalTimelineStyles.get(a) ?? B,
                        ),
                    this._updateStyle(a, h);
            }
        }
        applyStylesToKeyframe() {
            this._pendingStyles.size != 0 &&
                (this._pendingStyles.forEach((e, t) => {
                    this._currentKeyframe.set(t, e);
                }),
                this._pendingStyles.clear(),
                this._localTimelineStyles.forEach((e, t) => {
                    this._currentKeyframe.has(t) ||
                        this._currentKeyframe.set(t, e);
                }));
        }
        snapshotCurrentStyles() {
            for (let [e, t] of this._localTimelineStyles)
                this._pendingStyles.set(e, t), this._updateStyle(e, t);
        }
        getFinalKeyframe() {
            return this._keyframes.get(this.duration);
        }
        get properties() {
            let e = [];
            for (let t in this._currentKeyframe) e.push(t);
            return e;
        }
        mergeTimelineCollectedStyles(e) {
            e._styleSummary.forEach((t, s) => {
                let i = this._styleSummary.get(s);
                (!i || t.time > i.time) && this._updateStyle(s, t.value);
            });
        }
        buildKeyframes() {
            this.applyStylesToKeyframe();
            let e = new Set(),
                t = new Set(),
                s = this._keyframes.size === 1 && this.duration === 0,
                i = [];
            this._keyframes.forEach((a, l) => {
                let h = new Map([...this._backFill, ...a]);
                h.forEach((c, u) => {
                    c === ce ? e.add(u) : c === B && t.add(u);
                }),
                    s || h.set('offset', l / this.duration),
                    i.push(h);
            });
            let r = [...e.values()],
                o = [...t.values()];
            if (s) {
                let a = i[0],
                    l = new Map(a);
                a.set('offset', 0), l.set('offset', 1), (i = [a, l]);
            }
            return lt(
                this.element,
                i,
                r,
                o,
                this.duration,
                this.startTime,
                this.easing,
                !1,
            );
        }
    },
    We = class extends Te {
        constructor(e, t, s, i, r, o, a = !1) {
            super(e, t, o.delay),
                (this.keyframes = s),
                (this.preStyleProps = i),
                (this.postStyleProps = r),
                (this._stretchStartingKeyframe = a),
                (this.timings = {
                    duration: o.duration,
                    delay: o.delay,
                    easing: o.easing,
                });
        }
        containsAnimation() {
            return this.keyframes.length > 1;
        }
        buildKeyframes() {
            let e = this.keyframes,
                { delay: t, duration: s, easing: i } = this.timings;
            if (this._stretchStartingKeyframe && t) {
                let r = [],
                    o = s + t,
                    a = t / o,
                    l = new Map(e[0]);
                l.set('offset', 0), r.push(l);
                let h = new Map(e[0]);
                h.set('offset', At(a)), r.push(h);
                let c = e.length - 1;
                for (let u = 1; u <= c; u++) {
                    let S = new Map(e[u]),
                        y = S.get('offset'),
                        d = t + y * s;
                    S.set('offset', At(d / o)), r.push(S);
                }
                (s = o), (t = 0), (i = ''), (e = r);
            }
            return lt(
                this.element,
                e,
                this.preStyleProps,
                this.postStyleProps,
                s,
                t,
                i,
                !0,
            );
        }
    };
function At(n, e = 3) {
    let t = Math.pow(10, e - 1);
    return Math.round(n * t) / t;
}
function ei(n, e) {
    let t = new Map(),
        s;
    return (
        n.forEach((i) => {
            if (i === '*') {
                s ??= e.keys();
                for (let r of s) t.set(r, B);
            } else for (let [r, o] of i) t.set(r, o);
        }),
        t
    );
}
function Nt(n, e, t, s, i, r, o, a, l, h, c, u, S) {
    return {
        type: 0,
        element: n,
        triggerName: e,
        isRemovalTransition: i,
        fromState: t,
        fromStyles: r,
        toState: s,
        toStyles: o,
        timelines: a,
        queriedElements: l,
        preStyleProps: h,
        postStyleProps: c,
        totalTime: u,
        errors: S,
    };
}
var Fe = {},
    we = class {
        constructor(e, t, s) {
            (this._triggerName = e), (this.ast = t), (this._stateStyles = s);
        }
        match(e, t, s, i) {
            return ti(this.ast.matchers, e, t, s, i);
        }
        buildStyles(e, t, s) {
            let i = this._stateStyles.get('*');
            return (
                e !== void 0 && (i = this._stateStyles.get(e?.toString()) || i),
                i ? i.buildStyles(t, s) : new Map()
            );
        }
        build(e, t, s, i, r, o, a, l, h, c) {
            let u = [],
                S = (this.ast.options && this.ast.options.params) || Fe,
                y = (a && a.params) || Fe,
                d = this.buildStyles(s, y, u),
                g = (l && l.params) || Fe,
                T = this.buildStyles(i, g, u),
                b = new Set(),
                P = new Map(),
                M = new Map(),
                N = i === 'void',
                Z = { params: Vt(g, S), delay: this.ast.options?.delay },
                q = c ? [] : ht(e, t, this.ast.animation, r, o, d, T, Z, h, u),
                C = 0;
            return (
                q.forEach((k) => {
                    C = Math.max(k.duration + k.delay, C);
                }),
                u.length
                    ? Nt(
                          t,
                          this._triggerName,
                          s,
                          i,
                          N,
                          d,
                          T,
                          [],
                          [],
                          P,
                          M,
                          C,
                          u,
                      )
                    : (q.forEach((k) => {
                          let W = k.element,
                              J = O(P, W, new Set());
                          k.preStyleProps.forEach((G) => J.add(G));
                          let ct = O(M, W, new Set());
                          k.postStyleProps.forEach((G) => ct.add(G)),
                              W !== t && b.add(W);
                      }),
                      Nt(
                          t,
                          this._triggerName,
                          s,
                          i,
                          N,
                          d,
                          T,
                          q,
                          [...b.values()],
                          P,
                          M,
                          C,
                      ))
            );
        }
    };
function ti(n, e, t, s, i) {
    return n.some((r) => r(e, t, s, i));
}
function Vt(n, e) {
    let t = ue({}, e);
    return (
        Object.entries(n).forEach(([s, i]) => {
            i != null && (t[s] = i);
        }),
        t
    );
}
var Ge = class {
    constructor(e, t, s) {
        (this.styles = e), (this.defaultParams = t), (this.normalizer = s);
    }
    buildStyles(e, t) {
        let s = new Map(),
            i = Vt(e, this.defaultParams);
        return (
            this.styles.styles.forEach((r) => {
                typeof r != 'string' &&
                    r.forEach((o, a) => {
                        o && (o = oe(o, i, t));
                        let l = this.normalizer.normalizePropertyName(a, t);
                        (o = this.normalizer.normalizeStyleValue(a, l, o, t)),
                            s.set(a, o);
                    });
            }),
            s
        );
    }
};
function si(n, e, t) {
    return new He(n, e, t);
}
var He = class {
    constructor(e, t, s) {
        (this.name = e),
            (this.ast = t),
            (this._normalizer = s),
            (this.transitionFactories = []),
            (this.states = new Map()),
            t.states.forEach((i) => {
                let r = (i.options && i.options.params) || {};
                this.states.set(i.name, new Ge(i.style, r, s));
            }),
            Dt(this.states, 'true', '1'),
            Dt(this.states, 'false', '0'),
            t.transitions.forEach((i) => {
                this.transitionFactories.push(new we(e, i, this.states));
            }),
            (this.fallbackTransition = ii(e, this.states, this._normalizer));
    }
    get containsQueries() {
        return this.ast.queryCount > 0;
    }
    matchTransition(e, t, s, i) {
        return (
            this.transitionFactories.find((o) => o.match(e, t, s, i)) || null
        );
    }
    matchStyles(e, t, s) {
        return this.fallbackTransition.buildStyles(e, t, s);
    }
};
function ii(n, e, t) {
    let s = [(o, a) => !0],
        i = { type: _.Sequence, steps: [], options: null },
        r = {
            type: _.Transition,
            animation: i,
            matchers: s,
            options: null,
            queryCount: 0,
            depCount: 0,
        };
    return new we(n, r, e);
}
function Dt(n, e, t) {
    n.has(e) ? n.has(t) || n.set(t, n.get(e)) : n.has(t) && n.set(e, n.get(t));
}
var ni = new se(),
    Ye = class {
        constructor(e, t, s) {
            (this.bodyNode = e),
                (this._driver = t),
                (this._normalizer = s),
                (this._animations = new Map()),
                (this._playersById = new Map()),
                (this.players = []);
        }
        register(e, t) {
            let s = [],
                i = [],
                r = at(this._driver, t, s, i);
            if (s.length) throw ys(s);
            i.length && void 0, this._animations.set(e, r);
        }
        _buildPlayer(e, t, s) {
            let i = e.element,
                r = It(this._normalizer, e.keyframes, t, s);
            return this._driver.animate(
                i,
                r,
                e.duration,
                e.delay,
                e.easing,
                [],
                !0,
            );
        }
        create(e, t, s = {}) {
            let i = [],
                r = this._animations.get(e),
                o,
                a = new Map();
            if (
                (r
                    ? ((o = ht(
                          this._driver,
                          t,
                          r,
                          nt,
                          ye,
                          new Map(),
                          new Map(),
                          s,
                          ni,
                          i,
                      )),
                      o.forEach((c) => {
                          let u = O(a, c.element, new Map());
                          c.postStyleProps.forEach((S) => u.set(S, null));
                      }))
                    : (i.push(_s()), (o = [])),
                i.length)
            )
                throw Ss(i);
            a.forEach((c, u) => {
                c.forEach((S, y) => {
                    c.set(y, this._driver.computeStyle(u, y, B));
                });
            });
            let l = o.map((c) => {
                    let u = a.get(c.element);
                    return this._buildPlayer(c, new Map(), u);
                }),
                h = j(l);
            return (
                this._playersById.set(e, h),
                h.onDestroy(() => this.destroy(e)),
                this.players.push(h),
                h
            );
        }
        destroy(e) {
            let t = this._getPlayer(e);
            t.destroy(), this._playersById.delete(e);
            let s = this.players.indexOf(t);
            s >= 0 && this.players.splice(s, 1);
        }
        _getPlayer(e) {
            let t = this._playersById.get(e);
            if (!t) throw Es(e);
            return t;
        }
        listen(e, t, s, i) {
            let r = st(t, '', '', '');
            return tt(this._getPlayer(e), s, r, i), () => {};
        }
        command(e, t, s, i) {
            if (s == 'register') {
                this.register(e, i[0]);
                return;
            }
            if (s == 'create') {
                let o = i[0] || {};
                this.create(e, t, o);
                return;
            }
            let r = this._getPlayer(e);
            switch (s) {
                case 'play':
                    r.play();
                    break;
                case 'pause':
                    r.pause();
                    break;
                case 'reset':
                    r.reset();
                    break;
                case 'restart':
                    r.restart();
                    break;
                case 'finish':
                    r.finish();
                    break;
                case 'init':
                    r.init();
                    break;
                case 'setPosition':
                    r.setPosition(parseFloat(i[0]));
                    break;
                case 'destroy':
                    this.destroy(e);
                    break;
            }
        }
    },
    Mt = 'ng-animate-queued',
    ri = '.ng-animate-queued',
    Re = 'ng-animate-disabled',
    oi = '.ng-animate-disabled',
    ai = 'ng-star-inserted',
    li = '.ng-star-inserted',
    hi = [],
    Ut = {
        namespaceId: '',
        setForRemoval: !1,
        setForMove: !1,
        hasAnimation: !1,
        removedBeforeQueried: !1,
    },
    ui = {
        namespaceId: '',
        setForMove: !1,
        setForRemoval: !1,
        hasAnimation: !1,
        removedBeforeQueried: !0,
    },
    K = '__ng_removed',
    ae = class {
        get params() {
            return this.options.params;
        }
        constructor(e, t = '') {
            this.namespaceId = t;
            let s = e && e.hasOwnProperty('value'),
                i = s ? e.value : e;
            if (((this.value = fi(i)), s)) {
                let r = e,
                    { value: o } = r,
                    a = pt(r, ['value']);
                this.options = a;
            } else this.options = {};
            this.options.params || (this.options.params = {});
        }
        absorbOptions(e) {
            let t = e.params;
            if (t) {
                let s = this.options.params;
                Object.keys(t).forEach((i) => {
                    s[i] == null && (s[i] = t[i]);
                });
            }
        }
    },
    re = 'void',
    Oe = new ae(re),
    Xe = class {
        constructor(e, t, s) {
            (this.id = e),
                (this.hostElement = t),
                (this._engine = s),
                (this.players = []),
                (this._triggers = new Map()),
                (this._queue = []),
                (this._elementListeners = new Map()),
                (this._hostClassName = 'ng-tns-' + e),
                I(t, this._hostClassName);
        }
        listen(e, t, s, i) {
            if (!this._triggers.has(t)) throw vs(s, t);
            if (s == null || s.length == 0) throw Ts(t);
            if (!di(s)) throw ws(s, t);
            let r = O(this._elementListeners, e, []),
                o = { name: t, phase: s, callback: i };
            r.push(o);
            let a = O(this._engine.statesByElement, e, new Map());
            return (
                a.has(t) || (I(e, fe), I(e, fe + '-' + t), a.set(t, Oe)),
                () => {
                    this._engine.afterFlush(() => {
                        let l = r.indexOf(o);
                        l >= 0 && r.splice(l, 1),
                            this._triggers.has(t) || a.delete(t);
                    });
                }
            );
        }
        register(e, t) {
            return this._triggers.has(e) ? !1 : (this._triggers.set(e, t), !0);
        }
        _getTrigger(e) {
            let t = this._triggers.get(e);
            if (!t) throw bs(e);
            return t;
        }
        trigger(e, t, s, i = !0) {
            let r = this._getTrigger(t),
                o = new le(this.id, t, e),
                a = this._engine.statesByElement.get(e);
            a ||
                (I(e, fe),
                I(e, fe + '-' + t),
                this._engine.statesByElement.set(e, (a = new Map())));
            let l = a.get(t),
                h = new ae(s, this.id);
            if (
                (!(s && s.hasOwnProperty('value')) &&
                    l &&
                    h.absorbOptions(l.options),
                a.set(t, h),
                l || (l = Oe),
                !(h.value === re) && l.value === h.value)
            ) {
                if (!gi(l.params, h.params)) {
                    let g = [],
                        T = r.matchStyles(l.value, l.params, g),
                        b = r.matchStyles(h.value, h.params, g);
                    g.length
                        ? this._engine.reportError(g)
                        : this._engine.afterFlush(() => {
                              x(e, T), Q(e, b);
                          });
                }
                return;
            }
            let S = O(this._engine.playersByElement, e, []);
            S.forEach((g) => {
                g.namespaceId == this.id &&
                    g.triggerName == t &&
                    g.queued &&
                    g.destroy();
            });
            let y = r.matchTransition(l.value, h.value, e, h.params),
                d = !1;
            if (!y) {
                if (!i) return;
                (y = r.fallbackTransition), (d = !0);
            }
            return (
                this._engine.totalQueuedPlayers++,
                this._queue.push({
                    element: e,
                    triggerName: t,
                    transition: y,
                    fromState: l,
                    toState: h,
                    player: o,
                    isFallbackTransition: d,
                }),
                d ||
                    (I(e, Mt),
                    o.onStart(() => {
                        ee(e, Mt);
                    })),
                o.onDone(() => {
                    let g = this.players.indexOf(o);
                    g >= 0 && this.players.splice(g, 1);
                    let T = this._engine.playersByElement.get(e);
                    if (T) {
                        let b = T.indexOf(o);
                        b >= 0 && T.splice(b, 1);
                    }
                }),
                this.players.push(o),
                S.push(o),
                o
            );
        }
        deregister(e) {
            this._triggers.delete(e),
                this._engine.statesByElement.forEach((t) => t.delete(e)),
                this._elementListeners.forEach((t, s) => {
                    this._elementListeners.set(
                        s,
                        t.filter((i) => i.name != e),
                    );
                });
        }
        clearElementCache(e) {
            this._engine.statesByElement.delete(e),
                this._elementListeners.delete(e);
            let t = this._engine.playersByElement.get(e);
            t &&
                (t.forEach((s) => s.destroy()),
                this._engine.playersByElement.delete(e));
        }
        _signalRemovalForInnerTriggers(e, t) {
            let s = this._engine.driver.query(e, _e, !0);
            s.forEach((i) => {
                if (i[K]) return;
                let r = this._engine.fetchNamespacesByElement(i);
                r.size
                    ? r.forEach((o) => o.triggerLeaveAnimation(i, t, !1, !0))
                    : this.clearElementCache(i);
            }),
                this._engine.afterFlushAnimationsDone(() =>
                    s.forEach((i) => this.clearElementCache(i)),
                );
        }
        triggerLeaveAnimation(e, t, s, i) {
            let r = this._engine.statesByElement.get(e),
                o = new Map();
            if (r) {
                let a = [];
                if (
                    (r.forEach((l, h) => {
                        if ((o.set(h, l.value), this._triggers.has(h))) {
                            let c = this.trigger(e, h, re, i);
                            c && a.push(c);
                        }
                    }),
                    a.length)
                )
                    return (
                        this._engine.markElementAsRemoved(this.id, e, !0, t, o),
                        s &&
                            j(a).onDone(() => this._engine.processLeaveNode(e)),
                        !0
                    );
            }
            return !1;
        }
        prepareLeaveAnimationListeners(e) {
            let t = this._elementListeners.get(e),
                s = this._engine.statesByElement.get(e);
            if (t && s) {
                let i = new Set();
                t.forEach((r) => {
                    let o = r.name;
                    if (i.has(o)) return;
                    i.add(o);
                    let l = this._triggers.get(o).fallbackTransition,
                        h = s.get(o) || Oe,
                        c = new ae(re),
                        u = new le(this.id, o, e);
                    this._engine.totalQueuedPlayers++,
                        this._queue.push({
                            element: e,
                            triggerName: o,
                            transition: l,
                            fromState: h,
                            toState: c,
                            player: u,
                            isFallbackTransition: !0,
                        });
                });
            }
        }
        removeNode(e, t) {
            let s = this._engine;
            if (
                (e.childElementCount &&
                    this._signalRemovalForInnerTriggers(e, t),
                this.triggerLeaveAnimation(e, t, !0))
            )
                return;
            let i = !1;
            if (s.totalAnimations) {
                let r = s.players.length
                    ? s.playersByQueriedElement.get(e)
                    : [];
                if (r && r.length) i = !0;
                else {
                    let o = e;
                    for (; (o = o.parentNode); )
                        if (s.statesByElement.get(o)) {
                            i = !0;
                            break;
                        }
                }
            }
            if ((this.prepareLeaveAnimationListeners(e), i))
                s.markElementAsRemoved(this.id, e, !1, t);
            else {
                let r = e[K];
                (!r || r === Ut) &&
                    (s.afterFlush(() => this.clearElementCache(e)),
                    s.destroyInnerAnimations(e),
                    s._onRemovalComplete(e, t));
            }
        }
        insertNode(e, t) {
            I(e, this._hostClassName);
        }
        drainQueuedTransitions(e) {
            let t = [];
            return (
                this._queue.forEach((s) => {
                    let i = s.player;
                    if (i.destroyed) return;
                    let r = s.element,
                        o = this._elementListeners.get(r);
                    o &&
                        o.forEach((a) => {
                            if (a.name == s.triggerName) {
                                let l = st(
                                    r,
                                    s.triggerName,
                                    s.fromState.value,
                                    s.toState.value,
                                );
                                (l._data = e),
                                    tt(s.player, a.phase, l, a.callback);
                            }
                        }),
                        i.markedForDestroy
                            ? this._engine.afterFlush(() => {
                                  i.destroy();
                              })
                            : t.push(s);
                }),
                (this._queue = []),
                t.sort((s, i) => {
                    let r = s.transition.ast.depCount,
                        o = i.transition.ast.depCount;
                    return r == 0 || o == 0
                        ? r - o
                        : this._engine.driver.containsElement(
                                s.element,
                                i.element,
                            )
                          ? 1
                          : -1;
                })
            );
        }
        destroy(e) {
            this.players.forEach((t) => t.destroy()),
                this._signalRemovalForInnerTriggers(this.hostElement, e);
        }
    },
    xe = class {
        _onRemovalComplete(e, t) {
            this.onRemovalComplete(e, t);
        }
        constructor(e, t, s, i) {
            (this.bodyNode = e),
                (this.driver = t),
                (this._normalizer = s),
                (this.scheduler = i),
                (this.players = []),
                (this.newHostElements = new Map()),
                (this.playersByElement = new Map()),
                (this.playersByQueriedElement = new Map()),
                (this.statesByElement = new Map()),
                (this.disabledNodes = new Set()),
                (this.totalAnimations = 0),
                (this.totalQueuedPlayers = 0),
                (this._namespaceLookup = {}),
                (this._namespaceList = []),
                (this._flushFns = []),
                (this._whenQuietFns = []),
                (this.namespacesByHostElement = new Map()),
                (this.collectedEnterElements = []),
                (this.collectedLeaveElements = []),
                (this.onRemovalComplete = (r, o) => {});
        }
        get queuedPlayers() {
            let e = [];
            return (
                this._namespaceList.forEach((t) => {
                    t.players.forEach((s) => {
                        s.queued && e.push(s);
                    });
                }),
                e
            );
        }
        createNamespace(e, t) {
            let s = new Xe(e, t, this);
            return (
                this.bodyNode && this.driver.containsElement(this.bodyNode, t)
                    ? this._balanceNamespaceList(s, t)
                    : (this.newHostElements.set(t, s),
                      this.collectEnterElement(t)),
                (this._namespaceLookup[e] = s)
            );
        }
        _balanceNamespaceList(e, t) {
            let s = this._namespaceList,
                i = this.namespacesByHostElement;
            if (s.length - 1 >= 0) {
                let o = !1,
                    a = this.driver.getParentElement(t);
                for (; a; ) {
                    let l = i.get(a);
                    if (l) {
                        let h = s.indexOf(l);
                        s.splice(h + 1, 0, e), (o = !0);
                        break;
                    }
                    a = this.driver.getParentElement(a);
                }
                o || s.unshift(e);
            } else s.push(e);
            return i.set(t, e), e;
        }
        register(e, t) {
            let s = this._namespaceLookup[e];
            return s || (s = this.createNamespace(e, t)), s;
        }
        registerTrigger(e, t, s) {
            let i = this._namespaceLookup[e];
            i && i.register(t, s) && this.totalAnimations++;
        }
        destroy(e, t) {
            e &&
                (this.afterFlush(() => {}),
                this.afterFlushAnimationsDone(() => {
                    let s = this._fetchNamespace(e);
                    this.namespacesByHostElement.delete(s.hostElement);
                    let i = this._namespaceList.indexOf(s);
                    i >= 0 && this._namespaceList.splice(i, 1),
                        s.destroy(t),
                        delete this._namespaceLookup[e];
                }));
        }
        _fetchNamespace(e) {
            return this._namespaceLookup[e];
        }
        fetchNamespacesByElement(e) {
            let t = new Set(),
                s = this.statesByElement.get(e);
            if (s) {
                for (let i of s.values())
                    if (i.namespaceId) {
                        let r = this._fetchNamespace(i.namespaceId);
                        r && t.add(r);
                    }
            }
            return t;
        }
        trigger(e, t, s, i) {
            if (pe(t)) {
                let r = this._fetchNamespace(e);
                if (r) return r.trigger(t, s, i), !0;
            }
            return !1;
        }
        insertNode(e, t, s, i) {
            if (!pe(t)) return;
            let r = t[K];
            if (r && r.setForRemoval) {
                (r.setForRemoval = !1), (r.setForMove = !0);
                let o = this.collectedLeaveElements.indexOf(t);
                o >= 0 && this.collectedLeaveElements.splice(o, 1);
            }
            if (e) {
                let o = this._fetchNamespace(e);
                o && o.insertNode(t, s);
            }
            i && this.collectEnterElement(t);
        }
        collectEnterElement(e) {
            this.collectedEnterElements.push(e);
        }
        markElementAsDisabled(e, t) {
            t
                ? this.disabledNodes.has(e) ||
                  (this.disabledNodes.add(e), I(e, Re))
                : this.disabledNodes.has(e) &&
                  (this.disabledNodes.delete(e), ee(e, Re));
        }
        removeNode(e, t, s) {
            if (pe(t)) {
                this.scheduler?.notify();
                let i = e ? this._fetchNamespace(e) : null;
                i ? i.removeNode(t, s) : this.markElementAsRemoved(e, t, !1, s);
                let r = this.namespacesByHostElement.get(t);
                r && r.id !== e && r.removeNode(t, s);
            } else this._onRemovalComplete(t, s);
        }
        markElementAsRemoved(e, t, s, i, r) {
            this.collectedLeaveElements.push(t),
                (t[K] = {
                    namespaceId: e,
                    setForRemoval: i,
                    hasAnimation: s,
                    removedBeforeQueried: !1,
                    previousTriggersValues: r,
                });
        }
        listen(e, t, s, i, r) {
            return pe(t)
                ? this._fetchNamespace(e).listen(t, s, i, r)
                : () => {};
        }
        _buildInstruction(e, t, s, i, r) {
            return e.transition.build(
                this.driver,
                e.element,
                e.fromState.value,
                e.toState.value,
                s,
                i,
                e.fromState.options,
                e.toState.options,
                t,
                r,
            );
        }
        destroyInnerAnimations(e) {
            let t = this.driver.query(e, _e, !0);
            t.forEach((s) => this.destroyActiveAnimationsForElement(s)),
                this.playersByQueriedElement.size != 0 &&
                    ((t = this.driver.query(e, qe, !0)),
                    t.forEach((s) =>
                        this.finishActiveQueriedAnimationOnElement(s),
                    ));
        }
        destroyActiveAnimationsForElement(e) {
            let t = this.playersByElement.get(e);
            t &&
                t.forEach((s) => {
                    s.queued ? (s.markedForDestroy = !0) : s.destroy();
                });
        }
        finishActiveQueriedAnimationOnElement(e) {
            let t = this.playersByQueriedElement.get(e);
            t && t.forEach((s) => s.finish());
        }
        whenRenderingDone() {
            return new Promise((e) => {
                if (this.players.length)
                    return j(this.players).onDone(() => e());
                e();
            });
        }
        processLeaveNode(e) {
            let t = e[K];
            if (t && t.setForRemoval) {
                if (((e[K] = Ut), t.namespaceId)) {
                    this.destroyInnerAnimations(e);
                    let s = this._fetchNamespace(t.namespaceId);
                    s && s.clearElementCache(e);
                }
                this._onRemovalComplete(e, t.setForRemoval);
            }
            e.classList?.contains(Re) && this.markElementAsDisabled(e, !1),
                this.driver.query(e, oi, !0).forEach((s) => {
                    this.markElementAsDisabled(s, !1);
                });
        }
        flush(e = -1) {
            let t = [];
            if (
                (this.newHostElements.size &&
                    (this.newHostElements.forEach((s, i) =>
                        this._balanceNamespaceList(s, i),
                    ),
                    this.newHostElements.clear()),
                this.totalAnimations && this.collectedEnterElements.length)
            )
                for (let s = 0; s < this.collectedEnterElements.length; s++) {
                    let i = this.collectedEnterElements[s];
                    I(i, ai);
                }
            if (
                this._namespaceList.length &&
                (this.totalQueuedPlayers || this.collectedLeaveElements.length)
            ) {
                let s = [];
                try {
                    t = this._flushAnimations(s, e);
                } finally {
                    for (let i = 0; i < s.length; i++) s[i]();
                }
            } else
                for (let s = 0; s < this.collectedLeaveElements.length; s++) {
                    let i = this.collectedLeaveElements[s];
                    this.processLeaveNode(i);
                }
            if (
                ((this.totalQueuedPlayers = 0),
                (this.collectedEnterElements.length = 0),
                (this.collectedLeaveElements.length = 0),
                this._flushFns.forEach((s) => s()),
                (this._flushFns = []),
                this._whenQuietFns.length)
            ) {
                let s = this._whenQuietFns;
                (this._whenQuietFns = []),
                    t.length
                        ? j(t).onDone(() => {
                              s.forEach((i) => i());
                          })
                        : s.forEach((i) => i());
            }
        }
        reportError(e) {
            throw Ps(e);
        }
        _flushAnimations(e, t) {
            let s = new se(),
                i = [],
                r = new Map(),
                o = [],
                a = new Map(),
                l = new Map(),
                h = new Map(),
                c = new Set();
            this.disabledNodes.forEach((f) => {
                c.add(f);
                let m = this.driver.query(f, ri, !0);
                for (let p = 0; p < m.length; p++) c.add(m[p]);
            });
            let u = this.bodyNode,
                S = Array.from(this.statesByElement.keys()),
                y = Ft(S, this.collectedEnterElements),
                d = new Map(),
                g = 0;
            y.forEach((f, m) => {
                let p = nt + g++;
                d.set(m, p), f.forEach((v) => I(v, p));
            });
            let T = [],
                b = new Set(),
                P = new Set();
            for (let f = 0; f < this.collectedLeaveElements.length; f++) {
                let m = this.collectedLeaveElements[f],
                    p = m[K];
                p &&
                    p.setForRemoval &&
                    (T.push(m),
                    b.add(m),
                    p.hasAnimation
                        ? this.driver.query(m, li, !0).forEach((v) => b.add(v))
                        : P.add(m));
            }
            let M = new Map(),
                N = Ft(S, Array.from(b));
            N.forEach((f, m) => {
                let p = ye + g++;
                M.set(m, p), f.forEach((v) => I(v, p));
            }),
                e.push(() => {
                    y.forEach((f, m) => {
                        let p = d.get(m);
                        f.forEach((v) => ee(v, p));
                    }),
                        N.forEach((f, m) => {
                            let p = M.get(m);
                            f.forEach((v) => ee(v, p));
                        }),
                        T.forEach((f) => {
                            this.processLeaveNode(f);
                        });
                });
            let Z = [],
                q = [];
            for (let f = this._namespaceList.length - 1; f >= 0; f--)
                this._namespaceList[f]
                    .drainQueuedTransitions(t)
                    .forEach((p) => {
                        let v = p.player,
                            A = p.element;
                        if ((Z.push(v), this.collectedEnterElements.length)) {
                            let D = A[K];
                            if (D && D.setForMove) {
                                if (
                                    D.previousTriggersValues &&
                                    D.previousTriggersValues.has(p.triggerName)
                                ) {
                                    let H = D.previousTriggersValues.get(
                                            p.triggerName,
                                        ),
                                        L = this.statesByElement.get(p.element);
                                    if (L && L.has(p.triggerName)) {
                                        let he = L.get(p.triggerName);
                                        (he.value = H),
                                            L.set(p.triggerName, he);
                                    }
                                }
                                v.destroy();
                                return;
                            }
                        }
                        let z = !u || !this.driver.containsElement(u, A),
                            F = M.get(A),
                            V = d.get(A),
                            w = this._buildInstruction(p, s, V, F, z);
                        if (w.errors && w.errors.length) {
                            q.push(w);
                            return;
                        }
                        if (z) {
                            v.onStart(() => x(A, w.fromStyles)),
                                v.onDestroy(() => Q(A, w.toStyles)),
                                i.push(v);
                            return;
                        }
                        if (p.isFallbackTransition) {
                            v.onStart(() => x(A, w.fromStyles)),
                                v.onDestroy(() => Q(A, w.toStyles)),
                                i.push(v);
                            return;
                        }
                        let mt = [];
                        w.timelines.forEach((D) => {
                            (D.stretchStartingKeyframe = !0),
                                this.disabledNodes.has(D.element) || mt.push(D);
                        }),
                            (w.timelines = mt),
                            s.append(A, w.timelines);
                        let Gt = { instruction: w, player: v, element: A };
                        o.push(Gt),
                            w.queriedElements.forEach((D) =>
                                O(a, D, []).push(v),
                            ),
                            w.preStyleProps.forEach((D, H) => {
                                if (D.size) {
                                    let L = l.get(H);
                                    L || l.set(H, (L = new Set())),
                                        D.forEach((he, De) => L.add(De));
                                }
                            }),
                            w.postStyleProps.forEach((D, H) => {
                                let L = h.get(H);
                                L || h.set(H, (L = new Set())),
                                    D.forEach((he, De) => L.add(De));
                            });
                    });
            if (q.length) {
                let f = [];
                q.forEach((m) => {
                    f.push(As(m.triggerName, m.errors));
                }),
                    Z.forEach((m) => m.destroy()),
                    this.reportError(f);
            }
            let C = new Map(),
                k = new Map();
            o.forEach((f) => {
                let m = f.element;
                s.has(m) &&
                    (k.set(m, m),
                    this._beforeAnimationBuild(
                        f.player.namespaceId,
                        f.instruction,
                        C,
                    ));
            }),
                i.forEach((f) => {
                    let m = f.element;
                    this._getPreviousPlayers(
                        m,
                        !1,
                        f.namespaceId,
                        f.triggerName,
                        null,
                    ).forEach((v) => {
                        O(C, m, []).push(v), v.destroy();
                    });
                });
            let W = T.filter((f) => Rt(f, l, h)),
                J = new Map();
            kt(J, this.driver, P, h, B).forEach((f) => {
                Rt(f, l, h) && W.push(f);
            });
            let G = new Map();
            y.forEach((f, m) => {
                kt(G, this.driver, new Set(f), l, ce);
            }),
                W.forEach((f) => {
                    let m = J.get(f),
                        p = G.get(f);
                    J.set(
                        f,
                        new Map([
                            ...(m?.entries() ?? []),
                            ...(p?.entries() ?? []),
                        ]),
                    );
                });
            let Ne = [],
                ft = [],
                dt = {};
            o.forEach((f) => {
                let { element: m, player: p, instruction: v } = f;
                if (s.has(m)) {
                    if (c.has(m)) {
                        p.onDestroy(() => Q(m, v.toStyles)),
                            (p.disabled = !0),
                            p.overrideTotalTime(v.totalTime),
                            i.push(p);
                        return;
                    }
                    let A = dt;
                    if (k.size > 1) {
                        let F = m,
                            V = [];
                        for (; (F = F.parentNode); ) {
                            let w = k.get(F);
                            if (w) {
                                A = w;
                                break;
                            }
                            V.push(F);
                        }
                        V.forEach((w) => k.set(w, A));
                    }
                    let z = this._buildAnimation(p.namespaceId, v, C, r, G, J);
                    if ((p.setRealPlayer(z), A === dt)) Ne.push(p);
                    else {
                        let F = this.playersByElement.get(A);
                        F && F.length && (p.parentPlayer = j(F)), i.push(p);
                    }
                } else
                    x(m, v.fromStyles),
                        p.onDestroy(() => Q(m, v.toStyles)),
                        ft.push(p),
                        c.has(m) && i.push(p);
            }),
                ft.forEach((f) => {
                    let m = r.get(f.element);
                    if (m && m.length) {
                        let p = j(m);
                        f.setRealPlayer(p);
                    }
                }),
                i.forEach((f) => {
                    f.parentPlayer
                        ? f.syncPlayerEvents(f.parentPlayer)
                        : f.destroy();
                });
            for (let f = 0; f < T.length; f++) {
                let m = T[f],
                    p = m[K];
                if ((ee(m, ye), p && p.hasAnimation)) continue;
                let v = [];
                if (a.size) {
                    let z = a.get(m);
                    z && z.length && v.push(...z);
                    let F = this.driver.query(m, qe, !0);
                    for (let V = 0; V < F.length; V++) {
                        let w = a.get(F[V]);
                        w && w.length && v.push(...w);
                    }
                }
                let A = v.filter((z) => !z.destroyed);
                A.length ? mi(this, m, A) : this.processLeaveNode(m);
            }
            return (
                (T.length = 0),
                Ne.forEach((f) => {
                    this.players.push(f),
                        f.onDone(() => {
                            f.destroy();
                            let m = this.players.indexOf(f);
                            this.players.splice(m, 1);
                        }),
                        f.play();
                }),
                Ne
            );
        }
        afterFlush(e) {
            this._flushFns.push(e);
        }
        afterFlushAnimationsDone(e) {
            this._whenQuietFns.push(e);
        }
        _getPreviousPlayers(e, t, s, i, r) {
            let o = [];
            if (t) {
                let a = this.playersByQueriedElement.get(e);
                a && (o = a);
            } else {
                let a = this.playersByElement.get(e);
                if (a) {
                    let l = !r || r == re;
                    a.forEach((h) => {
                        h.queued || (!l && h.triggerName != i) || o.push(h);
                    });
                }
            }
            return (
                (s || i) &&
                    (o = o.filter(
                        (a) =>
                            !(
                                (s && s != a.namespaceId) ||
                                (i && i != a.triggerName)
                            ),
                    )),
                o
            );
        }
        _beforeAnimationBuild(e, t, s) {
            let i = t.triggerName,
                r = t.element,
                o = t.isRemovalTransition ? void 0 : e,
                a = t.isRemovalTransition ? void 0 : i;
            for (let l of t.timelines) {
                let h = l.element,
                    c = h !== r,
                    u = O(s, h, []);
                this._getPreviousPlayers(h, c, o, a, t.toState).forEach((y) => {
                    let d = y.getRealPlayer();
                    d.beforeDestroy && d.beforeDestroy(),
                        y.destroy(),
                        u.push(y);
                });
            }
            x(r, t.fromStyles);
        }
        _buildAnimation(e, t, s, i, r, o) {
            let a = t.triggerName,
                l = t.element,
                h = [],
                c = new Set(),
                u = new Set(),
                S = t.timelines.map((d) => {
                    let g = d.element;
                    c.add(g);
                    let T = g[K];
                    if (T && T.removedBeforeQueried)
                        return new U(d.duration, d.delay);
                    let b = g !== l,
                        P = pi(
                            (s.get(g) || hi).map((C) => C.getRealPlayer()),
                        ).filter((C) => {
                            let k = C;
                            return k.element ? k.element === g : !1;
                        }),
                        M = r.get(g),
                        N = o.get(g),
                        Z = It(this._normalizer, d.keyframes, M, N),
                        q = this._buildPlayer(d, Z, P);
                    if ((d.subTimeline && i && u.add(g), b)) {
                        let C = new le(e, a, g);
                        C.setRealPlayer(q), h.push(C);
                    }
                    return q;
                });
            h.forEach((d) => {
                O(this.playersByQueriedElement, d.element, []).push(d),
                    d.onDone(() =>
                        ci(this.playersByQueriedElement, d.element, d),
                    );
            }),
                c.forEach((d) => I(d, Tt));
            let y = j(S);
            return (
                y.onDestroy(() => {
                    c.forEach((d) => ee(d, Tt)), Q(l, t.toStyles);
                }),
                u.forEach((d) => {
                    O(i, d, []).push(y);
                }),
                y
            );
        }
        _buildPlayer(e, t, s) {
            return t.length > 0
                ? this.driver.animate(
                      e.element,
                      t,
                      e.duration,
                      e.delay,
                      e.easing,
                      s,
                  )
                : new U(e.duration, e.delay);
        }
    },
    le = class {
        constructor(e, t, s) {
            (this.namespaceId = e),
                (this.triggerName = t),
                (this.element = s),
                (this._player = new U()),
                (this._containsRealPlayer = !1),
                (this._queuedCallbacks = new Map()),
                (this.destroyed = !1),
                (this.parentPlayer = null),
                (this.markedForDestroy = !1),
                (this.disabled = !1),
                (this.queued = !0),
                (this.totalTime = 0);
        }
        setRealPlayer(e) {
            this._containsRealPlayer ||
                ((this._player = e),
                this._queuedCallbacks.forEach((t, s) => {
                    t.forEach((i) => tt(e, s, void 0, i));
                }),
                this._queuedCallbacks.clear(),
                (this._containsRealPlayer = !0),
                this.overrideTotalTime(e.totalTime),
                (this.queued = !1));
        }
        getRealPlayer() {
            return this._player;
        }
        overrideTotalTime(e) {
            this.totalTime = e;
        }
        syncPlayerEvents(e) {
            let t = this._player;
            t.triggerCallback && e.onStart(() => t.triggerCallback('start')),
                e.onDone(() => this.finish()),
                e.onDestroy(() => this.destroy());
        }
        _queueEvent(e, t) {
            O(this._queuedCallbacks, e, []).push(t);
        }
        onDone(e) {
            this.queued && this._queueEvent('done', e), this._player.onDone(e);
        }
        onStart(e) {
            this.queued && this._queueEvent('start', e),
                this._player.onStart(e);
        }
        onDestroy(e) {
            this.queued && this._queueEvent('destroy', e),
                this._player.onDestroy(e);
        }
        init() {
            this._player.init();
        }
        hasStarted() {
            return this.queued ? !1 : this._player.hasStarted();
        }
        play() {
            !this.queued && this._player.play();
        }
        pause() {
            !this.queued && this._player.pause();
        }
        restart() {
            !this.queued && this._player.restart();
        }
        finish() {
            this._player.finish();
        }
        destroy() {
            (this.destroyed = !0), this._player.destroy();
        }
        reset() {
            !this.queued && this._player.reset();
        }
        setPosition(e) {
            this.queued || this._player.setPosition(e);
        }
        getPosition() {
            return this.queued ? 0 : this._player.getPosition();
        }
        triggerCallback(e) {
            let t = this._player;
            t.triggerCallback && t.triggerCallback(e);
        }
    };
function ci(n, e, t) {
    let s = n.get(e);
    if (s) {
        if (s.length) {
            let i = s.indexOf(t);
            s.splice(i, 1);
        }
        s.length == 0 && n.delete(e);
    }
    return s;
}
function fi(n) {
    return n ?? null;
}
function pe(n) {
    return n && n.nodeType === 1;
}
function di(n) {
    return n == 'start' || n == 'done';
}
function Ct(n, e) {
    let t = n.style.display;
    return (n.style.display = e ?? 'none'), t;
}
function kt(n, e, t, s, i) {
    let r = [];
    t.forEach((l) => r.push(Ct(l)));
    let o = [];
    s.forEach((l, h) => {
        let c = new Map();
        l.forEach((u) => {
            let S = e.computeStyle(h, u, i);
            c.set(u, S), (!S || S.length == 0) && ((h[K] = ui), o.push(h));
        }),
            n.set(h, c);
    });
    let a = 0;
    return t.forEach((l) => Ct(l, r[a++])), o;
}
function Ft(n, e) {
    let t = new Map();
    if ((n.forEach((a) => t.set(a, [])), e.length == 0)) return t;
    let s = 1,
        i = new Set(e),
        r = new Map();
    function o(a) {
        if (!a) return s;
        let l = r.get(a);
        if (l) return l;
        let h = a.parentNode;
        return (
            t.has(h) ? (l = h) : i.has(h) ? (l = s) : (l = o(h)), r.set(a, l), l
        );
    }
    return (
        e.forEach((a) => {
            let l = o(a);
            l !== s && t.get(l).push(a);
        }),
        t
    );
}
function I(n, e) {
    n.classList?.add(e);
}
function ee(n, e) {
    n.classList?.remove(e);
}
function mi(n, e, t) {
    j(t).onDone(() => n.processLeaveNode(e));
}
function pi(n) {
    let e = [];
    return jt(n, e), e;
}
function jt(n, e) {
    for (let t = 0; t < n.length; t++) {
        let s = n[t];
        s instanceof ie ? jt(s.players, e) : e.push(s);
    }
}
function gi(n, e) {
    let t = Object.keys(n),
        s = Object.keys(e);
    if (t.length != s.length) return !1;
    for (let i = 0; i < t.length; i++) {
        let r = t[i];
        if (!e.hasOwnProperty(r) || n[r] !== e[r]) return !1;
    }
    return !0;
}
function Rt(n, e, t) {
    let s = t.get(n);
    if (!s) return !1;
    let i = e.get(n);
    return i ? s.forEach((r) => i.add(r)) : e.set(n, s), t.delete(n), !0;
}
var be = class {
    constructor(e, t, s, i) {
        (this._driver = t),
            (this._normalizer = s),
            (this._triggerCache = {}),
            (this.onRemovalComplete = (r, o) => {}),
            (this._transitionEngine = new xe(e.body, t, s, i)),
            (this._timelineEngine = new Ye(e.body, t, s)),
            (this._transitionEngine.onRemovalComplete = (r, o) =>
                this.onRemovalComplete(r, o));
    }
    registerTrigger(e, t, s, i, r) {
        let o = e + '-' + i,
            a = this._triggerCache[o];
        if (!a) {
            let l = [],
                h = [],
                c = at(this._driver, r, l, h);
            if (l.length) throw ps(i, l);
            h.length && void 0,
                (a = si(i, c, this._normalizer)),
                (this._triggerCache[o] = a);
        }
        this._transitionEngine.registerTrigger(t, i, a);
    }
    register(e, t) {
        this._transitionEngine.register(e, t);
    }
    destroy(e, t) {
        this._transitionEngine.destroy(e, t);
    }
    onInsert(e, t, s, i) {
        this._transitionEngine.insertNode(e, t, s, i);
    }
    onRemove(e, t, s) {
        this._transitionEngine.removeNode(e, t, s);
    }
    disableAnimations(e, t) {
        this._transitionEngine.markElementAsDisabled(e, t);
    }
    process(e, t, s, i) {
        if (s.charAt(0) == '@') {
            let [r, o] = St(s),
                a = i;
            this._timelineEngine.command(r, t, o, a);
        } else this._transitionEngine.trigger(e, t, s, i);
    }
    listen(e, t, s, i, r) {
        if (s.charAt(0) == '@') {
            let [o, a] = St(s);
            return this._timelineEngine.listen(o, t, a, r);
        }
        return this._transitionEngine.listen(e, t, s, i, r);
    }
    flush(e = -1) {
        this._transitionEngine.flush(e);
    }
    get players() {
        return [
            ...this._transitionEngine.players,
            ...this._timelineEngine.players,
        ];
    }
    whenRenderingDone() {
        return this._transitionEngine.whenRenderingDone();
    }
    afterFlushAnimationsDone(e) {
        this._transitionEngine.afterFlushAnimationsDone(e);
    }
};
function yi(n, e) {
    let t = null,
        s = null;
    return (
        Array.isArray(e) && e.length
            ? ((t = Le(e[0])), e.length > 1 && (s = Le(e[e.length - 1])))
            : e instanceof Map && (t = Le(e)),
        t || s ? new Ze(n, t, s) : null
    );
}
var te = class te {
    constructor(e, t, s) {
        (this._element = e),
            (this._startStyles = t),
            (this._endStyles = s),
            (this._state = 0);
        let i = te.initialStylesByElement.get(e);
        i || te.initialStylesByElement.set(e, (i = new Map())),
            (this._initialStyles = i);
    }
    start() {
        this._state < 1 &&
            (this._startStyles &&
                Q(this._element, this._startStyles, this._initialStyles),
            (this._state = 1));
    }
    finish() {
        this.start(),
            this._state < 2 &&
                (Q(this._element, this._initialStyles),
                this._endStyles &&
                    (Q(this._element, this._endStyles),
                    (this._endStyles = null)),
                (this._state = 1));
    }
    destroy() {
        this.finish(),
            this._state < 3 &&
                (te.initialStylesByElement.delete(this._element),
                this._startStyles &&
                    (x(this._element, this._startStyles),
                    (this._endStyles = null)),
                this._endStyles &&
                    (x(this._element, this._endStyles),
                    (this._endStyles = null)),
                Q(this._element, this._initialStyles),
                (this._state = 3));
    }
};
te.initialStylesByElement = new WeakMap();
var Ze = te;
function Le(n) {
    let e = null;
    return (
        n.forEach((t, s) => {
            _i(s) && ((e = e || new Map()), e.set(s, t));
        }),
        e
    );
}
function _i(n) {
    return n === 'display' || n === 'position';
}
var Pe = class {
        constructor(e, t, s, i) {
            (this.element = e),
                (this.keyframes = t),
                (this.options = s),
                (this._specialStyles = i),
                (this._onDoneFns = []),
                (this._onStartFns = []),
                (this._onDestroyFns = []),
                (this._initialized = !1),
                (this._finished = !1),
                (this._started = !1),
                (this._destroyed = !1),
                (this._originalOnDoneFns = []),
                (this._originalOnStartFns = []),
                (this.time = 0),
                (this.parentPlayer = null),
                (this.currentSnapshot = new Map()),
                (this._duration = s.duration),
                (this._delay = s.delay || 0),
                (this.time = this._duration + this._delay);
        }
        _onFinish() {
            this._finished ||
                ((this._finished = !0),
                this._onDoneFns.forEach((e) => e()),
                (this._onDoneFns = []));
        }
        init() {
            this._buildPlayer(), this._preparePlayerBeforeStart();
        }
        _buildPlayer() {
            if (this._initialized) return;
            this._initialized = !0;
            let e = this.keyframes;
            (this.domPlayer = this._triggerWebAnimation(
                this.element,
                e,
                this.options,
            )),
                (this._finalKeyframe = e.length ? e[e.length - 1] : new Map());
            let t = () => this._onFinish();
            this.domPlayer.addEventListener('finish', t),
                this.onDestroy(() => {
                    this.domPlayer.removeEventListener('finish', t);
                });
        }
        _preparePlayerBeforeStart() {
            this._delay ? this._resetDomPlayerState() : this.domPlayer.pause();
        }
        _convertKeyframesToObject(e) {
            let t = [];
            return (
                e.forEach((s) => {
                    t.push(Object.fromEntries(s));
                }),
                t
            );
        }
        _triggerWebAnimation(e, t, s) {
            return e.animate(this._convertKeyframesToObject(t), s);
        }
        onStart(e) {
            this._originalOnStartFns.push(e), this._onStartFns.push(e);
        }
        onDone(e) {
            this._originalOnDoneFns.push(e), this._onDoneFns.push(e);
        }
        onDestroy(e) {
            this._onDestroyFns.push(e);
        }
        play() {
            this._buildPlayer(),
                this.hasStarted() ||
                    (this._onStartFns.forEach((e) => e()),
                    (this._onStartFns = []),
                    (this._started = !0),
                    this._specialStyles && this._specialStyles.start()),
                this.domPlayer.play();
        }
        pause() {
            this.init(), this.domPlayer.pause();
        }
        finish() {
            this.init(),
                this._specialStyles && this._specialStyles.finish(),
                this._onFinish(),
                this.domPlayer.finish();
        }
        reset() {
            this._resetDomPlayerState(),
                (this._destroyed = !1),
                (this._finished = !1),
                (this._started = !1),
                (this._onStartFns = this._originalOnStartFns),
                (this._onDoneFns = this._originalOnDoneFns);
        }
        _resetDomPlayerState() {
            this.domPlayer && this.domPlayer.cancel();
        }
        restart() {
            this.reset(), this.play();
        }
        hasStarted() {
            return this._started;
        }
        destroy() {
            this._destroyed ||
                ((this._destroyed = !0),
                this._resetDomPlayerState(),
                this._onFinish(),
                this._specialStyles && this._specialStyles.destroy(),
                this._onDestroyFns.forEach((e) => e()),
                (this._onDestroyFns = []));
        }
        setPosition(e) {
            this.domPlayer === void 0 && this.init(),
                (this.domPlayer.currentTime = e * this.time);
        }
        getPosition() {
            return +(this.domPlayer.currentTime ?? 0) / this.time;
        }
        get totalTime() {
            return this._delay + this._duration;
        }
        beforeDestroy() {
            let e = new Map();
            this.hasStarted() &&
                this._finalKeyframe.forEach((s, i) => {
                    i !== 'offset' &&
                        e.set(i, this._finished ? s : ot(this.element, i));
                }),
                (this.currentSnapshot = e);
        }
        triggerCallback(e) {
            let t = e === 'start' ? this._onStartFns : this._onDoneFns;
            t.forEach((s) => s()), (t.length = 0);
        }
    },
    Je = class {
        validateStyleProperty(e) {
            return !0;
        }
        validateAnimatableStyleProperty(e) {
            return !0;
        }
        matchesElement(e, t) {
            return !1;
        }
        containsElement(e, t) {
            return Kt(e, t);
        }
        getParentElement(e) {
            return it(e);
        }
        query(e, t, s) {
            return qt(e, t, s);
        }
        computeStyle(e, t, s) {
            return ot(e, t);
        }
        animate(e, t, s, i, r, o = []) {
            let a = i == 0 ? 'both' : 'forwards',
                l = { duration: s, delay: i, fill: a };
            r && (l.easing = r);
            let h = new Map(),
                c = o.filter((y) => y instanceof Pe);
            qs(s, i) &&
                c.forEach((y) => {
                    y.currentSnapshot.forEach((d, g) => h.set(g, d));
                });
            let u = Ls(t).map((y) => new Map(y));
            u = zs(e, u, h);
            let S = yi(e, u);
            return new Pe(e, u, l, S);
        }
    };
function Di(n, e, t) {
    return n === 'noop'
        ? new be(e, new zt(), new Ke(), t)
        : new be(e, new Je(), new Qe(), t);
}
var Ot = class {
        constructor(e, t) {
            this._driver = e;
            let s = [],
                i = [],
                r = at(e, t, s, i);
            if (s.length) throw ds(s);
            i.length && void 0, (this._animationAst = r);
        }
        buildTimelines(e, t, s, i, r) {
            let o = Array.isArray(t) ? wt(t) : t,
                a = Array.isArray(s) ? wt(s) : s,
                l = [];
            r = r || new se();
            let h = ht(
                this._driver,
                e,
                this._animationAst,
                nt,
                ye,
                o,
                a,
                i,
                r,
                l,
            );
            if (l.length) throw ms(l);
            return h;
        }
    },
    ge = '@',
    Wt = '@.disabled',
    Ae = class {
        constructor(e, t, s, i) {
            (this.namespaceId = e),
                (this.delegate = t),
                (this.engine = s),
                (this._onDestroy = i),
                (this.ɵtype = 0);
        }
        get data() {
            return this.delegate.data;
        }
        destroyNode(e) {
            this.delegate.destroyNode?.(e);
        }
        destroy() {
            this.engine.destroy(this.namespaceId, this.delegate),
                this.engine.afterFlushAnimationsDone(() => {
                    queueMicrotask(() => {
                        this.delegate.destroy();
                    });
                }),
                this._onDestroy?.();
        }
        createElement(e, t) {
            return this.delegate.createElement(e, t);
        }
        createComment(e) {
            return this.delegate.createComment(e);
        }
        createText(e) {
            return this.delegate.createText(e);
        }
        appendChild(e, t) {
            this.delegate.appendChild(e, t),
                this.engine.onInsert(this.namespaceId, t, e, !1);
        }
        insertBefore(e, t, s, i = !0) {
            this.delegate.insertBefore(e, t, s),
                this.engine.onInsert(this.namespaceId, t, e, i);
        }
        removeChild(e, t, s) {
            this.engine.onRemove(this.namespaceId, t, this.delegate);
        }
        selectRootElement(e, t) {
            return this.delegate.selectRootElement(e, t);
        }
        parentNode(e) {
            return this.delegate.parentNode(e);
        }
        nextSibling(e) {
            return this.delegate.nextSibling(e);
        }
        setAttribute(e, t, s, i) {
            this.delegate.setAttribute(e, t, s, i);
        }
        removeAttribute(e, t, s) {
            this.delegate.removeAttribute(e, t, s);
        }
        addClass(e, t) {
            this.delegate.addClass(e, t);
        }
        removeClass(e, t) {
            this.delegate.removeClass(e, t);
        }
        setStyle(e, t, s, i) {
            this.delegate.setStyle(e, t, s, i);
        }
        removeStyle(e, t, s) {
            this.delegate.removeStyle(e, t, s);
        }
        setProperty(e, t, s) {
            t.charAt(0) == ge && t == Wt
                ? this.disableAnimations(e, !!s)
                : this.delegate.setProperty(e, t, s);
        }
        setValue(e, t) {
            this.delegate.setValue(e, t);
        }
        listen(e, t, s) {
            return this.delegate.listen(e, t, s);
        }
        disableAnimations(e, t) {
            this.engine.disableAnimations(e, t);
        }
    },
    et = class extends Ae {
        constructor(e, t, s, i, r) {
            super(t, s, i, r), (this.factory = e), (this.namespaceId = t);
        }
        setProperty(e, t, s) {
            t.charAt(0) == ge
                ? t.charAt(1) == '.' && t == Wt
                    ? ((s = s === void 0 ? !0 : !!s),
                      this.disableAnimations(e, s))
                    : this.engine.process(this.namespaceId, e, t.slice(1), s)
                : this.delegate.setProperty(e, t, s);
        }
        listen(e, t, s) {
            if (t.charAt(0) == ge) {
                let i = Si(e),
                    r = t.slice(1),
                    o = '';
                return (
                    r.charAt(0) != ge && ([r, o] = Ei(r)),
                    this.engine.listen(this.namespaceId, i, r, o, (a) => {
                        let l = a._data || -1;
                        this.factory.scheduleListenerCallback(l, s, a);
                    })
                );
            }
            return this.delegate.listen(e, t, s);
        }
    };
function Si(n) {
    switch (n) {
        case 'body':
            return document.body;
        case 'document':
            return document;
        case 'window':
            return window;
        default:
            return n;
    }
}
function Ei(n) {
    let e = n.indexOf('.'),
        t = n.substring(0, e),
        s = n.slice(e + 1);
    return [t, s];
}
var Lt = class {
    constructor(e, t, s) {
        (this.delegate = e),
            (this.engine = t),
            (this._zone = s),
            (this._currentId = 0),
            (this._microtaskId = 1),
            (this._animationCallbacksBuffer = []),
            (this._rendererCache = new Map()),
            (this._cdRecurDepth = 0),
            (t.onRemovalComplete = (i, r) => {
                let o = r?.parentNode(i);
                o && r.removeChild(o, i);
            });
    }
    createRenderer(e, t) {
        let s = '',
            i = this.delegate.createRenderer(e, t);
        if (!e || !t?.data?.animation) {
            let h = this._rendererCache,
                c = h.get(i);
            if (!c) {
                let u = () => h.delete(i);
                (c = new Ae(s, i, this.engine, u)), h.set(i, c);
            }
            return c;
        }
        let r = t.id,
            o = t.id + '-' + this._currentId;
        this._currentId++, this.engine.register(o, e);
        let a = (h) => {
            Array.isArray(h)
                ? h.forEach(a)
                : this.engine.registerTrigger(r, o, e, h.name, h);
        };
        return t.data.animation.forEach(a), new et(this, o, i, this.engine);
    }
    begin() {
        this._cdRecurDepth++, this.delegate.begin && this.delegate.begin();
    }
    _scheduleCountTask() {
        queueMicrotask(() => {
            this._microtaskId++;
        });
    }
    scheduleListenerCallback(e, t, s) {
        if (e >= 0 && e < this._microtaskId) {
            this._zone.run(() => t(s));
            return;
        }
        let i = this._animationCallbacksBuffer;
        i.length == 0 &&
            queueMicrotask(() => {
                this._zone.run(() => {
                    i.forEach((r) => {
                        let [o, a] = r;
                        o(a);
                    }),
                        (this._animationCallbacksBuffer = []);
                });
            }),
            i.push([t, s]);
    }
    end() {
        this._cdRecurDepth--,
            this._cdRecurDepth == 0 &&
                this._zone.runOutsideAngular(() => {
                    this._scheduleCountTask(),
                        this.engine.flush(this._microtaskId);
                }),
            this.delegate.end && this.delegate.end();
    }
    whenRenderingDone() {
        return this.engine.whenRenderingDone();
    }
};
export {
    vt as AnimationDriver,
    zt as NoopAnimationDriver,
    Ot as ɵAnimation,
    be as ɵAnimationEngine,
    et as ɵAnimationRenderer,
    Lt as ɵAnimationRendererFactory,
    Ie as ɵAnimationStyleNormalizer,
    Ae as ɵBaseAnimationRenderer,
    Ke as ɵNoopAnimationStyleNormalizer,
    Je as ɵWebAnimationsDriver,
    Pe as ɵWebAnimationsPlayer,
    Qe as ɵWebAnimationsStyleNormalizer,
    qs as ɵallowPreviousPlayerStylesMerge,
    Ni as ɵcamelCaseToDashCase,
    Kt as ɵcontainsElement,
    Di as ɵcreateEngine,
    it as ɵgetParentElement,
    qt as ɵinvokeQuery,
    Ls as ɵnormalizeKeyframes,
    Cs as ɵvalidateStyleProperty,
    Ai as ɵvalidateWebAnimatableStyleProperty,
};
