"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[3303],{13303:(e,t,r)=>{r.r(t),r.d(t,{default:()=>d});var n=r(67294),a=r(16550),o=r(14416),l=r(94379),u=r(99245),i=r.n(u),c=r(97439),f=["component","path","user","users","token","company","leftnav"];function s(){return s=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},s.apply(this,arguments)}function y(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,a,o,l,u=[],i=!0,c=!1;try{if(o=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;i=!1}else for(;!(i=(n=o.call(r)).done)&&(u.push(n.value),u.length!==t);i=!0);}catch(e){c=!0,a=e}finally{try{if(!i&&null!=r.return&&(l=r.return(),Object(l)!==l))return}finally{if(c)throw a}}return u}}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return m(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return m(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function p(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}const d=(0,a.withRouter)((0,o.$j)((function(e){return{user:e.user.activeUser,token:e.token.activeToken,company:e.orgs.company,leftnav:e.leftnav,users:e.orgs.company_users}}))((function(e,t){var r=e.component,u=e.path,m=e.user,d=e.users,h=e.token,v=e.company,b=e.leftnav,g=p(e,f),O=(0,o.v9)((function(e){return{layoutColor:e.leftnav.layoutColor,layoutWidth:e.leftnav.layoutWidth,leftSideBarTheme:e.leftnav.leftSideBarTheme,leftSideBarType:e.leftnav.leftSideBarType}})),E=O.layoutColor,S=O.leftSideBarTheme,j=O.leftSideBarType,k=O.layoutWidth,w=y((0,n.useState)(!1),2);w[0],w[1];return(0,n.useEffect)((function(){(0,c.i)("data-layout","vertical")}),[]),(0,n.useEffect)((function(){(0,c.i)("data-layout-color",E)}),[E]),(0,n.useEffect)((function(){(0,c.i)("data-layout-mode",k)}),[k]),(0,n.useEffect)((function(){(0,c.i)("data-leftbar-theme",S)}),[S]),(0,n.useEffect)((function(){(0,c.i)("data-leftbar-compact-mode",j)}),[j]),n.createElement(a.Route,s({path:u},g,{render:function(e){return i()(m)||i()(v)?n.createElement(a.Redirect,{to:{pathname:"/login",state:{prevLocation:u,error:"You need to login first!"}}}):v.company.required_mfa&&!m.mfa_enabled?n.createElement(a.Redirect,{to:{pathname:"/select-organization",state:{prevLocation:u,error:"You need to enable mfa!"}}}):n.createElement(n.Fragment,null,n.createElement("div",null,n.createElement(r,s({},e,{user:m,token:h,leftnav:b,company:v,users:d}))),n.createElement(l.mh,null))}}))})))}}]);