"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[587],{6e3:(e,t,n)=>{n.d(t,{Z:()=>d});var r=n(67294),a=n(73727),l=n(25412),o=n(28837),c=n(40077),i=n(93967),s=n.n(i);function m(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,l,o,c=[],i=!0,s=!1;try{if(l=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=l.call(n)).done)&&(c.push(r.value),c.length!==t);i=!0);}catch(e){s=!0,a=e}finally{try{if(!i&&null!=n.return&&(o=n.return(),Object(o)!==o))return}finally{if(s)throw a}}return c}}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return u(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return u(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var f={maxHeight:"300px",display:"none"},p={maxHeight:"300px"};const d=function(e,t){var n=m((0,r.useState)(!1),2),i=n[0],u=n[1],d=m((0,r.useState)(f),2),y=d[0],h=d[1],g=function(){u(!i),h(y===f?p:f)};return r.createElement(l.Z,{show:i,onToggle:g},r.createElement(l.Z.Toggle,{variant:"link",id:"dropdown-notification",as:a.rU,to:"#",onClick:g,className:"nav-link dropdown-toggle arrow-none"},r.createElement("i",{className:"dripicons-bell noti-icon"}),r.createElement("span",{className:"noti-icon-badge"})),r.createElement(l.Z.Menu,{align:"end",className:"dropdown-menu-animated dropdown-lg"},r.createElement("div",{onClick:g},r.createElement("div",{className:"dropdown-item noti-title px-3"},r.createElement("h5",{className:"m-0"},r.createElement("span",{className:"float-end"},r.createElement(a.rU,{to:"/notifications",className:"text-dark"},r.createElement("small",null,"Clear All"))),"Notification")),r.createElement(c.Z,{className:"px-3",style:y},e.notifications.map((function(e,t){return r.createElement(r.Fragment,{key:t.toString()},r.createElement("h5",{className:"text-muted font-13 fw-normal mt-0"},e.day),(e.messages||[]).map((function(e,t){return r.createElement(l.Z.Item,{key:t+"-noti",className:s()("p-0 notify-item card shadow-none mb-2",e.isRead?"read-noti":"unread-noti")},r.createElement(o.Z.Body,null,r.createElement("span",{className:"float-end noti-close-btn text-muted"},r.createElement("i",{className:"mdi mdi-close"})),r.createElement("div",{className:"d-flex align-items-center"},r.createElement("div",{className:"flex-shrink-0"},r.createElement("div",{className:s()("notify-icon",e.variant&&"bg-"+e.variant)},e.avatar?r.createElement("img",{src:e.avatar,className:"img-fluid rounded-circle",alt:""}):r.createElement("i",{className:e.icon}))),r.createElement("div",{className:"flex-grow-1 text-truncate ms-2"},r.createElement("h5",{className:"noti-item-title fw-semibold font-14"},e.title," ",e.time&&r.createElement("small",{className:"fw-normal text-muted ms-1"},e.time)),r.createElement("small",{className:"noti-item-subtitle text-muted"},e.subText)))))})))})),r.createElement("div",{className:"text-center"},r.createElement("i",{className:"mdi mdi-dots-circle mdi-spin text-muted h3 mt-0"}))),r.createElement(l.Z.Item,{className:"text-center text-primary notify-item border-top border-light py-2"},"View All"))))}},76587:(e,t,n)=>{n.r(t),n.d(t,{default:()=>W});var r=n(67294),a=n(73727),l=n(14416),o=n(93967),c=n.n(o),i=n(6e3),s=n(25412),m=n(48408);n(51493);function u(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,l,o,c=[],i=!0,s=!1;try{if(l=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=l.call(n)).done)&&(c.push(r.value),c.length!==t);i=!0);}catch(e){s=!0,a=e}finally{try{if(!i&&null!=n.return&&(o=n.return(),Object(o)!==o))return}finally{if(s)throw a}}return c}}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return f(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return f(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}const p=function(e){e.profilePic,e.menuItems;var t,n=e.username,o=e.userTitle,i=(0,l.I0)(),f=u((0,r.useState)(!1),2),p=f[0],d=f[1],y=function(){d(!p)};return r.createElement(s.Z,{show:p,onToggle:y},r.createElement(s.Z.Toggle,{variant:"link",id:"dropdown-profile",as:a.rU,to:"#",onClick:y,className:"nav-link dropdown-toggle nav-user arrow-none me-0 topbar_user_menu"},r.createElement("span",{className:"account-user-avatar __the_initials"},(((t="".concat(n).match(/\b\w/g)||[]).shift()||"")+(t.pop()||"")).toUpperCase()),r.createElement("span",null,r.createElement("span",{className:"account-user-name"},n),r.createElement("span",{className:"account-position"},o))),r.createElement(s.Z.Menu,{align:"end",className:"dropdown-menu-animated topbar-dropdown-menu profile-dropdown"},r.createElement("div",{onClick:y},r.createElement("div",{className:"dropdown-header noti-title"},r.createElement("h6",{className:"text-overflow m-0"},"Welcome !")),r.createElement("a",{onClick:function(){i((0,m.ED)()),i((0,m.qX)()),i((0,m.Nx)()),i((0,m.WO)()),i((0,m.rC)())},className:"dropdown-item notify-item chand"},r.createElement("i",{className:c()("mdi mdi-logout","me-1")}),r.createElement("span",null,"Logout")))))};var d=n(3753),y=n(61931),h=n(73328),g=["children"];function b(){return b=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},b.apply(this,arguments)}function E(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var v=function(e){for(var t=(0,h.yV)(e,(function(e){return[e.type]})),n=[],r=0,a=0;a<t.length;a++)for(var l=0;l<t[a].length;l++)"users"===t[a][l].type&&0===r&&(t[a].splice(l,0,{label:"Users",value:"title",type:"title"}),r=1),n.push(t[a][l]);return n},N=function(e){var t=e.children,n=E(e,g),a=n.selectProps.handleClick;return r.createElement(d.c.Control,n,r.createElement("span",{onMouseDown:a,className:"mdi mdi-magnify search-icon"}),t)},w=function(e){var t=e.selectProps.handleClick;return r.createElement("div",{style:{}},r.createElement(d.c.IndicatorsContainer,b({},e,{className:"input-group"}),r.createElement("button",{className:"btn btn-primary input-group-text",onMouseDown:t},"Search")))},x=function(e){var t=e.selectProps.options;return r.createElement(d.c.MenuList,e,r.createElement("div",{className:"dropdown-header noti-title"},r.createElement("h5",{className:"text-overflow mb-2"},"Found ",r.createElement("span",{className:"text-danger"},t.length)," results")),e.children)},k=function(e){var t=function(e){switch(e.type){case"report":case"help":case"settings":return r.createElement(a.rU,{to:"#",className:c()("dropdown-item","notify-item","p-0")},r.createElement("i",{className:c()(e.icon,"font-16","me-1")}),r.createElement("span",null,e.label));case"title":return r.createElement("div",{className:"noti-title"},r.createElement("h6",{className:"text-overflow mb-2 text-uppercase"},"Users"));case"users":return r.createElement(r.Fragment,null,r.createElement(a.rU,{to:"#",className:"dropdown-item notify-item p-0"},r.createElement("div",{className:"d-flex"},r.createElement("img",{src:e.userDetails.avatar,alt:"",className:"d-flex me-2 rounded-circle",height:"32"}),r.createElement("div",{className:"w-100"},r.createElement("h5",{className:"drop-username m-0 font-14"},e.userDetails.firstname," ",e.userDetails.lastname),r.createElement("span",{className:"user-subinfo font-12 mb-0"},e.userDetails.position)))));default:return}}(e);return r.createElement("div",null,t)};const S=function(e){return r.createElement("div",{className:"__TopbarSearch"},!_.isEmpty(e.shared_company.logo)&&r.createElement("img",{src:e.shared_company.logo,alt:e.shared_company.name,height:"30"}),r.createElement(y.ZP,b({},e,{components:{Control:N,IndicatorsContainer:w,MenuList:x},placeholder:"Search...",options:v([]),formatOptionLabel:k,isOptionDisabled:function(e){return"title"===e.type},maxMenuHeight:"350px",handleClick:function(e){e.preventDefault(),e.stopPropagation()},isSearchable:!0,isClearable:!0,name:"search-app",className:"app-search dropdown",classNamePrefix:"react-select"})))};var O=n(54713),j=n(14666),A=n(31040),C=n(5598),Z=n(93379),T=n.n(Z),I=n(96691),U={insert:"head",singleton:!1};T()(I.Z,U);I.Z.locals;var P=n(16550),M=n(69397),D=n(73981);function F(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,l,o,c=[],i=!0,s=!1;try{if(l=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=l.call(n)).done)&&(c.push(r.value),c.length!==t);i=!0);}catch(e){s=!0,a=e}finally{try{if(!i&&null!=n.return&&(o=n.return(),Object(o)!==o))return}finally{if(s)throw a}}return c}}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return L(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return L(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function L(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}const $=(0,P.withRouter)((function(e){var t=e.history,n=(0,l.I0)(),a=F((0,r.useState)(!1),2),o=a[0],c=a[1],i=F((0,r.useState)(!1),2),s=i[0],u=i[1],f=(0,l.v9)((function(e){return{user:e.user.activeUser,token:e.token.activeToken,company:e.orgs.company,portalToken:e.token.portalToken}})),p=f.user,d=f.token,y=f.company,h=f.portalToken;(0,r.useEffect)((function(){D.Z.get("/has-account").then((function(e){u(e.data.flag)}))}),[]);return r.createElement(r.Fragment,null,s?r.createElement("li",{className:"notification-list"},r.createElement(M.Z,{disabled:o,onClick:function(){c(!0),_.isEmpty(p)&&_.isEmpty(d)&&_.isEmpty(y)?t.push("/login"):(n((0,m.o4)(h)),t.push("/".concat(y.company.slug,"/compliance-stack"))),c(!1)},className:"mui-button",variant:"outlined"},"Console")):r.createElement("span",null))}));function H(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,l,o,c=[],i=!0,s=!1;try{if(l=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=l.call(n)).done)&&(c.push(r.value),c.length!==t);i=!0);}catch(e){s=!0,a=e}finally{try{if(!i&&null!=n.return&&(o=n.return(),Object(o)!==o))return}finally{if(s)throw a}}return c}}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return R(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return R(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function R(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var V=[];const W=(0,P.withRouter)((function(e){var t=e.hideLogo,n=e.navCssClasses,o=e.topbarDark,s=(e.history,H((0,r.useState)(!1),2)),m=(s[0],s[1],n||""),u=t?"":"container-fluid",f=(0,l.v9)((function(e){return{portal_user:e.user.portalUser,shared_company:e.policyportal.shared_company,portalToken:e.token.portalToken}})),d=f.portal_user,y=f.shared_company,h=f.portalToken;return r.createElement(r.Fragment,null,r.createElement("div",{className:c()("navbar-custom",m)},r.createElement("div",{className:u},!t&&r.createElement(a.rU,{to:"/",className:"topnav-logo"},r.createElement("span",{className:"topnav-logo-lg"},r.createElement("img",{src:C.Z,alt:"logo",height:"30"})),r.createElement("span",{className:"topnav-logo-sm"},r.createElement("img",{src:o?A.Z:j.Z,alt:"logo",height:"30"}))),r.createElement("ul",{className:"list-unstyled topbar-menu float-end mb-0"},r.createElement("li",{className:"dropdown notification-list"},r.createElement(i.Z,{notifications:V})),r.createElement($,null),r.createElement("li",{className:"dropdown notification-list"},r.createElement(p,{profilePic:O.Z,menuItems:[],username:"[Not Set]"===d.first_name?"".concat(d.email):"".concat(d.first_name," ").concat(d.last_name),userTitle:y.name,portalToken:h}))),r.createElement(S,{shared_company:y}))))}))},96691:(e,t,n)=>{n.d(t,{Z:()=>l});var r=n(23645),a=n.n(r)()((function(e){return e[1]}));a.push([e.id,".__TopbarSearchPublic{align-items:center;display:flex;justify-content:flex-start}.__TopbarSearchPublic img{margin-right:20px;margin-top:8px}",""]);const l=a},5598:(e,t,n)=>{n.d(t,{Z:()=>r});const r="/images/logo-light.png?3b724a41c26b1913211a33b811a5cce4"},31040:(e,t,n)=>{n.d(t,{Z:()=>r});const r="/images/logo_sm.png?e4ac7f99565bca506f3e86364f5ef2b1"},14666:(e,t,n)=>{n.d(t,{Z:()=>r});const r="/images/logo_sm_dark.png?3e50617ba85fb82dd3d43ba581919bcc"}}]);