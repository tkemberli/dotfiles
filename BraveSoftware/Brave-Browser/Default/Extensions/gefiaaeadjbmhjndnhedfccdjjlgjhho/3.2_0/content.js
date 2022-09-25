(() => {
  // output/Background.Main/foreign.js
  function addOnMessageListener(listener) {
    return function() {
      chrome.runtime.onMessage.addListener(function(message4, sender, sendResponse) {
        listener(message4)(sender)(function(response) {
          return function() {
            sendResponse(response);
          };
        })();
        return true;
      });
    };
  }
  function getSyncObject(object2) {
    return function(callback) {
      return function() {
        chrome.storage.sync.get(object2, function(data) {
          callback(data)();
        });
      };
    };
  }

  // output/Control.Semigroupoid/index.js
  var semigroupoidFn = {
    compose: function(f) {
      return function(g) {
        return function(x2) {
          return f(g(x2));
        };
      };
    }
  };
  var compose = function(dict) {
    return dict.compose;
  };

  // output/Control.Category/index.js
  var identity = function(dict) {
    return dict.identity;
  };
  var categoryFn = {
    identity: function(x2) {
      return x2;
    },
    Semigroupoid0: function() {
      return semigroupoidFn;
    }
  };

  // output/Data.Boolean/index.js
  var otherwise = true;

  // output/Data.Function/index.js
  var flip = function(f) {
    return function(b2) {
      return function(a2) {
        return f(a2)(b2);
      };
    };
  };
  var $$const = function(a2) {
    return function(v) {
      return a2;
    };
  };

  // output/Data.Unit/foreign.js
  var unit = void 0;

  // output/Data.Functor/index.js
  var map = function(dict) {
    return dict.map;
  };
  var mapFlipped = function(dictFunctor) {
    var map12 = map(dictFunctor);
    return function(fa) {
      return function(f) {
        return map12(f)(fa);
      };
    };
  };
  var $$void = function(dictFunctor) {
    return map(dictFunctor)($$const(unit));
  };
  var functorFn = {
    map: /* @__PURE__ */ compose(semigroupoidFn)
  };

  // output/Control.Apply/index.js
  var identity2 = /* @__PURE__ */ identity(categoryFn);
  var apply = function(dict) {
    return dict.apply;
  };
  var applySecond = function(dictApply) {
    var apply1 = apply(dictApply);
    var map6 = map(dictApply.Functor0());
    return function(a2) {
      return function(b2) {
        return apply1(map6($$const(identity2))(a2))(b2);
      };
    };
  };
  var lift2 = function(dictApply) {
    var apply1 = apply(dictApply);
    var map6 = map(dictApply.Functor0());
    return function(f) {
      return function(a2) {
        return function(b2) {
          return apply1(map6(f)(a2))(b2);
        };
      };
    };
  };
  var lift3 = function(dictApply) {
    var apply1 = apply(dictApply);
    var map6 = map(dictApply.Functor0());
    return function(f) {
      return function(a2) {
        return function(b2) {
          return function(c) {
            return apply1(apply1(map6(f)(a2))(b2))(c);
          };
        };
      };
    };
  };

  // output/Control.Applicative/index.js
  var pure = function(dict) {
    return dict.pure;
  };
  var when = function(dictApplicative) {
    var pure1 = pure(dictApplicative);
    return function(v) {
      return function(v1) {
        if (v) {
          return v1;
        }
        ;
        if (!v) {
          return pure1(unit);
        }
        ;
        throw new Error("Failed pattern match at Control.Applicative (line 63, column 1 - line 63, column 63): " + [v.constructor.name, v1.constructor.name]);
      };
    };
  };
  var liftA1 = function(dictApplicative) {
    var apply2 = apply(dictApplicative.Apply0());
    var pure1 = pure(dictApplicative);
    return function(f) {
      return function(a2) {
        return apply2(pure1(f))(a2);
      };
    };
  };

  // output/Control.Bind/index.js
  var identity3 = /* @__PURE__ */ identity(categoryFn);
  var bind = function(dict) {
    return dict.bind;
  };
  var bindFlipped = function(dictBind) {
    return flip(bind(dictBind));
  };
  var composeKleisli = function(dictBind) {
    var bind12 = bind(dictBind);
    return function(f) {
      return function(g) {
        return function(a2) {
          return bind12(f(a2))(g);
        };
      };
    };
  };
  var ifM = function(dictBind) {
    var bind12 = bind(dictBind);
    return function(cond) {
      return function(t) {
        return function(f) {
          return bind12(cond)(function(cond$prime) {
            if (cond$prime) {
              return t;
            }
            ;
            return f;
          });
        };
      };
    };
  };
  var join = function(dictBind) {
    var bind12 = bind(dictBind);
    return function(m) {
      return bind12(m)(identity3);
    };
  };

  // output/Data.Semigroup/foreign.js
  var concatArray = function(xs) {
    return function(ys) {
      if (xs.length === 0)
        return ys;
      if (ys.length === 0)
        return xs;
      return xs.concat(ys);
    };
  };

  // output/Data.Semigroup/index.js
  var semigroupArray = {
    append: concatArray
  };
  var append = function(dict) {
    return dict.append;
  };

  // output/Data.Bounded/foreign.js
  var topInt = 2147483647;
  var bottomInt = -2147483648;
  var topChar = String.fromCharCode(65535);
  var bottomChar = String.fromCharCode(0);
  var topNumber = Number.POSITIVE_INFINITY;
  var bottomNumber = Number.NEGATIVE_INFINITY;

  // output/Data.Ord/foreign.js
  var unsafeCompareImpl = function(lt) {
    return function(eq2) {
      return function(gt) {
        return function(x2) {
          return function(y2) {
            return x2 < y2 ? lt : x2 === y2 ? eq2 : gt;
          };
        };
      };
    };
  };
  var ordIntImpl = unsafeCompareImpl;
  var ordNumberImpl = unsafeCompareImpl;

  // output/Data.Eq/foreign.js
  var refEq = function(r1) {
    return function(r2) {
      return r1 === r2;
    };
  };
  var eqIntImpl = refEq;
  var eqNumberImpl = refEq;

  // output/Data.Eq/index.js
  var eqNumber = {
    eq: eqNumberImpl
  };
  var eqInt = {
    eq: eqIntImpl
  };

  // output/Data.Ordering/index.js
  var LT = /* @__PURE__ */ function() {
    function LT2() {
    }
    ;
    LT2.value = new LT2();
    return LT2;
  }();
  var GT = /* @__PURE__ */ function() {
    function GT2() {
    }
    ;
    GT2.value = new GT2();
    return GT2;
  }();
  var EQ = /* @__PURE__ */ function() {
    function EQ2() {
    }
    ;
    EQ2.value = new EQ2();
    return EQ2;
  }();

  // output/Data.Ring/foreign.js
  var numSub = function(n1) {
    return function(n2) {
      return n1 - n2;
    };
  };

  // output/Data.Semiring/foreign.js
  var numAdd = function(n1) {
    return function(n2) {
      return n1 + n2;
    };
  };
  var numMul = function(n1) {
    return function(n2) {
      return n1 * n2;
    };
  };

  // output/Data.Semiring/index.js
  var zero = function(dict) {
    return dict.zero;
  };
  var semiringNumber = {
    add: numAdd,
    zero: 0,
    mul: numMul,
    one: 1
  };
  var one = function(dict) {
    return dict.one;
  };
  var mul = function(dict) {
    return dict.mul;
  };
  var add = function(dict) {
    return dict.add;
  };
  var semiringFn = function(dictSemiring) {
    var add1 = add(dictSemiring);
    var zero1 = zero(dictSemiring);
    var mul1 = mul(dictSemiring);
    var one1 = one(dictSemiring);
    return {
      add: function(f) {
        return function(g) {
          return function(x2) {
            return add1(f(x2))(g(x2));
          };
        };
      },
      zero: function(v) {
        return zero1;
      },
      mul: function(f) {
        return function(g) {
          return function(x2) {
            return mul1(f(x2))(g(x2));
          };
        };
      },
      one: function(v) {
        return one1;
      }
    };
  };

  // output/Data.Ring/index.js
  var sub = function(dict) {
    return dict.sub;
  };
  var ringNumber = {
    sub: numSub,
    Semiring0: function() {
      return semiringNumber;
    }
  };
  var ringFn = function(dictRing) {
    var sub12 = sub(dictRing);
    var semiringFn2 = semiringFn(dictRing.Semiring0());
    return {
      sub: function(f) {
        return function(g) {
          return function(x2) {
            return sub12(f(x2))(g(x2));
          };
        };
      },
      Semiring0: function() {
        return semiringFn2;
      }
    };
  };
  var negate = function(dictRing) {
    var sub12 = sub(dictRing);
    var zero2 = zero(dictRing.Semiring0());
    return function(a2) {
      return sub12(zero2)(a2);
    };
  };

  // output/Data.Ord/index.js
  var ordNumber = /* @__PURE__ */ function() {
    return {
      compare: ordNumberImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqNumber;
      }
    };
  }();
  var ordInt = /* @__PURE__ */ function() {
    return {
      compare: ordIntImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqInt;
      }
    };
  }();
  var compare = function(dict) {
    return dict.compare;
  };
  var greaterThan = function(dictOrd) {
    var compare3 = compare(dictOrd);
    return function(a1) {
      return function(a2) {
        var v = compare3(a1)(a2);
        if (v instanceof GT) {
          return true;
        }
        ;
        return false;
      };
    };
  };
  var greaterThanOrEq = function(dictOrd) {
    var compare3 = compare(dictOrd);
    return function(a1) {
      return function(a2) {
        var v = compare3(a1)(a2);
        if (v instanceof LT) {
          return false;
        }
        ;
        return true;
      };
    };
  };
  var lessThan = function(dictOrd) {
    var compare3 = compare(dictOrd);
    return function(a1) {
      return function(a2) {
        var v = compare3(a1)(a2);
        if (v instanceof LT) {
          return true;
        }
        ;
        return false;
      };
    };
  };
  var signum = function(dictOrd) {
    var lessThan1 = lessThan(dictOrd);
    var greaterThan12 = greaterThan(dictOrd);
    return function(dictRing) {
      var Semiring0 = dictRing.Semiring0();
      var zero2 = zero(Semiring0);
      var negate12 = negate(dictRing);
      var one2 = one(Semiring0);
      return function(x2) {
        var $89 = lessThan1(x2)(zero2);
        if ($89) {
          return negate12(one2);
        }
        ;
        var $90 = greaterThan12(x2)(zero2);
        if ($90) {
          return one2;
        }
        ;
        return x2;
      };
    };
  };
  var abs = function(dictOrd) {
    var greaterThanOrEq1 = greaterThanOrEq(dictOrd);
    return function(dictRing) {
      var zero2 = zero(dictRing.Semiring0());
      var negate12 = negate(dictRing);
      return function(x2) {
        var $99 = greaterThanOrEq1(x2)(zero2);
        if ($99) {
          return x2;
        }
        ;
        return negate12(x2);
      };
    };
  };

  // output/Data.Bounded/index.js
  var top = function(dict) {
    return dict.top;
  };
  var boundedInt = {
    top: topInt,
    bottom: bottomInt,
    Ord0: function() {
      return ordInt;
    }
  };
  var bottom = function(dict) {
    return dict.bottom;
  };

  // output/Data.Show/foreign.js
  var showIntImpl = function(n) {
    return n.toString();
  };
  var showNumberImpl = function(n) {
    var str = n.toString();
    return isNaN(str + ".0") ? str : str + ".0";
  };

  // output/Data.Show/index.js
  var showNumber = {
    show: showNumberImpl
  };
  var showInt = {
    show: showIntImpl
  };
  var show = function(dict) {
    return dict.show;
  };

  // output/Data.Maybe/index.js
  var identity4 = /* @__PURE__ */ identity(categoryFn);
  var Nothing = /* @__PURE__ */ function() {
    function Nothing2() {
    }
    ;
    Nothing2.value = new Nothing2();
    return Nothing2;
  }();
  var Just = /* @__PURE__ */ function() {
    function Just2(value0) {
      this.value0 = value0;
    }
    ;
    Just2.create = function(value0) {
      return new Just2(value0);
    };
    return Just2;
  }();
  var maybe = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2 instanceof Nothing) {
          return v;
        }
        ;
        if (v2 instanceof Just) {
          return v1(v2.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 237, column 1 - line 237, column 51): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  };
  var functorMaybe = {
    map: function(v) {
      return function(v1) {
        if (v1 instanceof Just) {
          return new Just(v(v1.value0));
        }
        ;
        return Nothing.value;
      };
    }
  };
  var map2 = /* @__PURE__ */ map(functorMaybe);
  var fromMaybe = function(a2) {
    return maybe(a2)(identity4);
  };
  var applyMaybe = {
    apply: function(v) {
      return function(v1) {
        if (v instanceof Just) {
          return map2(v.value0)(v1);
        }
        ;
        if (v instanceof Nothing) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 67, column 1 - line 69, column 30): " + [v.constructor.name, v1.constructor.name]);
      };
    },
    Functor0: function() {
      return functorMaybe;
    }
  };
  var bindMaybe = {
    bind: function(v) {
      return function(v1) {
        if (v instanceof Just) {
          return v1(v.value0);
        }
        ;
        if (v instanceof Nothing) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 125, column 1 - line 127, column 28): " + [v.constructor.name, v1.constructor.name]);
      };
    },
    Apply0: function() {
      return applyMaybe;
    }
  };

  // output/Data.Either/index.js
  var Left = /* @__PURE__ */ function() {
    function Left2(value0) {
      this.value0 = value0;
    }
    ;
    Left2.create = function(value0) {
      return new Left2(value0);
    };
    return Left2;
  }();
  var Right = /* @__PURE__ */ function() {
    function Right2(value0) {
      this.value0 = value0;
    }
    ;
    Right2.create = function(value0) {
      return new Right2(value0);
    };
    return Right2;
  }();
  var functorEither = {
    map: function(f) {
      return function(m) {
        if (m instanceof Left) {
          return new Left(m.value0);
        }
        ;
        if (m instanceof Right) {
          return new Right(f(m.value0));
        }
        ;
        throw new Error("Failed pattern match at Data.Either (line 0, column 0 - line 0, column 0): " + [m.constructor.name]);
      };
    }
  };
  var either = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2 instanceof Left) {
          return v(v2.value0);
        }
        ;
        if (v2 instanceof Right) {
          return v1(v2.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Either (line 208, column 1 - line 208, column 64): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  };

  // output/Effect/foreign.js
  var pureE = function(a2) {
    return function() {
      return a2;
    };
  };
  var bindE = function(a2) {
    return function(f) {
      return function() {
        return f(a2())();
      };
    };
  };

  // output/Control.Monad/index.js
  var whenM = function(dictMonad) {
    var bind4 = bind(dictMonad.Bind1());
    var when3 = when(dictMonad.Applicative0());
    return function(mb) {
      return function(m) {
        return bind4(mb)(function(b2) {
          return when3(b2)(m);
        });
      };
    };
  };
  var ap = function(dictMonad) {
    var bind4 = bind(dictMonad.Bind1());
    var pure4 = pure(dictMonad.Applicative0());
    return function(f) {
      return function(a2) {
        return bind4(f)(function(f$prime) {
          return bind4(a2)(function(a$prime) {
            return pure4(f$prime(a$prime));
          });
        });
      };
    };
  };

  // output/Data.EuclideanRing/foreign.js
  var numDiv = function(n1) {
    return function(n2) {
      return n1 / n2;
    };
  };

  // output/Data.CommutativeRing/index.js
  var commutativeRingNumber = {
    Ring0: function() {
      return ringNumber;
    }
  };

  // output/Data.EuclideanRing/index.js
  var euclideanRingNumber = {
    degree: function(v) {
      return 1;
    },
    div: numDiv,
    mod: function(v) {
      return function(v1) {
        return 0;
      };
    },
    CommutativeRing0: function() {
      return commutativeRingNumber;
    }
  };
  var div = function(dict) {
    return dict.div;
  };

  // output/Data.Monoid/index.js
  var monoidArray = {
    mempty: [],
    Semigroup0: function() {
      return semigroupArray;
    }
  };
  var mempty = function(dict) {
    return dict.mempty;
  };

  // output/Effect/index.js
  var $runtime_lazy = function(name16, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name16 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var monadEffect = {
    Applicative0: function() {
      return applicativeEffect;
    },
    Bind1: function() {
      return bindEffect;
    }
  };
  var bindEffect = {
    bind: bindE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var applicativeEffect = {
    pure: pureE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var $lazy_functorEffect = /* @__PURE__ */ $runtime_lazy("functorEffect", "Effect", function() {
    return {
      map: liftA1(applicativeEffect)
    };
  });
  var $lazy_applyEffect = /* @__PURE__ */ $runtime_lazy("applyEffect", "Effect", function() {
    return {
      apply: ap(monadEffect),
      Functor0: function() {
        return $lazy_functorEffect(0);
      }
    };
  });
  var functorEffect = /* @__PURE__ */ $lazy_functorEffect(20);
  var applyEffect = /* @__PURE__ */ $lazy_applyEffect(23);

  // output/Control.Monad.Error.Class/index.js
  var throwError = function(dict) {
    return dict.throwError;
  };

  // output/Data.Identity/index.js
  var Identity = function(x2) {
    return x2;
  };
  var functorIdentity = {
    map: function(f) {
      return function(m) {
        return f(m);
      };
    }
  };
  var applyIdentity = {
    apply: function(v) {
      return function(v1) {
        return v(v1);
      };
    },
    Functor0: function() {
      return functorIdentity;
    }
  };
  var bindIdentity = {
    bind: function(v) {
      return function(f) {
        return f(v);
      };
    },
    Apply0: function() {
      return applyIdentity;
    }
  };
  var applicativeIdentity = {
    pure: Identity,
    Apply0: function() {
      return applyIdentity;
    }
  };
  var monadIdentity = {
    Applicative0: function() {
      return applicativeIdentity;
    },
    Bind1: function() {
      return bindIdentity;
    }
  };

  // output/Effect.Ref/foreign.js
  var _new = function(val) {
    return function() {
      return { value: val };
    };
  };
  var read = function(ref2) {
    return function() {
      return ref2.value;
    };
  };
  var modifyImpl = function(f) {
    return function(ref2) {
      return function() {
        var t = f(ref2.value);
        ref2.value = t.state;
        return t.value;
      };
    };
  };

  // output/Effect.Ref/index.js
  var $$void2 = /* @__PURE__ */ $$void(functorEffect);
  var $$new = _new;
  var modify$prime = modifyImpl;
  var modify = function(f) {
    return modify$prime(function(s) {
      var s$prime = f(s);
      return {
        state: s$prime,
        value: s$prime
      };
    });
  };
  var modify_ = function(f) {
    return function(s) {
      return $$void2(modify(f)(s));
    };
  };

  // output/Data.Tuple/index.js
  var Tuple = /* @__PURE__ */ function() {
    function Tuple2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Tuple2.create = function(value0) {
      return function(value1) {
        return new Tuple2(value0, value1);
      };
    };
    return Tuple2;
  }();

  // output/Control.Monad.Except.Trans/index.js
  var map3 = /* @__PURE__ */ map(functorEither);
  var ExceptT = function(x2) {
    return x2;
  };
  var runExceptT = function(v) {
    return v;
  };
  var mapExceptT = function(f) {
    return function(v) {
      return f(v);
    };
  };
  var functorExceptT = function(dictFunctor) {
    var map12 = map(dictFunctor);
    return {
      map: function(f) {
        return mapExceptT(map12(map3(f)));
      }
    };
  };
  var monadExceptT = function(dictMonad) {
    return {
      Applicative0: function() {
        return applicativeExceptT(dictMonad);
      },
      Bind1: function() {
        return bindExceptT(dictMonad);
      }
    };
  };
  var bindExceptT = function(dictMonad) {
    var bind4 = bind(dictMonad.Bind1());
    var pure4 = pure(dictMonad.Applicative0());
    return {
      bind: function(v) {
        return function(k) {
          return bind4(v)(either(function($187) {
            return pure4(Left.create($187));
          })(function(a2) {
            var v1 = k(a2);
            return v1;
          }));
        };
      },
      Apply0: function() {
        return applyExceptT(dictMonad);
      }
    };
  };
  var applyExceptT = function(dictMonad) {
    var functorExceptT1 = functorExceptT(dictMonad.Bind1().Apply0().Functor0());
    return {
      apply: ap(monadExceptT(dictMonad)),
      Functor0: function() {
        return functorExceptT1;
      }
    };
  };
  var applicativeExceptT = function(dictMonad) {
    return {
      pure: function() {
        var $188 = pure(dictMonad.Applicative0());
        return function($189) {
          return ExceptT($188(Right.create($189)));
        };
      }(),
      Apply0: function() {
        return applyExceptT(dictMonad);
      }
    };
  };
  var monadThrowExceptT = function(dictMonad) {
    var monadExceptT1 = monadExceptT(dictMonad);
    return {
      throwError: function() {
        var $198 = pure(dictMonad.Applicative0());
        return function($199) {
          return ExceptT($198(Left.create($199)));
        };
      }(),
      Monad0: function() {
        return monadExceptT1;
      }
    };
  };

  // output/Unsafe.Coerce/foreign.js
  var unsafeCoerce2 = function(x2) {
    return x2;
  };

  // output/Safe.Coerce/index.js
  var coerce = function() {
    return unsafeCoerce2;
  };

  // output/Data.Newtype/index.js
  var coerce2 = /* @__PURE__ */ coerce();
  var unwrap = function() {
    return coerce2;
  };

  // output/Control.Monad.Except/index.js
  var unwrap2 = /* @__PURE__ */ unwrap();
  var runExcept = function($3) {
    return unwrap2(runExceptT($3));
  };

  // output/Data.Array/foreign.js
  var replicateFill = function(count) {
    return function(value13) {
      if (count < 1) {
        return [];
      }
      var result = new Array(count);
      return result.fill(value13);
    };
  };
  var replicatePolyfill = function(count) {
    return function(value13) {
      var result = [];
      var n = 0;
      for (var i2 = 0; i2 < count; i2++) {
        result[n++] = value13;
      }
      return result;
    };
  };
  var replicate = typeof Array.prototype.fill === "function" ? replicateFill : replicatePolyfill;
  var fromFoldableImpl = function() {
    function Cons3(head4, tail2) {
      this.head = head4;
      this.tail = tail2;
    }
    var emptyList = {};
    function curryCons(head4) {
      return function(tail2) {
        return new Cons3(head4, tail2);
      };
    }
    function listToArray(list) {
      var result = [];
      var count = 0;
      var xs = list;
      while (xs !== emptyList) {
        result[count++] = xs.head;
        xs = xs.tail;
      }
      return result;
    }
    return function(foldr3) {
      return function(xs) {
        return listToArray(foldr3(curryCons)(emptyList)(xs));
      };
    };
  }();
  var sortByImpl = function() {
    function mergeFromTo(compare2, fromOrdering, xs1, xs2, from2, to) {
      var mid;
      var i2;
      var j;
      var k;
      var x2;
      var y2;
      var c;
      mid = from2 + (to - from2 >> 1);
      if (mid - from2 > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, from2, mid);
      if (to - mid > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, mid, to);
      i2 = from2;
      j = mid;
      k = from2;
      while (i2 < mid && j < to) {
        x2 = xs2[i2];
        y2 = xs2[j];
        c = fromOrdering(compare2(x2)(y2));
        if (c > 0) {
          xs1[k++] = y2;
          ++j;
        } else {
          xs1[k++] = x2;
          ++i2;
        }
      }
      while (i2 < mid) {
        xs1[k++] = xs2[i2++];
      }
      while (j < to) {
        xs1[k++] = xs2[j++];
      }
    }
    return function(compare2) {
      return function(fromOrdering) {
        return function(xs) {
          var out;
          if (xs.length < 2)
            return xs;
          out = xs.slice(0);
          mergeFromTo(compare2, fromOrdering, out, xs.slice(0), 0, xs.length);
          return out;
        };
      };
    };
  }();

  // output/Control.Monad.ST.Internal/foreign.js
  var map_ = function(f) {
    return function(a2) {
      return function() {
        return f(a2());
      };
    };
  };
  var foreach = function(as) {
    return function(f) {
      return function() {
        for (var i2 = 0, l = as.length; i2 < l; i2++) {
          f(as[i2])();
        }
      };
    };
  };

  // output/Control.Monad.ST.Internal/index.js
  var functorST = {
    map: map_
  };

  // output/Data.Array.ST/foreign.js
  var sortByImpl2 = function() {
    function mergeFromTo(compare2, fromOrdering, xs1, xs2, from2, to) {
      var mid;
      var i2;
      var j;
      var k;
      var x2;
      var y2;
      var c;
      mid = from2 + (to - from2 >> 1);
      if (mid - from2 > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, from2, mid);
      if (to - mid > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, mid, to);
      i2 = from2;
      j = mid;
      k = from2;
      while (i2 < mid && j < to) {
        x2 = xs2[i2];
        y2 = xs2[j];
        c = fromOrdering(compare2(x2)(y2));
        if (c > 0) {
          xs1[k++] = y2;
          ++j;
        } else {
          xs1[k++] = x2;
          ++i2;
        }
      }
      while (i2 < mid) {
        xs1[k++] = xs2[i2++];
      }
      while (j < to) {
        xs1[k++] = xs2[j++];
      }
    }
    return function(compare2) {
      return function(fromOrdering) {
        return function(xs) {
          return function() {
            if (xs.length < 2)
              return xs;
            mergeFromTo(compare2, fromOrdering, xs, xs.slice(0), 0, xs.length);
            return xs;
          };
        };
      };
    };
  }();

  // output/Data.Foldable/foreign.js
  var foldrArray = function(f) {
    return function(init3) {
      return function(xs) {
        var acc = init3;
        var len = xs.length;
        for (var i2 = len - 1; i2 >= 0; i2--) {
          acc = f(xs[i2])(acc);
        }
        return acc;
      };
    };
  };
  var foldlArray = function(f) {
    return function(init3) {
      return function(xs) {
        var acc = init3;
        var len = xs.length;
        for (var i2 = 0; i2 < len; i2++) {
          acc = f(acc)(xs[i2]);
        }
        return acc;
      };
    };
  };

  // output/Control.Plus/index.js
  var empty = function(dict) {
    return dict.empty;
  };

  // output/Data.Foldable/index.js
  var foldr = function(dict) {
    return dict.foldr;
  };
  var traverse_ = function(dictApplicative) {
    var applySecond2 = applySecond(dictApplicative.Apply0());
    var pure4 = pure(dictApplicative);
    return function(dictFoldable) {
      var foldr22 = foldr(dictFoldable);
      return function(f) {
        return foldr22(function($449) {
          return applySecond2(f($449));
        })(pure4(unit));
      };
    };
  };
  var foldl = function(dict) {
    return dict.foldl;
  };
  var foldableMaybe = {
    foldr: function(v) {
      return function(z) {
        return function(v1) {
          if (v1 instanceof Nothing) {
            return z;
          }
          ;
          if (v1 instanceof Just) {
            return v(v1.value0)(z);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, z.constructor.name, v1.constructor.name]);
        };
      };
    },
    foldl: function(v) {
      return function(z) {
        return function(v1) {
          if (v1 instanceof Nothing) {
            return z;
          }
          ;
          if (v1 instanceof Just) {
            return v(z)(v1.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, z.constructor.name, v1.constructor.name]);
        };
      };
    },
    foldMap: function(dictMonoid) {
      var mempty3 = mempty(dictMonoid);
      return function(v) {
        return function(v1) {
          if (v1 instanceof Nothing) {
            return mempty3;
          }
          ;
          if (v1 instanceof Just) {
            return v(v1.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name]);
        };
      };
    }
  };
  var foldMapDefaultR = function(dictFoldable) {
    var foldr22 = foldr(dictFoldable);
    return function(dictMonoid) {
      var append2 = append(dictMonoid.Semigroup0());
      var mempty3 = mempty(dictMonoid);
      return function(f) {
        return foldr22(function(x2) {
          return function(acc) {
            return append2(f(x2))(acc);
          };
        })(mempty3);
      };
    };
  };
  var foldableArray = {
    foldr: foldrArray,
    foldl: foldlArray,
    foldMap: function(dictMonoid) {
      return foldMapDefaultR(foldableArray)(dictMonoid);
    }
  };

  // output/Data.Traversable/foreign.js
  var traverseArrayImpl = function() {
    function array1(a2) {
      return [a2];
    }
    function array2(a2) {
      return function(b2) {
        return [a2, b2];
      };
    }
    function array3(a2) {
      return function(b2) {
        return function(c) {
          return [a2, b2, c];
        };
      };
    }
    function concat2(xs) {
      return function(ys) {
        return xs.concat(ys);
      };
    }
    return function(apply2) {
      return function(map6) {
        return function(pure4) {
          return function(f) {
            return function(array) {
              function go2(bot, top4) {
                switch (top4 - bot) {
                  case 0:
                    return pure4([]);
                  case 1:
                    return map6(array1)(f(array[bot]));
                  case 2:
                    return apply2(map6(array2)(f(array[bot])))(f(array[bot + 1]));
                  case 3:
                    return apply2(apply2(map6(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                  default:
                    var pivot = bot + Math.floor((top4 - bot) / 4) * 2;
                    return apply2(map6(concat2)(go2(bot, pivot)))(go2(pivot, top4));
                }
              }
              return go2(0, array.length);
            };
          };
        };
      };
    };
  }();

  // output/Data.Array/index.js
  var fromFoldable = function(dictFoldable) {
    return fromFoldableImpl(foldr(dictFoldable));
  };

  // output/Data.String.CodePoints/foreign.js
  var hasArrayFrom = typeof Array.from === "function";
  var hasStringIterator = typeof Symbol !== "undefined" && Symbol != null && typeof Symbol.iterator !== "undefined" && typeof String.prototype[Symbol.iterator] === "function";
  var hasFromCodePoint = typeof String.prototype.fromCodePoint === "function";
  var hasCodePointAt = typeof String.prototype.codePointAt === "function";

  // output/Data.Int/foreign.js
  var fromNumberImpl = function(just) {
    return function(nothing) {
      return function(n) {
        return (n | 0) === n ? just(n) : nothing;
      };
    };
  };
  var toNumber = function(n) {
    return n;
  };

  // output/Data.Number/foreign.js
  var isFiniteImpl = isFinite;
  var pow = function(n) {
    return function(p2) {
      return Math.pow(n, p2);
    };
  };
  var round = Math.round;

  // output/Data.Int/index.js
  var top2 = /* @__PURE__ */ top(boundedInt);
  var bottom2 = /* @__PURE__ */ bottom(boundedInt);
  var fromNumber = /* @__PURE__ */ function() {
    return fromNumberImpl(Just.create)(Nothing.value);
  }();
  var unsafeClamp = function(x2) {
    if (!isFiniteImpl(x2)) {
      return 0;
    }
    ;
    if (x2 >= toNumber(top2)) {
      return top2;
    }
    ;
    if (x2 <= toNumber(bottom2)) {
      return bottom2;
    }
    ;
    if (otherwise) {
      return fromMaybe(0)(fromNumber(x2));
    }
    ;
    throw new Error("Failed pattern match at Data.Int (line 72, column 1 - line 72, column 29): " + [x2.constructor.name]);
  };
  var round2 = function($37) {
    return unsafeClamp(round($37));
  };

  // output/Foreign/foreign.js
  function typeOf(value13) {
    return typeof value13;
  }
  function tagOf(value13) {
    return Object.prototype.toString.call(value13).slice(8, -1);
  }
  function isNull(value13) {
    return value13 === null;
  }
  function isUndefined(value13) {
    return value13 === void 0;
  }
  var isArray = Array.isArray || function(value13) {
    return Object.prototype.toString.call(value13) === "[object Array]";
  };

  // output/Data.NonEmpty/index.js
  var NonEmpty = /* @__PURE__ */ function() {
    function NonEmpty2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    NonEmpty2.create = function(value0) {
      return function(value1) {
        return new NonEmpty2(value0, value1);
      };
    };
    return NonEmpty2;
  }();
  var singleton3 = function(dictPlus) {
    var empty7 = empty(dictPlus);
    return function(a2) {
      return new NonEmpty(a2, empty7);
    };
  };

  // output/Data.List.Types/index.js
  var Nil = /* @__PURE__ */ function() {
    function Nil3() {
    }
    ;
    Nil3.value = new Nil3();
    return Nil3;
  }();
  var Cons = /* @__PURE__ */ function() {
    function Cons3(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Cons3.create = function(value0) {
      return function(value1) {
        return new Cons3(value0, value1);
      };
    };
    return Cons3;
  }();
  var NonEmptyList = function(x2) {
    return x2;
  };
  var listMap = function(f) {
    var chunkedRevMap = function($copy_chunksAcc) {
      return function($copy_v) {
        var $tco_var_chunksAcc = $copy_chunksAcc;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(chunksAcc, v) {
          if (v instanceof Cons && (v.value1 instanceof Cons && v.value1.value1 instanceof Cons)) {
            $tco_var_chunksAcc = new Cons(v, chunksAcc);
            $copy_v = v.value1.value1.value1;
            return;
          }
          ;
          var unrolledMap = function(v1) {
            if (v1 instanceof Cons && (v1.value1 instanceof Cons && v1.value1.value1 instanceof Nil)) {
              return new Cons(f(v1.value0), new Cons(f(v1.value1.value0), Nil.value));
            }
            ;
            if (v1 instanceof Cons && v1.value1 instanceof Nil) {
              return new Cons(f(v1.value0), Nil.value);
            }
            ;
            return Nil.value;
          };
          var reverseUnrolledMap = function($copy_v1) {
            return function($copy_acc) {
              var $tco_var_v1 = $copy_v1;
              var $tco_done1 = false;
              var $tco_result2;
              function $tco_loop2(v1, acc) {
                if (v1 instanceof Cons && (v1.value0 instanceof Cons && (v1.value0.value1 instanceof Cons && v1.value0.value1.value1 instanceof Cons))) {
                  $tco_var_v1 = v1.value1;
                  $copy_acc = new Cons(f(v1.value0.value0), new Cons(f(v1.value0.value1.value0), new Cons(f(v1.value0.value1.value1.value0), acc)));
                  return;
                }
                ;
                $tco_done1 = true;
                return acc;
              }
              ;
              while (!$tco_done1) {
                $tco_result2 = $tco_loop2($tco_var_v1, $copy_acc);
              }
              ;
              return $tco_result2;
            };
          };
          $tco_done = true;
          return reverseUnrolledMap(chunksAcc)(unrolledMap(v));
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_chunksAcc, $copy_v);
        }
        ;
        return $tco_result;
      };
    };
    return chunkedRevMap(Nil.value);
  };
  var functorList = {
    map: listMap
  };
  var foldableList = {
    foldr: function(f) {
      return function(b2) {
        var rev3 = function() {
          var go2 = function($copy_acc) {
            return function($copy_v) {
              var $tco_var_acc = $copy_acc;
              var $tco_done = false;
              var $tco_result;
              function $tco_loop(acc, v) {
                if (v instanceof Nil) {
                  $tco_done = true;
                  return acc;
                }
                ;
                if (v instanceof Cons) {
                  $tco_var_acc = new Cons(v.value0, acc);
                  $copy_v = v.value1;
                  return;
                }
                ;
                throw new Error("Failed pattern match at Data.List.Types (line 107, column 7 - line 107, column 23): " + [acc.constructor.name, v.constructor.name]);
              }
              ;
              while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_acc, $copy_v);
              }
              ;
              return $tco_result;
            };
          };
          return go2(Nil.value);
        }();
        var $281 = foldl(foldableList)(flip(f))(b2);
        return function($282) {
          return $281(rev3($282));
        };
      };
    },
    foldl: function(f) {
      var go2 = function($copy_b) {
        return function($copy_v) {
          var $tco_var_b = $copy_b;
          var $tco_done1 = false;
          var $tco_result;
          function $tco_loop(b2, v) {
            if (v instanceof Nil) {
              $tco_done1 = true;
              return b2;
            }
            ;
            if (v instanceof Cons) {
              $tco_var_b = f(b2)(v.value0);
              $copy_v = v.value1;
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.List.Types (line 111, column 12 - line 113, column 30): " + [v.constructor.name]);
          }
          ;
          while (!$tco_done1) {
            $tco_result = $tco_loop($tco_var_b, $copy_v);
          }
          ;
          return $tco_result;
        };
      };
      return go2;
    },
    foldMap: function(dictMonoid) {
      var append2 = append(dictMonoid.Semigroup0());
      var mempty3 = mempty(dictMonoid);
      return function(f) {
        return foldl(foldableList)(function(acc) {
          var $283 = append2(acc);
          return function($284) {
            return $283(f($284));
          };
        })(mempty3);
      };
    }
  };
  var foldr2 = /* @__PURE__ */ foldr(foldableList);
  var semigroupList = {
    append: function(xs) {
      return function(ys) {
        return foldr2(Cons.create)(ys)(xs);
      };
    }
  };
  var append1 = /* @__PURE__ */ append(semigroupList);
  var altList = {
    alt: append1,
    Functor0: function() {
      return functorList;
    }
  };
  var plusList = /* @__PURE__ */ function() {
    return {
      empty: Nil.value,
      Alt0: function() {
        return altList;
      }
    };
  }();

  // output/Data.List.NonEmpty/index.js
  var singleton4 = /* @__PURE__ */ function() {
    var $199 = singleton3(plusList);
    return function($200) {
      return NonEmptyList($199($200));
    };
  }();

  // output/Foreign/index.js
  var TypeMismatch = /* @__PURE__ */ function() {
    function TypeMismatch2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    TypeMismatch2.create = function(value0) {
      return function(value1) {
        return new TypeMismatch2(value0, value1);
      };
    };
    return TypeMismatch2;
  }();
  var ErrorAtProperty = /* @__PURE__ */ function() {
    function ErrorAtProperty2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    ErrorAtProperty2.create = function(value0) {
      return function(value1) {
        return new ErrorAtProperty2(value0, value1);
      };
    };
    return ErrorAtProperty2;
  }();
  var unsafeToForeign = unsafeCoerce2;
  var unsafeFromForeign = unsafeCoerce2;
  var fail = function(dictMonad) {
    var $153 = throwError(monadThrowExceptT(dictMonad));
    return function($154) {
      return $153(singleton4($154));
    };
  };
  var unsafeReadTagged = function(dictMonad) {
    var pure1 = pure(applicativeExceptT(dictMonad));
    var fail1 = fail(dictMonad);
    return function(tag) {
      return function(value13) {
        if (tagOf(value13) === tag) {
          return pure1(unsafeFromForeign(value13));
        }
        ;
        if (otherwise) {
          return fail1(new TypeMismatch(tag, tagOf(value13)));
        }
        ;
        throw new Error("Failed pattern match at Foreign (line 123, column 1 - line 123, column 104): " + [tag.constructor.name, value13.constructor.name]);
      };
    };
  };
  var readString = function(dictMonad) {
    return unsafeReadTagged(dictMonad)("String");
  };

  // output/Foreign.Index/foreign.js
  function unsafeReadPropImpl(f, s, key2, value13) {
    return value13 == null ? f : s(value13[key2]);
  }
  function unsafeHasOwnProperty(prop3, value13) {
    return Object.prototype.hasOwnProperty.call(value13, prop3);
  }
  function unsafeHasProperty(prop3, value13) {
    return prop3 in value13;
  }

  // output/Foreign.Index/index.js
  var unsafeReadProp = function(dictMonad) {
    var fail2 = fail(dictMonad);
    var pure4 = pure(applicativeExceptT(dictMonad));
    return function(k) {
      return function(value13) {
        return unsafeReadPropImpl(fail2(new TypeMismatch("object", typeOf(value13))), pure4, k, value13);
      };
    };
  };
  var readProp = function(dictMonad) {
    return unsafeReadProp(dictMonad);
  };
  var ix = function(dict) {
    return dict.ix;
  };
  var index3 = function(dict) {
    return dict.index;
  };
  var indexableForeign = function(dictMonad) {
    return {
      ix: function(dictIndex) {
        return index3(dictIndex);
      }
    };
  };
  var hasPropertyImpl = function(v) {
    return function(v1) {
      if (isNull(v1)) {
        return false;
      }
      ;
      if (isUndefined(v1)) {
        return false;
      }
      ;
      if (typeOf(v1) === "object" || typeOf(v1) === "function") {
        return unsafeHasProperty(v, v1);
      }
      ;
      return false;
    };
  };
  var hasOwnPropertyImpl = function(v) {
    return function(v1) {
      if (isNull(v1)) {
        return false;
      }
      ;
      if (isUndefined(v1)) {
        return false;
      }
      ;
      if (typeOf(v1) === "object" || typeOf(v1) === "function") {
        return unsafeHasOwnProperty(v, v1);
      }
      ;
      return false;
    };
  };
  var indexString = function(dictMonad) {
    return {
      index: flip(readProp(dictMonad)),
      hasProperty: hasPropertyImpl,
      hasOwnProperty: hasOwnPropertyImpl,
      errorAt: ErrorAtProperty.create
    };
  };

  // output/RemoteLog/foreign.js
  function sendMessageToBackground(message4) {
    return function(callback) {
      return function() {
        chrome.runtime.sendMessage(message4, function(response) {
          callback(response)();
        });
      };
    };
  }

  // output/Data.Op/index.js
  var Op = function(x2) {
    return x2;
  };

  // output/Foreign.Object/foreign.js
  function runST(f) {
    return f();
  }
  function toArrayWithKey(f) {
    return function(m) {
      var r = [];
      for (var k in m) {
        if (hasOwnProperty.call(m, k)) {
          r.push(f(k)(m[k]));
        }
      }
      return r;
    };
  }
  var keys = Object.keys || toArrayWithKey(function(k) {
    return function() {
      return k;
    };
  });

  // output/Foreign.Object.ST/foreign.js
  var newImpl = function() {
    return {};
  };
  function poke2(k) {
    return function(v) {
      return function(m) {
        return function() {
          m[k] = v;
          return m;
        };
      };
    };
  }

  // output/Foreign.Object/index.js
  var $$void3 = /* @__PURE__ */ $$void(functorST);
  var fromFoldable3 = function(dictFoldable) {
    var fromFoldable1 = fromFoldable(dictFoldable);
    return function(l) {
      return runST(function __do2() {
        var s = newImpl();
        foreach(fromFoldable1(l))(function(v) {
          return $$void3(poke2(v.value0)(v.value1)(s));
        })();
        return s;
      });
    };
  };

  // output/Data.Options/index.js
  var fromFoldable4 = /* @__PURE__ */ fromFoldable3(foldableArray);
  var options = function(v) {
    return unsafeToForeign(fromFoldable4(v));
  };
  var monoidOptions = monoidArray;
  var defaultToOptions = function(k) {
    return function(v) {
      return [new Tuple(k, unsafeToForeign(v))];
    };
  };
  var opt = function($8) {
    return Op(defaultToOptions($8));
  };
  var assoc = /* @__PURE__ */ unwrap();

  // output/Domy.Class.EventTarget/foreign.js
  function toEventListener(listener) {
    return function() {
      return function(event) {
        return listener(event)();
      };
    };
  }
  function addEventListenerImpl(eventType) {
    return function(listener) {
      return function(options3) {
        return function(target7) {
          return function() {
            target7.addEventListener(eventType, listener, options3);
          };
        };
      };
    };
  }
  function removeEventListenerImpl(eventType) {
    return function(listener) {
      return function(target7) {
        return function() {
          target7.removeEventListener(eventType, listener);
        };
      };
    };
  }
  function dispatchEventImpl(event) {
    return function(target7) {
      return function() {
        return target7.dispatchEvent(event);
      };
    };
  }

  // output/Domy.Class.EventTarget/index.js
  var mempty2 = /* @__PURE__ */ mempty(monoidOptions);
  var removeEventListenerDefault = function(dictEventTarget) {
    return function(dictEvent) {
      return removeEventListenerImpl;
    };
  };
  var passive = /* @__PURE__ */ opt("passive");
  var dispatchEventDefault = function(dictEventTarget) {
    return function(dictEvent) {
      return dispatchEventImpl;
    };
  };
  var addEventListenerDefault = function(dictEventTarget) {
    return function(dictEvent) {
      return function(type$prime) {
        return function(listener) {
          return function(opts) {
            return function(target7) {
              return addEventListenerImpl(type$prime)(listener)(options(opts))(target7);
            };
          };
        };
      };
    };
  };
  var addEventListener = function(dict) {
    return dict.addEventListener;
  };
  var addEventListener$prime = function(dictEventTarget) {
    var addEventListener1 = addEventListener(dictEventTarget);
    return function(dictEvent) {
      var addEventListener22 = addEventListener1(dictEvent);
      return function(type$prime) {
        return function(listener) {
          return function(opts) {
            return function(target7) {
              return function __do2() {
                var eventListener2 = toEventListener(listener)();
                return addEventListener22(type$prime)(eventListener2)(opts)(target7)();
              };
            };
          };
        };
      };
    };
  };
  var addEventListener_ = function(dictEventTarget) {
    var addEventListener1 = addEventListener(dictEventTarget);
    return function(dictEvent) {
      var addEventListener22 = addEventListener1(dictEvent);
      return function(type$prime) {
        return function(listener) {
          return function(target7) {
            return addEventListener22(type$prime)(listener)(mempty2)(target7);
          };
        };
      };
    };
  };
  var addEventListener_$prime = function(dictEventTarget) {
    var addEventListener_1 = addEventListener_(dictEventTarget);
    return function(dictEvent) {
      var addEventListener_2 = addEventListener_1(dictEvent);
      return function(type$prime) {
        return function(listener) {
          return function(target7) {
            return function __do2() {
              var eventListener2 = toEventListener(listener)();
              return addEventListener_2(type$prime)(eventListener2)(target7)();
            };
          };
        };
      };
    };
  };

  // output/Domy.Class.Event/foreign.js
  function preventDefaultImpl(event) {
    return function() {
      event.preventDefault();
    };
  }
  function stopPropagationImpl(event) {
    return function() {
      event.stopPropagation();
    };
  }
  function stopImmediatePropagationImpl(event) {
    return function() {
      event.stopImmediatePropagation();
    };
  }

  // output/Domy.Class.Event/index.js
  var stopPropagationDefault = stopPropagationImpl;
  var stopImmediatePropagationDefault = stopImmediatePropagationImpl;
  var preventDefaultDefault = preventDefaultImpl;
  var preventDefault = function(dict) {
    return dict.preventDefault;
  };

  // output/Domy.Globals/foreign.js
  function windowImpl() {
    return window;
  }

  // output/Domy.Window/foreign.js
  function document(window3) {
    return function() {
      return window3.document;
    };
  }
  function location(window3) {
    return function() {
      return window3.location;
    };
  }
  function innerWidth(window3) {
    return function() {
      return window3.innerWidth;
    };
  }
  function innerHeight(window3) {
    return function() {
      return window3.innerHeight;
    };
  }
  function scrollBy(x2) {
    return function(y2) {
      return function(window3) {
        return function() {
          return window3.scrollBy(x2, y2);
        };
      };
    };
  }

  // output/Domy.Window/index.js
  var eventTargetWindow = {
    addEventListener: function(dictEvent) {
      return addEventListenerDefault(eventTargetWindow)(dictEvent);
    },
    removeEventListener: function(dictEvent) {
      return removeEventListenerDefault(eventTargetWindow)(dictEvent);
    },
    dispatchEvent: function(dictEvent) {
      return dispatchEventDefault(eventTargetWindow)(dictEvent);
    }
  };

  // output/Domy.Globals/index.js
  var window2 = windowImpl;
  var document2 = /* @__PURE__ */ bind(bindEffect)(window2)(document);

  // output/Domy.Location/foreign.js
  function setHref(href6) {
    return function(location3) {
      return function() {
        location3.href = href6;
      };
    };
  }

  // output/Control.Bind.LiftJoin/index.js
  var liftJoin3 = function(dictBind) {
    var join3 = join(dictBind);
    var lift32 = lift3(dictBind.Apply0());
    return function(f) {
      return function(a2) {
        return function(b2) {
          return function(c) {
            return join3(lift32(f)(a2)(b2)(c));
          };
        };
      };
    };
  };
  var liftJoin2 = function(dictBind) {
    var join3 = join(dictBind);
    var lift23 = lift2(dictBind.Apply0());
    return function(f) {
      return function(a2) {
        return function(b2) {
          return join3(lift23(f)(a2)(b2));
        };
      };
    };
  };

  // output/Domy.Class.Element/foreign.js
  function getBoundingClientRectDefault(element3) {
    return function() {
      const rect = element3.getBoundingClientRect();
      return rect;
    };
  }
  function removeAttributeDefault(attribute) {
    return function(element3) {
      return function() {
        return element3.removeAttribute(attribute);
      };
    };
  }
  function innerHtmlDefault(element3) {
    return function() {
      return element3.innerHTML;
    };
  }
  function setInnerHtmlDefault(html2) {
    return function(element3) {
      return function() {
        element3.innerHTML = html2;
      };
    };
  }
  function outerHtmlDefault(element3) {
    return function() {
      return element3.outerHTML;
    };
  }
  function setOuterHtmlDefault(html2) {
    return function(element3) {
      return function() {
        element3.outerHTML = html2;
      };
    };
  }
  function scrollWidthDefault(element3) {
    return function() {
      return element3.scrollWidth;
    };
  }
  function scrollHeightDefault(element3) {
    return function() {
      return element3.scrollHeight;
    };
  }
  function scrollTopDefault(element3) {
    return function() {
      return element3.scrollTop;
    };
  }
  function scrollLeftDefault(element3) {
    return function() {
      return element3.scrollLeft;
    };
  }
  function setScrollTopDefault(scroll2) {
    return function(element3) {
      return function() {
        element3.scrollTop = scroll2;
      };
    };
  }
  function setScrollLeftDefault(scroll2) {
    return function(element3) {
      return function() {
        element3.scrollLeft = scroll2;
      };
    };
  }

  // output/Domy.Class.Node/foreign.js
  function parentElementImpl(node) {
    return function() {
      return node.parentElement;
    };
  }

  // output/Data.Nullable/foreign.js
  var nullImpl = null;
  function nullable(a2, r, f) {
    return a2 == null ? r : f(a2);
  }

  // output/Data.Nullable/index.js
  var toMaybe = function(n) {
    return nullable(n, Nothing.value, Just.create);
  };

  // output/Domy.Element/index.js
  var eventTargetElement = {
    addEventListener: function(dictEvent) {
      return addEventListenerDefault(eventTargetElement)(dictEvent);
    },
    removeEventListener: function(dictEvent) {
      return removeEventListenerDefault(eventTargetElement)(dictEvent);
    },
    dispatchEvent: function(dictEvent) {
      return dispatchEventDefault(eventTargetElement)(dictEvent);
    }
  };

  // output/Domy.Class.Node/index.js
  var mapFlipped2 = /* @__PURE__ */ mapFlipped(functorEffect);
  var parentElementDefault = function(node) {
    return mapFlipped2(parentElementImpl(node))(toMaybe);
  };
  var nodeElement = {
    parentElement: parentElementDefault,
    EventTarget0: function() {
      return eventTargetElement;
    }
  };

  // output/Domy.Class.Element/index.js
  var setScrollTop = function(dict) {
    return dict.setScrollTop;
  };
  var setScrollLeft = function(dict) {
    return dict.setScrollLeft;
  };
  var setOuterHtml = function(dict) {
    return dict.setOuterHtml;
  };
  var scrollWidth = function(dict) {
    return dict.scrollWidth;
  };
  var scrollHeight = function(dict) {
    return dict.scrollHeight;
  };
  var getBoundingClientRect = function(dict) {
    return dict.getBoundingClientRect;
  };
  var elementElement = {
    getBoundingClientRect: getBoundingClientRectDefault,
    removeAttribute: removeAttributeDefault,
    innerHtml: innerHtmlDefault,
    setInnerHtml: setInnerHtmlDefault,
    outerHtml: outerHtmlDefault,
    setOuterHtml: setOuterHtmlDefault,
    scrollWidth: scrollWidthDefault,
    scrollHeight: scrollHeightDefault,
    scrollTop: scrollTopDefault,
    scrollLeft: scrollLeftDefault,
    setScrollTop: setScrollTopDefault,
    setScrollLeft: setScrollLeftDefault,
    Node0: function() {
      return nodeElement;
    }
  };

  // output/Domy.Class.HtmlElement/foreign.js
  function offsetWidthDefault(element3) {
    return function() {
      return element3.offsetWidth;
    };
  }
  function offsetHeightDefault(element3) {
    return function() {
      return element3.offsetHeight;
    };
  }
  function styleDefault(element3) {
    return function() {
      return element3.style;
    };
  }

  // output/Domy.Class.HtmlElement/index.js
  var style = function(dict) {
    return dict.style;
  };

  // output/Domy.Class.KeyboardEvent/foreign.js
  function keyDefault(keyboardEvent) {
    return keyboardEvent.key;
  }
  function codeDefault(keyboardEvent) {
    return keyboardEvent.code;
  }

  // output/Domy.Class.KeyboardEvent/index.js
  var key = function(dict) {
    return dict.key;
  };

  // output/Domy.Class.MouseEvent/foreign.js
  function buttonDefault(mouseEvent) {
    return mouseEvent.button;
  }
  function buttonsDefault(mouseEvent) {
    return mouseEvent.buttons;
  }
  function pageXDefault(mouseEvent) {
    return mouseEvent.pageX;
  }
  function pageYDefault(mouseEvent) {
    return mouseEvent.pageY;
  }
  function offsetXDefault(mouseEvent) {
    return mouseEvent.offsetX;
  }
  function offsetYDefault(mouseEvent) {
    return mouseEvent.offsetY;
  }
  function clientXDefault(mouseEvent) {
    return mouseEvent.clientX;
  }
  function clientYDefault(mouseEvent) {
    return mouseEvent.clientY;
  }
  function altKeyDefault(mouseEvent) {
    return mouseEvent.altKey;
  }
  function ctrlKeyDefault(mouseEvent) {
    return mouseEvent.ctrlKey;
  }
  function shiftKeyDefault(mouseEvent) {
    return mouseEvent.shiftKey;
  }
  function metaKeyDefault(mouseEvent) {
    return mouseEvent.metaKey;
  }

  // output/Domy.Class.MouseEvent/index.js
  var shiftKey = function(dict) {
    return dict.shiftKey;
  };
  var pageY = function(dict) {
    return dict.pageY;
  };
  var pageX = function(dict) {
    return dict.pageX;
  };
  var ctrlKey = function(dict) {
    return dict.ctrlKey;
  };
  var clientY = function(dict) {
    return dict.clientY;
  };
  var clientX = function(dict) {
    return dict.clientX;
  };
  var buttons = function(dict) {
    return dict.buttons;
  };
  var altKey = function(dict) {
    return dict.altKey;
  };

  // output/Domy.Class.WheelEvent/foreign.js
  function deltaXDefault(mouseEvent) {
    return mouseEvent.deltaX;
  }
  function deltaYDefault(mouseEvent) {
    return mouseEvent.deltaY;
  }
  function deltaZDefault(mouseEvent) {
    return mouseEvent.deltaZ;
  }

  // output/Domy.Class.WheelEvent/index.js
  var deltaY = function(dict) {
    return dict.deltaY;
  };

  // output/Domy.CssStyleDeclaration/foreign.js
  function setProperty(property) {
    return function(value13) {
      return function(style4) {
        return function() {
          style4[property] = value13;
          return {};
        };
      };
    };
  }

  // output/Domy.Document/foreign.js
  function querySelectorImpl(selector) {
    return function(document4) {
      return function() {
        return document4.querySelector(selector);
      };
    };
  }
  function body2(document4) {
    return function() {
      return document4.body;
    };
  }
  function documentElementImpl(document4) {
    return function() {
      return document4.documentElement;
    };
  }

  // output/Domy.Document/index.js
  var mapFlipped3 = /* @__PURE__ */ mapFlipped(functorEffect);
  var querySelector = function(selector) {
    return function(document4) {
      return mapFlipped3(querySelectorImpl(selector)(document4))(toMaybe);
    };
  };
  var documentElement = function(document4) {
    return mapFlipped3(documentElementImpl(document4))(toMaybe);
  };

  // output/Domy.DomRect/foreign.js
  function width(rect) {
    return function() {
      return rect.width;
    };
  }
  function height(rect) {
    return function() {
      return rect.height;
    };
  }
  function top3(rect) {
    return function() {
      return rect.top;
    };
  }
  function left(rect) {
    return function() {
      return rect.left;
    };
  }

  // output/Domy.Events.Event/index.js
  var resize = "resize";
  var load = "load";
  var eventEvent = {
    preventDefault: preventDefaultDefault,
    stopPropagation: stopPropagationDefault,
    stopImmediatePropagation: stopImmediatePropagationDefault
  };

  // output/Domy.Class.UiEvent/foreign.js
  function detailDefault(mouseEvent) {
    return mouseEvent.detail;
  }

  // output/Domy.Events.KeyboardEvent/index.js
  var keydown = "keydown";
  var eventKeyboardEvent = {
    preventDefault: preventDefaultDefault,
    stopPropagation: stopPropagationDefault,
    stopImmediatePropagation: stopImmediatePropagationDefault
  };
  var uiEventKeyboardEvent = {
    detail: detailDefault,
    Event0: function() {
      return eventKeyboardEvent;
    }
  };
  var mouseEventKeyboardEvent = {
    key: keyDefault,
    code: codeDefault,
    UiEvent0: function() {
      return uiEventKeyboardEvent;
    }
  };

  // output/Domy.Events.MouseEvent/index.js
  var mouseup = "mouseup";
  var mousemove = "mousemove";
  var mousedown = "mousedown";
  var eventMouseEvent = {
    preventDefault: preventDefaultDefault,
    stopPropagation: stopPropagationDefault,
    stopImmediatePropagation: stopImmediatePropagationDefault
  };
  var uiEventMouseEvent = {
    detail: detailDefault,
    Event0: function() {
      return eventMouseEvent;
    }
  };
  var mouseEventMouseEvent = {
    button: buttonDefault,
    buttons: buttonsDefault,
    pageX: pageXDefault,
    pageY: pageYDefault,
    offsetX: offsetXDefault,
    offsetY: offsetYDefault,
    clientX: clientXDefault,
    clientY: clientYDefault,
    altKey: altKeyDefault,
    ctrlKey: ctrlKeyDefault,
    shiftKey: shiftKeyDefault,
    metaKey: metaKeyDefault,
    UiEvent0: function() {
      return uiEventMouseEvent;
    }
  };

  // output/Domy.Events.WheelEvent/index.js
  var wheel = "wheel";
  var eventWheelEvent = {
    preventDefault: preventDefaultDefault,
    stopPropagation: stopPropagationDefault,
    stopImmediatePropagation: stopImmediatePropagationDefault
  };
  var uiEventWheelEvent = {
    detail: detailDefault,
    Event0: function() {
      return eventWheelEvent;
    }
  };
  var mouseEventWheelEvent = {
    button: buttonDefault,
    buttons: buttonsDefault,
    pageX: pageXDefault,
    pageY: pageYDefault,
    offsetX: offsetXDefault,
    offsetY: offsetYDefault,
    clientX: clientXDefault,
    clientY: clientYDefault,
    altKey: altKeyDefault,
    ctrlKey: ctrlKeyDefault,
    shiftKey: shiftKeyDefault,
    metaKey: metaKeyDefault,
    UiEvent0: function() {
      return uiEventWheelEvent;
    }
  };
  var wheelEventWheelEvent = {
    deltaX: deltaXDefault,
    deltaY: deltaYDefault,
    deltaZ: deltaZDefault,
    MouseEvent0: function() {
      return mouseEventWheelEvent;
    }
  };

  // output/Domy.HtmlElements.HtmlBodyElement/index.js
  var eventTargetHtmlBodyElement = {
    addEventListener: function(dictEvent) {
      return addEventListenerDefault(eventTargetHtmlBodyElement)(dictEvent);
    },
    removeEventListener: function(dictEvent) {
      return removeEventListenerDefault(eventTargetHtmlBodyElement)(dictEvent);
    },
    dispatchEvent: function(dictEvent) {
      return dispatchEventDefault(eventTargetHtmlBodyElement)(dictEvent);
    }
  };
  var nodeHtmlBodyElement = {
    parentElement: parentElementDefault,
    EventTarget0: function() {
      return eventTargetHtmlBodyElement;
    }
  };
  var elementHtmlBodyElement = {
    getBoundingClientRect: getBoundingClientRectDefault,
    removeAttribute: removeAttributeDefault,
    innerHtml: innerHtmlDefault,
    setInnerHtml: setInnerHtmlDefault,
    outerHtml: outerHtmlDefault,
    setOuterHtml: setOuterHtmlDefault,
    scrollWidth: scrollWidthDefault,
    scrollHeight: scrollHeightDefault,
    scrollTop: scrollTopDefault,
    scrollLeft: scrollLeftDefault,
    setScrollTop: setScrollTopDefault,
    setScrollLeft: setScrollLeftDefault,
    Node0: function() {
      return nodeHtmlBodyElement;
    }
  };
  var htmlElementHtmlBodyElement = {
    offsetWidth: offsetWidthDefault,
    offsetHeight: offsetHeightDefault,
    style: styleDefault,
    Element0: function() {
      return elementHtmlBodyElement;
    }
  };

  // output/Domy.HtmlElements.HtmlImageElement/foreign.js
  function width2(image) {
    return function() {
      return image.width;
    };
  }
  function height2(image) {
    return function() {
      return image.height;
    };
  }
  function src(image) {
    return function() {
      return image.src;
    };
  }
  function naturalWidth(image) {
    return function() {
      return image.naturalWidth;
    };
  }
  function naturalHeight(image) {
    return function() {
      return image.naturalHeight;
    };
  }
  function complete(image) {
    return function() {
      return image.complete;
    };
  }

  // output/Domy.Utils/foreign.js
  function unsafeReadProtoTaggedImpl(name16) {
    return function(value13) {
      var obj = value13;
      while (obj != null) {
        var proto = Object.getPrototypeOf(obj);
        var ctor = proto.constructor.name;
        if (ctor === name16) {
          return value13;
        } else if (ctor === "Object") {
          return null;
        }
        obj = proto;
      }
      return null;
    };
  }

  // output/Domy.Utils/index.js
  var unsafeReadProtoTagged = function(name16) {
    return function(object2) {
      return toMaybe(unsafeReadProtoTaggedImpl(name16)(unsafeToForeign(object2)));
    };
  };

  // output/Domy.HtmlElements.HtmlImageElement/index.js
  var readHtmlImageElement = /* @__PURE__ */ unsafeReadProtoTagged("HTMLImageElement");
  var eventTargetHtmlImageElement = {
    addEventListener: function(dictEvent) {
      return addEventListenerDefault(eventTargetHtmlImageElement)(dictEvent);
    },
    removeEventListener: function(dictEvent) {
      return removeEventListenerDefault(eventTargetHtmlImageElement)(dictEvent);
    },
    dispatchEvent: function(dictEvent) {
      return dispatchEventDefault(eventTargetHtmlImageElement)(dictEvent);
    }
  };
  var nodeHtmlImageElement = {
    parentElement: parentElementDefault,
    EventTarget0: function() {
      return eventTargetHtmlImageElement;
    }
  };
  var elementHtmlImageElement = {
    getBoundingClientRect: getBoundingClientRectDefault,
    removeAttribute: removeAttributeDefault,
    innerHtml: innerHtmlDefault,
    setInnerHtml: setInnerHtmlDefault,
    outerHtml: outerHtmlDefault,
    setOuterHtml: setOuterHtmlDefault,
    scrollWidth: scrollWidthDefault,
    scrollHeight: scrollHeightDefault,
    scrollTop: scrollTopDefault,
    scrollLeft: scrollLeftDefault,
    setScrollTop: setScrollTopDefault,
    setScrollLeft: setScrollLeftDefault,
    Node0: function() {
      return nodeHtmlImageElement;
    }
  };
  var htmlElementHtmlImageElement = {
    offsetWidth: offsetWidthDefault,
    offsetHeight: offsetHeightDefault,
    style: styleDefault,
    Element0: function() {
      return elementHtmlImageElement;
    }
  };

  // output/Effect.Console/foreign.js
  var log2 = function(s) {
    return function() {
      console.log(s);
    };
  };

  // output/Effect.Timer/foreign.js
  function setTimeoutImpl(ms) {
    return function(fn) {
      return function() {
        return setTimeout(fn, ms);
      };
    };
  }

  // output/Effect.Timer/index.js
  var setTimeout2 = setTimeoutImpl;

  // output/Effect.Aff/foreign.js
  var Aff = function() {
    var EMPTY = {};
    var PURE = "Pure";
    var THROW = "Throw";
    var CATCH = "Catch";
    var SYNC = "Sync";
    var ASYNC = "Async";
    var BIND = "Bind";
    var BRACKET = "Bracket";
    var FORK = "Fork";
    var SEQ = "Sequential";
    var MAP = "Map";
    var APPLY = "Apply";
    var ALT = "Alt";
    var CONS = "Cons";
    var RESUME = "Resume";
    var RELEASE = "Release";
    var FINALIZER = "Finalizer";
    var FINALIZED = "Finalized";
    var FORKED = "Forked";
    var FIBER = "Fiber";
    var THUNK = "Thunk";
    function Aff2(tag, _1, _2, _3) {
      this.tag = tag;
      this._1 = _1;
      this._2 = _2;
      this._3 = _3;
    }
    function AffCtr(tag) {
      var fn = function(_1, _2, _3) {
        return new Aff2(tag, _1, _2, _3);
      };
      fn.tag = tag;
      return fn;
    }
    function nonCanceler2(error5) {
      return new Aff2(PURE, void 0);
    }
    function runEff(eff) {
      try {
        eff();
      } catch (error5) {
        setTimeout(function() {
          throw error5;
        }, 0);
      }
    }
    function runSync(left2, right2, eff) {
      try {
        return right2(eff());
      } catch (error5) {
        return left2(error5);
      }
    }
    function runAsync(left2, eff, k) {
      try {
        return eff(k)();
      } catch (error5) {
        k(left2(error5))();
        return nonCanceler2;
      }
    }
    var Scheduler = function() {
      var limit = 1024;
      var size4 = 0;
      var ix3 = 0;
      var queue = new Array(limit);
      var draining = false;
      function drain() {
        var thunk;
        draining = true;
        while (size4 !== 0) {
          size4--;
          thunk = queue[ix3];
          queue[ix3] = void 0;
          ix3 = (ix3 + 1) % limit;
          thunk();
        }
        draining = false;
      }
      return {
        isDraining: function() {
          return draining;
        },
        enqueue: function(cb) {
          var i2, tmp;
          if (size4 === limit) {
            tmp = draining;
            drain();
            draining = tmp;
          }
          queue[(ix3 + size4) % limit] = cb;
          size4++;
          if (!draining) {
            drain();
          }
        }
      };
    }();
    function Supervisor(util) {
      var fibers = {};
      var fiberId = 0;
      var count = 0;
      return {
        register: function(fiber) {
          var fid = fiberId++;
          fiber.onComplete({
            rethrow: true,
            handler: function(result) {
              return function() {
                count--;
                delete fibers[fid];
              };
            }
          })();
          fibers[fid] = fiber;
          count++;
        },
        isEmpty: function() {
          return count === 0;
        },
        killAll: function(killError, cb) {
          return function() {
            if (count === 0) {
              return cb();
            }
            var killCount = 0;
            var kills = {};
            function kill3(fid) {
              kills[fid] = fibers[fid].kill(killError, function(result) {
                return function() {
                  delete kills[fid];
                  killCount--;
                  if (util.isLeft(result) && util.fromLeft(result)) {
                    setTimeout(function() {
                      throw util.fromLeft(result);
                    }, 0);
                  }
                  if (killCount === 0) {
                    cb();
                  }
                };
              })();
            }
            for (var k in fibers) {
              if (fibers.hasOwnProperty(k)) {
                killCount++;
                kill3(k);
              }
            }
            fibers = {};
            fiberId = 0;
            count = 0;
            return function(error5) {
              return new Aff2(SYNC, function() {
                for (var k2 in kills) {
                  if (kills.hasOwnProperty(k2)) {
                    kills[k2]();
                  }
                }
              });
            };
          };
        }
      };
    }
    var SUSPENDED = 0;
    var CONTINUE = 1;
    var STEP_BIND = 2;
    var STEP_RESULT = 3;
    var PENDING = 4;
    var RETURN = 5;
    var COMPLETED = 6;
    function Fiber(util, supervisor, aff) {
      var runTick = 0;
      var status2 = SUSPENDED;
      var step4 = aff;
      var fail2 = null;
      var interrupt = null;
      var bhead = null;
      var btail = null;
      var attempts = null;
      var bracketCount = 0;
      var joinId = 0;
      var joins = null;
      var rethrow = true;
      function run3(localRunTick) {
        var tmp, result, attempt;
        while (true) {
          tmp = null;
          result = null;
          attempt = null;
          switch (status2) {
            case STEP_BIND:
              status2 = CONTINUE;
              try {
                step4 = bhead(step4);
                if (btail === null) {
                  bhead = null;
                } else {
                  bhead = btail._1;
                  btail = btail._2;
                }
              } catch (e) {
                status2 = RETURN;
                fail2 = util.left(e);
                step4 = null;
              }
              break;
            case STEP_RESULT:
              if (util.isLeft(step4)) {
                status2 = RETURN;
                fail2 = step4;
                step4 = null;
              } else if (bhead === null) {
                status2 = RETURN;
              } else {
                status2 = STEP_BIND;
                step4 = util.fromRight(step4);
              }
              break;
            case CONTINUE:
              switch (step4.tag) {
                case BIND:
                  if (bhead) {
                    btail = new Aff2(CONS, bhead, btail);
                  }
                  bhead = step4._2;
                  status2 = CONTINUE;
                  step4 = step4._1;
                  break;
                case PURE:
                  if (bhead === null) {
                    status2 = RETURN;
                    step4 = util.right(step4._1);
                  } else {
                    status2 = STEP_BIND;
                    step4 = step4._1;
                  }
                  break;
                case SYNC:
                  status2 = STEP_RESULT;
                  step4 = runSync(util.left, util.right, step4._1);
                  break;
                case ASYNC:
                  status2 = PENDING;
                  step4 = runAsync(util.left, step4._1, function(result2) {
                    return function() {
                      if (runTick !== localRunTick) {
                        return;
                      }
                      runTick++;
                      Scheduler.enqueue(function() {
                        if (runTick !== localRunTick + 1) {
                          return;
                        }
                        status2 = STEP_RESULT;
                        step4 = result2;
                        run3(runTick);
                      });
                    };
                  });
                  return;
                case THROW:
                  status2 = RETURN;
                  fail2 = util.left(step4._1);
                  step4 = null;
                  break;
                case CATCH:
                  if (bhead === null) {
                    attempts = new Aff2(CONS, step4, attempts, interrupt);
                  } else {
                    attempts = new Aff2(CONS, step4, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                  }
                  bhead = null;
                  btail = null;
                  status2 = CONTINUE;
                  step4 = step4._1;
                  break;
                case BRACKET:
                  bracketCount++;
                  if (bhead === null) {
                    attempts = new Aff2(CONS, step4, attempts, interrupt);
                  } else {
                    attempts = new Aff2(CONS, step4, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                  }
                  bhead = null;
                  btail = null;
                  status2 = CONTINUE;
                  step4 = step4._1;
                  break;
                case FORK:
                  status2 = STEP_RESULT;
                  tmp = Fiber(util, supervisor, step4._2);
                  if (supervisor) {
                    supervisor.register(tmp);
                  }
                  if (step4._1) {
                    tmp.run();
                  }
                  step4 = util.right(tmp);
                  break;
                case SEQ:
                  status2 = CONTINUE;
                  step4 = sequential2(util, supervisor, step4._1);
                  break;
              }
              break;
            case RETURN:
              bhead = null;
              btail = null;
              if (attempts === null) {
                status2 = COMPLETED;
                step4 = interrupt || fail2 || step4;
              } else {
                tmp = attempts._3;
                attempt = attempts._1;
                attempts = attempts._2;
                switch (attempt.tag) {
                  case CATCH:
                    if (interrupt && interrupt !== tmp && bracketCount === 0) {
                      status2 = RETURN;
                    } else if (fail2) {
                      status2 = CONTINUE;
                      step4 = attempt._2(util.fromLeft(fail2));
                      fail2 = null;
                    }
                    break;
                  case RESUME:
                    if (interrupt && interrupt !== tmp && bracketCount === 0 || fail2) {
                      status2 = RETURN;
                    } else {
                      bhead = attempt._1;
                      btail = attempt._2;
                      status2 = STEP_BIND;
                      step4 = util.fromRight(step4);
                    }
                    break;
                  case BRACKET:
                    bracketCount--;
                    if (fail2 === null) {
                      result = util.fromRight(step4);
                      attempts = new Aff2(CONS, new Aff2(RELEASE, attempt._2, result), attempts, tmp);
                      if (interrupt === tmp || bracketCount > 0) {
                        status2 = CONTINUE;
                        step4 = attempt._3(result);
                      }
                    }
                    break;
                  case RELEASE:
                    attempts = new Aff2(CONS, new Aff2(FINALIZED, step4, fail2), attempts, interrupt);
                    status2 = CONTINUE;
                    if (interrupt && interrupt !== tmp && bracketCount === 0) {
                      step4 = attempt._1.killed(util.fromLeft(interrupt))(attempt._2);
                    } else if (fail2) {
                      step4 = attempt._1.failed(util.fromLeft(fail2))(attempt._2);
                    } else {
                      step4 = attempt._1.completed(util.fromRight(step4))(attempt._2);
                    }
                    fail2 = null;
                    bracketCount++;
                    break;
                  case FINALIZER:
                    bracketCount++;
                    attempts = new Aff2(CONS, new Aff2(FINALIZED, step4, fail2), attempts, interrupt);
                    status2 = CONTINUE;
                    step4 = attempt._1;
                    break;
                  case FINALIZED:
                    bracketCount--;
                    status2 = RETURN;
                    step4 = attempt._1;
                    fail2 = attempt._2;
                    break;
                }
              }
              break;
            case COMPLETED:
              for (var k in joins) {
                if (joins.hasOwnProperty(k)) {
                  rethrow = rethrow && joins[k].rethrow;
                  runEff(joins[k].handler(step4));
                }
              }
              joins = null;
              if (interrupt && fail2) {
                setTimeout(function() {
                  throw util.fromLeft(fail2);
                }, 0);
              } else if (util.isLeft(step4) && rethrow) {
                setTimeout(function() {
                  if (rethrow) {
                    throw util.fromLeft(step4);
                  }
                }, 0);
              }
              return;
            case SUSPENDED:
              status2 = CONTINUE;
              break;
            case PENDING:
              return;
          }
        }
      }
      function onComplete(join4) {
        return function() {
          if (status2 === COMPLETED) {
            rethrow = rethrow && join4.rethrow;
            join4.handler(step4)();
            return function() {
            };
          }
          var jid = joinId++;
          joins = joins || {};
          joins[jid] = join4;
          return function() {
            if (joins !== null) {
              delete joins[jid];
            }
          };
        };
      }
      function kill3(error5, cb) {
        return function() {
          if (status2 === COMPLETED) {
            cb(util.right(void 0))();
            return function() {
            };
          }
          var canceler = onComplete({
            rethrow: false,
            handler: function() {
              return cb(util.right(void 0));
            }
          })();
          switch (status2) {
            case SUSPENDED:
              interrupt = util.left(error5);
              status2 = COMPLETED;
              step4 = interrupt;
              run3(runTick);
              break;
            case PENDING:
              if (interrupt === null) {
                interrupt = util.left(error5);
              }
              if (bracketCount === 0) {
                if (status2 === PENDING) {
                  attempts = new Aff2(CONS, new Aff2(FINALIZER, step4(error5)), attempts, interrupt);
                }
                status2 = RETURN;
                step4 = null;
                fail2 = null;
                run3(++runTick);
              }
              break;
            default:
              if (interrupt === null) {
                interrupt = util.left(error5);
              }
              if (bracketCount === 0) {
                status2 = RETURN;
                step4 = null;
                fail2 = null;
              }
          }
          return canceler;
        };
      }
      function join3(cb) {
        return function() {
          var canceler = onComplete({
            rethrow: false,
            handler: cb
          })();
          if (status2 === SUSPENDED) {
            run3(runTick);
          }
          return canceler;
        };
      }
      return {
        kill: kill3,
        join: join3,
        onComplete,
        isSuspended: function() {
          return status2 === SUSPENDED;
        },
        run: function() {
          if (status2 === SUSPENDED) {
            if (!Scheduler.isDraining()) {
              Scheduler.enqueue(function() {
                run3(runTick);
              });
            } else {
              run3(runTick);
            }
          }
        }
      };
    }
    function runPar(util, supervisor, par, cb) {
      var fiberId = 0;
      var fibers = {};
      var killId = 0;
      var kills = {};
      var early = new Error("[ParAff] Early exit");
      var interrupt = null;
      var root = EMPTY;
      function kill3(error5, par2, cb2) {
        var step4 = par2;
        var head4 = null;
        var tail2 = null;
        var count = 0;
        var kills2 = {};
        var tmp, kid;
        loop:
          while (true) {
            tmp = null;
            switch (step4.tag) {
              case FORKED:
                if (step4._3 === EMPTY) {
                  tmp = fibers[step4._1];
                  kills2[count++] = tmp.kill(error5, function(result) {
                    return function() {
                      count--;
                      if (count === 0) {
                        cb2(result)();
                      }
                    };
                  });
                }
                if (head4 === null) {
                  break loop;
                }
                step4 = head4._2;
                if (tail2 === null) {
                  head4 = null;
                } else {
                  head4 = tail2._1;
                  tail2 = tail2._2;
                }
                break;
              case MAP:
                step4 = step4._2;
                break;
              case APPLY:
              case ALT:
                if (head4) {
                  tail2 = new Aff2(CONS, head4, tail2);
                }
                head4 = step4;
                step4 = step4._1;
                break;
            }
          }
        if (count === 0) {
          cb2(util.right(void 0))();
        } else {
          kid = 0;
          tmp = count;
          for (; kid < tmp; kid++) {
            kills2[kid] = kills2[kid]();
          }
        }
        return kills2;
      }
      function join3(result, head4, tail2) {
        var fail2, step4, lhs, rhs, tmp, kid;
        if (util.isLeft(result)) {
          fail2 = result;
          step4 = null;
        } else {
          step4 = result;
          fail2 = null;
        }
        loop:
          while (true) {
            lhs = null;
            rhs = null;
            tmp = null;
            kid = null;
            if (interrupt !== null) {
              return;
            }
            if (head4 === null) {
              cb(fail2 || step4)();
              return;
            }
            if (head4._3 !== EMPTY) {
              return;
            }
            switch (head4.tag) {
              case MAP:
                if (fail2 === null) {
                  head4._3 = util.right(head4._1(util.fromRight(step4)));
                  step4 = head4._3;
                } else {
                  head4._3 = fail2;
                }
                break;
              case APPLY:
                lhs = head4._1._3;
                rhs = head4._2._3;
                if (fail2) {
                  head4._3 = fail2;
                  tmp = true;
                  kid = killId++;
                  kills[kid] = kill3(early, fail2 === lhs ? head4._2 : head4._1, function() {
                    return function() {
                      delete kills[kid];
                      if (tmp) {
                        tmp = false;
                      } else if (tail2 === null) {
                        join3(fail2, null, null);
                      } else {
                        join3(fail2, tail2._1, tail2._2);
                      }
                    };
                  });
                  if (tmp) {
                    tmp = false;
                    return;
                  }
                } else if (lhs === EMPTY || rhs === EMPTY) {
                  return;
                } else {
                  step4 = util.right(util.fromRight(lhs)(util.fromRight(rhs)));
                  head4._3 = step4;
                }
                break;
              case ALT:
                lhs = head4._1._3;
                rhs = head4._2._3;
                if (lhs === EMPTY && util.isLeft(rhs) || rhs === EMPTY && util.isLeft(lhs)) {
                  return;
                }
                if (lhs !== EMPTY && util.isLeft(lhs) && rhs !== EMPTY && util.isLeft(rhs)) {
                  fail2 = step4 === lhs ? rhs : lhs;
                  step4 = null;
                  head4._3 = fail2;
                } else {
                  head4._3 = step4;
                  tmp = true;
                  kid = killId++;
                  kills[kid] = kill3(early, step4 === lhs ? head4._2 : head4._1, function() {
                    return function() {
                      delete kills[kid];
                      if (tmp) {
                        tmp = false;
                      } else if (tail2 === null) {
                        join3(step4, null, null);
                      } else {
                        join3(step4, tail2._1, tail2._2);
                      }
                    };
                  });
                  if (tmp) {
                    tmp = false;
                    return;
                  }
                }
                break;
            }
            if (tail2 === null) {
              head4 = null;
            } else {
              head4 = tail2._1;
              tail2 = tail2._2;
            }
          }
      }
      function resolve(fiber) {
        return function(result) {
          return function() {
            delete fibers[fiber._1];
            fiber._3 = result;
            join3(result, fiber._2._1, fiber._2._2);
          };
        };
      }
      function run3() {
        var status2 = CONTINUE;
        var step4 = par;
        var head4 = null;
        var tail2 = null;
        var tmp, fid;
        loop:
          while (true) {
            tmp = null;
            fid = null;
            switch (status2) {
              case CONTINUE:
                switch (step4.tag) {
                  case MAP:
                    if (head4) {
                      tail2 = new Aff2(CONS, head4, tail2);
                    }
                    head4 = new Aff2(MAP, step4._1, EMPTY, EMPTY);
                    step4 = step4._2;
                    break;
                  case APPLY:
                    if (head4) {
                      tail2 = new Aff2(CONS, head4, tail2);
                    }
                    head4 = new Aff2(APPLY, EMPTY, step4._2, EMPTY);
                    step4 = step4._1;
                    break;
                  case ALT:
                    if (head4) {
                      tail2 = new Aff2(CONS, head4, tail2);
                    }
                    head4 = new Aff2(ALT, EMPTY, step4._2, EMPTY);
                    step4 = step4._1;
                    break;
                  default:
                    fid = fiberId++;
                    status2 = RETURN;
                    tmp = step4;
                    step4 = new Aff2(FORKED, fid, new Aff2(CONS, head4, tail2), EMPTY);
                    tmp = Fiber(util, supervisor, tmp);
                    tmp.onComplete({
                      rethrow: false,
                      handler: resolve(step4)
                    })();
                    fibers[fid] = tmp;
                    if (supervisor) {
                      supervisor.register(tmp);
                    }
                }
                break;
              case RETURN:
                if (head4 === null) {
                  break loop;
                }
                if (head4._1 === EMPTY) {
                  head4._1 = step4;
                  status2 = CONTINUE;
                  step4 = head4._2;
                  head4._2 = EMPTY;
                } else {
                  head4._2 = step4;
                  step4 = head4;
                  if (tail2 === null) {
                    head4 = null;
                  } else {
                    head4 = tail2._1;
                    tail2 = tail2._2;
                  }
                }
            }
          }
        root = step4;
        for (fid = 0; fid < fiberId; fid++) {
          fibers[fid].run();
        }
      }
      function cancel(error5, cb2) {
        interrupt = util.left(error5);
        var innerKills;
        for (var kid in kills) {
          if (kills.hasOwnProperty(kid)) {
            innerKills = kills[kid];
            for (kid in innerKills) {
              if (innerKills.hasOwnProperty(kid)) {
                innerKills[kid]();
              }
            }
          }
        }
        kills = null;
        var newKills = kill3(error5, root, cb2);
        return function(killError) {
          return new Aff2(ASYNC, function(killCb) {
            return function() {
              for (var kid2 in newKills) {
                if (newKills.hasOwnProperty(kid2)) {
                  newKills[kid2]();
                }
              }
              return nonCanceler2;
            };
          });
        };
      }
      run3();
      return function(killError) {
        return new Aff2(ASYNC, function(killCb) {
          return function() {
            return cancel(killError, killCb);
          };
        });
      };
    }
    function sequential2(util, supervisor, par) {
      return new Aff2(ASYNC, function(cb) {
        return function() {
          return runPar(util, supervisor, par, cb);
        };
      });
    }
    Aff2.EMPTY = EMPTY;
    Aff2.Pure = AffCtr(PURE);
    Aff2.Throw = AffCtr(THROW);
    Aff2.Catch = AffCtr(CATCH);
    Aff2.Sync = AffCtr(SYNC);
    Aff2.Async = AffCtr(ASYNC);
    Aff2.Bind = AffCtr(BIND);
    Aff2.Bracket = AffCtr(BRACKET);
    Aff2.Fork = AffCtr(FORK);
    Aff2.Seq = AffCtr(SEQ);
    Aff2.ParMap = AffCtr(MAP);
    Aff2.ParApply = AffCtr(APPLY);
    Aff2.ParAlt = AffCtr(ALT);
    Aff2.Fiber = Fiber;
    Aff2.Supervisor = Supervisor;
    Aff2.Scheduler = Scheduler;
    Aff2.nonCanceler = nonCanceler2;
    return Aff2;
  }();
  var _pure = Aff.Pure;
  var _throwError = Aff.Throw;
  var _liftEffect = Aff.Sync;
  var makeAff = Aff.Async;
  var _delay = function() {
    function setDelay(n, k) {
      if (n === 0 && typeof setImmediate !== "undefined") {
        return setImmediate(k);
      } else {
        return setTimeout(k, n);
      }
    }
    function clearDelay(n, t) {
      if (n === 0 && typeof clearImmediate !== "undefined") {
        return clearImmediate(t);
      } else {
        return clearTimeout(t);
      }
    }
    return function(right2, ms) {
      return Aff.Async(function(cb) {
        return function() {
          var timer = setDelay(ms, cb(right2()));
          return function() {
            return Aff.Sync(function() {
              return right2(clearDelay(ms, timer));
            });
          };
        };
      });
    };
  }();
  var _sequential = Aff.Seq;

  // output/Web.DOM.ParentNode/foreign.js
  var getEffProp = function(name16) {
    return function(node) {
      return function() {
        return node[name16];
      };
    };
  };
  var children = getEffProp("children");
  var _firstElementChild = getEffProp("firstElementChild");
  var _lastElementChild = getEffProp("lastElementChild");
  var childElementCount = getEffProp("childElementCount");

  // output/Web.DOM.Element/foreign.js
  var getProp = function(name16) {
    return function(doctype) {
      return doctype[name16];
    };
  };
  var _namespaceURI = getProp("namespaceURI");
  var _prefix = getProp("prefix");
  var localName = getProp("localName");
  var tagName = getProp("tagName");

  // output/Web.DOM.Node/foreign.js
  var getEffProp2 = function(name16) {
    return function(node) {
      return function() {
        return node[name16];
      };
    };
  };
  var baseURI = getEffProp2("baseURI");
  var _ownerDocument = getEffProp2("ownerDocument");
  var _parentNode = getEffProp2("parentNode");
  var _parentElement = getEffProp2("parentElement");
  var childNodes = getEffProp2("childNodes");
  var _firstChild = getEffProp2("firstChild");
  var _lastChild = getEffProp2("lastChild");
  var _previousSibling = getEffProp2("previousSibling");
  var _nextSibling = getEffProp2("nextSibling");
  var _nodeValue = getEffProp2("nodeValue");
  var textContent = getEffProp2("textContent");

  // output/Options.Type/index.js
  var Actual = /* @__PURE__ */ function() {
    function Actual2() {
    }
    ;
    Actual2.value = new Actual2();
    return Actual2;
  }();
  var Fill = /* @__PURE__ */ function() {
    function Fill2() {
    }
    ;
    Fill2.value = new Fill2();
    return Fill2;
  }();
  var FillIfLarger = /* @__PURE__ */ function() {
    function FillIfLarger2() {
    }
    ;
    FillIfLarger2.value = new FillIfLarger2();
    return FillIfLarger2;
  }();
  var Shown = /* @__PURE__ */ function() {
    function Shown2() {
    }
    ;
    Shown2.value = new Shown2();
    return Shown2;
  }();
  var Hidden = /* @__PURE__ */ function() {
    function Hidden2() {
    }
    ;
    Hidden2.value = new Hidden2();
    return Hidden2;
  }();
  var Center = /* @__PURE__ */ function() {
    function Center2() {
    }
    ;
    Center2.value = new Center2();
    return Center2;
  }();
  var TopLeft = /* @__PURE__ */ function() {
    function TopLeft2() {
    }
    ;
    TopLeft2.value = new TopLeft2();
    return TopLeft2;
  }();
  var Default = /* @__PURE__ */ function() {
    function Default2() {
    }
    ;
    Default2.value = new Default2();
    return Default2;
  }();
  var Enhanced = /* @__PURE__ */ function() {
    function Enhanced2() {
    }
    ;
    Enhanced2.value = new Enhanced2();
    return Enhanced2;
  }();
  var topLeftPosition = "topLeft";
  var shownScrollbars = "shown";
  var readScrollbars = function(scrollbars) {
    var $1 = scrollbars === shownScrollbars;
    if ($1) {
      return Shown.value;
    }
    ;
    return Hidden.value;
  };
  var readPosition = function(startZoom) {
    var $2 = startZoom === topLeftPosition;
    if ($2) {
      return TopLeft.value;
    }
    ;
    return Center.value;
  };
  var fillStartZoom = "fill";
  var defaultControls = "default";
  var readControls = function(controls2) {
    var $3 = controls2 === defaultControls;
    if ($3) {
      return Default.value;
    }
    ;
    return Enhanced.value;
  };
  var actualStartZoom = "actual";
  var readStartZoom = function(startZoom) {
    var $4 = startZoom === actualStartZoom;
    if ($4) {
      return Actual.value;
    }
    ;
    var $5 = startZoom === fillStartZoom;
    if ($5) {
      return Fill.value;
    }
    ;
    return FillIfLarger.value;
  };

  // output/Simple.JSON/foreign.js
  var _parseJSON = JSON.parse;
  var _unsafeStringify = JSON.stringify;

  // output/Data.Array.NonEmpty.Internal/foreign.js
  var traverse1Impl = function() {
    function Cont(fn) {
      this.fn = fn;
    }
    var emptyList = {};
    var ConsCell = function(head4, tail2) {
      this.head = head4;
      this.tail = tail2;
    };
    function finalCell(head4) {
      return new ConsCell(head4, emptyList);
    }
    function consList(x2) {
      return function(xs) {
        return new ConsCell(x2, xs);
      };
    }
    function listToArray(list) {
      var arr = [];
      var xs = list;
      while (xs !== emptyList) {
        arr.push(xs.head);
        xs = xs.tail;
      }
      return arr;
    }
    return function(apply2) {
      return function(map6) {
        return function(f) {
          var buildFrom = function(x2, ys) {
            return apply2(map6(consList)(f(x2)))(ys);
          };
          var go2 = function(acc, currentLen, xs) {
            if (currentLen === 0) {
              return acc;
            } else {
              var last3 = xs[currentLen - 1];
              return new Cont(function() {
                var built = go2(buildFrom(last3, acc), currentLen - 1, xs);
                return built;
              });
            }
          };
          return function(array) {
            var acc = map6(finalCell)(f(array[array.length - 1]));
            var result = go2(acc, array.length - 1, array);
            while (result instanceof Cont) {
              result = result.fn();
            }
            return map6(listToArray)(result);
          };
        };
      };
    };
  }();

  // output/Options.Main/index.js
  var defaultOptions = {
    licenseKey: nullImpl,
    backgroundColor: "#0e0e0e",
    startZoom: "fillIfLarger",
    position: "center",
    scrollbars: "hidden",
    controls: "enhanced",
    contextMenu: "shown"
  };

  // output/Content.Main/index.js
  var mapFlipped4 = /* @__PURE__ */ mapFlipped(functorEffect);
  var bind3 = /* @__PURE__ */ bind(bindEffect);
  var lift22 = /* @__PURE__ */ lift2(applyEffect);
  var div3 = /* @__PURE__ */ div(euclideanRingNumber);
  var bindFlipped2 = /* @__PURE__ */ bindFlipped(bindEffect);
  var style3 = /* @__PURE__ */ style(htmlElementHtmlImageElement);
  var when2 = /* @__PURE__ */ when(applicativeEffect);
  var buttons2 = /* @__PURE__ */ buttons(mouseEventMouseEvent);
  var ctrlKey2 = /* @__PURE__ */ ctrlKey(mouseEventMouseEvent);
  var preventDefault3 = /* @__PURE__ */ preventDefault(eventMouseEvent);
  var pageX2 = /* @__PURE__ */ pageX(mouseEventMouseEvent);
  var pageY2 = /* @__PURE__ */ pageY(mouseEventMouseEvent);
  var pure3 = /* @__PURE__ */ pure(applicativeEffect);
  var show2 = /* @__PURE__ */ show(showNumber);
  var show1 = /* @__PURE__ */ show(showInt);
  var composeKleisli2 = /* @__PURE__ */ composeKleisli(bindEffect);
  var map5 = /* @__PURE__ */ map(functorEffect);
  var map1 = /* @__PURE__ */ map(functorFn);
  var sub1 = /* @__PURE__ */ sub(ringNumber);
  var liftJoin32 = /* @__PURE__ */ liftJoin3(bindEffect);
  var abs3 = /* @__PURE__ */ abs(ordNumber)(ringNumber);
  var style1 = /* @__PURE__ */ style(htmlElementHtmlBodyElement);
  var whenM2 = /* @__PURE__ */ whenM(monadEffect);
  var signum2 = /* @__PURE__ */ signum(ordNumber)(ringNumber);
  var deltaY2 = /* @__PURE__ */ deltaY(wheelEventWheelEvent);
  var negate1 = /* @__PURE__ */ negate(/* @__PURE__ */ ringFn(ringNumber));
  var greaterThan1 = /* @__PURE__ */ greaterThan(ordInt);
  var scrollWidth3 = /* @__PURE__ */ scrollWidth(elementHtmlBodyElement);
  var scrollHeight3 = /* @__PURE__ */ scrollHeight(elementHtmlBodyElement);
  var traverse_2 = /* @__PURE__ */ traverse_(applicativeEffect)(foldableMaybe);
  var setScrollLeft3 = /* @__PURE__ */ setScrollLeft(elementElement);
  var setScrollTop3 = /* @__PURE__ */ setScrollTop(elementElement);
  var ifM2 = /* @__PURE__ */ ifM(bindEffect);
  var preventDefault1 = /* @__PURE__ */ preventDefault(eventWheelEvent);
  var shiftKey2 = /* @__PURE__ */ shiftKey(mouseEventWheelEvent);
  var altKey2 = /* @__PURE__ */ altKey(mouseEventWheelEvent);
  var ctrlKey1 = /* @__PURE__ */ ctrlKey(mouseEventWheelEvent);
  var addEventListener$prime2 = /* @__PURE__ */ addEventListener$prime(eventTargetHtmlBodyElement)(eventWheelEvent);
  var addEventListener_$prime2 = /* @__PURE__ */ addEventListener_$prime(eventTargetHtmlBodyElement);
  var addEventListener_$prime1 = /* @__PURE__ */ addEventListener_$prime2(eventMouseEvent);
  var addEventListener_$prime22 = /* @__PURE__ */ addEventListener_$prime2(eventKeyboardEvent);
  var addEventListener_$prime3 = /* @__PURE__ */ addEventListener_$prime(eventTargetWindow)(eventEvent);
  var liftJoin22 = /* @__PURE__ */ liftJoin2(bindEffect);
  var setOuterHtml2 = /* @__PURE__ */ setOuterHtml(elementHtmlBodyElement);
  var bindFlipped1 = /* @__PURE__ */ bindFlipped(bindMaybe);
  var addEventListener_$prime4 = /* @__PURE__ */ addEventListener_$prime(eventTargetHtmlImageElement)(eventEvent);
  var bind1 = /* @__PURE__ */ bind(/* @__PURE__ */ bindExceptT(monadIdentity));
  var ix2 = /* @__PURE__ */ ix(/* @__PURE__ */ indexableForeign(monadIdentity))(/* @__PURE__ */ indexString(monadIdentity));
  var readString2 = /* @__PURE__ */ readString(monadIdentity);
  var $$void4 = /* @__PURE__ */ $$void(functorEffect);
  var windowWidthNum = /* @__PURE__ */ mapFlipped4(/* @__PURE__ */ bind3(window2)(innerWidth))(toNumber);
  var windowHeightNum = /* @__PURE__ */ mapFlipped4(/* @__PURE__ */ bind3(window2)(innerHeight))(toNumber);
  var windowAspectRatio = /* @__PURE__ */ lift22(div3)(windowWidthNum)(windowHeightNum);
  var showImage = function(dictHtmlElement) {
    var style22 = style(dictHtmlElement);
    return function(image) {
      return bindFlipped2(setProperty("display")("block"))(style22(image));
    };
  };
  var showImage1 = /* @__PURE__ */ showImage(htmlElementHtmlImageElement);
  var scrollVertically = function(dictWheelEvent) {
    var deltaY1 = deltaY(dictWheelEvent);
    return function(event) {
      return bind3(window2)(scrollBy(0)(round2(deltaY1(event))));
    };
  };
  var scrollVertically1 = /* @__PURE__ */ scrollVertically(wheelEventWheelEvent);
  var scrollHorizontally = function(dictWheelEvent) {
    var deltaY1 = deltaY(dictWheelEvent);
    return function(event) {
      return bind3(window2)(scrollBy(round2(deltaY1(event)))(0));
    };
  };
  var scrollHorizontally1 = /* @__PURE__ */ scrollHorizontally(wheelEventWheelEvent);
  var replacementBody = function(v) {
    return function(src10) {
      var bodyOverflow = function(v1) {
        if (v1 instanceof Shown) {
          return "auto";
        }
        ;
        if (v1 instanceof Hidden) {
          return "hidden";
        }
        ;
        throw new Error("Failed pattern match at Content.Main (line 339, column 5 - line 339, column 32): " + [v1.constructor.name]);
      };
      return '\n    <body style="margin: 0; height: 100%; overflow: ' + (bodyOverflow(v.scrollbars) + ("; background-color: " + (v.backgroundColor + (';">\n        <img src="' + (src10 + '" style="display: none; position: relative;">\n    </body>\n    ')))));
    };
  };
  var readOptions = function(v) {
    return {
      backgroundColor: v.backgroundColor,
      startZoom: readStartZoom(v.startZoom),
      position: readPosition(v.position),
      scrollbars: readScrollbars(v.scrollbars),
      controls: readControls(v.controls)
    };
  };
  var positiveOrZero = function(number) {
    var $172 = number > 0;
    if ($172) {
      return number;
    }
    ;
    return 0;
  };
  var pixelate = function(state3) {
    return function __do2() {
      var transform = modify(function(transform2) {
        return {
          pixelate: !transform2.pixelate,
          distanceMoved: transform2.distanceMoved,
          dragged: transform2.dragged,
          flipHorizontally: transform2.flipHorizontally,
          flipVertically: transform2.flipVertically,
          mousePointBeforeDrag: transform2.mousePointBeforeDrag,
          rotate: transform2.rotate,
          scale: transform2.scale,
          windowFilled: transform2.windowFilled
        };
      })(state3.transform)();
      var rendering = function() {
        if (transform.pixelate) {
          return "pixelated";
        }
        ;
        return "auto";
      }();
      return bind3(style3(state3.image))(setProperty("image-rendering")(rendering))();
    };
  };
  var onMouseMove = function(state3) {
    return function(event) {
      return when2(buttons2(event) === 1 && !ctrlKey2(event))(function __do2() {
        var transform = modify(function(transform2) {
          return {
            distanceMoved: transform2.distanceMoved + 1 | 0,
            dragged: transform2.dragged,
            flipHorizontally: transform2.flipHorizontally,
            flipVertically: transform2.flipVertically,
            mousePointBeforeDrag: transform2.mousePointBeforeDrag,
            pixelate: transform2.pixelate,
            rotate: transform2.rotate,
            scale: transform2.scale,
            windowFilled: transform2.windowFilled
          };
        })(state3.transform)();
        return when2(transform.distanceMoved >= 3)(function __do3() {
          preventDefault3(event)();
          var v = modify(function(v2) {
            return {
              dragged: true,
              distanceMoved: v2.distanceMoved,
              flipHorizontally: v2.flipHorizontally,
              flipVertically: v2.flipVertically,
              mousePointBeforeDrag: v2.mousePointBeforeDrag,
              pixelate: v2.pixelate,
              rotate: v2.rotate,
              scale: v2.scale,
              windowFilled: v2.windowFilled
            };
          })(state3.transform)();
          return bind3(window2)(scrollBy(v.mousePointBeforeDrag.x - pageX2(event) | 0)(v.mousePointBeforeDrag.y - pageY2(event) | 0))();
        })();
      });
    };
  };
  var onMouseDown = function(state3) {
    return function(event) {
      return when2(!ctrlKey2(event))(function __do2() {
        preventDefault3(event)();
        return modify_(function(v) {
          return {
            distanceMoved: 0,
            mousePointBeforeDrag: {
              x: pageX2(event),
              y: pageY2(event)
            },
            dragged: v.dragged,
            flipHorizontally: v.flipHorizontally,
            flipVertically: v.flipVertically,
            pixelate: v.pixelate,
            rotate: v.rotate,
            scale: v.scale,
            windowFilled: v.windowFilled
          };
        })(state3.transform)();
      });
    };
  };
  var freshState = function(image) {
    return function(options3) {
      return function __do2() {
        var transform = $$new({
          scale: 1,
          rotate: 0,
          flipHorizontally: false,
          flipVertically: false,
          pixelate: false,
          distanceMoved: 0,
          dragged: false,
          mousePointBeforeDrag: {
            x: 0,
            y: 0
          },
          windowFilled: false
        })();
        return {
          image,
          transform,
          options: options3
        };
      };
    };
  };
  var createTransform = function(transform) {
    var scaleY = show2(transform.scale * function() {
      if (transform.flipVertically) {
        return -1;
      }
      ;
      return 1;
    }());
    var scaleX = show2(transform.scale * function() {
      if (transform.flipHorizontally) {
        return -1;
      }
      ;
      return 1;
    }());
    var rotate$prime = show1(transform.rotate) + "deg";
    return "scaleX(" + (scaleX + (") scaleY(" + (scaleY + (") rotate(" + (rotate$prime + ")")))));
  };
  var boundingBoxWidth = function(dictElement) {
    return composeKleisli2(getBoundingClientRect(dictElement))(width);
  };
  var boundingBoxWidth1 = /* @__PURE__ */ boundingBoxWidth(elementHtmlImageElement);
  var leftRightMargin = function(dictElement) {
    var boundingBoxWidth2 = boundingBoxWidth(dictElement);
    return function(image) {
      return map5(map1(positiveOrZero)(function(v) {
        return v / 2;
      }))(lift22(sub1)(windowWidthNum)(boundingBoxWidth2(image)));
    };
  };
  var leftRightMargin1 = /* @__PURE__ */ leftRightMargin(elementHtmlImageElement);
  var boundingBoxTop = function(dictElement) {
    return composeKleisli2(getBoundingClientRect(dictElement))(top3);
  };
  var boundingBoxTop1 = /* @__PURE__ */ boundingBoxTop(elementHtmlImageElement);
  var boundingBoxLeft = function(dictElement) {
    return composeKleisli2(getBoundingClientRect(dictElement))(left);
  };
  var boundingBoxLeft1 = /* @__PURE__ */ boundingBoxLeft(elementHtmlImageElement);
  var boundingBoxHeight = function(dictElement) {
    return composeKleisli2(getBoundingClientRect(dictElement))(height);
  };
  var boundingBoxHeight1 = /* @__PURE__ */ boundingBoxHeight(elementHtmlImageElement);
  var offset = function(top4) {
    return function(left2) {
      return function(image) {
        return function __do2() {
          var boxWidth = boundingBoxWidth1(image)();
          var boxHeight = boundingBoxHeight1(image)();
          var imageWidth = map5(toNumber)(width2(image))();
          var imageHeight = map5(toNumber)(height2(image))();
          var top$prime = top4 + (boxHeight - imageHeight) / 2;
          var left$prime = left2 + (boxWidth - imageWidth) / 2;
          bindFlipped2(setProperty("top")(show2(top$prime) + "px"))(style3(image))();
          return bindFlipped2(setProperty("left")(show2(left$prime) + "px"))(style3(image))();
        };
      };
    };
  };
  var topBottomMargin = function(dictElement) {
    var boundingBoxHeight2 = boundingBoxHeight(dictElement);
    return function(image) {
      return map5(map1(positiveOrZero)(function(v) {
        return v / 2;
      }))(lift22(sub1)(windowHeightNum)(boundingBoxHeight2(image)));
    };
  };
  var topBottomMargin1 = /* @__PURE__ */ topBottomMargin(elementHtmlImageElement);
  var positionImage = function(v) {
    if (v.options.position instanceof TopLeft) {
      return offset(0)(0)(v.image);
    }
    ;
    if (v.options.position instanceof Center) {
      return liftJoin32(offset)(topBottomMargin1(v.image))(leftRightMargin1(v.image))(pure3(v.image));
    }
    ;
    throw new Error("Failed pattern match at Content.Main (line 171, column 1 - line 171, column 38): " + [v.constructor.name]);
  };
  var boundingBoxAspectRatio = function(dictElement) {
    var getBoundingClientRect3 = getBoundingClientRect(dictElement);
    return function(image) {
      return function __do2() {
        var box = getBoundingClientRect3(image)();
        return lift22(div3)(width(box))(height(box))();
      };
    };
  };
  var boundingBoxAspectRatio1 = /* @__PURE__ */ boundingBoxAspectRatio(elementHtmlImageElement);
  var almostSame = function(number) {
    return function(otherNumber) {
      return abs3(number - otherNumber) < 5;
    };
  };
  var windowFilled = function(dictElement) {
    var boundingBoxWidth2 = boundingBoxWidth(dictElement);
    var boundingBoxHeight2 = boundingBoxHeight(dictElement);
    return function(image) {
      return function __do2() {
        var windowWidth = windowWidthNum();
        var windowHeight = windowHeightNum();
        var boxWidth = boundingBoxWidth2(image)();
        var boxHeight = boundingBoxHeight2(image)();
        var sameWidth = almostSame(boxWidth)(windowWidth);
        var sameHeight = almostSame(boxHeight)(windowHeight);
        return sameWidth && boxHeight <= windowHeight || sameHeight && boxWidth <= windowWidth;
      };
    };
  };
  var windowFilled1 = /* @__PURE__ */ windowFilled(elementHtmlImageElement);
  var updateTransform = function(v) {
    return function __do2() {
      var transform = mapFlipped4(read(v.transform))(createTransform)();
      bind3(style3(v.image))(setProperty("transform")(transform))();
      var boxWidth = boundingBoxWidth1(v.image)();
      var boxHeight = boundingBoxHeight1(v.image)();
      bind3(bind3(bind3(document2)(body2))(style1))(setProperty("width")("max(100%, " + (show2(boxWidth) + "px)")))();
      bind3(bind3(bind3(document2)(body2))(style1))(setProperty("height")("max(100%, " + (show2(boxHeight) + "px)")))();
      var windowFilled$prime = windowFilled1(v.image)();
      return modify_(function(v1) {
        return {
          windowFilled: windowFilled$prime,
          distanceMoved: v1.distanceMoved,
          dragged: v1.dragged,
          flipHorizontally: v1.flipHorizontally,
          flipVertically: v1.flipVertically,
          mousePointBeforeDrag: v1.mousePointBeforeDrag,
          pixelate: v1.pixelate,
          rotate: v1.rotate,
          scale: v1.scale
        };
      })(v.transform)();
    };
  };
  var modifyAndUpdateTransform = function(func) {
    return function(state3) {
      return function __do2() {
        modify_(func)(state3.transform)();
        return updateTransform(state3)();
      };
    };
  };
  var fillWindow = function(v) {
    return function __do2() {
      var boxRatio = boundingBoxAspectRatio1(v.image)();
      var boxWidth = boundingBoxWidth1(v.image)();
      var boxHeight = boundingBoxHeight1(v.image)();
      var windowRatio = windowAspectRatio();
      var windowWidth = windowWidthNum();
      var windowHeight = windowHeightNum();
      var scaleChange = function() {
        var $188 = boxRatio > windowRatio;
        if ($188) {
          return windowWidth / boxWidth;
        }
        ;
        return windowHeight / boxHeight;
      }();
      return modifyAndUpdateTransform(function(transform) {
        return {
          scale: transform.scale * scaleChange,
          rotate: transform.rotate,
          flipHorizontally: transform.flipHorizontally,
          flipVertically: transform.flipVertically,
          pixelate: transform.pixelate,
          distanceMoved: transform.distanceMoved,
          dragged: transform.dragged,
          mousePointBeforeDrag: transform.mousePointBeforeDrag,
          windowFilled: transform.windowFilled
        };
      })(v)();
    };
  };
  var onResize = function(state3) {
    return function __do2() {
      whenM2(mapFlipped4(read(state3.transform))(function(v) {
        return v.windowFilled;
      }))(fillWindow(state3))();
      return positionImage(state3)();
    };
  };
  var flipHorizontally = /* @__PURE__ */ modifyAndUpdateTransform(function(transform) {
    return {
      scale: transform.scale,
      rotate: transform.rotate,
      flipHorizontally: !transform.flipHorizontally,
      flipVertically: transform.flipVertically,
      pixelate: transform.pixelate,
      distanceMoved: transform.distanceMoved,
      dragged: transform.dragged,
      mousePointBeforeDrag: transform.mousePointBeforeDrag,
      windowFilled: transform.windowFilled
    };
  });
  var flipVertically = /* @__PURE__ */ modifyAndUpdateTransform(function(transform) {
    return {
      scale: transform.scale,
      rotate: transform.rotate,
      flipHorizontally: transform.flipHorizontally,
      flipVertically: !transform.flipVertically,
      pixelate: transform.pixelate,
      distanceMoved: transform.distanceMoved,
      dragged: transform.dragged,
      mousePointBeforeDrag: transform.mousePointBeforeDrag,
      windowFilled: transform.windowFilled
    };
  });
  var rotate = function(state3) {
    return function(event) {
      var degrees = round2(signum2(deltaY2(event)) * 5);
      return modifyAndUpdateTransform(function(transform) {
        return {
          scale: transform.scale,
          rotate: transform.rotate + degrees | 0,
          flipHorizontally: transform.flipHorizontally,
          flipVertically: transform.flipVertically,
          pixelate: transform.pixelate,
          distanceMoved: transform.distanceMoved,
          dragged: transform.dragged,
          mousePointBeforeDrag: transform.mousePointBeforeDrag,
          windowFilled: transform.windowFilled
        };
      })(state3);
    };
  };
  var rotateClockwise = /* @__PURE__ */ modifyAndUpdateTransform(function(transform) {
    return {
      scale: transform.scale,
      rotate: transform.rotate + 90 | 0,
      flipHorizontally: transform.flipHorizontally,
      flipVertically: transform.flipVertically,
      pixelate: transform.pixelate,
      distanceMoved: transform.distanceMoved,
      dragged: transform.dragged,
      mousePointBeforeDrag: transform.mousePointBeforeDrag,
      windowFilled: transform.windowFilled
    };
  });
  var rotateCounterclockwise = /* @__PURE__ */ modifyAndUpdateTransform(function(transform) {
    return {
      scale: transform.scale,
      rotate: transform.rotate - 90 | 0,
      flipHorizontally: transform.flipHorizontally,
      flipVertically: transform.flipVertically,
      pixelate: transform.pixelate,
      distanceMoved: transform.distanceMoved,
      dragged: transform.dragged,
      mousePointBeforeDrag: transform.mousePointBeforeDrag,
      windowFilled: transform.windowFilled
    };
  });
  var onKeyDown = function(dictKeyboardEvent) {
    var key2 = key(dictKeyboardEvent);
    return function(state3) {
      return function(event) {
        var $190 = key2(event) === "h" || key2(event) === "H";
        if ($190) {
          return flipHorizontally(state3);
        }
        ;
        var $191 = key2(event) === "v" || key2(event) === "V";
        if ($191) {
          return flipVertically(state3);
        }
        ;
        var $192 = key2(event) === "e" || key2(event) === "E";
        if ($192) {
          return rotateClockwise(state3);
        }
        ;
        var $193 = key2(event) === "q" || key2(event) === "Q";
        if ($193) {
          return rotateCounterclockwise(state3);
        }
        ;
        var $194 = key2(event) === "p" || key2(event) === "P";
        if ($194) {
          return pixelate(state3);
        }
        ;
        return pure3(unit);
      };
    };
  };
  var onKeyDown1 = /* @__PURE__ */ onKeyDown(mouseEventKeyboardEvent);
  var scale = function(state3) {
    return function(event) {
      var scaleChange = pow(1.1)(negate1(signum2)(deltaY2(event)));
      return modifyAndUpdateTransform(function(transform) {
        return {
          scale: transform.scale * scaleChange,
          rotate: transform.rotate,
          flipHorizontally: transform.flipHorizontally,
          flipVertically: transform.flipVertically,
          pixelate: transform.pixelate,
          distanceMoved: transform.distanceMoved,
          dragged: transform.dragged,
          mousePointBeforeDrag: transform.mousePointBeforeDrag,
          windowFilled: transform.windowFilled
        };
      })(state3);
    };
  };
  var setActualSize = function(state3) {
    return modifyAndUpdateTransform(function(v) {
      return {
        scale: 1,
        rotate: v.rotate,
        flipHorizontally: v.flipHorizontally,
        flipVertically: v.flipVertically,
        pixelate: v.pixelate,
        distanceMoved: v.distanceMoved,
        dragged: v.dragged,
        mousePointBeforeDrag: v.mousePointBeforeDrag,
        windowFilled: v.windowFilled
      };
    })(state3);
  };
  var fillWindowIfLarger = function(v) {
    return function __do2() {
      var fitsWindowWidth = lift22(greaterThan1)(bind3(window2)(innerWidth))(naturalWidth(v.image))();
      var fitsWindowHeight = lift22(greaterThan1)(bind3(window2)(innerHeight))(naturalHeight(v.image))();
      var $196 = fitsWindowWidth && fitsWindowHeight;
      if ($196) {
        return setActualSize(v)();
      }
      ;
      return fillWindow(v)();
    };
  };
  var setStartZoom = function(v) {
    if (v instanceof Actual) {
      return setActualSize;
    }
    ;
    if (v instanceof Fill) {
      return fillWindow;
    }
    ;
    if (v instanceof FillIfLarger) {
      return fillWindowIfLarger;
    }
    ;
    throw new Error("Failed pattern match at Content.Main (line 228, column 1 - line 228, column 50): " + [v.constructor.name]);
  };
  var adjustScroll = function(percentX) {
    return function(percentY) {
      return function(clientX2) {
        return function(clientY2) {
          return function __do2() {
            var newPageX = mapFlipped4(mapFlipped4(mapFlipped4(bind3(bind3(document2)(body2))(scrollWidth3))(toNumber))(function(v) {
              return v * percentX;
            }))(round2)();
            var newPageY = mapFlipped4(mapFlipped4(mapFlipped4(bind3(bind3(document2)(body2))(scrollHeight3))(toNumber))(function(v) {
              return v * percentY;
            }))(round2)();
            var newScrollLeft = newPageX - clientX2 | 0;
            var newScrollTop = newPageY - clientY2 | 0;
            bind3(bind3(document2)(documentElement))(traverse_2(setScrollLeft3(newScrollLeft)))();
            return bind3(bind3(document2)(documentElement))(traverse_2(setScrollTop3(newScrollTop)))();
          };
        };
      };
    };
  };
  var adjustScrollAfter = function(dictMouseEvent) {
    var pageX1 = pageX(dictMouseEvent);
    var pageY1 = pageY(dictMouseEvent);
    var clientX2 = clientX(dictMouseEvent);
    var clientY2 = clientY(dictMouseEvent);
    return function(v) {
      return function(event) {
        return function(sizeChangingFunction) {
          var mouseXInsideImage = lift22(sub1)(pure3(toNumber(pageX1(event))))(map5(positiveOrZero)(boundingBoxLeft1(v.image)));
          var mouseYInsideImage = lift22(sub1)(pure3(toNumber(pageY1(event))))(map5(positiveOrZero)(boundingBoxTop1(v.image)));
          return function __do2() {
            var percentXBeforeResize = lift22(div3)(mouseXInsideImage)(boundingBoxWidth1(v.image))();
            var percentYBeforeResize = lift22(div3)(mouseYInsideImage)(boundingBoxHeight1(v.image))();
            sizeChangingFunction(v)(event)();
            positionImage(v)();
            return adjustScroll(percentXBeforeResize)(percentYBeforeResize)(clientX2(event))(clientY2(event))();
          };
        };
      };
    };
  };
  var adjustScrollAfter1 = /* @__PURE__ */ adjustScrollAfter(mouseEventMouseEvent);
  var adjustScrollAfter2 = /* @__PURE__ */ adjustScrollAfter(mouseEventWheelEvent);
  var imageClicked = function(state3) {
    return function(event) {
      return adjustScrollAfter1(state3)(event)(function(v) {
        return function(v1) {
          return ifM2(mapFlipped4(read(state3.transform))(function(v2) {
            return v2.windowFilled;
          }))(setActualSize(state3))(fillWindow(state3));
        };
      });
    };
  };
  var onMouseUp = function(state3) {
    return function(event) {
      return ifM2(mapFlipped4(read(state3.transform))(function(v) {
        return v.dragged;
      }))(modify_(function(v) {
        return {
          dragged: false,
          distanceMoved: v.distanceMoved,
          flipHorizontally: v.flipHorizontally,
          flipVertically: v.flipVertically,
          mousePointBeforeDrag: v.mousePointBeforeDrag,
          pixelate: v.pixelate,
          rotate: v.rotate,
          scale: v.scale,
          windowFilled: v.windowFilled
        };
      })(state3.transform))(imageClicked(state3)(event));
    };
  };
  var onWheel = function(state3) {
    return function(event) {
      return function __do2() {
        preventDefault1(event)();
        var $203 = shiftKey2(event);
        if ($203) {
          return scrollHorizontally1(event)();
        }
        ;
        var $204 = altKey2(event);
        if ($204) {
          return adjustScrollAfter2(state3)(event)(rotate)();
        }
        ;
        if (state3.options.controls instanceof Default) {
          var $206 = ctrlKey1(event);
          if ($206) {
            return adjustScrollAfter2(state3)(event)(scale)();
          }
          ;
          return scrollVertically1(event)();
        }
        ;
        if (state3.options.controls instanceof Enhanced) {
          var $207 = ctrlKey1(event);
          if ($207) {
            return scrollVertically1(event)();
          }
          ;
          return adjustScrollAfter2(state3)(event)(scale)();
        }
        ;
        throw new Error("Failed pattern match at Content.Main (line 282, column 10 - line 290, column 53): " + [state3.options.controls.constructor.name]);
      };
    };
  };
  var enhance = function(v) {
    return function __do2() {
      showImage1(v.image)();
      setStartZoom(v.options.startZoom)(v)();
      positionImage(v)();
      bind3(bind3(document2)(body2))(addEventListener$prime2(wheel)(onWheel(v))(assoc(passive)(false)))();
      bind3(bind3(document2)(body2))(addEventListener_$prime1(mousedown)(onMouseDown(v)))();
      bind3(bind3(document2)(body2))(addEventListener_$prime1(mousemove)(onMouseMove(v)))();
      bind3(bind3(document2)(body2))(addEventListener_$prime1(mouseup)(onMouseUp(v)))();
      bind3(bind3(document2)(body2))(addEventListener_$prime22(keydown)(onKeyDown1(v)))();
      return bind3(window2)(addEventListener_$prime3(resize)($$const(onResize(v))))();
    };
  };
  var prepare = function(image) {
    return function(options3) {
      return function __do2() {
        liftJoin22(setOuterHtml2)(mapFlipped4(src(image))(replacementBody(options3)))(bind3(document2)(body2))();
        var maybeImage$prime = mapFlipped4(bind3(document2)(querySelector("img")))(bindFlipped1(readHtmlImageElement))();
        if (maybeImage$prime instanceof Nothing) {
          return log2("No img 2")();
        }
        ;
        if (maybeImage$prime instanceof Just) {
          var state3 = freshState(maybeImage$prime.value0)(options3)();
          return addEventListener_$prime4(load)(function(v) {
            return enhance(state3);
          })(maybeImage$prime.value0)();
        }
        ;
        throw new Error("Failed pattern match at Content.Main (line 379, column 5 - line 383, column 65): " + [maybeImage$prime.constructor.name]);
      };
    };
  };
  var main2 = function __do() {
    addOnMessageListener(function(message4) {
      return function(v) {
        return function(v1) {
          return either($$const(pure3(unit)))(function(enhanceUrl) {
            return bind3(bind3(window2)(location))(setHref(enhanceUrl));
          })(runExcept(bind1(ix2(message4)("enhanceUrl"))(readString2)));
        };
      };
    })();
    return sendMessageToBackground({})(function(v) {
      return when2(v.shouldEnhance)($$void4(setTimeout2(0)(getSyncObject(defaultOptions)(function(rawOptions) {
        var options3 = readOptions(rawOptions);
        return function __do2() {
          bind3(bind3(bind3(document2)(body2))(style1))(setProperty("background-color")(options3.backgroundColor))();
          var maybeImage = mapFlipped4(bind3(document2)(querySelector("img")))(bindFlipped1(readHtmlImageElement))();
          if (maybeImage instanceof Nothing) {
            return log2("No img")();
          }
          ;
          if (maybeImage instanceof Just) {
            bind3(style3(maybeImage.value0))(setProperty("display")("none"))();
            return ifM2(complete(maybeImage.value0))(prepare(maybeImage.value0)(options3))(addEventListener_$prime4(load)(function(v1) {
              return prepare(maybeImage.value0)(options3);
            })(maybeImage.value0))();
          }
          ;
          throw new Error("Failed pattern match at Content.Main (line 404, column 13 - line 408, column 127): " + [maybeImage.constructor.name]);
        };
      }))));
    })();
  };

  // <stdin>
  main2();
})();
