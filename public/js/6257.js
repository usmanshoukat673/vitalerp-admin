"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6257],{76257:(e,t,r)=>{r.r(t),r.d(t,{default:()=>d});var n=r(96540),a=r(67438),i=r(84719),o=r(33551),l=r(94335),c=r(81429),u=r(22492);function s(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,a,i,o,l=[],c=!0,u=!1;try{if(i=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;c=!1}else for(;!(c=(n=i.call(r)).done)&&(l.push(n.value),l.length!==t);c=!0);}catch(e){u=!0,a=e}finally{try{if(!c&&null!=r.return&&(o=r.return(),Object(o)!==o))return}finally{if(u)throw a}}return l}}(e,t)||function(e,t){if(e){if("string"==typeof e)return p(e,t);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?p(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}const d=function(e){var t=e.history,r=e.match,p=s((0,n.useState)(""),2),d=p[0],f=p[1],m=s((0,n.useState)(!1),2),g=m[0],h=m[1],x=s((0,n.useState)([]),2),y=x[0],b=x[1];(0,n.useEffect)((function(){var e=r.params.email;f(e)}),[r]);return n.createElement(n.Fragment,null,n.createElement(u.A,{signup:!0}),n.createElement(i.A,{sx:{display:"flex",marginTop:"30px"}},n.createElement(i.A,{sx:{flex:"0.5",marginRight:"50px",marginTop:"50px",fontSize:"19px"}}),n.createElement(i.A,{sx:{flex:"0.5",padding:"20px",borderRadius:"6px",mt:"50px"},className:"_auth__right"},n.createElement(o.A,{variant:"h4"},"Language needed."),n.createElement(o.A,{sx:{marginBottom:"50px"}},"lorep ipsump Lorem ipsum dolor sit amet consectetur adipisicing elit"),n.createElement(a.A,{type:"button",size:"large",onClick:function(){t.push("/create-account/".concat(d))},sx:{paddingRight:"40px",paddingLeft:"40px"},loading:g,loadingIndicator:"Processing...",variant:"contained"},"Do it yourself"),n.createElement(a.A,{onClick:function(e){e.preventDefault(),b([]),h(!0),l.A.post("/api/auth/onboarding/get-build-id",{email:d}).then((function(e){t.push("/verify-company/".concat(e.data))})).catch((function(e){h(!1),500===e.response.status&&(b([]),c.hm.error("Server Error, Please contact customer support.","Error")),422===e.response.status&&b(y.concat(e.response.data.errors))}))},type:"button",size:"large",sx:{paddingRight:"40px",paddingLeft:"40px",marginInlineStart:"20px"},loading:g,loadingIndicator:"Processing...",variant:"contained"},"Use AI Builder"))))}}}]);