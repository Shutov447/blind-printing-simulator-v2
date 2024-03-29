import {
    $ as E,
    $a as en,
    A as ve,
    Aa as B,
    Ab as an,
    B as fr,
    Ba as Dr,
    C as Ae,
    Ca as mt,
    D as ye,
    Da as Sr,
    E as zn,
    Ea as Ar,
    F as mr,
    Fa as gt,
    G as gr,
    Ga as z,
    H as vr,
    Ha as fe,
    I as Gt,
    Ia as M,
    J as te,
    Ja as le,
    K as q,
    Ka as Gn,
    L as k,
    La as xr,
    M as x,
    Ma as I,
    N as xe,
    Na as C,
    O as Vn,
    Oa as F,
    P as ct,
    Pa as Qt,
    Q as Me,
    Qa as me,
    R as N,
    Ra as ne,
    S as X,
    Sa as qe,
    T as lt,
    Ta as Oe,
    U as ut,
    Ua as ke,
    V as yr,
    Va as Ne,
    W as ce,
    Wa as j,
    X as br,
    Xa as vt,
    Y as m,
    Ya as _e,
    Z as Q,
    Za as Jt,
    _ as _r,
    _a as P,
    a as p,
    aa as Kt,
    ab as ie,
    b as W,
    ba as wr,
    bb as re,
    c as cr,
    ca as he,
    cb as Pe,
    d as lr,
    da as dt,
    db as tn,
    e as ur,
    ea as ht,
    eb as Mr,
    f as qt,
    fa as g,
    fb as nn,
    g as jn,
    ga as f,
    gb as yt,
    h as Un,
    ha as Zt,
    hb as Or,
    i as $,
    ia as be,
    ib as Kn,
    j as A,
    ja as Ir,
    jb as kr,
    k as De,
    ka as Tr,
    kb as Nr,
    l as Y,
    la as Ve,
    lb as rn,
    m as v,
    ma as pe,
    mb as Zn,
    n as ot,
    na as pt,
    nb as Pr,
    o as dr,
    oa as Wn,
    ob as Lr,
    p as hr,
    pa as Er,
    pb as U,
    q as _,
    qa as qn,
    qb as sn,
    r as at,
    ra as Cr,
    rb as on,
    s as ee,
    sa as ft,
    sb as Fr,
    t as Ht,
    ta as D,
    tb as He,
    u as $n,
    ua as S,
    ub as jr,
    v as ge,
    va as Hn,
    vb as Ge,
    w as ze,
    wa as Rr,
    wb as H,
    x as Se,
    xa as Yt,
    xb as Ur,
    y as pr,
    ya as Xt,
    yb as $r,
    z as Bn,
    za as We,
    zb as Yn,
} from './chunk-EBIFBJ4P.js';
var _t = class {},
    un = class {},
    Ie = class t {
        constructor(e) {
            (this.normalizedNames = new Map()),
                (this.lazyUpdate = null),
                e
                    ? typeof e == 'string'
                        ? (this.lazyInit = () => {
                              (this.headers = new Map()),
                                  e
                                      .split(
                                          `
`,
                                      )
                                      .forEach((r) => {
                                          let n = r.indexOf(':');
                                          if (n > 0) {
                                              let i = r.slice(0, n),
                                                  s = i.toLowerCase(),
                                                  o = r.slice(n + 1).trim();
                                              this.maybeSetNormalizedName(i, s),
                                                  this.headers.has(s)
                                                      ? this.headers
                                                            .get(s)
                                                            .push(o)
                                                      : this.headers.set(s, [
                                                            o,
                                                        ]);
                                          }
                                      });
                          })
                        : typeof Headers < 'u' && e instanceof Headers
                          ? ((this.headers = new Map()),
                            e.forEach((r, n) => {
                                this.setHeaderEntries(n, r);
                            }))
                          : (this.lazyInit = () => {
                                (this.headers = new Map()),
                                    Object.entries(e).forEach(([r, n]) => {
                                        this.setHeaderEntries(r, n);
                                    });
                            })
                    : (this.headers = new Map());
        }
        has(e) {
            return this.init(), this.headers.has(e.toLowerCase());
        }
        get(e) {
            this.init();
            let r = this.headers.get(e.toLowerCase());
            return r && r.length > 0 ? r[0] : null;
        }
        keys() {
            return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(e) {
            return this.init(), this.headers.get(e.toLowerCase()) || null;
        }
        append(e, r) {
            return this.clone({ name: e, value: r, op: 'a' });
        }
        set(e, r) {
            return this.clone({ name: e, value: r, op: 's' });
        }
        delete(e, r) {
            return this.clone({ name: e, value: r, op: 'd' });
        }
        maybeSetNormalizedName(e, r) {
            this.normalizedNames.has(r) || this.normalizedNames.set(r, e);
        }
        init() {
            this.lazyInit &&
                (this.lazyInit instanceof t
                    ? this.copyFrom(this.lazyInit)
                    : this.lazyInit(),
                (this.lazyInit = null),
                this.lazyUpdate &&
                    (this.lazyUpdate.forEach((e) => this.applyUpdate(e)),
                    (this.lazyUpdate = null)));
        }
        copyFrom(e) {
            e.init(),
                Array.from(e.headers.keys()).forEach((r) => {
                    this.headers.set(r, e.headers.get(r)),
                        this.normalizedNames.set(r, e.normalizedNames.get(r));
                });
        }
        clone(e) {
            let r = new t();
            return (
                (r.lazyInit =
                    this.lazyInit && this.lazyInit instanceof t
                        ? this.lazyInit
                        : this),
                (r.lazyUpdate = (this.lazyUpdate || []).concat([e])),
                r
            );
        }
        applyUpdate(e) {
            let r = e.name.toLowerCase();
            switch (e.op) {
                case 'a':
                case 's':
                    let n = e.value;
                    if ((typeof n == 'string' && (n = [n]), n.length === 0))
                        return;
                    this.maybeSetNormalizedName(e.name, r);
                    let i = (e.op === 'a' ? this.headers.get(r) : void 0) || [];
                    i.push(...n), this.headers.set(r, i);
                    break;
                case 'd':
                    let s = e.value;
                    if (!s)
                        this.headers.delete(r), this.normalizedNames.delete(r);
                    else {
                        let o = this.headers.get(r);
                        if (!o) return;
                        (o = o.filter((a) => s.indexOf(a) === -1)),
                            o.length === 0
                                ? (this.headers.delete(r),
                                  this.normalizedNames.delete(r))
                                : this.headers.set(r, o);
                    }
                    break;
            }
        }
        setHeaderEntries(e, r) {
            let n = (Array.isArray(r) ? r : [r]).map((s) => s.toString()),
                i = e.toLowerCase();
            this.headers.set(i, n), this.maybeSetNormalizedName(e, i);
        }
        forEach(e) {
            this.init(),
                Array.from(this.normalizedNames.keys()).forEach((r) =>
                    e(this.normalizedNames.get(r), this.headers.get(r)),
                );
        }
    };
var Qn = class {
    encodeKey(e) {
        return Br(e);
    }
    encodeValue(e) {
        return Br(e);
    }
    decodeKey(e) {
        return decodeURIComponent(e);
    }
    decodeValue(e) {
        return decodeURIComponent(e);
    }
};
function $o(t, e) {
    let r = new Map();
    return (
        t.length > 0 &&
            t
                .replace(/^\?/, '')
                .split('&')
                .forEach((i) => {
                    let s = i.indexOf('='),
                        [o, a] =
                            s == -1
                                ? [e.decodeKey(i), '']
                                : [
                                      e.decodeKey(i.slice(0, s)),
                                      e.decodeValue(i.slice(s + 1)),
                                  ],
                        l = r.get(o) || [];
                    l.push(a), r.set(o, l);
                }),
        r
    );
}
var Bo = /%(\d[a-f0-9])/gi,
    zo = {
        40: '@',
        '3A': ':',
        24: '$',
        '2C': ',',
        '3B': ';',
        '3D': '=',
        '3F': '?',
        '2F': '/',
    };
function Br(t) {
    return encodeURIComponent(t).replace(Bo, (e, r) => zo[r] ?? e);
}
function cn(t) {
    return `${t}`;
}
var we = class t {
    constructor(e = {}) {
        if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = e.encoder || new Qn()),
            e.fromString)
        ) {
            if (e.fromObject)
                throw new Error(
                    'Cannot specify both fromString and fromObject.',
                );
            this.map = $o(e.fromString, this.encoder);
        } else
            e.fromObject
                ? ((this.map = new Map()),
                  Object.keys(e.fromObject).forEach((r) => {
                      let n = e.fromObject[r],
                          i = Array.isArray(n) ? n.map(cn) : [cn(n)];
                      this.map.set(r, i);
                  }))
                : (this.map = null);
    }
    has(e) {
        return this.init(), this.map.has(e);
    }
    get(e) {
        this.init();
        let r = this.map.get(e);
        return r ? r[0] : null;
    }
    getAll(e) {
        return this.init(), this.map.get(e) || null;
    }
    keys() {
        return this.init(), Array.from(this.map.keys());
    }
    append(e, r) {
        return this.clone({ param: e, value: r, op: 'a' });
    }
    appendAll(e) {
        let r = [];
        return (
            Object.keys(e).forEach((n) => {
                let i = e[n];
                Array.isArray(i)
                    ? i.forEach((s) => {
                          r.push({ param: n, value: s, op: 'a' });
                      })
                    : r.push({ param: n, value: i, op: 'a' });
            }),
            this.clone(r)
        );
    }
    set(e, r) {
        return this.clone({ param: e, value: r, op: 's' });
    }
    delete(e, r) {
        return this.clone({ param: e, value: r, op: 'd' });
    }
    toString() {
        return (
            this.init(),
            this.keys()
                .map((e) => {
                    let r = this.encoder.encodeKey(e);
                    return this.map
                        .get(e)
                        .map((n) => r + '=' + this.encoder.encodeValue(n))
                        .join('&');
                })
                .filter((e) => e !== '')
                .join('&')
        );
    }
    clone(e) {
        let r = new t({ encoder: this.encoder });
        return (
            (r.cloneFrom = this.cloneFrom || this),
            (r.updates = (this.updates || []).concat(e)),
            r
        );
    }
    init() {
        this.map === null && (this.map = new Map()),
            this.cloneFrom !== null &&
                (this.cloneFrom.init(),
                this.cloneFrom
                    .keys()
                    .forEach((e) => this.map.set(e, this.cloneFrom.map.get(e))),
                this.updates.forEach((e) => {
                    switch (e.op) {
                        case 'a':
                        case 's':
                            let r =
                                (e.op === 'a'
                                    ? this.map.get(e.param)
                                    : void 0) || [];
                            r.push(cn(e.value)), this.map.set(e.param, r);
                            break;
                        case 'd':
                            if (e.value !== void 0) {
                                let n = this.map.get(e.param) || [],
                                    i = n.indexOf(cn(e.value));
                                i !== -1 && n.splice(i, 1),
                                    n.length > 0
                                        ? this.map.set(e.param, n)
                                        : this.map.delete(e.param);
                            } else {
                                this.map.delete(e.param);
                                break;
                            }
                    }
                }),
                (this.cloneFrom = this.updates = null));
    }
};
var Jn = class {
    constructor() {
        this.map = new Map();
    }
    set(e, r) {
        return this.map.set(e, r), this;
    }
    get(e) {
        return (
            this.map.has(e) || this.map.set(e, e.defaultValue()),
            this.map.get(e)
        );
    }
    delete(e) {
        return this.map.delete(e), this;
    }
    has(e) {
        return this.map.has(e);
    }
    keys() {
        return this.map.keys();
    }
};
function Vo(t) {
    switch (t) {
        case 'DELETE':
        case 'GET':
        case 'HEAD':
        case 'OPTIONS':
        case 'JSONP':
            return !1;
        default:
            return !0;
    }
}
function zr(t) {
    return typeof ArrayBuffer < 'u' && t instanceof ArrayBuffer;
}
function Vr(t) {
    return typeof Blob < 'u' && t instanceof Blob;
}
function Wr(t) {
    return typeof FormData < 'u' && t instanceof FormData;
}
function Wo(t) {
    return typeof URLSearchParams < 'u' && t instanceof URLSearchParams;
}
var bt = class t {
        constructor(e, r, n, i) {
            (this.url = r),
                (this.body = null),
                (this.reportProgress = !1),
                (this.withCredentials = !1),
                (this.responseType = 'json'),
                (this.method = e.toUpperCase());
            let s;
            if (
                (Vo(this.method) || i
                    ? ((this.body = n !== void 0 ? n : null), (s = i))
                    : (s = n),
                s &&
                    ((this.reportProgress = !!s.reportProgress),
                    (this.withCredentials = !!s.withCredentials),
                    s.responseType && (this.responseType = s.responseType),
                    s.headers && (this.headers = s.headers),
                    s.context && (this.context = s.context),
                    s.params && (this.params = s.params),
                    (this.transferCache = s.transferCache)),
                (this.headers ??= new Ie()),
                (this.context ??= new Jn()),
                !this.params)
            )
                (this.params = new we()), (this.urlWithParams = r);
            else {
                let o = this.params.toString();
                if (o.length === 0) this.urlWithParams = r;
                else {
                    let a = r.indexOf('?'),
                        l = a === -1 ? '?' : a < r.length - 1 ? '&' : '';
                    this.urlWithParams = r + l + o;
                }
            }
        }
        serializeBody() {
            return this.body === null
                ? null
                : zr(this.body) ||
                    Vr(this.body) ||
                    Wr(this.body) ||
                    Wo(this.body) ||
                    typeof this.body == 'string'
                  ? this.body
                  : this.body instanceof we
                    ? this.body.toString()
                    : typeof this.body == 'object' ||
                        typeof this.body == 'boolean' ||
                        Array.isArray(this.body)
                      ? JSON.stringify(this.body)
                      : this.body.toString();
        }
        detectContentTypeHeader() {
            return this.body === null || Wr(this.body)
                ? null
                : Vr(this.body)
                  ? this.body.type || null
                  : zr(this.body)
                    ? null
                    : typeof this.body == 'string'
                      ? 'text/plain'
                      : this.body instanceof we
                        ? 'application/x-www-form-urlencoded;charset=UTF-8'
                        : typeof this.body == 'object' ||
                            typeof this.body == 'number' ||
                            typeof this.body == 'boolean'
                          ? 'application/json'
                          : null;
        }
        clone(e = {}) {
            let r = e.method || this.method,
                n = e.url || this.url,
                i = e.responseType || this.responseType,
                s = e.body !== void 0 ? e.body : this.body,
                o =
                    e.withCredentials !== void 0
                        ? e.withCredentials
                        : this.withCredentials,
                a =
                    e.reportProgress !== void 0
                        ? e.reportProgress
                        : this.reportProgress,
                l = e.headers || this.headers,
                c = e.params || this.params,
                u = e.context ?? this.context;
            return (
                e.setHeaders !== void 0 &&
                    (l = Object.keys(e.setHeaders).reduce(
                        (d, h) => d.set(h, e.setHeaders[h]),
                        l,
                    )),
                e.setParams &&
                    (c = Object.keys(e.setParams).reduce(
                        (d, h) => d.set(h, e.setParams[h]),
                        c,
                    )),
                new t(r, n, s, {
                    params: c,
                    headers: l,
                    context: u,
                    reportProgress: a,
                    responseType: i,
                    withCredentials: o,
                })
            );
        }
    },
    Ke = (function (t) {
        return (
            (t[(t.Sent = 0)] = 'Sent'),
            (t[(t.UploadProgress = 1)] = 'UploadProgress'),
            (t[(t.ResponseHeader = 2)] = 'ResponseHeader'),
            (t[(t.DownloadProgress = 3)] = 'DownloadProgress'),
            (t[(t.Response = 4)] = 'Response'),
            (t[(t.User = 5)] = 'User'),
            t
        );
    })(Ke || {}),
    wt = class {
        constructor(e, r = hn.Ok, n = 'OK') {
            (this.headers = e.headers || new Ie()),
                (this.status = e.status !== void 0 ? e.status : r),
                (this.statusText = e.statusText || n),
                (this.url = e.url || null),
                (this.ok = this.status >= 200 && this.status < 300);
        }
    },
    ei = class t extends wt {
        constructor(e = {}) {
            super(e), (this.type = Ke.ResponseHeader);
        }
        clone(e = {}) {
            return new t({
                headers: e.headers || this.headers,
                status: e.status !== void 0 ? e.status : this.status,
                statusText: e.statusText || this.statusText,
                url: e.url || this.url || void 0,
            });
        }
    },
    Ze = class t extends wt {
        constructor(e = {}) {
            super(e),
                (this.type = Ke.Response),
                (this.body = e.body !== void 0 ? e.body : null);
        }
        clone(e = {}) {
            return new t({
                body: e.body !== void 0 ? e.body : this.body,
                headers: e.headers || this.headers,
                status: e.status !== void 0 ? e.status : this.status,
                statusText: e.statusText || this.statusText,
                url: e.url || this.url || void 0,
            });
        }
    },
    dn = class extends wt {
        constructor(e) {
            super(e, 0, 'Unknown Error'),
                (this.name = 'HttpErrorResponse'),
                (this.ok = !1),
                this.status >= 200 && this.status < 300
                    ? (this.message = `Http failure during parsing for ${e.url || '(unknown url)'}`)
                    : (this.message = `Http failure response for ${e.url || '(unknown url)'}: ${e.status} ${e.statusText}`),
                (this.error = e.error || null);
        }
    },
    hn = (function (t) {
        return (
            (t[(t.Continue = 100)] = 'Continue'),
            (t[(t.SwitchingProtocols = 101)] = 'SwitchingProtocols'),
            (t[(t.Processing = 102)] = 'Processing'),
            (t[(t.EarlyHints = 103)] = 'EarlyHints'),
            (t[(t.Ok = 200)] = 'Ok'),
            (t[(t.Created = 201)] = 'Created'),
            (t[(t.Accepted = 202)] = 'Accepted'),
            (t[(t.NonAuthoritativeInformation = 203)] =
                'NonAuthoritativeInformation'),
            (t[(t.NoContent = 204)] = 'NoContent'),
            (t[(t.ResetContent = 205)] = 'ResetContent'),
            (t[(t.PartialContent = 206)] = 'PartialContent'),
            (t[(t.MultiStatus = 207)] = 'MultiStatus'),
            (t[(t.AlreadyReported = 208)] = 'AlreadyReported'),
            (t[(t.ImUsed = 226)] = 'ImUsed'),
            (t[(t.MultipleChoices = 300)] = 'MultipleChoices'),
            (t[(t.MovedPermanently = 301)] = 'MovedPermanently'),
            (t[(t.Found = 302)] = 'Found'),
            (t[(t.SeeOther = 303)] = 'SeeOther'),
            (t[(t.NotModified = 304)] = 'NotModified'),
            (t[(t.UseProxy = 305)] = 'UseProxy'),
            (t[(t.Unused = 306)] = 'Unused'),
            (t[(t.TemporaryRedirect = 307)] = 'TemporaryRedirect'),
            (t[(t.PermanentRedirect = 308)] = 'PermanentRedirect'),
            (t[(t.BadRequest = 400)] = 'BadRequest'),
            (t[(t.Unauthorized = 401)] = 'Unauthorized'),
            (t[(t.PaymentRequired = 402)] = 'PaymentRequired'),
            (t[(t.Forbidden = 403)] = 'Forbidden'),
            (t[(t.NotFound = 404)] = 'NotFound'),
            (t[(t.MethodNotAllowed = 405)] = 'MethodNotAllowed'),
            (t[(t.NotAcceptable = 406)] = 'NotAcceptable'),
            (t[(t.ProxyAuthenticationRequired = 407)] =
                'ProxyAuthenticationRequired'),
            (t[(t.RequestTimeout = 408)] = 'RequestTimeout'),
            (t[(t.Conflict = 409)] = 'Conflict'),
            (t[(t.Gone = 410)] = 'Gone'),
            (t[(t.LengthRequired = 411)] = 'LengthRequired'),
            (t[(t.PreconditionFailed = 412)] = 'PreconditionFailed'),
            (t[(t.PayloadTooLarge = 413)] = 'PayloadTooLarge'),
            (t[(t.UriTooLong = 414)] = 'UriTooLong'),
            (t[(t.UnsupportedMediaType = 415)] = 'UnsupportedMediaType'),
            (t[(t.RangeNotSatisfiable = 416)] = 'RangeNotSatisfiable'),
            (t[(t.ExpectationFailed = 417)] = 'ExpectationFailed'),
            (t[(t.ImATeapot = 418)] = 'ImATeapot'),
            (t[(t.MisdirectedRequest = 421)] = 'MisdirectedRequest'),
            (t[(t.UnprocessableEntity = 422)] = 'UnprocessableEntity'),
            (t[(t.Locked = 423)] = 'Locked'),
            (t[(t.FailedDependency = 424)] = 'FailedDependency'),
            (t[(t.TooEarly = 425)] = 'TooEarly'),
            (t[(t.UpgradeRequired = 426)] = 'UpgradeRequired'),
            (t[(t.PreconditionRequired = 428)] = 'PreconditionRequired'),
            (t[(t.TooManyRequests = 429)] = 'TooManyRequests'),
            (t[(t.RequestHeaderFieldsTooLarge = 431)] =
                'RequestHeaderFieldsTooLarge'),
            (t[(t.UnavailableForLegalReasons = 451)] =
                'UnavailableForLegalReasons'),
            (t[(t.InternalServerError = 500)] = 'InternalServerError'),
            (t[(t.NotImplemented = 501)] = 'NotImplemented'),
            (t[(t.BadGateway = 502)] = 'BadGateway'),
            (t[(t.ServiceUnavailable = 503)] = 'ServiceUnavailable'),
            (t[(t.GatewayTimeout = 504)] = 'GatewayTimeout'),
            (t[(t.HttpVersionNotSupported = 505)] = 'HttpVersionNotSupported'),
            (t[(t.VariantAlsoNegotiates = 506)] = 'VariantAlsoNegotiates'),
            (t[(t.InsufficientStorage = 507)] = 'InsufficientStorage'),
            (t[(t.LoopDetected = 508)] = 'LoopDetected'),
            (t[(t.NotExtended = 510)] = 'NotExtended'),
            (t[(t.NetworkAuthenticationRequired = 511)] =
                'NetworkAuthenticationRequired'),
            t
        );
    })(hn || {});
