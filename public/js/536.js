"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[536],{74090:(e,t,a)=>{a.d(t,{Sh:()=>s,tD:()=>i,vf:()=>l,Mv:()=>o});function n(e){return function(e){if(Array.isArray(e))return r(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return r(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return r(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var l=function(e,t,a){return[{key:"apps-compliance-stack",label:"ComplianceStack",isTitle:!1,url:"/".concat(e.company.slug,"/compliance-stack"),icon:"uil-layer-group"},{key:"apps-workbench",label:"WorkBench",isTitle:!1,icon:"uil-clipboard-alt",children:[{key:"projects-list",label:"Projects",url:"/".concat(e.company.slug,"/projects/list"),parentKey:"apps-projects"},{key:"task-list",label:"Tasks",url:"/".concat(e.company.slug,"/workbench/list"),parentKey:"apps-tasks"},{key:"task-kanban",label:"Board",url:"/".concat(e.company.slug,"/workbench/tasks/kanban/all"),parentKey:"apps-tasks"},{key:"project-gantt",label:"Chart",url:"/".concat(e.company.slug,"/workbench/projects/gantt/all"),parentKey:"apps-projects"}]},{key:"apps-marketplace",label:"Marketplace",isTitle:!1,icon:"uil-store",children:[{key:"standards",label:"Standards",url:"/store/standards",parentKey:"apps-marketplace"},{key:"saas-applications",label:"SaaS Applications",url:"/store/saas-applications",parentKey:"apps-marketplace"},{key:"toolkits",label:"Toolkits",url:"/store/toolkits",parentKey:"apps-marketplace"}]},{key:"app-lanscape",label:"Lanscape",isTitle:!1,icon:"uil-document-layout-center",url:"/lanscapes"},{key:"apps-file-manager",label:"File Manager",isTitle:!1,icon:"uil-folder-plus",url:"/".concat(e.company.slug,"/filemanager/home")},{key:"apps-file-assets",label:"Assets",isTitle:!1,icon:"uil-box",url:"/".concat(e.company.slug,"/assets")},{key:"apps-reports",label:"Reports",isTitle:!1,icon:"uil-chart",url:"/".concat(e.company.slug,"/reports")},{key:"app-form-welcome",label:"Questionnaire",isTitle:!1,icon:"uil-notebooks",url:"/beta-form/welcome"}]},o=function(){return[{key:"app-form-welcome",label:"Welcome",isTitle:!1,icon:"uil-award",url:"/beta-form/welcome"},{key:"app-form-posture",label:"1. Posture",isTitle:!1,icon:"uil-notebooks",url:"/beta-form/posture"},{key:"app-form-aim",label:"2. AIM",isTitle:!1,icon:"uil-notebooks",url:"/beta-form/aim"},{key:"app-form-event",label:"3. Event",isTitle:!1,icon:"uil-notebooks",url:"/beta-form/event"},{key:"app-form-asset",label:"4. Asset",isTitle:!1,icon:"uil-notebooks",url:"/beta-form/asset"},{key:"app-form-backups",label:"5. Backups",isTitle:!1,icon:"uil-notebooks",url:"/beta-form/backups"},{key:"app-form-data",label:"6. Data & Device",isTitle:!1,icon:"uil-notebooks",url:"/beta-form/data-and-device"},{key:"app-form-incident",label:"7. Incident",isTitle:!1,icon:"uil-notebooks",url:"/beta-form/incident"},{key:"app-form-disclosure",label:"Disclosure",isTitle:!1,icon:"uil-notebooks",url:"/beta-form/disclosure"},{key:"app-form-thankyou",label:"Thank you",isTitle:!1,icon:"uil-presentation-check",url:"/beta-form/thankyou"},{key:"app-dashboard",label:"Home",isTitle:!1,icon:"uil-home-alt",url:"/dashboard"}]},s=function e(t,a){var r=[],l=i(t,a.parentKey);return l&&(r.push(l.key),l.parentKey&&(r=[].concat(n(r),n(e(t,l))))),r},i=function e(t,a){if(t&&a)for(var n=0;n<t.length;n++){if(t[n].key===a)return t[n];var r=e(t[n].children,a);if(r)return r}return null}},71536:(e,t,a)=>{a.r(t),a.d(t,{default:()=>B});var n=a(67294),r=a(16592),l=a(40077),o=a(74090),s=a(24480),i=a(16518),c=a(94184),u=a.n(c),m=a(48408),d=(a(96486),a(14416)),p=a(51493);function f(e){return function(e){if(Array.isArray(e))return k(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||b(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function y(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=a){var n,r,l,o,s=[],i=!0,c=!1;try{if(l=(a=a.call(e)).next,0===t){if(Object(a)!==a)return;i=!1}else for(;!(i=(n=l.call(a)).done)&&(s.push(n.value),s.length!==t);i=!0);}catch(e){c=!0,r=e}finally{try{if(!i&&null!=a.return&&(o=a.return(),Object(o)!==o))return}finally{if(c)throw r}}return s}}(e,t)||b(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function b(e,t){if(e){if("string"==typeof e)return k(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?k(e,t):void 0}}function k(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var g=function e(t){var a=t.item,l=t.linkClassName,o=t.subMenuClassNames,c=t.activeMenuItems,m=t.toggleMenu,d=t.company,p=t.token,f=t.navigate,b=y((0,n.useState)(c.includes(a.key)),2),k=b[0],g=b[1],v=(0,s.k6)(),E=(0,s.TH)();return n.createElement("li",{className:u()("side-nav-item",{"menuitem-active":k})},n.createElement(r.rU,{to:"/#",onClick:function(e){e.preventDefault();var t=!k;return g(t),m&&m(a,t),"apps-compliance-stack"==a.key&&E.pathname!=a.url&&(g(!0),m(a,!0),v.push(a.url)),!1},"data-menu-key":a.key,"aria-expanded":k,className:u()("has-arrow","side-sub-nav-link",l,{"menuitem-active":c.includes(a.key)?"active":""})},a.icon&&n.createElement("i",{className:a.icon}),a.badge?n.createElement("span",{className:u()("badge","bg-"+a.badge.variant,"float-end",{"text-dark":"light"===a.badge.variant})},a.badge.text):n.createElement("span",{className:"menu-arrow"}),n.createElement("span",null," ",a.label," ")),n.createElement(i.Z,{in:k},n.createElement("ul",{className:u()(o)},a.children.map((function(t,a){return n.createElement(n.Fragment,{key:a},t.children?n.createElement(n.Fragment,null,n.createElement(e,{item:t,linkClassName:c.includes(t.key)?"active":"",activeMenuItems:c,subMenuClassNames:"side-nav-third-level",toggleMenu:m,company:d,token:p,navigate:f})):n.createElement(n.Fragment,null,n.createElement(h,{item:t,className:c.includes(t.key)?"menuitem-active":"",linkClassName:c.includes(t.key)?"active":"",company:d,token:p,navigate:f})))})))))},h=function(e){var t=e.item,a=e.className,r=e.linkClassName,l=e.navigate;return n.createElement("li",{className:u()("side-nav-item",a)},n.createElement(v,{item:t,className:r,navigate:l}))},v=function(e){var t=e.item,a=e.className,l=e.navigate;return t.parentKey&&"apps-compliance-stack"===t.parentKey?n.createElement("a",{onClick:function(){p.Z.post("/api/user/compliance/parent-sections",{standards:[t.std.standard_id]}).then((function(e){l(t.url,t.std,e.data.parent_sections,e.data.users)})).catch((function(e){}))},target:t.target,className:u()("side-nav-link-ref","side-sub-nav-link",a,"chand"),"data-menu-key":t.key},t.icon&&n.createElement("i",{className:t.icon}),t.badge&&n.createElement("span",{className:u()("badge","bg-"+t.badge.variant,"rounded-pill","font-10","float-end",{"text-dark":"light"===t.badge.variant})},t.badge.text),n.createElement("span",null," ",t.label," ")):n.createElement(r.rU,{to:{pathname:t.url},target:t.target,className:u()("side-nav-link-ref","side-sub-nav-link",a),"data-menu-key":t.key},t.icon&&n.createElement("i",{className:t.icon}),t.badge&&n.createElement("span",{className:u()("badge","bg-"+t.badge.variant,"rounded-pill","font-10","float-end",{"text-dark":"light"===t.badge.variant})},t.badge.text),n.createElement("span",null," ",t.label," "))};const E=(0,s.EN)((function(e){var t=e.menuItems,a=e.company,r=e.token,l=e.history,i=(0,s.TH)(),c=(0,d.I0)(),u=(0,n.useRef)(null),p=y((0,n.useState)([]),2),b=p[0],k=p[1],v=function(e,a){a&&k([e.key].concat(f((0,o.Sh)(t,e))))},E=(0,n.useCallback)((function(){var e=document.getElementById("main-side-menu"),a=null;if(e){for(var n=e.getElementsByClassName("side-nav-link-ref"),r=0;r<n.length;++r)if(i.pathname===n[r].pathname){a=n[r];break}if(a){var l=a.getAttribute("data-menu-key"),s=(0,o.tD)(t,l);s&&k([s.key].concat(f((0,o.Sh)(t,s))))}}}),[i.pathname,t]),N=function(e,t,a,n){c((0,m.yk)(t)),c((0,m.x)(a)),c((0,m.uG)(n)),l.push(e)};return(0,n.useEffect)((function(){E()}),[]),n.createElement(n.Fragment,null,n.createElement("ul",{className:"side-nav",ref:u,id:"main-side-menu"},(t||[]).map((function(e,t){return n.createElement(n.Fragment,{key:t},e.isTitle?n.createElement("li",{className:"side-nav-title side-nav-item"},e.label):n.createElement(n.Fragment,null,e.children?n.createElement(g,{item:e,toggleMenu:v,subMenuClassNames:"side-nav-second-level",activeMenuItems:b,linkClassName:"side-nav-link",company:a,token:r,navigate:N}):n.createElement(h,{item:e,linkClassName:"side-nav-link",className:b.includes(e.key)?"menuitem-active":"",company:a,token:r,navigate:N})))}))))}));var N=a(54713),S=a(80807),T=a(99226),w=a(60076),A=a(63931),C=a(53640),j=a(69587),I=a(9669),x=a.n(I),M=a(18839),F=a(94379),U=x().create({baseURL:"/api/user/policy-portal"});U.interceptors.request.use((function(e){var t=JSON.parse(localStorage.getItem("__appstate__")),a=t.token.portalToken,n=t.policyportal.shared_company;return e.headers.Authorization="".concat(a.token_type," ").concat(a.access_token),e.headers["X-Company-ID"]=n.id,e}),(function(e){return Promise.reject(e)})),U.interceptors.response.use((function(e){return e}),(function(e){return e.response&&(401===e.response.status?(F.fn.error("Session Expired.","Error"),(0,M.Av)()):500===e.response.status&&F.fn.error("Server Error, Please contact customer support.","Error")),Promise.reject(e)}));const P=U;function K(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=a){var n,r,l,o,s=[],i=!0,c=!1;try{if(l=(a=a.call(e)).next,0===t){if(Object(a)!==a)return;i=!1}else for(;!(i=(n=l.call(a)).done)&&(s.push(n.value),s.length!==t);i=!0);}catch(e){c=!0,r=e}finally{try{if(!i&&null!=a.return&&(o=a.return(),Object(o)!==o))return}finally{if(c)throw r}}return s}}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return L(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return L(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function L(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}const O=function(e){var t=e.shared_standards,a=(0,d.v9)((function(e){return{active_standard:e.policyportal.active_standard}})).active_standard,r=K(n.useState(""),2),l=r[0],o=r[1],s=(0,d.I0)();(0,n.useEffect)((function(){_.isEmpty(a)||o(a.standard_id)}),[a]);return(0,n.useEffect)((function(){if(""!==l){var e=_.find(t,(function(e){return e.standard_id===l}));s((0,m.NW)(e)),P.get("/standard/domains/".concat(l)).then((function(e){s(setPortalActiveDomains(e.data))})).catch((function(e){}))}}),[l]),n.createElement(T.Z,{sx:{minWidth:120,background:"#fff"}},n.createElement(C.Z,{fullWidth:!0},n.createElement(w.Z,{id:"vendor-catalog-switch-label"},"Stack"),n.createElement(j.Z,{labelId:"vendor-catalog-switch-label",id:"vendor-catalog-switch",value:l,label:"Stack",onChange:function(e){console.log(e.target.value),o(e.target.value)}},_.map(t,(function(e,t){return n.createElement(A.Z,{value:e.standard_id,key:t},"".concat(e.standard.name))})))))};var Z=function(e){var t=e.hideUserProfile,a=e.user,l=e.company,o=e.portalToken,s=e.shared_standards;return n.createElement(n.Fragment,null,!t&&n.createElement("div",{className:"leftbar-user"},n.createElement(r.rU,{to:"/"},n.createElement("img",{src:N.Z,alt:"",height:"42",className:"rounded-circle shadow-sm"}),n.createElement("span",{className:"leftbar-user-name"},"".concat(a.first_name," ").concat(a.last_name)))),n.createElement(O,{shared_standards:s}),n.createElement(E,{company:l,token:o}),n.createElement("div",{className:"clearfix"}))},D=function(e){var t=e.isCondensed,a=e.isLight,o=e.hideLogo,s=e.hideUserProfile,i=e.user,c=e.portalToken,u=e.company,m=e.leftnav,p=(0,n.useRef)(null),f=(0,d.v9)((function(e){return{shared_standards:e.policyportal.shared_standards}})).shared_standards,y=function(e){p&&p.current&&p.current.contains(e.target)||document.body&&document.body.classList.remove("sidebar-enable")};return(0,n.useEffect)((function(){return document.addEventListener("mousedown",y,!1),function(){document.removeEventListener("mousedown",y,!1)}}),[]),n.createElement(n.Fragment,null,n.createElement("div",{className:"leftside-menu",ref:p},!o&&n.createElement(n.Fragment,null,n.createElement(r.rU,{to:"/",className:"logo text-center logo-light"},n.createElement("span",{className:"logo-lg"},n.createElement("img",{src:S.yt,alt:S._F,height:"16"})),n.createElement("span",{className:"logo-sm"},n.createElement("img",{src:a?S.dk:S.f1,alt:S._F,height:"16"}))),n.createElement(r.rU,{to:"/",className:"logo text-center logo-dark"},n.createElement("span",{className:"logo-lg"},n.createElement("img",{src:S.yt,alt:S._F,height:"16"})),n.createElement("span",{className:"logo-sm"},n.createElement("img",{src:a?S.dk:S.f1,alt:S._F,height:"16"})))),!t&&n.createElement(l.Z,{style:{maxHeight:"100%"},timeout:500,scrollbarMaxSize:320},n.createElement(Z,{menuClickHandler:function(){},isLight:a,hideUserProfile:s,user:i,company:u,shared_standards:f,leftnav:m,portalToken:c})),t&&n.createElement(Z,{isLight:a,user:i,company:u,shared_standards:f,leftnav:m,portalToken:c,hideUserProfile:s})))};D.defaultProps={hideLogo:!1,hideUserProfile:!1,isLight:!1,isCondensed:!1};const B=D}}]);