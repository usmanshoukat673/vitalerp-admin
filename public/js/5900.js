"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[5900],{16718:(e,t,r)=>{var n=r(24994);t.A=void 0;var a=n(r(42032)),l=r(74848);t.A=(0,a.default)((0,l.jsx)("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"}),"Add")},67034:(e,t,r)=>{var n=r(24994);t.A=void 0;var a=n(r(42032)),l=r(74848);t.A=(0,a.default)((0,l.jsx)("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"}),"Delete")},28597:(e,t,r)=>{var n=r(24994);t.A=void 0;var a=n(r(42032)),l=r(74848);t.A=(0,a.default)((0,l.jsx)("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z"}),"Edit")},1795:(e,t,r)=>{var n=r(24994);t.A=void 0;var a=n(r(42032)),l=r(74848);t.A=(0,a.default)((0,l.jsx)("path",{d:"M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"}),"MoreVert")},35900:(e,t,r)=>{r.r(t),r.d(t,{default:()=>$});var n=r(96540),a=r(8321),l=r(2431),o=r(16718),c=r(29375),d=r(75659),i=r(84719),u=r(11848),s=r(24279),m=r(73639),p=r(17681),h=r(28597),f=r(19455),v=r(1795),b=r(67034);function E(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,a,l,o,c=[],d=!0,i=!1;try{if(l=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;d=!1}else for(;!(d=(n=l.call(r)).done)&&(c.push(n.value),c.length!==t);d=!0);}catch(e){i=!0,a=e}finally{try{if(!d&&null!=r.return&&(o=r.return(),Object(o)!==o))return}finally{if(i)throw a}}return c}}(e,t)||function(e,t){if(e){if("string"==typeof e)return g(e,t);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?g(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function g(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}function x(){return x=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},x.apply(null,arguments)}var A=(0,u.Ay)((function(e){return n.createElement(m.A,x({elevation:0,anchorOrigin:{vertical:"bottom",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"right"}},e))}))((function(e){var t=e.theme;return{"& .MuiPaper-root":{borderRadius:6,marginTop:t.spacing(1),minWidth:180,color:"light"===t.palette.mode?"rgb(55, 65, 81)":t.palette.grey[300],boxShadow:"rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px","& .MuiMenu-list":{padding:"4px 0"},"& .MuiMenuItem-root":{"& .MuiSvgIcon-root":{fontSize:18,color:t.palette.text.secondary,marginRight:t.spacing(1.5)},"&:active":{backgroundColor:(0,s.X4)(t.palette.primary.main,t.palette.action.selectedOpacity)}}}}}));const y=function(e){var t=e.record,r=e.module_id,l=e.name,o=(0,a.wA)(),c=E(n.useState(null),2),i=c[0],u=c[1],s=Boolean(i);return n.createElement("div",null,n.createElement(f.A,{"aria-label":"action menu",id:"document-action-button","aria-controls":s?"document-action-menu":void 0,"aria-expanded":s?"true":void 0,"aria-haspopup":"true",onClick:function(e){u(e.currentTarget)},sx:{height:"37px"}},n.createElement(v.A,null)),n.createElement(A,{id:"document-action-menu",MenuListProps:{"aria-labelledby":"document-action-button"},anchorEl:i,open:s,onClose:function(){u(null)}},n.createElement(p.A,{disableRipple:!0},n.createElement(h.A,null),"todo"),n.createElement(p.A,{onClick:function(){u(null),o((0,d.MK)({open:!0,record:t,module_id:r,name:l}))},disableRipple:!0},n.createElement(b.A,null),"Delete")))};var M=n.lazy((function(){return r.e(1199).then(r.bind(r,41199))}));const $=function(e){var t=e.module_id,r=e.question_id,u=(0,a.wA)(),s=(0,a.d4)((function(e){return{record_details:e.lanscape.record_details,assign_related_record:e.lanscape.assign_related_record,record:e.lanscape.record}})),m=s.record_details,p=s.assign_related_record,h=s.record;return n.createElement(n.Fragment,null,n.createElement(n.Fragment,null,n.createElement(l.A,{responsive:!0,className:"table table-centered table-nowrap mb-0"},n.createElement("thead",{className:"table-light"},n.createElement("tr",null,n.createElement("th",{className:"border-0"},"Name"),n.createElement("th",{className:"border-0"}),n.createElement("th",{className:"border-0"}),n.createElement("th",{className:"border-0"},"Created Date"),n.createElement("th",{className:"border-0",style:{width:"80px"}},"Actions"))),n.createElement("tbody",null,_.map(m.relatedrecords,(function(e){return e.relatedrecord.module_id==t&&e.record_id==h.id?n.createElement("tr",{key:e.relatedrecord.id},n.createElement("td",null,"".concat(e.relatedrecord.name)),n.createElement("td",null),n.createElement("td",null),n.createElement("td",null,"".concat(e.created_at)),n.createElement("td",null,n.createElement(y,{name:"".concat(e.relatedrecord.name),module_id:t,record:h}))):e.record.module_id==t&&e.record_id!=h.id?n.createElement("tr",{key:e.record.id},n.createElement("td",null,"".concat(e.record.name)),n.createElement("td",null),n.createElement("td",null),n.createElement("td",null,"".concat(e.created_at)),n.createElement("td",null,n.createElement(y,{name:"".concat(e.record.name),module_id:t,record:e}))):void 0})),!(null!=p&&p.open)&&n.createElement("tr",null,n.createElement("td",{colSpan:5},n.createElement("a",{onClick:function(){u((0,d.LI)({open:!0,module_id:t}))},className:"chand"},n.createElement(o.A,null)," Add record")))))),n.createElement(i.A,{sx:{width:"40%"}},n.createElement(c.A,{in:null==p?void 0:p.open},n.createElement(n.Suspense,{fallback:n.createElement("div",null,"Loading...")},n.createElement(M,{module_id:t,question_id:r})))))}},2431:(e,t,r)=>{r.d(t,{A:()=>d});var n=r(46942),a=r.n(n),l=r(96540),o=r(36519),c=r(74848);const d=l.forwardRef((({bsPrefix:e,className:t,striped:r,bordered:n,borderless:l,hover:d,size:i,variant:u,responsive:s,...m},p)=>{const h=(0,o.oU)(e,"table"),f=a()(t,h,u&&`${h}-${u}`,i&&`${h}-${i}`,r&&`${h}-${"string"==typeof r?`striped-${r}`:"striped"}`,n&&`${h}-bordered`,l&&`${h}-borderless`,d&&`${h}-hover`),v=(0,c.jsx)("table",{...m,className:f,ref:p});if(s){let e=`${h}-responsive`;return"string"==typeof s&&(e=`${e}-${s}`),(0,c.jsx)("div",{className:e,children:v})}return v}))}}]);