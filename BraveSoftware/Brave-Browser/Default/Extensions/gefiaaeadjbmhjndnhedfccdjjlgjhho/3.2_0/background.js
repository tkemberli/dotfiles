(() => {
  // output/Background.Main/foreign.js
  function tabId(details) {
    return details.tabId;
  }
  function statusCode(details) {
    return details.statusCode;
  }
  function responseHeaders(details) {
    return details.responseHeaders;
  }
  function url(details) {
    return details.url;
  }
  function addOnHeadersReceivedListener(callback) {
    return function(filter3) {
      return function(extraInfoSpec) {
        return function() {
          chrome.webRequest.onResponseStarted.addListener(function(details) {
            callback(details)();
          }, filter3, extraInfoSpec);
        };
      };
    };
  }
  function sendMessageToTab(tabId2) {
    return function(message4) {
      return function() {
        chrome.tabs.sendMessage(tabId2, message4, function() {
        });
      };
    };
  }
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
  function getSessionObject(object) {
    return function(callback) {
      return function() {
        chrome.storage.session.get(object, function(data) {
          callback(data)();
        });
      };
    };
  }
  function setSession(object) {
    return function(callback) {
      return function() {
        chrome.storage.session.set(object, callback);
      };
    };
  }
  function tab(messageSender) {
    return function() {
      return messageSender.tab;
    };
  }
  function id(tab2) {
    return function() {
      return tab2.id;
    };
  }
  function createContextMenuItem(item) {
    return function() {
      chrome.runtime.onInstalled.addListener(function(details) {
        chrome.contextMenus.create(item);
        if (details.reason == "update" && details.previousVersion.startsWith("2")) {
          chrome.storage.sync.get(["backgroundColor", "startViewingMode", "imagePosition", "hideScrollbars", "mousewheelKeys", "zoomMode", "showContextMenu"], function(options2) {
            chrome.storage.sync.set({
              backgroundColor: "#" + options2.backgroundColor,
              startZoom: options2.startViewingMode == 0 ? "actual" : options2.startViewingMode == 1 ? "fill" : "fillIfLarger",
              position: options2.imagePosition == 0 ? "topLeft" : "center",
              scrollbars: options2.hideScrollbars ? "hidden" : "shown",
              contextMenu: showContextMenu ? "shown" : "hidden",
              controls: zoomMode == 0 ? "default" : "enhanced"
            });
          });
        } else if (details.reason === "install") {
          chrome.tabs.create({
            "url": `chrome://extensions/?options=${chrome.runtime.id}`
          });
        }
        chrome.storage.sync.get("id", function(options2) {
          if (!options2.id) {
            const id2 = Math.trunc(Math.random() * Number.MAX_SAFE_INTEGER).toString().padStart(16, "0");
            chrome.storage.sync.set({ id: id2 });
          }
        });
      });
    };
  }
  function onContextMenuClick(callback) {
    return function() {
      chrome.contextMenus.onClicked.addListener(function(info, tab2) {
        callback(info)(tab2)();
      });
    };
  }
  function srcUrl(onClickData) {
    return onClickData.srcUrl;
  }
  function wakeUp() {
    chrome.webNavigation.onBeforeNavigate.addListener((details) => {
      console.log("wake me up");
    });
  }

  // output/Data.Boolean/index.js
  var otherwise = true;

  // output/Data.Function/index.js
  var flip = function(f) {
    return function(b) {
      return function(a) {
        return f(a)(b);
      };
    };
  };
  var $$const = function(a) {
    return function(v) {
      return a;
    };
  };

  // output/Data.Functor/foreign.js
  var arrayMap = function(f) {
    return function(arr) {
      var l = arr.length;
      var result = new Array(l);
      for (var i = 0; i < l; i++) {
        result[i] = f(arr[i]);
      }
      return result;
    };
  };

  // output/Data.Unit/foreign.js
  var unit = void 0;

  // output/Data.Functor/index.js
  var map = function(dict) {
    return dict.map;
  };
  var mapFlipped = function(dictFunctor) {
    var map1 = map(dictFunctor);
    return function(fa) {
      return function(f) {
        return map1(f)(fa);
      };
    };
  };
  var $$void = function(dictFunctor) {
    return map(dictFunctor)($$const(unit));
  };
  var functorArray = {
    map: arrayMap
  };

  // output/Control.Apply/index.js
  var apply = function(dict) {
    return dict.apply;
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
      return function(a) {
        return apply2(pure1(f))(a);
      };
    };
  };

  // output/Control.Bind/index.js
  var bind = function(dict) {
    return dict.bind;
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
  var topChar = String.fromCharCode(65535);
  var bottomChar = String.fromCharCode(0);
  var topNumber = Number.POSITIVE_INFINITY;
  var bottomNumber = Number.NEGATIVE_INFINITY;

  // output/Data.Eq/foreign.js
  var refEq = function(r1) {
    return function(r2) {
      return r1 === r2;
    };
  };
  var eqIntImpl = refEq;

  // output/Data.Eq/index.js
  var eqInt = {
    eq: eqIntImpl
  };
  var eq = function(dict) {
    return dict.eq;
  };

  // output/Data.Show/index.js
  var show = function(dict) {
    return dict.show;
  };

  // output/Data.Maybe/index.js
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
  var isJust = /* @__PURE__ */ maybe(false)(/* @__PURE__ */ $$const(true));

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
  var pureE = function(a) {
    return function() {
      return a;
    };
  };
  var bindE = function(a) {
    return function(f) {
      return function() {
        return f(a())();
      };
    };
  };

  // output/Control.Monad/index.js
  var ap = function(dictMonad) {
    var bind4 = bind(dictMonad.Bind1());
    var pure3 = pure(dictMonad.Applicative0());
    return function(f) {
      return function(a) {
        return bind4(f)(function(f$prime) {
          return bind4(a)(function(a$prime) {
            return pure3(f$prime(a$prime));
          });
        });
      };
    };
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
  var $runtime_lazy = function(name2, moduleName, init2) {
    var state2 = 0;
    var val;
    return function(lineNumber) {
      if (state2 === 2)
        return val;
      if (state2 === 1)
        throw new ReferenceError(name2 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state2 = 1;
      val = init2();
      state2 = 2;
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

  // output/Control.Monad.Error.Class/index.js
  var throwError = function(dict) {
    return dict.throwError;
  };

  // output/Data.Identity/index.js
  var Identity = function(x) {
    return x;
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
  var map2 = /* @__PURE__ */ map(functorEither);
  var ExceptT = function(x) {
    return x;
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
    var map1 = map(dictFunctor);
    return {
      map: function(f) {
        return mapExceptT(map1(map2(f)));
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
    var pure3 = pure(dictMonad.Applicative0());
    return {
      bind: function(v) {
        return function(k) {
          return bind4(v)(either(function($187) {
            return pure3(Left.create($187));
          })(function(a) {
            var v1 = k(a);
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
  var unsafeCoerce2 = function(x) {
    return x;
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
    return function(value) {
      if (count < 1) {
        return [];
      }
      var result = new Array(count);
      return result.fill(value);
    };
  };
  var replicatePolyfill = function(count) {
    return function(value) {
      var result = [];
      var n = 0;
      for (var i = 0; i < count; i++) {
        result[n++] = value;
      }
      return result;
    };
  };
  var replicate = typeof Array.prototype.fill === "function" ? replicateFill : replicatePolyfill;
  var fromFoldableImpl = function() {
    function Cons2(head, tail) {
      this.head = head;
      this.tail = tail;
    }
    var emptyList = {};
    function curryCons(head) {
      return function(tail) {
        return new Cons2(head, tail);
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
  var findIndexImpl = function(just) {
    return function(nothing) {
      return function(f) {
        return function(xs) {
          for (var i = 0, l = xs.length; i < l; i++) {
            if (f(xs[i]))
              return just(i);
          }
          return nothing;
        };
      };
    };
  };
  var filter = function(f) {
    return function(xs) {
      return xs.filter(f);
    };
  };
  var sortByImpl = function() {
    function mergeFromTo(compare2, fromOrdering, xs1, xs2, from, to) {
      var mid;
      var i;
      var j;
      var k;
      var x;
      var y;
      var c;
      mid = from + (to - from >> 1);
      if (mid - from > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, from, mid);
      if (to - mid > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, mid, to);
      i = from;
      j = mid;
      k = from;
      while (i < mid && j < to) {
        x = xs2[i];
        y = xs2[j];
        c = fromOrdering(compare2(x)(y));
        if (c > 0) {
          xs1[k++] = y;
          ++j;
        } else {
          xs1[k++] = x;
          ++i;
        }
      }
      while (i < mid) {
        xs1[k++] = xs2[i++];
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
  var any = function(p) {
    return function(xs) {
      var len = xs.length;
      for (var i = 0; i < len; i++) {
        if (p(xs[i]))
          return true;
      }
      return false;
    };
  };

  // output/Control.Monad.ST.Internal/foreign.js
  var map_ = function(f) {
    return function(a) {
      return function() {
        return f(a());
      };
    };
  };
  var foreach = function(as) {
    return function(f) {
      return function() {
        for (var i = 0, l = as.length; i < l; i++) {
          f(as[i])();
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
    function mergeFromTo(compare2, fromOrdering, xs1, xs2, from, to) {
      var mid;
      var i;
      var j;
      var k;
      var x;
      var y;
      var c;
      mid = from + (to - from >> 1);
      if (mid - from > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, from, mid);
      if (to - mid > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, mid, to);
      i = from;
      j = mid;
      k = from;
      while (i < mid && j < to) {
        x = xs2[i];
        y = xs2[j];
        c = fromOrdering(compare2(x)(y));
        if (c > 0) {
          xs1[k++] = y;
          ++j;
        } else {
          xs1[k++] = x;
          ++i;
        }
      }
      while (i < mid) {
        xs1[k++] = xs2[i++];
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
    return function(init2) {
      return function(xs) {
        var acc = init2;
        var len = xs.length;
        for (var i = len - 1; i >= 0; i--) {
          acc = f(xs[i])(acc);
        }
        return acc;
      };
    };
  };
  var foldlArray = function(f) {
    return function(init2) {
      return function(xs) {
        var acc = init2;
        var len = xs.length;
        for (var i = 0; i < len; i++) {
          acc = f(acc)(xs[i]);
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
  var foldl = function(dict) {
    return dict.foldl;
  };
  var foldMapDefaultR = function(dictFoldable) {
    var foldr22 = foldr(dictFoldable);
    return function(dictMonoid) {
      var append3 = append(dictMonoid.Semigroup0());
      var mempty3 = mempty(dictMonoid);
      return function(f) {
        return foldr22(function(x) {
          return function(acc) {
            return append3(f(x))(acc);
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
    function array1(a) {
      return [a];
    }
    function array2(a) {
      return function(b) {
        return [a, b];
      };
    }
    function array3(a) {
      return function(b) {
        return function(c) {
          return [a, b, c];
        };
      };
    }
    function concat2(xs) {
      return function(ys) {
        return xs.concat(ys);
      };
    }
    return function(apply2) {
      return function(map3) {
        return function(pure3) {
          return function(f) {
            return function(array) {
              function go(bot, top2) {
                switch (top2 - bot) {
                  case 0:
                    return pure3([]);
                  case 1:
                    return map3(array1)(f(array[bot]));
                  case 2:
                    return apply2(map3(array2)(f(array[bot])))(f(array[bot + 1]));
                  case 3:
                    return apply2(apply2(map3(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                  default:
                    var pivot = bot + Math.floor((top2 - bot) / 4) * 2;
                    return apply2(map3(concat2)(go(bot, pivot)))(go(pivot, top2));
                }
              }
              return go(0, array.length);
            };
          };
        };
      };
    };
  }();

  // output/Data.Array/index.js
  var append2 = /* @__PURE__ */ append(semigroupArray);
  var fromFoldable = function(dictFoldable) {
    return fromFoldableImpl(foldr(dictFoldable));
  };
  var findIndex = /* @__PURE__ */ function() {
    return findIndexImpl(Just.create)(Nothing.value);
  }();
  var elemIndex = function(dictEq) {
    var eq2 = eq(dictEq);
    return function(x) {
      return findIndex(function(v) {
        return eq2(v)(x);
      });
    };
  };
  var elem2 = function(dictEq) {
    var elemIndex1 = elemIndex(dictEq);
    return function(a) {
      return function(arr) {
        return isJust(elemIndex1(a)(arr));
      };
    };
  };
  var cons = function(x) {
    return function(xs) {
      return append2([x])(xs);
    };
  };

  // output/Data.String.Common/foreign.js
  var toLower = function(s) {
    return s.toLowerCase();
  };

  // output/Data.String.Utils/foreign.js
  function startsWithImpl(searchString, s) {
    return s.startsWith(searchString);
  }

  // output/Data.String.CodePoints/foreign.js
  var hasArrayFrom = typeof Array.from === "function";
  var hasStringIterator = typeof Symbol !== "undefined" && Symbol != null && typeof Symbol.iterator !== "undefined" && typeof String.prototype[Symbol.iterator] === "function";
  var hasFromCodePoint = typeof String.prototype.fromCodePoint === "function";
  var hasCodePointAt = typeof String.prototype.codePointAt === "function";

  // output/Data.String.Utils/index.js
  var startsWith = function(searchString) {
    return function(s) {
      return startsWithImpl(searchString, s);
    };
  };

  // output/Foreign/foreign.js
  function typeOf(value) {
    return typeof value;
  }
  function tagOf(value) {
    return Object.prototype.toString.call(value).slice(8, -1);
  }
  function isNull(value) {
    return value === null;
  }
  function isUndefined(value) {
    return value === void 0;
  }
  var isArray = Array.isArray || function(value) {
    return Object.prototype.toString.call(value) === "[object Array]";
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
    var empty3 = empty(dictPlus);
    return function(a) {
      return new NonEmpty(a, empty3);
    };
  };

  // output/Data.List.Types/index.js
  var Nil = /* @__PURE__ */ function() {
    function Nil2() {
    }
    ;
    Nil2.value = new Nil2();
    return Nil2;
  }();
  var Cons = /* @__PURE__ */ function() {
    function Cons2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Cons2.create = function(value0) {
      return function(value1) {
        return new Cons2(value0, value1);
      };
    };
    return Cons2;
  }();
  var NonEmptyList = function(x) {
    return x;
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
      return function(b) {
        var rev = function() {
          var go = function($copy_acc) {
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
          return go(Nil.value);
        }();
        var $281 = foldl(foldableList)(flip(f))(b);
        return function($282) {
          return $281(rev($282));
        };
      };
    },
    foldl: function(f) {
      var go = function($copy_b) {
        return function($copy_v) {
          var $tco_var_b = $copy_b;
          var $tco_done1 = false;
          var $tco_result;
          function $tco_loop(b, v) {
            if (v instanceof Nil) {
              $tco_done1 = true;
              return b;
            }
            ;
            if (v instanceof Cons) {
              $tco_var_b = f(b)(v.value0);
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
      return go;
    },
    foldMap: function(dictMonoid) {
      var append22 = append(dictMonoid.Semigroup0());
      var mempty3 = mempty(dictMonoid);
      return function(f) {
        return foldl(foldableList)(function(acc) {
          var $283 = append22(acc);
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
      return function(value) {
        if (tagOf(value) === tag) {
          return pure1(unsafeFromForeign(value));
        }
        ;
        if (otherwise) {
          return fail1(new TypeMismatch(tag, tagOf(value)));
        }
        ;
        throw new Error("Failed pattern match at Foreign (line 123, column 1 - line 123, column 104): " + [tag.constructor.name, value.constructor.name]);
      };
    };
  };
  var readString = function(dictMonad) {
    return unsafeReadTagged(dictMonad)("String");
  };

  // output/Foreign.Index/foreign.js
  function unsafeReadPropImpl(f, s, key, value) {
    return value == null ? f : s(value[key]);
  }
  function unsafeHasOwnProperty(prop, value) {
    return Object.prototype.hasOwnProperty.call(value, prop);
  }
  function unsafeHasProperty(prop, value) {
    return prop in value;
  }

  // output/Foreign.Index/index.js
  var unsafeReadProp = function(dictMonad) {
    var fail2 = fail(dictMonad);
    var pure3 = pure(applicativeExceptT(dictMonad));
    return function(k) {
      return function(value) {
        return unsafeReadPropImpl(fail2(new TypeMismatch("object", typeOf(value))), pure3, k, value);
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
  function readId(callback) {
    return function() {
      chrome.storage.sync.get("id", function(options2) {
        callback(options2.id)();
      });
    };
  }
  function userAgent() {
    return navigator.userAgent;
  }
  function selfImpl() {
    return self;
  }

  // output/Browser.Fetch/foreign.js
  function fetchImpl(url2) {
    return function(options2) {
      return function(successCallback) {
        return function(errorCallback) {
          return function() {
            fetch(url2, options2).then(
              function(response) {
                successCallback(response)();
              },
              function(error3) {
                console.log(typeof error3, arguments);
                errorCallback(error3)();
              }
            );
          };
        };
      };
    };
  }

  // output/Data.HTTP.Method/index.js
  var OPTIONS = /* @__PURE__ */ function() {
    function OPTIONS2() {
    }
    ;
    OPTIONS2.value = new OPTIONS2();
    return OPTIONS2;
  }();
  var GET = /* @__PURE__ */ function() {
    function GET2() {
    }
    ;
    GET2.value = new GET2();
    return GET2;
  }();
  var HEAD = /* @__PURE__ */ function() {
    function HEAD2() {
    }
    ;
    HEAD2.value = new HEAD2();
    return HEAD2;
  }();
  var POST = /* @__PURE__ */ function() {
    function POST2() {
    }
    ;
    POST2.value = new POST2();
    return POST2;
  }();
  var PUT = /* @__PURE__ */ function() {
    function PUT2() {
    }
    ;
    PUT2.value = new PUT2();
    return PUT2;
  }();
  var DELETE = /* @__PURE__ */ function() {
    function DELETE2() {
    }
    ;
    DELETE2.value = new DELETE2();
    return DELETE2;
  }();
  var TRACE = /* @__PURE__ */ function() {
    function TRACE2() {
    }
    ;
    TRACE2.value = new TRACE2();
    return TRACE2;
  }();
  var CONNECT = /* @__PURE__ */ function() {
    function CONNECT2() {
    }
    ;
    CONNECT2.value = new CONNECT2();
    return CONNECT2;
  }();
  var PROPFIND = /* @__PURE__ */ function() {
    function PROPFIND2() {
    }
    ;
    PROPFIND2.value = new PROPFIND2();
    return PROPFIND2;
  }();
  var PROPPATCH = /* @__PURE__ */ function() {
    function PROPPATCH2() {
    }
    ;
    PROPPATCH2.value = new PROPPATCH2();
    return PROPPATCH2;
  }();
  var MKCOL = /* @__PURE__ */ function() {
    function MKCOL2() {
    }
    ;
    MKCOL2.value = new MKCOL2();
    return MKCOL2;
  }();
  var COPY = /* @__PURE__ */ function() {
    function COPY2() {
    }
    ;
    COPY2.value = new COPY2();
    return COPY2;
  }();
  var MOVE = /* @__PURE__ */ function() {
    function MOVE2() {
    }
    ;
    MOVE2.value = new MOVE2();
    return MOVE2;
  }();
  var LOCK = /* @__PURE__ */ function() {
    function LOCK2() {
    }
    ;
    LOCK2.value = new LOCK2();
    return LOCK2;
  }();
  var UNLOCK = /* @__PURE__ */ function() {
    function UNLOCK2() {
    }
    ;
    UNLOCK2.value = new UNLOCK2();
    return UNLOCK2;
  }();
  var PATCH = /* @__PURE__ */ function() {
    function PATCH2() {
    }
    ;
    PATCH2.value = new PATCH2();
    return PATCH2;
  }();
  var showMethod = {
    show: function(v) {
      if (v instanceof OPTIONS) {
        return "OPTIONS";
      }
      ;
      if (v instanceof GET) {
        return "GET";
      }
      ;
      if (v instanceof HEAD) {
        return "HEAD";
      }
      ;
      if (v instanceof POST) {
        return "POST";
      }
      ;
      if (v instanceof PUT) {
        return "PUT";
      }
      ;
      if (v instanceof DELETE) {
        return "DELETE";
      }
      ;
      if (v instanceof TRACE) {
        return "TRACE";
      }
      ;
      if (v instanceof CONNECT) {
        return "CONNECT";
      }
      ;
      if (v instanceof PROPFIND) {
        return "PROPFIND";
      }
      ;
      if (v instanceof PROPPATCH) {
        return "PROPPATCH";
      }
      ;
      if (v instanceof MKCOL) {
        return "MKCOL";
      }
      ;
      if (v instanceof COPY) {
        return "COPY";
      }
      ;
      if (v instanceof MOVE) {
        return "MOVE";
      }
      ;
      if (v instanceof LOCK) {
        return "LOCK";
      }
      ;
      if (v instanceof UNLOCK) {
        return "UNLOCK";
      }
      ;
      if (v instanceof PATCH) {
        return "PATCH";
      }
      ;
      throw new Error("Failed pattern match at Data.HTTP.Method (line 43, column 1 - line 59, column 23): " + [v.constructor.name]);
    }
  };

  // output/Data.Op/index.js
  var Op = function(x) {
    return x;
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
  var $$void2 = /* @__PURE__ */ $$void(functorST);
  var fromFoldable3 = function(dictFoldable) {
    var fromFoldable1 = fromFoldable(dictFoldable);
    return function(l) {
      return runST(function __do2() {
        var s = newImpl();
        foreach(fromFoldable1(l))(function(v) {
          return $$void2(poke2(v.value0)(v.value1)(s));
        })();
        return s;
      });
    };
  };

  // output/Data.Options/index.js
  var fromFoldable4 = /* @__PURE__ */ fromFoldable3(foldableArray);
  var semigroupOptions = semigroupArray;
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

  // output/Browser.Fetch/index.js
  var optShow = function(dictShow) {
    var show2 = show(dictShow);
    return function(key) {
      return function(value) {
        return [new Tuple(key, unsafeToForeign(show2(value)))];
      };
    };
  };
  var method = /* @__PURE__ */ optShow(showMethod)("method");
  var headers = /* @__PURE__ */ opt("headers");
  var fetch2 = function(url2) {
    return function(options$prime) {
      return function(callback) {
        return fetchImpl(url2)(options(options$prime))(function($6) {
          return callback(Right.create($6));
        })(function($7) {
          return callback(Left.create($7));
        });
      };
    };
  };
  var body = /* @__PURE__ */ opt("body");

  // output/Domy.Class.ErrorEvent/foreign.js
  function messageDefault(event) {
    return event.message;
  }
  function filenameDefault(event) {
    return event.filename;
  }
  function linenoDefault(event) {
    return event.lineno;
  }
  function colnoDefault(event) {
    return event.colno;
  }
  function errorDefault(event) {
    return event.error;
  }

  // output/Domy.Class.ErrorEvent/index.js
  var message2 = function(dict) {
    return dict.message;
  };

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
      return function(options2) {
        return function(target) {
          return function() {
            target.addEventListener(eventType, listener, options2);
          };
        };
      };
    };
  }
  function removeEventListenerImpl(eventType) {
    return function(listener) {
      return function(target) {
        return function() {
          target.removeEventListener(eventType, listener);
        };
      };
    };
  }
  function dispatchEventImpl(event) {
    return function(target) {
      return function() {
        return target.dispatchEvent(event);
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
            return function(target) {
              return addEventListenerImpl(type$prime)(listener)(options(opts))(target);
            };
          };
        };
      };
    };
  };
  var addEventListener = function(dict) {
    return dict.addEventListener;
  };
  var addEventListener_ = function(dictEventTarget) {
    var addEventListener1 = addEventListener(dictEventTarget);
    return function(dictEvent) {
      var addEventListener2 = addEventListener1(dictEvent);
      return function(type$prime) {
        return function(listener) {
          return function(target) {
            return addEventListener2(type$prime)(listener)(mempty2)(target);
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
          return function(target) {
            return function __do2() {
              var eventListener = toEventListener(listener)();
              return addEventListener_2(type$prime)(eventListener)(target)();
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

  // output/Domy.Events.ErrorEvent/index.js
  var eventErrorEvent = {
    preventDefault: preventDefaultDefault,
    stopPropagation: stopPropagationDefault,
    stopImmediatePropagation: stopImmediatePropagationDefault
  };
  var mouseEventErrorEvent = {
    message: messageDefault,
    filename: filenameDefault,
    lineno: linenoDefault,
    colno: colnoDefault,
    error: errorDefault,
    Event0: function() {
      return eventErrorEvent;
    }
  };
  var error2 = "error";

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

  // output/RemoteLog/index.js
  var bind2 = /* @__PURE__ */ bind(bindEffect);
  var addEventListener_$prime2 = /* @__PURE__ */ addEventListener_$prime(eventTargetWindow)(eventErrorEvent);
  var message3 = /* @__PURE__ */ message2(mouseEventErrorEvent);
  var pure2 = /* @__PURE__ */ pure(applicativeEffect);
  var append12 = /* @__PURE__ */ append(semigroupOptions);
  var remoteLog = function(errorMessage) {
    return function __do2() {
      var agent = userAgent();
      return readId(function(id2) {
        var ignoreResult = either($$const(pure2(unit)))($$const(pure2(unit)));
        var body$prime = "Id: " + (id2 + (" Agent: " + (agent + (" " + errorMessage))));
        var options2 = append12(assoc(method)(POST.value))(append12(assoc(body)(body$prime))(assoc(headers)({
          "content-type": "text/plain"
        })));
        return fetch2("http://67.207.77.252:3001")(options2)(ignoreResult);
      })();
    };
  };
  var remoteLogWithUrl = function(errorMessage) {
    return function(errorUrl) {
      return remoteLog("Url: " + (errorUrl + (" " + errorMessage)));
    };
  };
  var remoteLogWorkerUncaught = /* @__PURE__ */ bind2(selfImpl)(/* @__PURE__ */ addEventListener_$prime2(error2)(function($9) {
    return remoteLog(message3($9));
  }));

  // output/Undefined/foreign.js
  var undefined2 = undefined2;

  // output/Unsafe.Reference/foreign.js
  function reallyUnsafeRefEq(a) {
    return function(b) {
      return a === b;
    };
  }

  // output/Unsafe.Reference/index.js
  var unsafeRefEq = reallyUnsafeRefEq;

  // output/Background.Main/index.js
  var bind3 = /* @__PURE__ */ bind(bindEffect);
  var bind1 = /* @__PURE__ */ bind(/* @__PURE__ */ bindExceptT(monadIdentity));
  var ix2 = /* @__PURE__ */ ix(/* @__PURE__ */ indexableForeign(monadIdentity))(/* @__PURE__ */ indexString(monadIdentity));
  var readString2 = /* @__PURE__ */ readString(monadIdentity);
  var elem3 = /* @__PURE__ */ elem2(eqInt);
  var when2 = /* @__PURE__ */ when(applicativeEffect);
  var mapFlipped2 = /* @__PURE__ */ mapFlipped(functorArray);
  var setSession_ = function(record) {
    return setSession(record)(undefined2);
  };
  var responseOk = function(details) {
    return statusCode(details) === 200 && !unsafeRefEq(undefined2)(responseHeaders(details));
  };
  var contextMenuItemId = "EnhancedImageViewer";
  var main = function __do() {
    remoteLogWorkerUncaught();
    wakeUp();
    createContextMenuItem({
      id: contextMenuItemId,
      title: "View image in current tab",
      contexts: ["image"]
    })();
    onContextMenuClick(function(clickData) {
      return function(tab$prime) {
        return function __do2() {
          var tabId$prime = id(tab$prime)();
          return sendMessageToTab(tabId$prime)({
            enhanceUrl: srcUrl(clickData)
          })();
        };
      };
    })();
    addOnMessageListener(function(message4) {
      return function(sender) {
        return function(respond) {
          var errorUrl = runExcept(bind1(ix2(message4)("url"))(readString2));
          var errorMessage = runExcept(bind1(ix2(message4)("error"))(readString2));
          if (errorMessage instanceof Right && errorUrl instanceof Right) {
            return remoteLogWithUrl(errorMessage.value0)(errorUrl.value0);
          }
          ;
          return getSessionObject({
            tabsToEnhance: []
          })(function(v) {
            return function __do2() {
              var senderTabId = bind3(tab(sender))(id)();
              var shouldEnhance = elem3(senderTabId)(v.tabsToEnhance);
              setSession_({
                tabsToEnhance: filter(function(v1) {
                  return v1 !== senderTabId;
                })(v.tabsToEnhance)
              })();
              return respond(unsafeToForeign({
                shouldEnhance
              }))();
            };
          });
        };
      };
    })();
    return addOnHeadersReceivedListener(function(details) {
      return when2(responseOk(details))(function() {
        var headers2 = mapFlipped2(responseHeaders(details))(function(header) {
          return {
            name: toLower(header.name),
            value: header.value
          };
        });
        var isImageContent = any(function(v) {
          return v.name === "content-type" && startsWith("image")(v.value);
        })(headers2);
        var isImageUrl = startsWith("data:image")(url(details));
        var isImage = isImageContent || isImageUrl;
        return when2(isImage)(getSessionObject({
          tabsToEnhance: []
        })(function(v) {
          return setSession_({
            tabsToEnhance: cons(tabId(details))(v.tabsToEnhance)
          });
        }));
      }());
    })({
      types: ["main_frame"],
      urls: ["<all_urls>"],
      tabId: undefined2,
      windowId: undefined2
    })(["responseHeaders"])();
  };

  // <stdin>
  main();
})();
