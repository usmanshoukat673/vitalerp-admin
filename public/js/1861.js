"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[1861],{29306:(e,r,t)=>{t.d(r,{A:()=>w});var n=t(98587),o=t(58168),a=t(96540),i=t(54533),u=t(64111),c=t(28466),l=t(11848),s=t(3541),d=t(68851),m=t(96852),f=t(33551),p=t(86269),y=t(86481),b=t(771);const v={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},A=({theme:e,ownerState:r})=>{const t=(e=>v[e]||e)(r.color),n=(0,y.Yn)(e,`palette.${t}`,!1)||r.color,o=(0,y.Yn)(e,`palette.${t}Channel`);return"vars"in e&&o?`rgba(${o} / 0.4)`:(0,b.X4)(n,.4)};var h=t(74848);const _=["className","color","component","onBlur","onFocus","TypographyClasses","underline","variant","sx"],g=(0,l.Ay)(f.A,{name:"MuiLink",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:t}=e;return[r.root,r[`underline${(0,c.A)(t.underline)}`],"button"===t.component&&r.button]}})((({theme:e,ownerState:r})=>(0,o.A)({},"none"===r.underline&&{textDecoration:"none"},"hover"===r.underline&&{textDecoration:"none","&:hover":{textDecoration:"underline"}},"always"===r.underline&&(0,o.A)({textDecoration:"underline"},"inherit"!==r.color&&{textDecorationColor:A({theme:e,ownerState:r})},{"&:hover":{textDecorationColor:"inherit"}}),"button"===r.component&&{position:"relative",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none","&::-moz-focus-inner":{borderStyle:"none"},[`&.${p.A.focusVisible}`]:{outline:"auto"}}))),w=a.forwardRef((function(e,r){const t=(0,s.A)({props:e,name:"MuiLink"}),{className:l,color:f="primary",component:y="a",onBlur:b,onFocus:A,TypographyClasses:w,underline:S="always",variant:x="inherit",sx:k}=t,O=(0,n.A)(t,_),{isFocusVisibleRef:E,onBlur:j,onFocus:C,ref:P}=(0,d.A)(),[D,N]=a.useState(!1),F=(0,m.A)(r,P),V=(0,o.A)({},t,{color:f,component:y,focusVisible:D,underline:S,variant:x}),L=(e=>{const{classes:r,component:t,focusVisible:n,underline:o}=e,a={root:["root",`underline${(0,c.A)(o)}`,"button"===t&&"button",n&&"focusVisible"]};return(0,u.A)(a,p.t,r)})(V);return(0,h.jsx)(g,(0,o.A)({color:f,className:(0,i.A)(L.root,l),classes:w,component:y,onBlur:e=>{j(e),!1===E.current&&N(!1),b&&b(e)},onFocus:e=>{C(e),!0===E.current&&N(!0),A&&A(e)},ref:F,ownerState:V,variant:x,sx:[...Object.keys(v).includes(f)?[]:[{color:f}],...Array.isArray(k)?k:[k]]},O))}))},86269:(e,r,t)=>{t.d(r,{A:()=>i,t:()=>a});var n=t(27553),o=t(17245);function a(e){return(0,o.Ay)("MuiLink",e)}const i=(0,n.A)("MuiLink",["root","underlineNone","underlineHover","underlineAlways","button","focusVisible"])},41861:(e,r,t)=>{t.r(r),t.d(r,{default:()=>x});var n=t(96540),o=t(8321),a=t(84719),i=t(45359),u=t(1043),c=t(49874),l=t(17681),s=t(46510),d=t(51629),m=t(75659),f=t(11512),p=t(82241),y=t(33113),b=t(29306);function v(e){return v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},v(e)}function A(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function h(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?A(Object(t),!0).forEach((function(r){g(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):A(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function g(e,r,t){return(r=function(e){var r=function(e,r){if("object"!=v(e)||!e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var n=t.call(e,r||"default");if("object"!=v(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(e)}(e,"string");return"symbol"==v(r)?r:r+""}(r))in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function w(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,r){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var n,o,a,i,u=[],c=!0,l=!1;try{if(a=(t=t.call(e)).next,0===r){if(Object(t)!==t)return;c=!1}else for(;!(c=(n=a.call(t)).done)&&(u.push(n.value),u.length!==r);c=!0);}catch(e){l=!0,o=e}finally{try{if(!c&&null!=t.return&&(i=t.return(),Object(i)!==i))return}finally{if(l)throw o}}return u}}(e,r)||function(e,r){if(e){if("string"==typeof e)return S(e,r);var t={}.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?S(e,r):void 0}}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function S(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=Array(r);t<r;t++)n[t]=e[t];return n}const x=function(e){var r=e.question_id,t=(0,o.wA)(),v=w((0,n.useState)(!1),2),A=v[0],g=v[1],S=w((0,n.useState)([]),2),x=S[0],k=S[1],O=w((0,n.useState)(!1),2),E=O[0],j=O[1],C=w((0,n.useState)(""),2),P=C[0],D=C[1],N=(0,o.d4)((function(e){return{record_details:e.lanscape.record_details,record:e.lanscape.record,users:e.orgs.company_users}})),F=N.record_details,V=N.record,L=N.users,$=function(){setTimeout((function(){t((0,m.LI)({open:!1}))}),50)};return n.createElement(a.A,{sx:{display:"flex",flexWrap:"wrap"}},n.createElement("div",{className:"create_record_input_group"},!E&&n.createElement(i.A,{fullWidth:!0,sx:{m:1}},n.createElement("label",{htmlFor:"add_user_name"},"Select User:"),n.createElement(s.A,{id:"user",size:"small",multiple:!0,value:x,onChange:function(e){return k(e.target.value)},input:n.createElement(c.A,{label:"User"}),renderValue:function(e){return e.map((function(e){var r=L.find((function(r){return r.user_id===e}));return"".concat(r.user.first_name," ").concat(r.user.last_name)})).join(", ")}},_.map(L,(function(e){return!function(e,r,t,n){var o=e.find((function(e){return e[r]===t?e:void 0}));return null!=o&&o.question_id==n}(F.users,"user_id",e.user_id,r)&&n.createElement(l.A,{key:"user_".concat(e.user_id),value:e.user_id},n.createElement(y.A,{checked:x.indexOf(e.user_id)>-1}),n.createElement(p.A,{primary:"".concat(e.user.first_name," ").concat(e.user.last_name)}))}))),_.size(x)>0?n.createElement("p",{style:{color:"#ccc"}},"Click here to add new User"):n.createElement(b.A,{className:"chand",underline:"none",onClick:function(){return j(!0)}},"Click here to add new User")),E&&n.createElement(i.A,{fullWidth:!0,sx:{m:1}},n.createElement("label",{htmlFor:"add_user_name"},"User First & Last Name:"),n.createElement(u.A,{id:"",size:"small",label:"Add New",name:"add_user_name",value:P,onChange:function(e){return D(e.target.value)}}),n.createElement(b.A,{className:"chand",underline:"none",onClick:function(){return j(!1)}},"Click here to select existing user"))),n.createElement(a.A,{sx:{display:"flex",flexWrap:"wrap",m:1}},n.createElement(d.A,{disabled:A,onClick:function(){g(!0),f.A.post("/api/user/records/users/add",{selected_users:x,add_user:E,add_user_name:P,module_id:V.module_id,parent:V.id,question_id:r}).then((function(e){t((0,m.DV)(h(h({},F),{},{users:e.data.record_users}))),t((0,m.sk)(e.data.users)),k([]),$()})).catch((function(e){})).finally((function(){return g(!1)}))},variant:"contained"},"Submit"),n.createElement(d.A,{sx:{marginLeft:"10px"},variant:"outlined",onClick:$},"Cancel")))}}}]);