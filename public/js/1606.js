"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[1606,5327],{95327:(e,t,n)=>{n.r(t),n.d(t,{default:()=>s});var a=n(46942),r=n.n(a),l=n(96540),c=n(8321);const s=(0,n(56347).withRouter)((function(e){var t=e.history,n=e.classes;(0,c.d4)((function(e){return{company:e.orgs.company}})).company;return l.createElement("span",{onClick:function(){t.push("/dashboard")},className:r()(n,"_active")},"Home")}))},71606:(e,t,n)=>{n.r(t),n.d(t,{default:()=>p});var a=n(96540),r=n(8321),l=n(75659),c=n(11512),s=n(95327),i=n(60153),d=n(46587);function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var a,r,l,c,s=[],i=!0,d=!1;try{if(l=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(a=l.call(n)).done)&&(s.push(a.value),s.length!==t);i=!0);}catch(e){d=!0,r=e}finally{try{if(!i&&null!=n.return&&(c=n.return(),Object(c)!==c))return}finally{if(d)throw r}}return s}}(e,t)||function(e,t){if(e){if("string"==typeof e)return m(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?m(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=Array(t);n<t;n++)a[n]=e[n];return a}var u=a.lazy((function(){return n.e(9305).then(n.bind(n,11686))})),v=[{id:d.ed,name:"Hardware",slug:"hardware"},{id:d.PY,name:"Software",slug:"software"},{id:d.Nr,name:"Cloud services",slug:"cloud-services"},{id:d.hD,name:"Data sets",slug:"data-sets"},{id:d.RX,name:"Processes",slug:"processes"},{id:d.dw,name:"Information systems",slug:"information-systems"}];const p=function(e){var t=e.history,n=o((0,a.useState)(!1),2),m=(n[0],n[1]),p=o((0,a.useState)(!1),2),f=(p[0],p[1],(0,r.wA)()),b=(0,r.d4)((function(e){return{open_sub:e.leftnav.open_sub}})).open_sub;(0,a.useEffect)((function(){f((0,l.gD)()),f((0,l.jc)("fixed")),f((0,l.gL)("non-focused")),f((0,l.zp)({open:!1,type:""}))}),[]);return a.createElement(a.Fragment,null,a.createElement("div",{className:b?"sub__slide__menu_opened":""},a.createElement("div",{className:"ccroot__mainbd"},a.createElement("div",{className:"ccroot__breadcrum"},a.createElement(s.default,null)," "," > ","  Assets"),a.createElement("div",{className:"cc__header"},a.createElement("div",{className:"__name"},"Assets"),a.createElement("div",{className:"__actions"},a.createElement("div",{className:"__filter"}))))),a.createElement("div",{className:"__cp_stack"},a.createElement("div",{className:"__cp_stack__container"},a.createElement(i.A,{doubling:!0,columns:2},_.map(v,(function(e){return a.createElement(i.A.Column,{key:"".concat(e.id)},a.createElement("div",{className:"__cps_staindard__box"},a.createElement("div",{className:"__cps_staindard__box__header"},a.createElement("div",{className:"__sd_title",onClick:function(){return function(e){c.A.get("/api/user/assets/list/".concat(e.id)).then((function(n){f((0,l.HJ)(n.data.lan_assets)),m(!0),f((0,l.oZ)(e)),f((0,l.GA)("category")),f((0,l.fK)()),f((0,l.zp)({open:!0,type:d.y6,route:d.y6})),f((0,l.jc)("condensed")),f((0,l.gL)("focused")),m(!1),t.push("/assets/".concat(e.slug))})).catch((function(e){m(!1)}))}(e)}},"".concat(e.name))),a.createElement("div",{className:"cc_overview__panal"},a.createElement("div",{className:"__piechart"},a.createElement("div",{className:"__pieheading"},"Overview"),a.createElement(a.Suspense,{fallback:a.createElement("div",null,"Loading...")},a.createElement(u,{type:"lanscape",series:[1,0,0,0,0]}))),a.createElement("div",{className:"__pienotes"},a.createElement("div",null," ",a.createElement("span",{className:"lan__fullyimpl __count"},"0")," Implemented"),a.createElement("div",null,a.createElement("span",{className:"lan__partimpl __count"},"0")," Partially Implemented"),a.createElement("div",null,a.createElement("span",{className:"lan__applicable __count"},"0")," Not Implemented"),a.createElement("div",null," ",a.createElement("span",{className:"lan__not_applicable __count"},"0")," Excluded"),a.createElement("div",null," ",a.createElement("span",{className:"lan__requiredatten __count"},"0")," Not Applicable")),a.createElement("div",{className:"__totaldocs"},a.createElement("div",{className:"__numberof_docs"},a.createElement("div",{className:"__count"},"0"),a.createElement("div",null))))))}))))))}},60153:(e,t,n)=>{n.d(t,{A:()=>_});var a=n(58168),r=n(20053),l=n(96540),c=n(43905),s=n(21401),i=n(83332),d=n(78635);function o(e){var t=e.centered,n=e.children,d=e.className,m=e.color,u=e.columns,_=e.divided,v=e.only,p=e.reversed,f=e.stretched,b=e.textAlign,h=e.verticalAlign,E=(0,r.A)(m,(0,c.b5)(t,"centered"),(0,c.b5)(_,"divided"),(0,c.b5)(f,"stretched"),(0,c.FY)(v,"only"),(0,c.FY)(p,"reversed"),(0,c.T9)(b),(0,c.mV)(h),(0,c.T5)(u,"column",!0),"row",d),y=(0,s.A)(o,e),g=(0,i.A)(o,e);return l.createElement(g,(0,a.A)({},y,{className:E}),n)}o.handledProps=["as","centered","children","className","color","columns","divided","only","reversed","stretched","textAlign","verticalAlign"],o.propTypes={};const m=o;function u(e){var t=e.celled,n=e.centered,d=e.children,o=e.className,m=e.columns,_=e.container,v=e.divided,p=e.doubling,f=e.inverted,b=e.padded,h=e.relaxed,E=e.reversed,y=e.stackable,g=e.stretched,A=e.textAlign,N=e.verticalAlign,w=(0,r.A)("ui",(0,c.b5)(n,"centered"),(0,c.b5)(_,"container"),(0,c.b5)(p,"doubling"),(0,c.b5)(f,"inverted"),(0,c.b5)(y,"stackable"),(0,c.b5)(g,"stretched"),(0,c.vQ)(t,"celled"),(0,c.vQ)(v,"divided"),(0,c.vQ)(b,"padded"),(0,c.vQ)(h,"relaxed"),(0,c.FY)(E,"reversed"),(0,c.T9)(A),(0,c.mV)(N),(0,c.T5)(m,"column",!0),"grid",o),x=(0,s.A)(u,e),T=(0,i.A)(u,e);return l.createElement(T,(0,a.A)({},x,{className:w}),d)}u.handledProps=["as","celled","centered","children","className","columns","container","divided","doubling","inverted","padded","relaxed","reversed","stackable","stretched","textAlign","verticalAlign"],u.Column=d.A,u.Row=m,u.propTypes={};const _=u},78635:(e,t,n)=>{n.d(t,{A:()=>m});var a=n(58168),r=n(20053),l=n(96540),c=n(43905),s=n(21401),i=n(83332),d=n(46712);function o(e){var t=e.children,n=e.className,d=e.computer,m=e.color,u=e.floated,_=e.largeScreen,v=e.mobile,p=e.only,f=e.stretched,b=e.tablet,h=e.textAlign,E=e.verticalAlign,y=e.widescreen,g=e.width,A=(0,r.A)(m,(0,c.b5)(f,"stretched"),(0,c.FY)(p,"only"),(0,c.T9)(h),(0,c.xm)(u,"floated"),(0,c.mV)(E),(0,c.T5)(d,"wide computer"),(0,c.T5)(_,"wide large screen"),(0,c.T5)(v,"wide mobile"),(0,c.T5)(b,"wide tablet"),(0,c.T5)(y,"wide widescreen"),(0,c.T5)(g,"wide"),"column",n),N=(0,s.A)(o,e),w=(0,i.A)(o,e);return l.createElement(w,(0,a.A)({},N,{className:A}),t)}o.handledProps=["as","children","className","color","computer","floated","largeScreen","mobile","only","stretched","tablet","textAlign","verticalAlign","widescreen","width"],o.propTypes={},o.create=(0,d.Iy)(o,(function(e){return{children:e}}));const m=o}}]);