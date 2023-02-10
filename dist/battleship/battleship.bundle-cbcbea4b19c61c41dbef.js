/*! For license information please see battleship.bundle-cbcbea4b19c61c41dbef.js.LICENSE.txt */
(()=>{"use strict";var e={d:(t,r)=>{for(var n in r)e.o(r,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:r[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};function r(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"player";function r(e,t,r){return e.receiveAttack(t,r)}function o(e){for(var t;!t;){var r=n(e);t=e.receiveAttack(r.x,r.y)}}return"ai"!==t&&(t="player"),"player"===t?{isTurn:!1,type:t,board:e,attack:r,name:"Player",selected:{x:0,y:0},placing:{ship:!1,orientation:"horizontal"},show:"myShips"}:"ai"===t?{isTurn:!1,type:t,board:e,attackRandom:o,name:"Ai"}:void 0}function n(e){var t=e.board.length;return{x:Math.floor(Math.random()*t),y:Math.floor(Math.random()*t)}}function o(e,t){return{length:e,totalHits:0,hit:function(){this.totalHits++},isSunk:function(){return this.totalHits>=this.length},name:t}}function a(){return{board:function(){for(var e=[],t=0;t<10;t++){for(var r=[],n=0;n<10;n++)r.push({ship:!1,attacked:!1});e.push(r)}return e}(),receiveAttack:c,placeShip:i,shipsSunk:s,ships:[],shipsList:[{name:"Carrier",length:5},{name:"Battleship",length:4},{name:"Destroyer",length:3},{name:"Submarine",length:3},{name:"Patrol Boat",length:2}]}}function i(e,t,r){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"horizontal",a=arguments.length>4?arguments[4]:void 0;if(s(e,t,this.board)){if("horizontal"!==n&&"vertical"!==n)throw new Error("Orientation not specified");if(c(e,t,r,n,this.board))return i(e,t,r,n,this.board,this,a),"valid"}return"invalid";function i(e,t,r,n,a,i,c){var s=o(r,c);i.ships.push(s);for(var l=0;l<r;l++)a[t][e].ship=s,"horizontal"===n&&e++,"vertical"===n&&t++}function c(e,t,r,n,o){for(var a=0;a<r;a++){if(!s(e,t,o))return!1;"horizontal"===n?e++:t++}return!0}function s(e,t,r){return!(t<0||t>9)&&(!(e<0||e>9)&&(!r[t][e].ship&&!r[t][e].attacked))}}function c(e,t){var r=this.board[t][e];return!(!function(e,t){return!(e<0||e>9||t<0||t>9)}(e,t)||r.attacked)&&(r.attacked=!0,r.ship?(r.ship.totalHits++,"hit"):"miss")}function s(){var e=0,t=this.ships;return t.forEach((function(t,r){t.isSunk()&&e++})),t.length===e&&t.length>0?"ALL":e}function l(e){e.shipsList.forEach((function(t,r){for(var n="invalid";"invalid"===n;){var o=u(),a=h(e);n=e.placeShip(a.x,a.y,t.length,o,t.name)}}))}function u(){return Math.floor(10*Math.random())>5?"horizontal":"vertical"}function h(e){var t=e.board.length;return{x:Math.floor(Math.random()*t),y:Math.floor(Math.random()*t)}}function d(e){var t=e.boards,r=e.players,n=e.findWhoseTurn(e);document.querySelectorAll(".arrow").forEach((function(t,r){"myShips"===n.show&&"placement"!=e.phase?t.disabled=!0:t.disabled=!1}));var o=document.querySelector("#rotate");"placement"!=e.phase&&(o.style.display="none");var a=document.querySelector("#targeting");if("placement"===e.phase?a.style.display="none":a.style.display="grid","ai"!==n.type){var i=document.querySelector("#boardIdent");"myShips"===n.show?i.innerText="My Fleet":i.innerText="Radar",document.querySelector("#playerIdent").innerText=n.name,document.querySelectorAll(".board.own").forEach((function(n,o){n.player=r[o],"ai"===n.player.type&&"player"===e.players[1-o].type&&(n.style.display="none"),n.querySelectorAll(".gameSquare").forEach((function(r){r.meta.square=f(r.meta.x,r.meta.y,t[o]),function(e,t,r){var n=r.meta.square.ship;r.meta.preview?r.classList.add("preview"):r.classList.remove("preview");n&&(r.innerText=n.name.slice(0,1),r.style.backgroundColor="gray",r.style.color="white");n&&r.meta.square.attacked&&(r.style.backgroundColor="red");!n&&r.meta.square.attacked&&(r.style.backgroundColor="blue");t.player.isTurn&&t.player.selected&&"placement"===e.phase&&r.meta.x===t.player.selected.x&&r.meta.y===t.player.selected.y?r.classList.add("selected"):r.classList.remove("selected")}(e,n,r)})),p(n)})),document.querySelectorAll(".board.theirs").forEach((function(n,o){n.player=r[o],"ai"===n.player.type&&"player"===e.players[1-o].type&&(n.style.display="none"),n.querySelectorAll(".gameSquare").forEach((function(r){r.meta.square=f(r.meta.x,r.meta.y,t[1-o]),function(e,t,r){var n=r.meta.square.ship;n&&r.meta.square.attacked&&(r.style.backgroundColor="red",r.innerText=n.name.slice(0,1),r.style.color="white");!n&&r.meta.square.attacked&&(r.style.backgroundColor="blue");t.player.isTurn&&t.player.selected&&("game"===e.phase&&r.meta.x===t.player.selected.x&&r.meta.y===t.player.selected.y?r.classList.add("selected"):r.classList.remove("selected"))}(e,n,r)})),p(n)}))}}function f(e,t,r){var n=!1;if(r.board.forEach((function(r,o){r.forEach((function(r,a){a===+e&&o===+t&&(n=r)}))})),n)return n;throw new Error("Node Square mismatch")}function p(e){!function(e){e.player.isTurn?e.style.display="grid":e.style.display="none"}(e),"myShips"===e.player.show&&function(e){e.classList.contains("own")||(e.style.display="none")}(e),"targeting"===e.player.show&&function(e){e.classList.contains("theirs")||(e.style.display="none")}(e)}function y(e){var t,r=e.findWhoseTurn(e);document.querySelectorAll(".board.own").forEach((function(e){e.player===r&&(t=e)}));for(var n=1;n<r.placing.ship.length;n++)if("horizontal"===r.placing.orientation){var o=i(r.selected.x+n,r.selected.y,t);o&&o.classList.add("preview")}else if("vertical"===r.placing.orientation){var a=i(r.selected.x,r.selected.y+n,t);a&&a.classList.add("preview")}function i(e,t,r){var n;return r.querySelectorAll(".gameSquare").forEach((function(r){r.meta.x===e&&r.meta.y===t&&(n=r)})),n||!1}}function v(e){return new Promise((function(r){console.log("splashing");var n=document.querySelector(".modal");n?(!function(){var e=document.querySelector(".modal");console.log(e),e.innerHTML=""}(),t(n,e)):function(e){var r=document.createElement("div");r.classList.add("modal"),document.querySelector("body").appendChild(r),t(r,e)}(e);var o=document.querySelector(".modal .readyButton");o.addEventListener("click",(function t(){o.removeEventListener("click",t),"player"===e.findWhoseTurn().type&&function(e){var t=document.querySelector(".modal");t.remove()}();r()}))}));function t(e,t){var r=document.createElement("p");r.innerText=t.findWhoseTurn().name+" is next",r.classList.add("modalMessage"),e.appendChild(r);var n=document.createElement("button");n.innerText="Ready!",n.classList.add("readyButton"),n.style.cssText="font-size: 3vh",e.appendChild(n)}}function m(e){return m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},m(e)}function g(){g=function(){return e};var e={},t=Object.prototype,r=t.hasOwnProperty,n=Object.defineProperty||function(e,t,r){e[t]=r.value},o="function"==typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",i=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function s(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{s({},"")}catch(e){s=function(e,t,r){return e[t]=r}}function l(e,t,r,o){var a=t&&t.prototype instanceof d?t:d,i=Object.create(a.prototype),c=new T(o||[]);return n(i,"_invoke",{value:k(e,r,c)}),i}function u(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}e.wrap=l;var h={};function d(){}function f(){}function p(){}var y={};s(y,a,(function(){return this}));var v=Object.getPrototypeOf,b=v&&v(v(P([])));b&&b!==t&&r.call(b,a)&&(y=b);var w=p.prototype=d.prototype=Object.create(y);function x(e){["next","throw","return"].forEach((function(t){s(e,t,(function(e){return this._invoke(t,e)}))}))}function L(e,t){function o(n,a,i,c){var s=u(e[n],e,a);if("throw"!==s.type){var l=s.arg,h=l.value;return h&&"object"==m(h)&&r.call(h,"__await")?t.resolve(h.__await).then((function(e){o("next",e,i,c)}),(function(e){o("throw",e,i,c)})):t.resolve(h).then((function(e){l.value=e,i(l)}),(function(e){return o("throw",e,i,c)}))}c(s.arg)}var a;n(this,"_invoke",{value:function(e,r){function n(){return new t((function(t,n){o(e,r,t,n)}))}return a=a?a.then(n,n):n()}})}function k(e,t,r){var n="suspendedStart";return function(o,a){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw a;return A()}for(r.method=o,r.arg=a;;){var i=r.delegate;if(i){var c=E(i,r);if(c){if(c===h)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var s=u(e,t,r);if("normal"===s.type){if(n=r.done?"completed":"suspendedYield",s.arg===h)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(n="completed",r.method="throw",r.arg=s.arg)}}}function E(e,t){var r=t.method,n=e.iterator[r];if(void 0===n)return t.delegate=null,"throw"===r&&e.iterator.return&&(t.method="return",t.arg=void 0,E(e,t),"throw"===t.method)||"return"!==r&&(t.method="throw",t.arg=new TypeError("The iterator does not provide a '"+r+"' method")),h;var o=u(n,e.iterator,t.arg);if("throw"===o.type)return t.method="throw",t.arg=o.arg,t.delegate=null,h;var a=o.arg;return a?a.done?(t[e.resultName]=a.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,h):a:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,h)}function S(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function q(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function T(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(S,this),this.reset(!0)}function P(e){if(e){var t=e[a];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var n=-1,o=function t(){for(;++n<e.length;)if(r.call(e,n))return t.value=e[n],t.done=!1,t;return t.value=void 0,t.done=!0,t};return o.next=o}}return{next:A}}function A(){return{value:void 0,done:!0}}return f.prototype=p,n(w,"constructor",{value:p,configurable:!0}),n(p,"constructor",{value:f,configurable:!0}),f.displayName=s(p,c,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===f||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,p):(e.__proto__=p,s(e,c,"GeneratorFunction")),e.prototype=Object.create(w),e},e.awrap=function(e){return{__await:e}},x(L.prototype),s(L.prototype,i,(function(){return this})),e.AsyncIterator=L,e.async=function(t,r,n,o,a){void 0===a&&(a=Promise);var i=new L(l(t,r,n,o),a);return e.isGeneratorFunction(r)?i:i.next().then((function(e){return e.done?e.value:i.next()}))},x(w),s(w,c,"Generator"),s(w,a,(function(){return this})),s(w,"toString",(function(){return"[object Generator]"})),e.keys=function(e){var t=Object(e),r=[];for(var n in t)r.push(n);return r.reverse(),function e(){for(;r.length;){var n=r.pop();if(n in t)return e.value=n,e.done=!1,e}return e.done=!0,e}},e.values=P,T.prototype={constructor:T,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(q),!e)for(var t in this)"t"===t.charAt(0)&&r.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function n(r,n){return i.type="throw",i.arg=e,t.next=r,n&&(t.method="next",t.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],i=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var c=r.call(a,"catchLoc"),s=r.call(a,"finallyLoc");if(c&&s){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===e||"continue"===e)&&a.tryLoc<=t&&t<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=e,i.arg=t,a?(this.method="next",this.next=a.finallyLoc,h):this.complete(i)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),h},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),q(r),h}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var o=n.arg;q(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,r){return this.delegate={iterator:P(e),resultName:t,nextLoc:r},"next"===this.method&&(this.arg=void 0),h}},e}function b(e,t,r,n,o,a,i){try{var c=e[a](i),s=c.value}catch(e){return void r(e)}c.done?t(s):Promise.resolve(s).then(n,o)}function w(e){return function(){var t=this,r=arguments;return new Promise((function(n,o){var a=e.apply(t,r);function i(e){b(a,n,o,i,c,"next",e)}function c(e){b(a,n,o,i,c,"throw",e)}i(void 0)}))}}function x(){var e=this,t=this.boards,r=!1;return t.forEach((function(t,n){"ALL"===t.shipsSunk()&&(r=e.players[1-n])})),r}e.r(t),e.d(t,{populate:()=>l});var L,k,E=function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"player",n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"player",o=[],i=0;i<2;i++)o[i]=a();var c=[e,n],s=[];function l(){return u.apply(this,arguments)}function u(){return u=w(g().mark((function e(){var t,r,n,o,a,i,c,l,u;return g().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:u=function(){return u=w(g().mark((function e(){var t,r,n,o,i,c,s,u,h,f,p=arguments;return g().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return f=function(){return new Promise((function(e){setTimeout((function(){e(l(t,r,n,++o,i=1-i))}),t)}))},h=function(e,t){return new Promise((function(r){var n=document.querySelector("#commit"),o=e.players[t];n.addEventListener("click",(function a(){if(n.removeEventListener("click",a),function(e,t){return e>=0&&e<10&&t>=0&&t<10||(console.log("out of range"),!1)}(o.selected.x,o.selected.y)){e.boards[1-t].receiveAttack(o.selected.x,o.selected.y)?r({x:o.selected.x,y:o.selected.y}):(console.log("Invalid Placement"),r(!1))}else r(!1)}))}))},t=p.length>0&&void 0!==p[0]?p[0]:0,r=p.length>1?p[1]:void 0,n=p.length>2&&void 0!==p[2]&&p[2],o=p.length>3&&void 0!==p[3]?p[3]:0,i=p.length>4&&void 0!==p[4]?p[4]:0,console.log(t),d(r),e.next=11,v(r);case 11:if(console.log("player turn: "+(i+1)),"ai"!==r.players[i].type){e.next=16;break}r.players[i].attackRandom(r.boards[1-i]),e.next=26;break;case 16:if("player"!==r.players[i].type){e.next=26;break}r.findWhoseTurn(r).show="myShips",d(r),c=!1;case 20:if(c){e.next=26;break}return e.next=23,h(r,i);case 23:c=e.sent,e.next=20;break;case 26:if(d(r),n=r.testWinner(),a(r),!n){e.next=32;break}return s=new Promise((function(e){e({winner:n,turns:o})})),e.abrupt("return",s);case 32:return e.next=34,f();case 34:return u=e.sent,e.abrupt("return",u);case 36:case"end":return e.stop()}}),e)}))),u.apply(this,arguments)},l=function(){return u.apply(this,arguments)},c=function(){return(c=w(g().mark((function e(t,r){var n;return g().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l(r,t);case 2:n=e.sent,console.log(n.winner.name+" has won in "+n.turns+" turns!");case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)},i=function(e,t){return c.apply(this,arguments)},a=function(e){e.players.forEach((function(e){e.isTurn?e.isTurn=!1:e.isTurn=!0}))},o=function(e){function t(t){var r=t.srcElement.id,n=h(e);switch(r){case"myShips":n.show="myShips";break;case"targeting":n.show="targeting"}d(e),"placement"===e.phase&&y(e)}function r(t){var r=t.srcElement.id,n=h(e);if("ai"!==n.type){if(!n)throw new Error("Game not started");switch(r){case"up":n.selected=o(n.selected,0,-1);break;case"down":n.selected=o(n.selected,0,1);break;case"left":n.selected=o(n.selected,-1,0);break;case"right":n.selected=o(n.selected,1,0)}d(e),"placement"===e.phase&&y(e)}function o(e,t,r){return e.x=e.x+t,e.y=e.y+r,e.x>9&&(e.x=9),e.x<0&&(e.x=0),e.y>9&&(e.y=9),e.y<0&&(e.y=0),e}}document.querySelectorAll(".displayButton").forEach((function(e){e.addEventListener("click",t)})),document.querySelectorAll(".arrow").forEach((function(e){e.addEventListener("click",r)}))},n=function(){return n=w(g().mark((function e(t,r,n){var o,a,i,c;return g().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:c=function(e,r,o){return new Promise((function(a){var i=document.querySelector("#commit");i.addEventListener("click",s);var c=document.querySelector("#rotate");function s(){i.removeEventListener("click",s),i.removeEventListener("click",s);var c=e.placeShip(t.players[n].selected.x,t.players[n].selected.y,e.shipsList[r].length,o,e.shipsList[r].name);a(c)}c.addEventListener("click",(function e(){i.removeEventListener("click",s),c.removeEventListener("click",e),o="horizontal"===o?"vertical":"horizontal",a(o)}))}))},o=0;case 2:if(!(o<r.shipsList.length)){e.next=20;break}(a=t.players[n]).placing.ship=r.shipsList[o],a.placing.orientation="horizontal",y(t),i="invalid";case 8:if("valid"==i){e.next=17;break}return e.next=11,c(r,o,a.placing.orientation);case 11:"horizontal"!==(i=e.sent)&&"vertical"!==i||(a.placing.orientation=i),d(t),y(t),e.next=8;break;case 17:o++,e.next=2;break;case 20:return e.abrupt("return",new Promise((function(e){e()})));case 21:case"end":return e.stop()}}),e)}))),n.apply(this,arguments)},r=function(e,t,r){return n.apply(this,arguments)},this.players[0].isTurn=!0,o(this),this.players.forEach((function(e,t){e.name=e.name+" #"+(t+1)})),console.log("Placement Phase"),t=0;case 13:if(!(t<this.boards.length)){e.next=27;break}if(d(this),"ai"!==this.players[t].type){e.next=19;break}this.Ai.populate(this.boards[t]),e.next=23;break;case 19:if("player"!==this.players[t].type){e.next=23;break}return e.next=22,r(this,this.boards[t],t);case 22:s[t].show="myShips";case 23:a(this);case 24:t++,e.next=13;break;case 27:d(this),console.log("Game Phase"),this.phase="game",i(this,0);case 32:case"end":return e.stop()}}),e,this)}))),u.apply(this,arguments)}function h(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this,t=!1;return e.players.forEach((function(e){e.isTurn&&(t=e)})),t}function f(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this,t=!1;return e.players.forEach((function(r,n){r.isTurn&&(t=e.players[1-n])})),t}return c.forEach((function(e,t){var n=r(e);n.board=o[t],s.push(n)})),{players:s,boards:o,Ai:t,testWinner:x,mainLoop:l,phase:"placement",findWhoseTurn:h,findWhoseNextTurn:f}}("player","ai");L=document.querySelectorAll(".board"),k=["A","B","C","D","E","F","G","H","I","J"],L.forEach((function(e){!function(e){var t=document.createElement("div");t.classList.add("empty"),t.classList.add("gridSquare"),t.style.backgroundColor="black",t.style.gridArea="0/0/1/1",e.appendChild(t)}(e),function(e){for(var t=0;t<10;t++){var r=document.createElement("div");r.innerText=k[t],r.classList.add("letter"),r.classList.add("gridSquare"),r.style.gridArea="0/"+t+"/1/"+(t+1),e.appendChild(r)}}(e),function(e){for(var t=0;t<10;t++){var r=document.createElement("div");r.innerText=t+1,r.classList.add("number"),r.classList.add("gridSquare"),r.style.gridColumn="0 / 1",r.style.gridRow=t+2+"/"+(t+3),e.appendChild(r)}}(e),function(e){for(var t=0;t<10;t++)for(var r=0;r<10;r++){var n=document.createElement("div");n.className="gridSquare gameSquare",n.meta={x:r,y:t},n.style.gridColumn=n.meta.x+2+" / "+(n.meta.x+3),n.style.gridRow=n.meta.y+2+" / "+(n.meta.y+3),e.appendChild(n)}}(e)})),E.mainLoop()})();
//# sourceMappingURL=battleship.bundle-cbcbea4b19c61c41dbef.js.map