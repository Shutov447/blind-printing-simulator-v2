var wl = Object.defineProperty,
    Il = Object.defineProperties;
var El = Object.getOwnPropertyDescriptors;
var Zt = Object.getOwnPropertySymbols;
var Xi = Object.prototype.hasOwnProperty,
    es = Object.prototype.propertyIsEnumerable;
var Ji = (e, t, n) =>
        t in e
            ? wl(e, t, {
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                  value: n,
              })
            : (e[t] = n),
    It = (e, t) => {
        for (var n in (t ||= {})) Xi.call(t, n) && Ji(e, n, t[n]);
        if (Zt) for (var n of Zt(t)) es.call(t, n) && Ji(e, n, t[n]);
        return e;
    },
    Et = (e, t) => Il(e, El(t));
var by = (e, t) => {
    var n = {};
    for (var r in e) Xi.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
    if (e != null && Zt)
        for (var r of Zt(e)) t.indexOf(r) < 0 && es.call(e, r) && (n[r] = e[r]);
    return n;
};
var ts = null;
var Cr = 1,
    ns = Symbol('SIGNAL');
function j(e) {
    let t = ts;
    return (ts = e), t;
}
var rs = {
    version: 0,
    lastCleanEpoch: 0,
    dirty: !1,
    producerNode: void 0,
    producerLastReadVersion: void 0,
    producerIndexOfThis: void 0,
    nextProducerIndex: 0,
    liveConsumerNode: void 0,
    liveConsumerIndexOfThis: void 0,
    consumerAllowSignalWrites: !1,
    consumerIsAlwaysLive: !1,
    producerMustRecompute: () => !1,
    producerRecomputeValue: () => {},
    consumerMarkedDirty: () => {},
    consumerOnSignalRead: () => {},
};
function Cl(e) {
    if (!(_r(e) && !e.dirty) && !(!e.dirty && e.lastCleanEpoch === Cr)) {
        if (!e.producerMustRecompute(e) && !br(e)) {
            (e.dirty = !1), (e.lastCleanEpoch = Cr);
            return;
        }
        e.producerRecomputeValue(e), (e.dirty = !1), (e.lastCleanEpoch = Cr);
    }
}
function os(e) {
    return e && (e.nextProducerIndex = 0), j(e);
}
function is(e, t) {
    if (
        (j(t),
        !(
            !e ||
            e.producerNode === void 0 ||
            e.producerIndexOfThis === void 0 ||
            e.producerLastReadVersion === void 0
        ))
    ) {
        if (_r(e))
            for (let n = e.nextProducerIndex; n < e.producerNode.length; n++)
                Mr(e.producerNode[n], e.producerIndexOfThis[n]);
        for (; e.producerNode.length > e.nextProducerIndex; )
            e.producerNode.pop(),
                e.producerLastReadVersion.pop(),
                e.producerIndexOfThis.pop();
    }
}
function br(e) {
    Kt(e);
    for (let t = 0; t < e.producerNode.length; t++) {
        let n = e.producerNode[t],
            r = e.producerLastReadVersion[t];
        if (r !== n.version || (Cl(n), r !== n.version)) return !0;
    }
    return !1;
}
function ss(e) {
    if ((Kt(e), _r(e)))
        for (let t = 0; t < e.producerNode.length; t++)
            Mr(e.producerNode[t], e.producerIndexOfThis[t]);
    (e.producerNode.length =
        e.producerLastReadVersion.length =
        e.producerIndexOfThis.length =
            0),
        e.liveConsumerNode &&
            (e.liveConsumerNode.length = e.liveConsumerIndexOfThis.length = 0);
}
function Mr(e, t) {
    if ((bl(e), Kt(e), e.liveConsumerNode.length === 1))
        for (let r = 0; r < e.producerNode.length; r++)
            Mr(e.producerNode[r], e.producerIndexOfThis[r]);
    let n = e.liveConsumerNode.length - 1;
    if (
        ((e.liveConsumerNode[t] = e.liveConsumerNode[n]),
        (e.liveConsumerIndexOfThis[t] = e.liveConsumerIndexOfThis[n]),
        e.liveConsumerNode.length--,
        e.liveConsumerIndexOfThis.length--,
        t < e.liveConsumerNode.length)
    ) {
        let r = e.liveConsumerIndexOfThis[t],
            o = e.liveConsumerNode[t];
        Kt(o), (o.producerIndexOfThis[r] = t);
    }
}
function _r(e) {
    return e.consumerIsAlwaysLive || (e?.liveConsumerNode?.length ?? 0) > 0;
}
function Kt(e) {
    (e.producerNode ??= []),
        (e.producerIndexOfThis ??= []),
        (e.producerLastReadVersion ??= []);
}
function bl(e) {
    (e.liveConsumerNode ??= []), (e.liveConsumerIndexOfThis ??= []);
}
function Ml() {
    throw new Error();
}
var _l = Ml;
function as(e) {
    _l = e;
}
function m(e) {
    return typeof e == 'function';
}
function Je(e) {
    let n = e((r) => {
        Error.call(r), (r.stack = new Error().stack);
    });
    return (
        (n.prototype = Object.create(Error.prototype)),
        (n.prototype.constructor = n),
        n
    );
}
var Jt = Je(
    (e) =>
        function (n) {
            e(this),
                (this.message = n
                    ? `${n.length} errors occurred during unsubscription:
${n.map((r, o) => `${o + 1}) ${r.toString()}`).join(`
  `)}`
                    : ''),
                (this.name = 'UnsubscriptionError'),
                (this.errors = n);
        },
);
function Te(e, t) {
    if (e) {
        let n = e.indexOf(t);
        0 <= n && e.splice(n, 1);
    }
}
var O = class e {
    constructor(t) {
        (this.initialTeardown = t),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
    }
    unsubscribe() {
        let t;
        if (!this.closed) {
            this.closed = !0;
            let { _parentage: n } = this;
            if (n)
                if (((this._parentage = null), Array.isArray(n)))
                    for (let i of n) i.remove(this);
                else n.remove(this);
            let { initialTeardown: r } = this;
            if (m(r))
                try {
                    r();
                } catch (i) {
                    t = i instanceof Jt ? i.errors : [i];
                }
            let { _finalizers: o } = this;
            if (o) {
                this._finalizers = null;
                for (let i of o)
                    try {
                        us(i);
                    } catch (s) {
                        (t = t ?? []),
                            s instanceof Jt
                                ? (t = [...t, ...s.errors])
                                : t.push(s);
                    }
            }
            if (t) throw new Jt(t);
        }
    }
    add(t) {
        var n;
        if (t && t !== this)
            if (this.closed) us(t);
            else {
                if (t instanceof e) {
                    if (t.closed || t._hasParent(this)) return;
                    t._addParent(this);
                }
                (this._finalizers =
                    (n = this._finalizers) !== null && n !== void 0
                        ? n
                        : []).push(t);
            }
    }
    _hasParent(t) {
        let { _parentage: n } = this;
        return n === t || (Array.isArray(n) && n.includes(t));
    }
    _addParent(t) {
        let { _parentage: n } = this;
        this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
    }
    _removeParent(t) {
        let { _parentage: n } = this;
        n === t ? (this._parentage = null) : Array.isArray(n) && Te(n, t);
    }
    remove(t) {
        let { _finalizers: n } = this;
        n && Te(n, t), t instanceof e && t._removeParent(this);
    }
};
O.EMPTY = (() => {
    let e = new O();
    return (e.closed = !0), e;
})();
var xr = O.EMPTY;
function Xt(e) {
    return (
        e instanceof O ||
        (e && 'closed' in e && m(e.remove) && m(e.add) && m(e.unsubscribe))
    );
}
function us(e) {
    m(e) ? e() : e.unsubscribe();
}
var ne = {
    onUnhandledError: null,
    onStoppedNotification: null,
    Promise: void 0,
    useDeprecatedSynchronousErrorHandling: !1,
    useDeprecatedNextContext: !1,
};
var Xe = {
    setTimeout(e, t, ...n) {
        let { delegate: r } = Xe;
        return r?.setTimeout
            ? r.setTimeout(e, t, ...n)
            : setTimeout(e, t, ...n);
    },
    clearTimeout(e) {
        let { delegate: t } = Xe;
        return (t?.clearTimeout || clearTimeout)(e);
    },
    delegate: void 0,
};
function en(e) {
    Xe.setTimeout(() => {
        let { onUnhandledError: t } = ne;
        if (t) t(e);
        else throw e;
    });
}
function Ct() {}
var cs = Tr('C', void 0, void 0);
function ls(e) {
    return Tr('E', void 0, e);
}
function ds(e) {
    return Tr('N', e, void 0);
}
function Tr(e, t, n) {
    return { kind: e, value: t, error: n };
}
var Se = null;
function et(e) {
    if (ne.useDeprecatedSynchronousErrorHandling) {
        let t = !Se;
        if ((t && (Se = { errorThrown: !1, error: null }), e(), t)) {
            let { errorThrown: n, error: r } = Se;
            if (((Se = null), n)) throw r;
        }
    } else e();
}
function fs(e) {
    ne.useDeprecatedSynchronousErrorHandling &&
        Se &&
        ((Se.errorThrown = !0), (Se.error = e));
}
var Ae = class extends O {
        constructor(t) {
            super(),
                (this.isStopped = !1),
                t
                    ? ((this.destination = t), Xt(t) && t.add(this))
                    : (this.destination = Sl);
        }
        static create(t, n, r) {
            return new tt(t, n, r);
        }
        next(t) {
            this.isStopped ? Ar(ds(t), this) : this._next(t);
        }
        error(t) {
            this.isStopped
                ? Ar(ls(t), this)
                : ((this.isStopped = !0), this._error(t));
        }
        complete() {
            this.isStopped
                ? Ar(cs, this)
                : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
            this.closed ||
                ((this.isStopped = !0),
                super.unsubscribe(),
                (this.destination = null));
        }
        _next(t) {
            this.destination.next(t);
        }
        _error(t) {
            try {
                this.destination.error(t);
            } finally {
                this.unsubscribe();
            }
        }
        _complete() {
            try {
                this.destination.complete();
            } finally {
                this.unsubscribe();
            }
        }
    },
    xl = Function.prototype.bind;
function Sr(e, t) {
    return xl.call(e, t);
}
var Nr = class {
        constructor(t) {
            this.partialObserver = t;
        }
        next(t) {
            let { partialObserver: n } = this;
            if (n.next)
                try {
                    n.next(t);
                } catch (r) {
                    tn(r);
                }
        }
        error(t) {
            let { partialObserver: n } = this;
            if (n.error)
                try {
                    n.error(t);
                } catch (r) {
                    tn(r);
                }
            else tn(t);
        }
        complete() {
            let { partialObserver: t } = this;
            if (t.complete)
                try {
                    t.complete();
                } catch (n) {
                    tn(n);
                }
        }
    },
    tt = class extends Ae {
        constructor(t, n, r) {
            super();
            let o;
            if (m(t) || !t)
                o = {
                    next: t ?? void 0,
                    error: n ?? void 0,
                    complete: r ?? void 0,
                };
            else {
                let i;
                this && ne.useDeprecatedNextContext
                    ? ((i = Object.create(t)),
                      (i.unsubscribe = () => this.unsubscribe()),
                      (o = {
                          next: t.next && Sr(t.next, i),
                          error: t.error && Sr(t.error, i),
                          complete: t.complete && Sr(t.complete, i),
                      }))
                    : (o = t);
            }
            this.destination = new Nr(o);
        }
    };
