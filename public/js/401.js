"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[401],{6e3:(e,t,n)=>{n.d(t,{Z:()=>d});var a=n(67294),r=n(73727),l=n(88291),o=n(67525),c=n(40077),i=n(94184),s=n.n(i);function m(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var a,r,l,o,c=[],i=!0,s=!1;try{if(l=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(a=l.call(n)).done)&&(c.push(a.value),c.length!==t);i=!0);}catch(e){s=!0,r=e}finally{try{if(!i&&null!=n.return&&(o=n.return(),Object(o)!==o))return}finally{if(s)throw r}}return c}}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return u(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return u(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}var p={maxHeight:"300px",display:"none"},f={maxHeight:"300px"};const d=function(e,t){var n=m((0,a.useState)(!1),2),i=n[0],u=n[1],d=m((0,a.useState)(p),2),y=d[0],h=d[1],g=function(){u(!i),h(y===p?f:p)};return a.createElement(l.Z,{show:i,onToggle:g},a.createElement(l.Z.Toggle,{variant:"link",id:"dropdown-notification",as:r.rU,to:"#",onClick:g,className:"nav-link dropdown-toggle arrow-none"},a.createElement("i",{className:"dripicons-bell noti-icon"}),a.createElement("span",{className:"noti-icon-badge"})),a.createElement(l.Z.Menu,{align:"end",className:"dropdown-menu-animated dropdown-lg"},a.createElement("div",{onClick:g},a.createElement("div",{className:"dropdown-item noti-title px-3"},a.createElement("h5",{className:"m-0"},a.createElement("span",{className:"float-end"},a.createElement(r.rU,{to:"/notifications",className:"text-dark"},a.createElement("small",null,"Clear All"))),"Notification")),a.createElement(c.Z,{className:"px-3",style:y},e.notifications.map((function(e,t){return a.createElement(a.Fragment,{key:t.toString()},a.createElement("h5",{className:"text-muted font-13 fw-normal mt-0"},e.day),(e.messages||[]).map((function(e,t){return a.createElement(l.Z.Item,{key:t+"-noti",className:s()("p-0 notify-item card shadow-none mb-2",e.isRead?"read-noti":"unread-noti")},a.createElement(o.Z.Body,null,a.createElement("span",{className:"float-end noti-close-btn text-muted"},a.createElement("i",{className:"mdi mdi-close"})),a.createElement("div",{className:"d-flex align-items-center"},a.createElement("div",{className:"flex-shrink-0"},a.createElement("div",{className:s()("notify-icon",e.variant&&"bg-"+e.variant)},e.avatar?a.createElement("img",{src:e.avatar,className:"img-fluid rounded-circle",alt:""}):a.createElement("i",{className:e.icon}))),a.createElement("div",{className:"flex-grow-1 text-truncate ms-2"},a.createElement("h5",{className:"noti-item-title fw-semibold font-14"},e.title," ",e.time&&a.createElement("small",{className:"fw-normal text-muted ms-1"},e.time)),a.createElement("small",{className:"noti-item-subtitle text-muted"},e.subText)))))})))})),a.createElement("div",{className:"text-center"},a.createElement("i",{className:"mdi mdi-dots-circle mdi-spin text-muted h3 mt-0"}))),a.createElement(l.Z.Item,{className:"text-center text-primary notify-item border-top border-light py-2"},"View All"))))}},32401:(e,t,n)=>{n.r(t),n.d(t,{default:()=>H});var a=n(67294),r=n(73727),l=n(14416),o=n(94184),c=n.n(o),i=n(69397),s=n(6e3),m=n(88291),u=n(48408);n(51493);function p(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var a,r,l,o,c=[],i=!0,s=!1;try{if(l=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(a=l.call(n)).done)&&(c.push(a.value),c.length!==t);i=!0);}catch(e){s=!0,r=e}finally{try{if(!i&&null!=n.return&&(o=n.return(),Object(o)!==o))return}finally{if(s)throw r}}return c}}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return f(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return f(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}const d=function(e){e.profilePic,e.menuItems;var t,n=e.username,o=e.userTitle,i=(0,l.I0)(),s=p((0,a.useState)(!1),2),f=s[0],d=s[1],y=function(){d(!f)};return a.createElement(m.Z,{show:f,onToggle:y},a.createElement(m.Z.Toggle,{variant:"link",id:"dropdown-profile",as:r.rU,to:"#",onClick:y,className:"nav-link dropdown-toggle nav-user arrow-none me-0 topbar_user_menu"},a.createElement("span",{className:"account-user-avatar __the_initials"},(((t="".concat(n).match(/\b\w/g)||[]).shift()||"")+(t.pop()||"")).toUpperCase()),a.createElement("span",null,a.createElement("span",{className:"account-user-name"},n),a.createElement("span",{className:"account-position"},o))),a.createElement(m.Z.Menu,{align:"end",className:"dropdown-menu-animated topbar-dropdown-menu profile-dropdown"},a.createElement("div",{onClick:y},a.createElement("div",{className:"dropdown-header noti-title"},a.createElement("h6",{className:"text-overflow m-0"},"Welcome !")),a.createElement("a",{onClick:function(){i((0,u.ED)()),i((0,u.qX)()),i((0,u.Nx)()),i((0,u.WO)()),i((0,u.rC)())},className:"dropdown-item notify-item chand"},a.createElement("i",{className:c()("mdi mdi-logout","me-1")}),a.createElement("span",null,"Logout")))))};var y=n(99006),h=n(86608),g=n(73328),E=["children"];function b(){return b=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},b.apply(this,arguments)}function v(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var N=function(e){for(var t=(0,g.y)(e,(function(e){return[e.type]})),n=[],a=0,r=0;r<t.length;r++)for(var l=0;l<t[r].length;l++)"users"===t[r][l].type&&0===a&&(t[r].splice(l,0,{label:"Users",value:"title",type:"title"}),a=1),n.push(t[r][l]);return n},w=function(e){var t=e.children,n=v(e,E),r=n.selectProps.handleClick;return a.createElement(y.c.Control,n,a.createElement("span",{onMouseDown:r,className:"mdi mdi-magnify search-icon"}),t)},x=function(e){var t=e.selectProps.handleClick;return a.createElement("div",{style:{}},a.createElement(y.c.IndicatorsContainer,b({},e,{className:"input-group"}),a.createElement("button",{className:"btn btn-primary input-group-text",onMouseDown:t},"Search")))},k=function(e){var t=e.selectProps.options;return a.createElement(y.c.MenuList,e,a.createElement("div",{className:"dropdown-header noti-title"},a.createElement("h5",{className:"text-overflow mb-2"},"Found ",a.createElement("span",{className:"text-danger"},t.length)," results")),e.children)},S=function(e){var t=function(e){switch(e.type){case"report":case"help":case"settings":return a.createElement(r.rU,{to:"#",className:c()("dropdown-item","notify-item","p-0")},a.createElement("i",{className:c()(e.icon,"font-16","me-1")}),a.createElement("span",null,e.label));case"title":return a.createElement("div",{className:"noti-title"},a.createElement("h6",{className:"text-overflow mb-2 text-uppercase"},"Users"));case"users":return a.createElement(a.Fragment,null,a.createElement(r.rU,{to:"#",className:"dropdown-item notify-item p-0"},a.createElement("div",{className:"d-flex"},a.createElement("img",{src:e.userDetails.avatar,alt:"",className:"d-flex me-2 rounded-circle",height:"32"}),a.createElement("div",{className:"w-100"},a.createElement("h5",{className:"drop-username m-0 font-14"},e.userDetails.firstname," ",e.userDetails.lastname),a.createElement("span",{className:"user-subinfo font-12 mb-0"},e.userDetails.position)))));default:return}}(e);return a.createElement("div",null,t)};const O=function(e){return a.createElement("div",{className:"__TopbarSearch"},!_.isEmpty(e.shared_company.logo)&&a.createElement("img",{src:e.shared_company.logo,alt:e.shared_company.name,height:"30"}),a.createElement(h.ZP,b({},e,{components:{Control:w,IndicatorsContainer:x,MenuList:k},placeholder:"Search...",options:N([]),formatOptionLabel:S,isOptionDisabled:function(e){return"title"===e.type},maxMenuHeight:"350px",handleClick:function(e){e.preventDefault(),e.stopPropagation()},isSearchable:!0,isClearable:!0,name:"search-app",className:"app-search dropdown",classNamePrefix:"react-select"})))};var C=n(54713),j=n(14666),Z=n(31040),A=n(5598),I=n(93379),T=n.n(I),U=n(96691),P={insert:"head",singleton:!1};T()(U.Z,P);U.Z.locals;var D=n(65262);function M(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var a,r,l,o,c=[],i=!0,s=!1;try{if(l=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(a=l.call(n)).done)&&(c.push(a.value),c.length!==t);i=!0);}catch(e){s=!0,r=e}finally{try{if(!i&&null!=n.return&&(o=n.return(),Object(o)!==o))return}finally{if(s)throw r}}return c}}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return L(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return L(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function L(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}var F=[];const H=(0,D.withRouter)((function(e){var t=e.hideLogo,n=e.navCssClasses,o=e.topbarDark,m=e.history,p=(0,l.I0)(),f=M((0,a.useState)(!1),2),y=(f[0],f[1],n||""),h=t?"":"container-fluid",g=M((0,a.useState)(!1),2),E=g[0],b=g[1],v=(0,l.v9)((function(e){return{user:e.user.activeUser,token:e.token.activeToken,company:e.orgs.company,portal_user:e.user.portalUser,shared_company:e.policyportal.shared_company,portalToken:e.token.portalToken}})),N=v.user,w=v.token,x=v.company,k=v.portal_user,S=v.shared_company,I=v.portalToken;return a.createElement(a.Fragment,null,a.createElement("div",{className:c()("navbar-custom",y)},a.createElement("div",{className:h},!t&&a.createElement(r.rU,{to:"/",className:"topnav-logo"},a.createElement("span",{className:"topnav-logo-lg"},a.createElement("img",{src:A.Z,alt:"logo",height:"30"})),a.createElement("span",{className:"topnav-logo-sm"},a.createElement("img",{src:o?Z.Z:j.Z,alt:"logo",height:"30"}))),a.createElement("ul",{className:"list-unstyled topbar-menu float-end mb-0"},a.createElement("li",{className:"dropdown notification-list"},a.createElement(s.Z,{notifications:F})),a.createElement("li",{className:"notification-list"},a.createElement(i.Z,{disabled:E,onClick:function(){b(!0),_.isEmpty(N)&&_.isEmpty(w)&&_.isEmpty(x)?m.push("/login"):(p((0,u.o4)(I)),m.push("/".concat(x.company.slug,"/compliance-stack"))),b(!1)},className:"mui-button",variant:"outlined"},"Console")),a.createElement("li",{className:"dropdown notification-list"},a.createElement(d,{profilePic:C.Z,menuItems:[],username:"[Not Set]"===k.first_name?"".concat(k.email):"".concat(k.first_name," ").concat(k.last_name),userTitle:S.name,portalToken:I}))),a.createElement(O,{shared_company:S}))))}))},73328:(e,t,n)=>{n.d(t,{y:()=>a});var a=function(e,t){var n={};return e.forEach((function(e){var a=JSON.stringify(t(e));n[a]=n[a]||[],n[a].push(e)})),Object.keys(n).map((function(e){return n[e]}))}},96691:(e,t,n)=>{n.d(t,{Z:()=>l});var a=n(23645),r=n.n(a)()((function(e){return e[1]}));r.push([e.id,".__TopbarSearchPublic{align-items:center;display:flex;justify-content:flex-start}.__TopbarSearchPublic img{margin-right:20px;margin-top:8px}",""]);const l=r},5598:(e,t,n)=>{n.d(t,{Z:()=>a});const a="/images/logo-light.png?3b724a41c26b1913211a33b811a5cce4"},31040:(e,t,n)=>{n.d(t,{Z:()=>a});const a="/images/logo_sm.png?e4ac7f99565bca506f3e86364f5ef2b1"},14666:(e,t,n)=>{n.d(t,{Z:()=>a});const a="/images/logo_sm_dark.png?3e50617ba85fb82dd3d43ba581919bcc"}}]);