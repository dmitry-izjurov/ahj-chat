!function(e){var t={};function n(s){if(t[s])return t[s].exports;var r=t[s]={i:s,l:!1,exports:{}};return e[s].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,s){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(s,r,function(t){return e[t]}.bind(null,r));return s},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){},function(e,t,n){"use strict";n.r(t);n(0);const s=document.querySelector("body"),r=document.querySelector(".wrapper"),o=document.querySelector(".form"),a=function(e,t,n,s){return`\n      <div class="wrapper-message" data-id="${e}" data-type="${t}">\n        <div class="box-message">\n          <span class="nick-time">${t}, ${n}</span>\n          <p class="message__text">${s}</p>\n        </div>\n      </div>\n    `},c=function(e,t){return`\n      <div class="box-user" data-id="${e}" data-type="${t}">\n        <div class="box-user__foto"></div>\n        <span class="user-name">${e}</span>\n      </div>\n    `};function d(){return""+(new Date).toLocaleString()}const i=new class{constructor(){this.data=void 0,this.logoutUser=void 0}getChat(){s.insertAdjacentHTML("afterbegin",'\n<div class="wrapper-chat">\n  <main class="chat">\n    <div class="box-chat"></div>\n    <form class="form_chat">\n      <input type="text" class="field_chat" placeholder="Type you message here">\n    </form>\n  </main>\n  <aside class="names-users"></aside>\n  <button class="button_logout">Выйти</button>\n</div>\n');const e=document.querySelector(".names-users");e.insertAdjacentHTML("afterbegin",c(this.data.name,"You"));document.querySelector('.box-user[data-type="You"]').querySelector(".user-name").textContent="You";for(let t=0;t<this.data.response.length-1;t+=1)e.insertAdjacentHTML("beforeend",c(this.data.response[t],"user"));const t=new WebSocket("ws://localhost:7070/ws");t.user=this.data.name,t.binaryType="blob",t.addEventListener("open",()=>{t.readyState===WebSocket.OPEN&&t.send(JSON.stringify({newUser:this.data.name}))});const n=document.querySelector(".form_chat"),o=document.querySelector(".field_chat");n.addEventListener("submit",e=>{e.preventDefault(),t.send(JSON.stringify({newMessage:o.value,sender:this.data.name})),n.reset()}),t.addEventListener("message",n=>{if(t.readyState===WebSocket.OPEN){const t=n.data;try{const n=JSON.parse(t),s=document.querySelector(".box-chat"),{sender:r}=n;if(n.hasOwnProperty("newUser")&&n.newUser!==this.data.name)e.insertAdjacentHTML("beforeend",c(n.newUser,"User"));else if(n.hasOwnProperty("newMessage"))s.insertAdjacentHTML("beforeend",a(this.data.name,this.data.name===r?"You":r,d(),n.newMessage));else if(n.hasOwnProperty("logoutUser")){const{logoutUser:e}=n;this.logoutUser=e,document.querySelector(`[data-id=${e}]`).remove(),s.insertAdjacentHTML("beforeend",a(this.logoutUser,this.logoutUser,d(),"Всем пока!"))}}catch(e){console.log(e)}}});document.querySelector(".button_logout").addEventListener("click",()=>{t.send(JSON.stringify({logoutUser:this.data.name}));const e=new FormData;e.append("key",""+this.data.name);const n=new XMLHttpRequest;n.open("POST","http://localhost:7070/?method=removeUser"),n.send(e),t.close(),document.querySelector(".wrapper-chat").remove(),r.classList.remove("hidden")}),t.addEventListener("close",e=>{console.log("connection closed",e)}),t.addEventListener("error",()=>{console.log("error")})}getName(){const e=new FormData(o),t=new XMLHttpRequest;t.open("POST","http://localhost:7070/?method=getName"),t.send(e),t.addEventListener("load",()=>{if(t.status>=200&&t.status<300)try{this.data=JSON.parse(t.responseText),"object"==typeof this.data.response?(r.classList.add("hidden"),o.reset(),this.getChat()):"string"==typeof this.data.response&&alert(this.data.response)}catch(e){console.error(e)}})}};o.addEventListener("submit",e=>{e.preventDefault(),i.getName()})}]);