function tn(e) {
    ne.useDeprecatedSynchronousErrorHandling ? fs(e) : en(e);
}
function Tl(e) {
    throw e;
}
function Ar(e, t) {
    let { onStoppedNotification: n } = ne;
    n && Xe.setTimeout(() => n(e, t));
}
var Sl = { closed: !0, next: Ct, error: Tl, complete: Ct };
var nt = (typeof Symbol == 'function' && Symbol.observable) || '@@observable';
function W(e) {
    return e;
}
function Al(...e) {
    return Or(e);
}
function Or(e) {
    return e.length === 0
        ? W
        : e.length === 1
          ? e[0]
          : function (n) {
                return e.reduce((r, o) => o(r), n);
            };
}
var b = (() => {
    class e {
        constructor(n) {
            n && (this._subscribe = n);
        }
        lift(n) {
            let r = new e();
            return (r.source = this), (r.operator = n), r;
        }
        subscribe(n, r, o) {
            let i = Ol(n) ? n : new tt(n, r, o);
            return (
                et(() => {
                    let { operator: s, source: a } = this;
                    i.add(
                        s
                            ? s.call(i, a)
                            : a
                              ? this._subscribe(i)
                              : this._trySubscribe(i),
                    );
                }),
                i
            );
        }
        _trySubscribe(n) {
            try {
                return this._subscribe(n);
            } catch (r) {
                n.error(r);
            }
        }
        forEach(n, r) {
            return (
                (r = ps(r)),
                new r((o, i) => {
                    let s = new tt({
                        next: (a) => {
                            try {
                                n(a);
                            } catch (u) {
                                i(u), s.unsubscribe();
                            }
                        },
                        error: i,
                        complete: o,
                    });
                    this.subscribe(s);
                })
            );
        }
        _subscribe(n) {
            var r;
            return (r = this.source) === null || r === void 0
                ? void 0
                : r.subscribe(n);
        }
        [nt]() {
            return this;
        }
        pipe(...n) {
            return Or(n)(this);
        }
        toPromise(n) {
            return (
                (n = ps(n)),
                new n((r, o) => {
                    let i;
                    this.subscribe(
                        (s) => (i = s),
                        (s) => o(s),
                        () => r(i),
                    );
                })
            );
        }
    }
    return (e.create = (t) => new e(t)), e;
})();
function ps(e) {
    var t;
    return (t = e ?? ne.Promise) !== null && t !== void 0 ? t : Promise;
}
function Nl(e) {
    return e && m(e.next) && m(e.error) && m(e.complete);
}
function Ol(e) {
    return (e && e instanceof Ae) || (Nl(e) && Xt(e));
}
function Fr(e) {
    return m(e?.lift);
}
function v(e) {
    return (t) => {
        if (Fr(t))
            return t.lift(function (n) {
                try {
                    return e(n, this);
                } catch (r) {
                    this.error(r);
                }
            });
        throw new TypeError('Unable to lift unknown Observable type');
    };
}
function w(e, t, n, r, o) {
    return new Rr(e, t, n, r, o);
}
var Rr = class extends Ae {
    constructor(t, n, r, o, i, s) {
        super(t),
            (this.onFinalize = i),
            (this.shouldUnsubscribe = s),
            (this._next = n
                ? function (a) {
                      try {
                          n(a);
                      } catch (u) {
                          t.error(u);
                      }
                  }
                : super._next),
            (this._error = o
                ? function (a) {
                      try {
                          o(a);
                      } catch (u) {
                          t.error(u);
                      } finally {
                          this.unsubscribe();
                      }
                  }
                : super._error),
            (this._complete = r
                ? function () {
                      try {
                          r();
                      } catch (a) {
                          t.error(a);
                      } finally {
                          this.unsubscribe();
                      }
                  }
                : super._complete);
    }
    unsubscribe() {
        var t;
        if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            let { closed: n } = this;
            super.unsubscribe(),
                !n &&
                    ((t = this.onFinalize) === null ||
                        t === void 0 ||
                        t.call(this));
        }
    }
};
function Pr() {
    return v((e, t) => {
        let n = null;
        e._refCount++;
        let r = w(t, void 0, void 0, void 0, () => {
            if (!e || e._refCount <= 0 || 0 < --e._refCount) {
                n = null;
                return;
            }
            let o = e._connection,
                i = n;
            (n = null),
                o && (!i || o === i) && o.unsubscribe(),
                t.unsubscribe();
        });
        e.subscribe(r), r.closed || (n = e.connect());
    });
}
var kr = class extends b {
    constructor(t, n) {
        super(),
            (this.source = t),
            (this.subjectFactory = n),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            Fr(t) && (this.lift = t.lift);
    }
    _subscribe(t) {
        return this.getSubject().subscribe(t);
    }
    getSubject() {
        let t = this._subject;
        return (
            (!t || t.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
        );
    }
    _teardown() {
        this._refCount = 0;
        let { _connection: t } = this;
        (this._subject = this._connection = null), t?.unsubscribe();
    }
    connect() {
        let t = this._connection;
        if (!t) {
            t = this._connection = new O();
            let n = this.getSubject();
            t.add(
                this.source.subscribe(
                    w(
                        n,
                        void 0,
                        () => {
                            this._teardown(), n.complete();
                        },
                        (r) => {
                            this._teardown(), n.error(r);
                        },
                        () => this._teardown(),
                    ),
                ),
            ),
                t.closed && ((this._connection = null), (t = O.EMPTY));
        }
        return t;
    }
    refCount() {
        return Pr()(this);
    }
};
var hs = Je(
    (e) =>
        function () {
            e(this),
                (this.name = 'ObjectUnsubscribedError'),
                (this.message = 'object unsubscribed');
        },
);
var rt = (() => {
        class e extends b {
            constructor() {
                super(),
                    (this.closed = !1),
                    (this.currentObservers = null),
                    (this.observers = []),
                    (this.isStopped = !1),
                    (this.hasError = !1),
                    (this.thrownError = null);
            }
            lift(n) {
                let r = new nn(this, this);
                return (r.operator = n), r;
            }
            _throwIfClosed() {
                if (this.closed) throw new hs();
            }
            next(n) {
                et(() => {
                    if ((this._throwIfClosed(), !this.isStopped)) {
                        this.currentObservers ||
                            (this.currentObservers = Array.from(
                                this.observers,
                            ));
                        for (let r of this.currentObservers) r.next(n);
                    }
                });
            }
            error(n) {
                et(() => {
                    if ((this._throwIfClosed(), !this.isStopped)) {
                        (this.hasError = this.isStopped = !0),
                            (this.thrownError = n);
                        let { observers: r } = this;
                        for (; r.length; ) r.shift().error(n);
                    }
                });
            }
            complete() {
                et(() => {
                    if ((this._throwIfClosed(), !this.isStopped)) {
                        this.isStopped = !0;
                        let { observers: n } = this;
                        for (; n.length; ) n.shift().complete();
                    }
                });
            }
            unsubscribe() {
                (this.isStopped = this.closed = !0),
                    (this.observers = this.currentObservers = null);
            }
            get observed() {
                var n;
                return (
                    ((n = this.observers) === null || n === void 0
                        ? void 0
                        : n.length) > 0
                );
            }
            _trySubscribe(n) {
                return this._throwIfClosed(), super._trySubscribe(n);
            }
            _subscribe(n) {
                return (
                    this._throwIfClosed(),
                    this._checkFinalizedStatuses(n),
                    this._innerSubscribe(n)
                );
            }
            _innerSubscribe(n) {
                let { hasError: r, isStopped: o, observers: i } = this;
                return r || o
                    ? xr
                    : ((this.currentObservers = null),
                      i.push(n),
                      new O(() => {
                          (this.currentObservers = null), Te(i, n);
                      }));
            }
            _checkFinalizedStatuses(n) {
                let { hasError: r, thrownError: o, isStopped: i } = this;
                r ? n.error(o) : i && n.complete();
            }
            asObservable() {
                let n = new b();
                return (n.source = this), n;
            }
        }
        return (e.create = (t, n) => new nn(t, n)), e;
    })(),
    nn = class extends rt {
        constructor(t, n) {
            super(), (this.destination = t), (this.source = n);
        }
        next(t) {
            var n, r;
            (r =
                (n = this.destination) === null || n === void 0
                    ? void 0
                    : n.next) === null ||
                r === void 0 ||
                r.call(n, t);
        }
        error(t) {
            var n, r;
            (r =
                (n = this.destination) === null || n === void 0
                    ? void 0
                    : n.error) === null ||
                r === void 0 ||
                r.call(n, t);
        }
        complete() {
            var t, n;
            (n =
                (t = this.destination) === null || t === void 0
                    ? void 0
                    : t.complete) === null ||
                n === void 0 ||
                n.call(t);
        }
        _subscribe(t) {
            var n, r;
            return (r =
                (n = this.source) === null || n === void 0
                    ? void 0
                    : n.subscribe(t)) !== null && r !== void 0
                ? r
                : xr;
        }
    };
var bt = class extends rt {
    constructor(t) {
        super(), (this._value = t);
    }
    get value() {
        return this.getValue();
    }
    _subscribe(t) {
        let n = super._subscribe(t);
        return !n.closed && t.next(this._value), n;
    }
    getValue() {
        let { hasError: t, thrownError: n, _value: r } = this;
        if (t) throw n;
        return this._throwIfClosed(), r;
    }
    next(t) {
        super.next((this._value = t));
    }
};
var Lr = {
    now() {
        return (Lr.delegate || Date).now();
    },
    delegate: void 0,
};
var rn = class extends O {
    constructor(t, n) {
        super();
    }
    schedule(t, n = 0) {
        return this;
    }
};
var Mt = {
    setInterval(e, t, ...n) {
        let { delegate: r } = Mt;
        return r?.setInterval
            ? r.setInterval(e, t, ...n)
            : setInterval(e, t, ...n);
    },
    clearInterval(e) {
        let { delegate: t } = Mt;
        return (t?.clearInterval || clearInterval)(e);
    },
    delegate: void 0,
};
var on = class extends rn {
    constructor(t, n) {
        super(t, n), (this.scheduler = t), (this.work = n), (this.pending = !1);
    }
    schedule(t, n = 0) {
        var r;
        if (this.closed) return this;
        this.state = t;
        let o = this.id,
            i = this.scheduler;
        return (
            o != null && (this.id = this.recycleAsyncId(i, o, n)),
            (this.pending = !0),
            (this.delay = n),
            (this.id =
                (r = this.id) !== null && r !== void 0
                    ? r
                    : this.requestAsyncId(i, this.id, n)),
            this
        );
    }
    requestAsyncId(t, n, r = 0) {
        return Mt.setInterval(t.flush.bind(t, this), r);
    }
    recycleAsyncId(t, n, r = 0) {
        if (r != null && this.delay === r && this.pending === !1) return n;
        n != null && Mt.clearInterval(n);
    }
    execute(t, n) {
        if (this.closed) return new Error('executing a cancelled action');
        this.pending = !1;
        let r = this._execute(t, n);
        if (r) return r;
        this.pending === !1 &&
            this.id != null &&
            (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
    }
    _execute(t, n) {
        let r = !1,
            o;
        try {
            this.work(t);
        } catch (i) {
            (r = !0),
                (o = i || new Error('Scheduled action threw falsy error'));
        }
        if (r) return this.unsubscribe(), o;
    }
    unsubscribe() {
        if (!this.closed) {
            let { id: t, scheduler: n } = this,
                { actions: r } = n;
            (this.work = this.state = this.scheduler = null),
                (this.pending = !1),
                Te(r, this),
                t != null && (this.id = this.recycleAsyncId(n, t, null)),
                (this.delay = null),
                super.unsubscribe();
        }
    }
};
var ot = class e {
    constructor(t, n = e.now) {
        (this.schedulerActionCtor = t), (this.now = n);
    }
    schedule(t, n = 0, r) {
        return new this.schedulerActionCtor(this, t).schedule(r, n);
    }
};
ot.now = Lr.now;
var sn = class extends ot {
    constructor(t, n = ot.now) {
        super(t, n), (this.actions = []), (this._active = !1);
    }
    flush(t) {
        let { actions: n } = this;
        if (this._active) {
            n.push(t);
            return;
        }
        let r;
        this._active = !0;
        do if ((r = t.execute(t.state, t.delay))) break;
        while ((t = n.shift()));
        if (((this._active = !1), r)) {
            for (; (t = n.shift()); ) t.unsubscribe();
            throw r;
        }
    }
};
var gs = new sn(on);
var _t = new b((e) => e.complete());
function ms(e) {
    return e && m(e.schedule);
}
function ys(e) {
    return e[e.length - 1];
}
function Ds(e) {
    return m(ys(e)) ? e.pop() : void 0;
}
function we(e) {
    return ms(ys(e)) ? e.pop() : void 0;
}
function ws(e, t, n, r) {
    function o(i) {
        return i instanceof n
            ? i
            : new n(function (s) {
                  s(i);
              });
    }
    return new (n || (n = Promise))(function (i, s) {
        function a(l) {
            try {
                c(r.next(l));
            } catch (d) {
                s(d);
            }
        }
        function u(l) {
            try {
                c(r.throw(l));
            } catch (d) {
                s(d);
            }
        }
        function c(l) {
            l.done ? i(l.value) : o(l.value).then(a, u);
        }
        c((r = r.apply(e, t || [])).next());
    });
}
function vs(e) {
    var t = typeof Symbol == 'function' && Symbol.iterator,
        n = t && e[t],
        r = 0;
    if (n) return n.call(e);
    if (e && typeof e.length == 'number')
        return {
            next: function () {
                return (
                    e && r >= e.length && (e = void 0),
                    { value: e && e[r++], done: !e }
                );
            },
        };
    throw new TypeError(
        t ? 'Object is not iterable.' : 'Symbol.iterator is not defined.',
    );
}
function Ne(e) {
    return this instanceof Ne ? ((this.v = e), this) : new Ne(e);
}
function Is(e, t, n) {
    if (!Symbol.asyncIterator)
        throw new TypeError('Symbol.asyncIterator is not defined.');
    var r = n.apply(e, t || []),
        o,
        i = [];
    return (
        (o = {}),
        s('next'),
        s('throw'),
        s('return'),
        (o[Symbol.asyncIterator] = function () {
            return this;
        }),
        o
    );
    function s(f) {
        r[f] &&
            (o[f] = function (p) {
                return new Promise(function (h, E) {
                    i.push([f, p, h, E]) > 1 || a(f, p);
                });
            });
    }
    function a(f, p) {
        try {
            u(r[f](p));
        } catch (h) {
            d(i[0][3], h);
        }
    }
    function u(f) {
        f.value instanceof Ne
            ? Promise.resolve(f.value.v).then(c, l)
            : d(i[0][2], f);
    }
    function c(f) {
        a('next', f);
    }
    function l(f) {
        a('throw', f);
    }
    function d(f, p) {
        f(p), i.shift(), i.length && a(i[0][0], i[0][1]);
    }
}
function Es(e) {
    if (!Symbol.asyncIterator)
        throw new TypeError('Symbol.asyncIterator is not defined.');
    var t = e[Symbol.asyncIterator],
        n;
    return t
        ? t.call(e)
        : ((e = typeof vs == 'function' ? vs(e) : e[Symbol.iterator]()),
          (n = {}),
          r('next'),
          r('throw'),
          r('return'),
          (n[Symbol.asyncIterator] = function () {
              return this;
          }),
          n);
    function r(i) {
        n[i] =
            e[i] &&
            function (s) {
                return new Promise(function (a, u) {
                    (s = e[i](s)), o(a, u, s.done, s.value);
                });
            };
    }
    function o(i, s, a, u) {
        Promise.resolve(u).then(function (c) {
            i({ value: c, done: a });
        }, s);
    }
}
var an = (e) => e && typeof e.length == 'number' && typeof e != 'function';
function un(e) {
    return m(e?.then);
}
function cn(e) {
    return m(e[nt]);
}
function ln(e) {
    return Symbol.asyncIterator && m(e?.[Symbol.asyncIterator]);
}
function dn(e) {
    return new TypeError(
        `You provided ${e !== null && typeof e == 'object' ? 'an invalid object' : `'${e}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`,
    );
}
function Fl() {
    return typeof Symbol != 'function' || !Symbol.iterator
        ? '@@iterator'
        : Symbol.iterator;
}
var fn = Fl();
function pn(e) {
    return m(e?.[fn]);
}
function hn(e) {
    return Is(this, arguments, function* () {
        let n = e.getReader();
        try {
            for (;;) {
                let { value: r, done: o } = yield Ne(n.read());
                if (o) return yield Ne(void 0);
                yield yield Ne(r);
            }
        } finally {
            n.releaseLock();
        }
    });
}
function gn(e) {
    return m(e?.getReader);
}
function F(e) {
    if (e instanceof b) return e;
    if (e != null) {
        if (cn(e)) return Rl(e);
        if (an(e)) return Pl(e);
        if (un(e)) return kl(e);
        if (ln(e)) return Cs(e);
        if (pn(e)) return Ll(e);
        if (gn(e)) return jl(e);
    }
    throw dn(e);
}
function Rl(e) {
    return new b((t) => {
        let n = e[nt]();
        if (m(n.subscribe)) return n.subscribe(t);
        throw new TypeError(
            'Provided object does not correctly implement Symbol.observable',
        );
    });
}
function Pl(e) {
    return new b((t) => {
        for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
        t.complete();
    });
}
function kl(e) {
    return new b((t) => {
        e.then(
            (n) => {
                t.closed || (t.next(n), t.complete());
            },
            (n) => t.error(n),
        ).then(null, en);
    });
}
function Ll(e) {
    return new b((t) => {
        for (let n of e) if ((t.next(n), t.closed)) return;
        t.complete();
    });
}
function Cs(e) {
    return new b((t) => {
        Vl(e, t).catch((n) => t.error(n));
    });
}
function jl(e) {
    return Cs(hn(e));
}
function Vl(e, t) {
    var n, r, o, i;
    return ws(this, void 0, void 0, function* () {
        try {
            for (n = Es(e); (r = yield n.next()), !r.done; ) {
                let s = r.value;
                if ((t.next(s), t.closed)) return;
            }
        } catch (s) {
            o = { error: s };
        } finally {
            try {
                r && !r.done && (i = n.return) && (yield i.call(n));
            } finally {
                if (o) throw o.error;
            }
        }
        t.complete();
    });
}
function $(e, t, n, r = 0, o = !1) {
    let i = t.schedule(function () {
        n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe();
    }, r);
    if ((e.add(i), !o)) return i;
}
function mn(e, t = 0) {
    return v((n, r) => {
        n.subscribe(
            w(
                r,
                (o) => $(r, e, () => r.next(o), t),
                () => $(r, e, () => r.complete(), t),
                (o) => $(r, e, () => r.error(o), t),
            ),
        );
    });
}
function yn(e, t = 0) {
    return v((n, r) => {
        r.add(e.schedule(() => n.subscribe(r), t));
    });
}
function bs(e, t) {
    return F(e).pipe(yn(t), mn(t));
}
function Ms(e, t) {
    return F(e).pipe(yn(t), mn(t));
}
function _s(e, t) {
    return new b((n) => {
        let r = 0;
        return t.schedule(function () {
            r === e.length
                ? n.complete()
                : (n.next(e[r++]), n.closed || this.schedule());
        });
    });
}
function xs(e, t) {
    return new b((n) => {
        let r;
        return (
            $(n, t, () => {
                (r = e[fn]()),
                    $(
                        n,
                        t,
                        () => {
                            let o, i;
                            try {
                                ({ value: o, done: i } = r.next());
                            } catch (s) {
                                n.error(s);
                                return;
                            }
                            i ? n.complete() : n.next(o);
                        },
                        0,
                        !0,
                    );
            }),
            () => m(r?.return) && r.return()
        );
    });
}
function Dn(e, t) {
    if (!e) throw new Error('Iterable cannot be null');
    return new b((n) => {
        $(n, t, () => {
            let r = e[Symbol.asyncIterator]();
            $(
                n,
                t,
                () => {
                    r.next().then((o) => {
                        o.done ? n.complete() : n.next(o.value);
                    });
                },
                0,
                !0,
            );
        });
    });
}
function Ts(e, t) {
    return Dn(hn(e), t);
}
function Ss(e, t) {
    if (e != null) {
        if (cn(e)) return bs(e, t);
        if (an(e)) return _s(e, t);
        if (un(e)) return Ms(e, t);
        if (ln(e)) return Dn(e, t);
        if (pn(e)) return xs(e, t);
        if (gn(e)) return Ts(e, t);
    }
    throw dn(e);
}
function Ie(e, t) {
    return t ? Ss(e, t) : F(e);
}
function Bl(...e) {
    let t = we(e);
    return Ie(e, t);
}
function $l(e, t) {
    let n = m(e) ? e : () => e,
        r = (o) => o.error(n());
    return new b(t ? (o) => t.schedule(r, 0, o) : r);
}
function Hl(e) {
    return !!e && (e instanceof b || (m(e.lift) && m(e.subscribe)));
}
var Oe = Je(
    (e) =>
        function () {
            e(this),
                (this.name = 'EmptyError'),
                (this.message = 'no elements in sequence');
        },
);
function ge(e, t) {
    return v((n, r) => {
        let o = 0;
        n.subscribe(
            w(r, (i) => {
                r.next(e.call(t, i, o++));
            }),
        );
    });
}
var { isArray: Ul } = Array;
function Gl(e, t) {
    return Ul(t) ? e(...t) : e(t);
}
function As(e) {
    return ge((t) => Gl(e, t));
}
var { isArray: zl } = Array,
    { getPrototypeOf: Wl, prototype: ql, keys: Ql } = Object;
function Ns(e) {
    if (e.length === 1) {
        let t = e[0];
        if (zl(t)) return { args: t, keys: null };
        if (Yl(t)) {
            let n = Ql(t);
            return { args: n.map((r) => t[r]), keys: n };
        }
    }
    return { args: e, keys: null };
}
function Yl(e) {
    return e && typeof e == 'object' && Wl(e) === ql;
}
function Os(e, t) {
    return e.reduce((n, r, o) => ((n[r] = t[o]), n), {});
}
function Zl(...e) {
    let t = we(e),
        n = Ds(e),
        { args: r, keys: o } = Ns(e);
    if (r.length === 0) return Ie([], t);
    let i = new b(Kl(r, t, o ? (s) => Os(o, s) : W));
    return n ? i.pipe(As(n)) : i;
}
function Kl(e, t, n = W) {
    return (r) => {
        Fs(
            t,
            () => {
                let { length: o } = e,
                    i = new Array(o),
                    s = o,
                    a = o;
                for (let u = 0; u < o; u++)
                    Fs(
                        t,
                        () => {
                            let c = Ie(e[u], t),
                                l = !1;
                            c.subscribe(
                                w(
                                    r,
                                    (d) => {
                                        (i[u] = d),
                                            l || ((l = !0), a--),
                                            a || r.next(n(i.slice()));
                                    },
                                    () => {
                                        --s || r.complete();
                                    },
                                ),
                            );
                        },
                        r,
                    );
            },
            r,
        );
    };
}
function Fs(e, t, n) {
    e ? $(n, e, t) : t();
}
function Rs(e, t, n, r, o, i, s, a) {
    let u = [],
        c = 0,
        l = 0,
        d = !1,
        f = () => {
            d && !u.length && !c && t.complete();
        },
        p = (E) => (c < r ? h(E) : u.push(E)),
        h = (E) => {
            i && t.next(E), c++;
            let P = !1;
            F(n(E, l++)).subscribe(
                w(
                    t,
                    (S) => {
                        o?.(S), i ? p(S) : t.next(S);
                    },
                    () => {
                        P = !0;
                    },
                    void 0,
                    () => {
                        if (P)
                            try {
                                for (c--; u.length && c < r; ) {
                                    let S = u.shift();
                                    s ? $(t, s, () => h(S)) : h(S);
                                }
                                f();
                            } catch (S) {
                                t.error(S);
                            }
                    },
                ),
            );
        };
    return (
        e.subscribe(
            w(t, p, () => {
                (d = !0), f();
            }),
        ),
        () => {
            a?.();
        }
    );
}
function Fe(e, t, n = 1 / 0) {
    return m(t)
        ? Fe((r, o) => ge((i, s) => t(r, i, o, s))(F(e(r, o))), n)
        : (typeof t == 'number' && (n = t), v((r, o) => Rs(r, o, e, n)));
}
function Ps(e = 1 / 0) {
    return Fe(W, e);
}
function ks() {
    return Ps(1);
}
function vn(...e) {
    return ks()(Ie(e, we(e)));
}
function Jl(e) {
    return new b((t) => {
        F(e()).subscribe(t);
    });
}
function Re(e, t) {
    return v((n, r) => {
        let o = 0;
        n.subscribe(w(r, (i) => e.call(t, i, o++) && r.next(i)));
    });
}
function Ls(e) {
    return v((t, n) => {
        let r = null,
            o = !1,
            i;
        (r = t.subscribe(
            w(n, void 0, void 0, (s) => {
                (i = F(e(s, Ls(e)(t)))),
                    r
                        ? (r.unsubscribe(), (r = null), i.subscribe(n))
                        : (o = !0);
            }),
        )),
            o && (r.unsubscribe(), (r = null), i.subscribe(n));
    });
}
function js(e, t, n, r, o) {
    return (i, s) => {
        let a = n,
            u = t,
            c = 0;
        i.subscribe(
            w(
                s,
                (l) => {
                    let d = c++;
                    (u = a ? e(u, l, d) : ((a = !0), l)), r && s.next(u);
                },
                o &&
                    (() => {
                        a && s.next(u), s.complete();
                    }),
            ),
        );
    };
}
function Xl(e, t) {
    return m(t) ? Fe(e, t, 1) : Fe(e, 1);
}
function ed(e, t = gs) {
    return v((n, r) => {
        let o = null,
            i = null,
            s = null,
            a = () => {
                if (o) {
                    o.unsubscribe(), (o = null);
                    let c = i;
                    (i = null), r.next(c);
                }
            };
        function u() {
            let c = s + e,
                l = t.now();
            if (l < c) {
                (o = this.schedule(void 0, c - l)), r.add(o);
                return;
            }
            a();
        }
        n.subscribe(
            w(
                r,
                (c) => {
                    (i = c),
                        (s = t.now()),
                        o || ((o = t.schedule(u, e)), r.add(o));
                },
                () => {
                    a(), r.complete();
                },
                void 0,
                () => {
                    i = o = null;
                },
            ),
        );
    });
}
function xt(e) {
    return v((t, n) => {
        let r = !1;
        t.subscribe(
            w(
                n,
                (o) => {
                    (r = !0), n.next(o);
                },
                () => {
                    r || n.next(e), n.complete();
                },
            ),
        );
    });
}
function jr(e) {
    return e <= 0
        ? () => _t
        : v((t, n) => {
              let r = 0;
              t.subscribe(
                  w(n, (o) => {
                      ++r <= e && (n.next(o), e <= r && n.complete());
                  }),
              );
          });
}
function td(e) {
    return ge(() => e);
}
function wn(e = nd) {
    return v((t, n) => {
        let r = !1;
        t.subscribe(
            w(
                n,
                (o) => {
                    (r = !0), n.next(o);
                },
                () => (r ? n.complete() : n.error(e())),
            ),
        );
    });
}
function nd() {
    return new Oe();
}
function rd(e) {
    return v((t, n) => {
        try {
            t.subscribe(n);
        } finally {
            n.add(e);
        }
    });
}
function Vr(e, t) {
    let n = arguments.length >= 2;
    return (r) =>
        r.pipe(
            e ? Re((o, i) => e(o, i, r)) : W,
            jr(1),
            n ? xt(t) : wn(() => new Oe()),
        );
}
function Br(e) {
    return e <= 0
        ? () => _t
        : v((t, n) => {
              let r = [];
              t.subscribe(
                  w(
                      n,
                      (o) => {
                          r.push(o), e < r.length && r.shift();
                      },
                      () => {
                          for (let o of r) n.next(o);
                          n.complete();
                      },
                      void 0,
                      () => {
                          r = null;
                      },
                  ),
              );
          });
}
function od(e, t) {
    let n = arguments.length >= 2;
    return (r) =>
        r.pipe(
            e ? Re((o, i) => e(o, i, r)) : W,
            Br(1),
            n ? xt(t) : wn(() => new Oe()),
        );
}
function id(e, t) {
    return v(js(e, t, arguments.length >= 2, !0));
}
function sd(e) {
    return Re((t, n) => e <= n);
}
function ad(...e) {
    let t = we(e);
    return v((n, r) => {
        (t ? vn(e, n, t) : vn(e, n)).subscribe(r);
    });
}
function ud(e, t) {
    return v((n, r) => {
        let o = null,
            i = 0,
            s = !1,
            a = () => s && !o && r.complete();
        n.subscribe(
            w(
                r,
                (u) => {
                    o?.unsubscribe();
                    let c = 0,
                        l = i++;
                    F(e(u, l)).subscribe(
                        (o = w(
                            r,
                            (d) => r.next(t ? t(u, d, l, c++) : d),
                            () => {
                                (o = null), a();
                            },
                        )),
                    );
                },
                () => {
                    (s = !0), a();
                },
            ),
        );
    });
}
function Vs(e) {
    return v((t, n) => {
        F(e).subscribe(w(n, () => n.complete(), Ct)),
            !n.closed && t.subscribe(n);
    });
}
function cd(e, t, n) {
    let r = m(e) || t || n ? { next: e, error: t, complete: n } : e;
    return r
        ? v((o, i) => {
              var s;
              (s = r.subscribe) === null || s === void 0 || s.call(r);
              let a = !0;
              o.subscribe(
                  w(
                      i,
                      (u) => {
                          var c;
                          (c = r.next) === null || c === void 0 || c.call(r, u),
                              i.next(u);
                      },
                      () => {
                          var u;
                          (a = !1),
                              (u = r.complete) === null ||
                                  u === void 0 ||
                                  u.call(r),
                              i.complete();
                      },
                      (u) => {
                          var c;
                          (a = !1),
                              (c = r.error) === null ||
                                  c === void 0 ||
                                  c.call(r, u),
                              i.error(u);
                      },
                      () => {
                          var u, c;
                          a &&
                              ((u = r.unsubscribe) === null ||
                                  u === void 0 ||
                                  u.call(r)),
                              (c = r.finalize) === null ||
                                  c === void 0 ||
                                  c.call(r);
                      },
                  ),
              );
          })
        : W;
}
var Ia = 'https://g.co/ng/security#xss',
    C = class extends Error {
        constructor(t, n) {
            super(Ea(t, n)), (this.code = t);
        }
    };
function Ea(e, t) {
    return `${`NG0${Math.abs(e)}`}${t ? ': ' + t : ''}`;
}
var io = class extends rt {
    constructor(t = !1) {
        super(), (this.__isAsync = t);
    }
    emit(t) {
        super.next(t);
    }
    subscribe(t, n, r) {
        let o = t,
            i = n || (() => null),
            s = r;
        if (t && typeof t == 'object') {
            let u = t;
            (o = u.next?.bind(u)),
                (i = u.error?.bind(u)),
                (s = u.complete?.bind(u));
        }
        this.__isAsync && ((i = $r(i)), o && (o = $r(o)), s && (s = $r(s)));
        let a = super.subscribe({ next: o, error: i, complete: s });
        return t instanceof O && t.add(a), a;
    }
};
function $r(e) {
    return (t) => {
        setTimeout(e, void 0, t);
    };
}
var Pe = io;
var I = (function (e) {
    return (
        (e[(e.Default = 0)] = 'Default'),
        (e[(e.Host = 1)] = 'Host'),
        (e[(e.Self = 2)] = 'Self'),
        (e[(e.SkipSelf = 4)] = 'SkipSelf'),
        (e[(e.Optional = 8)] = 'Optional'),
        e
    );
})(I || {});
function B(e) {
    if (typeof e == 'string') return e;
    if (Array.isArray(e)) return '[' + e.map(B).join(', ') + ']';
    if (e == null) return '' + e;
    if (e.overriddenName) return `${e.overriddenName}`;
    if (e.name) return `${e.name}`;
    let t = e.toString();
    if (t == null) return '' + t;
    let n = t.indexOf(`
`);
    return n === -1 ? t : t.substring(0, n);
}
function so(e, t) {
    return e == null || e === ''
        ? t === null
            ? ''
            : t
        : t == null || t === ''
          ? e
          : e + ' ' + t;
}
var Ca = (function (e) {
        return (
            (e[(e.OnPush = 0)] = 'OnPush'), (e[(e.Default = 1)] = 'Default'), e
        );
    })(Ca || {}),
    Nt = (function (e) {
        return (
            (e[(e.Emulated = 0)] = 'Emulated'),
            (e[(e.None = 2)] = 'None'),
            (e[(e.ShadowDom = 3)] = 'ShadowDom'),
            e
        );
    })(Nt || {});
function Ut(e) {
    return { toString: e }.toString();
}
var _n = globalThis;
var Ot = {},
    U = [];
function x(e) {
    for (let t in e) if (e[t] === x) return t;
    throw Error('Could not find renamed property on target object.');
}
var ld = x({ ɵcmp: x }),
    dd = x({ ɵdir: x }),
    fd = x({ ɵpipe: x }),
    pd = x({ ɵmod: x }),
    Fn = x({ ɵfac: x }),
    Tt = x({ __NG_ELEMENT_ID__: x }),
    Bs = x({ __NG_ENV_ID__: x }),
    Le = (function (e) {
        return (
            (e[(e.None = 0)] = 'None'),
            (e[(e.SignalBased = 1)] = 'SignalBased'),
            (e[(e.HasDecoratorInputTransform = 2)] =
                'HasDecoratorInputTransform'),
            e
        );
    })(Le || {});
function ba(e, t, n) {
    let r = e.length;
    for (;;) {
        let o = e.indexOf(t, n);
        if (o === -1) return o;
        if (o === 0 || e.charCodeAt(o - 1) <= 32) {
            let i = t.length;
            if (o + i === r || e.charCodeAt(o + i) <= 32) return o;
        }
        n = o + 1;
    }
}
function ao(e, t, n) {
    let r = 0;
    for (; r < n.length; ) {
        let o = n[r];
        if (typeof o == 'number') {
            if (o !== 0) break;
            r++;
            let i = n[r++],
                s = n[r++],
                a = n[r++];
            e.setAttribute(t, s, a, i);
        } else {
            let i = o,
                s = n[++r];
            gd(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), r++;
        }
    }
    return r;
}
function hd(e) {
    return e === 3 || e === 4 || e === 6;
}
function gd(e) {
    return e.charCodeAt(0) === 64;
}
function ni(e, t) {
    if (!(t === null || t.length === 0))
        if (e === null || e.length === 0) e = t.slice();
        else {
            let n = -1;
            for (let r = 0; r < t.length; r++) {
                let o = t[r];
                typeof o == 'number'
                    ? (n = o)
                    : n === 0 ||
                      (n === -1 || n === 2
                          ? $s(e, n, o, null, t[++r])
                          : $s(e, n, o, null, null));
            }
        }
    return e;
}
function $s(e, t, n, r, o) {
    let i = 0,
        s = e.length;
    if (t === -1) s = -1;
    else
        for (; i < e.length; ) {
            let a = e[i++];
            if (typeof a == 'number') {
                if (a === t) {
                    s = -1;
                    break;
                } else if (a > t) {
                    s = i - 1;
                    break;
                }
            }
        }
    for (; i < e.length; ) {
        let a = e[i];
        if (typeof a == 'number') break;
        if (a === n) {
            if (r === null) {
                o !== null && (e[i + 1] = o);
                return;
            } else if (r === e[i + 1]) {
                e[i + 2] = o;
                return;
            }
        }
        i++, r !== null && i++, o !== null && i++;
    }
    s !== -1 && (e.splice(s, 0, t), (i = s + 1)),
        e.splice(i++, 0, n),
        r !== null && e.splice(i++, 0, r),
        o !== null && e.splice(i++, 0, o);
}
var Ma = 'ng-template';
function md(e, t, n) {
    let r = 0,
        o = !0;
    for (; r < e.length; ) {
        let i = e[r++];
        if (typeof i == 'string' && o) {
            let s = e[r++];
            if (n && i === 'class' && ba(s.toLowerCase(), t, 0) !== -1)
                return !0;
        } else if (i === 1) {
            for (; r < e.length && typeof (i = e[r++]) == 'string'; )
                if (i.toLowerCase() === t) return !0;
            return !1;
        } else typeof i == 'number' && (o = !1);
    }
    return !1;
}
function _a(e) {
    return e.type === 4 && e.value !== Ma;
}
function yd(e, t, n) {
    let r = e.type === 4 && !n ? Ma : e.value;
    return t === r;
}
function Dd(e, t, n) {
    let r = 4,
        o = e.attrs || [],
        i = Id(o),
        s = !1;
    for (let a = 0; a < t.length; a++) {
        let u = t[a];
        if (typeof u == 'number') {
            if (!s && !re(r) && !re(u)) return !1;
            if (s && re(u)) continue;
            (s = !1), (r = u | (r & 1));
            continue;
        }
        if (!s)
            if (r & 4) {
                if (
                    ((r = 2 | (r & 1)),
                    (u !== '' && !yd(e, u, n)) || (u === '' && t.length === 1))
                ) {
                    if (re(r)) return !1;
                    s = !0;
                }
            } else {
                let c = r & 8 ? u : t[++a];
                if (r & 8 && e.attrs !== null) {
                    if (!md(e.attrs, c, n)) {
                        if (re(r)) return !1;
                        s = !0;
                    }
                    continue;
                }
                let l = r & 8 ? 'class' : u,
                    d = vd(l, o, _a(e), n);
                if (d === -1) {
                    if (re(r)) return !1;
                    s = !0;
                    continue;
                }
                if (c !== '') {
                    let f;
                    d > i ? (f = '') : (f = o[d + 1].toLowerCase());
                    let p = r & 8 ? f : null;
                    if ((p && ba(p, c, 0) !== -1) || (r & 2 && c !== f)) {
                        if (re(r)) return !1;
                        s = !0;
                    }
                }
            }
    }
    return re(r) || s;
}
function re(e) {
    return (e & 1) === 0;
}
function vd(e, t, n, r) {
    if (t === null) return -1;
    let o = 0;
    if (r || !n) {
        let i = !1;
        for (; o < t.length; ) {
            let s = t[o];
            if (s === e) return o;
            if (s === 3 || s === 6) i = !0;
            else if (s === 1 || s === 2) {
                let a = t[++o];
                for (; typeof a == 'string'; ) a = t[++o];
                continue;
            } else {
                if (s === 4) break;
                if (s === 0) {
                    o += 4;
                    continue;
                }
            }
            o += i ? 1 : 2;
        }
        return -1;
    } else return Ed(t, e);
}
function wd(e, t, n = !1) {
    for (let r = 0; r < t.length; r++) if (Dd(e, t[r], n)) return !0;
    return !1;
}
function Id(e) {
    for (let t = 0; t < e.length; t++) {
        let n = e[t];
        if (hd(n)) return t;
    }
    return e.length;
}
function Ed(e, t) {
    let n = e.indexOf(4);
    if (n > -1)
        for (n++; n < e.length; ) {
            let r = e[n];
            if (typeof r == 'number') return -1;
            if (r === t) return n;
            n++;
        }
    return -1;
}
function Hs(e, t) {
    return e ? ':not(' + t.trim() + ')' : t;
}
function Cd(e) {
    let t = e[0],
        n = 1,
        r = 2,
        o = '',
        i = !1;
    for (; n < e.length; ) {
        let s = e[n];
        if (typeof s == 'string')
            if (r & 2) {
                let a = e[++n];
                o += '[' + s + (a.length > 0 ? '="' + a + '"' : '') + ']';
            } else r & 8 ? (o += '.' + s) : r & 4 && (o += ' ' + s);
        else
            o !== '' && !re(s) && ((t += Hs(i, o)), (o = '')),
                (r = s),
                (i = i || !re(r));
        n++;
    }
    return o !== '' && (t += Hs(i, o)), t;
}
function bd(e) {
    return e.map(Cd).join(',');
}
function Md(e) {
    let t = [],
        n = [],
        r = 1,
        o = 2;
    for (; r < e.length; ) {
        let i = e[r];
        if (typeof i == 'string')
            o === 2 ? i !== '' && t.push(i, e[++r]) : o === 8 && n.push(i);
        else {
            if (!re(o)) break;
            o = i;
        }
        r++;
    }
    return { attrs: t, classes: n };
}
function kC(e) {
    return Ut(() => {
        let t = Oa(e),
            n = Et(It({}, t), {
                decls: e.decls,
                vars: e.vars,
                template: e.template,
                consts: e.consts || null,
                ngContentSelectors: e.ngContentSelectors,
                onPush: e.changeDetection === Ca.OnPush,
                directiveDefs: null,
                pipeDefs: null,
                dependencies: (t.standalone && e.dependencies) || null,
                getStandaloneInjector: null,
                signals: e.signals ?? !1,
                data: e.data || {},
                encapsulation: e.encapsulation || Nt.Emulated,
                styles: e.styles || U,
                _: null,
                schemas: e.schemas || null,
                tView: null,
                id: '',
            });
        Fa(n);
        let r = e.dependencies;
        return (
            (n.directiveDefs = Gs(r, !1)),
            (n.pipeDefs = Gs(r, !0)),
            (n.id = Sd(n)),
            n
        );
    });
}
function _d(e) {
    return je(e) || Sa(e);
}
function xd(e) {
    return e !== null;
}
function xa(e) {
    return Ut(() => ({
        type: e.type,
        bootstrap: e.bootstrap || U,
        declarations: e.declarations || U,
        imports: e.imports || U,
        exports: e.exports || U,
        transitiveCompileScopes: null,
        schemas: e.schemas || null,
        id: e.id || null,
    }));
}
function Us(e, t) {
    if (e == null) return Ot;
    let n = {};
    for (let r in e)
        if (e.hasOwnProperty(r)) {
            let o = e[r],
                i,
                s,
                a = Le.None;
            Array.isArray(o)
                ? ((a = o[0]), (i = o[1]), (s = o[2] ?? i))
                : ((i = o), (s = o)),
                t
                    ? ((n[i] = a !== Le.None ? [r, a] : r), (t[i] = s))
                    : (n[i] = r);
        }
    return n;
}
function nr(e) {
    return Ut(() => {
        let t = Oa(e);
        return Fa(t), t;
    });
}
function Ta(e) {
    return {
        type: e.type,
        name: e.name,
        factory: null,
        pure: e.pure !== !1,
        standalone: e.standalone === !0,
        onDestroy: e.type.prototype.ngOnDestroy || null,
    };
}
function je(e) {
    return e[ld] || null;
}
function Sa(e) {
    return e[dd] || null;
}
function Aa(e) {
    return e[fd] || null;
}
function Td(e) {
    let t = je(e) || Sa(e) || Aa(e);
    return t !== null ? t.standalone : !1;
}
function Na(e, t) {
    let n = e[pd] || null;
    if (!n && t === !0)
        throw new Error(`Type ${B(e)} does not have '\u0275mod' property.`);
    return n;
}
function Oa(e) {
    let t = {};
    return {
        type: e.type,
        providersResolver: null,
        factory: null,
        hostBindings: e.hostBindings || null,
        hostVars: e.hostVars || 0,
        hostAttrs: e.hostAttrs || null,
        contentQueries: e.contentQueries || null,
        declaredInputs: t,
        inputTransforms: null,
        inputConfig: e.inputs || Ot,
        exportAs: e.exportAs || null,
        standalone: e.standalone === !0,
        signals: e.signals === !0,
        selectors: e.selectors || U,
        viewQuery: e.viewQuery || null,
        features: e.features || null,
        setInput: null,
        findHostDirectiveDefs: null,
        hostDirectives: null,
        inputs: Us(e.inputs, t),
        outputs: Us(e.outputs),
        debugInfo: null,
    };
}
function Fa(e) {
    e.features?.forEach((t) => t(e));
}
function Gs(e, t) {
    if (!e) return null;
    let n = t ? Aa : _d;
    return () => (typeof e == 'function' ? e() : e).map((r) => n(r)).filter(xd);
}
function Sd(e) {
    let t = 0,
        n = [
            e.selectors,
            e.ngContentSelectors,
            e.hostVars,
            e.hostAttrs,
            e.consts,
            e.vars,
            e.decls,
            e.encapsulation,
            e.standalone,
            e.signals,
            e.exportAs,
            JSON.stringify(e.inputs),
            JSON.stringify(e.outputs),
            Object.getOwnPropertyNames(e.type.prototype),
            !!e.contentQueries,
            !!e.viewQuery,
        ].join('|');
    for (let o of n) t = (Math.imul(31, t) + o.charCodeAt(0)) << 0;
    return (t += 2147483648), 'c' + t;
}
var q = 0,
    y = 1,
    g = 2,
    R = 3,
    ie = 4,
    ae = 5,
    me = 6,
    Ft = 7,
    de = 8,
    ct = 9,
    ye = 10,
    A = 11,
    Rt = 12,
    zs = 13,
    gt = 14,
    Z = 15,
    Gt = 16,
    it = 17,
    De = 18,
    rr = 19,
    Ra = 20,
    St = 21,
    Hr = 22,
    Ve = 23,
    k = 25,
    Pa = 1,
    Pt = 6,
    ve = 7,
    Rn = 8,
    lt = 9,
    G = 10,
    ri = (function (e) {
        return (
            (e[(e.None = 0)] = 'None'),
            (e[(e.HasTransplantedViews = 2)] = 'HasTransplantedViews'),
            e
        );
    })(ri || {});
function Ce(e) {
    return Array.isArray(e) && typeof e[Pa] == 'object';
}
function fe(e) {
    return Array.isArray(e) && e[Pa] === !0;
}
function oi(e) {
    return (e.flags & 4) !== 0;
}
function zt(e) {
    return e.componentOffset > -1;
}
function or(e) {
    return (e.flags & 1) === 1;
}
function mt(e) {
    return !!e.template;
}
function ka(e) {
    return (e[g] & 512) !== 0;
}
var La = 'svg',
    Ad = 'math',
    Nd = !1;
function Od() {
    return Nd;
}
function se(e) {
    for (; Array.isArray(e); ) e = e[q];
    return e;
}
function ja(e, t) {
    return se(t[e]);
}
function Q(e, t) {
    return se(t[e.index]);
}
function Va(e, t) {
    return e.data[t];
}
function Ba(e, t) {
    return e[t];
}
function qe(e, t) {
    let n = t[e];
    return Ce(n) ? n : n[q];
}
function Fd(e) {
    return (e[g] & 4) === 4;
}
function ii(e) {
    return (e[g] & 128) === 128;
}
function Rd(e) {
    return fe(e[R]);
}
function dt(e, t) {
    return t == null ? null : e[t];
}
function $a(e) {
    e[it] = 0;
}
function Pd(e) {
    e[g] & 1024 || ((e[g] |= 1024), ii(e) && kt(e));
}
function kd(e, t) {
    for (; e > 0; ) (t = t[gt]), e--;
    return t;
}
function si(e) {
    return !!(e[g] & 9216 || e[Ve]?.dirty);
}
function uo(e) {
    si(e)
        ? kt(e)
        : e[g] & 64 &&
          (Od()
              ? ((e[g] |= 1024), kt(e))
              : e[ye].changeDetectionScheduler?.notify());
}
function kt(e) {
    e[ye].changeDetectionScheduler?.notify();
    let t = Lt(e);
    for (; t !== null && !(t[g] & 8192 || ((t[g] |= 8192), !ii(t))); )
        t = Lt(t);
}
function Ld(e, t) {
    if ((e[g] & 256) === 256) throw new C(911, !1);
    e[St] === null && (e[St] = []), e[St].push(t);
}
function Lt(e) {
    let t = e[R];
    return fe(t) ? t[R] : t;
}
var D = { lFrame: Za(null), bindingsEnabled: !0, skipHydrationRootTNode: null };
function jd() {
    return D.lFrame.elementDepthCount;
}
function Vd() {
    D.lFrame.elementDepthCount++;
}
function Bd() {
    D.lFrame.elementDepthCount--;
}
function Ha() {
    return D.bindingsEnabled;
}
function Wt() {
    return D.skipHydrationRootTNode !== null;
}
function $d(e) {
    return D.skipHydrationRootTNode === e;
}
function Hd(e) {
    D.skipHydrationRootTNode = e;
}
function Ud() {
    D.skipHydrationRootTNode = null;
}
function _() {
    return D.lFrame.lView;
}
function L() {
    return D.lFrame.tView;
}
function K() {
    let e = Ua();
    for (; e !== null && e.type === 64; ) e = e.parent;
    return e;
}
function Ua() {
    return D.lFrame.currentTNode;
}
function Gd() {
    let e = D.lFrame,
        t = e.currentTNode;
    return e.isParent ? t : t.parent;
}
function Qe(e, t) {
    let n = D.lFrame;
    (n.currentTNode = e), (n.isParent = t);
}
function ai() {
    return D.lFrame.isParent;
}
function Ga() {
    D.lFrame.isParent = !1;
}
function zd() {
    return D.lFrame.contextLView;
}
function za() {
    let e = D.lFrame,
        t = e.bindingRootIndex;
    return t === -1 && (t = e.bindingRootIndex = e.tView.bindingStartIndex), t;
}
function Wd(e) {
    return (D.lFrame.bindingIndex = e);
}
function ui() {
    return D.lFrame.bindingIndex++;
}
function Wa(e) {
    let t = D.lFrame,
        n = t.bindingIndex;
    return (t.bindingIndex = t.bindingIndex + e), n;
}
function qd() {
    return D.lFrame.inI18n;
}
function Qd(e, t) {
    let n = D.lFrame;
    (n.bindingIndex = n.bindingRootIndex = e), co(t);
}
function Yd() {
    return D.lFrame.currentDirectiveIndex;
}
function co(e) {
    D.lFrame.currentDirectiveIndex = e;
}
function Zd(e) {
    let t = D.lFrame.currentDirectiveIndex;
    return t === -1 ? null : e[t];
}
function qa() {
    return D.lFrame.currentQueryIndex;
}
function ci(e) {
    D.lFrame.currentQueryIndex = e;
}
function Kd(e) {
    let t = e[y];
    return t.type === 2 ? t.declTNode : t.type === 1 ? e[ae] : null;
}
function Qa(e, t, n) {
    if (n & I.SkipSelf) {
        let o = t,
            i = e;
        for (; (o = o.parent), o === null && !(n & I.Host); )
            if (((o = Kd(i)), o === null || ((i = i[gt]), o.type & 10))) break;
        if (o === null) return !1;
        (t = o), (e = i);
    }
    let r = (D.lFrame = Ya());
    return (r.currentTNode = t), (r.lView = e), !0;
}
function li(e) {
    let t = Ya(),
        n = e[y];
    (D.lFrame = t),
        (t.currentTNode = n.firstChild),
        (t.lView = e),
        (t.tView = n),
        (t.contextLView = e),
        (t.bindingIndex = n.bindingStartIndex),
        (t.inI18n = !1);
}
function Ya() {
    let e = D.lFrame,
        t = e === null ? null : e.child;
    return t === null ? Za(e) : t;
}
function Za(e) {
    let t = {
        currentTNode: null,
        isParent: !0,
        lView: null,
        tView: null,
        selectedIndex: -1,
        contextLView: null,
        elementDepthCount: 0,
        currentNamespace: null,
        currentDirectiveIndex: -1,
        bindingRootIndex: -1,
        bindingIndex: -1,
        currentQueryIndex: 0,
        parent: e,
        child: null,
        inI18n: !1,
    };
    return e !== null && (e.child = t), t;
}
function Ka() {
    let e = D.lFrame;
    return (D.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e;
}
var Ja = Ka;
function di() {
    let e = Ka();
    (e.isParent = !0),
        (e.tView = null),
        (e.selectedIndex = -1),
        (e.contextLView = null),
        (e.elementDepthCount = 0),
        (e.currentDirectiveIndex = -1),
        (e.currentNamespace = null),
        (e.bindingRootIndex = -1),
        (e.bindingIndex = -1),
        (e.currentQueryIndex = 0);
}
function Jd(e) {
    return (D.lFrame.contextLView = kd(e, D.lFrame.contextLView))[de];
}
function Ye() {
    return D.lFrame.selectedIndex;
}
function Be(e) {
    D.lFrame.selectedIndex = e;
}
function Xa() {
    let e = D.lFrame;
    return Va(e.tView, e.selectedIndex);
}
function LC() {
    D.lFrame.currentNamespace = La;
}
function jC() {
    Xd();
}
function Xd() {
    D.lFrame.currentNamespace = null;
}
function eu() {
    return D.lFrame.currentNamespace;
}
var tu = !0;
function ir() {
    return tu;
}
function xe(e) {
    tu = e;
}
function ef() {
    return yt(K(), _());
}
function yt(e, t) {
    return new Dt(Q(e, t));
}
var Dt = (() => {
    let t = class t {
        constructor(r) {
            this.nativeElement = r;
        }
    };
    t.__NG_ELEMENT_ID__ = ef;
    let e = t;
    return e;
})();
function tf(e) {
    return e instanceof Dt ? e.nativeElement : e;
}
function nf(e, t, n) {
    if (e.length !== t.length) return !1;
    for (let r = 0; r < e.length; r++) {
        let o = e[r],
            i = t[r];
        if ((n && ((o = n(o)), (i = n(i))), i !== o)) return !1;
    }
    return !0;
}
function rf(e) {
    return e.flat(Number.POSITIVE_INFINITY);
}
function fi(e, t) {
    e.forEach((n) => (Array.isArray(n) ? fi(n, t) : t(n)));
}
function nu(e, t, n) {
    t >= e.length ? e.push(n) : e.splice(t, 0, n);
}
function Pn(e, t) {
    return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
}
function of(e, t, n, r) {
    let o = e.length;
    if (o == t) e.push(n, r);
    else if (o === 1) e.push(r, e[0]), (e[0] = n);
    else {
        for (o--, e.push(e[o - 1], e[o]); o > t; ) {
            let i = o - 2;
            (e[o] = e[i]), o--;
        }
        (e[t] = n), (e[t + 1] = r);
    }
}
function pi(e, t, n) {
    let r = qt(e, t);
    return r >= 0 ? (e[r | 1] = n) : ((r = ~r), of(e, r, t, n)), r;
}
function Ur(e, t) {
    let n = qt(e, t);
    if (n >= 0) return e[n | 1];
}
function qt(e, t) {
    return sf(e, t, 1);
}
function sf(e, t, n) {
    let r = 0,
        o = e.length >> n;
    for (; o !== r; ) {
        let i = r + ((o - r) >> 1),
            s = e[i << n];
        if (t === s) return i << n;
        s > t ? (o = i) : (r = i + 1);
    }
    return ~(o << n);
}
function af() {
    return this._results[Symbol.iterator]();
}
var lo = class e {
        get changes() {
            return (this._changes ??= new Pe());
        }
        constructor(t = !1) {
            (this._emitDistinctChangesOnly = t),
                (this.dirty = !0),
                (this._onDirty = void 0),
                (this._results = []),
                (this._changesDetected = !1),
                (this._changes = void 0),
                (this.length = 0),
                (this.first = void 0),
                (this.last = void 0);
            let n = e.prototype;
            n[Symbol.iterator] || (n[Symbol.iterator] = af);
        }
        get(t) {
            return this._results[t];
        }
        map(t) {
            return this._results.map(t);
        }
        filter(t) {
            return this._results.filter(t);
        }
        find(t) {
            return this._results.find(t);
        }
        reduce(t, n) {
            return this._results.reduce(t, n);
        }
        forEach(t) {
            this._results.forEach(t);
        }
        some(t) {
            return this._results.some(t);
        }
        toArray() {
            return this._results.slice();
        }
        toString() {
            return this._results.toString();
        }
        reset(t, n) {
            this.dirty = !1;
            let r = rf(t);
            (this._changesDetected = !nf(this._results, r, n)) &&
                ((this._results = r),
                (this.length = r.length),
                (this.last = r[this.length - 1]),
                (this.first = r[0]));
        }
        notifyOnChanges() {
            this._changes !== void 0 &&
                (this._changesDetected || !this._emitDistinctChangesOnly) &&
                this._changes.emit(this);
        }
        onDirty(t) {
            this._onDirty = t;
        }
        setDirty() {
            (this.dirty = !0), this._onDirty?.();
        }
        destroy() {
            this._changes !== void 0 &&
                (this._changes.complete(), this._changes.unsubscribe());
        }
    },
    uf = 'ngSkipHydration',
    cf = 'ngskiphydration';
function ru(e) {
    let t = e.mergedAttrs;
    if (t === null) return !1;
    for (let n = 0; n < t.length; n += 2) {
        let r = t[n];
        if (typeof r == 'number') return !1;
        if (typeof r == 'string' && r.toLowerCase() === cf) return !0;
    }
    return !1;
}
function ou(e) {
    return e.hasAttribute(uf);
}
function kn(e) {
    return (e.flags & 128) === 128;
}
function lf(e) {
    if (kn(e)) return !0;
    let t = e.parent;
    for (; t; ) {
        if (kn(e) || ru(t)) return !0;
        t = t.parent;
    }
    return !1;
}
var fo;
function VC(e) {
    fo = e;
}
function sr() {
    if (fo !== void 0) return fo;
    if (typeof document < 'u') return document;
    throw new C(210, !1);
}
function N(e) {
    return {
        token: e.token,
        providedIn: e.providedIn || null,
        factory: e.factory,
        value: void 0,
    };
}
function iu(e) {
    return { providers: e.providers || [], imports: e.imports || [] };
}
function ar(e) {
    return Ws(e, su) || Ws(e, au);
}
function BC(e) {
    return ar(e) !== null;
}
function Ws(e, t) {
    return e.hasOwnProperty(t) ? e[t] : null;
}
function df(e) {
    let t = e && (e[su] || e[au]);
    return t || null;
}
function qs(e) {
    return e && (e.hasOwnProperty(Qs) || e.hasOwnProperty(ff)) ? e[Qs] : null;
}
var su = x({ ɵprov: x }),
    Qs = x({ ɵinj: x }),
    au = x({ ngInjectableDef: x }),
    ff = x({ ngInjectorDef: x }),
    T = class {
        constructor(t, n) {
            (this._desc = t),
                (this.ngMetadataName = 'InjectionToken'),
                (this.ɵprov = void 0),
                typeof n == 'number'
                    ? (this.__NG_ELEMENT_ID__ = n)
                    : n !== void 0 &&
                      (this.ɵprov = N({
                          token: this,
                          providedIn: n.providedIn || 'root',
                          factory: n.factory,
                      }));
        }
        get multi() {
            return this;
        }
        toString() {
            return `InjectionToken ${this._desc}`;
        }
    },
    pf = new T('', { providedIn: 'root', factory: () => hf }),
    hf = 'ng',
    gf = new T(''),
    hi = new T('', { providedIn: 'platform', factory: () => 'unknown' });
var $C = new T(''),
    HC = new T('', {
        providedIn: 'root',
        factory: () =>
            sr()
                .body?.querySelector('[ngCspNonce]')
                ?.getAttribute('ngCspNonce') || null,
    });
var mf = x({ __forward_ref__: x });
function uu(e) {
    return (
        (e.__forward_ref__ = uu),
        (e.toString = function () {
            return B(this());
        }),
        e
    );
}
function V(e) {
    return cu(e) ? e() : e;
}
function cu(e) {
    return (
        typeof e == 'function' &&
        e.hasOwnProperty(mf) &&
        e.__forward_ref__ === uu
    );
}
function lu(e) {
    return e && !!e.ɵproviders;
}
function ur(e) {
    return typeof e == 'string' ? e : e == null ? '' : String(e);
}
function yf(e) {
    return typeof e == 'function'
        ? e.name || e.toString()
        : typeof e == 'object' && e != null && typeof e.type == 'function'
          ? e.type.name || e.type.toString()
          : ur(e);
}
function Df(e, t) {
    let n = t ? `. Dependency path: ${t.join(' > ')} > ${e}` : '';
    throw new C(-200, e);
}
function gi(e, t) {
    throw new C(-201, !1);
}
var po;
function vf() {
    return po;
}
function H(e) {
    let t = po;
    return (po = e), t;
}
function du(e, t, n) {
    let r = ar(e);
    if (r && r.providedIn == 'root')
        return r.value === void 0 ? (r.value = r.factory()) : r.value;
    if (n & I.Optional) return null;
    if (t !== void 0) return t;
    gi(e, 'Injector');
}
var wf = {},
    jt = wf,
    ho = '__NG_DI_FLAG__',
    Ln = 'ngTempTokenPath',
    If = 'ngTokenPath',
    Ef = /\n/gm,
    Cf = '\u0275',
    Ys = '__source',
    At;
function Ee(e) {
    let t = At;
    return (At = e), t;
}
function bf(e, t = I.Default) {
    if (At === void 0) throw new C(-203, !1);
    return At === null
        ? du(e, void 0, t)
        : At.get(e, t & I.Optional ? null : void 0, t);
}
function z(e, t = I.Default) {
    return (vf() || bf)(V(e), t);
}
function M(e, t = I.Default) {
    return z(e, cr(t));
}
function cr(e) {
    return typeof e > 'u' || typeof e == 'number'
        ? e
        : 0 |
              (e.optional && 8) |
              (e.host && 1) |
              (e.self && 2) |
              (e.skipSelf && 4);
}
function go(e) {
    let t = [];
    for (let n = 0; n < e.length; n++) {
        let r = V(e[n]);
        if (Array.isArray(r)) {
            if (r.length === 0) throw new C(900, !1);
            let o,
                i = I.Default;
            for (let s = 0; s < r.length; s++) {
                let a = r[s],
                    u = Mf(a);
                typeof u == 'number'
                    ? u === -1
                        ? (o = a.token)
                        : (i |= u)
                    : (o = a);
            }
            t.push(z(o, i));
        } else t.push(z(r));
    }
    return t;
}
function fu(e, t) {
    return (e[ho] = t), (e.prototype[ho] = t), e;
}
function Mf(e) {
    return e[ho];
}
function _f(e, t, n, r) {
    let o = e[Ln];
    throw (
        (t[Ys] && o.unshift(t[Ys]),
        (e.message = xf(
            `
` + e.message,
            o,
            n,
            r,
        )),
        (e[If] = o),
        (e[Ln] = null),
        e)
    );
}
function xf(e, t, n, r = null) {
    e =
        e &&
        e.charAt(0) ===
            `
` &&
        e.charAt(1) == Cf
            ? e.slice(2)
            : e;
    let o = B(t);
    if (Array.isArray(t)) o = t.map(B).join(' -> ');
    else if (typeof t == 'object') {
        let i = [];
        for (let s in t)
            if (t.hasOwnProperty(s)) {
                let a = t[s];
                i.push(
                    s + ':' + (typeof a == 'string' ? JSON.stringify(a) : B(a)),
                );
            }
        o = `{${i.join(', ')}}`;
    }
    return `${n}${r ? '(' + r + ')' : ''}[${o}]: ${e.replace(
        Ef,
        `
  `,
    )}`;
}
function Tf() {
    let e = new mi();
    return M(hi) === 'browser' && (e.store = Sf(sr(), M(pf))), e;
}
var mi = (() => {
    let t = class t {
        constructor() {
            (this.store = {}), (this.onSerializeCallbacks = {});
        }
        get(r, o) {
            return this.store[r] !== void 0 ? this.store[r] : o;
        }
        set(r, o) {
            this.store[r] = o;
        }
        remove(r) {
            delete this.store[r];
        }
        hasKey(r) {
            return this.store.hasOwnProperty(r);
        }
        get isEmpty() {
            return Object.keys(this.store).length === 0;
        }
        onSerialize(r, o) {
            this.onSerializeCallbacks[r] = o;
        }
        toJson() {
            for (let r in this.onSerializeCallbacks)
                if (this.onSerializeCallbacks.hasOwnProperty(r))
                    try {
                        this.store[r] = this.onSerializeCallbacks[r]();
                    } catch (o) {
                        console.warn('Exception in onSerialize callback: ', o);
                    }
            return JSON.stringify(this.store).replace(/</g, '\\u003C');
        }
    };
    t.ɵprov = N({ token: t, providedIn: 'root', factory: Tf });
    let e = t;
    return e;
})();
function Sf(e, t) {
    let n = e.getElementById(t + '-state');
    if (n?.textContent)
        try {
            return JSON.parse(n.textContent);
        } catch (r) {
            console.warn(
                'Exception while restoring TransferState for app ' + t,
                r,
            );
        }
    return {};
}
var pu = 'h',
    hu = 'b',
    mo = (function (e) {
        return (e.FirstChild = 'f'), (e.NextSibling = 'n'), e;
    })(mo || {}),
    Af = 'e',
    Nf = 't',
    yi = 'c',
    gu = 'x',
    jn = 'r',
    Of = 'i',
    Ff = 'n',
    Rf = 'd',
    Pf = '__nghData__',
    mu = Pf,
    Gr = 'ngh',
    kf = 'nghm',
    yu = () => null;
function Lf(e, t, n = !1) {
    let r = e.getAttribute(Gr);
    if (r == null) return null;
    let [o, i] = r.split('|');
    if (((r = n ? i : o), !r)) return null;
    let s = i ? `|${i}` : '',
        a = n ? o : s,
        u = {};
    if (r !== '') {
        let l = t.get(mi, null, { optional: !0 });
        l !== null && (u = l.get(mu, [])[Number(r)]);
    }
    let c = { data: u, firstChild: e.firstChild ?? null };
    return (
        n && ((c.firstChild = e), lr(c, 0, e.nextSibling)),
        a ? e.setAttribute(Gr, a) : e.removeAttribute(Gr),
        c
    );
}
function jf() {
    yu = Lf;
}
function Di(e, t, n = !1) {
    return yu(e, t, n);
}
function Vf(e) {
    let t = e._lView;
    return t[y].type === 2 ? null : (ka(t) && (t = t[k]), t);
}
function Bf(e) {
    return e.textContent?.replace(/\s/gm, '');
}
function $f(e) {
    let t = sr(),
        n = t.createNodeIterator(e, NodeFilter.SHOW_COMMENT, {
            acceptNode(i) {
                let s = Bf(i);
                return s === 'ngetn' || s === 'ngtns'
                    ? NodeFilter.FILTER_ACCEPT
                    : NodeFilter.FILTER_REJECT;
            },
        }),
        r,
        o = [];
    for (; (r = n.nextNode()); ) o.push(r);
    for (let i of o)
        i.textContent === 'ngetn'
            ? i.replaceWith(t.createTextNode(''))
            : i.remove();
}
function lr(e, t, n) {
    (e.segmentHeads ??= {}), (e.segmentHeads[t] = n);
}
function yo(e, t) {
    return e.segmentHeads?.[t] ?? null;
}
function Hf(e, t) {
    let n = e.data,
        r = n[Af]?.[t] ?? null;
    return r === null && n[yi]?.[t] && (r = vi(e, t)), r;
}
function Du(e, t) {
    return e.data[yi]?.[t] ?? null;
}
function vi(e, t) {
    let n = Du(e, t) ?? [],
        r = 0;
    for (let o of n) r += o[jn] * (o[gu] ?? 1);
    return r;
}
function dr(e, t) {
    if (typeof e.disconnectedNodes > 'u') {
        let n = e.data[Rf];
        e.disconnectedNodes = n ? new Set(n) : null;
    }
    return !!e.disconnectedNodes?.has(t);
}
var In = '__parameters__';
function Uf(e) {
    return function (...n) {
        if (e) {
            let r = e(...n);
            for (let o in r) this[o] = r[o];
        }
    };
}
function vu(e, t, n) {
    return Ut(() => {
        let r = Uf(t);
        function o(...i) {
            if (this instanceof o) return r.apply(this, i), this;
            let s = new o(...i);
            return (a.annotation = s), a;
            function a(u, c, l) {
                let d = u.hasOwnProperty(In)
                    ? u[In]
                    : Object.defineProperty(u, In, { value: [] })[In];
                for (; d.length <= l; ) d.push(null);
                return (d[l] = d[l] || []).push(s), u;
            }
        }
        return (
            n && (o.prototype = Object.create(n.prototype)),
            (o.prototype.ngMetadataName = e),
            (o.annotationCls = o),
            o
        );
    });
}
var Gf = fu(vu('Optional'), 8);
var zf = fu(vu('SkipSelf'), 4);
function $e(e, t) {
    let n = e.hasOwnProperty(Fn);
    return n ? e[Fn] : null;
}
var Vt = new T(''),
    wu = new T('', -1),
    Iu = new T(''),
    Vn = class {
        get(t, n = jt) {
            if (n === jt) {
                let r = new Error(
                    `NullInjectorError: No provider for ${B(t)}!`,
                );
                throw ((r.name = 'NullInjectorError'), r);
            }
            return n;
        }
    };
function Eu(e) {
    return { ɵproviders: e };
}
function Wf(...e) {
    return { ɵproviders: Cu(!0, e), ɵfromNgModule: !0 };
}
function Cu(e, ...t) {
    let n = [],
        r = new Set(),
        o,
        i = (s) => {
            n.push(s);
        };
    return (
        fi(t, (s) => {
            let a = s;
            Do(a, i, [], r) && ((o ||= []), o.push(a));
        }),
        o !== void 0 && bu(o, i),
        n
    );
}
function bu(e, t) {
    for (let n = 0; n < e.length; n++) {
        let { ngModule: r, providers: o } = e[n];
        wi(o, (i) => {
            t(i, r);
        });
    }
}
function Do(e, t, n, r) {
    if (((e = V(e)), !e)) return !1;
    let o = null,
        i = qs(e),
        s = !i && je(e);
    if (!i && !s) {
        let u = e.ngModule;
        if (((i = qs(u)), i)) o = u;
        else return !1;
    } else {
        if (s && !s.standalone) return !1;
        o = e;
    }
    let a = r.has(o);
    if (s) {
        if (a) return !1;
        if ((r.add(o), s.dependencies)) {
            let u =
                typeof s.dependencies == 'function'
                    ? s.dependencies()
                    : s.dependencies;
            for (let c of u) Do(c, t, n, r);
        }
    } else if (i) {
        if (i.imports != null && !a) {
            r.add(o);
            let c;
            try {
                fi(i.imports, (l) => {
                    Do(l, t, n, r) && ((c ||= []), c.push(l));
                });
            } finally {
            }
            c !== void 0 && bu(c, t);
        }
        if (!a) {
            let c = $e(o) || (() => new o());
            t({ provide: o, useFactory: c, deps: U }, o),
                t({ provide: Iu, useValue: o, multi: !0 }, o),
                t({ provide: Vt, useValue: () => z(o), multi: !0 }, o);
        }
        let u = i.providers;
        if (u != null && !a) {
            let c = e;
            wi(u, (l) => {
                t(l, c);
            });
        }
    } else return !1;
    return o !== e && e.providers !== void 0;
}
function wi(e, t) {
    for (let n of e)
        lu(n) && (n = n.ɵproviders), Array.isArray(n) ? wi(n, t) : t(n);
}
var qf = x({ provide: String, useValue: x });
function Mu(e) {
    return e !== null && typeof e == 'object' && qf in e;
}
function Qf(e) {
    return !!(e && e.useExisting);
}
function Yf(e) {
    return !!(e && e.useFactory);
}
function ft(e) {
    return typeof e == 'function';
}
function Zf(e) {
    return !!e.useClass;
}
var _u = new T(''),
    xn = {},
    Kf = {},
    zr;
function Ii() {
    return zr === void 0 && (zr = new Vn()), zr;
}
var be = class {},
    Bt = class extends be {
        get destroyed() {
            return this._destroyed;
        }
        constructor(t, n, r, o) {
            super(),
                (this.parent = n),
                (this.source = r),
                (this.scopes = o),
                (this.records = new Map()),
                (this._ngOnDestroyHooks = new Set()),
                (this._onDestroyHooks = []),
                (this._destroyed = !1),
                wo(t, (s) => this.processProvider(s)),
                this.records.set(wu, st(void 0, this)),
                o.has('environment') && this.records.set(be, st(void 0, this));
            let i = this.records.get(_u);
            i != null && typeof i.value == 'string' && this.scopes.add(i.value),
                (this.injectorDefTypes = new Set(this.get(Iu, U, I.Self)));
        }
        destroy() {
            this.assertNotDestroyed(), (this._destroyed = !0);
            try {
                for (let n of this._ngOnDestroyHooks) n.ngOnDestroy();
                let t = this._onDestroyHooks;
                this._onDestroyHooks = [];
                for (let n of t) n();
            } finally {
                this.records.clear(),
                    this._ngOnDestroyHooks.clear(),
                    this.injectorDefTypes.clear();
            }
        }
        onDestroy(t) {
            return (
                this.assertNotDestroyed(),
                this._onDestroyHooks.push(t),
                () => this.removeOnDestroy(t)
            );
        }
        runInContext(t) {
            this.assertNotDestroyed();
            let n = Ee(this),
                r = H(void 0),
                o;
            try {
                return t();
            } finally {
                Ee(n), H(r);
            }
        }
        get(t, n = jt, r = I.Default) {
            if ((this.assertNotDestroyed(), t.hasOwnProperty(Bs)))
                return t[Bs](this);
            r = cr(r);
            let o,
                i = Ee(this),
                s = H(void 0);
            try {
                if (!(r & I.SkipSelf)) {
                    let u = this.records.get(t);
                    if (u === void 0) {
                        let c = np(t) && ar(t);
                        c && this.injectableDefInScope(c)
                            ? (u = st(vo(t), xn))
                            : (u = null),
                            this.records.set(t, u);
                    }
                    if (u != null) return this.hydrate(t, u);
                }
                let a = r & I.Self ? Ii() : this.parent;
                return (n = r & I.Optional && n === jt ? null : n), a.get(t, n);
            } catch (a) {
                if (a.name === 'NullInjectorError') {
                    if (((a[Ln] = a[Ln] || []).unshift(B(t)), i)) throw a;
                    return _f(a, t, 'R3InjectorError', this.source);
                } else throw a;
            } finally {
                H(s), Ee(i);
            }
        }
        resolveInjectorInitializers() {
            let t = Ee(this),
                n = H(void 0),
                r;
            try {
                let o = this.get(Vt, U, I.Self);
                for (let i of o) i();
            } finally {
                Ee(t), H(n);
            }
        }
        toString() {
            let t = [],
                n = this.records;
            for (let r of n.keys()) t.push(B(r));
            return `R3Injector[${t.join(', ')}]`;
        }
        assertNotDestroyed() {
            if (this._destroyed) throw new C(205, !1);
        }
        processProvider(t) {
            t = V(t);
            let n = ft(t) ? t : V(t && t.provide),
                r = Xf(t);
            if (!ft(t) && t.multi === !0) {
                let o = this.records.get(n);
                o ||
                    ((o = st(void 0, xn, !0)),
                    (o.factory = () => go(o.multi)),
                    this.records.set(n, o)),
                    (n = t),
                    o.multi.push(t);
            }
            this.records.set(n, r);
        }
        hydrate(t, n) {
            return (
                n.value === xn && ((n.value = Kf), (n.value = n.factory())),
                typeof n.value == 'object' &&
                    n.value &&
                    tp(n.value) &&
                    this._ngOnDestroyHooks.add(n.value),
                n.value
            );
        }
        injectableDefInScope(t) {
            if (!t.providedIn) return !1;
            let n = V(t.providedIn);
            return typeof n == 'string'
                ? n === 'any' || this.scopes.has(n)
                : this.injectorDefTypes.has(n);
        }
        removeOnDestroy(t) {
            let n = this._onDestroyHooks.indexOf(t);
            n !== -1 && this._onDestroyHooks.splice(n, 1);
        }
    };
function vo(e) {
    let t = ar(e),
        n = t !== null ? t.factory : $e(e);
    if (n !== null) return n;
    if (e instanceof T) throw new C(204, !1);
    if (e instanceof Function) return Jf(e);
    throw new C(204, !1);
}
function Jf(e) {
    if (e.length > 0) throw new C(204, !1);
    let n = df(e);
    return n !== null ? () => n.factory(e) : () => new e();
}
function Xf(e) {
    if (Mu(e)) return st(void 0, e.useValue);
    {
        let t = xu(e);
        return st(t, xn);
    }
}
function xu(e, t, n) {
    let r;
    if (ft(e)) {
        let o = V(e);
        return $e(o) || vo(o);
    } else if (Mu(e)) r = () => V(e.useValue);
    else if (Yf(e)) r = () => e.useFactory(...go(e.deps || []));
    else if (Qf(e)) r = () => z(V(e.useExisting));
    else {
        let o = V(e && (e.useClass || e.provide));
        if (ep(e)) r = () => new o(...go(e.deps));
        else return $e(o) || vo(o);
    }
    return r;
}
function st(e, t, n = !1) {
    return { factory: e, value: t, multi: n ? [] : void 0 };
}
function ep(e) {
    return !!e.deps;
}
function tp(e) {
    return (
        e !== null && typeof e == 'object' && typeof e.ngOnDestroy == 'function'
    );
}
function np(e) {
    return typeof e == 'function' || (typeof e == 'object' && e instanceof T);
}
function wo(e, t) {
    for (let n of e)
        Array.isArray(n) ? wo(n, t) : n && lu(n) ? wo(n.ɵproviders, t) : t(n);
}
function UC(e, t) {
    e instanceof Bt && e.assertNotDestroyed();
    let n,
        r = Ee(e),
        o = H(void 0);
    try {
        return t();
    } finally {
        Ee(r), H(o);
    }
}
function rp(e) {
    return typeof e == 'function';
}
var Io = class {
    constructor(t, n, r) {
        (this.previousValue = t),
            (this.currentValue = n),
            (this.firstChange = r);
    }
    isFirstChange() {
        return this.firstChange;
    }
};
function Tu(e, t, n, r) {
    t !== null ? t.applyValueToInputSignal(t, r) : (e[n] = r);
}
function Ei() {
    return Su;
}
function Su(e) {
    return e.type.prototype.ngOnChanges && (e.setInput = ip), op;
}
Ei.ngInherit = !0;
function op() {
    let e = Nu(this),
        t = e?.current;
    if (t) {
        let n = e.previous;
        if (n === Ot) e.previous = t;
        else for (let r in t) n[r] = t[r];
        (e.current = null), this.ngOnChanges(t);
    }
}
function ip(e, t, n, r, o) {
    let i = this.declaredInputs[r],
        s = Nu(e) || sp(e, { previous: Ot, current: null }),
        a = s.current || (s.current = {}),
        u = s.previous,
        c = u[i];
    (a[i] = new Io(c && c.currentValue, n, u === Ot)), Tu(e, t, o, n);
}
var Au = '__ngSimpleChanges__';
function Nu(e) {
    return e[Au] || null;
}
function sp(e, t) {
    return (e[Au] = t);
}
var Zs = null;
var ce = function (e, t, n) {
    Zs?.(e, t, n);
};
function ap(e, t, n) {
    let { ngOnChanges: r, ngOnInit: o, ngDoCheck: i } = t.type.prototype;
    if (r) {
        let s = Su(t);
        (n.preOrderHooks ??= []).push(e, s),
            (n.preOrderCheckHooks ??= []).push(e, s);
    }
    o && (n.preOrderHooks ??= []).push(0 - e, o),
        i &&
            ((n.preOrderHooks ??= []).push(e, i),
            (n.preOrderCheckHooks ??= []).push(e, i));
}
function fr(e, t) {
    for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
        let i = e.data[n].type.prototype,
            {
                ngAfterContentInit: s,
                ngAfterContentChecked: a,
                ngAfterViewInit: u,
                ngAfterViewChecked: c,
                ngOnDestroy: l,
            } = i;
        s && (e.contentHooks ??= []).push(-n, s),
            a &&
                ((e.contentHooks ??= []).push(n, a),
                (e.contentCheckHooks ??= []).push(n, a)),
            u && (e.viewHooks ??= []).push(-n, u),
            c &&
                ((e.viewHooks ??= []).push(n, c),
                (e.viewCheckHooks ??= []).push(n, c)),
            l != null && (e.destroyHooks ??= []).push(n, l);
    }
}
function Tn(e, t, n) {
    Ou(e, t, 3, n);
}
function Sn(e, t, n, r) {
    (e[g] & 3) === n && Ou(e, t, n, r);
}
function Wr(e, t) {
    let n = e[g];
    (n & 3) === t && ((n &= 16383), (n += 1), (e[g] = n));
}
function Ou(e, t, n, r) {
    let o = r !== void 0 ? e[it] & 65535 : 0,
        i = r ?? -1,
        s = t.length - 1,
        a = 0;
    for (let u = o; u < s; u++)
        if (typeof t[u + 1] == 'number') {
            if (((a = t[u]), r != null && a >= r)) break;
        } else
            t[u] < 0 && (e[it] += 65536),
                (a < i || i == -1) &&
                    (up(e, n, t, u), (e[it] = (e[it] & 4294901760) + u + 2)),
                u++;
}
function Ks(e, t) {
    ce(4, e, t);
    let n = j(null);
    try {
        t.call(e);
    } finally {
        j(n), ce(5, e, t);
    }
}
function up(e, t, n, r) {
    let o = n[r] < 0,
        i = n[r + 1],
        s = o ? -n[r] : n[r],
        a = e[s];
    o
        ? e[g] >> 14 < e[it] >> 16 &&
          (e[g] & 3) === t &&
          ((e[g] += 16384), Ks(a, i))
        : Ks(a, i);
}
var ut = -1,
    He = class {
        constructor(t, n, r) {
            (this.factory = t),
                (this.resolving = !1),
                (this.canSeeViewProviders = n),
                (this.injectImpl = r);
        }
    };
function cp(e) {
    return e instanceof He;
}
function lp(e) {
    return (e.flags & 8) !== 0;
}
function dp(e) {
    return (e.flags & 16) !== 0;
}
function Fu(e) {
    return e !== ut;
}
function Bn(e) {
    return e & 32767;
}
function fp(e) {
    return e >> 16;
}
function $n(e, t) {
    let n = fp(e),
        r = t;
    for (; n > 0; ) (r = r[gt]), n--;
    return r;
}
var Eo = !0;
function Hn(e) {
    let t = Eo;
    return (Eo = e), t;
}
var pp = 256,
    Ru = pp - 1,
    Pu = 5,
    hp = 0,
    le = {};
function gp(e, t, n) {
    let r;
    typeof n == 'string'
        ? (r = n.charCodeAt(0) || 0)
        : n.hasOwnProperty(Tt) && (r = n[Tt]),
        r == null && (r = n[Tt] = hp++);
    let o = r & Ru,
        i = 1 << o;
    t.data[e + (o >> Pu)] |= i;
}
function Un(e, t) {
    let n = ku(e, t);
    if (n !== -1) return n;
    let r = t[y];
    r.firstCreatePass &&
        ((e.injectorIndex = t.length),
        qr(r.data, e),
        qr(t, null),
        qr(r.blueprint, null));
    let o = Ci(e, t),
        i = e.injectorIndex;
    if (Fu(o)) {
        let s = Bn(o),
            a = $n(o, t),
            u = a[y].data;
        for (let c = 0; c < 8; c++) t[i + c] = a[s + c] | u[s + c];
    }
    return (t[i + 8] = o), i;
}
function qr(e, t) {
    e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
}
function ku(e, t) {
    return e.injectorIndex === -1 ||
        (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
        t[e.injectorIndex + 8] === null
        ? -1
        : e.injectorIndex;
}
function Ci(e, t) {
    if (e.parent && e.parent.injectorIndex !== -1)
        return e.parent.injectorIndex;
    let n = 0,
        r = null,
        o = t;
    for (; o !== null; ) {
        if (((r = $u(o)), r === null)) return ut;
        if ((n++, (o = o[gt]), r.injectorIndex !== -1))
            return r.injectorIndex | (n << 16);
    }
    return ut;
}
function Co(e, t, n) {
    gp(e, t, n);
}
function Lu(e, t, n) {
    if (n & I.Optional || e !== void 0) return e;
    gi(t, 'NodeInjector');
}
function ju(e, t, n, r) {
    if (
        (n & I.Optional && r === void 0 && (r = null), !(n & (I.Self | I.Host)))
    ) {
        let o = e[ct],
            i = H(void 0);
        try {
            return o ? o.get(t, r, n & I.Optional) : du(t, r, n & I.Optional);
        } finally {
            H(i);
        }
    }
    return Lu(r, t, n);
}
function Vu(e, t, n, r = I.Default, o) {
    if (e !== null) {
        if (t[g] & 2048 && !(r & I.Self)) {
            let s = vp(e, t, n, r, le);
            if (s !== le) return s;
        }
        let i = Bu(e, t, n, r, le);
        if (i !== le) return i;
    }
    return ju(t, n, r, o);
}
function Bu(e, t, n, r, o) {
    let i = yp(n);
    if (typeof i == 'function') {
        if (!Qa(t, e, r)) return r & I.Host ? Lu(o, n, r) : ju(t, n, r, o);
        try {
            let s;
            if (((s = i(r)), s == null && !(r & I.Optional))) gi(n);
            else return s;
        } finally {
            Ja();
        }
    } else if (typeof i == 'number') {
        let s = null,
            a = ku(e, t),
            u = ut,
            c = r & I.Host ? t[Z][ae] : null;
        for (
            (a === -1 || r & I.SkipSelf) &&
            ((u = a === -1 ? Ci(e, t) : t[a + 8]),
            u === ut || !Xs(r, !1)
                ? (a = -1)
                : ((s = t[y]), (a = Bn(u)), (t = $n(u, t))));
            a !== -1;

        ) {
            let l = t[y];
            if (Js(i, a, l.data)) {
                let d = mp(a, t, n, s, r, c);
                if (d !== le) return d;
            }
            (u = t[a + 8]),
                u !== ut && Xs(r, t[y].data[a + 8] === c) && Js(i, a, t)
                    ? ((s = l), (a = Bn(u)), (t = $n(u, t)))
                    : (a = -1);
        }
    }
    return o;
}
function mp(e, t, n, r, o, i) {
    let s = t[y],
        a = s.data[e + 8],
        u = r == null ? zt(a) && Eo : r != s && (a.type & 3) !== 0,
        c = o & I.Host && i === a,
        l = An(a, s, n, u, c);
    return l !== null ? Ue(t, s, l, a) : le;
}
function An(e, t, n, r, o) {
    let i = e.providerIndexes,
        s = t.data,
        a = i & 1048575,
        u = e.directiveStart,
        c = e.directiveEnd,
        l = i >> 20,
        d = r ? a : a + l,
        f = o ? a + l : c;
    for (let p = d; p < f; p++) {
        let h = s[p];
        if ((p < u && n === h) || (p >= u && h.type === n)) return p;
    }
    if (o) {
        let p = s[u];
        if (p && mt(p) && p.type === n) return u;
    }
    return null;
}
function Ue(e, t, n, r) {
    let o = e[n],
        i = t.data;
    if (cp(o)) {
        let s = o;
        s.resolving && Df(yf(i[n]));
        let a = Hn(s.canSeeViewProviders);
        s.resolving = !0;
        let u,
            c = s.injectImpl ? H(s.injectImpl) : null,
            l = Qa(e, r, I.Default);
        try {
            (o = e[n] = s.factory(void 0, i, e, r)),
                t.firstCreatePass && n >= r.directiveStart && ap(n, i[n], t);
        } finally {
            c !== null && H(c), Hn(a), (s.resolving = !1), Ja();
        }
    }
    return o;
}
function yp(e) {
    if (typeof e == 'string') return e.charCodeAt(0) || 0;
    let t = e.hasOwnProperty(Tt) ? e[Tt] : void 0;
    return typeof t == 'number' ? (t >= 0 ? t & Ru : Dp) : t;
}
function Js(e, t, n) {
    let r = 1 << e;
    return !!(n[t + (e >> Pu)] & r);
}
function Xs(e, t) {
    return !(e & I.Self) && !(e & I.Host && t);
}
var ke = class {
    constructor(t, n) {
        (this._tNode = t), (this._lView = n);
    }
    get(t, n, r) {
        return Vu(this._tNode, this._lView, t, cr(r), n);
    }
};
function Dp() {
    return new ke(K(), _());
}
function GC(e) {
    return Ut(() => {
        let t = e.prototype.constructor,
            n = t[Fn] || bo(t),
            r = Object.prototype,
            o = Object.getPrototypeOf(e.prototype).constructor;
        for (; o && o !== r; ) {
            let i = o[Fn] || bo(o);
            if (i && i !== n) return i;
            o = Object.getPrototypeOf(o);
        }
        return (i) => new i();
    });
}
function bo(e) {
    return cu(e)
        ? () => {
              let t = bo(V(e));
              return t && t();
          }
        : $e(e);
}
function vp(e, t, n, r, o) {
    let i = e,
        s = t;
    for (; i !== null && s !== null && s[g] & 2048 && !(s[g] & 512); ) {
        let a = Bu(i, s, n, r | I.Self, le);
        if (a !== le) return a;
        let u = i.parent;
        if (!u) {
            let c = s[Ra];
            if (c) {
                let l = c.get(n, le, r);
                if (l !== le) return l;
            }
            (u = $u(s)), (s = s[gt]);
        }
        i = u;
    }
    return o;
}
function $u(e) {
    let t = e[y],
        n = t.type;
    return n === 2 ? t.declTNode : n === 1 ? e[ae] : null;
}
function ea(e, t = null, n = null, r) {
    let o = Hu(e, t, n, r);
    return o.resolveInjectorInitializers(), o;
}
function Hu(e, t = null, n = null, r, o = new Set()) {
    let i = [n || U, Wf(e)];
    return (
        (r = r || (typeof e == 'object' ? void 0 : B(e))),
        new Bt(i, t || Ii(), r || null, o)
    );
}
var Qt = (() => {
        let t = class t {
            static create(r, o) {
                if (Array.isArray(r)) return ea({ name: '' }, o, r, '');
                {
                    let i = r.name ?? '';
                    return ea({ name: i }, r.parent, r.providers, i);
                }
            }
        };
        (t.THROW_IF_NOT_FOUND = jt),
            (t.NULL = new Vn()),
            (t.ɵprov = N({
                token: t,
                providedIn: 'any',
                factory: () => z(wu),
            })),
            (t.__NG_ELEMENT_ID__ = -1);
        let e = t;
        return e;
    })(),
    wp = 'ngOriginalError';
function Qr(e) {
    return e[wp];
}
var pt = class {
        constructor() {
            this._console = console;
        }
        handleError(t) {
            let n = this._findOriginalError(t);
            this._console.error('ERROR', t),
                n && this._console.error('ORIGINAL ERROR', n);
        }
        _findOriginalError(t) {
            let n = t && Qr(t);
            for (; n && Qr(n); ) n = Qr(n);
            return n || null;
        }
    },
    Uu = new T('', {
        providedIn: 'root',
        factory: () => M(pt).handleError.bind(void 0),
    }),
    En = new T(''),
    Gu = !1,
    zu = new T('', { providedIn: 'root', factory: () => Gu });
var Gn = class {
    constructor(t) {
        this.changingThisBreaksApplicationSecurity = t;
    }
    toString() {
        return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Ia})`;
    }
};
function pr(e) {
    return e instanceof Gn ? e.changingThisBreaksApplicationSecurity : e;
}
function Ip(e, t) {
    let n = Ep(e);
    if (n != null && n !== t) {
        if (n === 'ResourceURL' && t === 'URL') return !0;
        throw new Error(`Required a safe ${t}, got a ${n} (see ${Ia})`);
    }
    return n === t;
}
function Ep(e) {
    return (e instanceof Gn && e.getTypeName()) || null;
}
var Cp = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
function bp(e) {
    return (e = String(e)), e.match(Cp) ? e : 'unsafe:' + e;
}
var Wu = (function (e) {
    return (
        (e[(e.NONE = 0)] = 'NONE'),
        (e[(e.HTML = 1)] = 'HTML'),
        (e[(e.STYLE = 2)] = 'STYLE'),
        (e[(e.SCRIPT = 3)] = 'SCRIPT'),
        (e[(e.URL = 4)] = 'URL'),
        (e[(e.RESOURCE_URL = 5)] = 'RESOURCE_URL'),
        e
    );
})(Wu || {});
function zC(e) {
    let t = Mp();
    return t ? t.sanitize(Wu.URL, e) || '' : Ip(e, 'URL') ? pr(e) : bp(ur(e));
}
function Mp() {
    let e = _();
    return e && e[ye].sanitizer;
}
var _p = /^>|^->|<!--|-->|--!>|<!-$/g,
    xp = /(<|>)/g,
    Tp = '\u200B$1\u200B';
function Sp(e) {
    return e.replace(_p, (t) => t.replace(xp, Tp));
}
var qu = new Map(),
    Ap = 0;
function Np() {
    return Ap++;
}
function Op(e) {
    qu.set(e[rr], e);
}
function Fp(e) {
    qu.delete(e[rr]);
}
var ta = '__ngContext__';
function Me(e, t) {
    Ce(t) ? ((e[ta] = t[rr]), Op(t)) : (e[ta] = t);
}
function Rp(e) {
    return e.ownerDocument.body;
}
function Qu(e) {
    return e instanceof Function ? e() : e;
}
function Cn(e) {
    return (e ?? M(Qt)).get(hi) === 'browser';
}
var zn = (function (e) {
        return (
            (e[(e.Important = 1)] = 'Important'),
            (e[(e.DashCase = 2)] = 'DashCase'),
            e
        );
    })(zn || {}),
    Pp;
function bi(e, t) {
    return Pp(e, t);
}
function at(e, t, n, r, o) {
    if (r != null) {
        let i,
            s = !1;
        fe(r) ? (i = r) : Ce(r) && ((s = !0), (r = r[q]));
        let a = se(r);
        e === 0 && n !== null
            ? o == null
                ? ec(t, n, a)
                : Wn(t, n, a, o || null, !0)
            : e === 1 && n !== null
              ? Wn(t, n, a, o || null, !0)
              : e === 2
                ? nc(t, a, s)
                : e === 3 && t.destroyNode(a),
            i != null && Jp(t, e, i, n, o);
    }
}
function Yu(e, t) {
    return e.createText(t);
}
function kp(e, t, n) {
    e.setValue(t, n);
}
function Zu(e, t) {
    return e.createComment(Sp(t));
}
function Mi(e, t, n) {
    return e.createElement(t, n);
}
function Lp(e, t) {
    Ku(e, t), (t[q] = null), (t[ae] = null);
}
function jp(e, t, n, r, o, i) {
    (r[q] = o), (r[ae] = t), gr(e, r, n, 1, o, i);
}
function Ku(e, t) {
    gr(e, t, t[A], 2, null, null);
}
function Vp(e) {
    let t = e[Rt];
    if (!t) return Yr(e[y], e);
    for (; t; ) {
        let n = null;
        if (Ce(t)) n = t[Rt];
        else {
            let r = t[G];
            r && (n = r);
        }
        if (!n) {
            for (; t && !t[ie] && t !== e; ) Ce(t) && Yr(t[y], t), (t = t[R]);
            t === null && (t = e), Ce(t) && Yr(t[y], t), (n = t && t[ie]);
        }
        t = n;
    }
}
function Bp(e, t, n, r) {
    let o = G + r,
        i = n.length;
    r > 0 && (n[o - 1][ie] = t),
        r < i - G
            ? ((t[ie] = n[o]), nu(n, G + r, t))
            : (n.push(t), (t[ie] = null)),
        (t[R] = n);
    let s = t[Gt];
    s !== null && n !== s && $p(s, t);
    let a = t[De];
    a !== null && a.insertView(e), uo(t), (t[g] |= 128);
}
function $p(e, t) {
    let n = e[lt],
        o = t[R][R][Z];
    t[Z] !== o && (e[g] |= ri.HasTransplantedViews),
        n === null ? (e[lt] = [t]) : n.push(t);
}
function Ju(e, t) {
    let n = e[lt],
        r = n.indexOf(t);
    n.splice(r, 1);
}
function Mo(e, t) {
    if (e.length <= G) return;
    let n = G + t,
        r = e[n];
    if (r) {
        let o = r[Gt];
        o !== null && o !== e && Ju(o, r), t > 0 && (e[n - 1][ie] = r[ie]);
        let i = Pn(e, G + t);
        Lp(r[y], r);
        let s = i[De];
        s !== null && s.detachView(i[y]),
            (r[R] = null),
            (r[ie] = null),
            (r[g] &= -129);
    }
    return r;
}
function Xu(e, t) {
    if (!(t[g] & 256)) {
        let n = t[A];
        n.destroyNode && gr(e, t, n, 3, null, null), Vp(t);
    }
}
function Yr(e, t) {
    if (!(t[g] & 256)) {
        (t[g] &= -129),
            (t[g] |= 256),
            t[Ve] && ss(t[Ve]),
            Up(e, t),
            Hp(e, t),
            t[y].type === 1 && t[A].destroy();
        let n = t[Gt];
        if (n !== null && fe(t[R])) {
            n !== t[R] && Ju(n, t);
            let r = t[De];
            r !== null && r.detachView(e);
        }
        Fp(t);
    }
}
function Hp(e, t) {
    let n = e.cleanup,
        r = t[Ft];
    if (n !== null)
        for (let i = 0; i < n.length - 1; i += 2)
            if (typeof n[i] == 'string') {
                let s = n[i + 3];
                s >= 0 ? r[s]() : r[-s].unsubscribe(), (i += 2);
            } else {
                let s = r[n[i + 1]];
                n[i].call(s);
            }
    r !== null && (t[Ft] = null);
    let o = t[St];
    if (o !== null) {
        t[St] = null;
        for (let i = 0; i < o.length; i++) {
            let s = o[i];
            s();
        }
    }
}
function Up(e, t) {
    let n;
    if (e != null && (n = e.destroyHooks) != null)
        for (let r = 0; r < n.length; r += 2) {
            let o = t[n[r]];
            if (!(o instanceof He)) {
                let i = n[r + 1];
                if (Array.isArray(i))
                    for (let s = 0; s < i.length; s += 2) {
                        let a = o[i[s]],
                            u = i[s + 1];
                        ce(4, a, u);
                        try {
                            u.call(a);
                        } finally {
                            ce(5, a, u);
                        }
                    }
                else {
                    ce(4, o, i);
                    try {
                        i.call(o);
                    } finally {
                        ce(5, o, i);
                    }
                }
            }
        }
}
function Gp(e, t, n) {
    return zp(e, t.parent, n);
}
function zp(e, t, n) {
    let r = t;
    for (; r !== null && r.type & 40; ) (t = r), (r = t.parent);
    if (r === null) return n[q];
    {
        let { componentOffset: o } = r;
        if (o > -1) {
            let { encapsulation: i } = e.data[r.directiveStart + o];
            if (i === Nt.None || i === Nt.Emulated) return null;
        }
        return Q(r, n);
    }
}
function Wn(e, t, n, r, o) {
    e.insertBefore(t, n, r, o);
}
function ec(e, t, n) {
    e.appendChild(t, n);
}
function na(e, t, n, r, o) {
    r !== null ? Wn(e, t, n, r, o) : ec(e, t, n);
}
function Wp(e, t, n, r) {
    e.removeChild(t, n, r);
}
function _i(e, t) {
    return e.parentNode(t);
}
function qp(e, t) {
    return e.nextSibling(t);
}
function Qp(e, t, n) {
    return Zp(e, t, n);
}
function Yp(e, t, n) {
    return e.type & 40 ? Q(e, n) : null;
}
var Zp = Yp,
    ra;
function hr(e, t, n, r) {
    let o = Gp(e, r, t),
        i = t[A],
        s = r.parent || t[ae],
        a = Qp(s, r, t);
    if (o != null)
        if (Array.isArray(n))
            for (let u = 0; u < n.length; u++) na(i, o, n[u], a, !1);
        else na(i, o, n, a, !1);
    ra !== void 0 && ra(i, r, t, n, o);
}
function Nn(e, t) {
    if (t !== null) {
        let n = t.type;
        if (n & 3) return Q(t, e);
        if (n & 4) return _o(-1, e[t.index]);
        if (n & 8) {
            let r = t.child;
            if (r !== null) return Nn(e, r);
            {
                let o = e[t.index];
                return fe(o) ? _o(-1, o) : se(o);
            }
        } else {
            if (n & 32) return bi(t, e)() || se(e[t.index]);
            {
                let r = tc(e, t);
                if (r !== null) {
                    if (Array.isArray(r)) return r[0];
                    let o = Lt(e[Z]);
                    return Nn(o, r);
                } else return Nn(e, t.next);
            }
        }
    }
    return null;
}
function tc(e, t) {
    if (t !== null) {
        let r = e[Z][ae],
            o = t.projection;
        return r.projection[o];
    }
    return null;
}
function _o(e, t) {
    let n = G + e + 1;
    if (n < t.length) {
        let r = t[n],
            o = r[y].firstChild;
        if (o !== null) return Nn(r, o);
    }
    return t[ve];
}
function nc(e, t, n) {
    let r = _i(e, t);
    r && Wp(e, r, t, n);
}
function rc(e) {
    e.textContent = '';
}
function xi(e, t, n, r, o, i, s) {
    for (; n != null; ) {
        let a = r[n.index],
            u = n.type;
        if (
            (s && t === 0 && (a && Me(se(a), r), (n.flags |= 2)),
            (n.flags & 32) !== 32)
        )
            if (u & 8) xi(e, t, n.child, r, o, i, !1), at(t, e, o, a, i);
            else if (u & 32) {
                let c = bi(n, r),
                    l;
                for (; (l = c()); ) at(t, e, o, l, i);
                at(t, e, o, a, i);
            } else u & 16 ? Kp(e, t, r, n, o, i) : at(t, e, o, a, i);
        n = s ? n.projectionNext : n.next;
    }
}
function gr(e, t, n, r, o, i) {
    xi(n, r, e.firstChild, t, o, i, !1);
}
function Kp(e, t, n, r, o, i) {
    let s = n[Z],
        u = s[ae].projection[r.projection];
    if (Array.isArray(u))
        for (let c = 0; c < u.length; c++) {
            let l = u[c];
            at(t, e, o, l, i);
        }
    else {
        let c = u,
            l = s[R];
        kn(r) && (c.flags |= 128), xi(e, t, c, l, o, i, !0);
    }
}
function Jp(e, t, n, r, o) {
    let i = n[ve],
        s = se(n);
    i !== s && at(t, e, r, i, o);
    for (let a = G; a < n.length; a++) {
        let u = n[a];
        gr(u[y], u, e, t, r, i);
    }
}
function Xp(e, t, n, r, o) {
    if (t) o ? e.addClass(n, r) : e.removeClass(n, r);
    else {
        let i = r.indexOf('-') === -1 ? void 0 : zn.DashCase;
        o == null
            ? e.removeStyle(n, r, i)
            : (typeof o == 'string' &&
                  o.endsWith('!important') &&
                  ((o = o.slice(0, -10)), (i |= zn.Important)),
              e.setStyle(n, r, o, i));
    }
}
function eh(e, t, n) {
    e.setAttribute(t, 'style', n);
}
function oc(e, t, n) {
    n === '' ? e.removeAttribute(t, 'class') : e.setAttribute(t, 'class', n);
}
function ic(e, t, n) {
    let { mergedAttrs: r, classes: o, styles: i } = n;
    r !== null && ao(e, t, r),
        o !== null && oc(e, t, o),
        i !== null && eh(e, t, i);
}
var pe = {};
function WC(e = 1) {
    sc(L(), _(), Ye() + e, !1);
}
function sc(e, t, n, r) {
    if (!r)
        if ((t[g] & 3) === 3) {
            let i = e.preOrderCheckHooks;
            i !== null && Tn(t, i, n);
        } else {
            let i = e.preOrderHooks;
            i !== null && Sn(t, i, 0, n);
        }
    Be(n);
}
function J(e, t = I.Default) {
    let n = _();
    if (n === null) return z(e, t);
    let r = K();
    return Vu(r, n, V(e), t);
}
function qC() {
    let e = 'invalid';
    throw new Error(e);
}
function ac(e, t, n, r, o, i) {
    let s = j(null);
    try {
        let a = null;
        o & Le.SignalBased && (a = t[r][ns]),
            a !== null && a.transformFn !== void 0 && (i = a.transformFn(i)),
            o & Le.HasDecoratorInputTransform &&
                (i = e.inputTransforms[r].call(t, i)),
            e.setInput !== null ? e.setInput(t, a, i, n, r) : Tu(t, a, r, i);
    } finally {
        j(s);
    }
}
function th(e, t) {
    let n = e.hostBindingOpCodes;
    if (n !== null)
        try {
            for (let r = 0; r < n.length; r++) {
                let o = n[r];
                if (o < 0) Be(~o);
                else {
                    let i = o,
                        s = n[++r],
                        a = n[++r];
                    Qd(s, i);
                    let u = t[i];
                    a(2, u);
                }
            }
        } finally {
            Be(-1);
        }
}
function mr(e, t, n, r, o, i, s, a, u, c, l) {
    let d = t.blueprint.slice();
    return (
        (d[q] = o),
        (d[g] = r | 4 | 128 | 8 | 64),
        (c !== null || (e && e[g] & 2048)) && (d[g] |= 2048),
        $a(d),
        (d[R] = d[gt] = e),
        (d[de] = n),
        (d[ye] = s || (e && e[ye])),
        (d[A] = a || (e && e[A])),
        (d[ct] = u || (e && e[ct]) || null),
        (d[ae] = i),
        (d[rr] = Np()),
        (d[me] = l),
        (d[Ra] = c),
        (d[Z] = t.type == 2 ? e[Z] : d),
        d
    );
}
function Yt(e, t, n, r, o) {
    let i = e.data[t];
    if (i === null) (i = nh(e, t, n, r, o)), qd() && (i.flags |= 32);
    else if (i.type & 64) {
        (i.type = n), (i.value = r), (i.attrs = o);
        let s = Gd();
        i.injectorIndex = s === null ? -1 : s.injectorIndex;
    }
    return Qe(i, !0), i;
}
function nh(e, t, n, r, o) {
    let i = Ua(),
        s = ai(),
        a = s ? i : i && i.parent,
        u = (e.data[t] = ch(e, a, n, t, r, o));
    return (
        e.firstChild === null && (e.firstChild = u),
        i !== null &&
            (s
                ? i.child == null && u.parent !== null && (i.child = u)
                : i.next === null && ((i.next = u), (u.prev = i))),
        u
    );
}
function uc(e, t, n, r) {
    if (n === 0) return -1;
    let o = t.length;
    for (let i = 0; i < n; i++)
        t.push(r), e.blueprint.push(r), e.data.push(null);
    return o;
}
function cc(e, t, n, r, o) {
    let i = Ye(),
        s = r & 2;
    try {
        Be(-1), s && t.length > k && sc(e, t, k, !1), ce(s ? 2 : 0, o), n(r, o);
    } finally {
        Be(i), ce(s ? 3 : 1, o);
    }
}
function Ti(e, t, n) {
    if (oi(t)) {
        let r = j(null);
        try {
            let o = t.directiveStart,
                i = t.directiveEnd;
            for (let s = o; s < i; s++) {
                let a = e.data[s];
                if (a.contentQueries) {
                    let u = n[s];
                    a.contentQueries(1, u, s);
                }
            }
        } finally {
            j(r);
        }
    }
}
function Si(e, t, n) {
    Ha() && (mh(e, t, n, Q(n, t)), (n.flags & 64) === 64 && pc(e, t, n));
}
function Ai(e, t, n = Q) {
    let r = t.localNames;
    if (r !== null) {
        let o = t.index + 1;
        for (let i = 0; i < r.length; i += 2) {
            let s = r[i + 1],
                a = s === -1 ? n(t, e) : e[s];
            e[o++] = a;
        }
    }
}
function lc(e) {
    let t = e.tView;
    return t === null || t.incompleteFirstPass
        ? (e.tView = Ni(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts,
              e.id,
          ))
        : t;
}
function Ni(e, t, n, r, o, i, s, a, u, c, l) {
    let d = k + r,
        f = d + o,
        p = rh(d, f),
        h = typeof c == 'function' ? c() : c;
    return (p[y] = {
        type: e,
        blueprint: p,
        template: n,
        queries: null,
        viewQuery: a,
        declTNode: t,
        data: p.slice().fill(null, d),
        bindingStartIndex: d,
        expandoStartIndex: f,
        hostBindingOpCodes: null,
        firstCreatePass: !0,
        firstUpdatePass: !0,
        staticViewQueries: !1,
        staticContentQueries: !1,
        preOrderHooks: null,
        preOrderCheckHooks: null,
        contentHooks: null,
        contentCheckHooks: null,
        viewHooks: null,
        viewCheckHooks: null,
        destroyHooks: null,
        cleanup: null,
        contentQueries: null,
        components: null,
        directiveRegistry: typeof i == 'function' ? i() : i,
        pipeRegistry: typeof s == 'function' ? s() : s,
        firstChild: null,
        schemas: u,
        consts: h,
        incompleteFirstPass: !1,
        ssrId: l,
    });
}
function rh(e, t) {
    let n = [];
    for (let r = 0; r < t; r++) n.push(r < e ? null : pe);
    return n;
}
function oh(e, t, n, r) {
    let i = r.get(zu, Gu) || n === Nt.ShadowDom,
        s = e.selectRootElement(t, i);
    return ih(s), s;
}
function ih(e) {
    dc(e);
}
var dc = () => null;
function sh(e) {
    ou(e) ? rc(e) : $f(e);
}
function ah() {
    dc = sh;
}
function uh(e, t, n, r) {
    let o = mc(t);
    o.push(n), e.firstCreatePass && yc(e).push(r, o.length - 1);
}
function ch(e, t, n, r, o, i) {
    let s = t ? t.injectorIndex : -1,
        a = 0;
    return (
        Wt() && (a |= 128),
        {
            type: n,
            index: r,
            insertBeforeIndex: null,
            injectorIndex: s,
            directiveStart: -1,
            directiveEnd: -1,
            directiveStylingLast: -1,
            componentOffset: -1,
            propertyBindings: null,
            flags: a,
            providerIndexes: 0,
            value: o,
            attrs: i,
            mergedAttrs: null,
            localNames: null,
            initialInputs: void 0,
            inputs: null,
            outputs: null,
            tView: null,
            next: null,
            prev: null,
            projectionNext: null,
            child: null,
            parent: t,
            projection: null,
            styles: null,
            stylesWithoutHost: null,
            residualStyles: void 0,
            classes: null,
            classesWithoutHost: null,
            residualClasses: void 0,
            classBindings: 0,
            styleBindings: 0,
        }
    );
}
function oa(e, t, n, r, o) {
    for (let i in t) {
        if (!t.hasOwnProperty(i)) continue;
        let s = t[i];
        if (s === void 0) continue;
        r ??= {};
        let a,
            u = Le.None;
        Array.isArray(s) ? ((a = s[0]), (u = s[1])) : (a = s);
        let c = i;
        if (o !== null) {
            if (!o.hasOwnProperty(i)) continue;
            c = o[i];
        }
        e === 0 ? ia(r, n, c, a, u) : ia(r, n, c, a);
    }
    return r;
}
function ia(e, t, n, r, o) {
    let i;
    e.hasOwnProperty(n) ? (i = e[n]).push(t, r) : (i = e[n] = [t, r]),
        o !== void 0 && i.push(o);
}
function lh(e, t, n) {
    let r = t.directiveStart,
        o = t.directiveEnd,
        i = e.data,
        s = t.attrs,
        a = [],
        u = null,
        c = null;
    for (let l = r; l < o; l++) {
        let d = i[l],
            f = n ? n.get(d) : null,
            p = f ? f.inputs : null,
            h = f ? f.outputs : null;
        (u = oa(0, d.inputs, l, u, p)), (c = oa(1, d.outputs, l, c, h));
        let E = u !== null && s !== null && !_a(t) ? xh(u, l, s) : null;
        a.push(E);
    }
    u !== null &&
        (u.hasOwnProperty('class') && (t.flags |= 8),
        u.hasOwnProperty('style') && (t.flags |= 16)),
        (t.initialInputs = a),
        (t.inputs = u),
        (t.outputs = c);
}
function dh(e) {
    return e === 'class'
        ? 'className'
        : e === 'for'
          ? 'htmlFor'
          : e === 'formaction'
            ? 'formAction'
            : e === 'innerHtml'
              ? 'innerHTML'
              : e === 'readonly'
                ? 'readOnly'
                : e === 'tabindex'
                  ? 'tabIndex'
                  : e;
}
function fh(e, t, n, r, o, i, s, a) {
    let u = Q(t, n),
        c = t.inputs,
        l;
    !a && c != null && (l = c[r])
        ? (Fi(e, n, l, r, o), zt(t) && ph(n, t.index))
        : t.type & 3
          ? ((r = dh(r)),
            (o = s != null ? s(o, t.value || '', r) : o),
            i.setProperty(u, r, o))
          : t.type & 12;
}
function ph(e, t) {
    let n = qe(t, e);
    n[g] & 16 || (n[g] |= 64);
}
function Oi(e, t, n, r) {
    if (Ha()) {
        let o = r === null ? null : { '': -1 },
            i = Dh(e, n),
            s,
            a;
        i === null ? (s = a = null) : ([s, a] = i),
            s !== null && fc(e, t, n, s, o, a),
            o && vh(n, r, o);
    }
    n.mergedAttrs = ni(n.mergedAttrs, n.attrs);
}
function fc(e, t, n, r, o, i) {
    for (let c = 0; c < r.length; c++) Co(Un(n, t), e, r[c].type);
    Ih(n, e.data.length, r.length);
    for (let c = 0; c < r.length; c++) {
        let l = r[c];
        l.providersResolver && l.providersResolver(l);
    }
    let s = !1,
        a = !1,
        u = uc(e, t, r.length, null);
    for (let c = 0; c < r.length; c++) {
        let l = r[c];
        (n.mergedAttrs = ni(n.mergedAttrs, l.hostAttrs)),
            Eh(e, n, t, u, l),
            wh(u, l, o),
            l.contentQueries !== null && (n.flags |= 4),
            (l.hostBindings !== null ||
                l.hostAttrs !== null ||
                l.hostVars !== 0) &&
                (n.flags |= 64);
        let d = l.type.prototype;
        !s &&
            (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
            ((e.preOrderHooks ??= []).push(n.index), (s = !0)),
            !a &&
                (d.ngOnChanges || d.ngDoCheck) &&
                ((e.preOrderCheckHooks ??= []).push(n.index), (a = !0)),
            u++;
    }
    lh(e, n, i);
}
function hh(e, t, n, r, o) {
    let i = o.hostBindings;
    if (i) {
        let s = e.hostBindingOpCodes;
        s === null && (s = e.hostBindingOpCodes = []);
        let a = ~t.index;
        gh(s) != a && s.push(a), s.push(n, r, i);
    }
}
function gh(e) {
    let t = e.length;
    for (; t > 0; ) {
        let n = e[--t];
        if (typeof n == 'number' && n < 0) return n;
    }
    return 0;
}
function mh(e, t, n, r) {
    let o = n.directiveStart,
        i = n.directiveEnd;
    zt(n) && Ch(t, n, e.data[o + n.componentOffset]),
        e.firstCreatePass || Un(n, t),
        Me(r, t);
    let s = n.initialInputs;
    for (let a = o; a < i; a++) {
        let u = e.data[a],
            c = Ue(t, e, a, n);
        if ((Me(c, t), s !== null && _h(t, a - o, c, u, n, s), mt(u))) {
            let l = qe(n.index, t);
            l[de] = Ue(t, e, a, n);
        }
    }
}
function pc(e, t, n) {
    let r = n.directiveStart,
        o = n.directiveEnd,
        i = n.index,
        s = Yd();
    try {
        Be(i);
        for (let a = r; a < o; a++) {
            let u = e.data[a],
                c = t[a];
            co(a),
                (u.hostBindings !== null ||
                    u.hostVars !== 0 ||
                    u.hostAttrs !== null) &&
                    yh(u, c);
        }
    } finally {
        Be(-1), co(s);
    }
}
function yh(e, t) {
    e.hostBindings !== null && e.hostBindings(1, t);
}
function Dh(e, t) {
    let n = e.directiveRegistry,
        r = null,
        o = null;
    if (n)
        for (let i = 0; i < n.length; i++) {
            let s = n[i];
            if (wd(t, s.selectors, !1))
                if ((r || (r = []), mt(s)))
                    if (s.findHostDirectiveDefs !== null) {
                        let a = [];
                        (o = o || new Map()),
                            s.findHostDirectiveDefs(s, a, o),
                            r.unshift(...a, s);
                        let u = a.length;
                        xo(e, t, u);
                    } else r.unshift(s), xo(e, t, 0);
                else
                    (o = o || new Map()),
                        s.findHostDirectiveDefs?.(s, r, o),
                        r.push(s);
        }
    return r === null ? null : [r, o];
}
function xo(e, t, n) {
    (t.componentOffset = n), (e.components ??= []).push(t.index);
}
function vh(e, t, n) {
    if (t) {
        let r = (e.localNames = []);
        for (let o = 0; o < t.length; o += 2) {
            let i = n[t[o + 1]];
            if (i == null) throw new C(-301, !1);
            r.push(t[o], i);
        }
    }
}
function wh(e, t, n) {
    if (n) {
        if (t.exportAs)
            for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
        mt(t) && (n[''] = e);
    }
}
function Ih(e, t, n) {
    (e.flags |= 1),
        (e.directiveStart = t),
        (e.directiveEnd = t + n),
        (e.providerIndexes = t);
}
function Eh(e, t, n, r, o) {
    e.data[r] = o;
    let i = o.factory || (o.factory = $e(o.type, !0)),
        s = new He(i, mt(o), J);
    (e.blueprint[r] = s), (n[r] = s), hh(e, t, r, uc(e, n, o.hostVars, pe), o);
}
function Ch(e, t, n) {
    let r = Q(t, e),
        o = lc(n),
        i = e[ye].rendererFactory,
        s = 16;
    n.signals ? (s = 4096) : n.onPush && (s = 64);
    let a = yr(
        e,
        mr(e, o, null, s, r, t, null, i.createRenderer(r, n), null, null, null),
    );
    e[t.index] = a;
}
function bh(e, t, n, r, o, i) {
    let s = Q(e, t);
    Mh(t[A], s, i, e.value, n, r, o);
}
function Mh(e, t, n, r, o, i, s) {
    if (i == null) e.removeAttribute(t, o, n);
    else {
        let a = s == null ? ur(i) : s(i, r || '', o);
        e.setAttribute(t, o, a, n);
    }
}
function _h(e, t, n, r, o, i) {
    let s = i[t];
    if (s !== null)
        for (let a = 0; a < s.length; ) {
            let u = s[a++],
                c = s[a++],
                l = s[a++],
                d = s[a++];
            ac(r, n, u, c, l, d);
        }
}
function xh(e, t, n) {
    let r = null,
        o = 0;
    for (; o < n.length; ) {
        let i = n[o];
        if (i === 0) {
            o += 4;
            continue;
        } else if (i === 5) {
            o += 2;
            continue;
        }
        if (typeof i == 'number') break;
        if (e.hasOwnProperty(i)) {
            r === null && (r = []);
            let s = e[i];
            for (let a = 0; a < s.length; a += 3)
                if (s[a] === t) {
                    r.push(i, s[a + 1], s[a + 2], n[o + 1]);
                    break;
                }
        }
        o += 2;
    }
    return r;
}
function hc(e, t, n, r) {
    return [e, !0, 0, t, null, r, null, n, null, null];
}
function gc(e, t) {
    let n = e.contentQueries;
    if (n !== null) {
        let r = j(null);
        try {
            for (let o = 0; o < n.length; o += 2) {
                let i = n[o],
                    s = n[o + 1];
                if (s !== -1) {
                    let a = e.data[s];
                    ci(i), a.contentQueries(2, t[s], s);
                }
            }
        } finally {
            j(r);
        }
    }
}
function yr(e, t) {
    return e[Rt] ? (e[zs][ie] = t) : (e[Rt] = t), (e[zs] = t), t;
}
function To(e, t, n) {
    ci(0);
    let r = j(null);
    try {
        t(e, n);
    } finally {
        j(r);
    }
}
function mc(e) {
    return e[Ft] || (e[Ft] = []);
}
function yc(e) {
    return e.cleanup || (e.cleanup = []);
}
function Dc(e, t) {
    let n = e[ct],
        r = n ? n.get(pt, null) : null;
    r && r.handleError(t);
}
function Fi(e, t, n, r, o) {
    for (let i = 0; i < n.length; ) {
        let s = n[i++],
            a = n[i++],
            u = n[i++],
            c = t[s],
            l = e.data[s];
        ac(l, c, r, a, u, o);
    }
}
function Th(e, t, n) {
    let r = ja(t, e);
    kp(e[A], r, n);
}
function Sh(e, t) {
    let n = qe(t, e),
        r = n[y];
    Ah(r, n);
    let o = n[q];
    o !== null && n[me] === null && (n[me] = Di(o, n[ct])), Ri(r, n, n[de]);
}
function Ah(e, t) {
    for (let n = t.length; n < e.blueprint.length; n++) t.push(e.blueprint[n]);
}
function Ri(e, t, n) {
    li(t);
    try {
        let r = e.viewQuery;
        r !== null && To(1, r, n);
        let o = e.template;
        o !== null && cc(e, t, o, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            t[De]?.finishViewCreation(e),
            e.staticContentQueries && gc(e, t),
            e.staticViewQueries && To(2, e.viewQuery, n);
        let i = e.components;
        i !== null && Nh(t, i);
    } catch (r) {
        throw (
            (e.firstCreatePass &&
                ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            r)
        );
    } finally {
        (t[g] &= -5), di();
    }
}
function Nh(e, t) {
    for (let n = 0; n < t.length; n++) Sh(e, t[n]);
}
function Oh(e, t, n, r) {
    let o = t.tView,
        s = e[g] & 4096 ? 4096 : 16,
        a = mr(
            e,
            o,
            n,
            s,
            null,
            t,
            null,
            null,
            null,
            r?.injector ?? null,
            r?.dehydratedView ?? null,
        ),
        u = e[t.index];
    a[Gt] = u;
    let c = e[De];
    return c !== null && (a[De] = c.createEmbeddedView(o)), Ri(o, a, n), a;
}
function sa(e, t) {
    return !t || t.firstChild === null || kn(e);
}
function Fh(e, t, n, r = !0) {
    let o = t[y];
    if ((Bp(o, t, e, n), r)) {
        let s = _o(n, e),
            a = t[A],
            u = _i(a, e[ve]);
        u !== null && jp(o, e[ae], a, t, u, s);
    }
    let i = t[me];
    i !== null && i.firstChild !== null && (i.firstChild = null);
}
function qn(e, t, n, r, o = !1) {
    for (; n !== null; ) {
        let i = t[n.index];
        i !== null && r.push(se(i)), fe(i) && Rh(i, r);
        let s = n.type;
        if (s & 8) qn(e, t, n.child, r);
        else if (s & 32) {
            let a = bi(n, t),
                u;
            for (; (u = a()); ) r.push(u);
        } else if (s & 16) {
            let a = tc(t, n);
            if (Array.isArray(a)) r.push(...a);
            else {
                let u = Lt(t[Z]);
                qn(u[y], u, a, r, !0);
            }
        }
        n = o ? n.projectionNext : n.next;
    }
    return r;
}
function Rh(e, t) {
    for (let n = G; n < e.length; n++) {
        let r = e[n],
            o = r[y].firstChild;
        o !== null && qn(r[y], r, o, t);
    }
    e[ve] !== e[q] && t.push(e[ve]);
}
var vc = [];
function Ph(e) {
    return e[Ve] ?? kh(e);
}
function kh(e) {
    let t = vc.pop() ?? Object.create(jh);
    return (t.lView = e), t;
}
function Lh(e) {
    e.lView[Ve] !== e && ((e.lView = null), vc.push(e));
}
var jh = Et(It({}, rs), {
    consumerIsAlwaysLive: !0,
    consumerMarkedDirty: (e) => {
        kt(e.lView);
    },
    consumerOnSignalRead() {
        this.lView[Ve] = this;
    },
});
function wc(e) {
    return Ec(e[Rt]);
}
function Ic(e) {
    return Ec(e[ie]);
}
function Ec(e) {
    for (; e !== null && !fe(e); ) e = e[ie];
    return e;
}
var Cc = 100;
function bc(e, t = !0, n = 0) {
    let r = e[ye],
        o = r.rendererFactory,
        i = !1;
    i || o.begin?.();
    try {
        Vh(e, n);
    } catch (s) {
        throw (t && Dc(e, s), s);
    } finally {
        i || (o.end?.(), r.inlineEffectRunner?.flush());
    }
}
function Vh(e, t) {
    So(e, t);
    let n = 0;
    for (; si(e); ) {
        if (n === Cc) throw new C(103, !1);
        n++, So(e, 1);
    }
}
function Bh(e, t, n, r) {
    let o = t[g];
    if ((o & 256) === 256) return;
    let i = !1;
    !i && t[ye].inlineEffectRunner?.flush(), li(t);
    let s = null,
        a = null;
    !i && $h(e) && ((a = Ph(t)), (s = os(a)));
    try {
        $a(t), Wd(e.bindingStartIndex), n !== null && cc(e, t, n, 2, r);
        let u = (o & 3) === 3;
        if (!i)
            if (u) {
                let d = e.preOrderCheckHooks;
                d !== null && Tn(t, d, null);
            } else {
                let d = e.preOrderHooks;
                d !== null && Sn(t, d, 0, null), Wr(t, 0);
            }
        if ((Hh(t), Mc(t, 0), e.contentQueries !== null && gc(e, t), !i))
            if (u) {
                let d = e.contentCheckHooks;
                d !== null && Tn(t, d);
            } else {
                let d = e.contentHooks;
                d !== null && Sn(t, d, 1), Wr(t, 1);
            }
        th(e, t);
        let c = e.components;
        c !== null && xc(t, c, 0);
        let l = e.viewQuery;
        if ((l !== null && To(2, l, r), !i))
            if (u) {
                let d = e.viewCheckHooks;
                d !== null && Tn(t, d);
            } else {
                let d = e.viewHooks;
                d !== null && Sn(t, d, 2), Wr(t, 2);
            }
        if ((e.firstUpdatePass === !0 && (e.firstUpdatePass = !1), t[Hr])) {
            for (let d of t[Hr]) d();
            t[Hr] = null;
        }
        i || (t[g] &= -73);
    } catch (u) {
        throw (kt(t), u);
    } finally {
        a !== null && (is(a, s), Lh(a)), di();
    }
}
function $h(e) {
    return e.type !== 2;
}
function Mc(e, t) {
    for (let n = wc(e); n !== null; n = Ic(n))
        for (let r = G; r < n.length; r++) {
            let o = n[r];
            _c(o, t);
        }
}
function Hh(e) {
    for (let t = wc(e); t !== null; t = Ic(t)) {
        if (!(t[g] & ri.HasTransplantedViews)) continue;
        let n = t[lt];
        for (let r = 0; r < n.length; r++) {
            let o = n[r],
                i = o[R];
            Pd(o);
        }
    }
}
function Uh(e, t, n) {
    let r = qe(t, e);
    _c(r, n);
}
function _c(e, t) {
    ii(e) && So(e, t);
}
function So(e, t) {
    let r = e[y],
        o = e[g],
        i = e[Ve],
        s = !!(t === 0 && o & 16);
    if (
        ((s ||= !!(o & 64 && t === 0)),
        (s ||= !!(o & 1024)),
        (s ||= !!(i?.dirty && br(i))),
        i && (i.dirty = !1),
        (e[g] &= -9217),
        s)
    )
        Bh(r, e, r.template, e[de]);
    else if (o & 8192) {
        Mc(e, 1);
        let a = r.components;
        a !== null && xc(e, a, 1);
    }
}
function xc(e, t, n) {
    for (let r = 0; r < t.length; r++) Uh(e, t[r], n);
}
function Pi(e) {
    for (e[ye].changeDetectionScheduler?.notify(); e; ) {
        e[g] |= 64;
        let t = Lt(e);
        if (ka(e) && !t) return e;
        e = t;
    }
    return null;
}
var Ge = class {
        get rootNodes() {
            let t = this._lView,
                n = t[y];
            return qn(n, t, n.firstChild, []);
        }
        constructor(t, n, r = !0) {
            (this._lView = t),
                (this._cdRefInjectingView = n),
                (this.notifyErrorHandler = r),
                (this._appRef = null),
                (this._attachedToViewContainer = !1);
        }
        get context() {
            return this._lView[de];
        }
        set context(t) {
            this._lView[de] = t;
        }
        get destroyed() {
            return (this._lView[g] & 256) === 256;
        }
        destroy() {
            if (this._appRef) this._appRef.detachView(this);
            else if (this._attachedToViewContainer) {
                let t = this._lView[R];
                if (fe(t)) {
                    let n = t[Rn],
                        r = n ? n.indexOf(this) : -1;
                    r > -1 && (Mo(t, r), Pn(n, r));
                }
                this._attachedToViewContainer = !1;
            }
            Xu(this._lView[y], this._lView);
        }
        onDestroy(t) {
            Ld(this._lView, t);
        }
        markForCheck() {
            Pi(this._cdRefInjectingView || this._lView);
        }
        detach() {
            this._lView[g] &= -129;
        }
        reattach() {
            uo(this._lView), (this._lView[g] |= 128);
        }
        detectChanges() {
            (this._lView[g] |= 1024), bc(this._lView, this.notifyErrorHandler);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
            if (this._appRef) throw new C(902, !1);
            this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
            (this._appRef = null), Ku(this._lView[y], this._lView);
        }
        attachToAppRef(t) {
            if (this._attachedToViewContainer) throw new C(902, !1);
            (this._appRef = t), uo(this._lView);
        }
    },
    ze = (() => {
        let t = class t {};
        t.__NG_ELEMENT_ID__ = Wh;
        let e = t;
        return e;
    })(),
    Gh = ze,
    zh = class extends Gh {
        constructor(t, n, r) {
            super(),
                (this._declarationLView = t),
                (this._declarationTContainer = n),
                (this.elementRef = r);
        }
        get ssrId() {
            return this._declarationTContainer.tView?.ssrId || null;
        }
        createEmbeddedView(t, n) {
            return this.createEmbeddedViewImpl(t, n);
        }
        createEmbeddedViewImpl(t, n, r) {
            let o = Oh(this._declarationLView, this._declarationTContainer, t, {
                injector: n,
                dehydratedView: r,
            });
            return new Ge(o);
        }
    };
function Wh() {
    return Dr(K(), _());
}
function Dr(e, t) {
    return e.type & 4 ? new zh(t, e, yt(e, t)) : null;
}
function Tc(e) {
    let t = e[Pt] ?? [],
        r = e[R][A];
    for (let o of t) qh(o, r);
    e[Pt] = U;
}
function qh(e, t) {
    let n = 0,
        r = e.firstChild;
    if (r) {
        let o = e.data[jn];
        for (; n < o; ) {
            let i = r.nextSibling;
            nc(t, r, !1), (r = i), n++;
        }
    }
}
function Sc(e) {
    Tc(e);
    for (let t = G; t < e.length; t++) Qn(e[t]);
}
function Qn(e) {
    let t = e[y];
    for (let n = k; n < t.bindingStartIndex; n++)
        if (fe(e[n])) {
            let r = e[n];
            Sc(r);
        } else Ce(e[n]) && Qn(e[n]);
}
function Qh(e) {
    let t = e._views;
    for (let n of t) {
        let r = Vf(n);
        if (r !== null && r[q] !== null)
            if (Ce(r)) Qn(r);
            else {
                let o = r[q];
                Qn(o), Sc(r);
            }
    }
}
var Yh = new RegExp(`^(\\d+)*(${hu}|${pu})*(.*)`);
function Zh(e) {
    let t = e.match(Yh),
        [n, r, o, i] = t,
        s = r ? parseInt(r, 10) : o,
        a = [];
    for (let [u, c, l] of i.matchAll(/(f|n)(\d*)/g)) {
        let d = parseInt(l, 10) || 1;
        a.push(c, d);
    }
    return [s, ...a];
}
function Kh(e) {
    return !e.prev && e.parent?.type === 8;
}
function Zr(e) {
    return e.index - k;
}
function vr(e, t, n, r) {
    let o = null,
        i = Zr(r),
        s = e.data[Ff];
    if (s?.[i]) o = Xh(s[i], n);
    else if (t.firstChild === r) o = e.firstChild;
    else {
        let a = r.prev === null,
            u = r.prev ?? r.parent;
        if (Kh(r)) {
            let c = Zr(r.parent);
            o = yo(e, c);
        } else {
            let c = Q(u, n);
            if (a) o = c.firstChild;
            else {
                let l = Zr(u),
                    d = yo(e, l);
                if (u.type === 2 && d) {
                    let p = vi(e, l) + 1;
                    o = wr(p, d);
                } else o = c.nextSibling;
            }
        }
    }
    return o;
}
function wr(e, t) {
    let n = t;
    for (let r = 0; r < e; r++) n = n.nextSibling;
    return n;
}
function Jh(e, t) {
    let n = e;
    for (let r = 0; r < t.length; r += 2) {
        let o = t[r],
            i = t[r + 1];
        for (let s = 0; s < i; s++)
            switch (o) {
                case mo.FirstChild:
                    n = n.firstChild;
                    break;
                case mo.NextSibling:
                    n = n.nextSibling;
                    break;
            }
    }
    return n;
}
function Xh(e, t) {
    let [n, ...r] = Zh(e),
        o;
    if (n === pu) o = t[Z][q];
    else if (n === hu) o = Rp(t[Z][q]);
    else {
        let i = Number(n);
        o = se(t[i + k]);
    }
    return Jh(o, r);
}
function eg(e, t) {
    let n = [];
    for (let r of t)
        for (let o = 0; o < (r[gu] ?? 1); o++) {
            let i = { data: r, firstChild: null };
            r[jn] > 0 && ((i.firstChild = e), (e = wr(r[jn], e))), n.push(i);
        }
    return [e, n];
}
var Ac = () => null;
function tg(e, t) {
    let n = e[Pt];
    return !t || n === null || n.length === 0
        ? null
        : n[0].data[Of] === t
          ? n.shift()
          : (Tc(e), null);
}
function ng() {
    Ac = tg;
}
function aa(e, t) {
    return Ac(e, t);
}
var Ao = class {},
    No = class {},
    Yn = class {};
function rg(e) {
    let t = Error(`No component factory found for ${B(e)}.`);
    return (t[og] = e), t;
}
var og = 'ngComponent';
var Oo = class {
        resolveComponentFactory(t) {
            throw rg(t);
        }
    },
    Ir = (() => {
        let t = class t {};
        t.NULL = new Oo();
        let e = t;
        return e;
    })(),
    Fo = class {};
var ig = (() => {
        let t = class t {};
        t.ɵprov = N({ token: t, providedIn: 'root', factory: () => null });
        let e = t;
        return e;
    })(),
    Kr = {};
var ua = new Set();
function ki(e) {
    ua.has(e) ||
        (ua.add(e),
        performance?.mark?.('mark_feature_usage', { detail: { feature: e } }));
}
function Li(e) {
    let t = j(null);
    try {
        return e();
    } finally {
        j(t);
    }
}
function Nc(e) {
    return ag(e)
        ? Array.isArray(e) || (!(e instanceof Map) && Symbol.iterator in e)
        : !1;
}
function sg(e, t) {
    if (Array.isArray(e)) for (let n = 0; n < e.length; n++) t(e[n]);
    else {
        let n = e[Symbol.iterator](),
            r;
        for (; !(r = n.next()).done; ) t(r.value);
    }
}
function ag(e) {
    return e !== null && (typeof e == 'function' || typeof e == 'object');
}
var Ro = class {
        constructor() {}
        supports(t) {
            return Nc(t);
        }
        create(t) {
            return new Po(t);
        }
    },
    ug = (e, t) => t,
    Po = class {
        constructor(t) {
            (this.length = 0),
                (this._linkedRecords = null),
                (this._unlinkedRecords = null),
                (this._previousItHead = null),
                (this._itHead = null),
                (this._itTail = null),
                (this._additionsHead = null),
                (this._additionsTail = null),
                (this._movesHead = null),
                (this._movesTail = null),
                (this._removalsHead = null),
                (this._removalsTail = null),
                (this._identityChangesHead = null),
                (this._identityChangesTail = null),
                (this._trackByFn = t || ug);
        }
        forEachItem(t) {
            let n;
            for (n = this._itHead; n !== null; n = n._next) t(n);
        }
        forEachOperation(t) {
            let n = this._itHead,
                r = this._removalsHead,
                o = 0,
                i = null;
            for (; n || r; ) {
                let s = !r || (n && n.currentIndex < ca(r, o, i)) ? n : r,
                    a = ca(s, o, i),
                    u = s.currentIndex;
                if (s === r) o--, (r = r._nextRemoved);
                else if (((n = n._next), s.previousIndex == null)) o++;
                else {
                    i || (i = []);
                    let c = a - o,
                        l = u - o;
                    if (c != l) {
                        for (let f = 0; f < c; f++) {
                            let p = f < i.length ? i[f] : (i[f] = 0),
                                h = p + f;
                            l <= h && h < c && (i[f] = p + 1);
                        }
                        let d = s.previousIndex;
                        i[d] = l - c;
                    }
                }
                a !== u && t(s, a, u);
            }
        }
        forEachPreviousItem(t) {
            let n;
            for (n = this._previousItHead; n !== null; n = n._nextPrevious)
                t(n);
        }
        forEachAddedItem(t) {
            let n;
            for (n = this._additionsHead; n !== null; n = n._nextAdded) t(n);
        }
        forEachMovedItem(t) {
            let n;
            for (n = this._movesHead; n !== null; n = n._nextMoved) t(n);
        }
        forEachRemovedItem(t) {
            let n;
            for (n = this._removalsHead; n !== null; n = n._nextRemoved) t(n);
        }
        forEachIdentityChange(t) {
            let n;
            for (
                n = this._identityChangesHead;
                n !== null;
                n = n._nextIdentityChange
            )
                t(n);
        }
        diff(t) {
            if ((t == null && (t = []), !Nc(t))) throw new C(900, !1);
            return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
            this._reset();
            let n = this._itHead,
                r = !1,
                o,
                i,
                s;
            if (Array.isArray(t)) {
                this.length = t.length;
                for (let a = 0; a < this.length; a++)
                    (i = t[a]),
                        (s = this._trackByFn(a, i)),
                        n === null || !Object.is(n.trackById, s)
                            ? ((n = this._mismatch(n, i, s, a)), (r = !0))
                            : (r && (n = this._verifyReinsertion(n, i, s, a)),
                              Object.is(n.item, i) ||
                                  this._addIdentityChange(n, i)),
                        (n = n._next);
            } else
                (o = 0),
                    sg(t, (a) => {
                        (s = this._trackByFn(o, a)),
                            n === null || !Object.is(n.trackById, s)
                                ? ((n = this._mismatch(n, a, s, o)), (r = !0))
                                : (r &&
                                      (n = this._verifyReinsertion(n, a, s, o)),
                                  Object.is(n.item, a) ||
                                      this._addIdentityChange(n, a)),
                            (n = n._next),
                            o++;
                    }),
                    (this.length = o);
            return this._truncate(n), (this.collection = t), this.isDirty;
        }
        get isDirty() {
            return (
                this._additionsHead !== null ||
                this._movesHead !== null ||
                this._removalsHead !== null ||
                this._identityChangesHead !== null
            );
        }
        _reset() {
            if (this.isDirty) {
                let t;
                for (
                    t = this._previousItHead = this._itHead;
                    t !== null;
                    t = t._next
                )
                    t._nextPrevious = t._next;
                for (t = this._additionsHead; t !== null; t = t._nextAdded)
                    t.previousIndex = t.currentIndex;
                for (
                    this._additionsHead = this._additionsTail = null,
                        t = this._movesHead;
                    t !== null;
                    t = t._nextMoved
                )
                    t.previousIndex = t.currentIndex;
                (this._movesHead = this._movesTail = null),
                    (this._removalsHead = this._removalsTail = null),
                    (this._identityChangesHead = this._identityChangesTail =
                        null);
            }
        }
        _mismatch(t, n, r, o) {
            let i;
            return (
                t === null
                    ? (i = this._itTail)
                    : ((i = t._prev), this._remove(t)),
                (t =
                    this._unlinkedRecords === null
                        ? null
                        : this._unlinkedRecords.get(r, null)),
                t !== null
                    ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                      this._reinsertAfter(t, i, o))
                    : ((t =
                          this._linkedRecords === null
                              ? null
                              : this._linkedRecords.get(r, o)),
                      t !== null
                          ? (Object.is(t.item, n) ||
                                this._addIdentityChange(t, n),
                            this._moveAfter(t, i, o))
                          : (t = this._addAfter(new ko(n, r), i, o))),
                t
            );
        }
        _verifyReinsertion(t, n, r, o) {
            let i =
                this._unlinkedRecords === null
                    ? null
                    : this._unlinkedRecords.get(r, null);
            return (
                i !== null
                    ? (t = this._reinsertAfter(i, t._prev, o))
                    : t.currentIndex != o &&
                      ((t.currentIndex = o), this._addToMoves(t, o)),
                t
            );
        }
        _truncate(t) {
            for (; t !== null; ) {
                let n = t._next;
                this._addToRemovals(this._unlink(t)), (t = n);
            }
            this._unlinkedRecords !== null && this._unlinkedRecords.clear(),
                this._additionsTail !== null &&
                    (this._additionsTail._nextAdded = null),
                this._movesTail !== null && (this._movesTail._nextMoved = null),
                this._itTail !== null && (this._itTail._next = null),
                this._removalsTail !== null &&
                    (this._removalsTail._nextRemoved = null),
                this._identityChangesTail !== null &&
                    (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, n, r) {
            this._unlinkedRecords !== null && this._unlinkedRecords.remove(t);
            let o = t._prevRemoved,
                i = t._nextRemoved;
            return (
                o === null ? (this._removalsHead = i) : (o._nextRemoved = i),
                i === null ? (this._removalsTail = o) : (i._prevRemoved = o),
                this._insertAfter(t, n, r),
                this._addToMoves(t, r),
                t
            );
        }
        _moveAfter(t, n, r) {
            return (
                this._unlink(t),
                this._insertAfter(t, n, r),
                this._addToMoves(t, r),
                t
            );
        }
        _addAfter(t, n, r) {
            return (
                this._insertAfter(t, n, r),
                this._additionsTail === null
                    ? (this._additionsTail = this._additionsHead = t)
                    : (this._additionsTail = this._additionsTail._nextAdded =
                          t),
                t
            );
        }
        _insertAfter(t, n, r) {
            let o = n === null ? this._itHead : n._next;
            return (
                (t._next = o),
                (t._prev = n),
                o === null ? (this._itTail = t) : (o._prev = t),
                n === null ? (this._itHead = t) : (n._next = t),
                this._linkedRecords === null &&
                    (this._linkedRecords = new Zn()),
                this._linkedRecords.put(t),
                (t.currentIndex = r),
                t
            );
        }
        _remove(t) {
            return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
            this._linkedRecords !== null && this._linkedRecords.remove(t);
            let n = t._prev,
                r = t._next;
            return (
                n === null ? (this._itHead = r) : (n._next = r),
                r === null ? (this._itTail = n) : (r._prev = n),
                t
            );
        }
        _addToMoves(t, n) {
            return (
                t.previousIndex === n ||
                    (this._movesTail === null
                        ? (this._movesTail = this._movesHead = t)
                        : (this._movesTail = this._movesTail._nextMoved = t)),
                t
            );
        }
        _addToRemovals(t) {
            return (
                this._unlinkedRecords === null &&
                    (this._unlinkedRecords = new Zn()),
                this._unlinkedRecords.put(t),
                (t.currentIndex = null),
                (t._nextRemoved = null),
                this._removalsTail === null
                    ? ((this._removalsTail = this._removalsHead = t),
                      (t._prevRemoved = null))
                    : ((t._prevRemoved = this._removalsTail),
                      (this._removalsTail = this._removalsTail._nextRemoved =
                          t)),
                t
            );
        }
        _addIdentityChange(t, n) {
            return (
                (t.item = n),
                this._identityChangesTail === null
                    ? (this._identityChangesTail = this._identityChangesHead =
                          t)
                    : (this._identityChangesTail =
                          this._identityChangesTail._nextIdentityChange =
                              t),
                t
            );
        }
    },
    ko = class {
        constructor(t, n) {
            (this.item = t),
                (this.trackById = n),
                (this.currentIndex = null),
                (this.previousIndex = null),
                (this._nextPrevious = null),
                (this._prev = null),
                (this._next = null),
                (this._prevDup = null),
                (this._nextDup = null),
                (this._prevRemoved = null),
                (this._nextRemoved = null),
                (this._nextAdded = null),
                (this._nextMoved = null),
                (this._nextIdentityChange = null);
        }
    },
    Lo = class {
        constructor() {
            (this._head = null), (this._tail = null);
        }
        add(t) {
            this._head === null
                ? ((this._head = this._tail = t),
                  (t._nextDup = null),
                  (t._prevDup = null))
                : ((this._tail._nextDup = t),
                  (t._prevDup = this._tail),
                  (t._nextDup = null),
                  (this._tail = t));
        }
        get(t, n) {
            let r;
            for (r = this._head; r !== null; r = r._nextDup)
                if (
                    (n === null || n <= r.currentIndex) &&
                    Object.is(r.trackById, t)
                )
                    return r;
            return null;
        }
        remove(t) {
            let n = t._prevDup,
                r = t._nextDup;
            return (
                n === null ? (this._head = r) : (n._nextDup = r),
                r === null ? (this._tail = n) : (r._prevDup = n),
                this._head === null
            );
        }
    },
    Zn = class {
        constructor() {
            this.map = new Map();
        }
        put(t) {
            let n = t.trackById,
                r = this.map.get(n);
            r || ((r = new Lo()), this.map.set(n, r)), r.add(t);
        }
        get(t, n) {
            let r = t,
                o = this.map.get(r);
            return o ? o.get(t, n) : null;
        }
        remove(t) {
            let n = t.trackById;
            return this.map.get(n).remove(t) && this.map.delete(n), t;
        }
        get isEmpty() {
            return this.map.size === 0;
        }
        clear() {
            this.map.clear();
        }
    };
function ca(e, t, n) {
    let r = e.previousIndex;
    if (r === null) return r;
    let o = 0;
    return n && r < n.length && (o = n[r]), r + t + o;
}
function la() {
    return new ji([new Ro()]);
}
var ji = (() => {
    let t = class t {
        constructor(r) {
            this.factories = r;
        }
        static create(r, o) {
            if (o != null) {
                let i = o.factories.slice();
                r = r.concat(i);
            }
            return new t(r);
        }
        static extend(r) {
            return {
                provide: t,
                useFactory: (o) => t.create(r, o || la()),
                deps: [[t, new zf(), new Gf()]],
            };
        }
        find(r) {
            let o = this.factories.find((i) => i.supports(r));
            if (o != null) return o;
            throw new C(901, !1);
        }
    };
    t.ɵprov = N({ token: t, providedIn: 'root', factory: la });
    let e = t;
    return e;
})();
var Vi = (() => {
    let t = class t {};
    t.__NG_ELEMENT_ID__ = cg;
    let e = t;
    return e;
})();
function cg(e) {
    return lg(K(), _(), (e & 16) === 16);
}
function lg(e, t, n) {
    if (zt(e) && !n) {
        let r = qe(e.index, t);
        return new Ge(r, r);
    } else if (e.type & 47) {
        let r = t[Z];
        return new Ge(r, t);
    }
    return null;
}
function da(...e) {}
function dg() {
    let e = typeof _n.requestAnimationFrame == 'function',
        t = _n[e ? 'requestAnimationFrame' : 'setTimeout'],
        n = _n[e ? 'cancelAnimationFrame' : 'clearTimeout'];
    if (typeof Zone < 'u' && t && n) {
        let r = t[Zone.__symbol__('OriginalDelegate')];
        r && (t = r);
        let o = n[Zone.__symbol__('OriginalDelegate')];
        o && (n = o);
    }
    return { nativeRequestAnimationFrame: t, nativeCancelAnimationFrame: n };
}
var Y = class e {
        constructor({
            enableLongStackTrace: t = !1,
            shouldCoalesceEventChangeDetection: n = !1,
            shouldCoalesceRunChangeDetection: r = !1,
        }) {
            if (
                ((this.hasPendingMacrotasks = !1),
                (this.hasPendingMicrotasks = !1),
                (this.isStable = !0),
                (this.onUnstable = new Pe(!1)),
                (this.onMicrotaskEmpty = new Pe(!1)),
                (this.onStable = new Pe(!1)),
                (this.onError = new Pe(!1)),
                typeof Zone > 'u')
            )
                throw new C(908, !1);
            Zone.assertZonePatched();
            let o = this;
            (o._nesting = 0),
                (o._outer = o._inner = Zone.current),
                Zone.TaskTrackingZoneSpec &&
                    (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())),
                t &&
                    Zone.longStackTraceZoneSpec &&
                    (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
                (o.shouldCoalesceEventChangeDetection = !r && n),
                (o.shouldCoalesceRunChangeDetection = r),
                (o.lastRequestAnimationFrameId = -1),
                (o.nativeRequestAnimationFrame =
                    dg().nativeRequestAnimationFrame),
                hg(o);
        }
        static isInAngularZone() {
            return (
                typeof Zone < 'u' && Zone.current.get('isAngularZone') === !0
            );
        }
        static assertInAngularZone() {
            if (!e.isInAngularZone()) throw new C(909, !1);
        }
        static assertNotInAngularZone() {
            if (e.isInAngularZone()) throw new C(909, !1);
        }
        run(t, n, r) {
            return this._inner.run(t, n, r);
        }
        runTask(t, n, r, o) {
            let i = this._inner,
                s = i.scheduleEventTask('NgZoneEvent: ' + o, t, fg, da, da);
            try {
                return i.runTask(s, n, r);
            } finally {
                i.cancelTask(s);
            }
        }
        runGuarded(t, n, r) {
            return this._inner.runGuarded(t, n, r);
        }
        runOutsideAngular(t) {
            return this._outer.run(t);
        }
    },
    fg = {};
function Bi(e) {
    if (e._nesting == 0 && !e.hasPendingMicrotasks && !e.isStable)
        try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
        } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
                try {
                    e.runOutsideAngular(() => e.onStable.emit(null));
                } finally {
                    e.isStable = !0;
                }
        }
}
function pg(e) {
    e.isCheckStableRunning ||
        e.lastRequestAnimationFrameId !== -1 ||
        ((e.lastRequestAnimationFrameId = e.nativeRequestAnimationFrame.call(
            _n,
            () => {
                e.fakeTopEventTask ||
                    (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                        'fakeTopEventTask',
                        () => {
                            (e.lastRequestAnimationFrameId = -1),
                                jo(e),
                                (e.isCheckStableRunning = !0),
                                Bi(e),
                                (e.isCheckStableRunning = !1);
                        },
                        void 0,
                        () => {},
                        () => {},
                    )),
                    e.fakeTopEventTask.invoke();
            },
        )),
        jo(e));
}
function hg(e) {
    let t = () => {
        pg(e);
    };
    e._inner = e._inner.fork({
        name: 'angular',
        properties: { isAngularZone: !0 },
        onInvokeTask: (n, r, o, i, s, a) => {
            if (gg(a)) return n.invokeTask(o, i, s, a);
            try {
                return fa(e), n.invokeTask(o, i, s, a);
            } finally {
                ((e.shouldCoalesceEventChangeDetection &&
                    i.type === 'eventTask') ||
                    e.shouldCoalesceRunChangeDetection) &&
                    t(),
                    pa(e);
            }
        },
        onInvoke: (n, r, o, i, s, a, u) => {
            try {
                return fa(e), n.invoke(o, i, s, a, u);
            } finally {
                e.shouldCoalesceRunChangeDetection && t(), pa(e);
            }
        },
        onHasTask: (n, r, o, i) => {
            n.hasTask(o, i),
                r === o &&
                    (i.change == 'microTask'
                        ? ((e._hasPendingMicrotasks = i.microTask),
                          jo(e),
                          Bi(e))
                        : i.change == 'macroTask' &&
                          (e.hasPendingMacrotasks = i.macroTask));
        },
        onHandleError: (n, r, o, i) => (
            n.handleError(o, i),
            e.runOutsideAngular(() => e.onError.emit(i)),
            !1
        ),
    });
}
function jo(e) {
    e._hasPendingMicrotasks ||
    ((e.shouldCoalesceEventChangeDetection ||
        e.shouldCoalesceRunChangeDetection) &&
        e.lastRequestAnimationFrameId !== -1)
        ? (e.hasPendingMicrotasks = !0)
        : (e.hasPendingMicrotasks = !1);
}
function fa(e) {
    e._nesting++, e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
}
function pa(e) {
    e._nesting--, Bi(e);
}
function gg(e) {
    return !Array.isArray(e) || e.length !== 1
        ? !1
        : e[0].data?.__ignore_ng_zone__ === !0;
}
var Oc = (() => {
    let t = class t {
        constructor() {
            (this.handler = null), (this.internalCallbacks = []);
        }
        execute() {
            this.executeInternalCallbacks(), this.handler?.execute();
        }
        executeInternalCallbacks() {
            let r = [...this.internalCallbacks];
            this.internalCallbacks.length = 0;
            for (let o of r) o();
        }
        ngOnDestroy() {
            this.handler?.destroy(),
                (this.handler = null),
                (this.internalCallbacks.length = 0);
        }
    };
    t.ɵprov = N({ token: t, providedIn: 'root', factory: () => new t() });
    let e = t;
    return e;
})();
function Kn(e, t, n) {
    let r = n ? e.styles : null,
        o = n ? e.classes : null,
        i = 0;
    if (t !== null)
        for (let s = 0; s < t.length; s++) {
            let a = t[s];
            if (typeof a == 'number') i = a;
            else if (i == 1) o = so(o, a);
            else if (i == 2) {
                let u = a,
                    c = t[++s];
                r = so(r, u + ': ' + c + ';');
            }
        }
    n ? (e.styles = r) : (e.stylesWithoutHost = r),
        n ? (e.classes = o) : (e.classesWithoutHost = o);
}
var Jn = class extends Ir {
    constructor(t) {
        super(), (this.ngModule = t);
    }
    resolveComponentFactory(t) {
        let n = je(t);
        return new $t(n, this.ngModule);
    }
};
function ha(e) {
    let t = [];
    for (let n in e) {
        if (!e.hasOwnProperty(n)) continue;
        let r = e[n];
        r !== void 0 &&
            t.push({ propName: Array.isArray(r) ? r[0] : r, templateName: n });
    }
    return t;
}
function mg(e) {
    let t = e.toLowerCase();
    return t === 'svg' ? La : t === 'math' ? Ad : null;
}
var Vo = class {
        constructor(t, n) {
            (this.injector = t), (this.parentInjector = n);
        }
        get(t, n, r) {
            r = cr(r);
            let o = this.injector.get(t, Kr, r);
            return o !== Kr || n === Kr ? o : this.parentInjector.get(t, n, r);
        }
    },
    $t = class extends Yn {
        get inputs() {
            let t = this.componentDef,
                n = t.inputTransforms,
                r = ha(t.inputs);
            if (n !== null)
                for (let o of r)
                    n.hasOwnProperty(o.propName) &&
                        (o.transform = n[o.propName]);
            return r;
        }
        get outputs() {
            return ha(this.componentDef.outputs);
        }
        constructor(t, n) {
            super(),
                (this.componentDef = t),
                (this.ngModule = n),
                (this.componentType = t.type),
                (this.selector = bd(t.selectors)),
                (this.ngContentSelectors = t.ngContentSelectors
                    ? t.ngContentSelectors
                    : []),
                (this.isBoundToModule = !!n);
        }
        create(t, n, r, o) {
            o = o || this.ngModule;
            let i = o instanceof be ? o : o?.injector;
            i &&
                this.componentDef.getStandaloneInjector !== null &&
                (i = this.componentDef.getStandaloneInjector(i) || i);
            let s = i ? new Vo(t, i) : t,
                a = s.get(Fo, null);
            if (a === null) throw new C(407, !1);
            let u = s.get(ig, null),
                c = s.get(Oc, null),
                l = s.get(Ao, null),
                d = {
                    rendererFactory: a,
                    sanitizer: u,
                    inlineEffectRunner: null,
                    afterRenderEventManager: c,
                    changeDetectionScheduler: l,
                },
                f = a.createRenderer(null, this.componentDef),
                p = this.componentDef.selectors[0][0] || 'div',
                h = r
                    ? oh(f, r, this.componentDef.encapsulation, s)
                    : Mi(f, p, mg(p)),
                E = 512;
            this.componentDef.signals
                ? (E |= 4096)
                : this.componentDef.onPush || (E |= 16);
            let P = null;
            h !== null && (P = Di(h, s, !0));
            let S = Ni(0, null, null, 1, 0, null, null, null, null, null, null),
                X = mr(null, S, null, E, null, null, d, f, s, null, P);
            li(X);
            let he, ee;
            try {
                let te = this.componentDef,
                    ue,
                    wt = null;
                te.findHostDirectiveDefs
                    ? ((ue = []),
                      (wt = new Map()),
                      te.findHostDirectiveDefs(te, ue, wt),
                      ue.push(te))
                    : (ue = [te]);
                let Dl = yg(X, h),
                    vl = Dg(Dl, h, te, ue, X, d, f);
                (ee = Va(S, k)),
                    h && Ig(f, te, h, r),
                    n !== void 0 && Eg(ee, this.ngContentSelectors, n),
                    (he = wg(vl, te, ue, wt, X, [Cg])),
                    Ri(S, X, null);
            } finally {
                di();
            }
            return new Bo(this.componentType, he, yt(ee, X), X, ee);
        }
    },
    Bo = class extends No {
        constructor(t, n, r, o, i) {
            super(),
                (this.location = r),
                (this._rootLView = o),
                (this._tNode = i),
                (this.previousInputValues = null),
                (this.instance = n),
                (this.hostView = this.changeDetectorRef =
                    new Ge(o, void 0, !1)),
                (this.componentType = t);
        }
        setInput(t, n) {
            let r = this._tNode.inputs,
                o;
            if (r !== null && (o = r[t])) {
                if (
                    ((this.previousInputValues ??= new Map()),
                    this.previousInputValues.has(t) &&
                        Object.is(this.previousInputValues.get(t), n))
                )
                    return;
                let i = this._rootLView;
                Fi(i[y], i, o, t, n), this.previousInputValues.set(t, n);
                let s = qe(this._tNode.index, i);
                Pi(s);
            }
        }
        get injector() {
            return new ke(this._tNode, this._rootLView);
        }
        destroy() {
            this.hostView.destroy();
        }
        onDestroy(t) {
            this.hostView.onDestroy(t);
        }
    };
function yg(e, t) {
    let n = e[y],
        r = k;
    return (e[r] = t), Yt(n, r, 2, '#host', null);
}
function Dg(e, t, n, r, o, i, s) {
    let a = o[y];
    vg(r, e, t, s);
    let u = null;
    t !== null && (u = Di(t, o[ct]));
    let c = i.rendererFactory.createRenderer(t, n),
        l = 16;
    n.signals ? (l = 4096) : n.onPush && (l = 64);
    let d = mr(o, lc(n), null, l, o[e.index], e, i, c, null, null, u);
    return (
        a.firstCreatePass && xo(a, e, r.length - 1), yr(o, d), (o[e.index] = d)
    );
}
function vg(e, t, n, r) {
    for (let o of e) t.mergedAttrs = ni(t.mergedAttrs, o.hostAttrs);
    t.mergedAttrs !== null &&
        (Kn(t, t.mergedAttrs, !0), n !== null && ic(r, n, t));
}
function wg(e, t, n, r, o, i) {
    let s = K(),
        a = o[y],
        u = Q(s, o);
    fc(a, o, s, n, null, r);
    for (let l = 0; l < n.length; l++) {
        let d = s.directiveStart + l,
            f = Ue(o, a, d, s);
        Me(f, o);
    }
    pc(a, o, s), u && Me(u, o);
    let c = Ue(o, a, s.directiveStart + s.componentOffset, s);
    if (((e[de] = o[de] = c), i !== null)) for (let l of i) l(c, t);
    return Ti(a, s, o), c;
}
function Ig(e, t, n, r) {
    if (r) ao(e, n, ['ng-version', '17.2.3']);
    else {
        let { attrs: o, classes: i } = Md(t.selectors[0]);
        o && ao(e, n, o), i && i.length > 0 && oc(e, n, i.join(' '));
    }
}
function Eg(e, t, n) {
    let r = (e.projection = []);
    for (let o = 0; o < t.length; o++) {
        let i = n[o];
        r.push(i != null ? Array.from(i) : null);
    }
}
function Cg() {
    let e = K();
    fr(_()[y], e);
}
var Ze = (() => {
    let t = class t {};
    t.__NG_ELEMENT_ID__ = bg;
    let e = t;
    return e;
})();
function bg() {
    let e = K();
    return Rc(e, _());
}
var Mg = Ze,
    Fc = class extends Mg {
        constructor(t, n, r) {
            super(),
                (this._lContainer = t),
                (this._hostTNode = n),
                (this._hostLView = r);
        }
        get element() {
            return yt(this._hostTNode, this._hostLView);
        }
        get injector() {
            return new ke(this._hostTNode, this._hostLView);
        }
        get parentInjector() {
            let t = Ci(this._hostTNode, this._hostLView);
            if (Fu(t)) {
                let n = $n(t, this._hostLView),
                    r = Bn(t),
                    o = n[y].data[r + 8];
                return new ke(o, n);
            } else return new ke(null, this._hostLView);
        }
        clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
        }
        get(t) {
            let n = ga(this._lContainer);
            return (n !== null && n[t]) || null;
        }
        get length() {
            return this._lContainer.length - G;
        }
        createEmbeddedView(t, n, r) {
            let o, i;
            typeof r == 'number'
                ? (o = r)
                : r != null && ((o = r.index), (i = r.injector));
            let s = aa(this._lContainer, t.ssrId),
                a = t.createEmbeddedViewImpl(n || {}, i, s);
            return this.insertImpl(a, o, sa(this._hostTNode, s)), a;
        }
        createComponent(t, n, r, o, i) {
            let s = t && !rp(t),
                a;
            if (s) a = n;
            else {
                let h = n || {};
                (a = h.index),
                    (r = h.injector),
                    (o = h.projectableNodes),
                    (i = h.environmentInjector || h.ngModuleRef);
            }
            let u = s ? t : new $t(je(t)),
                c = r || this.parentInjector;
            if (!i && u.ngModule == null) {
                let E = (s ? c : this.parentInjector).get(be, null);
                E && (i = E);
            }
            let l = je(u.componentType ?? {}),
                d = aa(this._lContainer, l?.id ?? null),
                f = d?.firstChild ?? null,
                p = u.create(c, o, f, i);
            return this.insertImpl(p.hostView, a, sa(this._hostTNode, d)), p;
        }
        insert(t, n) {
            return this.insertImpl(t, n, !0);
        }
        insertImpl(t, n, r) {
            let o = t._lView;
            if (Rd(o)) {
                let a = this.indexOf(t);
                if (a !== -1) this.detach(a);
                else {
                    let u = o[R],
                        c = new Fc(u, u[ae], u[R]);
                    c.detach(c.indexOf(t));
                }
            }
            let i = this._adjustIndex(n),
                s = this._lContainer;
            return (
                Fh(s, o, i, r), t.attachToViewContainerRef(), nu(Jr(s), i, t), t
            );
        }
        move(t, n) {
            return this.insert(t, n);
        }
        indexOf(t) {
            let n = ga(this._lContainer);
            return n !== null ? n.indexOf(t) : -1;
        }
        remove(t) {
            let n = this._adjustIndex(t, -1),
                r = Mo(this._lContainer, n);
            r && (Pn(Jr(this._lContainer), n), Xu(r[y], r));
        }
        detach(t) {
            let n = this._adjustIndex(t, -1),
                r = Mo(this._lContainer, n);
            return r && Pn(Jr(this._lContainer), n) != null ? new Ge(r) : null;
        }
        _adjustIndex(t, n = 0) {
            return t ?? this.length + n;
        }
    };
function ga(e) {
    return e[Rn];
}
function Jr(e) {
    return e[Rn] || (e[Rn] = []);
}
function Rc(e, t) {
    let n,
        r = t[e.index];
    return (
        fe(r) ? (n = r) : ((n = hc(r, t, null, e)), (t[e.index] = n), yr(t, n)),
        Pc(n, t, e, r),
        new Fc(n, e, t)
    );
}
function _g(e, t) {
    let n = e[A],
        r = n.createComment(''),
        o = Q(t, e),
        i = _i(n, o);
    return Wn(n, i, r, qp(n, o), !1), r;
}
var Pc = kc,
    $i = () => !1;
function xg(e, t, n) {
    return $i(e, t, n);
}
function kc(e, t, n, r) {
    if (e[ve]) return;
    let o;
    n.type & 8 ? (o = se(r)) : (o = _g(t, n)), (e[ve] = o);
}
function Tg(e, t, n) {
    if (e[ve] && e[Pt]) return !0;
    let r = n[me],
        o = t.index - k;
    if (!r || lf(t) || dr(r, o)) return !1;
    let s = yo(r, o),
        a = r.data[yi]?.[o],
        [u, c] = eg(s, a);
    return (e[ve] = u), (e[Pt] = c), !0;
}
function Sg(e, t, n, r) {
    $i(e, n, t) || kc(e, t, n, r);
}
function Ag() {
    (Pc = Sg), ($i = Tg);
}
var $o = class e {
        constructor(t) {
            (this.queryList = t), (this.matches = null);
        }
        clone() {
            return new e(this.queryList);
        }
        setDirty() {
            this.queryList.setDirty();
        }
    },
    Ho = class e {
        constructor(t = []) {
            this.queries = t;
        }
        createEmbeddedView(t) {
            let n = t.queries;
            if (n !== null) {
                let r =
                        t.contentQueries !== null
                            ? t.contentQueries[0]
                            : n.length,
                    o = [];
                for (let i = 0; i < r; i++) {
                    let s = n.getByIndex(i),
                        a = this.queries[s.indexInDeclarationView];
                    o.push(a.clone());
                }
                return new e(o);
            }
            return null;
        }
        insertView(t) {
            this.dirtyQueriesWithMatches(t);
        }
        detachView(t) {
            this.dirtyQueriesWithMatches(t);
        }
        finishViewCreation(t) {
            this.dirtyQueriesWithMatches(t);
        }
        dirtyQueriesWithMatches(t) {
            for (let n = 0; n < this.queries.length; n++)
                Hi(t, n).matches !== null && this.queries[n].setDirty();
        }
    },
    Uo = class {
        constructor(t, n, r = null) {
            (this.flags = n),
                (this.read = r),
                typeof t == 'string'
                    ? (this.predicate = jg(t))
                    : (this.predicate = t);
        }
    },
    Go = class e {
        constructor(t = []) {
            this.queries = t;
        }
        elementStart(t, n) {
            for (let r = 0; r < this.queries.length; r++)
                this.queries[r].elementStart(t, n);
        }
        elementEnd(t) {
            for (let n = 0; n < this.queries.length; n++)
                this.queries[n].elementEnd(t);
        }
        embeddedTView(t) {
            let n = null;
            for (let r = 0; r < this.length; r++) {
                let o = n !== null ? n.length : 0,
                    i = this.getByIndex(r).embeddedTView(t, o);
                i &&
                    ((i.indexInDeclarationView = r),
                    n !== null ? n.push(i) : (n = [i]));
            }
            return n !== null ? new e(n) : null;
        }
        template(t, n) {
            for (let r = 0; r < this.queries.length; r++)
                this.queries[r].template(t, n);
        }
        getByIndex(t) {
            return this.queries[t];
        }
        get length() {
            return this.queries.length;
        }
        track(t) {
            this.queries.push(t);
        }
    },
    zo = class e {
        constructor(t, n = -1) {
            (this.metadata = t),
                (this.matches = null),
                (this.indexInDeclarationView = -1),
                (this.crossesNgTemplate = !1),
                (this._appliesToNextNode = !0),
                (this._declarationNodeIndex = n);
        }
        elementStart(t, n) {
            this.isApplyingToNode(n) && this.matchTNode(t, n);
        }
        elementEnd(t) {
            this._declarationNodeIndex === t.index &&
                (this._appliesToNextNode = !1);
        }
        template(t, n) {
            this.elementStart(t, n);
        }
        embeddedTView(t, n) {
            return this.isApplyingToNode(t)
                ? ((this.crossesNgTemplate = !0),
                  this.addMatch(-t.index, n),
                  new e(this.metadata))
                : null;
        }
        isApplyingToNode(t) {
            if (this._appliesToNextNode && (this.metadata.flags & 1) !== 1) {
                let n = this._declarationNodeIndex,
                    r = t.parent;
                for (; r !== null && r.type & 8 && r.index !== n; )
                    r = r.parent;
                return n === (r !== null ? r.index : -1);
            }
            return this._appliesToNextNode;
        }
        matchTNode(t, n) {
            let r = this.metadata.predicate;
            if (Array.isArray(r))
                for (let o = 0; o < r.length; o++) {
                    let i = r[o];
                    this.matchTNodeWithReadOption(t, n, Ng(n, i)),
                        this.matchTNodeWithReadOption(
                            t,
                            n,
                            An(n, t, i, !1, !1),
                        );
                }
            else
                r === ze
                    ? n.type & 4 && this.matchTNodeWithReadOption(t, n, -1)
                    : this.matchTNodeWithReadOption(t, n, An(n, t, r, !1, !1));
        }
        matchTNodeWithReadOption(t, n, r) {
            if (r !== null) {
                let o = this.metadata.read;
                if (o !== null)
                    if (o === Dt || o === Ze || (o === ze && n.type & 4))
                        this.addMatch(n.index, -2);
                    else {
                        let i = An(n, t, o, !1, !1);
                        i !== null && this.addMatch(n.index, i);
                    }
                else this.addMatch(n.index, r);
            }
        }
        addMatch(t, n) {
            this.matches === null
                ? (this.matches = [t, n])
                : this.matches.push(t, n);
        }
    };
function Ng(e, t) {
    let n = e.localNames;
    if (n !== null) {
        for (let r = 0; r < n.length; r += 2) if (n[r] === t) return n[r + 1];
    }
    return null;
}
function Og(e, t) {
    return e.type & 11 ? yt(e, t) : e.type & 4 ? Dr(e, t) : null;
}
function Fg(e, t, n, r) {
    return n === -1 ? Og(t, e) : n === -2 ? Rg(e, t, r) : Ue(e, e[y], n, t);
}
function Rg(e, t, n) {
    if (n === Dt) return yt(t, e);
    if (n === ze) return Dr(t, e);
    if (n === Ze) return Rc(t, e);
}
function Lc(e, t, n, r) {
    let o = t[De].queries[r];
    if (o.matches === null) {
        let i = e.data,
            s = n.matches,
            a = [];
        for (let u = 0; s !== null && u < s.length; u += 2) {
            let c = s[u];
            if (c < 0) a.push(null);
            else {
                let l = i[c];
                a.push(Fg(t, l, s[u + 1], n.metadata.read));
            }
        }
        o.matches = a;
    }
    return o.matches;
}
function Wo(e, t, n, r) {
    let o = e.queries.getByIndex(n),
        i = o.matches;
    if (i !== null) {
        let s = Lc(e, t, o, n);
        for (let a = 0; a < i.length; a += 2) {
            let u = i[a];
            if (u > 0) r.push(s[a / 2]);
            else {
                let c = i[a + 1],
                    l = t[-u];
                for (let d = G; d < l.length; d++) {
                    let f = l[d];
                    f[Gt] === f[R] && Wo(f[y], f, c, r);
                }
                if (l[lt] !== null) {
                    let d = l[lt];
                    for (let f = 0; f < d.length; f++) {
                        let p = d[f];
                        Wo(p[y], p, c, r);
                    }
                }
            }
        }
    }
    return r;
}
function Pg(e, t) {
    return e[De].queries[t].queryList;
}
function kg(e, t, n) {
    let r = new lo((n & 4) === 4);
    return (
        uh(e, t, r, r.destroy), (t[De] ??= new Ho()).queries.push(new $o(r)) - 1
    );
}
function Lg(e, t, n) {
    let r = L();
    return (
        r.firstCreatePass &&
            (Vg(r, new Uo(e, t, n), -1),
            (t & 2) === 2 && (r.staticViewQueries = !0)),
        kg(r, _(), t)
    );
}
function jg(e) {
    return e.split(',').map((t) => t.trim());
}
function Vg(e, t, n) {
    e.queries === null && (e.queries = new Go()), e.queries.track(new zo(t, n));
}
function Hi(e, t) {
    return e.queries.getByIndex(t);
}
function Bg(e, t) {
    let n = e[y],
        r = Hi(n, t);
    return r.crossesNgTemplate ? Wo(n, e, t, []) : Lc(n, e, r, t);
}
function $g(e) {
    let t = e.inputConfig,
        n = {};
    for (let r in t)
        if (t.hasOwnProperty(r)) {
            let o = t[r];
            Array.isArray(o) && o[3] && (n[r] = o[3]);
        }
    e.inputTransforms = n;
}
var _e = class {},
    qo = class {};
var Qo = class extends _e {
        constructor(t, n, r) {
            super(),
                (this._parent = n),
                (this._bootstrapComponents = []),
                (this.destroyCbs = []),
                (this.componentFactoryResolver = new Jn(this));
            let o = Na(t);
            (this._bootstrapComponents = Qu(o.bootstrap)),
                (this._r3Injector = Hu(
                    t,
                    n,
                    [
                        { provide: _e, useValue: this },
                        {
                            provide: Ir,
                            useValue: this.componentFactoryResolver,
                        },
                        ...r,
                    ],
                    B(t),
                    new Set(['environment']),
                )),
                this._r3Injector.resolveInjectorInitializers(),
                (this.instance = this._r3Injector.get(t));
        }
        get injector() {
            return this._r3Injector;
        }
        destroy() {
            let t = this._r3Injector;
            !t.destroyed && t.destroy(),
                this.destroyCbs.forEach((n) => n()),
                (this.destroyCbs = null);
        }
        onDestroy(t) {
            this.destroyCbs.push(t);
        }
    },
    Yo = class extends qo {
        constructor(t) {
            super(), (this.moduleType = t);
        }
        create(t) {
            return new Qo(this.moduleType, t, []);
        }
    };
var Xn = class extends _e {
    constructor(t) {
        super(),
            (this.componentFactoryResolver = new Jn(this)),
            (this.instance = null);
        let n = new Bt(
            [
                ...t.providers,
                { provide: _e, useValue: this },
                { provide: Ir, useValue: this.componentFactoryResolver },
            ],
            t.parent || Ii(),
            t.debugName,
            new Set(['environment']),
        );
        (this.injector = n),
            t.runEnvironmentInitializers && n.resolveInjectorInitializers();
    }
    destroy() {
        this.injector.destroy();
    }
    onDestroy(t) {
        this.injector.onDestroy(t);
    }
};
function Hg(e, t, n = null) {
    return new Xn({
        providers: e,
        parent: t,
        debugName: n,
        runEnvironmentInitializers: !0,
    }).injector;
}
var jc = (() => {
    let t = class t {
        constructor() {
            (this.taskId = 0),
                (this.pendingTasks = new Set()),
                (this.hasPendingTasks = new bt(!1));
        }
        get _hasPendingTasks() {
            return this.hasPendingTasks.value;
        }
        add() {
            this._hasPendingTasks || this.hasPendingTasks.next(!0);
            let r = this.taskId++;
            return this.pendingTasks.add(r), r;
        }
        remove(r) {
            this.pendingTasks.delete(r),
                this.pendingTasks.size === 0 &&
                    this._hasPendingTasks &&
                    this.hasPendingTasks.next(!1);
        }
        ngOnDestroy() {
            this.pendingTasks.clear(),
                this._hasPendingTasks && this.hasPendingTasks.next(!1);
        }
    };
    (t.ɵfac = function (o) {
        return new (o || t)();
    }),
        (t.ɵprov = N({ token: t, factory: t.ɵfac, providedIn: 'root' }));
    let e = t;
    return e;
})();
function Vc(e, t, n) {
    return (e[t] = n);
}
function Ug(e, t) {
    return e[t];
}
function vt(e, t, n) {
    let r = e[t];
    return Object.is(r, n) ? !1 : ((e[t] = n), !0);
}
function Gg(e, t, n, r, o, i, s, a, u) {
    let c = t.consts,
        l = Yt(t, e, 4, s || null, dt(c, a));
    Oi(t, n, l, dt(c, u)), fr(t, l);
    let d = (l.tView = Ni(
        2,
        l,
        r,
        o,
        i,
        t.directiveRegistry,
        t.pipeRegistry,
        null,
        t.schemas,
        c,
        null,
    ));
    return (
        t.queries !== null &&
            (t.queries.template(t, l),
            (d.queries = t.queries.embeddedTView(l))),
        l
    );
}
function zg(e, t, n, r, o, i, s, a) {
    let u = _(),
        c = L(),
        l = e + k,
        d = c.firstCreatePass ? Gg(l, c, u, t, n, r, o, i, s) : c.data[l];
    Qe(d, !1);
    let f = Bc(c, u, d, e);
    ir() && hr(c, u, f, d), Me(f, u);
    let p = hc(f, u, f, d);
    return (
        (u[l] = p),
        yr(u, p),
        xg(p, d, u),
        or(d) && Si(c, u, d),
        s != null && Ai(u, d, a),
        zg
    );
}
var Bc = $c;
function $c(e, t, n, r) {
    return xe(!0), t[A].createComment('');
}
function Wg(e, t, n, r) {
    let o = t[me],
        i = !o || Wt() || dr(o, r);
    if ((xe(i), i)) return $c(e, t, n, r);
    let s = o.data[Nf]?.[r] ?? null;
    s !== null &&
        n.tView !== null &&
        n.tView.ssrId === null &&
        (n.tView.ssrId = s);
    let a = vr(o, e, t, n);
    lr(o, r, a);
    let u = vi(o, r);
    return wr(u, a);
}
function qg() {
    Bc = Wg;
}
function Qg(e, t, n, r) {
    let o = _(),
        i = ui();
    if (vt(o, i, t)) {
        let s = L(),
            a = Xa();
        bh(a, o, e, t, n, r);
    }
    return Qg;
}
function Yg(e, t, n, r) {
    return vt(e, ui(), n) ? t + ur(n) + r : pe;
}
function bn(e, t) {
    return (e << 17) | (t << 2);
}
function We(e) {
    return (e >> 17) & 32767;
}
function Zg(e) {
    return (e & 2) == 2;
}
function Kg(e, t) {
    return (e & 131071) | (t << 17);
}
function Zo(e) {
    return e | 2;
}
function ht(e) {
    return (e & 131068) >> 2;
}
function Xr(e, t) {
    return (e & -131069) | (t << 2);
}
function Jg(e) {
    return (e & 1) === 1;
}
function Ko(e) {
    return e | 1;
}
function Xg(e, t, n, r, o, i) {
    let s = i ? t.classBindings : t.styleBindings,
        a = We(s),
        u = ht(s);
    e[r] = n;
    let c = !1,
        l;
    if (Array.isArray(n)) {
        let d = n;
        (l = d[1]), (l === null || qt(d, l) > 0) && (c = !0);
    } else l = n;
    if (o)
        if (u !== 0) {
            let f = We(e[a + 1]);
            (e[r + 1] = bn(f, a)),
                f !== 0 && (e[f + 1] = Xr(e[f + 1], r)),
                (e[a + 1] = Kg(e[a + 1], r));
        } else
            (e[r + 1] = bn(a, 0)),
                a !== 0 && (e[a + 1] = Xr(e[a + 1], r)),
                (a = r);
    else
        (e[r + 1] = bn(u, 0)),
            a === 0 ? (a = r) : (e[u + 1] = Xr(e[u + 1], r)),
            (u = r);
    c && (e[r + 1] = Zo(e[r + 1])),
        ma(e, l, r, !0),
        ma(e, l, r, !1),
        em(t, l, e, r, i),
        (s = bn(a, u)),
        i ? (t.classBindings = s) : (t.styleBindings = s);
}
function em(e, t, n, r, o) {
    let i = o ? e.residualClasses : e.residualStyles;
    i != null &&
        typeof t == 'string' &&
        qt(i, t) >= 0 &&
        (n[r + 1] = Ko(n[r + 1]));
}
function ma(e, t, n, r) {
    let o = e[n + 1],
        i = t === null,
        s = r ? We(o) : ht(o),
        a = !1;
    for (; s !== 0 && (a === !1 || i); ) {
        let u = e[s],
            c = e[s + 1];
        tm(u, t) && ((a = !0), (e[s + 1] = r ? Ko(c) : Zo(c))),
            (s = r ? We(c) : ht(c));
    }
    a && (e[n + 1] = r ? Zo(o) : Ko(o));
}
function tm(e, t) {
    return e === null || t == null || (Array.isArray(e) ? e[1] : e) === t
        ? !0
        : Array.isArray(e) && typeof t == 'string'
          ? qt(e, t) >= 0
          : !1;
}
var oe = { textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0 };
function nm(e) {
    return e.substring(oe.key, oe.keyEnd);
}
function rm(e) {
    return om(e), Hc(e, Uc(e, 0, oe.textEnd));
}
function Hc(e, t) {
    let n = oe.textEnd;
    return n === t
        ? -1
        : ((t = oe.keyEnd = im(e, (oe.key = t), n)), Uc(e, t, n));
}
function om(e) {
    (oe.key = 0),
        (oe.keyEnd = 0),
        (oe.value = 0),
        (oe.valueEnd = 0),
        (oe.textEnd = e.length);
}
function Uc(e, t, n) {
    for (; t < n && e.charCodeAt(t) <= 32; ) t++;
    return t;
}
function im(e, t, n) {
    for (; t < n && e.charCodeAt(t) > 32; ) t++;
    return t;
}
function sm(e, t, n) {
    let r = _(),
        o = ui();
    if (vt(r, o, t)) {
        let i = L(),
            s = Xa();
        fh(i, s, r, e, t, r[A], n, !1);
    }
    return sm;
}
function Jo(e, t, n, r, o) {
    let i = t.inputs,
        s = o ? 'class' : 'style';
    Fi(e, n, i[s], s, r);
}
function Gc(e, t, n) {
    return zc(e, t, n, !1), Gc;
}
function am(e, t) {
    return zc(e, t, null, !0), am;
}
function ZC(e) {
    cm(gm, um, e, !0);
}
function um(e, t) {
    for (let n = rm(t); n >= 0; n = Hc(t, n)) pi(e, nm(t), !0);
}
function zc(e, t, n, r) {
    let o = _(),
        i = L(),
        s = Wa(2);
    if ((i.firstUpdatePass && qc(i, e, s, r), t !== pe && vt(o, s, t))) {
        let a = i.data[Ye()];
        Qc(i, a, o, o[A], e, (o[s + 1] = ym(t, n)), r, s);
    }
}
function cm(e, t, n, r) {
    let o = L(),
        i = Wa(2);
    o.firstUpdatePass && qc(o, null, i, r);
    let s = _();
    if (n !== pe && vt(s, i, n)) {
        let a = o.data[Ye()];
        if (Yc(a, r) && !Wc(o, i)) {
            let u = r ? a.classesWithoutHost : a.stylesWithoutHost;
            u !== null && (n = so(u, n || '')), Jo(o, a, s, n, r);
        } else mm(o, a, s, s[A], s[i + 1], (s[i + 1] = hm(e, t, n)), r, i);
    }
}
function Wc(e, t) {
    return t >= e.expandoStartIndex;
}
function qc(e, t, n, r) {
    let o = e.data;
    if (o[n + 1] === null) {
        let i = o[Ye()],
            s = Wc(e, n);
        Yc(i, r) && t === null && !s && (t = !1),
            (t = lm(o, i, t, r)),
            Xg(o, i, t, n, s, r);
    }
}
function lm(e, t, n, r) {
    let o = Zd(e),
        i = r ? t.residualClasses : t.residualStyles;
    if (o === null)
        (r ? t.classBindings : t.styleBindings) === 0 &&
            ((n = eo(null, e, t, n, r)), (n = Ht(n, t.attrs, r)), (i = null));
    else {
        let s = t.directiveStylingLast;
        if (s === -1 || e[s] !== o)
            if (((n = eo(o, e, t, n, r)), i === null)) {
                let u = dm(e, t, r);
                u !== void 0 &&
                    Array.isArray(u) &&
                    ((u = eo(null, e, t, u[1], r)),
                    (u = Ht(u, t.attrs, r)),
                    fm(e, t, r, u));
            } else i = pm(e, t, r);
    }
    return (
        i !== void 0 && (r ? (t.residualClasses = i) : (t.residualStyles = i)),
        n
    );
}
function dm(e, t, n) {
    let r = n ? t.classBindings : t.styleBindings;
    if (ht(r) !== 0) return e[We(r)];
}
function fm(e, t, n, r) {
    let o = n ? t.classBindings : t.styleBindings;
    e[We(o)] = r;
}
function pm(e, t, n) {
    let r,
        o = t.directiveEnd;
    for (let i = 1 + t.directiveStylingLast; i < o; i++) {
        let s = e[i].hostAttrs;
        r = Ht(r, s, n);
    }
    return Ht(r, t.attrs, n);
}
function eo(e, t, n, r, o) {
    let i = null,
        s = n.directiveEnd,
        a = n.directiveStylingLast;
    for (
        a === -1 ? (a = n.directiveStart) : a++;
        a < s && ((i = t[a]), (r = Ht(r, i.hostAttrs, o)), i !== e);

    )
        a++;
    return e !== null && (n.directiveStylingLast = a), r;
}
function Ht(e, t, n) {
    let r = n ? 1 : 2,
        o = -1;
    if (t !== null)
        for (let i = 0; i < t.length; i++) {
            let s = t[i];
            typeof s == 'number'
                ? (o = s)
                : o === r &&
                  (Array.isArray(e) || (e = e === void 0 ? [] : ['', e]),
                  pi(e, s, n ? !0 : t[++i]));
        }
    return e === void 0 ? null : e;
}
function hm(e, t, n) {
    if (n == null || n === '') return U;
    let r = [],
        o = pr(n);
    if (Array.isArray(o)) for (let i = 0; i < o.length; i++) e(r, o[i], !0);
    else if (typeof o == 'object')
        for (let i in o) o.hasOwnProperty(i) && e(r, i, o[i]);
    else typeof o == 'string' && t(r, o);
    return r;
}
function gm(e, t, n) {
    let r = String(t);
    r !== '' && !r.includes(' ') && pi(e, r, n);
}
function mm(e, t, n, r, o, i, s, a) {
    o === pe && (o = U);
    let u = 0,
        c = 0,
        l = 0 < o.length ? o[0] : null,
        d = 0 < i.length ? i[0] : null;
    for (; l !== null || d !== null; ) {
        let f = u < o.length ? o[u + 1] : void 0,
            p = c < i.length ? i[c + 1] : void 0,
            h = null,
            E;
        l === d
            ? ((u += 2), (c += 2), f !== p && ((h = d), (E = p)))
            : d === null || (l !== null && l < d)
              ? ((u += 2), (h = l))
              : ((c += 2), (h = d), (E = p)),
            h !== null && Qc(e, t, n, r, h, E, s, a),
            (l = u < o.length ? o[u] : null),
            (d = c < i.length ? i[c] : null);
    }
}
function Qc(e, t, n, r, o, i, s, a) {
    if (!(t.type & 3)) return;
    let u = e.data,
        c = u[a + 1],
        l = Jg(c) ? ya(u, t, n, o, ht(c), s) : void 0;
    if (!er(l)) {
        er(i) || (Zg(c) && (i = ya(u, null, n, o, a, s)));
        let d = ja(Ye(), n);
        Xp(r, s, d, o, i);
    }
}
function ya(e, t, n, r, o, i) {
    let s = t === null,
        a;
    for (; o > 0; ) {
        let u = e[o],
            c = Array.isArray(u),
            l = c ? u[1] : u,
            d = l === null,
            f = n[o + 1];
        f === pe && (f = d ? U : void 0);
        let p = d ? Ur(f, r) : l === r ? f : void 0;
        if ((c && !er(p) && (p = Ur(u, r)), er(p) && ((a = p), s))) return a;
        let h = e[o + 1];
        o = s ? We(h) : ht(h);
    }
    if (t !== null) {
        let u = i ? t.residualClasses : t.residualStyles;
        u != null && (a = Ur(u, r));
    }
    return a;
}
function er(e) {
    return e !== void 0;
}
function ym(e, t) {
    return (
        e == null ||
            e === '' ||
            (typeof t == 'string'
                ? (e = e + t)
                : typeof e == 'object' && (e = B(pr(e)))),
        e
    );
}
function Yc(e, t) {
    return (e.flags & (t ? 8 : 16)) !== 0;
}
function Dm(e, t, n, r, o, i) {
    let s = t.consts,
        a = dt(s, o),
        u = Yt(t, e, 2, r, a);
    return (
        Oi(t, n, u, dt(s, i)),
        u.attrs !== null && Kn(u, u.attrs, !1),
        u.mergedAttrs !== null && Kn(u, u.mergedAttrs, !0),
        t.queries !== null && t.queries.elementStart(t, u),
        u
    );
}
function Zc(e, t, n, r) {
    let o = _(),
        i = L(),
        s = k + e,
        a = o[A],
        u = i.firstCreatePass ? Dm(s, i, o, t, n, r) : i.data[s],
        c = Jc(i, o, u, a, t, e);
    o[s] = c;
    let l = or(u);
    return (
        Qe(u, !0),
        ic(a, c, u),
        (u.flags & 32) !== 32 && ir() && hr(i, o, c, u),
        jd() === 0 && Me(c, o),
        Vd(),
        l && (Si(i, o, u), Ti(i, u, o)),
        r !== null && Ai(o, u),
        Zc
    );
}
function Kc() {
    let e = K();
    ai() ? Ga() : ((e = e.parent), Qe(e, !1));
    let t = e;
    $d(t) && Ud(), Bd();
    let n = L();
    return (
        n.firstCreatePass && (fr(n, e), oi(e) && n.queries.elementEnd(e)),
        t.classesWithoutHost != null &&
            lp(t) &&
            Jo(n, t, _(), t.classesWithoutHost, !0),
        t.stylesWithoutHost != null &&
            dp(t) &&
            Jo(n, t, _(), t.stylesWithoutHost, !1),
        Kc
    );
}
function vm(e, t, n, r) {
    return Zc(e, t, n, r), Kc(), vm;
}
var Jc = (e, t, n, r, o, i) => (xe(!0), Mi(r, o, eu()));
function wm(e, t, n, r, o, i) {
    let s = t[me],
        a = !s || Wt() || dr(s, i);
    if ((xe(a), a)) return Mi(r, o, eu());
    let u = vr(s, e, t, n);
    return (
        Du(s, i) && lr(s, i, u.nextSibling),
        s && (ru(n) || ou(u)) && zt(n) && (Hd(n), rc(u)),
        u
    );
}
function Im() {
    Jc = wm;
}
function Em(e, t, n, r, o) {
    let i = t.consts,
        s = dt(i, r),
        a = Yt(t, e, 8, 'ng-container', s);
    s !== null && Kn(a, s, !0);
    let u = dt(i, o);
    return (
        Oi(t, n, a, u), t.queries !== null && t.queries.elementStart(t, a), a
    );
}
function Xc(e, t, n) {
    let r = _(),
        o = L(),
        i = e + k,
        s = o.firstCreatePass ? Em(i, o, r, t, n) : o.data[i];
    Qe(s, !0);
    let a = tl(o, r, s, e);
    return (
        (r[i] = a),
        ir() && hr(o, r, a, s),
        Me(a, r),
        or(s) && (Si(o, r, s), Ti(o, s, r)),
        n != null && Ai(r, s),
        Xc
    );
}
function el() {
    let e = K(),
        t = L();
    return (
        ai() ? Ga() : ((e = e.parent), Qe(e, !1)),
        t.firstCreatePass && (fr(t, e), oi(e) && t.queries.elementEnd(e)),
        el
    );
}
function Cm(e, t, n) {
    return Xc(e, t, n), el(), Cm;
}
var tl = (e, t, n, r) => (xe(!0), Zu(t[A], ''));
function bm(e, t, n, r) {
    let o,
        i = t[me],
        s = !i || Wt();
    if ((xe(s), s)) return Zu(t[A], '');
    let a = vr(i, e, t, n),
        u = Hf(i, r);
    return lr(i, r, a), (o = wr(u, a)), o;
}
function Mm() {
    tl = bm;
}
var tr = 'en-US';
var _m = tr;
function xm(e) {
    typeof e == 'string' && (_m = e.toLowerCase().replace(/_/g, '-'));
}
function Tm(e, t, n, r) {
    let o = _(),
        i = L(),
        s = K();
    return Am(i, o, o[A], s, e, t, r), Tm;
}
function Sm(e, t, n, r) {
    let o = e.cleanup;
    if (o != null)
        for (let i = 0; i < o.length - 1; i += 2) {
            let s = o[i];
            if (s === n && o[i + 1] === r) {
                let a = t[Ft],
                    u = o[i + 2];
                return a.length > u ? a[u] : null;
            }
            typeof s == 'string' && (i += 2);
        }
    return null;
}
function Am(e, t, n, r, o, i, s) {
    let a = or(r),
        c = e.firstCreatePass && yc(e),
        l = t[de],
        d = mc(t),
        f = !0;
    if (r.type & 3 || s) {
        let E = Q(r, t),
            P = s ? s(E) : E,
            S = d.length,
            X = s ? (ee) => s(se(ee[r.index])) : r.index,
            he = null;
        if ((!s && a && (he = Sm(e, t, o, r.index)), he !== null)) {
            let ee = he.__ngLastListenerFn__ || he;
            (ee.__ngNextListenerFn__ = i),
                (he.__ngLastListenerFn__ = i),
                (f = !1);
        } else {
            i = va(r, t, l, i, !1);
            let ee = n.listen(P, o, i);
            d.push(i, ee), c && c.push(o, X, S, S + 1);
        }
    } else i = va(r, t, l, i, !1);
    let p = r.outputs,
        h;
    if (f && p !== null && (h = p[o])) {
        let E = h.length;
        if (E)
            for (let P = 0; P < E; P += 2) {
                let S = h[P],
                    X = h[P + 1],
                    te = t[S][X].subscribe(i),
                    ue = d.length;
                if ((d.push(i, te), c)) {
                    let wt = typeof te == 'function' ? ue + 1 : -(ue + 1);
                    c.push(o, r.index, ue, wt);
                }
            }
    }
}
function Da(e, t, n, r) {
    try {
        return ce(6, t, n), n(r) !== !1;
    } catch (o) {
        return Dc(e, o), !1;
    } finally {
        ce(7, t, n);
    }
}
function va(e, t, n, r, o) {
    return function i(s) {
        if (s === Function) return r;
        let a = e.componentOffset > -1 ? qe(e.index, t) : t;
        Pi(a);
        let u = Da(t, n, r, s),
            c = i.__ngNextListenerFn__;
        for (; c; ) (u = Da(t, n, c, s) && u), (c = c.__ngNextListenerFn__);
        return o && u === !1 && s.preventDefault(), u;
    };
}
function KC(e = 1) {
    return Jd(e);
}
function JC(e, t, n) {
    Lg(e, t, n);
}
function XC(e) {
    let t = _(),
        n = L(),
        r = qa();
    ci(r + 1);
    let o = Hi(n, r);
    if (e.dirty && Fd(t) === ((o.metadata.flags & 2) === 2)) {
        if (o.matches === null) e.reset([]);
        else {
            let i = Bg(t, r);
            e.reset(i, tf), e.notifyOnChanges();
        }
        return !0;
    }
    return !1;
}
function eb() {
    return Pg(_(), qa());
}
function Nm(e, t, n, r) {
    n >= e.data.length && ((e.data[n] = null), (e.blueprint[n] = null)),
        (t[n] = r);
}
function tb(e) {
    let t = zd();
    return Ba(t, k + e);
}
function nb(e, t = '') {
    let n = _(),
        r = L(),
        o = e + k,
        i = r.firstCreatePass ? Yt(r, o, 1, t, null) : r.data[o],
        s = nl(r, n, i, t, e);
    (n[o] = s), ir() && hr(r, n, s, i), Qe(i, !1);
}
var nl = (e, t, n, r, o) => (xe(!0), Yu(t[A], r));
function Om(e, t, n, r, o) {
    let i = t[me],
        s = !i || Wt() || dr(i, o);
    return xe(s), s ? Yu(t[A], r) : vr(i, e, t, n);
}
function Fm() {
    nl = Om;
}
function Rm(e) {
    return rl('', e, ''), Rm;
}
function rl(e, t, n) {
    let r = _(),
        o = Yg(r, e, t, n);
    return o !== pe && Th(r, Ye(), o), rl;
}
function Pm(e, t, n) {
    let r = L();
    if (r.firstCreatePass) {
        let o = mt(e);
        Xo(n, r.data, r.blueprint, o, !0), Xo(t, r.data, r.blueprint, o, !1);
    }
}
function Xo(e, t, n, r, o) {
    if (((e = V(e)), Array.isArray(e)))
        for (let i = 0; i < e.length; i++) Xo(e[i], t, n, r, o);
    else {
        let i = L(),
            s = _(),
            a = K(),
            u = ft(e) ? e : V(e.provide),
            c = xu(e),
            l = a.providerIndexes & 1048575,
            d = a.directiveStart,
            f = a.providerIndexes >> 20;
        if (ft(e) || !e.multi) {
            let p = new He(c, o, J),
                h = no(u, t, o ? l : l + f, d);
            h === -1
                ? (Co(Un(a, s), i, u),
                  to(i, e, t.length),
                  t.push(u),
                  a.directiveStart++,
                  a.directiveEnd++,
                  o && (a.providerIndexes += 1048576),
                  n.push(p),
                  s.push(p))
                : ((n[h] = p), (s[h] = p));
        } else {
            let p = no(u, t, l + f, d),
                h = no(u, t, l, l + f),
                E = p >= 0 && n[p],
                P = h >= 0 && n[h];
            if ((o && !P) || (!o && !E)) {
                Co(Un(a, s), i, u);
                let S = jm(o ? Lm : km, n.length, o, r, c);
                !o && P && (n[h].providerFactory = S),
                    to(i, e, t.length, 0),
                    t.push(u),
                    a.directiveStart++,
                    a.directiveEnd++,
                    o && (a.providerIndexes += 1048576),
                    n.push(S),
                    s.push(S);
            } else {
                let S = ol(n[o ? h : p], c, !o && r);
                to(i, e, p > -1 ? p : h, S);
            }
            !o && r && P && n[h].componentProviders++;
        }
    }
}
function to(e, t, n, r) {
    let o = ft(t),
        i = Zf(t);
    if (o || i) {
        let u = (i ? V(t.useClass) : t).prototype.ngOnDestroy;
        if (u) {
            let c = e.destroyHooks || (e.destroyHooks = []);
            if (!o && t.multi) {
                let l = c.indexOf(n);
                l === -1 ? c.push(n, [r, u]) : c[l + 1].push(r, u);
            } else c.push(n, u);
        }
    }
}
function ol(e, t, n) {
    return n && e.componentProviders++, e.multi.push(t) - 1;
}
function no(e, t, n, r) {
    for (let o = n; o < r; o++) if (t[o] === e) return o;
    return -1;
}
function km(e, t, n, r) {
    return ei(this.multi, []);
}
function Lm(e, t, n, r) {
    let o = this.multi,
        i;
    if (this.providerFactory) {
        let s = this.providerFactory.componentProviders,
            a = Ue(n, n[y], this.providerFactory.index, r);
        (i = a.slice(0, s)), ei(o, i);
        for (let u = s; u < a.length; u++) i.push(a[u]);
    } else (i = []), ei(o, i);
    return i;
}
function ei(e, t) {
    for (let n = 0; n < e.length; n++) {
        let r = e[n];
        t.push(r());
    }
    return t;
}
function jm(e, t, n, r, o) {
    let i = new He(e, n, J);
    return (
        (i.multi = []),
        (i.index = t),
        (i.componentProviders = 0),
        ol(i, o, r && !n),
        i
    );
}
function rb(e, t = []) {
    return (n) => {
        n.providersResolver = (r, o) => Pm(r, o ? o(e) : e, t);
    };
}
var Vm = (() => {
    let t = class t {
        constructor(r) {
            (this._injector = r), (this.cachedInjectors = new Map());
        }
        getOrCreateStandaloneInjector(r) {
            if (!r.standalone) return null;
            if (!this.cachedInjectors.has(r)) {
                let o = Cu(!1, r.type),
                    i =
                        o.length > 0
                            ? Hg(
                                  [o],
                                  this._injector,
                                  `Standalone[${r.type.name}]`,
                              )
                            : null;
                this.cachedInjectors.set(r, i);
            }
            return this.cachedInjectors.get(r);
        }
        ngOnDestroy() {
            try {
                for (let r of this.cachedInjectors.values())
                    r !== null && r.destroy();
            } finally {
                this.cachedInjectors.clear();
            }
        }
    };
    t.ɵprov = N({
        token: t,
        providedIn: 'environment',
        factory: () => new t(z(be)),
    });
    let e = t;
    return e;
})();
function ob(e) {
    ki('NgStandalone'),
        (e.getStandaloneInjector = (t) =>
            t.get(Vm).getOrCreateStandaloneInjector(e));
}
function ib(e, t, n) {
    let r = za() + e,
        o = _();
    return o[r] === pe ? Vc(o, r, n ? t.call(n) : t()) : Ug(o, r);
}
function Bm(e, t) {
    let n = e[t];
    return n === pe ? void 0 : n;
}
function $m(e, t, n, r, o, i) {
    let s = t + n;
    return vt(e, s, o) ? Vc(e, s + 1, i ? r.call(i, o) : r(o)) : Bm(e, s + 1);
}
function sb(e, t) {
    let n = L(),
        r,
        o = e + k;
    n.firstCreatePass
        ? ((r = Hm(t, n.pipeRegistry)),
          (n.data[o] = r),
          r.onDestroy && (n.destroyHooks ??= []).push(o, r.onDestroy))
        : (r = n.data[o]);
    let i = r.factory || (r.factory = $e(r.type, !0)),
        s,
        a = H(J);
    try {
        let u = Hn(!1),
            c = i();
        return Hn(u), Nm(n, _(), o, c), c;
    } finally {
        H(a);
    }
}
function Hm(e, t) {
    if (t)
        for (let n = t.length - 1; n >= 0; n--) {
            let r = t[n];
            if (e === r.name) return r;
        }
}
function ab(e, t, n) {
    let r = e + k,
        o = _(),
        i = Ba(o, r);
    return Um(o, r) ? $m(o, za(), t, i.transform, n, i) : i.transform(n);
}
function Um(e, t) {
    return e[y].data[t].pure;
}
function ub(e, t) {
    return Dr(e, t);
}
var cb = (() => {
    let t = class t {
        log(r) {
            console.log(r);
        }
        warn(r) {
            console.warn(r);
        }
    };
    (t.ɵfac = function (o) {
        return new (o || t)();
    }),
        (t.ɵprov = N({ token: t, factory: t.ɵfac, providedIn: 'platform' }));
    let e = t;
    return e;
})();
var Gm = new T('');
function Er(e) {
    return !!e && typeof e.then == 'function';
}
function Ui(e) {
    return !!e && typeof e.subscribe == 'function';
}
var zm = new T(''),
    il = (() => {
        let t = class t {
            constructor() {
                (this.initialized = !1),
                    (this.done = !1),
                    (this.donePromise = new Promise((r, o) => {
                        (this.resolve = r), (this.reject = o);
                    })),
                    (this.appInits = M(zm, { optional: !0 }) ?? []);
            }
            runInitializers() {
                if (this.initialized) return;
                let r = [];
                for (let i of this.appInits) {
                    let s = i();
                    if (Er(s)) r.push(s);
                    else if (Ui(s)) {
                        let a = new Promise((u, c) => {
                            s.subscribe({ complete: u, error: c });
                        });
                        r.push(a);
                    }
                }
                let o = () => {
                    (this.done = !0), this.resolve();
                };
                Promise.all(r)
                    .then(() => {
                        o();
                    })
                    .catch((i) => {
                        this.reject(i);
                    }),
                    r.length === 0 && o(),
                    (this.initialized = !0);
            }
        };
        (t.ɵfac = function (o) {
            return new (o || t)();
        }),
            (t.ɵprov = N({ token: t, factory: t.ɵfac, providedIn: 'root' }));
        let e = t;
        return e;
    })(),
    sl = new T('');
function Wm() {
    as(() => {
        throw new C(600, !1);
    });
}
function qm(e) {
    return e.isBoundToModule;
}
function Qm(e, t, n) {
    try {
        let r = n();
        return Er(r)
            ? r.catch((o) => {
                  throw (t.runOutsideAngular(() => e.handleError(o)), o);
              })
            : r;
    } catch (r) {
        throw (t.runOutsideAngular(() => e.handleError(r)), r);
    }
}
var Gi = (() => {
    let t = class t {
        constructor() {
            (this._bootstrapListeners = []),
                (this._runningTick = !1),
                (this._destroyed = !1),
                (this._destroyListeners = []),
                (this._views = []),
                (this.internalErrorHandler = M(Uu)),
                (this.afterRenderEffectManager = M(Oc)),
                (this.componentTypes = []),
                (this.components = []),
                (this.isStable = M(jc).hasPendingTasks.pipe(ge((r) => !r))),
                (this._injector = M(be));
        }
        get destroyed() {
            return this._destroyed;
        }
        get injector() {
            return this._injector;
        }
        bootstrap(r, o) {
            let i = r instanceof Yn;
            if (!this._injector.get(il).done) {
                let p = !i && Td(r),
                    h = !1;
                throw new C(405, h);
            }
            let a;
            i
                ? (a = r)
                : (a = this._injector.get(Ir).resolveComponentFactory(r)),
                this.componentTypes.push(a.componentType);
            let u = qm(a) ? void 0 : this._injector.get(_e),
                c = o || a.selector,
                l = a.create(Qt.NULL, [], c, u),
                d = l.location.nativeElement,
                f = l.injector.get(Gm, null);
            return (
                f?.registerApplication(d),
                l.onDestroy(() => {
                    this.detachView(l.hostView),
                        ro(this.components, l),
                        f?.unregisterApplication(d);
                }),
                this._loadComponent(l),
                l
            );
        }
        tick() {
            if (this._runningTick) throw new C(101, !1);
            try {
                (this._runningTick = !0), this.detectChangesInAttachedViews();
            } catch (r) {
                this.internalErrorHandler(r);
            } finally {
                this._runningTick = !1;
            }
        }
        detectChangesInAttachedViews() {
            let r = 0,
                o = this.afterRenderEffectManager;
            for (;;) {
                if (r === Cc) throw new C(103, !1);
                let i = r === 0;
                for (let { _lView: s, notifyErrorHandler: a } of this._views)
                    (!i && !oo(s)) || this.detectChangesInView(s, a, i);
                if (
                    (r++,
                    o.executeInternalCallbacks(),
                    !this._views.some(({ _lView: s }) => oo(s)) &&
                        (o.execute(),
                        !this._views.some(({ _lView: s }) => oo(s))))
                )
                    break;
            }
        }
        detectChangesInView(r, o, i) {
            let s;
            i ? ((s = 0), (r[g] |= 1024)) : r[g] & 64 ? (s = 0) : (s = 1),
                bc(r, o, s);
        }
        attachView(r) {
            let o = r;
            this._views.push(o), o.attachToAppRef(this);
        }
        detachView(r) {
            let o = r;
            ro(this._views, o), o.detachFromAppRef();
        }
        _loadComponent(r) {
            this.attachView(r.hostView), this.tick(), this.components.push(r);
            let o = this._injector.get(sl, []);
            [...this._bootstrapListeners, ...o].forEach((i) => i(r));
        }
        ngOnDestroy() {
            if (!this._destroyed)
                try {
                    this._destroyListeners.forEach((r) => r()),
                        this._views.slice().forEach((r) => r.destroy());
                } finally {
                    (this._destroyed = !0),
                        (this._views = []),
                        (this._bootstrapListeners = []),
                        (this._destroyListeners = []);
                }
        }
        onDestroy(r) {
            return (
                this._destroyListeners.push(r),
                () => ro(this._destroyListeners, r)
            );
        }
        destroy() {
            if (this._destroyed) throw new C(406, !1);
            let r = this._injector;
            r.destroy && !r.destroyed && r.destroy();
        }
        get viewCount() {
            return this._views.length;
        }
        warnIfDestroyed() {}
    };
    (t.ɵfac = function (o) {
        return new (o || t)();
    }),
        (t.ɵprov = N({ token: t, factory: t.ɵfac, providedIn: 'root' }));
    let e = t;
    return e;
})();
function ro(e, t) {
    let n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
}
var Mn;
function Ym(e) {
    Mn ??= new WeakMap();
    let t = Mn.get(e);
    if (t) return t;
    let n = e.isStable
        .pipe(Vr((r) => r))
        .toPromise()
        .then(() => {});
    return Mn.set(e, n), e.onDestroy(() => Mn?.delete(e)), n;
}
function oo(e) {
    return si(e);
}
var ti = class {
        constructor(t, n) {
            (this.ngModuleFactory = t), (this.componentFactories = n);
        }
    },
    lb = (() => {
        let t = class t {
            compileModuleSync(r) {
                return new Yo(r);
            }
            compileModuleAsync(r) {
                return Promise.resolve(this.compileModuleSync(r));
            }
            compileModuleAndAllComponentsSync(r) {
                let o = this.compileModuleSync(r),
                    i = Na(r),
                    s = Qu(i.declarations).reduce((a, u) => {
                        let c = je(u);
                        return c && a.push(new $t(c)), a;
                    }, []);
                return new ti(o, s);
            }
            compileModuleAndAllComponentsAsync(r) {
                return Promise.resolve(
                    this.compileModuleAndAllComponentsSync(r),
                );
            }
            clearCache() {}
            clearCacheFor(r) {}
            getModuleId(r) {}
        };
        (t.ɵfac = function (o) {
            return new (o || t)();
        }),
            (t.ɵprov = N({ token: t, factory: t.ɵfac, providedIn: 'root' }));
        let e = t;
        return e;
    })();
var Zm = (() => {
    let t = class t {
        constructor() {
            (this.zone = M(Y)), (this.applicationRef = M(Gi));
        }
        initialize() {
            this._onMicrotaskEmptySubscription ||
                (this._onMicrotaskEmptySubscription =
                    this.zone.onMicrotaskEmpty.subscribe({
                        next: () => {
                            this.zone.run(() => {
                                this.applicationRef.tick();
                            });
                        },
                    }));
        }
        ngOnDestroy() {
            this._onMicrotaskEmptySubscription?.unsubscribe();
        }
    };
    (t.ɵfac = function (o) {
        return new (o || t)();
    }),
        (t.ɵprov = N({ token: t, factory: t.ɵfac, providedIn: 'root' }));
    let e = t;
    return e;
})();
function Km(e) {
    return [
        { provide: Y, useFactory: e },
        {
            provide: Vt,
            multi: !0,
            useFactory: () => {
                let t = M(Zm, { optional: !0 });
                return () => t.initialize();
            },
        },
        {
            provide: Vt,
            multi: !0,
            useFactory: () => {
                let t = M(ty);
                return () => {
                    t.initialize();
                };
            },
        },
        { provide: Uu, useFactory: Jm },
    ];
}
function Jm() {
    let e = M(Y),
        t = M(pt);
    return (n) => e.runOutsideAngular(() => t.handleError(n));
}
function Xm(e) {
    let t = Km(() => new Y(ey(e)));
    return Eu([[], t]);
}
function ey(e) {
    return {
        enableLongStackTrace: !1,
        shouldCoalesceEventChangeDetection: e?.eventCoalescing ?? !1,
        shouldCoalesceRunChangeDetection: e?.runCoalescing ?? !1,
    };
}
var ty = (() => {
    let t = class t {
        constructor() {
            (this.subscription = new O()),
                (this.initialized = !1),
                (this.zone = M(Y)),
                (this.pendingTasks = M(jc));
        }
        initialize() {
            if (this.initialized) return;
            this.initialized = !0;
            let r = null;
            !this.zone.isStable &&
                !this.zone.hasPendingMacrotasks &&
                !this.zone.hasPendingMicrotasks &&
                (r = this.pendingTasks.add()),
                this.zone.runOutsideAngular(() => {
                    this.subscription.add(
                        this.zone.onStable.subscribe(() => {
                            Y.assertNotInAngularZone(),
                                queueMicrotask(() => {
                                    r !== null &&
                                        !this.zone.hasPendingMacrotasks &&
                                        !this.zone.hasPendingMicrotasks &&
                                        (this.pendingTasks.remove(r),
                                        (r = null));
                                });
                        }),
                    );
                }),
                this.subscription.add(
                    this.zone.onUnstable.subscribe(() => {
                        Y.assertInAngularZone(),
                            (r ??= this.pendingTasks.add());
                    }),
                );
        }
        ngOnDestroy() {
            this.subscription.unsubscribe();
        }
    };
    (t.ɵfac = function (o) {
        return new (o || t)();
    }),
        (t.ɵprov = N({ token: t, factory: t.ɵfac, providedIn: 'root' }));
    let e = t;
    return e;
})();
function ny() {
    return (typeof $localize < 'u' && $localize.locale) || tr;
}
var zi = new T('', {
    providedIn: 'root',
    factory: () => M(zi, I.Optional | I.SkipSelf) || ny(),
});
var al = new T('');
var On = null;
function ry(e = [], t) {
    return Qt.create({
        name: t,
        providers: [
            { provide: _u, useValue: 'platform' },
            { provide: al, useValue: new Set([() => (On = null)]) },
            ...e,
        ],
    });
}
function oy(e = []) {
    if (On) return On;
    let t = ry(e);
    return (On = t), Wm(), iy(t), t;
}
function iy(e) {
    e.get(gf, null)?.forEach((n) => n());
}
function db(e) {
    try {
        let { rootComponent: t, appProviders: n, platformProviders: r } = e,
            o = oy(r),
            i = [Xm(), ...(n || [])],
            a = new Xn({
                providers: i,
                parent: o,
                debugName: '',
                runEnvironmentInitializers: !1,
            }).injector,
            u = a.get(Y);
        return u.run(() => {
            a.resolveInjectorInitializers();
            let c = a.get(pt, null),
                l;
            u.runOutsideAngular(() => {
                l = u.onError.subscribe({
                    next: (p) => {
                        c.handleError(p);
                    },
                });
            });
            let d = () => a.destroy(),
                f = o.get(al);
            return (
                f.add(d),
                a.onDestroy(() => {
                    l.unsubscribe(), f.delete(d);
                }),
                Qm(c, u, () => {
                    let p = a.get(il);
                    return (
                        p.runInitializers(),
                        p.donePromise.then(() => {
                            let h = a.get(zi, tr);
                            xm(h || tr);
                            let E = a.get(Gi);
                            return t !== void 0 && E.bootstrap(t), E;
                        })
                    );
                })
            );
        });
    } catch (t) {
        return Promise.reject(t);
    }
}
var wa = !1;
function sy() {
    wa || ((wa = !0), jf(), Im(), Fm(), Mm(), qg(), Ag(), ng(), ah());
}
function ay(e, t) {
    return Ym(e);
}
function fb() {
    return Eu([
        {
            provide: En,
            useFactory: () => {
                let e = !0;
                return (
                    Cn() && (e = !!M(mi, { optional: !0 })?.get(mu, null)),
                    e && ki('NgHydration'),
                    e
                );
            },
        },
        {
            provide: Vt,
            useValue: () => {
                Cn() && M(En) && (uy(), sy());
            },
            multi: !0,
        },
        { provide: zu, useFactory: () => Cn() && M(En) },
        {
            provide: sl,
            useFactory: () => {
                if (Cn() && M(En)) {
                    let e = M(Gi),
                        t = M(Qt);
                    return () => {
                        ay(e, t).then(() => {
                            Y.assertInAngularZone(), Qh(e);
                        });
                    };
                }
                return () => {};
            },
            multi: !0,
        },
    ]);
}
function uy() {
    let e = sr(),
        t;
    for (let n of e.body.childNodes)
        if (n.nodeType === Node.COMMENT_NODE && n.textContent?.trim() === kf) {
            t = n;
            break;
        }
    if (!t) throw new C(-507, !1);
}
function cy(e, t = NaN) {
    return !isNaN(parseFloat(e)) && !isNaN(Number(e)) ? Number(e) : t;
}
var hl = null;
function Wi() {
    return hl;
}
function Lb(e) {
    hl ??= e;
}
var ul = class {};
var gl = new T(''),
    ml = (() => {
        let t = class t {
            historyGo(r) {
                throw new Error('');
            }
        };
        (t.ɵfac = function (o) {
            return new (o || t)();
        }),
            (t.ɵprov = N({
                token: t,
                factory: () => M(fy),
                providedIn: 'platform',
            }));
        let e = t;
        return e;
    })();
var fy = (() => {
    let t = class t extends ml {
        constructor() {
            super(),
                (this._doc = M(gl)),
                (this._location = window.location),
                (this._history = window.history);
        }
        getBaseHrefFromDOM() {
            return Wi().getBaseHref(this._doc);
        }
        onPopState(r) {
            let o = Wi().getGlobalEventTarget(this._doc, 'window');
            return (
                o.addEventListener('popstate', r, !1),
                () => o.removeEventListener('popstate', r)
            );
        }
        onHashChange(r) {
            let o = Wi().getGlobalEventTarget(this._doc, 'window');
            return (
                o.addEventListener('hashchange', r, !1),
                () => o.removeEventListener('hashchange', r)
            );
        }
        get href() {
            return this._location.href;
        }
        get protocol() {
            return this._location.protocol;
        }
        get hostname() {
            return this._location.hostname;
        }
        get port() {
            return this._location.port;
        }
        get pathname() {
            return this._location.pathname;
        }
        get search() {
            return this._location.search;
        }
        get hash() {
            return this._location.hash;
        }
        set pathname(r) {
            this._location.pathname = r;
        }
        pushState(r, o, i) {
            this._history.pushState(r, o, i);
        }
        replaceState(r, o, i) {
            this._history.replaceState(r, o, i);
        }
        forward() {
            this._history.forward();
        }
        back() {
            this._history.back();
        }
        historyGo(r = 0) {
            this._history.go(r);
        }
        getState() {
            return this._history.state;
        }
    };
    (t.ɵfac = function (o) {
        return new (o || t)();
    }),
        (t.ɵprov = N({
            token: t,
            factory: () => new t(),
            providedIn: 'platform',
        }));
    let e = t;
    return e;
})();
function yl(e, t) {
    if (e.length == 0) return t;
    if (t.length == 0) return e;
    let n = 0;
    return (
        e.endsWith('/') && n++,
        t.startsWith('/') && n++,
        n == 2 ? e + t.substring(1) : n == 1 ? e + t : e + '/' + t
    );
}
function cl(e) {
    let t = e.match(/#|\?|$/),
        n = (t && t.index) || e.length,
        r = n - (e[n - 1] === '/' ? 1 : 0);
    return e.slice(0, r) + e.slice(n);
}
function Ke(e) {
    return e && e[0] !== '?' ? '?' + e : e;
}
var Ki = (() => {
        let t = class t {
            historyGo(r) {
                throw new Error('');
            }
        };
        (t.ɵfac = function (o) {
            return new (o || t)();
        }),
            (t.ɵprov = N({
                token: t,
                factory: () => M(hy),
                providedIn: 'root',
            }));
        let e = t;
        return e;
    })(),
    py = new T(''),
    hy = (() => {
        let t = class t extends Ki {
            constructor(r, o) {
                super(),
                    (this._platformLocation = r),
                    (this._removeListenerFns = []),
                    (this._baseHref =
                        o ??
                        this._platformLocation.getBaseHrefFromDOM() ??
                        M(gl).location?.origin ??
                        '');
            }
            ngOnDestroy() {
                for (; this._removeListenerFns.length; )
                    this._removeListenerFns.pop()();
            }
            onPopState(r) {
                this._removeListenerFns.push(
                    this._platformLocation.onPopState(r),
                    this._platformLocation.onHashChange(r),
                );
            }
            getBaseHref() {
                return this._baseHref;
            }
            prepareExternalUrl(r) {
                return yl(this._baseHref, r);
            }
            path(r = !1) {
                let o =
                        this._platformLocation.pathname +
                        Ke(this._platformLocation.search),
                    i = this._platformLocation.hash;
                return i && r ? `${o}${i}` : o;
            }
            pushState(r, o, i, s) {
                let a = this.prepareExternalUrl(i + Ke(s));
                this._platformLocation.pushState(r, o, a);
            }
            replaceState(r, o, i, s) {
                let a = this.prepareExternalUrl(i + Ke(s));
                this._platformLocation.replaceState(r, o, a);
            }
            forward() {
                this._platformLocation.forward();
            }
            back() {
                this._platformLocation.back();
            }
            getState() {
                return this._platformLocation.getState();
            }
            historyGo(r = 0) {
                this._platformLocation.historyGo?.(r);
            }
        };
        (t.ɵfac = function (o) {
            return new (o || t)(z(ml), z(py, 8));
        }),
            (t.ɵprov = N({ token: t, factory: t.ɵfac, providedIn: 'root' }));
        let e = t;
        return e;
    })();
var gy = (() => {
    let t = class t {
        constructor(r) {
            (this._subject = new Pe()),
                (this._urlChangeListeners = []),
                (this._urlChangeSubscription = null),
                (this._locationStrategy = r);
            let o = this._locationStrategy.getBaseHref();
            (this._basePath = Dy(cl(ll(o)))),
                this._locationStrategy.onPopState((i) => {
                    this._subject.emit({
                        url: this.path(!0),
                        pop: !0,
                        state: i.state,
                        type: i.type,
                    });
                });
        }
        ngOnDestroy() {
            this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeListeners = []);
        }
        path(r = !1) {
            return this.normalize(this._locationStrategy.path(r));
        }
        getState() {
            return this._locationStrategy.getState();
        }
        isCurrentPathEqualTo(r, o = '') {
            return this.path() == this.normalize(r + Ke(o));
        }
        normalize(r) {
            return t.stripTrailingSlash(yy(this._basePath, ll(r)));
        }
        prepareExternalUrl(r) {
            return (
                r && r[0] !== '/' && (r = '/' + r),
                this._locationStrategy.prepareExternalUrl(r)
            );
        }
        go(r, o = '', i = null) {
            this._locationStrategy.pushState(i, '', r, o),
                this._notifyUrlChangeListeners(
                    this.prepareExternalUrl(r + Ke(o)),
                    i,
                );
        }
        replaceState(r, o = '', i = null) {
            this._locationStrategy.replaceState(i, '', r, o),
                this._notifyUrlChangeListeners(
                    this.prepareExternalUrl(r + Ke(o)),
                    i,
                );
        }
        forward() {
            this._locationStrategy.forward();
        }
        back() {
            this._locationStrategy.back();
        }
        historyGo(r = 0) {
            this._locationStrategy.historyGo?.(r);
        }
        onUrlChange(r) {
            return (
                this._urlChangeListeners.push(r),
                (this._urlChangeSubscription ??= this.subscribe((o) => {
                    this._notifyUrlChangeListeners(o.url, o.state);
                })),
                () => {
                    let o = this._urlChangeListeners.indexOf(r);
                    this._urlChangeListeners.splice(o, 1),
                        this._urlChangeListeners.length === 0 &&
                            (this._urlChangeSubscription?.unsubscribe(),
                            (this._urlChangeSubscription = null));
                }
            );
        }
        _notifyUrlChangeListeners(r = '', o) {
            this._urlChangeListeners.forEach((i) => i(r, o));
        }
        subscribe(r, o, i) {
            return this._subject.subscribe({ next: r, error: o, complete: i });
        }
    };
    (t.normalizeQueryParams = Ke),
        (t.joinWithSlash = yl),
        (t.stripTrailingSlash = cl),
        (t.ɵfac = function (o) {
            return new (o || t)(z(Ki));
        }),
        (t.ɵprov = N({ token: t, factory: () => my(), providedIn: 'root' }));
    let e = t;
    return e;
})();
function my() {
    return new gy(z(Ki));
}
function yy(e, t) {
    if (!e || !t.startsWith(e)) return t;
    let n = t.substring(e.length);
    return n === '' || ['/', ';', '?', '#'].includes(n[0]) ? n : t;
}
function ll(e) {
    return e.replace(/\/index.html$/, '');
}
function Dy(e) {
    if (new RegExp('^(https?:)?//').test(e)) {
        let [, n] = e.split(/\/\/[^\/]+/);
        return n;
    }
    return e;
}
function jb(e, t) {
    t = encodeURIComponent(t);
    for (let n of e.split(';')) {
        let r = n.indexOf('='),
            [o, i] = r == -1 ? [n, ''] : [n.slice(0, r), n.slice(r + 1)];
        if (o.trim() === t) return decodeURIComponent(i);
    }
    return null;
}
var qi = class {
        constructor(t, n, r, o) {
            (this.$implicit = t),
                (this.ngForOf = n),
                (this.index = r),
                (this.count = o);
        }
        get first() {
            return this.index === 0;
        }
        get last() {
            return this.index === this.count - 1;
        }
        get even() {
            return this.index % 2 === 0;
        }
        get odd() {
            return !this.even;
        }
    },
    Vb = (() => {
        let t = class t {
            set ngForOf(r) {
                (this._ngForOf = r), (this._ngForOfDirty = !0);
            }
            set ngForTrackBy(r) {
                this._trackByFn = r;
            }
            get ngForTrackBy() {
                return this._trackByFn;
            }
            constructor(r, o, i) {
                (this._viewContainer = r),
                    (this._template = o),
                    (this._differs = i),
                    (this._ngForOf = null),
                    (this._ngForOfDirty = !0),
                    (this._differ = null);
            }
            set ngForTemplate(r) {
                r && (this._template = r);
            }
            ngDoCheck() {
                if (this._ngForOfDirty) {
                    this._ngForOfDirty = !1;
                    let r = this._ngForOf;
                    if (!this._differ && r)
                        if (0)
                            try {
                            } catch {}
                        else
                            this._differ = this._differs
                                .find(r)
                                .create(this.ngForTrackBy);
                }
                if (this._differ) {
                    let r = this._differ.diff(this._ngForOf);
                    r && this._applyChanges(r);
                }
            }
            _applyChanges(r) {
                let o = this._viewContainer;
                r.forEachOperation((i, s, a) => {
                    if (i.previousIndex == null)
                        o.createEmbeddedView(
                            this._template,
                            new qi(i.item, this._ngForOf, -1, -1),
                            a === null ? void 0 : a,
                        );
                    else if (a == null) o.remove(s === null ? void 0 : s);
                    else if (s !== null) {
                        let u = o.get(s);
                        o.move(u, a), dl(u, i);
                    }
                });
                for (let i = 0, s = o.length; i < s; i++) {
                    let u = o.get(i).context;
                    (u.index = i), (u.count = s), (u.ngForOf = this._ngForOf);
                }
                r.forEachIdentityChange((i) => {
                    let s = o.get(i.currentIndex);
                    dl(s, i);
                });
            }
            static ngTemplateContextGuard(r, o) {
                return !0;
            }
        };
        (t.ɵfac = function (o) {
            return new (o || t)(J(Ze), J(ze), J(ji));
        }),
            (t.ɵdir = nr({
                type: t,
                selectors: [['', 'ngFor', '', 'ngForOf', '']],
                inputs: {
                    ngForOf: 'ngForOf',
                    ngForTrackBy: 'ngForTrackBy',
                    ngForTemplate: 'ngForTemplate',
                },
                standalone: !0,
            }));
        let e = t;
        return e;
    })();
function dl(e, t) {
    e.context.$implicit = t.item;
}
var Bb = (() => {
        let t = class t {
            constructor(r, o) {
                (this._viewContainer = r),
                    (this._context = new Qi()),
                    (this._thenTemplateRef = null),
                    (this._elseTemplateRef = null),
                    (this._thenViewRef = null),
                    (this._elseViewRef = null),
                    (this._thenTemplateRef = o);
            }
            set ngIf(r) {
                (this._context.$implicit = this._context.ngIf = r),
                    this._updateView();
            }
            set ngIfThen(r) {
                fl('ngIfThen', r),
                    (this._thenTemplateRef = r),
                    (this._thenViewRef = null),
                    this._updateView();
            }
            set ngIfElse(r) {
                fl('ngIfElse', r),
                    (this._elseTemplateRef = r),
                    (this._elseViewRef = null),
                    this._updateView();
            }
            _updateView() {
                this._context.$implicit
                    ? this._thenViewRef ||
                      (this._viewContainer.clear(),
                      (this._elseViewRef = null),
                      this._thenTemplateRef &&
                          (this._thenViewRef =
                              this._viewContainer.createEmbeddedView(
                                  this._thenTemplateRef,
                                  this._context,
                              )))
                    : this._elseViewRef ||
                      (this._viewContainer.clear(),
                      (this._thenViewRef = null),
                      this._elseTemplateRef &&
                          (this._elseViewRef =
                              this._viewContainer.createEmbeddedView(
                                  this._elseTemplateRef,
                                  this._context,
                              )));
            }
            static ngTemplateContextGuard(r, o) {
                return !0;
            }
        };
        (t.ɵfac = function (o) {
            return new (o || t)(J(Ze), J(ze));
        }),
            (t.ɵdir = nr({
                type: t,
                selectors: [['', 'ngIf', '']],
                inputs: {
                    ngIf: 'ngIf',
                    ngIfThen: 'ngIfThen',
                    ngIfElse: 'ngIfElse',
                },
                standalone: !0,
            }));
        let e = t;
        return e;
    })(),
    Qi = class {
        constructor() {
            (this.$implicit = null), (this.ngIf = null);
        }
    };
function fl(e, t) {
    if (!!!(!t || t.createEmbeddedView))
        throw new Error(`${e} must be a TemplateRef, but received '${B(t)}'.`);
}
var $b = (() => {
    let t = class t {
        constructor(r) {
            (this._viewContainerRef = r),
                (this._viewRef = null),
                (this.ngTemplateOutletContext = null),
                (this.ngTemplateOutlet = null),
                (this.ngTemplateOutletInjector = null);
        }
        ngOnChanges(r) {
            if (this._shouldRecreateView(r)) {
                let o = this._viewContainerRef;
                if (
                    (this._viewRef && o.remove(o.indexOf(this._viewRef)),
                    !this.ngTemplateOutlet)
                ) {
                    this._viewRef = null;
                    return;
                }
                let i = this._createContextForwardProxy();
                this._viewRef = o.createEmbeddedView(this.ngTemplateOutlet, i, {
                    injector: this.ngTemplateOutletInjector ?? void 0,
                });
            }
        }
        _shouldRecreateView(r) {
            return !!r.ngTemplateOutlet || !!r.ngTemplateOutletInjector;
        }
        _createContextForwardProxy() {
            return new Proxy(
                {},
                {
                    set: (r, o, i) =>
                        this.ngTemplateOutletContext
                            ? Reflect.set(this.ngTemplateOutletContext, o, i)
                            : !1,
                    get: (r, o, i) => {
                        if (this.ngTemplateOutletContext)
                            return Reflect.get(
                                this.ngTemplateOutletContext,
                                o,
                                i,
                            );
                    },
                },
            );
        }
    };
    (t.ɵfac = function (o) {
        return new (o || t)(J(Ze));
    }),
        (t.ɵdir = nr({
            type: t,
            selectors: [['', 'ngTemplateOutlet', '']],
            inputs: {
                ngTemplateOutletContext: 'ngTemplateOutletContext',
                ngTemplateOutlet: 'ngTemplateOutlet',
                ngTemplateOutletInjector: 'ngTemplateOutletInjector',
            },
            standalone: !0,
            features: [Ei],
        }));
    let e = t;
    return e;
})();
function vy(e, t) {
    return new C(2100, !1);
}
var Yi = class {
        createSubscription(t, n) {
            return Li(() =>
                t.subscribe({
                    next: n,
                    error: (r) => {
                        throw r;
                    },
                }),
            );
        }
        dispose(t) {
            Li(() => t.unsubscribe());
        }
    },
    Zi = class {
        createSubscription(t, n) {
            return t.then(n, (r) => {
                throw r;
            });
        }
        dispose(t) {}
    },
    wy = new Zi(),
    Iy = new Yi(),
    Hb = (() => {
        let t = class t {
            constructor(r) {
                (this._latestValue = null),
                    (this.markForCheckOnValueUpdate = !0),
                    (this._subscription = null),
                    (this._obj = null),
                    (this._strategy = null),
                    (this._ref = r);
            }
            ngOnDestroy() {
                this._subscription && this._dispose(), (this._ref = null);
            }
            transform(r) {
                if (!this._obj) {
                    if (r)
                        try {
                            (this.markForCheckOnValueUpdate = !1),
                                this._subscribe(r);
                        } finally {
                            this.markForCheckOnValueUpdate = !0;
                        }
                    return this._latestValue;
                }
                return r !== this._obj
                    ? (this._dispose(), this.transform(r))
                    : this._latestValue;
            }
            _subscribe(r) {
                (this._obj = r),
                    (this._strategy = this._selectStrategy(r)),
                    (this._subscription = this._strategy.createSubscription(
                        r,
                        (o) => this._updateLatestValue(r, o),
                    ));
            }
            _selectStrategy(r) {
                if (Er(r)) return wy;
                if (Ui(r)) return Iy;
                throw vy(t, r);
            }
            _dispose() {
                this._strategy.dispose(this._subscription),
                    (this._latestValue = null),
                    (this._subscription = null),
                    (this._obj = null);
            }
            _updateLatestValue(r, o) {
                r === this._obj &&
                    ((this._latestValue = o),
                    this.markForCheckOnValueUpdate &&
                        this._ref?.markForCheck());
            }
        };
        (t.ɵfac = function (o) {
            return new (o || t)(J(Vi, 16));
        }),
            (t.ɵpipe = Ta({
                name: 'async',
                type: t,
                pure: !1,
                standalone: !0,
            }));
        let e = t;
        return e;
    })();
var Ub = (() => {
        let t = class t {};
        (t.ɵfac = function (o) {
            return new (o || t)();
        }),
            (t.ɵmod = xa({ type: t })),
            (t.ɵinj = iu({}));
        let e = t;
        return e;
    })(),
    Ey = 'browser',
    Cy = 'server';
function Gb(e) {
    return e === Ey;
}
function zb(e) {
    return e === Cy;
}
var pl = class {};
export {
    It as a,
    Et as b,
    by as c,
    O as d,
    Al as e,
    b as f,
    Pr as g,
    kr as h,
    rt as i,
    bt as j,
    _t as k,
    Ie as l,
    Bl as m,
    $l as n,
    Hl as o,
    Oe as p,
    ge as q,
    Zl as r,
    Fe as s,
    vn as t,
    Jl as u,
    Re as v,
    Ls as w,
    Xl as x,
    ed as y,
    xt as z,
    jr as A,
    td as B,
    rd as C,
    Vr as D,
    Br as E,
    od as F,
    id as G,
    sd as H,
    ad as I,
    ud as J,
    Vs as K,
    cd as L,
    C as M,
    Pe as N,
    I as O,
    Nt as P,
    Le as Q,
    kC as R,
    xa as S,
    nr as T,
    LC as U,
    jC as V,
    Dt as W,
    VC as X,
    N as Y,
    iu as Z,
    BC as _,
    T as $,
    pf as aa,
    gf as ba,
    hi as ca,
    $C as da,
    HC as ea,
    z as fa,
    M as ga,
    mi as ha,
    Eu as ia,
    Wf as ja,
    _u as ka,
    be as la,
    UC as ma,
    Ei as na,
    GC as oa,
    Qt as pa,
    pt as qa,
    zC as ra,
    zn as sa,
    WC as ta,
    J as ua,
    qC as va,
    Ao as wa,
    Fo as xa,
    ki as ya,
    Vi as za,
    Y as Aa,
    Ze as Ba,
    $g as Ca,
    qo as Da,
    Hg as Ea,
    jc as Fa,
    zg as Ga,
    Qg as Ha,
    sm as Ia,
    Gc as Ja,
    am as Ka,
    ZC as La,
    Zc as Ma,
    Kc as Na,
    vm as Oa,
    Cm as Pa,
    Tm as Qa,
    KC as Ra,
    JC as Sa,
    XC as Ta,
    eb as Ua,
    tb as Va,
    nb as Wa,
    Rm as Xa,
    rl as Ya,
    rb as Za,
    ob as _a,
    ib as $a,
    sb as ab,
    ab as bb,
    ub as cb,
    cb as db,
    Er as eb,
    sl as fb,
    Gi as gb,
    Ym as hb,
    lb as ib,
    db as jb,
    fb as kb,
    cy as lb,
    Wi as mb,
    Lb as nb,
    ul as ob,
    gl as pb,
    gy as qb,
    jb as rb,
    Vb as sb,
    Bb as tb,
    $b as ub,
    Hb as vb,
    Ub as wb,
    Ey as xb,
    Gb as yb,
    zb,
    pl as Ab,
};
