"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[7002],{47002:(e,t,n)=>{n.r(t),n.d(t,{default:()=>d});var r=n(67294),a=n(99226),o=n(23972),i=n(22715),l=n(94379),c=n(14416),u=n(31812),s=n(93967),m=n.n(s);function f(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,o,i,l=[],c=!0,u=!1;try{if(o=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=o.call(n)).done)&&(l.push(r.value),l.length!==t);c=!0);}catch(e){u=!0,a=e}finally{try{if(!c&&null!=n.return&&(i=n.return(),Object(i)!==i))return}finally{if(u)throw a}}return l}}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return p(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return p(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}const d=function(e){var t,n=e.history,s=((0,c.I0)(),f((0,r.useState)([]),2)),p=s[0],d=s[1],y=f((0,r.useState)(""),2),h=y[0],g=y[1],b=f((0,r.useState)(!1),2),x=b[0],v=b[1],E=function(e){p.length>0&&p[0].hasOwnProperty(e)&&(delete p[0][e],d(p))};return r.createElement(r.Fragment,null,r.createElement("div",{className:"auth_page_content"},r.createElement(a.Z,{sx:{display:"flex",marginTop:"40px",justifyContent:"center"}},r.createElement(o.Z,{variant:"h2",sx:{fontWeight:"400"}},"Experience the future of compliance management.")),r.createElement(a.Z,{sx:{display:"flex",marginTop:"80px"}},r.createElement(a.Z,{sx:{flex:"0.4",marginRight:"50px",marginTop:"10px",fontSize:"19px"}},r.createElement("p",null,"With MotionGRC's advanced AI technology, you can simplify your compliance management workflows and automate your compliance tasks."),r.createElement("p",null,"Say goodbye to manual data entry, complicated spreadsheets, and never-ending compliance checklists. With MotionGRC, you can automate your compliance workflows and gain insights into your compliance status with ease."),r.createElement("p",null,"Create a free account with MotionGRC today and experience the power of AI in action!")),r.createElement(a.Z,{sx:{flex:"0.6",background:"rgb(249 249 249);",padding:"20px",borderRadius:"6px"}},r.createElement(o.Z,{variant:"h4"},"Create a free account."),r.createElement(o.Z,{variant:"subtitle1",sx:{marginBottom:"50px"}},"Please enter your email address"),r.createElement("form",{onSubmit:function(e){e.preventDefault(),v(!0),axios.post("/api/auth/onboarding/send-verfication-email",{email:h}).then((function(e){v(!1),d([]),n.push("/build-email-sent")})).catch((function(e){v(!1),500===e.response.status&&l.fn.error("Server Error, Please contact customer support.","Error"),422===e.response.status&&d(p.concat(e.response.data.errors))}))}},r.createElement(a.Z,{sx:{marginBottom:"15px"}},r.createElement(i.Z,{fullWidth:!0,label:"Email address",variant:"outlined",className:m()((t="email",p.some((function(e){return e.hasOwnProperty(t)}))?"error":""),"build__input"),onChange:function(e){g(e.target.value),E("email")},name:"email",value:h}),function(e){return p.some((function(t){return t.hasOwnProperty(e)}))?r.createElement("p",{className:"form-error-messsage"},p[0][e]):""}("email")),r.createElement("div",{className:"mt-3"},r.createElement(u.Z,{sx:{backgroundColor:"#1a73e8"},type:"submit",size:"large",loading:x,loadingIndicator:"Verifying your email...",variant:"contained"},"Verify")))))))}}}]);