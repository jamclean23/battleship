/*! For license information please see battleship.bundle-6b5de94255ee22a08166.js.LICENSE.txt */
(()=>{"use strict";var t={d:(e,r)=>{for(var n in r)t.o(r,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:r[n]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};function r(){var t,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"player";function r(t,e,r){return t.receiveAttack(e,r)}function o(t){for(var e;!e;){var r=n(t);e=t.receiveAttack(r.x,r.y)}}return"ai"!==e&&(e="player"),"player"===e?{isTurn:!1,type:e,board:t,attack:r,name:"Player",selected:{x:0,y:0},placing:{ship:!1,orientation:"horizontal"},show:"myShips"}:"ai"===e?{isTurn:!1,type:e,board:t,attackRandom:o,name:"Ai"}:void 0}function n(t){var e=t.board.length;return{x:Math.floor(Math.random()*e),y:Math.floor(Math.random()*e)}}function o(t,e){return{length:t,totalHits:0,hit:function(){this.totalHits++},isSunk:function(){return this.totalHits>=this.length},name:e}}function i(){return{board:function(){for(var t=[],e=0;e<10;e++){for(var r=[],n=0;n<10;n++)r.push({ship:!1,attacked:!1});t.push(r)}return t}(),receiveAttack:c,placeShip:a,shipsSunk:u,ships:[],shipsList:[{name:"Carrier",length:5},{name:"Battleship",length:4},{name:"Destroyer",length:3},{name:"Submarine",length:3},{name:"Patrol Boat",length:2}]}}function a(t,e,r){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"horizontal",i=arguments.length>4?arguments[4]:void 0;if(u(t,e,this.board)){if("horizontal"!==n&&"vertical"!==n)throw new Error("Orientation not specified");if(c(t,e,r,n,this.board))return a(t,e,r,n,this.board,this,i),"valid"}return"invalid";function a(t,e,r,n,i,a,c){var u=o(r,c);a.ships.push(u);for(var s=0;s<r;s++)i[e][t].ship=u,"horizontal"===n&&t++,"vertical"===n&&e++}function c(t,e,r,n,o){for(var i=0;i<r;i++){if(!u(t,e,o))return!1;"horizontal"===n?t++:e++}return!0}function u(t,e,r){return!(e<0||e>9)&&(!(t<0||t>9)&&(!r[e][t].ship&&!r[e][t].attacked))}}function c(t,e){var r=this.board[e][t];return!(!function(t,e){return!(t<0||t>9||e<0||e>9)}(t,e)||r.attacked)&&(r.attacked=!0,r.ship?(r.ship.totalHits++,"hit"):"miss")}function u(){var t=0,e=this.ships;return e.forEach((function(e,r){e.isSunk()&&t++})),e.length===t&&e.length>0?"ALL":t}function s(t){t.shipsList.forEach((function(e,r){for(var n="invalid";"invalid"===n;){var o=l(),i=f(t);n=t.placeShip(i.x,i.y,e.length,o,e.name)}}))}function l(){return Math.floor(10*Math.random())>5?"horizontal":"vertical"}function f(t){var e=t.board.length;return{x:Math.floor(Math.random()*e),y:Math.floor(Math.random()*e)}}function h(t){return h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},h(t)}function p(){p=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n=Object.defineProperty||function(t,e,r){t[e]=r.value},o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function u(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(t){u=function(t,e,r){return t[e]=r}}function s(t,e,r,o){var i=e&&e.prototype instanceof d?e:d,a=Object.create(i.prototype),c=new O(o||[]);return n(a,"_invoke",{value:E(t,r,c)}),a}function l(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=s;var f={};function d(){}function y(){}function v(){}var m={};u(m,i,(function(){return this}));var g=Object.getPrototypeOf,w=g&&g(g(P([])));w&&w!==e&&r.call(w,i)&&(m=w);var b=v.prototype=d.prototype=Object.create(m);function x(t){["next","throw","return"].forEach((function(e){u(t,e,(function(t){return this._invoke(e,t)}))}))}function L(t,e){function o(n,i,a,c){var u=l(t[n],t,i);if("throw"!==u.type){var s=u.arg,f=s.value;return f&&"object"==h(f)&&r.call(f,"__await")?e.resolve(f.__await).then((function(t){o("next",t,a,c)}),(function(t){o("throw",t,a,c)})):e.resolve(f).then((function(t){s.value=t,a(s)}),(function(t){return o("throw",t,a,c)}))}c(u.arg)}var i;n(this,"_invoke",{value:function(t,r){function n(){return new e((function(e,n){o(t,r,e,n)}))}return i=i?i.then(n,n):n()}})}function E(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return _()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var c=S(a,r);if(c){if(c===f)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var u=l(t,e,r);if("normal"===u.type){if(n=r.done?"completed":"suspendedYield",u.arg===f)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n="completed",r.method="throw",r.arg=u.arg)}}}function S(t,e){var r=e.method,n=t.iterator[r];if(void 0===n)return e.delegate=null,"throw"===r&&t.iterator.return&&(e.method="return",e.arg=void 0,S(t,e),"throw"===e.method)||"return"!==r&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+r+"' method")),f;var o=l(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,f;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,f):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,f)}function k(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function T(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function O(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(k,this),this.reset(!0)}function P(t){if(t){var e=t[i];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:_}}function _(){return{value:void 0,done:!0}}return y.prototype=v,n(b,"constructor",{value:v,configurable:!0}),n(v,"constructor",{value:y,configurable:!0}),y.displayName=u(v,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===y||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,v):(t.__proto__=v,u(t,c,"GeneratorFunction")),t.prototype=Object.create(b),t},t.awrap=function(t){return{__await:t}},x(L.prototype),u(L.prototype,a,(function(){return this})),t.AsyncIterator=L,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new L(s(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},x(b),u(b,c,"Generator"),u(b,i,(function(){return this})),u(b,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},t.values=P,O.prototype={constructor:O,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(T),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var c=r.call(i,"catchLoc"),u=r.call(i,"finallyLoc");if(c&&u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,f):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),f},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),T(r),f}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;T(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:P(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),f}},t}function d(t,e,r,n,o,i,a){try{var c=t[i](a),u=c.value}catch(t){return void r(t)}c.done?e(u):Promise.resolve(u).then(n,o)}function y(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function a(t){d(i,n,o,a,c,"next",t)}function c(t){d(i,n,o,a,c,"throw",t)}a(void 0)}))}}function v(){var t=document.querySelectorAll(".board"),e=["A","B","C","D","E","F","G","H","I","J"];t.forEach((function(t){!function(t){var e=document.createElement("div");e.classList.add("empty"),e.classList.add("gridSquare"),e.style.backgroundColor="black",e.style.gridArea="0/0/1/1",t.appendChild(e)}(t),function(t){for(var r=0;r<10;r++){var n=document.createElement("div");n.innerText=e[r],n.classList.add("letter"),n.classList.add("gridSquare"),n.style.gridArea="0/"+r+"/1/"+(r+1),t.appendChild(n)}}(t),function(t){for(var e=0;e<10;e++){var r=document.createElement("div");r.innerText=e+1,r.classList.add("number"),r.classList.add("gridSquare"),r.style.gridColumn="0 / 1",r.style.gridRow=e+2+"/"+(e+3),t.appendChild(r)}}(t),function(t){for(var e=0;e<10;e++)for(var r=0;r<10;r++){var n=document.createElement("div");n.className="gridSquare gameSquare",n.meta={x:r,y:e},n.style.gridColumn=n.meta.x+2+" / "+(n.meta.x+3),n.style.gridRow=n.meta.y+2+" / "+(n.meta.y+3),t.appendChild(n)}}(t)}))}function m(t){var e=t.boards,r=t.players,n=t.findWhoseTurn(t);document.querySelectorAll(".arrow").forEach((function(e,r){"myShips"===n.show&&"placement"!=t.phase?e.disabled=!0:e.disabled=!1}));var o=document.querySelector("#rotate");"placement"!=t.phase&&(o.style.display="none");var i=document.querySelector("#targeting");if("placement"===t.phase?i.style.display="none":i.style.display="grid","ai"!==n.type){var a=document.querySelector("#boardIdent");"myShips"===n.show?a.innerText="My Fleet":a.innerText="Radar",document.querySelector("#playerIdent").innerText=n.name,document.querySelectorAll(".board.own").forEach((function(n,o){n.player=r[o],"ai"===n.player.type&&"player"===t.players[1-o].type&&(n.style.display="none"),n.querySelectorAll(".gameSquare").forEach((function(r){r.meta.square=g(r.meta.x,r.meta.y,e[o]),function(t,e,r){var n=r.meta.square.ship;r.meta.preview?r.classList.add("preview"):r.classList.remove("preview");n&&(r.innerText=n.name.slice(0,1),r.style.backgroundColor="gray",r.style.color="white");n&&r.meta.square.attacked&&(r.style.backgroundColor="red");!n&&r.meta.square.attacked&&(r.style.backgroundColor="blue");e.player.isTurn&&e.player.selected&&"placement"===t.phase&&r.meta.x===e.player.selected.x&&r.meta.y===e.player.selected.y?r.classList.add("selected"):r.classList.remove("selected")}(t,n,r)})),w(n)})),document.querySelectorAll(".board.theirs").forEach((function(n,o){n.player=r[o],"ai"===n.player.type&&"player"===t.players[1-o].type&&(n.style.display="none"),n.querySelectorAll(".gameSquare").forEach((function(r){r.meta.square=g(r.meta.x,r.meta.y,e[1-o]),function(t,e,r){var n=r.meta.square.ship;n&&r.meta.square.attacked&&(r.style.backgroundColor="red",r.innerText=n.name.slice(0,1),r.style.color="white");!n&&r.meta.square.attacked&&(r.style.backgroundColor="blue");e.player.isTurn&&e.player.selected&&("game"===t.phase&&r.meta.x===e.player.selected.x&&r.meta.y===e.player.selected.y?r.classList.add("selected"):r.classList.remove("selected"))}(t,n,r)})),w(n)}))}}function g(t,e,r){var n=!1;if(r.board.forEach((function(r,o){r.forEach((function(r,i){i===+t&&o===+e&&(n=r)}))})),n)return n;throw new Error("Node Square mismatch")}function w(t){!function(t){t.player.isTurn?t.style.display="grid":t.style.display="none"}(t),"myShips"===t.player.show&&function(t){t.classList.contains("own")||(t.style.display="none")}(t),"targeting"===t.player.show&&function(t){t.classList.contains("theirs")||(t.style.display="none")}(t)}function b(t){var e,r=t.findWhoseTurn(t);document.querySelectorAll(".board.own").forEach((function(t){t.player===r&&(e=t)}));for(var n=1;n<r.placing.ship.length;n++)if("horizontal"===r.placing.orientation){var o=a(r.selected.x+n,r.selected.y,e);o&&o.classList.add("preview")}else if("vertical"===r.placing.orientation){var i=a(r.selected.x,r.selected.y+n,e);i&&i.classList.add("preview")}function a(t,e,r){var n;return r.querySelectorAll(".gameSquare").forEach((function(r){r.meta.x===t&&r.meta.y===e&&(n=r)})),n||!1}}function x(){return L.apply(this,arguments)}function L(){return L=y(p().mark((function t(){var e;return p().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"BATTLEBOATS",e=document.createElement("div");e.classList.add("modal");var r=document.createElement("p");r.innerText=t,r.style.color="white",r.style.fontSize="12vw",e.appendChild(r);var n=document.querySelector("body");n.appendChild(e)},t.abrupt("return",new Promise((function(t){e(),setTimeout((function(){t()}),4e3)})));case 2:case"end":return t.stop()}}),t)}))),L.apply(this,arguments)}function E(t,e){return S.apply(this,arguments)}function S(){return S=y(p().mark((function t(e,r){var n,o,i,a,c,u=arguments;return p().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return c=function(t){document.querySelector(".modal").remove()},a=function(t,e,r){var n=document.createElement("p");n.innerText=e.findWhoseTurn().name+" is next\n"+r,n.classList.add("modalMessage"),t.appendChild(n);var o=document.createElement("button");o.innerText="Ready!",o.classList.add("readyButton"),o.style.cssText="font-size: 3vh",t.appendChild(o)},i=function(t,e){var r=document.createElement("div");r.classList.add("modal"),document.querySelector("body").appendChild(r),a(r,t,e)},o=function(){var t=document.querySelector(".modal");console.log(t),t.innerHTML=""},n=u.length>2&&void 0!==u[2]?u[2]:"",t.abrupt("return",new Promise((function(t){console.log("splashing");var r=document.querySelector(".modal");r?(o(),a(r,e,n)):i(e,n);var u=document.querySelector(".modal .readyButton");u.addEventListener("click",(function r(){u.removeEventListener("click",r),"player"===e.findWhoseTurn().type&&c(e);t()}))})));case 6:case"end":return t.stop()}}),t)}))),S.apply(this,arguments)}function k(t){return k="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},k(t)}function T(){T=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n=Object.defineProperty||function(t,e,r){t[e]=r.value},o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function u(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(t){u=function(t,e,r){return t[e]=r}}function s(t,e,r,o){var i=e&&e.prototype instanceof h?e:h,a=Object.create(i.prototype),c=new O(o||[]);return n(a,"_invoke",{value:x(t,r,c)}),a}function l(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=s;var f={};function h(){}function p(){}function d(){}var y={};u(y,i,(function(){return this}));var v=Object.getPrototypeOf,m=v&&v(v(P([])));m&&m!==e&&r.call(m,i)&&(y=m);var g=d.prototype=h.prototype=Object.create(y);function w(t){["next","throw","return"].forEach((function(e){u(t,e,(function(t){return this._invoke(e,t)}))}))}function b(t,e){function o(n,i,a,c){var u=l(t[n],t,i);if("throw"!==u.type){var s=u.arg,f=s.value;return f&&"object"==k(f)&&r.call(f,"__await")?e.resolve(f.__await).then((function(t){o("next",t,a,c)}),(function(t){o("throw",t,a,c)})):e.resolve(f).then((function(t){s.value=t,a(s)}),(function(t){return o("throw",t,a,c)}))}c(u.arg)}var i;n(this,"_invoke",{value:function(t,r){function n(){return new e((function(e,n){o(t,r,e,n)}))}return i=i?i.then(n,n):n()}})}function x(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return _()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var c=L(a,r);if(c){if(c===f)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var u=l(t,e,r);if("normal"===u.type){if(n=r.done?"completed":"suspendedYield",u.arg===f)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n="completed",r.method="throw",r.arg=u.arg)}}}function L(t,e){var r=e.method,n=t.iterator[r];if(void 0===n)return e.delegate=null,"throw"===r&&t.iterator.return&&(e.method="return",e.arg=void 0,L(t,e),"throw"===e.method)||"return"!==r&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+r+"' method")),f;var o=l(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,f;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,f):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,f)}function E(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function S(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function O(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(E,this),this.reset(!0)}function P(t){if(t){var e=t[i];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:_}}function _(){return{value:void 0,done:!0}}return p.prototype=d,n(g,"constructor",{value:d,configurable:!0}),n(d,"constructor",{value:p,configurable:!0}),p.displayName=u(d,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===p||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,d):(t.__proto__=d,u(t,c,"GeneratorFunction")),t.prototype=Object.create(g),t},t.awrap=function(t){return{__await:t}},w(b.prototype),u(b.prototype,a,(function(){return this})),t.AsyncIterator=b,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new b(s(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},w(g),u(g,c,"Generator"),u(g,i,(function(){return this})),u(g,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},t.values=P,O.prototype={constructor:O,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(S),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var c=r.call(i,"catchLoc"),u=r.call(i,"finallyLoc");if(c&&u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,f):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),f},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),S(r),f}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;S(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:P(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),f}},t}function O(t,e,r,n,o,i,a){try{var c=t[i](a),u=c.value}catch(t){return void r(t)}c.done?e(u):Promise.resolve(u).then(n,o)}function P(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function a(t){O(i,n,o,a,c,"next",t)}function c(t){O(i,n,o,a,c,"throw",t)}a(void 0)}))}}function _(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"player",n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"player",o=[],a=0;a<2;a++)o[a]=i();var c=[t,n],u=[];function s(){return l.apply(this,arguments)}function l(){return l=P(T().mark((function t(){var e,r,n,o,i,a,c,s,l;return T().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:l=function(){return l=P(T().mark((function t(){var e,r,n,o,a,c,u,l,h,p,d=arguments;return T().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return p=function(){return new Promise((function(t){setTimeout((function(){t(s(e,r,n,++o,a=1-a))}),e)}))},h=function(t,e){return new Promise((function(r){var n=document.querySelector("#commit"),o=t.players[e];n.addEventListener("click",(function i(){if(n.removeEventListener("click",i),function(t,e){return t>=0&&t<10&&e>=0&&e<10||(console.log("out of range"),!1)}(o.selected.x,o.selected.y)){t.boards[1-e].receiveAttack(o.selected.x,o.selected.y)?r({x:o.selected.x,y:o.selected.y}):(console.log("Invalid Placement"),r(!1))}else r(!1)}))}))},e=d.length>0&&void 0!==d[0]?d[0]:0,r=d.length>1?d[1]:void 0,n=d.length>2&&void 0!==d[2]&&d[2],o=d.length>3&&void 0!==d[3]?d[3]:0,a=d.length>4&&void 0!==d[4]?d[4]:0,console.log(e),m(r),t.next=11,E(r,"transition");case 11:if(console.log("player turn: "+(a+1)),"ai"!==r.players[a].type){t.next=16;break}r.players[a].attackRandom(r.boards[1-a]),t.next=26;break;case 16:if("player"!==r.players[a].type){t.next=26;break}r.findWhoseTurn(r).show="myShips",m(r),c=!1;case 20:if(c){t.next=26;break}return t.next=23,h(r,a);case 23:c=t.sent,t.next=20;break;case 26:if(m(r),"player"!==r.findWhoseTurn().type){t.next=30;break}return t.next=30,f();case 30:if(n=r.testWinner(),i(r),!n){t.next=35;break}return u=new Promise((function(t){t({winner:n,turns:o})})),t.abrupt("return",u);case 35:return t.next=37,p();case 37:return l=t.sent,t.abrupt("return",l);case 39:case"end":return t.stop()}}),t)}))),l.apply(this,arguments)},s=function(){return l.apply(this,arguments)},c=function(){return(c=P(T().mark((function t(e,r){var n;return T().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s(r,e);case 2:n=t.sent,console.log(n.winner.name+" has won in "+n.turns+" turns!");case 4:case"end":return t.stop()}}),t)})))).apply(this,arguments)},a=function(t,e){return c.apply(this,arguments)},i=function(t){t.players.forEach((function(t){t.isTurn?t.isTurn=!1:t.isTurn=!0}))},o=function(t){function e(e){var r=e.srcElement.id,n=h(t);switch(r){case"myShips":n.show="myShips";break;case"targeting":n.show="targeting"}m(t),"placement"===t.phase&&b(t)}function r(e){var r=e.srcElement.id,n=h(t);if("ai"!==n.type){if(!n)throw new Error("Game not started");switch(r){case"up":n.selected=o(n.selected,0,-1);break;case"down":n.selected=o(n.selected,0,1);break;case"left":n.selected=o(n.selected,-1,0);break;case"right":n.selected=o(n.selected,1,0)}m(t),"placement"===t.phase&&b(t)}function o(t,e,r){return t.x=t.x+e,t.y=t.y+r,t.x>9&&(t.x=9),t.x<0&&(t.x=0),t.y>9&&(t.y=9),t.y<0&&(t.y=0),t}}document.querySelectorAll(".displayButton").forEach((function(t){t.addEventListener("click",e)})),document.querySelectorAll(".arrow").forEach((function(t){t.addEventListener("click",r)}))},n=function(){return n=P(T().mark((function t(e,r,n){var o,i,a,c;return T().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:c=function(t,r,o){return new Promise((function(i){var a=document.querySelector("#commit");a.addEventListener("click",u);var c=document.querySelector("#rotate");function u(){a.removeEventListener("click",u),a.removeEventListener("click",u);var c=t.placeShip(e.players[n].selected.x,e.players[n].selected.y,t.shipsList[r].length,o,t.shipsList[r].name);i(c)}c.addEventListener("click",(function t(){a.removeEventListener("click",u),c.removeEventListener("click",t),o="horizontal"===o?"vertical":"horizontal",i(o)}))}))},o=0;case 2:if(!(o<r.shipsList.length)){t.next=20;break}(i=e.players[n]).placing.ship=r.shipsList[o],i.placing.orientation="horizontal",b(e),a="invalid";case 8:if("valid"==a){t.next=17;break}return t.next=11,c(r,o,i.placing.orientation);case 11:"horizontal"!==(a=t.sent)&&"vertical"!==a||(i.placing.orientation=a),m(e),b(e),t.next=8;break;case 17:o++,t.next=2;break;case 20:return t.abrupt("return",new Promise((function(t){t()})));case 21:case"end":return t.stop()}}),t)}))),n.apply(this,arguments)},r=function(t,e,r){return n.apply(this,arguments)},this.players[0].isTurn=!0,o(this),this.players.forEach((function(t,e){t.name=t.name+" #"+(e+1)})),console.log("Placement Phase"),e=0;case 13:if(!(e<this.boards.length)){t.next=31;break}return m(this),t.next=17,E(this,"transition","Placement Phase");case 17:if("ai"!==this.players[e].type){t.next=21;break}this.Ai.populate(this.boards[e]),t.next=25;break;case 21:if("player"!==this.players[e].type){t.next=25;break}return t.next=24,r(this,this.boards[e],e);case 24:u[e].show="myShips";case 25:return i(this),t.next=28,f();case 28:e++,t.next=13;break;case 31:m(this),console.log("Game Phase"),this.phase="game",a(this,0);case 36:case"end":return t.stop()}}),t,this)}))),l.apply(this,arguments)}function f(){return new Promise((function(t){setTimeout((function(){t()}),2e3)}))}function h(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this,e=!1;return t.players.forEach((function(t){t.isTurn&&(e=t)})),e}function p(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this,e=!1;return t.players.forEach((function(r,n){r.isTurn&&(e=t.players[1-n])})),e}return c.forEach((function(t,e){var n=r(t);n.board=o[e],u.push(n)})),{players:u,boards:o,Ai:e,testWinner:j,mainLoop:s,phase:"placement",findWhoseTurn:h,findWhoseNextTurn:p}}function j(){var t=this,e=this.boards,r=!1;return e.forEach((function(e,n){"ALL"===e.shipsSunk()&&(r=t.players[1-n])})),r}function q(t){return q="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},q(t)}function A(){A=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n=Object.defineProperty||function(t,e,r){t[e]=r.value},o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function u(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(t){u=function(t,e,r){return t[e]=r}}function s(t,e,r,o){var i=e&&e.prototype instanceof h?e:h,a=Object.create(i.prototype),c=new k(o||[]);return n(a,"_invoke",{value:x(t,r,c)}),a}function l(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=s;var f={};function h(){}function p(){}function d(){}var y={};u(y,i,(function(){return this}));var v=Object.getPrototypeOf,m=v&&v(v(T([])));m&&m!==e&&r.call(m,i)&&(y=m);var g=d.prototype=h.prototype=Object.create(y);function w(t){["next","throw","return"].forEach((function(e){u(t,e,(function(t){return this._invoke(e,t)}))}))}function b(t,e){function o(n,i,a,c){var u=l(t[n],t,i);if("throw"!==u.type){var s=u.arg,f=s.value;return f&&"object"==q(f)&&r.call(f,"__await")?e.resolve(f.__await).then((function(t){o("next",t,a,c)}),(function(t){o("throw",t,a,c)})):e.resolve(f).then((function(t){s.value=t,a(s)}),(function(t){return o("throw",t,a,c)}))}c(u.arg)}var i;n(this,"_invoke",{value:function(t,r){function n(){return new e((function(e,n){o(t,r,e,n)}))}return i=i?i.then(n,n):n()}})}function x(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return O()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var c=L(a,r);if(c){if(c===f)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var u=l(t,e,r);if("normal"===u.type){if(n=r.done?"completed":"suspendedYield",u.arg===f)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n="completed",r.method="throw",r.arg=u.arg)}}}function L(t,e){var r=e.method,n=t.iterator[r];if(void 0===n)return e.delegate=null,"throw"===r&&t.iterator.return&&(e.method="return",e.arg=void 0,L(t,e),"throw"===e.method)||"return"!==r&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+r+"' method")),f;var o=l(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,f;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,f):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,f)}function E(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function S(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function k(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(E,this),this.reset(!0)}function T(t){if(t){var e=t[i];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:O}}function O(){return{value:void 0,done:!0}}return p.prototype=d,n(g,"constructor",{value:d,configurable:!0}),n(d,"constructor",{value:p,configurable:!0}),p.displayName=u(d,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===p||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,d):(t.__proto__=d,u(t,c,"GeneratorFunction")),t.prototype=Object.create(g),t},t.awrap=function(t){return{__await:t}},w(b.prototype),u(b.prototype,a,(function(){return this})),t.AsyncIterator=b,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new b(s(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},w(g),u(g,c,"Generator"),u(g,i,(function(){return this})),u(g,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},t.values=T,k.prototype={constructor:k,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(S),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var c=r.call(i,"catchLoc"),u=r.call(i,"finallyLoc");if(c&&u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,f):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),f},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),S(r),f}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;S(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:T(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),f}},t}function G(t,e,r,n,o,i,a){try{var c=t[i](a),u=c.value}catch(t){return void r(t)}c.done?e(u):Promise.resolve(u).then(n,o)}function N(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function a(t){G(i,n,o,a,c,"next",t)}function c(t){G(i,n,o,a,c,"throw",t)}a(void 0)}))}}function C(){return(C=N(A().mark((function t(){var e;return A().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,x();case 2:e=_("player","player"),v(),e.mainLoop();case 5:case"end":return t.stop()}}),t)})))).apply(this,arguments)}t.r(e),t.d(e,{populate:()=>s}),function(){C.apply(this,arguments)}()})();
//# sourceMappingURL=battleship.bundle-6b5de94255ee22a08166.js.map