// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"index.js":[function(require,module,exports) {
$(document).ready(function () {
  // configure screens
  $(".loginSection").show();
  $(".searchSection").hide();
  $(".searchSection__articles").hide();
  $(".searchSection__articles--invalid").hide();
  $(".searchSection__main--invalid").hide(); // register event handlers

  $(".login__confirmButton").click(handleLogin);
  $(".search__button").click(handleSearch); // switch focus on input field and confirm username and password from any input field

  $(".login__username").keydown(function (enterKey) {
    if (enterKey.keyCode == 13) {
      handleLogin();
    }
  });
  $(".login__password").keydown(function (enterKey) {
    if (enterKey.keyCode == 13) {
      handleLogin();
    }
  });
  $(".login__username").keydown(function (enteredKey) {
    if (enteredKey.keyCode == 40) {
      $('.login__password').focus();
    }
  });
  $(".login__password").keydown(function (enteredKey) {
    if (enteredKey.keyCode == 40) {
      $('.login__confirmButton').focus();
    } else if (enteredKey.keyCode == 38) {
      $('.login__username').focus();
    }
  });
  $(".login__confirmButton").keydown(function (enteredKey) {
    if (enteredKey.keyCode == 38) {
      $('.login__password').focus();
    }
  });
});

function handleLogin() {
  var username = $('.login__username').val();
  var password = $('.login__password').val();
  $.get({
    url: "https://sandbox-api.ipool.asideas.de/sandbox/api/search?q=test",
    success: function success() {
      $(".login").removeClass("login--invalid");
      $(".login__username").removeClass('login__username--invalid');
      $(".login__password").removeClass('login__password--invalid');
      $(".login__confirmButton").removeClass('login__confirmButton--invalid');
      $(".header").removeClass('header--invalid');
      $(".footer").removeClass('footer--invalid');
      $(".login").fadeOut(function () {
        $(".searchSection").show();
      });
    },
    statusCode: {
      401: function _() {
        $(".login").addClass('login--invalid');
        $(".header").addClass('header--invalid');
        $(".footer").addClass('footer--invalid');
        $(".login__username").addClass('login__username--invalid');
        $(".login__password").addClass('login__password--invalid');
        $(".login__confirmButton").addClass('login__confirmButton--invalid');
        $(".login__username").val('');
        $(".login__password").val('');
      }
    },
    beforeSend: function beforeSend(apiCredentials) {
      apiCredentials.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
    }
  });
}

function newArticleTemplate(element) {
  return "<article class='searchSection__articles'><header class='searchSection__header'><h3>".concat(element.title, "</h3><h4>").concat(element.dateCreated, "</h4></header><main class ='searchSection__main'>").concat(element.content, "</main><footer class='searchSection__footer'><a target='_blank' href='").concat(element.url, "'>Go to the Website to read the full article</a></footer></article>");
}

function appendArticlesToList(data) {
  var searchLimit = $('.search__limit').val();

  if (data.pagination.total != 0 && searchLimit > 0) {
    if (searchLimit > 99) {
      searchLimit = 99;
    }

    for (i = 0; i < searchLimit; i++) {
      var element = data.documents[i];
      var template = newArticleTemplate(element);
      $(template).appendTo(".searchSection"), $("header").attr({
        onclick: '$(this).closest(".searchSection__articles").remove()'
      });
    }

    searchIndicator();
  } else {
    errorMessage();
  }
}

function handleSearch() {
  var searchWords = $('.search__bar').val();
  $(".searchSection__articles").remove();
  $(".searchSection__articles--invalid").hide();
  $(".searchSection__main--invalid").hide();
  searchArticles(searchWords, appendArticlesToList);
  setTimeout(checkArticleAmount, 500);
}

function errorMessage() {
  $(".search__bar").addClass('search__bar--invalid');
  $(".search__button").addClass('search__button--invalid');
  $(".search__limit").addClass('search__limit--invalid');
  $(".searchSection__articles--invalid").show();
  $(".searchSection__main--invalid").show();
  $(".header").addClass('header--invalid');
  $(".footer").addClass('footer--invalid');
  setTimeout(function () {
    $(".search__bar").removeClass('search__bar--invalid');
    $(".search__button").removeClass('search__button--invalid');
    $(".search__limit").removeClass('search__limit--invalid');
    $(".header").removeClass('header--invalid');
    $(".footer").removeClass('footer--invalid');
    $(".search__bar").val('');
  }, 1000);
}

function searchIndicator() {
  $(".search__button").addClass('search__button--active');
  $(".search__limit").addClass('search__limit--active');
  $(".header").addClass('header--active');
  $(".footer").addClass('footer--active');
  setTimeout(function () {
    $(".search__button").removeClass('search__button--active');
    $(".search__limit").removeClass('search__limit--active');
    $(".header").removeClass('header--active');
    $(".footer").removeClass('footer--active');
    $(".search__bar").val('');
  }, 1000);
}

function checkArticleAmount() {
  var limit = $('.search__limit').val();

  if ($('.searchSection__articles').length < limit) {
    var searchWords = $('.search__bar').val();
    searchArticles(searchWords, appendNewArticle);
  }

  setTimeout(checkArticleAmount, 1000);
}

var deletedArticles = 1;

function appendNewArticle(data) {
  var newArticleAmountCounter = Number($('.search__limit').val()) + deletedArticles;
  var element = data.documents[newArticleAmountCounter];
  var template = newArticleTemplate(element);
  $(template).appendTo(".searchSection"), $("header").attr({
    onclick: '$(this).closest(".searchSection__articles").remove()'
  });
  deletedArticles++;
}

function searchArticles(searchWords, callback) {
  $(".searchSection__articles--invalid").hide();
  $(".searchSection__main--invalid").hide();
  var username = $('.login__username').val();
  var password = $('.login__password').val();
  data = $.get({
    url: "https://sandbox-api.ipool.asideas.de/sandbox/api/search?q=" + encodeURI(searchWords) + "&limit=100",
    beforeSend: function beforeSend(apiCredentials) {
      apiCredentials.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
    },
    success: function success(data) {
      callback(data);
    },
    statusCode: {
      400: function _() {
        errorMessage();
      },
      401: function _() {
        errorMessage();
      },
      500: function _() {
        errorMessage();
      }
    }
  });
}
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58985" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/newsPaperApp.e31bb0bc.js.map