function Xn(t, e) {
    return {
        body: e,
        headers: t.headers,
        context: t.context,
        observe: t.observe,
        params: t.params,
        reportProgress: t.reportProgress,
        responseType: t.responseType,
        withCredentials: t.withCredentials,
        transferCache: t.transferCache,
    };
}
var ti = (() => {
    let e = class e {
        constructor(n) {
            this.handler = n;
        }
        request(n, i, s = {}) {
            let o;
            if (n instanceof bt) o = n;
            else {
                let c;
                s.headers instanceof Ie
                    ? (c = s.headers)
                    : (c = new Ie(s.headers));
                let u;
                s.params &&
                    (s.params instanceof we
                        ? (u = s.params)
                        : (u = new we({ fromObject: s.params }))),
                    (o = new bt(n, i, s.body !== void 0 ? s.body : null, {
                        headers: c,
                        context: s.context,
                        params: u,
                        reportProgress: s.reportProgress,
                        responseType: s.responseType || 'json',
                        withCredentials: s.withCredentials,
                        transferCache: s.transferCache,
                    }));
            }
            let a = v(o).pipe(Se((c) => this.handler.handle(c)));
            if (n instanceof bt || s.observe === 'events') return a;
            let l = a.pipe(ge((c) => c instanceof Ze));
            switch (s.observe || 'body') {
                case 'body':
                    switch (o.responseType) {
                        case 'arraybuffer':
                            return l.pipe(
                                _((c) => {
                                    if (
                                        c.body !== null &&
                                        !(c.body instanceof ArrayBuffer)
                                    )
                                        throw new Error(
                                            'Response is not an ArrayBuffer.',
                                        );
                                    return c.body;
                                }),
                            );
                        case 'blob':
                            return l.pipe(
                                _((c) => {
                                    if (
                                        c.body !== null &&
                                        !(c.body instanceof Blob)
                                    )
                                        throw new Error(
                                            'Response is not a Blob.',
                                        );
                                    return c.body;
                                }),
                            );
                        case 'text':
                            return l.pipe(
                                _((c) => {
                                    if (
                                        c.body !== null &&
                                        typeof c.body != 'string'
                                    )
                                        throw new Error(
                                            'Response is not a string.',
                                        );
                                    return c.body;
                                }),
                            );
                        case 'json':
                        default:
                            return l.pipe(_((c) => c.body));
                    }
                case 'response':
                    return l;
                default:
                    throw new Error(
                        `Unreachable: unhandled observe type ${s.observe}}`,
                    );
            }
        }
        delete(n, i = {}) {
            return this.request('DELETE', n, i);
        }
        get(n, i = {}) {
            return this.request('GET', n, i);
        }
        head(n, i = {}) {
            return this.request('HEAD', n, i);
        }
        jsonp(n, i) {
            return this.request('JSONP', n, {
                params: new we().append(i, 'JSONP_CALLBACK'),
                observe: 'body',
                responseType: 'json',
            });
        }
        options(n, i = {}) {
            return this.request('OPTIONS', n, i);
        }
        patch(n, i, s = {}) {
            return this.request('PATCH', n, Xn(s, i));
        }
        post(n, i, s = {}) {
            return this.request('POST', n, Xn(s, i));
        }
        put(n, i, s = {}) {
            return this.request('PUT', n, Xn(s, i));
        }
    };
    (e.ɵfac = function (i) {
        return new (i || e)(g(_t));
    }),
        (e.ɵprov = m({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
})();
function es(t, e) {
    return e(t);
}
function qo(t, e) {
    return (r, n) => e.intercept(r, { handle: (i) => t(i, n) });
}
function Ho(t, e, r) {
    return (n, i) => pe(r, () => e(n, (s) => t(s, i)));
}
var Go = new E(''),
    ni = new E(''),
    ts = new E(''),
    Ko = new E('');
function Zo() {
    let t = null;
    return (e, r) => {
        t === null && (t = (f(Go, { optional: !0 }) ?? []).reduceRight(qo, es));
        let n = f(gt),
            i = n.add();
        return t(e, r).pipe(Ae(() => n.remove(i)));
    };
}
var qr = (() => {
    let e = class e extends _t {
        constructor(n, i) {
            super(),
                (this.backend = n),
                (this.injector = i),
                (this.chain = null),
                (this.pendingTasks = f(gt));
            let s = f(Ko, { optional: !0 });
            this.backend = s ?? n;
        }
        handle(n) {
            if (this.chain === null) {
                let s = Array.from(
                    new Set([
                        ...this.injector.get(ni),
                        ...this.injector.get(ts, []),
                    ]),
                );
                this.chain = s.reduceRight(
                    (o, a) => Ho(o, a, this.injector),
                    es,
                );
            }
            let i = this.pendingTasks.add();
            return this.chain(n, (s) => this.backend.handle(s)).pipe(
                Ae(() => this.pendingTasks.remove(i)),
            );
        }
    };
    (e.ɵfac = function (i) {
        return new (i || e)(g(un), g(Ve));
    }),
        (e.ɵprov = m({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
})();
var Yo = /^\)\]\}',?\n/;
function Xo(t) {
    return 'responseURL' in t && t.responseURL
        ? t.responseURL
        : /^X-Request-URL:/m.test(t.getAllResponseHeaders())
          ? t.getResponseHeader('X-Request-URL')
          : null;
}
var Hr = (() => {
        let e = class e {
            constructor(n) {
                this.xhrFactory = n;
            }
            handle(n) {
                if (n.method === 'JSONP') throw new x(-2800, !1);
                let i = this.xhrFactory;
                return (i.ɵloadImpl ? Y(i.ɵloadImpl()) : v(null)).pipe(
                    te(
                        () =>
                            new qt((o) => {
                                let a = i.build();
                                if (
                                    (a.open(n.method, n.urlWithParams),
                                    n.withCredentials &&
                                        (a.withCredentials = !0),
                                    n.headers.forEach((w, b) =>
                                        a.setRequestHeader(w, b.join(',')),
                                    ),
                                    n.headers.has('Accept') ||
                                        a.setRequestHeader(
                                            'Accept',
                                            'application/json, text/plain, */*',
                                        ),
                                    !n.headers.has('Content-Type'))
                                ) {
                                    let w = n.detectContentTypeHeader();
                                    w !== null &&
                                        a.setRequestHeader('Content-Type', w);
                                }
                                if (n.responseType) {
                                    let w = n.responseType.toLowerCase();
                                    a.responseType = w !== 'json' ? w : 'text';
                                }
                                let l = n.serializeBody(),
                                    c = null,
                                    u = () => {
                                        if (c !== null) return c;
                                        let w = a.statusText || 'OK',
                                            b = new Ie(
                                                a.getAllResponseHeaders(),
                                            ),
                                            Z = Xo(a) || n.url;
                                        return (
                                            (c = new ei({
                                                headers: b,
                                                status: a.status,
                                                statusText: w,
                                                url: Z,
                                            })),
                                            c
                                        );
                                    },
                                    d = () => {
                                        let {
                                                headers: w,
                                                status: b,
                                                statusText: Z,
                                                url: ar,
                                            } = u(),
                                            K = null;
                                        b !== hn.NoContent &&
                                            (K =
                                                typeof a.response > 'u'
                                                    ? a.responseText
                                                    : a.response),
                                            b === 0 && (b = K ? hn.Ok : 0);
                                        let Fn = b >= 200 && b < 300;
                                        if (
                                            n.responseType === 'json' &&
                                            typeof K == 'string'
                                        ) {
                                            let Lo = K;
                                            K = K.replace(Yo, '');
                                            try {
                                                K =
                                                    K !== ''
                                                        ? JSON.parse(K)
                                                        : null;
                                            } catch (Fo) {
                                                (K = Lo),
                                                    Fn &&
                                                        ((Fn = !1),
                                                        (K = {
                                                            error: Fo,
                                                            text: K,
                                                        }));
                                            }
                                        }
                                        Fn
                                            ? (o.next(
                                                  new Ze({
                                                      body: K,
                                                      headers: w,
                                                      status: b,
                                                      statusText: Z,
                                                      url: ar || void 0,
                                                  }),
                                              ),
                                              o.complete())
                                            : o.error(
                                                  new dn({
                                                      error: K,
                                                      headers: w,
                                                      status: b,
                                                      statusText: Z,
                                                      url: ar || void 0,
                                                  }),
                                              );
                                    },
                                    h = (w) => {
                                        let { url: b } = u(),
                                            Z = new dn({
                                                error: w,
                                                status: a.status || 0,
                                                statusText:
                                                    a.statusText ||
                                                    'Unknown Error',
                                                url: b || void 0,
                                            });
                                        o.error(Z);
                                    },
                                    R = !1,
                                    G = (w) => {
                                        R || (o.next(u()), (R = !0));
                                        let b = {
                                            type: Ke.DownloadProgress,
                                            loaded: w.loaded,
                                        };
                                        w.lengthComputable &&
                                            (b.total = w.total),
                                            n.responseType === 'text' &&
                                                a.responseText &&
                                                (b.partialText =
                                                    a.responseText),
                                            o.next(b);
                                    },
                                    L = (w) => {
                                        let b = {
                                            type: Ke.UploadProgress,
                                            loaded: w.loaded,
                                        };
                                        w.lengthComputable &&
                                            (b.total = w.total),
                                            o.next(b);
                                    };
                                return (
                                    a.addEventListener('load', d),
                                    a.addEventListener('error', h),
                                    a.addEventListener('timeout', h),
                                    a.addEventListener('abort', h),
                                    n.reportProgress &&
                                        (a.addEventListener('progress', G),
                                        l !== null &&
                                            a.upload &&
                                            a.upload.addEventListener(
                                                'progress',
                                                L,
                                            )),
                                    a.send(l),
                                    o.next({ type: Ke.Sent }),
                                    () => {
                                        a.removeEventListener('error', h),
                                            a.removeEventListener('abort', h),
                                            a.removeEventListener('load', d),
                                            a.removeEventListener('timeout', h),
                                            n.reportProgress &&
                                                (a.removeEventListener(
                                                    'progress',
                                                    G,
                                                ),
                                                l !== null &&
                                                    a.upload &&
                                                    a.upload.removeEventListener(
                                                        'progress',
                                                        L,
                                                    )),
                                            a.readyState !== a.DONE &&
                                                a.abort();
                                    }
                                );
                            }),
                    ),
                );
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)(g(an));
        }),
            (e.ɵprov = m({ token: e, factory: e.ɵfac }));
        let t = e;
        return t;
    })(),
    ns = new E(''),
    Qo = 'XSRF-TOKEN',
    Jo = new E('', { providedIn: 'root', factory: () => Qo }),
    ea = 'X-XSRF-TOKEN',
    ta = new E('', { providedIn: 'root', factory: () => ea }),
    pn = class {},
    na = (() => {
        let e = class e {
            constructor(n, i, s) {
                (this.doc = n),
                    (this.platform = i),
                    (this.cookieName = s),
                    (this.lastCookieString = ''),
                    (this.lastToken = null),
                    (this.parseCount = 0);
            }
            getToken() {
                if (this.platform === 'server') return null;
                let n = this.doc.cookie || '';
                return (
                    n !== this.lastCookieString &&
                        (this.parseCount++,
                        (this.lastToken = on(n, this.cookieName)),
                        (this.lastCookieString = n)),
                    this.lastToken
                );
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)(g(U), g(he), g(Jo));
        }),
            (e.ɵprov = m({ token: e, factory: e.ɵfac }));
        let t = e;
        return t;
    })();
function ia(t, e) {
    let r = t.url.toLowerCase();
    if (
        !f(ns) ||
        t.method === 'GET' ||
        t.method === 'HEAD' ||
        r.startsWith('http://') ||
        r.startsWith('https://')
    )
        return e(t);
    let n = f(pn).getToken(),
        i = f(ta);
    return (
        n != null &&
            !t.headers.has(i) &&
            (t = t.clone({ headers: t.headers.set(i, n) })),
        e(t)
    );
}
var is = (function (t) {
    return (
        (t[(t.Interceptors = 0)] = 'Interceptors'),
        (t[(t.LegacyInterceptors = 1)] = 'LegacyInterceptors'),
        (t[(t.CustomXsrfConfiguration = 2)] = 'CustomXsrfConfiguration'),
        (t[(t.NoXsrfProtection = 3)] = 'NoXsrfProtection'),
        (t[(t.JsonpSupport = 4)] = 'JsonpSupport'),
        (t[(t.RequestsMadeViaParent = 5)] = 'RequestsMadeViaParent'),
        (t[(t.Fetch = 6)] = 'Fetch'),
        t
    );
})(is || {});
function ra(t, e) {
    return { ɵkind: t, ɵproviders: e };
}
function sa(...t) {
    let e = [
        ti,
        Hr,
        qr,
        { provide: _t, useExisting: qr },
        { provide: un, useExisting: Hr },
        { provide: ni, useValue: ia, multi: !0 },
        { provide: ns, useValue: !0 },
        { provide: pn, useClass: na },
    ];
    for (let r of t) e.push(...r.ɵproviders);
    return be(e);
}
var Gr = new E('');
function oa() {
    return ra(is.LegacyInterceptors, [
        { provide: Gr, useFactory: Zo },
        { provide: ni, useExisting: Gr, multi: !0 },
    ]);
}
var rs = (() => {
    let e = class e {};
    (e.ɵfac = function (i) {
        return new (i || e)();
    }),
        (e.ɵmod = X({ type: e })),
        (e.ɵinj = Q({ providers: [sa(oa())] }));
    let t = e;
    return t;
})();
var Kr = 'b',
    Zr = 'h',
    Yr = 's',
    Xr = 'st',
    Qr = 'u',
    Jr = 'rt',
    ln = new E(''),
    aa = ['GET', 'HEAD'];
function ca(t, e) {
    let u = f(ln),
        { isCacheActive: r } = u,
        n = cr(u, ['isCacheActive']),
        { transferCache: i, method: s } = t;
    if (
        !r ||
        (s === 'POST' && !n.includePostRequests && !i) ||
        (s !== 'POST' && !aa.includes(s)) ||
        i === !1 ||
        n.filter?.(t) === !1
    )
        return e(t);
    let o = f(Zt),
        a = ua(t),
        l = o.get(a, null),
        c = n.includeHeaders;
    if (
        (typeof i == 'object' && i.includeHeaders && (c = i.includeHeaders), l)
    ) {
        let { [Kr]: d, [Jr]: h, [Zr]: R, [Yr]: G, [Xr]: L, [Qr]: w } = l,
            b = d;
        switch (h) {
            case 'arraybuffer':
                b = new TextEncoder().encode(d).buffer;
                break;
            case 'blob':
                b = new Blob([d]);
                break;
        }
        let Z = new Ie(R);
        return v(
            new Ze({ body: b, headers: Z, status: G, statusText: L, url: w }),
        );
    }
    return e(t).pipe(
        k((d) => {
            d instanceof Ze &&
                o.set(a, {
                    [Kr]: d.body,
                    [Zr]: la(d.headers, c),
                    [Yr]: d.status,
                    [Xr]: d.statusText,
                    [Qr]: d.url || '',
                    [Jr]: t.responseType,
                });
        }),
    );
}
function la(t, e) {
    if (!e) return {};
    let r = {};
    for (let n of e) {
        let i = t.getAll(n);
        i !== null && (r[n] = i);
    }
    return r;
}
function ua(t) {
    let { params: e, method: r, responseType: n, url: i, body: s } = t,
        o = e
            .keys()
            .sort()
            .map((u) => `${u}=${e.getAll(u)}`)
            .join('&'),
        l = [r, n, i, typeof s == 'string' ? s : '', o].join('|'),
        c = da(l);
    return c;
}
function da(t) {
    let e = 0;
    for (let r of t) e = (Math.imul(31, e) + r.charCodeAt(0)) << 0;
    return (e += 2147483648), e.toString();
}
function ss(t) {
    return [
        {
            provide: ln,
            useFactory: () => (
                Xt('NgHttpTransferCache'), p({ isCacheActive: !0 }, t)
            ),
        },
        { provide: ts, useValue: ca, multi: !0, deps: [Zt, ln] },
        {
            provide: nn,
            multi: !0,
            useFactory: () => {
                let e = f(yt),
                    r = f(ln);
                return () => {
                    Or(e).then(() => {
                        r.isCacheActive = !1;
                    });
                };
            },
        },
    ];
}
var si = class extends Lr {
        constructor() {
            super(...arguments), (this.supportsDOMEvents = !0);
        }
    },
    oi = class t extends si {
        static makeCurrent() {
            Pr(new t());
        }
        onAndCancel(e, r, n) {
            return (
                e.addEventListener(r, n),
                () => {
                    e.removeEventListener(r, n);
                }
            );
        }
        dispatchEvent(e, r) {
            e.dispatchEvent(r);
        }
        remove(e) {
            e.parentNode && e.parentNode.removeChild(e);
        }
        createElement(e, r) {
            return (r = r || this.getDefaultDocument()), r.createElement(e);
        }
        createHtmlDocument() {
            return document.implementation.createHTMLDocument('fakeTitle');
        }
        getDefaultDocument() {
            return document;
        }
        isElementNode(e) {
            return e.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(e) {
            return e instanceof DocumentFragment;
        }
        getGlobalEventTarget(e, r) {
            return r === 'window'
                ? window
                : r === 'document'
                  ? e
                  : r === 'body'
                    ? e.body
                    : null;
        }
        getBaseHref(e) {
            let r = fa();
            return r == null ? null : ma(r);
        }
        resetBaseElement() {
            It = null;
        }
        getUserAgent() {
            return window.navigator.userAgent;
        }
        getCookie(e) {
            return on(document.cookie, e);
        }
    },
    It = null;
function fa() {
    return (
        (It = It || document.querySelector('base')),
        It ? It.getAttribute('href') : null
    );
}
function ma(t) {
    return new URL(t, document.baseURI).pathname;
}
var ga = (() => {
        let e = class e {
            build() {
                return new XMLHttpRequest();
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)();
        }),
            (e.ɵprov = m({ token: e, factory: e.ɵfac }));
        let t = e;
        return t;
    })(),
    ai = new E(''),
    ls = (() => {
        let e = class e {
            constructor(n, i) {
                (this._zone = i),
                    (this._eventNameToPlugin = new Map()),
                    n.forEach((s) => {
                        s.manager = this;
                    }),
                    (this._plugins = n.slice().reverse());
            }
            addEventListener(n, i, s) {
                return this._findPluginFor(i).addEventListener(n, i, s);
            }
            getZone() {
                return this._zone;
            }
            _findPluginFor(n) {
                let i = this._eventNameToPlugin.get(n);
                if (i) return i;
                if (((i = this._plugins.find((o) => o.supports(n))), !i))
                    throw new x(5101, !1);
                return this._eventNameToPlugin.set(n, i), i;
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)(g(ai), g(B));
        }),
            (e.ɵprov = m({ token: e, factory: e.ɵfac }));
        let t = e;
        return t;
    })(),
    mn = class {
        constructor(e) {
            this._doc = e;
        }
    },
    ii = 'ng-app-id',
    us = (() => {
        let e = class e {
            constructor(n, i, s, o = {}) {
                (this.doc = n),
                    (this.appId = i),
                    (this.nonce = s),
                    (this.platformId = o),
                    (this.styleRef = new Map()),
                    (this.hostNodes = new Set()),
                    (this.styleNodesInDOM = this.collectServerRenderedStyles()),
                    (this.platformIsServer = Yn(o)),
                    this.resetHostNodes();
            }
            addStyles(n) {
                for (let i of n)
                    this.changeUsageCount(i, 1) === 1 && this.onStyleAdded(i);
            }
            removeStyles(n) {
                for (let i of n)
                    this.changeUsageCount(i, -1) <= 0 && this.onStyleRemoved(i);
            }
            ngOnDestroy() {
                let n = this.styleNodesInDOM;
                n && (n.forEach((i) => i.remove()), n.clear());
                for (let i of this.getAllStyles()) this.onStyleRemoved(i);
                this.resetHostNodes();
            }
            addHost(n) {
                this.hostNodes.add(n);
                for (let i of this.getAllStyles()) this.addStyleToHost(n, i);
            }
            removeHost(n) {
                this.hostNodes.delete(n);
            }
            getAllStyles() {
                return this.styleRef.keys();
            }
            onStyleAdded(n) {
                for (let i of this.hostNodes) this.addStyleToHost(i, n);
            }
            onStyleRemoved(n) {
                let i = this.styleRef;
                i.get(n)?.elements?.forEach((s) => s.remove()), i.delete(n);
            }
            collectServerRenderedStyles() {
                let n = this.doc.head?.querySelectorAll(
                    `style[${ii}="${this.appId}"]`,
                );
                if (n?.length) {
                    let i = new Map();
                    return (
                        n.forEach((s) => {
                            s.textContent != null && i.set(s.textContent, s);
                        }),
                        i
                    );
                }
                return null;
            }
            changeUsageCount(n, i) {
                let s = this.styleRef;
                if (s.has(n)) {
                    let o = s.get(n);
                    return (o.usage += i), o.usage;
                }
                return s.set(n, { usage: i, elements: [] }), i;
            }
            getStyleElement(n, i) {
                let s = this.styleNodesInDOM,
                    o = s?.get(i);
                if (o?.parentNode === n)
                    return s.delete(i), o.removeAttribute(ii), o;
                {
                    let a = this.doc.createElement('style');
                    return (
                        this.nonce && a.setAttribute('nonce', this.nonce),
                        (a.textContent = i),
                        this.platformIsServer && a.setAttribute(ii, this.appId),
                        n.appendChild(a),
                        a
                    );
                }
            }
            addStyleToHost(n, i) {
                let s = this.getStyleElement(n, i),
                    o = this.styleRef,
                    a = o.get(i)?.elements;
                a ? a.push(s) : o.set(i, { elements: [s], usage: 1 });
            }
            resetHostNodes() {
                let n = this.hostNodes;
                n.clear(), n.add(this.doc.head);
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)(g(U), g(Kt), g(ht, 8), g(he));
        }),
            (e.ɵprov = m({ token: e, factory: e.ɵfac }));
        let t = e;
        return t;
    })(),
    ri = {
        svg: 'http://www.w3.org/2000/svg',
        xhtml: 'http://www.w3.org/1999/xhtml',
        xlink: 'http://www.w3.org/1999/xlink',
        xml: 'http://www.w3.org/XML/1998/namespace',
        xmlns: 'http://www.w3.org/2000/xmlns/',
        math: 'http://www.w3.org/1998/MathML/',
    },
    ui = /%COMP%/g,
    ds = '%COMP%',
    va = `_nghost-${ds}`,
    ya = `_ngcontent-${ds}`,
    ba = !0,
    _a = new E('', { providedIn: 'root', factory: () => ba });
function wa(t) {
    return ya.replace(ui, t);
}
function Ia(t) {
    return va.replace(ui, t);
}
function hs(t, e) {
    return e.map((r) => r.replace(ui, t));
}
var gn = (() => {
        let e = class e {
            constructor(n, i, s, o, a, l, c, u = null) {
                (this.eventManager = n),
                    (this.sharedStylesHost = i),
                    (this.appId = s),
                    (this.removeStylesOnCompDestroy = o),
                    (this.doc = a),
                    (this.platformId = l),
                    (this.ngZone = c),
                    (this.nonce = u),
                    (this.rendererByCompId = new Map()),
                    (this.platformIsServer = Yn(l)),
                    (this.defaultRenderer = new Tt(
                        n,
                        a,
                        c,
                        this.platformIsServer,
                    ));
            }
            createRenderer(n, i) {
                if (!n || !i) return this.defaultRenderer;
                this.platformIsServer &&
                    i.encapsulation === ct.ShadowDom &&
                    (i = W(p({}, i), { encapsulation: ct.Emulated }));
                let s = this.getOrCreateRenderer(n, i);
                return (
                    s instanceof vn
                        ? s.applyToHost(n)
                        : s instanceof Et && s.applyStyles(),
                    s
                );
            }
            getOrCreateRenderer(n, i) {
                let s = this.rendererByCompId,
                    o = s.get(i.id);
                if (!o) {
                    let a = this.doc,
                        l = this.ngZone,
                        c = this.eventManager,
                        u = this.sharedStylesHost,
                        d = this.removeStylesOnCompDestroy,
                        h = this.platformIsServer;
                    switch (i.encapsulation) {
                        case ct.Emulated:
                            o = new vn(c, u, i, this.appId, d, a, l, h);
                            break;
                        case ct.ShadowDom:
                            return new ci(c, u, n, i, a, l, this.nonce, h);
                        default:
                            o = new Et(c, u, i, d, a, l, h);
                            break;
                    }
                    s.set(i.id, o);
                }
                return o;
            }
            ngOnDestroy() {
                this.rendererByCompId.clear();
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)(
                g(ls),
                g(us),
                g(Kt),
                g(_a),
                g(U),
                g(he),
                g(B),
                g(ht),
            );
        }),
            (e.ɵprov = m({ token: e, factory: e.ɵfac }));
        let t = e;
        return t;
    })(),
    Tt = class {
        constructor(e, r, n, i) {
            (this.eventManager = e),
                (this.doc = r),
                (this.ngZone = n),
                (this.platformIsServer = i),
                (this.data = Object.create(null)),
                (this.throwOnSyntheticProps = !0),
                (this.destroyNode = null);
        }
        destroy() {}
        createElement(e, r) {
            return r
                ? this.doc.createElementNS(ri[r] || r, e)
                : this.doc.createElement(e);
        }
        createComment(e) {
            return this.doc.createComment(e);
        }
        createText(e) {
            return this.doc.createTextNode(e);
        }
        appendChild(e, r) {
            (os(e) ? e.content : e).appendChild(r);
        }
        insertBefore(e, r, n) {
            e && (os(e) ? e.content : e).insertBefore(r, n);
        }
        removeChild(e, r) {
            e && e.removeChild(r);
        }
        selectRootElement(e, r) {
            let n = typeof e == 'string' ? this.doc.querySelector(e) : e;
            if (!n) throw new x(-5104, !1);
            return r || (n.textContent = ''), n;
        }
        parentNode(e) {
            return e.parentNode;
        }
        nextSibling(e) {
            return e.nextSibling;
        }
        setAttribute(e, r, n, i) {
            if (i) {
                r = i + ':' + r;
                let s = ri[i];
                s ? e.setAttributeNS(s, r, n) : e.setAttribute(r, n);
            } else e.setAttribute(r, n);
        }
        removeAttribute(e, r, n) {
            if (n) {
                let i = ri[n];
                i ? e.removeAttributeNS(i, r) : e.removeAttribute(`${n}:${r}`);
            } else e.removeAttribute(r);
        }
        addClass(e, r) {
            e.classList.add(r);
        }
        removeClass(e, r) {
            e.classList.remove(r);
        }
        setStyle(e, r, n, i) {
            i & (ft.DashCase | ft.Important)
                ? e.style.setProperty(r, n, i & ft.Important ? 'important' : '')
                : (e.style[r] = n);
        }
        removeStyle(e, r, n) {
            n & ft.DashCase ? e.style.removeProperty(r) : (e.style[r] = '');
        }
        setProperty(e, r, n) {
            e != null && (e[r] = n);
        }
        setValue(e, r) {
            e.nodeValue = r;
        }
        listen(e, r, n) {
            if (
                typeof e == 'string' &&
                ((e = Zn().getGlobalEventTarget(this.doc, e)), !e)
            )
                throw new Error(`Unsupported event target ${e} for event ${r}`);
            return this.eventManager.addEventListener(
                e,
                r,
                this.decoratePreventDefault(n),
            );
        }
        decoratePreventDefault(e) {
            return (r) => {
                if (r === '__ngUnwrap__') return e;
                (this.platformIsServer
                    ? this.ngZone.runGuarded(() => e(r))
                    : e(r)) === !1 && r.preventDefault();
            };
        }
    };
function os(t) {
    return t.tagName === 'TEMPLATE' && t.content !== void 0;
}
var ci = class extends Tt {
        constructor(e, r, n, i, s, o, a, l) {
            super(e, s, o, l),
                (this.sharedStylesHost = r),
                (this.hostEl = n),
                (this.shadowRoot = n.attachShadow({ mode: 'open' })),
                this.sharedStylesHost.addHost(this.shadowRoot);
            let c = hs(i.id, i.styles);
            for (let u of c) {
                let d = document.createElement('style');
                a && d.setAttribute('nonce', a),
                    (d.textContent = u),
                    this.shadowRoot.appendChild(d);
            }
        }
        nodeOrShadowRoot(e) {
            return e === this.hostEl ? this.shadowRoot : e;
        }
        appendChild(e, r) {
            return super.appendChild(this.nodeOrShadowRoot(e), r);
        }
        insertBefore(e, r, n) {
            return super.insertBefore(this.nodeOrShadowRoot(e), r, n);
        }
        removeChild(e, r) {
            return super.removeChild(this.nodeOrShadowRoot(e), r);
        }
        parentNode(e) {
            return this.nodeOrShadowRoot(
                super.parentNode(this.nodeOrShadowRoot(e)),
            );
        }
        destroy() {
            this.sharedStylesHost.removeHost(this.shadowRoot);
        }
    },
    Et = class extends Tt {
        constructor(e, r, n, i, s, o, a, l) {
            super(e, s, o, a),
                (this.sharedStylesHost = r),
                (this.removeStylesOnCompDestroy = i),
                (this.styles = l ? hs(l, n.styles) : n.styles);
        }
        applyStyles() {
            this.sharedStylesHost.addStyles(this.styles);
        }
        destroy() {
            this.removeStylesOnCompDestroy &&
                this.sharedStylesHost.removeStyles(this.styles);
        }
    },
    vn = class extends Et {
        constructor(e, r, n, i, s, o, a, l) {
            let c = i + '-' + n.id;
            super(e, r, n, s, o, a, l, c),
                (this.contentAttr = wa(c)),
                (this.hostAttr = Ia(c));
        }
        applyToHost(e) {
            this.applyStyles(), this.setAttribute(e, this.hostAttr, '');
        }
        createElement(e, r) {
            let n = super.createElement(e, r);
            return super.setAttribute(n, this.contentAttr, ''), n;
        }
    },
    Ta = (() => {
        let e = class e extends mn {
            constructor(n) {
                super(n);
            }
            supports(n) {
                return !0;
            }
            addEventListener(n, i, s) {
                return (
                    n.addEventListener(i, s, !1),
                    () => this.removeEventListener(n, i, s)
                );
            }
            removeEventListener(n, i, s) {
                return n.removeEventListener(i, s);
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)(g(U));
        }),
            (e.ɵprov = m({ token: e, factory: e.ɵfac }));
        let t = e;
        return t;
    })(),
    as = ['alt', 'control', 'meta', 'shift'],
    Ea = {
        '\b': 'Backspace',
        '	': 'Tab',
        '\x7F': 'Delete',
        '\x1B': 'Escape',
        Del: 'Delete',
        Esc: 'Escape',
        Left: 'ArrowLeft',
        Right: 'ArrowRight',
        Up: 'ArrowUp',
        Down: 'ArrowDown',
        Menu: 'ContextMenu',
        Scroll: 'ScrollLock',
        Win: 'OS',
    },
    Ca = {
        alt: (t) => t.altKey,
        control: (t) => t.ctrlKey,
        meta: (t) => t.metaKey,
        shift: (t) => t.shiftKey,
    },
    Ra = (() => {
        let e = class e extends mn {
            constructor(n) {
                super(n);
            }
            supports(n) {
                return e.parseEventName(n) != null;
            }
            addEventListener(n, i, s) {
                let o = e.parseEventName(i),
                    a = e.eventCallback(o.fullKey, s, this.manager.getZone());
                return this.manager
                    .getZone()
                    .runOutsideAngular(() =>
                        Zn().onAndCancel(n, o.domEventName, a),
                    );
            }
            static parseEventName(n) {
                let i = n.toLowerCase().split('.'),
                    s = i.shift();
                if (i.length === 0 || !(s === 'keydown' || s === 'keyup'))
                    return null;
                let o = e._normalizeKey(i.pop()),
                    a = '',
                    l = i.indexOf('code');
                if (
                    (l > -1 && (i.splice(l, 1), (a = 'code.')),
                    as.forEach((u) => {
                        let d = i.indexOf(u);
                        d > -1 && (i.splice(d, 1), (a += u + '.'));
                    }),
                    (a += o),
                    i.length != 0 || o.length === 0)
                )
                    return null;
                let c = {};
                return (c.domEventName = s), (c.fullKey = a), c;
            }
            static matchEventFullKeyCode(n, i) {
                let s = Ea[n.key] || n.key,
                    o = '';
                return (
                    i.indexOf('code.') > -1 && ((s = n.code), (o = 'code.')),
                    s == null || !s
                        ? !1
                        : ((s = s.toLowerCase()),
                          s === ' ' ? (s = 'space') : s === '.' && (s = 'dot'),
                          as.forEach((a) => {
                              if (a !== s) {
                                  let l = Ca[a];
                                  l(n) && (o += a + '.');
                              }
                          }),
                          (o += s),
                          o === i)
                );
            }
            static eventCallback(n, i, s) {
                return (o) => {
                    e.matchEventFullKeyCode(o, n) && s.runGuarded(() => i(o));
                };
            }
            static _normalizeKey(n) {
                return n === 'esc' ? 'escape' : n;
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)(g(U));
        }),
            (e.ɵprov = m({ token: e, factory: e.ɵfac }));
        let t = e;
        return t;
    })();
function ps(t, e) {
    return kr(p({ rootComponent: t }, Da(e)));
}
function Da(t) {
    return {
        appProviders: [...Oa, ...(t?.providers ?? [])],
        platformProviders: Ma,
    };
}
function Sa() {
    oi.makeCurrent();
}
function Aa() {
    return new qn();
}
function xa() {
    return br(document), document;
}
var Ma = [
    { provide: he, useValue: Ur },
    { provide: wr, useValue: Sa, multi: !0 },
    { provide: U, useFactory: xa, deps: [] },
];
var Oa = [
    { provide: Tr, useValue: 'root' },
    { provide: qn, useFactory: Aa, deps: [] },
    { provide: ai, useClass: Ta, multi: !0, deps: [U, B, he] },
    { provide: ai, useClass: Ra, multi: !0, deps: [U] },
    gn,
    us,
    ls,
    { provide: Yt, useExisting: gn },
    { provide: an, useClass: ga, deps: [] },
    [],
];
var fs = (() => {
    let e = class e {
        constructor(n) {
            this._doc = n;
        }
        getTitle() {
            return this._doc.title;
        }
        setTitle(n) {
            this._doc.title = n || '';
        }
    };
    (e.ɵfac = function (i) {
        return new (i || e)(g(U));
    }),
        (e.ɵprov = m({ token: e, factory: e.ɵfac, providedIn: 'root' }));
    let t = e;
    return t;
})();
var li = (function (t) {
    return (
        (t[(t.NoHttpTransferCache = 0)] = 'NoHttpTransferCache'),
        (t[(t.HttpTransferCacheOptions = 1)] = 'HttpTransferCacheOptions'),
        t
    );
})(li || {});
function ms(...t) {
    let e = [],
        r = new Set(),
        n = r.has(li.HttpTransferCacheOptions);
    for (let { ɵproviders: i, ɵkind: s } of t) r.add(s), i.length && e.push(i);
    return be([[], Nr(), r.has(li.NoHttpTransferCache) || n ? [] : ss({}), e]);
}
var y = 'primary',
    Ut = Symbol('RouteTitle'),
    mi = class {
        constructor(e) {
            this.params = e || {};
        }
        has(e) {
            return Object.prototype.hasOwnProperty.call(this.params, e);
        }
        get(e) {
            if (this.has(e)) {
                let r = this.params[e];
                return Array.isArray(r) ? r[0] : r;
            }
            return null;
        }
        getAll(e) {
            if (this.has(e)) {
                let r = this.params[e];
                return Array.isArray(r) ? r : [r];
            }
            return [];
        }
        get keys() {
            return Object.keys(this.params);
        }
    };
