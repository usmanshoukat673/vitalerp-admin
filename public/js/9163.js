"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[9163],{96540:(e,t,a)=>{var r=a(64836);t.Z=void 0;var l=r(a(64938)),n=a(85893);t.Z=(0,l.default)((0,n.jsx)("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"}),"Add")},89163:(e,t,a)=>{a.r(t),a.d(t,{default:()=>m});var r=a(67294),l=a(14416),n=a(75147),c=a(99226),s=a(96540),d=a(12509),o=a(48408),i=r.lazy((function(){return a.e(1071).then(a.bind(a,91071))}));const m=function(e){var t=e.module_id,a=e.question_id,m=(0,l.I0)(),u=(0,l.v9)((function(e){return{record_details:e.lanscape.record_details,assign_related_record:e.lanscape.assign_related_record}})),E=u.record_details,h=u.assign_related_record;return r.createElement(r.Fragment,null,r.createElement(r.Fragment,null,r.createElement(n.Z,{responsive:!0,className:"table table-centered table-nowrap mb-0"},r.createElement("thead",{className:"table-light"},r.createElement("tr",null,r.createElement("th",{className:"border-0"},"Name"),r.createElement("th",{className:"border-0"}),r.createElement("th",{className:"border-0"}),r.createElement("th",{className:"border-0"},"Created Date"),r.createElement("th",{className:"border-0",style:{width:"80px"}},"Actions"))),r.createElement("tbody",null,_.map(E.locations,(function(e){return r.createElement("tr",{key:e.location.id},r.createElement("td",null,"".concat(e.location.name)),r.createElement("td",null),r.createElement("td",null),r.createElement("td",null,"".concat(e.created_at)),r.createElement("td",null))})),!(null!=h&&h.open)&&r.createElement("tr",null,r.createElement("td",{colSpan:5},r.createElement("a",{onClick:function(){m((0,o.fk)({open:!0,module_id:t}))},className:"chand"},r.createElement(s.Z,null)," Add location")))))),r.createElement(c.Z,{sx:{width:"40%"}},r.createElement(d.Z,{in:null==h?void 0:h.open},r.createElement(r.Suspense,{fallback:r.createElement("div",null,"Loading...")},r.createElement(i,{question_id:a})))))}},75147:(e,t,a)=>{a.d(t,{Z:()=>d});var r=a(93967),l=a.n(r),n=a(67294),c=a(76792),s=a(85893);const d=n.forwardRef((({bsPrefix:e,className:t,striped:a,bordered:r,borderless:n,hover:d,size:o,variant:i,responsive:m,...u},E)=>{const h=(0,c.vE)(e,"table"),b=l()(t,h,i&&`${h}-${i}`,o&&`${h}-${o}`,a&&`${h}-${"string"==typeof a?`striped-${a}`:"striped"}`,r&&`${h}-bordered`,n&&`${h}-borderless`,d&&`${h}-hover`),p=(0,s.jsx)("table",{...u,className:b,ref:E});if(m){let e=`${h}-responsive`;return"string"==typeof m&&(e=`${e}-${m}`),(0,s.jsx)("div",{className:e,children:p})}return p}))}}]);