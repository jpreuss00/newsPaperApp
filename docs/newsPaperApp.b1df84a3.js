parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"Focm":[function(require,module,exports) {
function e(){var e=$(".login__username").val(),a=$(".login__password").val();$.get({url:"https://thawing-ridge-63424.herokuapp.com/",success:function(){$(".login").removeClass("login--invalid"),$(".login__username").removeClass("login__username--invalid"),$(".login__password").removeClass("login__password--invalid"),$(".login__confirmButton").removeClass("login__confirmButton--invalid"),$(".header").removeClass("header--invalid"),$(".footer").removeClass("footer--invalid"),$(".login").fadeOut(function(){$(".searchSection").show()})},statusCode:{401:function(){$(".login").addClass("login--invalid"),$(".header").addClass("header--invalid"),$(".footer").addClass("footer--invalid"),$(".login__username").addClass("login__username--invalid"),$(".login__password").addClass("login__password--invalid"),$(".login__confirmButton").addClass("login__confirmButton--invalid"),$(".login__username").val(""),$(".login__password").val("")}},beforeSend:function(i){i.setRequestHeader("Authorization","Basic "+btoa(e+":"+a))}})}function a(e){return"<article class='searchSection__articles'><header class='searchSection__header'><h3>".concat(e.title,"</h3><h4>").concat(e.dateCreated,"</h4></header><main class ='searchSection__main'>").concat(e.content,"</main><footer class='searchSection__footer'><a target='_blank' href='").concat(e.url,"'>Go to the Website to read the full article</a></footer></article>")}function o(e){var o=$(".search__limit").val();if(0!=e.pagination.total&&o>0){for(o>99&&(o=99),i=0;i<o;i++){var n=a(e.documents[i]);$(n).appendTo(".searchSection"),$("header").attr({onclick:'$(this).closest(".searchSection__articles").remove()'})}t()}else s()}function n(){var e=$(".search__bar").val();$(".searchSection__articles").remove(),$(".searchSection__articles--invalid").hide(),$(".searchSection__main--invalid").hide(),_(e,o),setTimeout(r,500)}function s(){$(".search__bar").addClass("search__bar--invalid"),$(".search__button").addClass("search__button--invalid"),$(".search__limit").addClass("search__limit--invalid"),$(".searchSection__articles--invalid").show(),$(".searchSection__main--invalid").show(),$(".header").addClass("header--invalid"),$(".footer").addClass("footer--invalid"),setTimeout(function(){$(".search__bar").removeClass("search__bar--invalid"),$(".search__button").removeClass("search__button--invalid"),$(".search__limit").removeClass("search__limit--invalid"),$(".header").removeClass("header--invalid"),$(".footer").removeClass("footer--invalid"),$(".search__bar").val("")},1e3)}function t(){$(".search__button").addClass("search__button--active"),$(".search__limit").addClass("search__limit--active"),$(".header").addClass("header--active"),$(".footer").addClass("footer--active"),setTimeout(function(){$(".search__button").removeClass("search__button--active"),$(".search__limit").removeClass("search__limit--active"),$(".header").removeClass("header--active"),$(".footer").removeClass("footer--active"),$(".search__bar").val("")},1e3)}function r(){var e=$(".search__limit").val();$(".searchSection__articles").length<e&&_($(".search__bar").val(),l);setTimeout(r,1e3)}$(document).ready(function(){$(".loginSection").show(),$(".searchSection").hide(),$(".searchSection__articles").hide(),$(".searchSection__articles--invalid").hide(),$(".searchSection__main--invalid").hide(),$(".login__confirmButton").click(e),$(".search__button").click(n),$(".login__username").keydown(function(a){13==a.keyCode&&e()}),$(".login__password").keydown(function(a){13==a.keyCode&&e()}),$(".login__username").keydown(function(e){40==e.keyCode&&$(".login__password").focus()}),$(".login__password").keydown(function(e){40==e.keyCode?$(".login__confirmButton").focus():38==e.keyCode&&$(".login__username").focus()}),$(".login__confirmButton").keydown(function(e){38==e.keyCode&&$(".login__password").focus()})});var c=1;function l(e){var i=Number($(".search__limit").val())+c,o=a(e.documents[i]);$(o).appendTo(".searchSection"),$("header").attr({onclick:'$(this).closest(".searchSection__articles").remove()'}),c++}function _(e,a){$(".searchSection__articles--invalid").hide(),$(".searchSection__main--invalid").hide();var i=$(".login__username").val(),o=$(".login__password").val();data=$.get({url:"https://sandbox-api.ipool.asideas.de/sandbox/api/search?q="+encodeURI(e)+"&limit=100",beforeSend:function(e){e.setRequestHeader("Authorization","Basic "+btoa(i+":"+o))},success:function(e){a(e)},statusCode:{400:function(){s()},401:function(){s()},500:function(){s()}}})}
},{}]},{},["Focm"], null)
//# sourceMappingURL=newsPaperApp.b1df84a3.js.map