function et(t) {
    return new mi(t);
}
function Na(t, e, r) {
    let n = r.path.split('/');
    if (
        n.length > t.length ||
        (r.pathMatch === 'full' && (e.hasChildren() || n.length < t.length))
    )
        return null;
    let i = {};
    for (let s = 0; s < n.length; s++) {
        let o = n[s],
            a = t[s];
        if (o.startsWith(':')) i[o.substring(1)] = a;
        else if (o !== a.path) return null;
    }
    return { consumed: t.slice(0, n.length), posParams: i };
}
function Pa(t, e) {
    if (t.length !== e.length) return !1;
    for (let r = 0; r < t.length; ++r) if (!ue(t[r], e[r])) return !1;
    return !0;
}
function ue(t, e) {
    let r = t ? gi(t) : void 0,
        n = e ? gi(e) : void 0;
    if (!r || !n || r.length != n.length) return !1;
    let i;
    for (let s = 0; s < r.length; s++)
        if (((i = r[s]), !Is(t[i], e[i]))) return !1;
    return !0;
}
function gi(t) {
    return [...Object.keys(t), ...Object.getOwnPropertySymbols(t)];
}
function Is(t, e) {
    if (Array.isArray(t) && Array.isArray(e)) {
        if (t.length !== e.length) return !1;
        let r = [...t].sort(),
            n = [...e].sort();
        return r.every((i, s) => n[s] === i);
    } else return t === e;
}
function Ts(t) {
    return t.length > 0 ? t[t.length - 1] : null;
}
function Ce(t) {
    return dr(t) ? t : Mr(t) ? Y(Promise.resolve(t)) : v(t);
}
var La = { exact: Cs, subset: Rs },
    Es = { exact: Fa, subset: ja, ignored: () => !0 };
function gs(t, e, r) {
    return (
        La[r.paths](t.root, e.root, r.matrixParams) &&
        Es[r.queryParams](t.queryParams, e.queryParams) &&
        !(r.fragment === 'exact' && t.fragment !== e.fragment)
    );
}
function Fa(t, e) {
    return ue(t, e);
}
function Cs(t, e, r) {
    if (
        !Fe(t.segments, e.segments) ||
        !_n(t.segments, e.segments, r) ||
        t.numberOfChildren !== e.numberOfChildren
    )
        return !1;
    for (let n in e.children)
        if (!t.children[n] || !Cs(t.children[n], e.children[n], r)) return !1;
    return !0;
}
function ja(t, e) {
    return (
        Object.keys(e).length <= Object.keys(t).length &&
        Object.keys(e).every((r) => Is(t[r], e[r]))
    );
}
function Rs(t, e, r) {
    return Ds(t, e, e.segments, r);
}
function Ds(t, e, r, n) {
    if (t.segments.length > r.length) {
        let i = t.segments.slice(0, r.length);
        return !(!Fe(i, r) || e.hasChildren() || !_n(i, r, n));
    } else if (t.segments.length === r.length) {
        if (!Fe(t.segments, r) || !_n(t.segments, r, n)) return !1;
        for (let i in e.children)
            if (!t.children[i] || !Rs(t.children[i], e.children[i], n))
                return !1;
        return !0;
    } else {
        let i = r.slice(0, t.segments.length),
            s = r.slice(t.segments.length);
        return !Fe(t.segments, i) || !_n(t.segments, i, n) || !t.children[y]
            ? !1
            : Ds(t.children[y], e, s, n);
    }
}
function _n(t, e, r) {
    return e.every((n, i) => Es[r](t[i].parameters, n.parameters));
}
var Te = class {
        constructor(e = new T([], {}), r = {}, n = null) {
            (this.root = e), (this.queryParams = r), (this.fragment = n);
        }
        get queryParamMap() {
            return (
                (this._queryParamMap ??= et(this.queryParams)),
                this._queryParamMap
            );
        }
        toString() {
            return Ba.serialize(this);
        }
    },
    T = class {
        constructor(e, r) {
            (this.segments = e),
                (this.children = r),
                (this.parent = null),
                Object.values(r).forEach((n) => (n.parent = this));
        }
        hasChildren() {
            return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
            return Object.keys(this.children).length;
        }
        toString() {
            return wn(this);
        }
    },
    Le = class {
        constructor(e, r) {
            (this.path = e), (this.parameters = r);
        }
        get parameterMap() {
            return (
                (this._parameterMap ??= et(this.parameters)), this._parameterMap
            );
        }
        toString() {
            return As(this);
        }
    };
function Ua(t, e) {
    return Fe(t, e) && t.every((r, n) => ue(r.parameters, e[n].parameters));
}
function Fe(t, e) {
    return t.length !== e.length ? !1 : t.every((r, n) => r.path === e[n].path);
}
function $a(t, e) {
    let r = [];
    return (
        Object.entries(t.children).forEach(([n, i]) => {
            n === y && (r = r.concat(e(i, n)));
        }),
        Object.entries(t.children).forEach(([n, i]) => {
            n !== y && (r = r.concat(e(i, n)));
        }),
        r
    );
}
var zi = (() => {
        let e = class e {};
        (e.ɵfac = function (i) {
            return new (i || e)();
        }),
            (e.ɵprov = m({
                token: e,
                factory: () => new Tn(),
                providedIn: 'root',
            }));
        let t = e;
        return t;
    })(),
    Tn = class {
        parse(e) {
            let r = new yi(e);
            return new Te(
                r.parseRootSegment(),
                r.parseQueryParams(),
                r.parseFragment(),
            );
        }
        serialize(e) {
            let r = `/${Ct(e.root, !0)}`,
                n = Wa(e.queryParams),
                i = typeof e.fragment == 'string' ? `#${za(e.fragment)}` : '';
            return `${r}${n}${i}`;
        }
    },
    Ba = new Tn();
function wn(t) {
    return t.segments.map((e) => As(e)).join('/');
}
function Ct(t, e) {
    if (!t.hasChildren()) return wn(t);
    if (e) {
        let r = t.children[y] ? Ct(t.children[y], !1) : '',
            n = [];
        return (
            Object.entries(t.children).forEach(([i, s]) => {
                i !== y && n.push(`${i}:${Ct(s, !1)}`);
            }),
            n.length > 0 ? `${r}(${n.join('//')})` : r
        );
    } else {
        let r = $a(t, (n, i) =>
            i === y ? [Ct(t.children[y], !1)] : [`${i}:${Ct(n, !1)}`],
        );
        return Object.keys(t.children).length === 1 && t.children[y] != null
            ? `${wn(t)}/${r[0]}`
            : `${wn(t)}/(${r.join('//')})`;
    }
}
function Ss(t) {
    return encodeURIComponent(t)
        .replace(/%40/g, '@')
        .replace(/%3A/gi, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/gi, ',');
}
function yn(t) {
    return Ss(t).replace(/%3B/gi, ';');
}
function za(t) {
    return encodeURI(t);
}
function vi(t) {
    return Ss(t)
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29')
        .replace(/%26/gi, '&');
}
function In(t) {
    return decodeURIComponent(t);
}
function vs(t) {
    return In(t.replace(/\+/g, '%20'));
}
function As(t) {
    return `${vi(t.path)}${Va(t.parameters)}`;
}
function Va(t) {
    return Object.entries(t)
        .map(([e, r]) => `;${vi(e)}=${vi(r)}`)
        .join('');
}
function Wa(t) {
    let e = Object.entries(t)
        .map(([r, n]) =>
            Array.isArray(n)
                ? n.map((i) => `${yn(r)}=${yn(i)}`).join('&')
                : `${yn(r)}=${yn(n)}`,
        )
        .filter((r) => r);
    return e.length ? `?${e.join('&')}` : '';
}
var qa = /^[^\/()?;#]+/;
function di(t) {
    let e = t.match(qa);
    return e ? e[0] : '';
}
var Ha = /^[^\/()?;=#]+/;
function Ga(t) {
    let e = t.match(Ha);
    return e ? e[0] : '';
}
var Ka = /^[^=?&#]+/;
function Za(t) {
    let e = t.match(Ka);
    return e ? e[0] : '';
}
var Ya = /^[^&#]+/;
function Xa(t) {
    let e = t.match(Ya);
    return e ? e[0] : '';
}
var yi = class {
    constructor(e) {
        (this.url = e), (this.remaining = e);
    }
    parseRootSegment() {
        return (
            this.consumeOptional('/'),
            this.remaining === '' ||
            this.peekStartsWith('?') ||
            this.peekStartsWith('#')
                ? new T([], {})
                : new T([], this.parseChildren())
        );
    }
    parseQueryParams() {
        let e = {};
        if (this.consumeOptional('?'))
            do this.parseQueryParam(e);
            while (this.consumeOptional('&'));
        return e;
    }
    parseFragment() {
        return this.consumeOptional('#')
            ? decodeURIComponent(this.remaining)
            : null;
    }
    parseChildren() {
        if (this.remaining === '') return {};
        this.consumeOptional('/');
        let e = [];
        for (
            this.peekStartsWith('(') || e.push(this.parseSegment());
            this.peekStartsWith('/') &&
            !this.peekStartsWith('//') &&
            !this.peekStartsWith('/(');

        )
            this.capture('/'), e.push(this.parseSegment());
        let r = {};
        this.peekStartsWith('/(') &&
            (this.capture('/'), (r = this.parseParens(!0)));
        let n = {};
        return (
            this.peekStartsWith('(') && (n = this.parseParens(!1)),
            (e.length > 0 || Object.keys(r).length > 0) && (n[y] = new T(e, r)),
            n
        );
    }
    parseSegment() {
        let e = di(this.remaining);
        if (e === '' && this.peekStartsWith(';')) throw new x(4009, !1);
        return this.capture(e), new Le(In(e), this.parseMatrixParams());
    }
    parseMatrixParams() {
        let e = {};
        for (; this.consumeOptional(';'); ) this.parseParam(e);
        return e;
    }
    parseParam(e) {
        let r = Ga(this.remaining);
        if (!r) return;
        this.capture(r);
        let n = '';
        if (this.consumeOptional('=')) {
            let i = di(this.remaining);
            i && ((n = i), this.capture(n));
        }
        e[In(r)] = In(n);
    }
    parseQueryParam(e) {
        let r = Za(this.remaining);
        if (!r) return;
        this.capture(r);
        let n = '';
        if (this.consumeOptional('=')) {
            let o = Xa(this.remaining);
            o && ((n = o), this.capture(n));
        }
        let i = vs(r),
            s = vs(n);
        if (e.hasOwnProperty(i)) {
            let o = e[i];
            Array.isArray(o) || ((o = [o]), (e[i] = o)), o.push(s);
        } else e[i] = s;
    }
    parseParens(e) {
        let r = {};
        for (
            this.capture('(');
            !this.consumeOptional(')') && this.remaining.length > 0;

        ) {
            let n = di(this.remaining),
                i = this.remaining[n.length];
            if (i !== '/' && i !== ')' && i !== ';') throw new x(4010, !1);
            let s;
            n.indexOf(':') > -1
                ? ((s = n.slice(0, n.indexOf(':'))),
                  this.capture(s),
                  this.capture(':'))
                : e && (s = y);
            let o = this.parseChildren();
            (r[s] = Object.keys(o).length === 1 ? o[y] : new T([], o)),
                this.consumeOptional('//');
        }
        return r;
    }
    peekStartsWith(e) {
        return this.remaining.startsWith(e);
    }
    consumeOptional(e) {
        return this.peekStartsWith(e)
            ? ((this.remaining = this.remaining.substring(e.length)), !0)
            : !1;
    }
    capture(e) {
        if (!this.consumeOptional(e)) throw new x(4011, !1);
    }
};
function xs(t) {
    return t.segments.length > 0 ? new T([], { [y]: t }) : t;
}
function Ms(t) {
    let e = {};
    for (let [n, i] of Object.entries(t.children)) {
        let s = Ms(i);
        if (n === y && s.segments.length === 0 && s.hasChildren())
            for (let [o, a] of Object.entries(s.children)) e[o] = a;
        else (s.segments.length > 0 || s.hasChildren()) && (e[n] = s);
    }
    let r = new T(t.segments, e);
    return Qa(r);
}
function Qa(t) {
    if (t.numberOfChildren === 1 && t.children[y]) {
        let e = t.children[y];
        return new T(t.segments.concat(e.segments), e.children);
    }
    return t;
}
function tt(t) {
    return t instanceof Te;
}
function Ja(t, e, r = null, n = null) {
    let i = Os(t);
    return ks(i, e, r, n);
}
function Os(t) {
    let e;
    function r(s) {
        let o = {};
        for (let l of s.children) {
            let c = r(l);
            o[l.outlet] = c;
        }
        let a = new T(s.url, o);
        return s === t && (e = a), a;
    }
    let n = r(t.root),
        i = xs(n);
    return e ?? i;
}
function ks(t, e, r, n) {
    let i = t;
    for (; i.parent; ) i = i.parent;
    if (e.length === 0) return hi(i, i, i, r, n);
    let s = ec(e);
    if (s.toRoot()) return hi(i, i, new T([], {}), r, n);
    let o = tc(s, i, t),
        a = o.processChildren
            ? St(o.segmentGroup, o.index, s.commands)
            : Ps(o.segmentGroup, o.index, s.commands);
    return hi(i, o.segmentGroup, a, r, n);
}
function En(t) {
    return typeof t == 'object' && t != null && !t.outlets && !t.segmentPath;
}
function Mt(t) {
    return typeof t == 'object' && t != null && t.outlets;
}
function hi(t, e, r, n, i) {
    let s = {};
    n &&
        Object.entries(n).forEach(([l, c]) => {
            s[l] = Array.isArray(c) ? c.map((u) => `${u}`) : `${c}`;
        });
    let o;
    t === e ? (o = r) : (o = Ns(t, e, r));
    let a = xs(Ms(o));
    return new Te(a, s, i);
}
function Ns(t, e, r) {
    let n = {};
    return (
        Object.entries(t.children).forEach(([i, s]) => {
            s === e ? (n[i] = r) : (n[i] = Ns(s, e, r));
        }),
        new T(t.segments, n)
    );
}
var Cn = class {
    constructor(e, r, n) {
        if (
            ((this.isAbsolute = e),
            (this.numberOfDoubleDots = r),
            (this.commands = n),
            e && n.length > 0 && En(n[0]))
        )
            throw new x(4003, !1);
        let i = n.find(Mt);
        if (i && i !== Ts(n)) throw new x(4004, !1);
    }
    toRoot() {
        return (
            this.isAbsolute &&
            this.commands.length === 1 &&
            this.commands[0] == '/'
        );
    }
};
function ec(t) {
    if (typeof t[0] == 'string' && t.length === 1 && t[0] === '/')
        return new Cn(!0, 0, t);
    let e = 0,
        r = !1,
        n = t.reduce((i, s, o) => {
            if (typeof s == 'object' && s != null) {
                if (s.outlets) {
                    let a = {};
                    return (
                        Object.entries(s.outlets).forEach(([l, c]) => {
                            a[l] = typeof c == 'string' ? c.split('/') : c;
                        }),
                        [...i, { outlets: a }]
                    );
                }
                if (s.segmentPath) return [...i, s.segmentPath];
            }
            return typeof s != 'string'
                ? [...i, s]
                : o === 0
                  ? (s.split('/').forEach((a, l) => {
                        (l == 0 && a === '.') ||
                            (l == 0 && a === ''
                                ? (r = !0)
                                : a === '..'
                                  ? e++
                                  : a != '' && i.push(a));
                    }),
                    i)
                  : [...i, s];
        }, []);
    return new Cn(r, e, n);
}
var Qe = class {
    constructor(e, r, n) {
        (this.segmentGroup = e), (this.processChildren = r), (this.index = n);
    }
};
function tc(t, e, r) {
    if (t.isAbsolute) return new Qe(e, !0, 0);
    if (!r) return new Qe(e, !1, NaN);
    if (r.parent === null) return new Qe(r, !0, 0);
    let n = En(t.commands[0]) ? 0 : 1,
        i = r.segments.length - 1 + n;
    return nc(r, i, t.numberOfDoubleDots);
}
function nc(t, e, r) {
    let n = t,
        i = e,
        s = r;
    for (; s > i; ) {
        if (((s -= i), (n = n.parent), !n)) throw new x(4005, !1);
        i = n.segments.length;
    }
    return new Qe(n, !1, i - s);
}
function ic(t) {
    return Mt(t[0]) ? t[0].outlets : { [y]: t };
}
function Ps(t, e, r) {
    if (((t ??= new T([], {})), t.segments.length === 0 && t.hasChildren()))
        return St(t, e, r);
    let n = rc(t, e, r),
        i = r.slice(n.commandIndex);
    if (n.match && n.pathIndex < t.segments.length) {
        let s = new T(t.segments.slice(0, n.pathIndex), {});
        return (
            (s.children[y] = new T(t.segments.slice(n.pathIndex), t.children)),
            St(s, 0, i)
        );
    } else
        return n.match && i.length === 0
            ? new T(t.segments, {})
            : n.match && !t.hasChildren()
              ? bi(t, e, r)
              : n.match
                ? St(t, 0, i)
                : bi(t, e, r);
}
function St(t, e, r) {
    if (r.length === 0) return new T(t.segments, {});
    {
        let n = ic(r),
            i = {};
        if (
            Object.keys(n).some((s) => s !== y) &&
            t.children[y] &&
            t.numberOfChildren === 1 &&
            t.children[y].segments.length === 0
        ) {
            let s = St(t.children[y], e, r);
            return new T(t.segments, s.children);
        }
        return (
            Object.entries(n).forEach(([s, o]) => {
                typeof o == 'string' && (o = [o]),
                    o !== null && (i[s] = Ps(t.children[s], e, o));
            }),
            Object.entries(t.children).forEach(([s, o]) => {
                n[s] === void 0 && (i[s] = o);
            }),
            new T(t.segments, i)
        );
    }
}
function rc(t, e, r) {
    let n = 0,
        i = e,
        s = { match: !1, pathIndex: 0, commandIndex: 0 };
    for (; i < t.segments.length; ) {
        if (n >= r.length) return s;
        let o = t.segments[i],
            a = r[n];
        if (Mt(a)) break;
        let l = `${a}`,
            c = n < r.length - 1 ? r[n + 1] : null;
        if (i > 0 && l === void 0) break;
        if (l && c && typeof c == 'object' && c.outlets === void 0) {
            if (!bs(l, c, o)) return s;
            n += 2;
        } else {
            if (!bs(l, {}, o)) return s;
            n++;
        }
        i++;
    }
    return { match: !0, pathIndex: i, commandIndex: n };
}
function bi(t, e, r) {
    let n = t.segments.slice(0, e),
        i = 0;
    for (; i < r.length; ) {
        let s = r[i];
        if (Mt(s)) {
            let l = sc(s.outlets);
            return new T(n, l);
        }
        if (i === 0 && En(r[0])) {
            let l = t.segments[e];
            n.push(new Le(l.path, ys(r[0]))), i++;
            continue;
        }
        let o = Mt(s) ? s.outlets[y] : `${s}`,
            a = i < r.length - 1 ? r[i + 1] : null;
        o && a && En(a)
            ? (n.push(new Le(o, ys(a))), (i += 2))
            : (n.push(new Le(o, {})), i++);
    }
    return new T(n, {});
}
function sc(t) {
    let e = {};
    return (
        Object.entries(t).forEach(([r, n]) => {
            typeof n == 'string' && (n = [n]),
                n !== null && (e[r] = bi(new T([], {}), 0, n));
        }),
        e
    );
}
function ys(t) {
    let e = {};
    return Object.entries(t).forEach(([r, n]) => (e[r] = `${n}`)), e;
}
function bs(t, e, r) {
    return t == r.path && ue(e, r.parameters);
}
var At = 'imperative',
    V = (function (t) {
        return (
            (t[(t.NavigationStart = 0)] = 'NavigationStart'),
            (t[(t.NavigationEnd = 1)] = 'NavigationEnd'),
            (t[(t.NavigationCancel = 2)] = 'NavigationCancel'),
            (t[(t.NavigationError = 3)] = 'NavigationError'),
            (t[(t.RoutesRecognized = 4)] = 'RoutesRecognized'),
            (t[(t.ResolveStart = 5)] = 'ResolveStart'),
            (t[(t.ResolveEnd = 6)] = 'ResolveEnd'),
            (t[(t.GuardsCheckStart = 7)] = 'GuardsCheckStart'),
            (t[(t.GuardsCheckEnd = 8)] = 'GuardsCheckEnd'),
            (t[(t.RouteConfigLoadStart = 9)] = 'RouteConfigLoadStart'),
            (t[(t.RouteConfigLoadEnd = 10)] = 'RouteConfigLoadEnd'),
            (t[(t.ChildActivationStart = 11)] = 'ChildActivationStart'),
            (t[(t.ChildActivationEnd = 12)] = 'ChildActivationEnd'),
            (t[(t.ActivationStart = 13)] = 'ActivationStart'),
            (t[(t.ActivationEnd = 14)] = 'ActivationEnd'),
            (t[(t.Scroll = 15)] = 'Scroll'),
            (t[(t.NavigationSkipped = 16)] = 'NavigationSkipped'),
            t
        );
    })(V || {}),
    oe = class {
        constructor(e, r) {
            (this.id = e), (this.url = r);
        }
    },
    Ot = class extends oe {
        constructor(e, r, n = 'imperative', i = null) {
            super(e, r),
                (this.type = V.NavigationStart),
                (this.navigationTrigger = n),
                (this.restoredState = i);
        }
        toString() {
            return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
    },
    je = class extends oe {
        constructor(e, r, n) {
            super(e, r),
                (this.urlAfterRedirects = n),
                (this.type = V.NavigationEnd);
        }
        toString() {
            return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
    },
    se = (function (t) {
        return (
            (t[(t.Redirect = 0)] = 'Redirect'),
            (t[(t.SupersededByNewNavigation = 1)] =
                'SupersededByNewNavigation'),
            (t[(t.NoDataFromResolver = 2)] = 'NoDataFromResolver'),
            (t[(t.GuardRejected = 3)] = 'GuardRejected'),
            t
        );
    })(se || {}),
    _i = (function (t) {
        return (
            (t[(t.IgnoredSameUrlNavigation = 0)] = 'IgnoredSameUrlNavigation'),
            (t[(t.IgnoredByUrlHandlingStrategy = 1)] =
                'IgnoredByUrlHandlingStrategy'),
            t
        );
    })(_i || {}),
    Ee = class extends oe {
        constructor(e, r, n, i) {
            super(e, r),
                (this.reason = n),
                (this.code = i),
                (this.type = V.NavigationCancel);
        }
        toString() {
            return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
    },
    Ue = class extends oe {
        constructor(e, r, n, i) {
            super(e, r),
                (this.reason = n),
                (this.code = i),
                (this.type = V.NavigationSkipped);
        }
    },
    kt = class extends oe {
        constructor(e, r, n, i) {
            super(e, r),
                (this.error = n),
                (this.target = i),
                (this.type = V.NavigationError);
        }
        toString() {
            return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
    },
    Rn = class extends oe {
        constructor(e, r, n, i) {
            super(e, r),
                (this.urlAfterRedirects = n),
                (this.state = i),
                (this.type = V.RoutesRecognized);
        }
        toString() {
            return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
    },
    wi = class extends oe {
        constructor(e, r, n, i) {
            super(e, r),
                (this.urlAfterRedirects = n),
                (this.state = i),
                (this.type = V.GuardsCheckStart);
        }
        toString() {
            return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
    },
    Ii = class extends oe {
        constructor(e, r, n, i, s) {
            super(e, r),
                (this.urlAfterRedirects = n),
                (this.state = i),
                (this.shouldActivate = s),
                (this.type = V.GuardsCheckEnd);
        }
        toString() {
            return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
    },
    Ti = class extends oe {
        constructor(e, r, n, i) {
            super(e, r),
                (this.urlAfterRedirects = n),
                (this.state = i),
                (this.type = V.ResolveStart);
        }
        toString() {
            return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
    },
    Ei = class extends oe {
        constructor(e, r, n, i) {
            super(e, r),
                (this.urlAfterRedirects = n),
                (this.state = i),
                (this.type = V.ResolveEnd);
        }
        toString() {
            return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
    },
    Ci = class {
        constructor(e) {
            (this.route = e), (this.type = V.RouteConfigLoadStart);
        }
        toString() {
            return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
    },
    Ri = class {
        constructor(e) {
            (this.route = e), (this.type = V.RouteConfigLoadEnd);
        }
        toString() {
            return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
    },
    Di = class {
        constructor(e) {
            (this.snapshot = e), (this.type = V.ChildActivationStart);
        }
        toString() {
            return `ChildActivationStart(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''}')`;
        }
    },
    Si = class {
        constructor(e) {
            (this.snapshot = e), (this.type = V.ChildActivationEnd);
        }
        toString() {
            return `ChildActivationEnd(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''}')`;
        }
    },
    Ai = class {
        constructor(e) {
            (this.snapshot = e), (this.type = V.ActivationStart);
        }
        toString() {
            return `ActivationStart(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''}')`;
        }
    },
    xi = class {
        constructor(e) {
            (this.snapshot = e), (this.type = V.ActivationEnd);
        }
        toString() {
            return `ActivationEnd(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''}')`;
        }
    };
var Nt = class {},
    Pt = class {
        constructor(e) {
            this.url = e;
        }
    };
var Mi = class {
        constructor() {
            (this.outlet = null),
                (this.route = null),
                (this.injector = null),
                (this.children = new On()),
                (this.attachRef = null);
        }
    },
    On = (() => {
        let e = class e {
            constructor() {
                this.contexts = new Map();
            }
            onChildOutletCreated(n, i) {
                let s = this.getOrCreateContext(n);
                (s.outlet = i), this.contexts.set(n, s);
            }
            onChildOutletDestroyed(n) {
                let i = this.getContext(n);
                i && ((i.outlet = null), (i.attachRef = null));
            }
            onOutletDeactivated() {
                let n = this.contexts;
                return (this.contexts = new Map()), n;
            }
            onOutletReAttached(n) {
                this.contexts = n;
            }
            getOrCreateContext(n) {
                let i = this.getContext(n);
                return i || ((i = new Mi()), this.contexts.set(n, i)), i;
            }
            getContext(n) {
                return this.contexts.get(n) || null;
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)();
        }),
            (e.ɵprov = m({ token: e, factory: e.ɵfac, providedIn: 'root' }));
        let t = e;
        return t;
    })(),
    Dn = class {
        constructor(e) {
            this._root = e;
        }
        get root() {
            return this._root.value;
        }
        parent(e) {
            let r = this.pathFromRoot(e);
            return r.length > 1 ? r[r.length - 2] : null;
        }
        children(e) {
            let r = Oi(e, this._root);
            return r ? r.children.map((n) => n.value) : [];
        }
        firstChild(e) {
            let r = Oi(e, this._root);
            return r && r.children.length > 0 ? r.children[0].value : null;
        }
        siblings(e) {
            let r = ki(e, this._root);
            return r.length < 2
                ? []
                : r[r.length - 2].children
                      .map((i) => i.value)
                      .filter((i) => i !== e);
        }
        pathFromRoot(e) {
            return ki(e, this._root).map((r) => r.value);
        }
    };
function Oi(t, e) {
    if (t === e.value) return e;
    for (let r of e.children) {
        let n = Oi(t, r);
        if (n) return n;
    }
    return null;
}
function ki(t, e) {
    if (t === e.value) return [e];
    for (let r of e.children) {
        let n = ki(t, r);
        if (n.length) return n.unshift(e), n;
    }
    return [];
}
var J = class {
    constructor(e, r) {
        (this.value = e), (this.children = r);
    }
    toString() {
        return `TreeNode(${this.value})`;
    }
};
function Xe(t) {
    let e = {};
    return t && t.children.forEach((r) => (e[r.value.outlet] = r)), e;
}
var Sn = class extends Dn {
    constructor(e, r) {
        super(e), (this.snapshot = r), Wi(this, e);
    }
    toString() {
        return this.snapshot.toString();
    }
};
function Ls(t) {
    let e = oc(t),
        r = new A([new Le('', {})]),
        n = new A({}),
        i = new A({}),
        s = new A({}),
        o = new A(''),
        a = new nt(r, n, s, o, i, y, t, e.root);
    return (a.snapshot = e.root), new Sn(new J(a, []), e);
}
function oc(t) {
    let e = {},
        r = {},
        n = {},
        i = '',
        s = new Lt([], e, n, i, r, y, t, null, {});
    return new An('', new J(s, []));
}
var nt = class {
    constructor(e, r, n, i, s, o, a, l) {
        (this.urlSubject = e),
            (this.paramsSubject = r),
            (this.queryParamsSubject = n),
            (this.fragmentSubject = i),
            (this.dataSubject = s),
            (this.outlet = o),
            (this.component = a),
            (this._futureSnapshot = l),
            (this.title = this.dataSubject?.pipe(_((c) => c[Ut])) ?? v(void 0)),
            (this.url = e),
            (this.params = r),
            (this.queryParams = n),
            (this.fragment = i),
            (this.data = s);
    }
    get routeConfig() {
        return this._futureSnapshot.routeConfig;
    }
    get root() {
        return this._routerState.root;
    }
    get parent() {
        return this._routerState.parent(this);
    }
    get firstChild() {
        return this._routerState.firstChild(this);
    }
    get children() {
        return this._routerState.children(this);
    }
    get pathFromRoot() {
        return this._routerState.pathFromRoot(this);
    }
    get paramMap() {
        return (
            (this._paramMap ??= this.params.pipe(_((e) => et(e)))),
            this._paramMap
        );
    }
    get queryParamMap() {
        return (
            (this._queryParamMap ??= this.queryParams.pipe(_((e) => et(e)))),
            this._queryParamMap
        );
    }
    toString() {
        return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
    }
};
function Vi(t, e, r = 'emptyOnly') {
    let n,
        { routeConfig: i } = t;
    return (
        e !== null &&
        (r === 'always' ||
            i?.path === '' ||
            (!e.component && !e.routeConfig?.loadComponent))
            ? (n = {
                  params: p(p({}, e.params), t.params),
                  data: p(p({}, e.data), t.data),
                  resolve: p(
                      p(p(p({}, t.data), e.data), i?.data),
                      t._resolvedData,
                  ),
              })
            : (n = {
                  params: p({}, t.params),
                  data: p({}, t.data),
                  resolve: p(p({}, t.data), t._resolvedData ?? {}),
              }),
        i && js(i) && (n.resolve[Ut] = i.title),
        n
    );
}
var Lt = class {
        get title() {
            return this.data?.[Ut];
        }
        constructor(e, r, n, i, s, o, a, l, c) {
            (this.url = e),
                (this.params = r),
                (this.queryParams = n),
                (this.fragment = i),
                (this.data = s),
                (this.outlet = o),
                (this.component = a),
                (this.routeConfig = l),
                (this._resolve = c);
        }
        get root() {
            return this._routerState.root;
        }
        get parent() {
            return this._routerState.parent(this);
        }
        get firstChild() {
            return this._routerState.firstChild(this);
        }
        get children() {
            return this._routerState.children(this);
        }
        get pathFromRoot() {
            return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
            return (this._paramMap ??= et(this.params)), this._paramMap;
        }
        get queryParamMap() {
            return (
                (this._queryParamMap ??= et(this.queryParams)),
                this._queryParamMap
            );
        }
        toString() {
            let e = this.url.map((n) => n.toString()).join('/'),
                r = this.routeConfig ? this.routeConfig.path : '';
            return `Route(url:'${e}', path:'${r}')`;
        }
    },
    An = class extends Dn {
        constructor(e, r) {
            super(r), (this.url = e), Wi(this, r);
        }
        toString() {
            return Fs(this._root);
        }
    };
function Wi(t, e) {
    (e.value._routerState = t), e.children.forEach((r) => Wi(t, r));
}
function Fs(t) {
    let e =
        t.children.length > 0 ? ` { ${t.children.map(Fs).join(', ')} } ` : '';
    return `${t.value}${e}`;
}
function pi(t) {
    if (t.snapshot) {
        let e = t.snapshot,
            r = t._futureSnapshot;
        (t.snapshot = r),
            ue(e.queryParams, r.queryParams) ||
                t.queryParamsSubject.next(r.queryParams),
            e.fragment !== r.fragment && t.fragmentSubject.next(r.fragment),
            ue(e.params, r.params) || t.paramsSubject.next(r.params),
            Pa(e.url, r.url) || t.urlSubject.next(r.url),
            ue(e.data, r.data) || t.dataSubject.next(r.data);
    } else
        (t.snapshot = t._futureSnapshot),
            t.dataSubject.next(t._futureSnapshot.data);
}
function Ni(t, e) {
    let r = ue(t.params, e.params) && Ua(t.url, e.url),
        n = !t.parent != !e.parent;
    return r && !n && (!t.parent || Ni(t.parent, e.parent));
}
function js(t) {
    return typeof t.title == 'string' || t.title === null;
}
var ac = (() => {
        let e = class e {
            constructor() {
                (this.activated = null),
                    (this._activatedRoute = null),
                    (this.name = y),
                    (this.activateEvents = new xe()),
                    (this.deactivateEvents = new xe()),
                    (this.attachEvents = new xe()),
                    (this.detachEvents = new xe()),
                    (this.parentContexts = f(On)),
                    (this.location = f(Dr)),
                    (this.changeDetector = f(We)),
                    (this.environmentInjector = f(Ve)),
                    (this.inputBinder = f(qi, { optional: !0 })),
                    (this.supportsBindingToComponentInputs = !0);
            }
            get activatedComponentRef() {
                return this.activated;
            }
            ngOnChanges(n) {
                if (n.name) {
                    let { firstChange: i, previousValue: s } = n.name;
                    if (i) return;
                    this.isTrackedInParentContexts(s) &&
                        (this.deactivate(),
                        this.parentContexts.onChildOutletDestroyed(s)),
                        this.initializeOutletWithName();
                }
            }
            ngOnDestroy() {
                this.isTrackedInParentContexts(this.name) &&
                    this.parentContexts.onChildOutletDestroyed(this.name),
                    this.inputBinder?.unsubscribeFromRouteData(this);
            }
            isTrackedInParentContexts(n) {
                return this.parentContexts.getContext(n)?.outlet === this;
            }
            ngOnInit() {
                this.initializeOutletWithName();
            }
            initializeOutletWithName() {
                if (
                    (this.parentContexts.onChildOutletCreated(this.name, this),
                    this.activated)
                )
                    return;
                let n = this.parentContexts.getContext(this.name);
                n?.route &&
                    (n.attachRef
                        ? this.attach(n.attachRef, n.route)
                        : this.activateWith(n.route, n.injector));
            }
            get isActivated() {
                return !!this.activated;
            }
            get component() {
                if (!this.activated) throw new x(4012, !1);
                return this.activated.instance;
            }
            get activatedRoute() {
                if (!this.activated) throw new x(4012, !1);
                return this._activatedRoute;
            }
            get activatedRouteData() {
                return this._activatedRoute
                    ? this._activatedRoute.snapshot.data
                    : {};
            }
            detach() {
                if (!this.activated) throw new x(4012, !1);
                this.location.detach();
                let n = this.activated;
                return (
                    (this.activated = null),
                    (this._activatedRoute = null),
                    this.detachEvents.emit(n.instance),
                    n
                );
            }
            attach(n, i) {
                (this.activated = n),
                    (this._activatedRoute = i),
                    this.location.insert(n.hostView),
                    this.inputBinder?.bindActivatedRouteToOutletComponent(this),
                    this.attachEvents.emit(n.instance);
            }
            deactivate() {
                if (this.activated) {
                    let n = this.component;
                    this.activated.destroy(),
                        (this.activated = null),
                        (this._activatedRoute = null),
                        this.deactivateEvents.emit(n);
                }
            }
            activateWith(n, i) {
                if (this.isActivated) throw new x(4013, !1);
                this._activatedRoute = n;
                let s = this.location,
                    a = n.snapshot.component,
                    l = this.parentContexts.getOrCreateContext(
                        this.name,
                    ).children,
                    c = new Pi(n, l, s.injector);
                (this.activated = s.createComponent(a, {
                    index: s.length,
                    injector: c,
                    environmentInjector: i ?? this.environmentInjector,
                })),
                    this.changeDetector.markForCheck(),
                    this.inputBinder?.bindActivatedRouteToOutletComponent(this),
                    this.activateEvents.emit(this.activated.instance);
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)();
        }),
            (e.ɵdir = lt({
                type: e,
                selectors: [['router-outlet']],
                inputs: { name: 'name' },
                outputs: {
                    activateEvents: 'activate',
                    deactivateEvents: 'deactivate',
                    attachEvents: 'attach',
                    detachEvents: 'detach',
                },
                exportAs: ['outlet'],
                standalone: !0,
                features: [pt],
            }));
        let t = e;
        return t;
    })(),
    Pi = class {
        constructor(e, r, n) {
            (this.route = e), (this.childContexts = r), (this.parent = n);
        }
        get(e, r) {
            return e === nt
                ? this.route
                : e === On
                  ? this.childContexts
                  : this.parent.get(e, r);
        }
    },
    qi = new E('');
function cc(t, e, r) {
    let n = Ft(t, e._root, r ? r._root : void 0);
    return new Sn(n, e);
}
function Ft(t, e, r) {
    if (r && t.shouldReuseRoute(e.value, r.value.snapshot)) {
        let n = r.value;
        n._futureSnapshot = e.value;
        let i = lc(t, e, r);
        return new J(n, i);
    } else {
        if (t.shouldAttach(e.value)) {
            let s = t.retrieve(e.value);
            if (s !== null) {
                let o = s.route;
                return (
                    (o.value._futureSnapshot = e.value),
                    (o.children = e.children.map((a) => Ft(t, a))),
                    o
                );
            }
        }
        let n = uc(e.value),
            i = e.children.map((s) => Ft(t, s));
        return new J(n, i);
    }
}
function lc(t, e, r) {
    return e.children.map((n) => {
        for (let i of r.children)
            if (t.shouldReuseRoute(n.value, i.value.snapshot))
                return Ft(t, n, i);
        return Ft(t, n);
    });
}
function uc(t) {
    return new nt(
        new A(t.url),
        new A(t.params),
        new A(t.queryParams),
        new A(t.fragment),
        new A(t.data),
        t.outlet,
        t.component,
        t,
    );
}
var Us = 'ngNavigationCancelingError';
function $s(t, e) {
    let { redirectTo: r, navigationBehaviorOptions: n } = tt(e)
            ? { redirectTo: e, navigationBehaviorOptions: void 0 }
            : e,
        i = Bs(!1, se.Redirect);
    return (i.url = r), (i.navigationBehaviorOptions = n), i;
}
function Bs(t, e) {
    let r = new Error(`NavigationCancelingError: ${t || ''}`);
    return (r[Us] = !0), (r.cancellationCode = e), r;
}
function dc(t) {
    return zs(t) && tt(t.url);
}
function zs(t) {
    return !!t && t[Us];
}
var hc = (() => {
    let e = class e {};
    (e.ɵfac = function (i) {
        return new (i || e)();
    }),
        (e.ɵcmp = N({
            type: e,
            selectors: [['ng-component']],
            standalone: !0,
            features: [P],
            decls: 1,
            vars: 0,
            template: function (i, s) {
                i & 1 && F(0, 'router-outlet');
            },
            dependencies: [ac],
            encapsulation: 2,
        }));
    let t = e;
    return t;
})();
function pc(t, e) {
    return (
        t.providers &&
            !t._injector &&
            (t._injector = Ar(t.providers, e, `Route: ${t.path}`)),
        t._injector ?? e
    );
}
function Hi(t) {
    let e = t.children && t.children.map(Hi),
        r = e ? W(p({}, t), { children: e }) : p({}, t);
    return (
        !r.component &&
            !r.loadComponent &&
            (e || r.loadChildren) &&
            r.outlet &&
            r.outlet !== y &&
            (r.component = hc),
        r
    );
}
function de(t) {
    return t.outlet || y;
}
function fc(t, e) {
    let r = t.filter((n) => de(n) === e);
    return r.push(...t.filter((n) => de(n) !== e)), r;
}
function $t(t) {
    if (!t) return null;
    if (t.routeConfig?._injector) return t.routeConfig._injector;
    for (let e = t.parent; e; e = e.parent) {
        let r = e.routeConfig;
        if (r?._loadedInjector) return r._loadedInjector;
        if (r?._injector) return r._injector;
    }
    return null;
}
var mc = (t, e, r, n) =>
        _(
            (i) => (
                new Li(
                    e,
                    i.targetRouterState,
                    i.currentRouterState,
                    r,
                    n,
                ).activate(t),
                i
            ),
        ),
    Li = class {
        constructor(e, r, n, i, s) {
            (this.routeReuseStrategy = e),
                (this.futureState = r),
                (this.currState = n),
                (this.forwardEvent = i),
                (this.inputBindingEnabled = s);
        }
        activate(e) {
            let r = this.futureState._root,
                n = this.currState ? this.currState._root : null;
            this.deactivateChildRoutes(r, n, e),
                pi(this.futureState.root),
                this.activateChildRoutes(r, n, e);
        }
        deactivateChildRoutes(e, r, n) {
            let i = Xe(r);
            e.children.forEach((s) => {
                let o = s.value.outlet;
                this.deactivateRoutes(s, i[o], n), delete i[o];
            }),
                Object.values(i).forEach((s) => {
                    this.deactivateRouteAndItsChildren(s, n);
                });
        }
        deactivateRoutes(e, r, n) {
            let i = e.value,
                s = r ? r.value : null;
            if (i === s)
                if (i.component) {
                    let o = n.getContext(i.outlet);
                    o && this.deactivateChildRoutes(e, r, o.children);
                } else this.deactivateChildRoutes(e, r, n);
            else s && this.deactivateRouteAndItsChildren(r, n);
        }
        deactivateRouteAndItsChildren(e, r) {
            e.value.component &&
            this.routeReuseStrategy.shouldDetach(e.value.snapshot)
                ? this.detachAndStoreRouteSubtree(e, r)
                : this.deactivateRouteAndOutlet(e, r);
        }
        detachAndStoreRouteSubtree(e, r) {
            let n = r.getContext(e.value.outlet),
                i = n && e.value.component ? n.children : r,
                s = Xe(e);
            for (let o of Object.values(s))
                this.deactivateRouteAndItsChildren(o, i);
            if (n && n.outlet) {
                let o = n.outlet.detach(),
                    a = n.children.onOutletDeactivated();
                this.routeReuseStrategy.store(e.value.snapshot, {
                    componentRef: o,
                    route: e,
                    contexts: a,
                });
            }
        }
        deactivateRouteAndOutlet(e, r) {
            let n = r.getContext(e.value.outlet),
                i = n && e.value.component ? n.children : r,
                s = Xe(e);
            for (let o of Object.values(s))
                this.deactivateRouteAndItsChildren(o, i);
            n &&
                (n.outlet &&
                    (n.outlet.deactivate(), n.children.onOutletDeactivated()),
                (n.attachRef = null),
                (n.route = null));
        }
        activateChildRoutes(e, r, n) {
            let i = Xe(r);
            e.children.forEach((s) => {
                this.activateRoutes(s, i[s.value.outlet], n),
                    this.forwardEvent(new xi(s.value.snapshot));
            }),
                e.children.length &&
                    this.forwardEvent(new Si(e.value.snapshot));
        }
        activateRoutes(e, r, n) {
            let i = e.value,
                s = r ? r.value : null;
            if ((pi(i), i === s))
                if (i.component) {
                    let o = n.getOrCreateContext(i.outlet);
                    this.activateChildRoutes(e, r, o.children);
                } else this.activateChildRoutes(e, r, n);
            else if (i.component) {
                let o = n.getOrCreateContext(i.outlet);
                if (this.routeReuseStrategy.shouldAttach(i.snapshot)) {
                    let a = this.routeReuseStrategy.retrieve(i.snapshot);
                    this.routeReuseStrategy.store(i.snapshot, null),
                        o.children.onOutletReAttached(a.contexts),
                        (o.attachRef = a.componentRef),
                        (o.route = a.route.value),
                        o.outlet &&
                            o.outlet.attach(a.componentRef, a.route.value),
                        pi(a.route.value),
                        this.activateChildRoutes(e, null, o.children);
                } else {
                    let a = $t(i.snapshot);
                    (o.attachRef = null),
                        (o.route = i),
                        (o.injector = a),
                        o.outlet && o.outlet.activateWith(i, o.injector),
                        this.activateChildRoutes(e, null, o.children);
                }
            } else this.activateChildRoutes(e, null, n);
        }
    },
    xn = class {
        constructor(e) {
            (this.path = e), (this.route = this.path[this.path.length - 1]);
        }
    },
    Je = class {
        constructor(e, r) {
            (this.component = e), (this.route = r);
        }
    };
function gc(t, e, r) {
    let n = t._root,
        i = e ? e._root : null;
    return Rt(n, i, r, [n.value]);
}
function vc(t) {
    let e = t.routeConfig ? t.routeConfig.canActivateChild : null;
    return !e || e.length === 0 ? null : { node: t, guards: e };
}
function rt(t, e) {
    let r = Symbol(),
        n = e.get(t, r);
    return n === r ? (typeof t == 'function' && !_r(t) ? t : e.get(t)) : n;
}
function Rt(
    t,
    e,
    r,
    n,
    i = { canDeactivateChecks: [], canActivateChecks: [] },
) {
    let s = Xe(e);
    return (
        t.children.forEach((o) => {
            yc(o, s[o.value.outlet], r, n.concat([o.value]), i),
                delete s[o.value.outlet];
        }),
        Object.entries(s).forEach(([o, a]) => xt(a, r.getContext(o), i)),
        i
    );
}
function yc(
    t,
    e,
    r,
    n,
    i = { canDeactivateChecks: [], canActivateChecks: [] },
) {
    let s = t.value,
        o = e ? e.value : null,
        a = r ? r.getContext(t.value.outlet) : null;
    if (o && s.routeConfig === o.routeConfig) {
        let l = bc(o, s, s.routeConfig.runGuardsAndResolvers);
        l
            ? i.canActivateChecks.push(new xn(n))
            : ((s.data = o.data), (s._resolvedData = o._resolvedData)),
            s.component
                ? Rt(t, e, a ? a.children : null, n, i)
                : Rt(t, e, r, n, i),
            l &&
                a &&
                a.outlet &&
                a.outlet.isActivated &&
                i.canDeactivateChecks.push(new Je(a.outlet.component, o));
    } else
        o && xt(e, a, i),
            i.canActivateChecks.push(new xn(n)),
            s.component
                ? Rt(t, null, a ? a.children : null, n, i)
                : Rt(t, null, r, n, i);
    return i;
}
function bc(t, e, r) {
    if (typeof r == 'function') return r(t, e);
    switch (r) {
        case 'pathParamsChange':
            return !Fe(t.url, e.url);
        case 'pathParamsOrQueryParamsChange':
            return !Fe(t.url, e.url) || !ue(t.queryParams, e.queryParams);
        case 'always':
            return !0;
        case 'paramsOrQueryParamsChange':
            return !Ni(t, e) || !ue(t.queryParams, e.queryParams);
        case 'paramsChange':
        default:
            return !Ni(t, e);
    }
}
function xt(t, e, r) {
    let n = Xe(t),
        i = t.value;
    Object.entries(n).forEach(([s, o]) => {
        i.component
            ? e
                ? xt(o, e.children.getContext(s), r)
                : xt(o, null, r)
            : xt(o, e, r);
    }),
        i.component
            ? e && e.outlet && e.outlet.isActivated
                ? r.canDeactivateChecks.push(new Je(e.outlet.component, i))
                : r.canDeactivateChecks.push(new Je(null, i))
            : r.canDeactivateChecks.push(new Je(null, i));
}
function Bt(t) {
    return typeof t == 'function';
}
function _c(t) {
    return typeof t == 'boolean';
}
function wc(t) {
    return t && Bt(t.canLoad);
}
function Ic(t) {
    return t && Bt(t.canActivate);
}
function Tc(t) {
    return t && Bt(t.canActivateChild);
}
function Ec(t) {
    return t && Bt(t.canDeactivate);
}
function Cc(t) {
    return t && Bt(t.canMatch);
}
function Vs(t) {
    return t instanceof hr || t?.name === 'EmptyError';
}
var bn = Symbol('INITIAL_VALUE');
function it() {
    return te((t) =>
        at(t.map((e) => e.pipe(ve(1), Gt(bn)))).pipe(
            _((e) => {
                for (let r of e)
                    if (r !== !0) {
                        if (r === bn) return bn;
                        if (r === !1 || r instanceof Te) return r;
                    }
                return !0;
            }),
            ge((e) => e !== bn),
            ve(1),
        ),
    );
}
function Rc(t, e) {
    return ee((r) => {
        let {
            targetSnapshot: n,
            currentSnapshot: i,
            guards: { canActivateChecks: s, canDeactivateChecks: o },
        } = r;
        return o.length === 0 && s.length === 0
            ? v(W(p({}, r), { guardsResult: !0 }))
            : Dc(o, n, i, t).pipe(
                  ee((a) => (a && _c(a) ? Sc(n, s, t, e) : v(a))),
                  _((a) => W(p({}, r), { guardsResult: a })),
              );
    });
}
function Dc(t, e, r, n) {
    return Y(t).pipe(
        ee((i) => kc(i.component, i.route, r, e, n)),
        ye((i) => i !== !0, !0),
    );
}
function Sc(t, e, r, n) {
    return Y(e).pipe(
        Se((i) =>
            Ht(
                xc(i.route.parent, n),
                Ac(i.route, n),
                Oc(t, i.path, r),
                Mc(t, i.route, r),
            ),
        ),
        ye((i) => i !== !0, !0),
    );
}
function Ac(t, e) {
    return t !== null && e && e(new Ai(t)), v(!0);
}
function xc(t, e) {
    return t !== null && e && e(new Di(t)), v(!0);
}
function Mc(t, e, r) {
    let n = e.routeConfig ? e.routeConfig.canActivate : null;
    if (!n || n.length === 0) return v(!0);
    let i = n.map((s) =>
        $n(() => {
            let o = $t(e) ?? r,
                a = rt(s, o),
                l = Ic(a) ? a.canActivate(e, t) : pe(o, () => a(e, t));
            return Ce(l).pipe(ye());
        }),
    );
    return v(i).pipe(it());
}
function Oc(t, e, r) {
    let n = e[e.length - 1],
        s = e
            .slice(0, e.length - 1)
            .reverse()
            .map((o) => vc(o))
            .filter((o) => o !== null)
            .map((o) =>
                $n(() => {
                    let a = o.guards.map((l) => {
                        let c = $t(o.node) ?? r,
                            u = rt(l, c),
                            d = Tc(u)
                                ? u.canActivateChild(n, t)
                                : pe(c, () => u(n, t));
                        return Ce(d).pipe(ye());
                    });
                    return v(a).pipe(it());
                }),
            );
    return v(s).pipe(it());
}
function kc(t, e, r, n, i) {
    let s = e && e.routeConfig ? e.routeConfig.canDeactivate : null;
    if (!s || s.length === 0) return v(!0);
    let o = s.map((a) => {
        let l = $t(e) ?? i,
            c = rt(a, l),
            u = Ec(c)
                ? c.canDeactivate(t, e, r, n)
                : pe(l, () => c(t, e, r, n));
        return Ce(u).pipe(ye());
    });
    return v(o).pipe(it());
}
function Nc(t, e, r, n) {
    let i = e.canLoad;
    if (i === void 0 || i.length === 0) return v(!0);
    let s = i.map((o) => {
        let a = rt(o, t),
            l = wc(a) ? a.canLoad(e, r) : pe(t, () => a(e, r));
        return Ce(l);
    });
    return v(s).pipe(it(), Ws(n));
}
function Ws(t) {
    return ur(
        k((e) => {
            if (tt(e)) throw $s(t, e);
        }),
        _((e) => e === !0),
    );
}
function Pc(t, e, r, n) {
    let i = e.canMatch;
    if (!i || i.length === 0) return v(!0);
    let s = i.map((o) => {
        let a = rt(o, t),
            l = Cc(a) ? a.canMatch(e, r) : pe(t, () => a(e, r));
        return Ce(l);
    });
    return v(s).pipe(it(), Ws(n));
}
var jt = class {
        constructor(e) {
            this.segmentGroup = e || null;
        }
    },
    Mn = class extends Error {
        constructor(e) {
            super(), (this.urlTree = e);
        }
    };
function Ye(t) {
    return ot(new jt(t));
}
function Lc(t) {
    return ot(new x(4e3, !1));
}
function Fc(t) {
    return ot(Bs(!1, se.GuardRejected));
}
var Fi = class {
        constructor(e, r) {
            (this.urlSerializer = e), (this.urlTree = r);
        }
        lineralizeSegments(e, r) {
            let n = [],
                i = r.root;
            for (;;) {
                if (((n = n.concat(i.segments)), i.numberOfChildren === 0))
                    return v(n);
                if (i.numberOfChildren > 1 || !i.children[y])
                    return Lc(e.redirectTo);
                i = i.children[y];
            }
        }
        applyRedirectCommands(e, r, n) {
            let i = this.applyRedirectCreateUrlTree(
                r,
                this.urlSerializer.parse(r),
                e,
                n,
            );
            if (r.startsWith('/')) throw new Mn(i);
            return i;
        }
        applyRedirectCreateUrlTree(e, r, n, i) {
            let s = this.createSegmentGroup(e, r.root, n, i);
            return new Te(
                s,
                this.createQueryParams(r.queryParams, this.urlTree.queryParams),
                r.fragment,
            );
        }
        createQueryParams(e, r) {
            let n = {};
            return (
                Object.entries(e).forEach(([i, s]) => {
                    if (typeof s == 'string' && s.startsWith(':')) {
                        let a = s.substring(1);
                        n[i] = r[a];
                    } else n[i] = s;
                }),
                n
            );
        }
        createSegmentGroup(e, r, n, i) {
            let s = this.createSegments(e, r.segments, n, i),
                o = {};
            return (
                Object.entries(r.children).forEach(([a, l]) => {
                    o[a] = this.createSegmentGroup(e, l, n, i);
                }),
                new T(s, o)
            );
        }
        createSegments(e, r, n, i) {
            return r.map((s) =>
                s.path.startsWith(':')
                    ? this.findPosParam(e, s, i)
                    : this.findOrReturn(s, n),
            );
        }
        findPosParam(e, r, n) {
            let i = n[r.path.substring(1)];
            if (!i) throw new x(4001, !1);
            return i;
        }
        findOrReturn(e, r) {
            let n = 0;
            for (let i of r) {
                if (i.path === e.path) return r.splice(n), i;
                n++;
            }
            return e;
        }
    },
    ji = {
        matched: !1,
        consumedSegments: [],
        remainingSegments: [],
        parameters: {},
        positionalParamSegments: {},
    };
function jc(t, e, r, n, i) {
    let s = Gi(t, e, r);
    return s.matched
        ? ((n = pc(e, n)),
          Pc(n, e, r, i).pipe(_((o) => (o === !0 ? s : p({}, ji)))))
        : v(s);
}
function Gi(t, e, r) {
    if (e.path === '**') return Uc(r);
    if (e.path === '')
        return e.pathMatch === 'full' && (t.hasChildren() || r.length > 0)
            ? p({}, ji)
            : {
                  matched: !0,
                  consumedSegments: [],
                  remainingSegments: r,
                  parameters: {},
                  positionalParamSegments: {},
              };
    let i = (e.matcher || Na)(r, t, e);
    if (!i) return p({}, ji);
    let s = {};
    Object.entries(i.posParams ?? {}).forEach(([a, l]) => {
        s[a] = l.path;
    });
    let o =
        i.consumed.length > 0
            ? p(p({}, s), i.consumed[i.consumed.length - 1].parameters)
            : s;
    return {
        matched: !0,
        consumedSegments: i.consumed,
        remainingSegments: r.slice(i.consumed.length),
        parameters: o,
        positionalParamSegments: i.posParams ?? {},
    };
}
function Uc(t) {
    return {
        matched: !0,
        parameters: t.length > 0 ? Ts(t).parameters : {},
        consumedSegments: t,
        remainingSegments: [],
        positionalParamSegments: {},
    };
}
function _s(t, e, r, n) {
    return r.length > 0 && zc(t, r, n)
        ? {
              segmentGroup: new T(e, Bc(n, new T(r, t.children))),
              slicedSegments: [],
          }
        : r.length === 0 && Vc(t, r, n)
          ? {
                segmentGroup: new T(t.segments, $c(t, r, n, t.children)),
                slicedSegments: r,
            }
          : { segmentGroup: new T(t.segments, t.children), slicedSegments: r };
}
function $c(t, e, r, n) {
    let i = {};
    for (let s of r)
        if (kn(t, e, s) && !n[de(s)]) {
            let o = new T([], {});
            i[de(s)] = o;
        }
    return p(p({}, n), i);
}
function Bc(t, e) {
    let r = {};
    r[y] = e;
    for (let n of t)
        if (n.path === '' && de(n) !== y) {
            let i = new T([], {});
            r[de(n)] = i;
        }
    return r;
}
function zc(t, e, r) {
    return r.some((n) => kn(t, e, n) && de(n) !== y);
}
function Vc(t, e, r) {
    return r.some((n) => kn(t, e, n));
}
function kn(t, e, r) {
    return (t.hasChildren() || e.length > 0) && r.pathMatch === 'full'
        ? !1
        : r.path === '';
}
function Wc(t, e, r, n) {
    return de(t) !== n && (n === y || !kn(e, r, t)) ? !1 : Gi(e, t, r).matched;
}
function qc(t, e, r) {
    return e.length === 0 && !t.children[r];
}
var Ui = class {};
function Hc(t, e, r, n, i, s, o = 'emptyOnly') {
    return new $i(t, e, r, n, i, o, s).recognize();
}
var Gc = 31,
    $i = class {
        constructor(e, r, n, i, s, o, a) {
            (this.injector = e),
                (this.configLoader = r),
                (this.rootComponentType = n),
                (this.config = i),
                (this.urlTree = s),
                (this.paramsInheritanceStrategy = o),
                (this.urlSerializer = a),
                (this.applyRedirects = new Fi(
                    this.urlSerializer,
                    this.urlTree,
                )),
                (this.absoluteRedirectCount = 0),
                (this.allowRedirects = !0);
        }
        noMatchError(e) {
            return new x(4002, `'${e.segmentGroup}'`);
        }
        recognize() {
            let e = _s(this.urlTree.root, [], [], this.config).segmentGroup;
            return this.match(e).pipe(
                _((r) => {
                    let n = new Lt(
                            [],
                            Object.freeze({}),
                            Object.freeze(p({}, this.urlTree.queryParams)),
                            this.urlTree.fragment,
                            {},
                            y,
                            this.rootComponentType,
                            null,
                            {},
                        ),
                        i = new J(n, r),
                        s = new An('', i),
                        o = Ja(
                            n,
                            [],
                            this.urlTree.queryParams,
                            this.urlTree.fragment,
                        );
                    return (
                        (o.queryParams = this.urlTree.queryParams),
                        (s.url = this.urlSerializer.serialize(o)),
                        this.inheritParamsAndData(s._root, null),
                        { state: s, tree: o }
                    );
                }),
            );
        }
        match(e) {
            return this.processSegmentGroup(
                this.injector,
                this.config,
                e,
                y,
            ).pipe(
                ze((n) => {
                    if (n instanceof Mn)
                        return (
                            (this.urlTree = n.urlTree),
                            this.match(n.urlTree.root)
                        );
                    throw n instanceof jt ? this.noMatchError(n) : n;
                }),
            );
        }
        inheritParamsAndData(e, r) {
            let n = e.value,
                i = Vi(n, r, this.paramsInheritanceStrategy);
            (n.params = Object.freeze(i.params)),
                (n.data = Object.freeze(i.data)),
                e.children.forEach((s) => this.inheritParamsAndData(s, n));
        }
        processSegmentGroup(e, r, n, i) {
            return n.segments.length === 0 && n.hasChildren()
                ? this.processChildren(e, r, n)
                : this.processSegment(e, r, n, n.segments, i, !0).pipe(
                      _((s) => (s instanceof J ? [s] : [])),
                  );
        }
        processChildren(e, r, n) {
            let i = [];
            for (let s of Object.keys(n.children))
                s === 'primary' ? i.unshift(s) : i.push(s);
            return Y(i).pipe(
                Se((s) => {
                    let o = n.children[s],
                        a = fc(r, s);
                    return this.processSegmentGroup(e, a, o, s);
                }),
                gr((s, o) => (s.push(...o), s)),
                Bn(null),
                mr(),
                ee((s) => {
                    if (s === null) return Ye(n);
                    let o = qs(s);
                    return Kc(o), v(o);
                }),
            );
        }
        processSegment(e, r, n, i, s, o) {
            return Y(r).pipe(
                Se((a) =>
                    this.processSegmentAgainstRoute(
                        a._injector ?? e,
                        r,
                        a,
                        n,
                        i,
                        s,
                        o,
                    ).pipe(
                        ze((l) => {
                            if (l instanceof jt) return v(null);
                            throw l;
                        }),
                    ),
                ),
                ye((a) => !!a),
                ze((a) => {
                    if (Vs(a)) return qc(n, i, s) ? v(new Ui()) : Ye(n);
                    throw a;
                }),
            );
        }
        processSegmentAgainstRoute(e, r, n, i, s, o, a) {
            return Wc(n, i, s, o)
                ? n.redirectTo === void 0
                    ? this.matchSegmentAgainstRoute(e, i, n, s, o)
                    : this.allowRedirects && a
                      ? this.expandSegmentAgainstRouteUsingRedirect(
                            e,
                            i,
                            r,
                            n,
                            s,
                            o,
                        )
                      : Ye(i)
                : Ye(i);
        }
        expandSegmentAgainstRouteUsingRedirect(e, r, n, i, s, o) {
            let {
                matched: a,
                consumedSegments: l,
                positionalParamSegments: c,
                remainingSegments: u,
            } = Gi(r, i, s);
            if (!a) return Ye(r);
            i.redirectTo.startsWith('/') &&
                (this.absoluteRedirectCount++,
                this.absoluteRedirectCount > Gc && (this.allowRedirects = !1));
            let d = this.applyRedirects.applyRedirectCommands(
                l,
                i.redirectTo,
                c,
            );
            return this.applyRedirects
                .lineralizeSegments(i, d)
                .pipe(
                    ee((h) => this.processSegment(e, n, r, h.concat(u), o, !1)),
                );
        }
        matchSegmentAgainstRoute(e, r, n, i, s) {
            let o = jc(r, n, i, e, this.urlSerializer);
            return (
                n.path === '**' && (r.children = {}),
                o.pipe(
                    te((a) =>
                        a.matched
                            ? ((e = n._injector ?? e),
                              this.getChildConfig(e, n, i).pipe(
                                  te(({ routes: l }) => {
                                      let c = n._loadedInjector ?? e,
                                          {
                                              consumedSegments: u,
                                              remainingSegments: d,
                                              parameters: h,
                                          } = a,
                                          R = new Lt(
                                              u,
                                              h,
                                              Object.freeze(
                                                  p(
                                                      {},
                                                      this.urlTree.queryParams,
                                                  ),
                                              ),
                                              this.urlTree.fragment,
                                              Yc(n),
                                              de(n),
                                              n.component ??
                                                  n._loadedComponent ??
                                                  null,
                                              n,
                                              Xc(n),
                                          ),
                                          {
                                              segmentGroup: G,
                                              slicedSegments: L,
                                          } = _s(r, u, d, l);
                                      if (L.length === 0 && G.hasChildren())
                                          return this.processChildren(
                                              c,
                                              l,
                                              G,
                                          ).pipe(
                                              _((b) =>
                                                  b === null
                                                      ? null
                                                      : new J(R, b),
                                              ),
                                          );
                                      if (l.length === 0 && L.length === 0)
                                          return v(new J(R, []));
                                      let w = de(n) === s;
                                      return this.processSegment(
                                          c,
                                          l,
                                          G,
                                          L,
                                          w ? y : s,
                                          !0,
                                      ).pipe(
                                          _(
                                              (b) =>
                                                  new J(
                                                      R,
                                                      b instanceof J ? [b] : [],
                                                  ),
                                          ),
                                      );
                                  }),
                              ))
                            : Ye(r),
                    ),
                )
            );
        }
        getChildConfig(e, r, n) {
            return r.children
                ? v({ routes: r.children, injector: e })
                : r.loadChildren
                  ? r._loadedRoutes !== void 0
                      ? v({
                            routes: r._loadedRoutes,
                            injector: r._loadedInjector,
                        })
                      : Nc(e, r, n, this.urlSerializer).pipe(
                            ee((i) =>
                                i
                                    ? this.configLoader.loadChildren(e, r).pipe(
                                          k((s) => {
                                              (r._loadedRoutes = s.routes),
                                                  (r._loadedInjector =
                                                      s.injector);
                                          }),
                                      )
                                    : Fc(r),
                            ),
                        )
                  : v({ routes: [], injector: e });
        }
    };
function Kc(t) {
    t.sort((e, r) =>
        e.value.outlet === y
            ? -1
            : r.value.outlet === y
              ? 1
              : e.value.outlet.localeCompare(r.value.outlet),
    );
}
function Zc(t) {
    let e = t.value.routeConfig;
    return e && e.path === '';
}
function qs(t) {
    let e = [],
        r = new Set();
    for (let n of t) {
        if (!Zc(n)) {
            e.push(n);
            continue;
        }
        let i = e.find((s) => n.value.routeConfig === s.value.routeConfig);
        i !== void 0 ? (i.children.push(...n.children), r.add(i)) : e.push(n);
    }
    for (let n of r) {
        let i = qs(n.children);
        e.push(new J(n.value, i));
    }
    return e.filter((n) => !r.has(n));
}
function Yc(t) {
    return t.data || {};
}
function Xc(t) {
    return t.resolve || {};
}
function Qc(t, e, r, n, i, s) {
    return ee((o) =>
        Hc(t, e, r, n, o.extractedUrl, i, s).pipe(
            _(({ state: a, tree: l }) =>
                W(p({}, o), { targetSnapshot: a, urlAfterRedirects: l }),
            ),
        ),
    );
}
function Jc(t, e) {
    return ee((r) => {
        let {
            targetSnapshot: n,
            guards: { canActivateChecks: i },
        } = r;
        if (!i.length) return v(r);
        let s = new Set(i.map((l) => l.route)),
            o = new Set();
        for (let l of s) if (!o.has(l)) for (let c of Hs(l)) o.add(c);
        let a = 0;
        return Y(o).pipe(
            Se((l) =>
                s.has(l)
                    ? el(l, n, t, e)
                    : ((l.data = Vi(l, l.parent, t).resolve), v(void 0)),
            ),
            k(() => a++),
            zn(1),
            ee((l) => (a === o.size ? v(r) : De)),
        );
    });
}
function Hs(t) {
    let e = t.children.map((r) => Hs(r)).flat();
    return [t, ...e];
}
function el(t, e, r, n) {
    let i = t.routeConfig,
        s = t._resolve;
    return (
        i?.title !== void 0 && !js(i) && (s[Ut] = i.title),
        tl(s, t, e, n).pipe(
            _(
                (o) => (
                    (t._resolvedData = o),
                    (t.data = Vi(t, t.parent, r).resolve),
                    null
                ),
            ),
        )
    );
}
function tl(t, e, r, n) {
    let i = gi(t);
    if (i.length === 0) return v({});
    let s = {};
    return Y(i).pipe(
        ee((o) =>
            nl(t[o], e, r, n).pipe(
                ye(),
                k((a) => {
                    s[o] = a;
                }),
            ),
        ),
        zn(1),
        fr(s),
        ze((o) => (Vs(o) ? De : ot(o))),
    );
}
function nl(t, e, r, n) {
    let i = $t(e) ?? n,
        s = rt(t, i),
        o = s.resolve ? s.resolve(e, r) : pe(i, () => s(e, r));
    return Ce(o);
}
function fi(t) {
    return te((e) => {
        let r = t(e);
        return r ? Y(r).pipe(_(() => e)) : v(e);
    });
}
var Gs = (() => {
        let e = class e {
            buildTitle(n) {
                let i,
                    s = n.root;
                for (; s !== void 0; )
                    (i = this.getResolvedTitleForRoute(s) ?? i),
                        (s = s.children.find((o) => o.outlet === y));
                return i;
            }
            getResolvedTitleForRoute(n) {
                return n.data[Ut];
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)();
        }),
            (e.ɵprov = m({
                token: e,
                factory: () => f(il),
                providedIn: 'root',
            }));
        let t = e;
        return t;
    })(),
    il = (() => {
        let e = class e extends Gs {
            constructor(n) {
                super(), (this.title = n);
            }
            updateTitle(n) {
                let i = this.buildTitle(n);
                i !== void 0 && this.title.setTitle(i);
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)(g(fs));
        }),
            (e.ɵprov = m({ token: e, factory: e.ɵfac, providedIn: 'root' }));
        let t = e;
        return t;
    })(),
    Ki = new E('', { providedIn: 'root', factory: () => ({}) }),
    Zi = new E(''),
    rl = (() => {
        let e = class e {
            constructor() {
                (this.componentLoaders = new WeakMap()),
                    (this.childrenLoaders = new WeakMap()),
                    (this.compiler = f(Kn));
            }
            loadComponent(n) {
                if (this.componentLoaders.get(n))
                    return this.componentLoaders.get(n);
                if (n._loadedComponent) return v(n._loadedComponent);
                this.onLoadStartListener && this.onLoadStartListener(n);
                let i = Ce(n.loadComponent()).pipe(
                        _(Ks),
                        k((o) => {
                            this.onLoadEndListener && this.onLoadEndListener(n),
                                (n._loadedComponent = o);
                        }),
                        Ae(() => {
                            this.componentLoaders.delete(n);
                        }),
                    ),
                    s = new Un(i, () => new $()).pipe(jn());
                return this.componentLoaders.set(n, s), s;
            }
            loadChildren(n, i) {
                if (this.childrenLoaders.get(i))
                    return this.childrenLoaders.get(i);
                if (i._loadedRoutes)
                    return v({
                        routes: i._loadedRoutes,
                        injector: i._loadedInjector,
                    });
                this.onLoadStartListener && this.onLoadStartListener(i);
                let o = sl(i, this.compiler, n, this.onLoadEndListener).pipe(
                        Ae(() => {
                            this.childrenLoaders.delete(i);
                        }),
                    ),
                    a = new Un(o, () => new $()).pipe(jn());
                return this.childrenLoaders.set(i, a), a;
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)();
        }),
            (e.ɵprov = m({ token: e, factory: e.ɵfac, providedIn: 'root' }));
        let t = e;
        return t;
    })();
function sl(t, e, r, n) {
    return Ce(t.loadChildren()).pipe(
        _(Ks),
        ee((i) =>
            i instanceof Sr || Array.isArray(i)
                ? v(i)
                : Y(e.compileModuleAsync(i)),
        ),
        _((i) => {
            n && n(t);
            let s,
                o,
                a = !1;
            return (
                Array.isArray(i)
                    ? ((o = i), (a = !0))
                    : ((s = i.create(r).injector),
                      (o = s.get(Zi, [], { optional: !0, self: !0 }).flat())),
                { routes: o.map(Hi), injector: s }
            );
        }),
    );
}
function ol(t) {
    return t && typeof t == 'object' && 'default' in t;
}
function Ks(t) {
    return ol(t) ? t.default : t;
}
var Yi = (() => {
        let e = class e {};
        (e.ɵfac = function (i) {
            return new (i || e)();
        }),
            (e.ɵprov = m({
                token: e,
                factory: () => f(al),
                providedIn: 'root',
            }));
        let t = e;
        return t;
    })(),
    al = (() => {
        let e = class e {
            shouldProcessUrl(n) {
                return !0;
            }
            extract(n) {
                return n;
            }
            merge(n, i) {
                return n;
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)();
        }),
            (e.ɵprov = m({ token: e, factory: e.ɵfac, providedIn: 'root' }));
        let t = e;
        return t;
    })(),
    cl = new E('');
var ll = (() => {
    let e = class e {
        get hasRequestedNavigation() {
            return this.navigationId !== 0;
        }
        constructor() {
            (this.currentNavigation = null),
                (this.currentTransition = null),
                (this.lastSuccessfulNavigation = null),
                (this.events = new $()),
                (this.transitionAbortSubject = new $()),
                (this.configLoader = f(rl)),
                (this.environmentInjector = f(Ve)),
                (this.urlSerializer = f(zi)),
                (this.rootContexts = f(On)),
                (this.location = f(sn)),
                (this.inputBindingEnabled = f(qi, { optional: !0 }) !== null),
                (this.titleStrategy = f(Gs)),
                (this.options = f(Ki, { optional: !0 }) || {}),
                (this.paramsInheritanceStrategy =
                    this.options.paramsInheritanceStrategy || 'emptyOnly'),
                (this.urlHandlingStrategy = f(Yi)),
                (this.createViewTransition = f(cl, { optional: !0 })),
                (this.navigationId = 0),
                (this.afterPreactivation = () => v(void 0)),
                (this.rootComponentType = null);
            let n = (s) => this.events.next(new Ci(s)),
                i = (s) => this.events.next(new Ri(s));
            (this.configLoader.onLoadEndListener = i),
                (this.configLoader.onLoadStartListener = n);
        }
        complete() {
            this.transitions?.complete();
        }
        handleNavigationRequest(n) {
            let i = ++this.navigationId;
            this.transitions?.next(
                W(p(p({}, this.transitions.value), n), { id: i }),
            );
        }
        setupNavigations(n, i, s) {
            return (
                (this.transitions = new A({
                    id: 0,
                    currentUrlTree: i,
                    currentRawUrl: i,
                    extractedUrl: this.urlHandlingStrategy.extract(i),
                    urlAfterRedirects: this.urlHandlingStrategy.extract(i),
                    rawUrl: i,
                    extras: {},
                    resolve: null,
                    reject: null,
                    promise: Promise.resolve(!0),
                    source: At,
                    restoredState: null,
                    currentSnapshot: s.snapshot,
                    targetSnapshot: null,
                    currentRouterState: s,
                    targetRouterState: null,
                    guards: { canActivateChecks: [], canDeactivateChecks: [] },
                    guardsResult: null,
                })),
                this.transitions.pipe(
                    ge((o) => o.id !== 0),
                    _((o) =>
                        W(p({}, o), {
                            extractedUrl: this.urlHandlingStrategy.extract(
                                o.rawUrl,
                            ),
                        }),
                    ),
                    te((o) => {
                        this.currentTransition = o;
                        let a = !1,
                            l = !1;
                        return v(o).pipe(
                            k((c) => {
                                this.currentNavigation = {
                                    id: c.id,
                                    initialUrl: c.rawUrl,
                                    extractedUrl: c.extractedUrl,
                                    trigger: c.source,
                                    extras: c.extras,
                                    previousNavigation: this
                                        .lastSuccessfulNavigation
                                        ? W(
                                              p(
                                                  {},
                                                  this.lastSuccessfulNavigation,
                                              ),
                                              { previousNavigation: null },
                                          )
                                        : null,
                                };
                            }),
                            te((c) => {
                                let u =
                                        !n.navigated ||
                                        this.isUpdatingInternalState() ||
                                        this.isUpdatedBrowserUrl(),
                                    d =
                                        c.extras.onSameUrlNavigation ??
                                        n.onSameUrlNavigation;
                                if (!u && d !== 'reload') {
                                    let h = '';
                                    return (
                                        this.events.next(
                                            new Ue(
                                                c.id,
                                                this.urlSerializer.serialize(
                                                    c.rawUrl,
                                                ),
                                                h,
                                                _i.IgnoredSameUrlNavigation,
                                            ),
                                        ),
                                        c.resolve(null),
                                        De
                                    );
                                }
                                if (
                                    this.urlHandlingStrategy.shouldProcessUrl(
                                        c.rawUrl,
                                    )
                                )
                                    return v(c).pipe(
                                        te((h) => {
                                            let R =
                                                this.transitions?.getValue();
                                            return (
                                                this.events.next(
                                                    new Ot(
                                                        h.id,
                                                        this.urlSerializer.serialize(
                                                            h.extractedUrl,
                                                        ),
                                                        h.source,
                                                        h.restoredState,
                                                    ),
                                                ),
                                                R !==
                                                this.transitions?.getValue()
                                                    ? De
                                                    : Promise.resolve(h)
                                            );
                                        }),
                                        Qc(
                                            this.environmentInjector,
                                            this.configLoader,
                                            this.rootComponentType,
                                            n.config,
                                            this.urlSerializer,
                                            this.paramsInheritanceStrategy,
                                        ),
                                        k((h) => {
                                            (o.targetSnapshot =
                                                h.targetSnapshot),
                                                (o.urlAfterRedirects =
                                                    h.urlAfterRedirects),
                                                (this.currentNavigation = W(
                                                    p(
                                                        {},
                                                        this.currentNavigation,
                                                    ),
                                                    {
                                                        finalUrl:
                                                            h.urlAfterRedirects,
                                                    },
                                                ));
                                            let R = new Rn(
                                                h.id,
                                                this.urlSerializer.serialize(
                                                    h.extractedUrl,
                                                ),
                                                this.urlSerializer.serialize(
                                                    h.urlAfterRedirects,
                                                ),
                                                h.targetSnapshot,
                                            );
                                            this.events.next(R);
                                        }),
                                    );
                                if (
                                    u &&
                                    this.urlHandlingStrategy.shouldProcessUrl(
                                        c.currentRawUrl,
                                    )
                                ) {
                                    let {
                                            id: h,
                                            extractedUrl: R,
                                            source: G,
                                            restoredState: L,
                                            extras: w,
                                        } = c,
                                        b = new Ot(
                                            h,
                                            this.urlSerializer.serialize(R),
                                            G,
                                            L,
                                        );
                                    this.events.next(b);
                                    let Z = Ls(this.rootComponentType).snapshot;
                                    return (
                                        (this.currentTransition = o =
                                            W(p({}, c), {
                                                targetSnapshot: Z,
                                                urlAfterRedirects: R,
                                                extras: W(p({}, w), {
                                                    skipLocationChange: !1,
                                                    replaceUrl: !1,
                                                }),
                                            })),
                                        (this.currentNavigation.finalUrl = R),
                                        v(o)
                                    );
                                } else {
                                    let h = '';
                                    return (
                                        this.events.next(
                                            new Ue(
                                                c.id,
                                                this.urlSerializer.serialize(
                                                    c.extractedUrl,
                                                ),
                                                h,
                                                _i.IgnoredByUrlHandlingStrategy,
                                            ),
                                        ),
                                        c.resolve(null),
                                        De
                                    );
                                }
                            }),
                            k((c) => {
                                let u = new wi(
                                    c.id,
                                    this.urlSerializer.serialize(
                                        c.extractedUrl,
                                    ),
                                    this.urlSerializer.serialize(
                                        c.urlAfterRedirects,
                                    ),
                                    c.targetSnapshot,
                                );
                                this.events.next(u);
                            }),
                            _(
                                (c) => (
                                    (this.currentTransition = o =
                                        W(p({}, c), {
                                            guards: gc(
                                                c.targetSnapshot,
                                                c.currentSnapshot,
                                                this.rootContexts,
                                            ),
                                        })),
                                    o
                                ),
                            ),
                            Rc(this.environmentInjector, (c) =>
                                this.events.next(c),
                            ),
                            k((c) => {
                                if (
                                    ((o.guardsResult = c.guardsResult),
                                    tt(c.guardsResult))
                                )
                                    throw $s(
                                        this.urlSerializer,
                                        c.guardsResult,
                                    );
                                let u = new Ii(
                                    c.id,
                                    this.urlSerializer.serialize(
                                        c.extractedUrl,
                                    ),
                                    this.urlSerializer.serialize(
                                        c.urlAfterRedirects,
                                    ),
                                    c.targetSnapshot,
                                    !!c.guardsResult,
                                );
                                this.events.next(u);
                            }),
                            ge((c) =>
                                c.guardsResult
                                    ? !0
                                    : (this.cancelNavigationTransition(
                                          c,
                                          '',
                                          se.GuardRejected,
                                      ),
                                      !1),
                            ),
                            fi((c) => {
                                if (c.guards.canActivateChecks.length)
                                    return v(c).pipe(
                                        k((u) => {
                                            let d = new Ti(
                                                u.id,
                                                this.urlSerializer.serialize(
                                                    u.extractedUrl,
                                                ),
                                                this.urlSerializer.serialize(
                                                    u.urlAfterRedirects,
                                                ),
                                                u.targetSnapshot,
                                            );
                                            this.events.next(d);
                                        }),
                                        te((u) => {
                                            let d = !1;
                                            return v(u).pipe(
                                                Jc(
                                                    this
                                                        .paramsInheritanceStrategy,
                                                    this.environmentInjector,
                                                ),
                                                k({
                                                    next: () => (d = !0),
                                                    complete: () => {
                                                        d ||
                                                            this.cancelNavigationTransition(
                                                                u,
                                                                '',
                                                                se.NoDataFromResolver,
                                                            );
                                                    },
                                                }),
                                            );
                                        }),
                                        k((u) => {
                                            let d = new Ei(
                                                u.id,
                                                this.urlSerializer.serialize(
                                                    u.extractedUrl,
                                                ),
                                                this.urlSerializer.serialize(
                                                    u.urlAfterRedirects,
                                                ),
                                                u.targetSnapshot,
                                            );
                                            this.events.next(d);
                                        }),
                                    );
                            }),
                            fi((c) => {
                                let u = (d) => {
                                    let h = [];
                                    d.routeConfig?.loadComponent &&
                                        !d.routeConfig._loadedComponent &&
                                        h.push(
                                            this.configLoader
                                                .loadComponent(d.routeConfig)
                                                .pipe(
                                                    k((R) => {
                                                        d.component = R;
                                                    }),
                                                    _(() => {}),
                                                ),
                                        );
                                    for (let R of d.children) h.push(...u(R));
                                    return h;
                                };
                                return at(u(c.targetSnapshot.root)).pipe(
                                    Bn(null),
                                    ve(1),
                                );
                            }),
                            fi(() => this.afterPreactivation()),
                            te(() => {
                                let { currentSnapshot: c, targetSnapshot: u } =
                                        o,
                                    d = this.createViewTransition?.(
                                        this.environmentInjector,
                                        c.root,
                                        u.root,
                                    );
                                return d ? Y(d).pipe(_(() => o)) : v(o);
                            }),
                            _((c) => {
                                let u = cc(
                                    n.routeReuseStrategy,
                                    c.targetSnapshot,
                                    c.currentRouterState,
                                );
                                return (
                                    (this.currentTransition = o =
                                        W(p({}, c), { targetRouterState: u })),
                                    (this.currentNavigation.targetRouterState =
                                        u),
                                    o
                                );
                            }),
                            k(() => {
                                this.events.next(new Nt());
                            }),
                            mc(
                                this.rootContexts,
                                n.routeReuseStrategy,
                                (c) => this.events.next(c),
                                this.inputBindingEnabled,
                            ),
                            ve(1),
                            k({
                                next: (c) => {
                                    (a = !0),
                                        (this.lastSuccessfulNavigation =
                                            this.currentNavigation),
                                        this.events.next(
                                            new je(
                                                c.id,
                                                this.urlSerializer.serialize(
                                                    c.extractedUrl,
                                                ),
                                                this.urlSerializer.serialize(
                                                    c.urlAfterRedirects,
                                                ),
                                            ),
                                        ),
                                        this.titleStrategy?.updateTitle(
                                            c.targetRouterState.snapshot,
                                        ),
                                        c.resolve(!0);
                                },
                                complete: () => {
                                    a = !0;
                                },
                            }),
                            q(
                                this.transitionAbortSubject.pipe(
                                    k((c) => {
                                        throw c;
                                    }),
                                ),
                            ),
                            Ae(() => {
                                !a &&
                                    !l &&
                                    this.cancelNavigationTransition(
                                        o,
                                        '',
                                        se.SupersededByNewNavigation,
                                    ),
                                    this.currentTransition?.id === o.id &&
                                        ((this.currentNavigation = null),
                                        (this.currentTransition = null));
                            }),
                            ze((c) => {
                                if (((l = !0), zs(c)))
                                    this.events.next(
                                        new Ee(
                                            o.id,
                                            this.urlSerializer.serialize(
                                                o.extractedUrl,
                                            ),
                                            c.message,
                                            c.cancellationCode,
                                        ),
                                    ),
                                        dc(c)
                                            ? this.events.next(new Pt(c.url))
                                            : o.resolve(!1);
                                else {
                                    this.events.next(
                                        new kt(
                                            o.id,
                                            this.urlSerializer.serialize(
                                                o.extractedUrl,
                                            ),
                                            c,
                                            o.targetSnapshot ?? void 0,
                                        ),
                                    );
                                    try {
                                        o.resolve(n.errorHandler(c));
                                    } catch (u) {
                                        this.options
                                            .resolveNavigationPromiseOnError
                                            ? o.resolve(!1)
                                            : o.reject(u);
                                    }
                                }
                                return De;
                            }),
                        );
                    }),
                )
            );
        }
        cancelNavigationTransition(n, i, s) {
            let o = new Ee(
                n.id,
                this.urlSerializer.serialize(n.extractedUrl),
                i,
                s,
            );
            this.events.next(o), n.resolve(!1);
        }
        isUpdatingInternalState() {
            return (
                this.currentTransition?.extractedUrl.toString() !==
                this.currentTransition?.currentUrlTree.toString()
            );
        }
        isUpdatedBrowserUrl() {
            return (
                this.urlHandlingStrategy
                    .extract(this.urlSerializer.parse(this.location.path(!0)))
                    .toString() !==
                    this.currentTransition?.extractedUrl.toString() &&
                !this.currentTransition?.extras.skipLocationChange
            );
        }
    };
    (e.ɵfac = function (i) {
        return new (i || e)();
    }),
        (e.ɵprov = m({ token: e, factory: e.ɵfac, providedIn: 'root' }));
    let t = e;
    return t;
})();
function ul(t) {
    return t !== At;
}
var dl = (() => {
        let e = class e {};
        (e.ɵfac = function (i) {
            return new (i || e)();
        }),
            (e.ɵprov = m({
                token: e,
                factory: () => f(hl),
                providedIn: 'root',
            }));
        let t = e;
        return t;
    })(),
    Bi = class {
        shouldDetach(e) {
            return !1;
        }
        store(e, r) {}
        shouldAttach(e) {
            return !1;
        }
        retrieve(e) {
            return null;
        }
        shouldReuseRoute(e, r) {
            return e.routeConfig === r.routeConfig;
        }
    },
    hl = (() => {
        let e = class e extends Bi {};
        (e.ɵfac = (() => {
            let n;
            return function (s) {
                return (n || (n = Wn(e)))(s || e);
            };
        })()),
            (e.ɵprov = m({ token: e, factory: e.ɵfac, providedIn: 'root' }));
        let t = e;
        return t;
    })(),
    Zs = (() => {
        let e = class e {};
        (e.ɵfac = function (i) {
            return new (i || e)();
        }),
            (e.ɵprov = m({
                token: e,
                factory: () => f(pl),
                providedIn: 'root',
            }));
        let t = e;
        return t;
    })(),
    pl = (() => {
        let e = class e extends Zs {
            constructor() {
                super(...arguments),
                    (this.location = f(sn)),
                    (this.urlSerializer = f(zi)),
                    (this.options = f(Ki, { optional: !0 }) || {}),
                    (this.canceledNavigationResolution =
                        this.options.canceledNavigationResolution || 'replace'),
                    (this.urlHandlingStrategy = f(Yi)),
                    (this.urlUpdateStrategy =
                        this.options.urlUpdateStrategy || 'deferred'),
                    (this.currentUrlTree = new Te()),
                    (this.rawUrlTree = this.currentUrlTree),
                    (this.currentPageId = 0),
                    (this.lastSuccessfulId = -1),
                    (this.routerState = Ls(null)),
                    (this.stateMemento = this.createStateMemento());
            }
            getCurrentUrlTree() {
                return this.currentUrlTree;
            }
            getRawUrlTree() {
                return this.rawUrlTree;
            }
            restoredState() {
                return this.location.getState();
            }
            get browserPageId() {
                return this.canceledNavigationResolution !== 'computed'
                    ? this.currentPageId
                    : this.restoredState()?.ɵrouterPageId ?? this.currentPageId;
            }
            getRouterState() {
                return this.routerState;
            }
            createStateMemento() {
                return {
                    rawUrlTree: this.rawUrlTree,
                    currentUrlTree: this.currentUrlTree,
                    routerState: this.routerState,
                };
            }
            registerNonRouterCurrentEntryChangeListener(n) {
                return this.location.subscribe((i) => {
                    i.type === 'popstate' && n(i.url, i.state);
                });
            }
            handleRouterEvent(n, i) {
                if (n instanceof Ot)
                    this.stateMemento = this.createStateMemento();
                else if (n instanceof Ue) this.rawUrlTree = i.initialUrl;
                else if (n instanceof Rn) {
                    if (
                        this.urlUpdateStrategy === 'eager' &&
                        !i.extras.skipLocationChange
                    ) {
                        let s = this.urlHandlingStrategy.merge(
                            i.finalUrl,
                            i.initialUrl,
                        );
                        this.setBrowserUrl(s, i);
                    }
                } else
                    n instanceof Nt
                        ? ((this.currentUrlTree = i.finalUrl),
                          (this.rawUrlTree = this.urlHandlingStrategy.merge(
                              i.finalUrl,
                              i.initialUrl,
                          )),
                          (this.routerState = i.targetRouterState),
                          this.urlUpdateStrategy === 'deferred' &&
                              (i.extras.skipLocationChange ||
                                  this.setBrowserUrl(this.rawUrlTree, i)))
                        : n instanceof Ee &&
                            (n.code === se.GuardRejected ||
                                n.code === se.NoDataFromResolver)
                          ? this.restoreHistory(i)
                          : n instanceof kt
                            ? this.restoreHistory(i, !0)
                            : n instanceof je &&
                              ((this.lastSuccessfulId = n.id),
                              (this.currentPageId = this.browserPageId));
            }
            setBrowserUrl(n, i) {
                let s = this.urlSerializer.serialize(n);
                if (
                    this.location.isCurrentPathEqualTo(s) ||
                    i.extras.replaceUrl
                ) {
                    let o = this.browserPageId,
                        a = p(
                            p({}, i.extras.state),
                            this.generateNgRouterState(i.id, o),
                        );
                    this.location.replaceState(s, '', a);
                } else {
                    let o = p(
                        p({}, i.extras.state),
                        this.generateNgRouterState(
                            i.id,
                            this.browserPageId + 1,
                        ),
                    );
                    this.location.go(s, '', o);
                }
            }
            restoreHistory(n, i = !1) {
                if (this.canceledNavigationResolution === 'computed') {
                    let s = this.browserPageId,
                        o = this.currentPageId - s;
                    o !== 0
                        ? this.location.historyGo(o)
                        : this.currentUrlTree === n.finalUrl &&
                          o === 0 &&
                          (this.resetState(n), this.resetUrlToCurrentUrlTree());
                } else
                    this.canceledNavigationResolution === 'replace' &&
                        (i && this.resetState(n),
                        this.resetUrlToCurrentUrlTree());
            }
            resetState(n) {
                (this.routerState = this.stateMemento.routerState),
                    (this.currentUrlTree = this.stateMemento.currentUrlTree),
                    (this.rawUrlTree = this.urlHandlingStrategy.merge(
                        this.currentUrlTree,
                        n.finalUrl ?? this.rawUrlTree,
                    ));
            }
            resetUrlToCurrentUrlTree() {
                this.location.replaceState(
                    this.urlSerializer.serialize(this.rawUrlTree),
                    '',
                    this.generateNgRouterState(
                        this.lastSuccessfulId,
                        this.currentPageId,
                    ),
                );
            }
            generateNgRouterState(n, i) {
                return this.canceledNavigationResolution === 'computed'
                    ? { navigationId: n, ɵrouterPageId: i }
                    : { navigationId: n };
            }
        };
        (e.ɵfac = (() => {
            let n;
            return function (s) {
                return (n || (n = Wn(e)))(s || e);
            };
        })()),
            (e.ɵprov = m({ token: e, factory: e.ɵfac, providedIn: 'root' }));
        let t = e;
        return t;
    })(),
    Dt = (function (t) {
        return (
            (t[(t.COMPLETE = 0)] = 'COMPLETE'),
            (t[(t.FAILED = 1)] = 'FAILED'),
            (t[(t.REDIRECTING = 2)] = 'REDIRECTING'),
            t
        );
    })(Dt || {});
function fl(t, e) {
    t.events
        .pipe(
            ge(
                (r) =>
                    r instanceof je ||
                    r instanceof Ee ||
                    r instanceof kt ||
                    r instanceof Ue,
            ),
            _((r) =>
                r instanceof je || r instanceof Ue
                    ? Dt.COMPLETE
                    : (
                            r instanceof Ee
                                ? r.code === se.Redirect ||
                                  r.code === se.SupersededByNewNavigation
                                : !1
                        )
                      ? Dt.REDIRECTING
                      : Dt.FAILED,
            ),
            ge((r) => r !== Dt.REDIRECTING),
            ve(1),
        )
        .subscribe(() => {
            e();
        });
}
function ml(t) {
    throw t;
}
var gl = {
        paths: 'exact',
        fragment: 'ignored',
        matrixParams: 'ignored',
        queryParams: 'exact',
    },
    vl = {
        paths: 'subset',
        fragment: 'ignored',
        matrixParams: 'ignored',
        queryParams: 'subset',
    },
    Ys = (() => {
        let e = class e {
            get currentUrlTree() {
                return this.stateManager.getCurrentUrlTree();
            }
            get rawUrlTree() {
                return this.stateManager.getRawUrlTree();
            }
            get events() {
                return this._events;
            }
            get routerState() {
                return this.stateManager.getRouterState();
            }
            constructor() {
                (this.disposed = !1),
                    (this.isNgZoneEnabled = !1),
                    (this.console = f(tn)),
                    (this.stateManager = f(Zs)),
                    (this.options = f(Ki, { optional: !0 }) || {}),
                    (this.pendingTasks = f(gt)),
                    (this.urlUpdateStrategy =
                        this.options.urlUpdateStrategy || 'deferred'),
                    (this.navigationTransitions = f(ll)),
                    (this.urlSerializer = f(zi)),
                    (this.location = f(sn)),
                    (this.urlHandlingStrategy = f(Yi)),
                    (this._events = new $()),
                    (this.errorHandler = this.options.errorHandler || ml),
                    (this.navigated = !1),
                    (this.routeReuseStrategy = f(dl)),
                    (this.onSameUrlNavigation =
                        this.options.onSameUrlNavigation || 'ignore'),
                    (this.config = f(Zi, { optional: !0 })?.flat() ?? []),
                    (this.componentInputBindingEnabled = !!f(qi, {
                        optional: !0,
                    })),
                    (this.eventsSubscription = new lr()),
                    (this.isNgZoneEnabled =
                        f(B) instanceof B && B.isInAngularZone()),
                    this.resetConfig(this.config),
                    this.navigationTransitions
                        .setupNavigations(
                            this,
                            this.currentUrlTree,
                            this.routerState,
                        )
                        .subscribe({
                            error: (n) => {
                                this.console.warn(n);
                            },
                        }),
                    this.subscribeToNavigationEvents();
            }
            subscribeToNavigationEvents() {
                let n = this.navigationTransitions.events.subscribe((i) => {
                    try {
                        let s = this.navigationTransitions.currentTransition,
                            o = this.navigationTransitions.currentNavigation;
                        if (s !== null && o !== null) {
                            if (
                                (this.stateManager.handleRouterEvent(i, o),
                                i instanceof Ee &&
                                    i.code !== se.Redirect &&
                                    i.code !== se.SupersededByNewNavigation)
                            )
                                this.navigated = !0;
                            else if (i instanceof je) this.navigated = !0;
                            else if (i instanceof Pt) {
                                let a = this.urlHandlingStrategy.merge(
                                        i.url,
                                        s.currentRawUrl,
                                    ),
                                    l = {
                                        info: s.extras.info,
                                        skipLocationChange:
                                            s.extras.skipLocationChange,
                                        replaceUrl:
                                            this.urlUpdateStrategy ===
                                                'eager' || ul(s.source),
                                    };
                                this.scheduleNavigation(a, At, null, l, {
                                    resolve: s.resolve,
                                    reject: s.reject,
                                    promise: s.promise,
                                });
                            }
                        }
                        bl(i) && this._events.next(i);
                    } catch (s) {
                        this.navigationTransitions.transitionAbortSubject.next(
                            s,
                        );
                    }
                });
                this.eventsSubscription.add(n);
            }
            resetRootComponentType(n) {
                (this.routerState.root.component = n),
                    (this.navigationTransitions.rootComponentType = n);
            }
            initialNavigation() {
                this.setUpLocationChangeListener(),
                    this.navigationTransitions.hasRequestedNavigation ||
                        this.navigateToSyncWithBrowser(
                            this.location.path(!0),
                            At,
                            this.stateManager.restoredState(),
                        );
            }
            setUpLocationChangeListener() {
                this.nonRouterCurrentEntryChangeSubscription ??=
                    this.stateManager.registerNonRouterCurrentEntryChangeListener(
                        (n, i) => {
                            setTimeout(() => {
                                this.navigateToSyncWithBrowser(
                                    n,
                                    'popstate',
                                    i,
                                );
                            }, 0);
                        },
                    );
            }
            navigateToSyncWithBrowser(n, i, s) {
                let o = { replaceUrl: !0 },
                    a = s?.navigationId ? s : null;
                if (s) {
                    let c = p({}, s);
                    delete c.navigationId,
                        delete c.ɵrouterPageId,
                        Object.keys(c).length !== 0 && (o.state = c);
                }
                let l = this.parseUrl(n);
                this.scheduleNavigation(l, i, a, o);
            }
            get url() {
                return this.serializeUrl(this.currentUrlTree);
            }
            getCurrentNavigation() {
                return this.navigationTransitions.currentNavigation;
            }
            get lastSuccessfulNavigation() {
                return this.navigationTransitions.lastSuccessfulNavigation;
            }
            resetConfig(n) {
                (this.config = n.map(Hi)), (this.navigated = !1);
            }
            ngOnDestroy() {
                this.dispose();
            }
            dispose() {
                this.navigationTransitions.complete(),
                    this.nonRouterCurrentEntryChangeSubscription &&
                        (this.nonRouterCurrentEntryChangeSubscription.unsubscribe(),
                        (this.nonRouterCurrentEntryChangeSubscription =
                            void 0)),
                    (this.disposed = !0),
                    this.eventsSubscription.unsubscribe();
            }
            createUrlTree(n, i = {}) {
                let {
                        relativeTo: s,
                        queryParams: o,
                        fragment: a,
                        queryParamsHandling: l,
                        preserveFragment: c,
                    } = i,
                    u = c ? this.currentUrlTree.fragment : a,
                    d = null;
                switch (l) {
                    case 'merge':
                        d = p(p({}, this.currentUrlTree.queryParams), o);
                        break;
                    case 'preserve':
                        d = this.currentUrlTree.queryParams;
                        break;
                    default:
                        d = o || null;
                }
                d !== null && (d = this.removeEmptyProps(d));
                let h;
                try {
                    let R = s ? s.snapshot : this.routerState.snapshot.root;
                    h = Os(R);
                } catch {
                    (typeof n[0] != 'string' || !n[0].startsWith('/')) &&
                        (n = []),
                        (h = this.currentUrlTree.root);
                }
                return ks(h, n, d, u ?? null);
            }
            navigateByUrl(n, i = { skipLocationChange: !1 }) {
                let s = tt(n) ? n : this.parseUrl(n),
                    o = this.urlHandlingStrategy.merge(s, this.rawUrlTree);
                return this.scheduleNavigation(o, At, null, i);
            }
            navigate(n, i = { skipLocationChange: !1 }) {
                return yl(n), this.navigateByUrl(this.createUrlTree(n, i), i);
            }
            serializeUrl(n) {
                return this.urlSerializer.serialize(n);
            }
            parseUrl(n) {
                try {
                    return this.urlSerializer.parse(n);
                } catch {
                    return this.urlSerializer.parse('/');
                }
            }
            isActive(n, i) {
                let s;
                if (
                    (i === !0
                        ? (s = p({}, gl))
                        : i === !1
                          ? (s = p({}, vl))
                          : (s = i),
                    tt(n))
                )
                    return gs(this.currentUrlTree, n, s);
                let o = this.parseUrl(n);
                return gs(this.currentUrlTree, o, s);
            }
            removeEmptyProps(n) {
                return Object.entries(n).reduce(
                    (i, [s, o]) => (o != null && (i[s] = o), i),
                    {},
                );
            }
            scheduleNavigation(n, i, s, o, a) {
                if (this.disposed) return Promise.resolve(!1);
                let l, c, u;
                a
                    ? ((l = a.resolve), (c = a.reject), (u = a.promise))
                    : (u = new Promise((h, R) => {
                          (l = h), (c = R);
                      }));
                let d = this.pendingTasks.add();
                return (
                    fl(this, () => {
                        queueMicrotask(() => this.pendingTasks.remove(d));
                    }),
                    this.navigationTransitions.handleNavigationRequest({
                        source: i,
                        restoredState: s,
                        currentUrlTree: this.currentUrlTree,
                        currentRawUrl: this.currentUrlTree,
                        rawUrl: n,
                        extras: o,
                        resolve: l,
                        reject: c,
                        promise: u,
                        currentSnapshot: this.routerState.snapshot,
                        currentRouterState: this.routerState,
                    }),
                    u.catch((h) => Promise.reject(h))
                );
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)();
        }),
            (e.ɵprov = m({ token: e, factory: e.ɵfac, providedIn: 'root' }));
        let t = e;
        return t;
    })();
function yl(t) {
    for (let e = 0; e < t.length; e++) if (t[e] == null) throw new x(4008, !1);
}
function bl(t) {
    return !(t instanceof Nt) && !(t instanceof Pt);
}
var _l = new E('');
function Xs(t, ...e) {
    return be([
        { provide: Zi, multi: !0, useValue: t },
        [],
        { provide: nt, useFactory: wl, deps: [Ys] },
        { provide: nn, multi: !0, useFactory: Il },
        e.map((r) => r.ɵproviders),
    ]);
}
function wl(t) {
    return t.routerState.root;
}
function Il() {
    let t = f(Er);
    return (e) => {
        let r = t.get(yt);
        if (e !== r.components[0]) return;
        let n = t.get(Ys),
            i = t.get(Tl);
        t.get(El) === 1 && n.initialNavigation(),
            t.get(Cl, null, Vn.Optional)?.setUpPreloading(),
            t.get(_l, null, Vn.Optional)?.init(),
            n.resetRootComponentType(r.componentTypes[0]),
            i.closed || (i.next(), i.complete(), i.unsubscribe());
    };
}
var Tl = new E('', { factory: () => new $() }),
    El = new E('', { providedIn: 'root', factory: () => 1 });
var Cl = new E('');
var Qs = [];
var Rl = '@',
    Dl = (() => {
        let e = class e {
            constructor(n, i, s, o, a) {
                (this.doc = n),
                    (this.delegate = i),
                    (this.zone = s),
                    (this.animationType = o),
                    (this.moduleImpl = a),
                    (this._rendererFactoryPromise = null),
                    (this.scheduler = f(Rr, { optional: !0 }));
            }
            ngOnDestroy() {
                this._engine?.flush();
            }
            loadImpl() {
                return (this.moduleImpl ?? import('./chunk-WL6WHF7W.js'))
                    .catch((i) => {
                        throw new x(5300, !1);
                    })
                    .then(
                        ({
                            ɵcreateEngine: i,
                            ɵAnimationRendererFactory: s,
                        }) => {
                            this._engine = i(
                                this.animationType,
                                this.doc,
                                this.scheduler,
                            );
                            let o = new s(
                                this.delegate,
                                this._engine,
                                this.zone,
                            );
                            return (this.delegate = o), o;
                        },
                    );
            }
            createRenderer(n, i) {
                let s = this.delegate.createRenderer(n, i);
                if (s.ɵtype === 0) return s;
                typeof s.throwOnSyntheticProps == 'boolean' &&
                    (s.throwOnSyntheticProps = !1);
                let o = new Xi(s);
                return (
                    i?.data?.animation &&
                        !this._rendererFactoryPromise &&
                        (this._rendererFactoryPromise = this.loadImpl()),
                    this._rendererFactoryPromise
                        ?.then((a) => {
                            let l = a.createRenderer(n, i);
                            o.use(l);
                        })
                        .catch((a) => {
                            o.use(s);
                        }),
                    o
                );
            }
            begin() {
                this.delegate.begin?.();
            }
            end() {
                this.delegate.end?.();
            }
            whenRenderingDone() {
                return this.delegate.whenRenderingDone?.() ?? Promise.resolve();
            }
        };
        (e.ɵfac = function (i) {
            Hn();
        }),
            (e.ɵprov = m({ token: e, factory: e.ɵfac }));
        let t = e;
        return t;
    })(),
    Xi = class {
        constructor(e) {
            (this.delegate = e), (this.replay = []), (this.ɵtype = 1);
        }
        use(e) {
            if (((this.delegate = e), this.replay !== null)) {
                for (let r of this.replay) r(e);
                this.replay = null;
            }
        }
        get data() {
            return this.delegate.data;
        }
        destroy() {
            (this.replay = null), this.delegate.destroy();
        }
        createElement(e, r) {
            return this.delegate.createElement(e, r);
        }
        createComment(e) {
            return this.delegate.createComment(e);
        }
        createText(e) {
            return this.delegate.createText(e);
        }
        get destroyNode() {
            return this.delegate.destroyNode;
        }
        appendChild(e, r) {
            this.delegate.appendChild(e, r);
        }
        insertBefore(e, r, n, i) {
            this.delegate.insertBefore(e, r, n, i);
        }
        removeChild(e, r, n) {
            this.delegate.removeChild(e, r, n);
        }
        selectRootElement(e, r) {
            return this.delegate.selectRootElement(e, r);
        }
        parentNode(e) {
            return this.delegate.parentNode(e);
        }
        nextSibling(e) {
            return this.delegate.nextSibling(e);
        }
        setAttribute(e, r, n, i) {
            this.delegate.setAttribute(e, r, n, i);
        }
        removeAttribute(e, r, n) {
            this.delegate.removeAttribute(e, r, n);
        }
        addClass(e, r) {
            this.delegate.addClass(e, r);
        }
        removeClass(e, r) {
            this.delegate.removeClass(e, r);
        }
        setStyle(e, r, n, i) {
            this.delegate.setStyle(e, r, n, i);
        }
        removeStyle(e, r, n) {
            this.delegate.removeStyle(e, r, n);
        }
        setProperty(e, r, n) {
            this.shouldReplay(r) &&
                this.replay.push((i) => i.setProperty(e, r, n)),
                this.delegate.setProperty(e, r, n);
        }
        setValue(e, r) {
            this.delegate.setValue(e, r);
        }
        listen(e, r, n) {
            return (
                this.shouldReplay(r) &&
                    this.replay.push((i) => i.listen(e, r, n)),
                this.delegate.listen(e, r, n)
            );
        }
        shouldReplay(e) {
            return this.replay !== null && e.startsWith(Rl);
        }
    };
function Js(t = 'animations') {
    return (
        Xt('NgAsyncAnimations'),
        be([
            {
                provide: Yt,
                useFactory: (e, r, n) => new Dl(e, r, n, t),
                deps: [U, gn, B],
            },
            {
                provide: dt,
                useValue: t === 'noop' ? 'NoopAnimations' : 'BrowserAnimations',
            },
        ])
    );
}
var eo = { providers: [Ir(rs), Xs(Qs), ms(), Js()] };
var to = (() => {
    let e = class e {};
    (e.ɵfac = function (i) {
        return new (i || e)();
    }),
        (e.ɵcmp = N({
            type: e,
            selectors: [['app-gear']],
            standalone: !0,
            features: [P],
            decls: 5,
            vars: 0,
            consts: [
                [1, 'reset'],
                [
                    'version',
                    '1.0',
                    'xmlns',
                    'http://www.w3.org/2000/svg',
                    'width',
                    '27px',
                    'height',
                    '27px',
                    'viewBox',
                    '0 0 512.000000 512.000000',
                    'preserveAspectRatio',
                    'xMidYMid meet',
                ],
                [
                    'transform',
                    'translate(0.000000,512.000000) scale(0.100000,-0.100000)',
                    'fill',
                    '#000000',
                    'stroke',
                    'none',
                ],
                [
                    'd',
                    `M2223 5102 c-97 -34 -171 -111 -198 -206 -8 -28 -24 -107 -35 -176
       -11 -69 -25 -148 -31 -177 l-10 -51 -72 -27 c-40 -14 -118 -47 -174 -72 l-102
       -46 -153 110 c-84 61 -168 118 -186 127 -78 40 -200 37 -287 -6 -23 -12 -125
       -105 -236 -217 -231 -232 -244 -252 -243 -381 0 -105 10 -127 159 -334 l106
       -148 -49 -112 c-28 -61 -58 -136 -67 -166 -10 -30 -22 -60 -29 -66 -6 -6 -96
       -25 -201 -42 -213 -36 -270 -57 -330 -124 -21 -22 -47 -61 -59 -87 -20 -44
       -21 -61 -21 -351 l0 -305 28 -57 c30 -62 84 -116 147 -148 25 -13 117 -34 243
       -55 111 -19 203 -35 203 -35 1 0 12 -28 24 -62 13 -35 45 -113 73 -175 l49
       -112 -116 -163 c-132 -186 -150 -227 -144 -331 6 -117 26 -146 242 -364 228
       -229 259 -248 391 -247 99 0 117 9 323 156 l153 110 102 -45 c56 -25 131 -55
       167 -68 36 -12 66 -23 68 -24 1 -1 18 -93 37 -203 21 -125 42 -217 55 -242 32
       -63 86 -117 148 -147 l57 -28 305 0 305 0 57 28 c65 32 122 90 150 153 10 24
       34 132 53 240 18 108 35 197 37 198 2 2 39 15 83 31 44 16 121 47 171 71 l92
       42 153 -110 c213 -152 215 -153 324 -153 133 0 159 17 386 244 214 213 239
       251 247 366 6 99 -17 150 -152 340 l-113 159 41 91 c23 49 55 127 72 173 21
       61 34 84 49 87 11 3 101 18 199 35 202 33 262 56 321 122 21 22 47 61 59 87
       20 44 21 61 21 351 l0 305 -28 57 c-30 61 -84 116 -145 147 -23 12 -115 33
       -223 51 -101 17 -193 35 -204 39 -14 6 -31 38 -54 102 -18 52 -49 124 -67 161
       -19 37 -34 73 -34 80 0 7 49 82 109 165 60 84 117 170 127 190 29 60 31 175 3
       248 -20 54 -41 79 -223 261 -225 225 -255 246 -368 252 -100 6 -145 -14 -332
       -148 l-167 -118 -92 43 c-51 24 -128 56 -172 71 -44 15 -84 31 -89 35 -5 4
       -24 95 -42 201 -38 216 -60 274 -126 333 -85 77 -97 80 -423 82 -258 3 -296 1
       -342 -15z m574 -284 c5 -7 26 -114 47 -238 20 -126 45 -240 55 -260 21 -42 67
       -67 206 -110 55 -18 163 -63 241 -101 91 -45 153 -69 175 -69 44 0 79 21 283
       168 92 67 176 122 185 122 22 0 341 -321 341 -343 0 -9 -61 -103 -135 -207
       -138 -193 -155 -223 -155 -266 0 -13 31 -87 69 -165 38 -77 88 -198 111 -268
       40 -126 57 -154 106 -179 12 -6 120 -27 240 -47 121 -20 229 -40 242 -45 22
       -10 22 -10 22 -250 0 -240 0 -240 -22 -250 -13 -5 -121 -25 -240 -44 -119 -20
       -227 -40 -241 -45 -35 -13 -75 -65 -88 -114 -26 -100 -66 -201 -130 -332 -39
       -79 -69 -154 -69 -171 0 -43 20 -78 163 -277 70 -98 127 -186 127 -195 0 -22
       -320 -342 -342 -342 -10 0 -91 53 -180 117 -220 158 -246 173 -286 173 -23 0
       -84 -24 -176 -69 -78 -39 -197 -88 -265 -110 -128 -42 -153 -57 -177 -102 -7
       -15 -30 -125 -49 -245 -20 -121 -40 -229 -45 -241 -10 -23 -10 -23 -250 -23
       -240 0 -240 0 -250 23 -5 12 -25 120 -44 239 -20 119 -40 227 -45 241 -13 35
       -65 75 -114 88 -97 25 -200 65 -324 125 -140 68 -180 76 -234 49 -16 -9 -111
       -74 -211 -145 -99 -72 -188 -130 -197 -130 -22 0 -341 321 -341 343 0 10 63
       106 139 213 104 145 141 205 146 235 6 37 0 54 -64 185 -40 79 -90 199 -112
       267 -61 186 -49 179 -351 231 -134 24 -250 46 -256 50 -16 9 -17 482 -2 491 6
       4 113 24 238 45 125 21 239 43 253 48 37 14 77 66 89 115 27 103 76 231 129
       337 69 138 75 158 58 207 -7 21 -75 124 -150 230 -75 106 -137 198 -137 205 0
       8 76 89 169 182 157 155 171 167 191 156 12 -7 101 -68 198 -138 181 -130 234
       -157 280 -145 15 3 84 35 153 70 69 34 180 81 247 103 67 22 131 45 143 52 43
       27 57 70 99 312 22 132 43 243 46 248 3 4 112 8 243 8 179 0 241 -3 248 -12z`,
                ],
                [
                    'd',
                    `M2463 3659 c-412 -36 -776 -307 -929 -692 -98 -247 -99 -554 -4 -802
       112 -289 346 -523 635 -635 186 -71 418 -90 617 -50 620 127 1007 753 843
       1367 -116 436 -518 778 -950 809 -44 3 -89 6 -100 8 -11 2 -61 -1 -112 -5z
       m277 -305 c302 -65 545 -309 616 -619 21 -92 21 -258 -1 -355 -23 -102 -101
       -260 -169 -341 -248 -296 -678 -378 -1015 -193 -439 241 -559 813 -254 1212
       76 99 169 174 288 232 175 85 345 105 535 64z`,
                ],
            ],
            template: function (i, s) {
                i & 1 &&
                    (I(0, 'button', 0),
                    ut(),
                    I(1, 'svg', 1)(2, 'g', 2),
                    F(3, 'path', 3)(4, 'path', 4),
                    C()()());
            },
            styles: [
                '.reset[_ngcontent-%COMP%]{border:0;background-color:unset}',
            ],
            changeDetection: 0,
        }));
    let t = e;
    return t;
})();
var no = new E('Url for texts source', {
    factory: () => 'https://ilibrary.ru',
});
var Nn = (() => {
    let e = class e {
        constructor() {
            (this._isLoading$ = new A(!1)),
                (this.isLoading$ = this._isLoading$.asObservable());
        }
        load$(n) {
            this._isLoading$.next(n);
        }
    };
    (e.ɵfac = function (i) {
        return new (i || e)();
    }),
        (e.ɵprov = m({ token: e, factory: e.ɵfac, providedIn: 'root' }));
    let t = e;
    return t;
})();
var io = -1;
function ro(t) {
    return Math.floor(Math.random() * t.length);
}
function so(t) {
    let e = ro(t);
    for (; e == io; ) e = ro(t);
    return (io = e), t[e].text;
}
function oo(t) {
    return t.split('');
}
var st = (() => {
    let e = class e {
        constructor(n, i) {
            (this.http = n),
                (this.loadingService = i),
                (this._slicedText$ = new A([])),
                (this.slicedText$ = this._slicedText$.asObservable()),
                (this._textForTypingLength$ = new A(0)),
                (this.textForTypingLength$ =
                    this._textForTypingLength$.asObservable()),
                (this.texts = []);
        }
        requestText$(n, i) {
            return (
                this.texts.length ||
                    (this.loadingService.load$(!0),
                    this.http.get(n).subscribe({
                        next: (s) => {
                            this.chooseText(s, i), (this.texts = s);
                        },
                        complete: () => {
                            this.loadingService.load$(!1);
                        },
                    })),
                this.slicedText$
            );
        }
        chooseText(n, i) {
            let s = '';
            switch (i) {
                case 'random':
                    s = so(n);
                    break;
                case 'fromStart':
                    s =
                        '\u0435\u0449\u0435 \u043D\u0435 \u0433\u043E\u0442\u043E\u0432\u043E';
                    break;
                case 'fromEnd':
                    s =
                        '\u0435\u0449\u0435 \u043D\u0435 \u0433\u043E\u0442\u043E\u0432\u043E';
                    break;
                case 'id':
                    s =
                        '\u0435\u0449\u0435 \u043D\u0435 \u0433\u043E\u0442\u043E\u0432\u043E';
                    break;
            }
            let o = oo(s);
            this._slicedText$.next(o);
        }
        setTextForTypingLength$(n) {
            this._textForTypingLength$.next(n);
        }
    };
    (e.ɵfac = function (i) {
        return new (i || e)(g(ti), g(Nn));
    }),
        (e.ɵprov = m({ token: e, factory: e.ɵfac, providedIn: 'platform' }));
    let t = e;
    return t;
})();
var ao = new Set([
    'AltGraph',
    'Shift',
    'Meta',
    'Tab',
    'Alt',
    'CapsLock',
    'Escape',
    'Control',
    'ContextMenu',
    'Enter',
    'Backspace',
    'Delete',
    'Pause',
    'F1',
    'F2',
    'F3',
    'F4',
    'F5',
    'F6',
    'F7',
    'F8',
    'F9',
    'F10',
    'F11',
    'F12',
    'Insert',
    'PageUp',
    'PageDown',
    'End',
    'Home',
    'PrintScreen',
    'NumLock',
    'ScrollLock',
    'ArrowRight',
    'ArrowLeft',
    'ArrowUp',
    'ArrowDown',
]);
var Qi;
try {
    Qi = typeof Intl < 'u' && Intl.v8BreakIterator;
} catch {
    Qi = !1;
}
var Vt = (() => {
    let e = class e {
        constructor(n) {
            (this._platformId = n),
                (this.isBrowser = this._platformId
                    ? $r(this._platformId)
                    : typeof document == 'object' && !!document),
                (this.EDGE =
                    this.isBrowser && /(edge)/i.test(navigator.userAgent)),
                (this.TRIDENT =
                    this.isBrowser &&
                    /(msie|trident)/i.test(navigator.userAgent)),
                (this.BLINK =
                    this.isBrowser &&
                    !!(window.chrome || Qi) &&
                    typeof CSS < 'u' &&
                    !this.EDGE &&
                    !this.TRIDENT),
                (this.WEBKIT =
                    this.isBrowser &&
                    /AppleWebKit/i.test(navigator.userAgent) &&
                    !this.BLINK &&
                    !this.EDGE &&
                    !this.TRIDENT),
                (this.IOS =
                    this.isBrowser &&
                    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
                    !('MSStream' in window)),
                (this.FIREFOX =
                    this.isBrowser &&
                    /(firefox|minefield)/i.test(navigator.userAgent)),
                (this.ANDROID =
                    this.isBrowser &&
                    /android/i.test(navigator.userAgent) &&
                    !this.TRIDENT),
                (this.SAFARI =
                    this.isBrowser &&
                    /safari/i.test(navigator.userAgent) &&
                    this.WEBKIT);
        }
    };
    (e.ɵfac = function (i) {
        return new (i || e)(g(he));
    }),
        (e.ɵprov = m({ token: e, factory: e.ɵfac, providedIn: 'root' }));
    let t = e;
    return t;
})();
var zt;
function Sl() {
    if (zt == null && typeof window < 'u')
        try {
            window.addEventListener(
                'test',
                null,
                Object.defineProperty({}, 'passive', { get: () => (zt = !0) }),
            );
        } finally {
            zt = zt || !1;
        }
    return zt;
}
function Ji(t) {
    return Sl() ? t : !!t.capture;
}
function co(t) {
    return t.composedPath ? t.composedPath()[0] : t.target;
}
function lo() {
    return (
        (typeof __karma__ < 'u' && !!__karma__) ||
        (typeof jasmine < 'u' && !!jasmine) ||
        (typeof jest < 'u' && !!jest) ||
        (typeof Mocha < 'u' && !!Mocha)
    );
}
function er(t) {
    return Array.isArray(t) ? t : [t];
}
function tr(t) {
    return t instanceof ce ? t.nativeElement : t;
}
var ho = new Set(),
    $e,
    Al = (() => {
        let e = class e {
            constructor(n, i) {
                (this._platform = n),
                    (this._nonce = i),
                    (this._matchMedia =
                        this._platform.isBrowser && window.matchMedia
                            ? window.matchMedia.bind(window)
                            : Ml);
            }
            matchMedia(n) {
                return (
                    (this._platform.WEBKIT || this._platform.BLINK) &&
                        xl(n, this._nonce),
                    this._matchMedia(n)
                );
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)(g(Vt), g(ht, 8));
        }),
            (e.ɵprov = m({ token: e, factory: e.ɵfac, providedIn: 'root' }));
        let t = e;
        return t;
    })();
function xl(t, e) {
    if (!ho.has(t))
        try {
            $e ||
                (($e = document.createElement('style')),
                e && ($e.nonce = e),
                $e.setAttribute('type', 'text/css'),
                document.head.appendChild($e)),
                $e.sheet &&
                    ($e.sheet.insertRule(`@media ${t} {body{ }}`, 0),
                    ho.add(t));
        } catch (r) {
            console.error(r);
        }
}
function Ml(t) {
    return {
        matches: t === 'all' || t === '',
        media: t,
        addListener: () => {},
        removeListener: () => {},
    };
}
var fo = (() => {
    let e = class e {
        constructor(n, i) {
            (this._mediaMatcher = n),
                (this._zone = i),
                (this._queries = new Map()),
                (this._destroySubject = new $());
        }
        ngOnDestroy() {
            this._destroySubject.next(), this._destroySubject.complete();
        }
        isMatched(n) {
            return po(er(n)).some((s) => this._registerQuery(s).mql.matches);
        }
        observe(n) {
            let s = po(er(n)).map((a) => this._registerQuery(a).observable),
                o = at(s);
            return (
                (o = Ht(o.pipe(ve(1)), o.pipe(vr(1), pr(0)))),
                o.pipe(
                    _((a) => {
                        let l = { matches: !1, breakpoints: {} };
                        return (
                            a.forEach(({ matches: c, query: u }) => {
                                (l.matches = l.matches || c),
                                    (l.breakpoints[u] = c);
                            }),
                            l
                        );
                    }),
                )
            );
        }
        _registerQuery(n) {
            if (this._queries.has(n)) return this._queries.get(n);
            let i = this._mediaMatcher.matchMedia(n),
                o = {
                    observable: new qt((a) => {
                        let l = (c) => this._zone.run(() => a.next(c));
                        return (
                            i.addListener(l),
                            () => {
                                i.removeListener(l);
                            }
                        );
                    }).pipe(
                        Gt(i),
                        _(({ matches: a }) => ({ query: n, matches: a })),
                        q(this._destroySubject),
                    ),
                    mql: i,
                };
            return this._queries.set(n, o), o;
        }
    };
    (e.ɵfac = function (i) {
        return new (i || e)(g(Al), g(B));
    }),
        (e.ɵprov = m({ token: e, factory: e.ɵfac, providedIn: 'root' }));
    let t = e;
    return t;
})();
function po(t) {
    return t
        .map((e) => e.split(','))
        .reduce((e, r) => e.concat(r))
        .map((e) => e.trim());
}
function vo(t) {
    return t.buttons === 0 || t.detail === 0;
}
function yo(t) {
    let e =
        (t.touches && t.touches[0]) ||
        (t.changedTouches && t.changedTouches[0]);
    return (
        !!e &&
        e.identifier === -1 &&
        (e.radiusX == null || e.radiusX === 1) &&
        (e.radiusY == null || e.radiusY === 1)
    );
}
var Be = (function (t) {
        return (
            (t[(t.NONE = 0)] = 'NONE'),
            (t[(t.BLACK_ON_WHITE = 1)] = 'BLACK_ON_WHITE'),
            (t[(t.WHITE_ON_BLACK = 2)] = 'WHITE_ON_BLACK'),
            t
        );
    })(Be || {}),
    mo = 'cdk-high-contrast-black-on-white',
    go = 'cdk-high-contrast-white-on-black',
    nr = 'cdk-high-contrast-active',
    bo = (() => {
        let e = class e {
            constructor(n, i) {
                (this._platform = n),
                    (this._document = i),
                    (this._breakpointSubscription = f(fo)
                        .observe('(forced-colors: active)')
                        .subscribe(() => {
                            this._hasCheckedHighContrastMode &&
                                ((this._hasCheckedHighContrastMode = !1),
                                this._applyBodyHighContrastModeCssClasses());
                        }));
            }
            getHighContrastMode() {
                if (!this._platform.isBrowser) return Be.NONE;
                let n = this._document.createElement('div');
                (n.style.backgroundColor = 'rgb(1,2,3)'),
                    (n.style.position = 'absolute'),
                    this._document.body.appendChild(n);
                let i = this._document.defaultView || window,
                    s = i && i.getComputedStyle ? i.getComputedStyle(n) : null,
                    o = ((s && s.backgroundColor) || '').replace(/ /g, '');
                switch ((n.remove(), o)) {
                    case 'rgb(0,0,0)':
                    case 'rgb(45,50,54)':
                    case 'rgb(32,32,32)':
                        return Be.WHITE_ON_BLACK;
                    case 'rgb(255,255,255)':
                    case 'rgb(255,250,239)':
                        return Be.BLACK_ON_WHITE;
                }
                return Be.NONE;
            }
            ngOnDestroy() {
                this._breakpointSubscription.unsubscribe();
            }
            _applyBodyHighContrastModeCssClasses() {
                if (
                    !this._hasCheckedHighContrastMode &&
                    this._platform.isBrowser &&
                    this._document.body
                ) {
                    let n = this._document.body.classList;
                    n.remove(nr, mo, go),
                        (this._hasCheckedHighContrastMode = !0);
                    let i = this.getHighContrastMode();
                    i === Be.BLACK_ON_WHITE
                        ? n.add(nr, mo)
                        : i === Be.WHITE_ON_BLACK && n.add(nr, go);
                }
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)(g(Vt), g(U));
        }),
            (e.ɵprov = m({ token: e, factory: e.ɵfac, providedIn: 'root' }));
        let t = e;
        return t;
    })();
var ir = (() => {
    let e = class e {};
    (e.ɵfac = function (i) {
        return new (i || e)();
    }),
        (e.ɵmod = X({ type: e })),
        (e.ɵinj = Q({}));
    let t = e;
    return t;
})();
function kl() {
    return !0;
}
var Nl = new E('mat-sanity-checks', { providedIn: 'root', factory: kl }),
    Ro = (() => {
        let e = class e {
            constructor(n, i, s) {
                (this._sanityChecks = i),
                    (this._document = s),
                    (this._hasDoneGlobalChecks = !1),
                    n._applyBodyHighContrastModeCssClasses(),
                    this._hasDoneGlobalChecks ||
                        (this._hasDoneGlobalChecks = !0);
            }
            _checkIsEnabled(n) {
                return lo()
                    ? !1
                    : typeof this._sanityChecks == 'boolean'
                      ? this._sanityChecks
                      : !!this._sanityChecks[n];
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)(g(bo), g(Nl, 8), g(U));
        }),
            (e.ɵmod = X({ type: e })),
            (e.ɵinj = Q({ imports: [ir, ir] }));
        let t = e;
        return t;
    })();
var ae = (function (t) {
        return (
            (t[(t.FADING_IN = 0)] = 'FADING_IN'),
            (t[(t.VISIBLE = 1)] = 'VISIBLE'),
            (t[(t.FADING_OUT = 2)] = 'FADING_OUT'),
            (t[(t.HIDDEN = 3)] = 'HIDDEN'),
            t
        );
    })(ae || {}),
    rr = class {
        constructor(e, r, n, i = !1) {
            (this._renderer = e),
                (this.element = r),
                (this.config = n),
                (this._animationForciblyDisabledThroughCss = i),
                (this.state = ae.HIDDEN);
        }
        fadeOut() {
            this._renderer.fadeOutRipple(this);
        }
    },
    _o = Ji({ passive: !0, capture: !0 }),
    sr = class {
        constructor() {
            (this._events = new Map()),
                (this._delegateEventHandler = (e) => {
                    let r = co(e);
                    r &&
                        this._events.get(e.type)?.forEach((n, i) => {
                            (i === r || i.contains(r)) &&
                                n.forEach((s) => s.handleEvent(e));
                        });
                });
        }
        addHandler(e, r, n, i) {
            let s = this._events.get(r);
            if (s) {
                let o = s.get(n);
                o ? o.add(i) : s.set(n, new Set([i]));
            } else
                this._events.set(r, new Map([[n, new Set([i])]])),
                    e.runOutsideAngular(() => {
                        document.addEventListener(
                            r,
                            this._delegateEventHandler,
                            _o,
                        );
                    });
        }
        removeHandler(e, r, n) {
            let i = this._events.get(e);
            if (!i) return;
            let s = i.get(r);
            s &&
                (s.delete(n),
                s.size === 0 && i.delete(r),
                i.size === 0 &&
                    (this._events.delete(e),
                    document.removeEventListener(
                        e,
                        this._delegateEventHandler,
                        _o,
                    )));
        }
    },
    wo = { enterDuration: 225, exitDuration: 150 },
    Pl = 800,
    Io = Ji({ passive: !0, capture: !0 }),
    To = ['mousedown', 'touchstart'],
    Eo = ['mouseup', 'mouseleave', 'touchend', 'touchcancel'],
    Wt = class Wt {
        constructor(e, r, n, i) {
            (this._target = e),
                (this._ngZone = r),
                (this._platform = i),
                (this._isPointerDown = !1),
                (this._activeRipples = new Map()),
                (this._pointerUpEventsRegistered = !1),
                i.isBrowser && (this._containerElement = tr(n));
        }
        fadeInRipple(e, r, n = {}) {
            let i = (this._containerRect =
                    this._containerRect ||
                    this._containerElement.getBoundingClientRect()),
                s = p(p({}, wo), n.animation);
            n.centered &&
                ((e = i.left + i.width / 2), (r = i.top + i.height / 2));
            let o = n.radius || Ll(e, r, i),
                a = e - i.left,
                l = r - i.top,
                c = s.enterDuration,
                u = document.createElement('div');
            u.classList.add('mat-ripple-element'),
                (u.style.left = `${a - o}px`),
                (u.style.top = `${l - o}px`),
                (u.style.height = `${o * 2}px`),
                (u.style.width = `${o * 2}px`),
                n.color != null && (u.style.backgroundColor = n.color),
                (u.style.transitionDuration = `${c}ms`),
                this._containerElement.appendChild(u);
            let d = window.getComputedStyle(u),
                h = d.transitionProperty,
                R = d.transitionDuration,
                G =
                    h === 'none' ||
                    R === '0s' ||
                    R === '0s, 0s' ||
                    (i.width === 0 && i.height === 0),
                L = new rr(this, u, n, G);
            (u.style.transform = 'scale3d(1, 1, 1)'),
                (L.state = ae.FADING_IN),
                n.persistent || (this._mostRecentTransientRipple = L);
            let w = null;
            return (
                !G &&
                    (c || s.exitDuration) &&
                    this._ngZone.runOutsideAngular(() => {
                        let b = () => this._finishRippleTransition(L),
                            Z = () => this._destroyRipple(L);
                        u.addEventListener('transitionend', b),
                            u.addEventListener('transitioncancel', Z),
                            (w = { onTransitionEnd: b, onTransitionCancel: Z });
                    }),
                this._activeRipples.set(L, w),
                (G || !c) && this._finishRippleTransition(L),
                L
            );
        }
        fadeOutRipple(e) {
            if (e.state === ae.FADING_OUT || e.state === ae.HIDDEN) return;
            let r = e.element,
                n = p(p({}, wo), e.config.animation);
            (r.style.transitionDuration = `${n.exitDuration}ms`),
                (r.style.opacity = '0'),
                (e.state = ae.FADING_OUT),
                (e._animationForciblyDisabledThroughCss || !n.exitDuration) &&
                    this._finishRippleTransition(e);
        }
        fadeOutAll() {
            this._getActiveRipples().forEach((e) => e.fadeOut());
        }
        fadeOutAllNonPersistent() {
            this._getActiveRipples().forEach((e) => {
                e.config.persistent || e.fadeOut();
            });
        }
        setupTriggerEvents(e) {
            let r = tr(e);
            !this._platform.isBrowser ||
                !r ||
                r === this._triggerElement ||
                (this._removeTriggerEvents(),
                (this._triggerElement = r),
                To.forEach((n) => {
                    Wt._eventManager.addHandler(this._ngZone, n, r, this);
                }));
        }
        handleEvent(e) {
            e.type === 'mousedown'
                ? this._onMousedown(e)
                : e.type === 'touchstart'
                  ? this._onTouchStart(e)
                  : this._onPointerUp(),
                this._pointerUpEventsRegistered ||
                    (this._ngZone.runOutsideAngular(() => {
                        Eo.forEach((r) => {
                            this._triggerElement.addEventListener(r, this, Io);
                        });
                    }),
                    (this._pointerUpEventsRegistered = !0));
        }
        _finishRippleTransition(e) {
            e.state === ae.FADING_IN
                ? this._startFadeOutTransition(e)
                : e.state === ae.FADING_OUT && this._destroyRipple(e);
        }
        _startFadeOutTransition(e) {
            let r = e === this._mostRecentTransientRipple,
                { persistent: n } = e.config;
            (e.state = ae.VISIBLE),
                !n && (!r || !this._isPointerDown) && e.fadeOut();
        }
        _destroyRipple(e) {
            let r = this._activeRipples.get(e) ?? null;
            this._activeRipples.delete(e),
                this._activeRipples.size || (this._containerRect = null),
                e === this._mostRecentTransientRipple &&
                    (this._mostRecentTransientRipple = null),
                (e.state = ae.HIDDEN),
                r !== null &&
                    (e.element.removeEventListener(
                        'transitionend',
                        r.onTransitionEnd,
                    ),
                    e.element.removeEventListener(
                        'transitioncancel',
                        r.onTransitionCancel,
                    )),
                e.element.remove();
        }
        _onMousedown(e) {
            let r = vo(e),
                n =
                    this._lastTouchStartEvent &&
                    Date.now() < this._lastTouchStartEvent + Pl;
            !this._target.rippleDisabled &&
                !r &&
                !n &&
                ((this._isPointerDown = !0),
                this.fadeInRipple(
                    e.clientX,
                    e.clientY,
                    this._target.rippleConfig,
                ));
        }
        _onTouchStart(e) {
            if (!this._target.rippleDisabled && !yo(e)) {
                (this._lastTouchStartEvent = Date.now()),
                    (this._isPointerDown = !0);
                let r = e.changedTouches;
                if (r)
                    for (let n = 0; n < r.length; n++)
                        this.fadeInRipple(
                            r[n].clientX,
                            r[n].clientY,
                            this._target.rippleConfig,
                        );
            }
        }
        _onPointerUp() {
            this._isPointerDown &&
                ((this._isPointerDown = !1),
                this._getActiveRipples().forEach((e) => {
                    let r =
                        e.state === ae.VISIBLE ||
                        (e.config.terminateOnPointerUp &&
                            e.state === ae.FADING_IN);
                    !e.config.persistent && r && e.fadeOut();
                }));
        }
        _getActiveRipples() {
            return Array.from(this._activeRipples.keys());
        }
        _removeTriggerEvents() {
            let e = this._triggerElement;
            e &&
                (To.forEach((r) => Wt._eventManager.removeHandler(r, e, this)),
                this._pointerUpEventsRegistered &&
                    Eo.forEach((r) => e.removeEventListener(r, this, Io)));
        }
    };
Wt._eventManager = new sr();
var Co = Wt;
function Ll(t, e, r) {
    let n = Math.max(Math.abs(t - r.left), Math.abs(t - r.right)),
        i = Math.max(Math.abs(e - r.top), Math.abs(e - r.bottom));
    return Math.sqrt(n * n + i * i);
}
var Fl = ['determinateSpinner'];
function jl(t, e) {
    if ((t & 1 && (ut(), I(0, 'svg', 11), F(1, 'circle', 12), C()), t & 2)) {
        let r = ne();
        fe('viewBox', r._viewBox()),
            D(),
            le('stroke-dasharray', r._strokeCircumference(), 'px')(
                'stroke-dashoffset',
                r._strokeCircumference() / 2,
                'px',
            )('stroke-width', r._circleStrokeWidth(), '%'),
            fe('r', r._circleRadius());
    }
}
var Ul = new E('mat-progress-spinner-default-options', {
    providedIn: 'root',
    factory: $l,
});
function $l() {
    return { diameter: Do };
}
var Do = 100,
    Bl = 10,
    So = (() => {
        let e = class e {
            get color() {
                return this._color || this._defaultColor;
            }
            set color(n) {
                this._color = n;
            }
            constructor(n, i, s) {
                (this._elementRef = n),
                    (this._defaultColor = 'primary'),
                    (this._value = 0),
                    (this._diameter = Do),
                    (this._noopAnimations =
                        i === 'NoopAnimations' && !!s && !s._forceAnimations),
                    (this.mode =
                        n.nativeElement.nodeName.toLowerCase() === 'mat-spinner'
                            ? 'indeterminate'
                            : 'determinate'),
                    s &&
                        (s.color && (this.color = this._defaultColor = s.color),
                        s.diameter && (this.diameter = s.diameter),
                        s.strokeWidth && (this.strokeWidth = s.strokeWidth));
            }
            get value() {
                return this.mode === 'determinate' ? this._value : 0;
            }
            set value(n) {
                this._value = Math.max(0, Math.min(100, n || 0));
            }
            get diameter() {
                return this._diameter;
            }
            set diameter(n) {
                this._diameter = n || 0;
            }
            get strokeWidth() {
                return this._strokeWidth ?? this.diameter / 10;
            }
            set strokeWidth(n) {
                this._strokeWidth = n || 0;
            }
            _circleRadius() {
                return (this.diameter - Bl) / 2;
            }
            _viewBox() {
                let n = this._circleRadius() * 2 + this.strokeWidth;
                return `0 0 ${n} ${n}`;
            }
            _strokeCircumference() {
                return 2 * Math.PI * this._circleRadius();
            }
            _strokeDashOffset() {
                return this.mode === 'determinate'
                    ? (this._strokeCircumference() * (100 - this._value)) / 100
                    : null;
            }
            _circleStrokeWidth() {
                return (this.strokeWidth / this.diameter) * 100;
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)(S(ce), S(dt, 8), S(Ul));
        }),
            (e.ɵcmp = N({
                type: e,
                selectors: [['mat-progress-spinner'], ['mat-spinner']],
                viewQuery: function (i, s) {
                    if ((i & 1 && qe(Fl, 5), i & 2)) {
                        let o;
                        Oe((o = ke())) && (s._determinateCircle = o.first);
                    }
                },
                hostAttrs: [
                    'role',
                    'progressbar',
                    'tabindex',
                    '-1',
                    1,
                    'mat-mdc-progress-spinner',
                    'mdc-circular-progress',
                ],
                hostVars: 18,
                hostBindings: function (i, s) {
                    i & 2 &&
                        (fe('aria-valuemin', 0)('aria-valuemax', 100)(
                            'aria-valuenow',
                            s.mode === 'determinate' ? s.value : null,
                        )('mode', s.mode),
                        xr('mat-' + s.color),
                        le('width', s.diameter, 'px')(
                            'height',
                            s.diameter,
                            'px',
                        )('--mdc-circular-progress-size', s.diameter + 'px')(
                            '--mdc-circular-progress-active-indicator-width',
                            s.diameter + 'px',
                        ),
                        Gn('_mat-animation-noopable', s._noopAnimations)(
                            'mdc-circular-progress--indeterminate',
                            s.mode === 'indeterminate',
                        ));
                },
                inputs: {
                    color: 'color',
                    mode: 'mode',
                    value: [
                        Me.HasDecoratorInputTransform,
                        'value',
                        'value',
                        rn,
                    ],
                    diameter: [
                        Me.HasDecoratorInputTransform,
                        'diameter',
                        'diameter',
                        rn,
                    ],
                    strokeWidth: [
                        Me.HasDecoratorInputTransform,
                        'strokeWidth',
                        'strokeWidth',
                        rn,
                    ],
                },
                exportAs: ['matProgressSpinner'],
                standalone: !0,
                features: [mt, P],
                decls: 14,
                vars: 11,
                consts: [
                    ['circle', ''],
                    [
                        'aria-hidden',
                        'true',
                        1,
                        'mdc-circular-progress__determinate-container',
                    ],
                    ['determinateSpinner', ''],
                    [
                        'xmlns',
                        'http://www.w3.org/2000/svg',
                        'focusable',
                        'false',
                        1,
                        'mdc-circular-progress__determinate-circle-graphic',
                    ],
                    [
                        'cx',
                        '50%',
                        'cy',
                        '50%',
                        1,
                        'mdc-circular-progress__determinate-circle',
                    ],
                    [
                        'aria-hidden',
                        'true',
                        1,
                        'mdc-circular-progress__indeterminate-container',
                    ],
                    [1, 'mdc-circular-progress__spinner-layer'],
                    [
                        1,
                        'mdc-circular-progress__circle-clipper',
                        'mdc-circular-progress__circle-left',
                    ],
                    [3, 'ngTemplateOutlet'],
                    [1, 'mdc-circular-progress__gap-patch'],
                    [
                        1,
                        'mdc-circular-progress__circle-clipper',
                        'mdc-circular-progress__circle-right',
                    ],
                    [
                        'xmlns',
                        'http://www.w3.org/2000/svg',
                        'focusable',
                        'false',
                        1,
                        'mdc-circular-progress__indeterminate-circle-graphic',
                    ],
                    ['cx', '50%', 'cy', '50%'],
                ],
                template: function (i, s) {
                    if (
                        (i & 1 &&
                            (z(0, jl, 2, 8, 'ng-template', null, 0, Pe),
                            I(2, 'div', 1, 2),
                            ut(),
                            I(4, 'svg', 3),
                            F(5, 'circle', 4),
                            C()(),
                            yr(),
                            I(6, 'div', 5)(7, 'div', 6)(8, 'div', 7),
                            Qt(9, 8),
                            C(),
                            I(10, 'div', 9),
                            Qt(11, 8),
                            C(),
                            I(12, 'div', 10),
                            Qt(13, 8),
                            C()()()),
                        i & 2)
                    ) {
                        let o = Ne(1);
                        D(4),
                            fe('viewBox', s._viewBox()),
                            D(),
                            le(
                                'stroke-dasharray',
                                s._strokeCircumference(),
                                'px',
                            )('stroke-dashoffset', s._strokeDashOffset(), 'px')(
                                'stroke-width',
                                s._circleStrokeWidth(),
                                '%',
                            ),
                            fe('r', s._circleRadius()),
                            D(4),
                            M('ngTemplateOutlet', o),
                            D(2),
                            M('ngTemplateOutlet', o),
                            D(2),
                            M('ngTemplateOutlet', o);
                    }
                },
                dependencies: [jr],
                styles: [
                    '@keyframes mdc-circular-progress-container-rotate{to{transform:rotate(360deg)}}@keyframes mdc-circular-progress-spinner-layer-rotate{12.5%{transform:rotate(135deg)}25%{transform:rotate(270deg)}37.5%{transform:rotate(405deg)}50%{transform:rotate(540deg)}62.5%{transform:rotate(675deg)}75%{transform:rotate(810deg)}87.5%{transform:rotate(945deg)}100%{transform:rotate(1080deg)}}@keyframes mdc-circular-progress-color-1-fade-in-out{from{opacity:.99}25%{opacity:.99}26%{opacity:0}89%{opacity:0}90%{opacity:.99}to{opacity:.99}}@keyframes mdc-circular-progress-color-2-fade-in-out{from{opacity:0}15%{opacity:0}25%{opacity:.99}50%{opacity:.99}51%{opacity:0}to{opacity:0}}@keyframes mdc-circular-progress-color-3-fade-in-out{from{opacity:0}40%{opacity:0}50%{opacity:.99}75%{opacity:.99}76%{opacity:0}to{opacity:0}}@keyframes mdc-circular-progress-color-4-fade-in-out{from{opacity:0}65%{opacity:0}75%{opacity:.99}90%{opacity:.99}to{opacity:0}}@keyframes mdc-circular-progress-left-spin{from{transform:rotate(265deg)}50%{transform:rotate(130deg)}to{transform:rotate(265deg)}}@keyframes mdc-circular-progress-right-spin{from{transform:rotate(-265deg)}50%{transform:rotate(-130deg)}to{transform:rotate(-265deg)}}.mdc-circular-progress{display:inline-flex;position:relative;direction:ltr;line-height:0;transition:opacity 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-circular-progress__determinate-container,.mdc-circular-progress__indeterminate-circle-graphic,.mdc-circular-progress__indeterminate-container,.mdc-circular-progress__spinner-layer{position:absolute;width:100%;height:100%}.mdc-circular-progress__determinate-container{transform:rotate(-90deg)}.mdc-circular-progress__indeterminate-container{font-size:0;letter-spacing:0;white-space:nowrap;opacity:0}.mdc-circular-progress__determinate-circle-graphic,.mdc-circular-progress__indeterminate-circle-graphic{fill:rgba(0,0,0,0)}.mdc-circular-progress__determinate-circle{transition:stroke-dashoffset 500ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-circular-progress__gap-patch{position:absolute;top:0;left:47.5%;box-sizing:border-box;width:5%;height:100%;overflow:hidden}.mdc-circular-progress__gap-patch .mdc-circular-progress__indeterminate-circle-graphic{left:-900%;width:2000%;transform:rotate(180deg)}.mdc-circular-progress__circle-clipper{display:inline-flex;position:relative;width:50%;height:100%;overflow:hidden}.mdc-circular-progress__circle-clipper .mdc-circular-progress__indeterminate-circle-graphic{width:200%}.mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic{left:-100%}.mdc-circular-progress--indeterminate .mdc-circular-progress__determinate-container{opacity:0}.mdc-circular-progress--indeterminate .mdc-circular-progress__indeterminate-container{opacity:1}.mdc-circular-progress--indeterminate .mdc-circular-progress__indeterminate-container{animation:mdc-circular-progress-container-rotate 1568.2352941176ms linear infinite}.mdc-circular-progress--indeterminate .mdc-circular-progress__spinner-layer{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__color-1{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,mdc-circular-progress-color-1-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__color-2{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,mdc-circular-progress-color-2-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__color-3{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,mdc-circular-progress-color-3-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__color-4{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,mdc-circular-progress-color-4-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-left .mdc-circular-progress__indeterminate-circle-graphic{animation:mdc-circular-progress-left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic{animation:mdc-circular-progress-right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--closed{opacity:0}.mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,.mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic{stroke:var(--mdc-circular-progress-active-indicator-color)}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,.mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic{stroke:CanvasText}}.mat-mdc-progress-spinner circle{stroke-width:var(--mdc-circular-progress-active-indicator-width)}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mat-mdc-progress-spinner .mdc-circular-progress--four-color .mdc-circular-progress__color-1 .mdc-circular-progress__indeterminate-circle-graphic{stroke:CanvasText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mat-mdc-progress-spinner .mdc-circular-progress--four-color .mdc-circular-progress__color-2 .mdc-circular-progress__indeterminate-circle-graphic{stroke:CanvasText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mat-mdc-progress-spinner .mdc-circular-progress--four-color .mdc-circular-progress__color-3 .mdc-circular-progress__indeterminate-circle-graphic{stroke:CanvasText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mat-mdc-progress-spinner .mdc-circular-progress--four-color .mdc-circular-progress__color-4 .mdc-circular-progress__indeterminate-circle-graphic{stroke:CanvasText}}.mat-mdc-progress-spinner .mdc-circular-progress{width:var(--mdc-circular-progress-size) !important;height:var(--mdc-circular-progress-size) !important}.mat-mdc-progress-spinner{display:block;overflow:hidden;line-height:0}.mat-mdc-progress-spinner._mat-animation-noopable,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__determinate-circle{transition:none}.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-circle-graphic,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__spinner-layer,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container{animation:none}.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container circle{stroke-dasharray:0 !important}.cdk-high-contrast-active .mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic,.cdk-high-contrast-active .mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle{stroke:currentColor;stroke:CanvasText}',
                ],
                encapsulation: 2,
                changeDetection: 0,
            }));
        let t = e;
        return t;
    })();
var Pn = (() => {
    let e = class e {};
    (e.ɵfac = function (i) {
        return new (i || e)();
    }),
        (e.ɵmod = X({ type: e })),
        (e.ɵinj = Q({ imports: [H, Ro] }));
    let t = e;
    return t;
})();
var Re = (() => {
    let e = class e {
        constructor() {
            (this.storeComponentsData = {}),
                (this._componentsData$ = new A({})),
                (this.componentsData$ = this._componentsData$.asObservable());
        }
        addComponentData$(n) {
            (this.storeComponentsData[n.name] = n.isShow),
                this._componentsData$.next(this.storeComponentsData);
        }
        showOnlyOneComponent(n) {
            for (let i in this.storeComponentsData)
                Object.prototype.hasOwnProperty.call(
                    this.storeComponentsData,
                    i,
                ) &&
                    (i !== n
                        ? (this.storeComponentsData[i] = !1)
                        : (this.storeComponentsData[i] = !0));
        }
    };
    (e.ɵfac = function (i) {
        return new (i || e)();
    }),
        (e.ɵprov = m({ token: e, factory: e.ɵfac, providedIn: 'root' }));
    let t = e;
    return t;
})();
var Ln = (() => {
    let e = class e {
        constructor() {
            (this._resultTimeInMinuts$ = new A(0)),
                (this.resultTimeInMinuts$ =
                    this._resultTimeInMinuts$.asObservable());
        }
        setResultTimeInSeconds(n) {
            let i = +(n / 60).toFixed(2);
            this._resultTimeInMinuts$.next(i);
        }
    };
    (e.ɵfac = function (i) {
        return new (i || e)();
    }),
        (e.ɵprov = m({ token: e, factory: e.ɵfac, providedIn: 'root' }));
    let t = e;
    return t;
})();
function Vl(t, e) {
    if ((t & 1 && (I(0, 'span'), j(1), C()), t & 2)) {
        let r = ne();
        D(), vt(r.minuts);
    }
}
function Wl(t, e) {
    if ((t & 1 && (I(0, 'span'), j(1), C()), t & 2)) {
        let r = ne();
        D(), vt(r.seconds);
    }
}
function ql(t, e) {
    if ((t & 1 && j(0), t & 2)) {
        let r = ne();
        _e('0', r.minuts, '');
    }
}
function Hl(t, e) {
    if ((t & 1 && j(0), t & 2)) {
        let r = ne();
        _e('0', r.seconds, '');
    }
}
var Ao = (() => {
    let e = class e {
        constructor(n, i) {
            (this.cdr = n),
                (this.timerService = i),
                (this.isTimeCounting = null),
                (this.timerID = 0),
                (this.minuts = 0),
                (this.seconds = 0);
        }
        ngOnChanges({ isTimeCounting: n }) {
            n.currentValue &&
                (this.timerID = window.setInterval(
                    () => this.timeCounting(),
                    1e3,
                ));
        }
        ngOnDestroy() {
            let n = this.minuts * 60 + this.seconds;
            this.timerService.setResultTimeInSeconds(n),
                clearInterval(this.timerID);
        }
        timeCounting() {
            this.seconds++,
                this.seconds === 60 && (this.minuts++, (this.seconds = 0)),
                this.minuts === 60 && clearInterval(this.timerID),
                this.cdr.markForCheck();
        }
    };
    (e.ɵfac = function (i) {
        return new (i || e)(S(We), S(Ln));
    }),
        (e.ɵcmp = N({
            type: e,
            selectors: [['app-timer']],
            inputs: { isTimeCounting: 'isTimeCounting' },
            standalone: !0,
            features: [pt, P],
            decls: 9,
            vars: 4,
            consts: [
                [4, 'ngIf', 'ngIfElse'],
                ['digitMinut', ''],
                ['digitSecond', ''],
            ],
            template: function (i, s) {
                if (
                    (i & 1 &&
                        (I(0, 'div'),
                        z(1, Vl, 2, 1, 'span', 0),
                        I(2, 'span'),
                        j(3, ':'),
                        C(),
                        z(4, Wl, 2, 1, 'span', 0),
                        C(),
                        z(5, ql, 1, 1, 'ng-template', null, 1, Pe)(
                            7,
                            Hl,
                            1,
                            1,
                            'ng-template',
                            null,
                            2,
                            Pe,
                        )),
                    i & 2)
                ) {
                    let o = Ne(6),
                        a = Ne(8);
                    D(),
                        M('ngIf', s.minuts > 9)('ngIfElse', o),
                        D(3),
                        M('ngIf', s.seconds > 9)('ngIfElse', a);
                }
            },
            dependencies: [H, He],
            changeDetection: 0,
        }));
    let t = e;
    return t;
})();
function or(t, e, r) {
    return t.includes(e) && t.includes(r);
}
function xo(t, e) {
    return e.charCodeAt(0) === 160 && t.charCodeAt(0) === 32;
}
var Gl = ['inputTextForTyping'],
    Kl = ['textForTyping'];
function Zl(t, e) {
    if ((t & 1 && (I(0, 'span'), j(1), C()), t & 2)) {
        let r = ne().$implicit;
        D(), vt(r);
    }
}
function Yl(t, e) {
    if ((t & 1 && (I(0, 'div'), z(1, Zl, 2, 1, 'span', 8), C()), t & 2)) {
        let r = e.$implicit;
        ne();
        let n = Ne(11);
        D(), M('ngIf', r !== ' ')('ngIfElse', n);
    }
}
function Xl(t, e) {
    if ((t & 1 && F(0, 'app-timer', 9), t & 2)) {
        let r = ne();
        M('isTimeCounting', r.isTimeCounting);
    }
}
function Ql(t, e) {
    t & 1 && F(0, 'mat-spinner', 10);
}
function Jl(t, e) {
    t & 1 && j(0, '\xA0');
}
var Mo = (() => {
    let e = class e {
        constructor(n, i, s) {
            (this.textService = n),
                (this.loadingService = i),
                (this.componentsDataService = s),
                (this.destroy$ = new $()),
                (this.isLoading$ = this.loadingService.isLoading$.pipe(
                    q(this.destroy$),
                )),
                (this.componentsData$ =
                    this.componentsDataService.componentsData$.pipe(
                        q(this.destroy$),
                    )),
                (this.textForTyping$ = this.textService
                    .requestText$('assets/texts_for_typing.json', 'random')
                    .pipe(q(this.destroy$))),
                (this.inputTextForTyping = null),
                (this.textForTyping = null),
                (this.display = 'none'),
                (this.currentLetter = 0),
                (this.timerInputTextForTyping = 0),
                (this.isTimeCounting = !1),
                (this.canType = !1);
        }
        ngOnInit() {
            this.componentsData$.subscribe((n) => {
                n['app-text-for-typing'] && (this.display = 'flex');
            }),
                (this.timerInputTextForTyping = window.setTimeout(() => {
                    this.inputTextForTyping?.nativeElement.focus(),
                        (this.letters =
                            this.textForTyping?.nativeElement.children);
                })),
                this.isLoading$.subscribe((n) => {
                    !n && (this.canType = !0);
                });
        }
        ngOnDestroy() {
            clearTimeout(this.timerInputTextForTyping),
                this.destroy$.next(),
                this.destroy$.complete();
        }
        onClick() {
            this.inputTextForTyping?.nativeElement.focus();
        }
        onKeydown(n) {
            this.canType &&
                (this.letterValidation(n.key),
                this.currentLetter === 1 && (this.isTimeCounting = !0),
                this.checkEndText());
        }
        letterValidation(n) {
            if (this.letters) {
                let i = this.letters[this.currentLetter].textContent;
                if (xo(n, i)) {
                    (this.letters[this.currentLetter].className =
                        'valid-letter'),
                        this.currentLetter++;
                    return;
                }
                if (
                    or(['\u0435', '\u0451'], n, i) ||
                    or(['\u0415', '\u0401'], n, i)
                ) {
                    (this.letters[this.currentLetter].className =
                        'valid-letter'),
                        this.currentLetter++;
                    return;
                }
                switch (n) {
                    case 'Backspace':
                        if (this.currentLetter === 0) return;
                        (this.letters[this.currentLetter - 1].className =
                            'untyped-letter'),
                            this.currentLetter--;
                        break;
                    case this.letters[this.currentLetter].textContent:
                        (this.letters[this.currentLetter].className =
                            'valid-letter'),
                            this.currentLetter++;
                        break;
                    default:
                        if (!ao.has(n)) {
                            (this.letters[this.currentLetter].className =
                                'invalid-letter'),
                                this.currentLetter++;
                            return;
                        }
                }
            }
        }
        checkEndText() {
            this.letters.length === this.currentLetter &&
                (this.textService.setTextForTypingLength$(this.letters.length),
                this.componentsDataService.showOnlyOneComponent('app-result'));
        }
    };
    (e.ɵfac = function (i) {
        return new (i || e)(S(st), S(Nn), S(Re));
    }),
        (e.ɵcmp = N({
            type: e,
            selectors: [['app-text-for-typing']],
            viewQuery: function (i, s) {
                if ((i & 1 && (qe(Gl, 7, ce), qe(Kl, 7, ce)), i & 2)) {
                    let o;
                    Oe((o = ke())) && (s.inputTextForTyping = o.first),
                        Oe((o = ke())) && (s.textForTyping = o.first);
                }
            },
            hostVars: 2,
            hostBindings: function (i, s) {
                i & 1 &&
                    me('click', function () {
                        return s.onClick();
                    }),
                    i & 2 && le('display', s.display);
            },
            standalone: !0,
            features: [P],
            decls: 12,
            vars: 9,
            consts: [
                [1, 'text-for-typing'],
                ['textForTyping', ''],
                [4, 'ngFor', 'ngForOf'],
                ['class', 'timer', 3, 'isTimeCounting', 4, 'ngIf'],
                ['type', 'text', 1, 'input-text-for-typing', 3, 'keydown'],
                ['inputTextForTyping', ''],
                ['class', 'loading', 4, 'ngIf'],
                ['space', ''],
                [4, 'ngIf', 'ngIfElse'],
                [1, 'timer', 3, 'isTimeCounting'],
                [1, 'loading'],
            ],
            template: function (i, s) {
                i & 1 &&
                    (I(0, 'div', 0, 1),
                    z(2, Yl, 2, 2, 'div', 2),
                    ie(3, 'async'),
                    C(),
                    z(4, Xl, 1, 1, 'app-timer', 3),
                    ie(5, 'async'),
                    I(6, 'input', 4, 5),
                    me('keydown', function (a) {
                        return s.onKeydown(a);
                    }),
                    C(),
                    z(8, Ql, 1, 0, 'mat-spinner', 6),
                    ie(9, 'async'),
                    z(10, Jl, 1, 0, 'ng-template', null, 7, Pe)),
                    i & 2 &&
                        (D(2),
                        M('ngForOf', re(3, 3, s.textForTyping$)),
                        D(2),
                        M('ngIf', !re(5, 5, s.isLoading$)),
                        D(4),
                        M('ngIf', re(9, 7, s.isLoading$)));
            },
            dependencies: [H, Fr, He, Ge, Pn, So, Ao],
            styles: [
                '[_nghost-%COMP%]{display:flex;width:100%;height:100%}.text-for-typing[_ngcontent-%COMP%]{display:flex;flex-direction:row;flex-wrap:wrap;padding:0 10%}.invalid-letter[_ngcontent-%COMP%]{background-color:#ff000080}.valid-letter[_ngcontent-%COMP%]{background-color:#00ff0080}.untyped-letter[_ngcontent-%COMP%]{background-color:#f0f8ff}.input-text-for-typing[_ngcontent-%COMP%]{position:absolute;top:-50vh;z-index:-10}.loading[_ngcontent-%COMP%]{position:absolute;top:25px;z-index:10}.timer[_ngcontent-%COMP%]{margin-top:4%}',
            ],
            changeDetection: 0,
        }));
    let t = e;
    return t;
})();
var Oo = (() => {
    let e = class e {
        constructor(n) {
            (this.componentsDataService = n),
                (this.destroy$ = new $()),
                (this.display = 'none');
        }
        ngOnInit() {
            this.componentsDataService.componentsData$
                .pipe(q(this.destroy$))
                .subscribe((n) => {
                    this.display = n['app-intro'] ? 'flex' : 'none';
                });
        }
        onClick() {
            this.componentsDataService.showOnlyOneComponent(
                'app-text-for-typing',
            );
        }
        ngOnDestroy() {
            this.destroy$.next(), this.destroy$.complete();
        }
    };
    (e.ɵfac = function (i) {
        return new (i || e)(S(Re));
    }),
        (e.ɵcmp = N({
            type: e,
            selectors: [['app-intro']],
            hostVars: 2,
            hostBindings: function (i, s) {
                i & 1 &&
                    me('click', function () {
                        return s.onClick();
                    }),
                    i & 2 && le('display', s.display);
            },
            standalone: !0,
            features: [P],
            decls: 2,
            vars: 0,
            template: function (i, s) {
                i & 1 &&
                    (I(0, 'p'),
                    j(
                        1,
                        '\u041A\u043B\u0438\u043A\u043D\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043D\u0430\u0447\u0430\u0442\u044C',
                    ),
                    C());
            },
            dependencies: [H],
            styles: ['[_nghost-%COMP%]{display:flex;width:100%;height:100%}'],
            changeDetection: 0,
        }));
    let t = e;
    return t;
})();
var ko = (() => {
    let e = class e {
        constructor(n, i, s) {
            (this.componentsDataService = n),
                (this.timerService = i),
                (this.textService = s),
                (this.destroy$ = new $()),
                (this._resultSpeed$ = new A(0)),
                (this.resultSpeed$ = this._resultSpeed$.asObservable()),
                (this.textForTypingLength$ =
                    this.textService.textForTypingLength$.pipe(
                        q(this.destroy$),
                    )),
                (this.resultTimeInMinuts$ =
                    this.timerService.resultTimeInMinuts$.pipe(
                        q(this.destroy$),
                    )),
                (this.display = 'none');
        }
        ngOnInit() {
            this.componentsDataService.componentsData$
                .pipe(q(this.destroy$))
                .subscribe(
                    (n) => (this.display = n['app-result'] ? 'flex' : 'none'),
                ),
                this.textForTypingLength$.subscribe((n) => {
                    this.resultTimeInMinuts$.subscribe((i) => {
                        let s = Math.round(n / i);
                        this._resultSpeed$.next(s);
                    });
                });
        }
        ngOnDestroy() {
            this.destroy$.next(), this.destroy$.complete();
        }
        onClick() {
            this.componentsDataService.showOnlyOneComponent(
                'app-text-for-typing',
            );
        }
    };
    (e.ɵfac = function (i) {
        return new (i || e)(S(Re), S(Ln), S(st));
    }),
        (e.ɵcmp = N({
            type: e,
            selectors: [['app-result']],
            hostVars: 2,
            hostBindings: function (i, s) {
                i & 1 &&
                    me('click', function () {
                        return s.onClick();
                    }),
                    i & 2 && le('display', s.display);
            },
            standalone: !0,
            features: [P],
            decls: 9,
            vars: 9,
            template: function (i, s) {
                i & 1 &&
                    (I(0, 'div'),
                    j(1),
                    ie(2, 'async'),
                    C(),
                    I(3, 'div'),
                    j(4),
                    ie(5, 'async'),
                    C(),
                    I(6, 'div'),
                    j(7),
                    ie(8, 'async'),
                    C()),
                    i & 2 &&
                        (D(),
                        _e(
                            '\u0414\u043B\u0438\u043D\u0430 \u0442\u0435\u043A\u0441\u0442\u0430: ',
                            re(2, 3, s.textForTypingLength$),
                            ' \u0441\u0438\u043C\u0432\u043B\u043E\u0432',
                        ),
                        D(3),
                        _e(
                            '\u0418\u0442\u043E\u0433\u043E\u0432\u043E\u0435 \u0432\u0440\u0435\u043C\u044F: ',
                            re(5, 5, s.resultTimeInMinuts$),
                            ' \u043C\u0438\u043D\u0443\u0442',
                        ),
                        D(3),
                        _e(
                            '\u041A\u043E\u043D\u0435\u0447\u043D\u0430\u044F \u0441\u043A\u043E\u0440\u043E\u0441\u0442\u044C: ',
                            re(8, 7, s.resultSpeed$),
                            ' \u0441\u0438\u043C/\u043C\u0438\u043D',
                        ));
            },
            dependencies: [H, Ge],
            styles: [
                '[_nghost-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center;flex-grow:1;font-size:2em;width:100%;height:100%}',
            ],
            changeDetection: 0,
        }));
    let t = e;
    return t;
})();
function eu(t, e) {
    t & 1 && F(0, 'app-intro', 2);
}
function tu(t, e) {
    t & 1 && F(0, 'app-text-for-typing', 2);
}
function nu(t, e) {
    t & 1 && F(0, 'app-result');
}
var iu = () => ({ name: 'app-intro', isShow: !0 }),
    ru = () => ({ name: 'app-text-for-typing', isShow: !1 }),
    su = () => ({ name: 'app-result', isShow: !1 }),
    No = (() => {
        let e = class e {
            constructor(n) {
                (this.componentsDataService = n),
                    (this.destroy$ = new $()),
                    (this.componentsData$ =
                        this.componentsDataService.componentsData$.pipe(
                            q(this.destroy$),
                        )),
                    (this.initComponents = []);
            }
            ngOnDestroy() {
                this.destroy$.next(), this.destroy$.complete();
            }
            addInitComponentData(n) {
                return this.initComponents.includes(n.name)
                    ? this.componentsData$
                    : (this.initComponents.push(n.name),
                      this.componentsDataService.addComponentData$(n),
                      this.componentsData$);
            }
        };
        (e.ɵfac = function (i) {
            return new (i || e)(S(Re));
        }),
            (e.ɵcmp = N({
                type: e,
                selectors: [['app-text']],
                standalone: !0,
                features: [Jt([st]), P],
                decls: 6,
                vars: 12,
                consts: [
                    ['class', 'content', 4, 'ngIf'],
                    [4, 'ngIf'],
                    [1, 'content'],
                ],
                template: function (i, s) {
                    if (
                        (i & 1 &&
                            (z(0, eu, 1, 0, 'app-intro', 0),
                            ie(1, 'async'),
                            z(2, tu, 1, 0, 'app-text-for-typing', 0),
                            ie(3, 'async'),
                            z(4, nu, 1, 0, 'app-result', 1),
                            ie(5, 'async')),
                        i & 2)
                    ) {
                        let o, a, l;
                        M(
                            'ngIf',
                            (o = re(1, 3, s.addInitComponentData(en(9, iu)))) ==
                                null
                                ? null
                                : o['app-intro'],
                        ),
                            D(2),
                            M(
                                'ngIf',
                                (a = re(
                                    3,
                                    5,
                                    s.addInitComponentData(en(10, ru)),
                                )) == null
                                    ? null
                                    : a['app-text-for-typing'],
                            ),
                            D(2),
                            M(
                                'ngIf',
                                (l = re(
                                    5,
                                    7,
                                    s.addInitComponentData(en(11, su)),
                                )) == null
                                    ? null
                                    : l['app-result'],
                            );
                    }
                },
                dependencies: [H, He, Ge, Mo, Oo, ko],
                styles: [
                    '[_nghost-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center;width:100%;height:100%}.content[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center;flex-grow:1;font-size:2em}',
                ],
                changeDetection: 0,
            }));
        let t = e;
        return t;
    })();
var Po = (() => {
    let e = class e {
        constructor(n) {
            this.sourceTextsUrl = n;
        }
    };
    (e.ɵfac = function (i) {
        return new (i || e)(S(no));
    }),
        (e.ɵcmp = N({
            type: e,
            selectors: [['app-root']],
            standalone: !0,
            features: [P],
            decls: 8,
            vars: 1,
            consts: [
                [1, 'header'],
                [1, 'gear'],
                [1, 'main'],
                [1, 'footer'],
                [3, 'href'],
            ],
            template: function (i, s) {
                i & 1 &&
                    (I(0, 'header', 0),
                    F(1, 'app-gear', 1),
                    C(),
                    I(2, 'main', 2),
                    F(3, 'app-text'),
                    C(),
                    I(4, 'footer', 3)(5, 'div')(6, 'a', 4),
                    j(
                        7,
                        '\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A \u0442\u0435\u043A\u0441\u0442\u043E\u0432',
                    ),
                    C()()()),
                    i & 2 && (D(6), M('href', s.sourceTextsUrl, Cr));
            },
            dependencies: [H, to, No, Pn],
            styles: [
                '[_nghost-%COMP%]{display:flex;flex-direction:column;height:100vh;width:100vw;background-color:#f0f8ff}.header[_ngcontent-%COMP%]{display:flex;flex-direction:row-reverse}.main[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center;flex-grow:1}.footer[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center}.gear[_ngcontent-%COMP%]{padding:10px}',
            ],
            changeDetection: 0,
        }));
    let t = e;
    return t;
})();
ps(Po, eo).catch((t) => console.error(t));
