"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[3856],{53856:(e,t,r)=>{r.r(t),r.d(t,{default:()=>C});var n=r(67294),o=r(14416),a=(r(96486),r(48408)),i=r(73727),c=r(80807),l=r(99226),u=r(23972),s=r(53640),p=r(60076),f=r(69587),d=r(63931),y=r(22715),m=r(31812),h=r(93967),b=r.n(h),g=r(51493);function v(e){return v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},v(e)}function S(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,Z(n.key),n)}}function x(e,t,r){return t=w(t),function(e,t){if(t&&("object"===v(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return _(e)}(e,E()?Reflect.construct(t,r||[],w(e).constructor):t.apply(e,r))}function E(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(E=function(){return!!e})()}function w(e){return w=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},w(e)}function _(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function O(e,t){return O=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},O(e,t)}function P(e,t,r){return(t=Z(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function Z(e){var t=function(e,t){if("object"!=v(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t||"default");if("object"!=v(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==v(t)?t:String(t)}var j=function(e){function t(){var e;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var r=arguments.length,o=new Array(r),a=0;a<r;a++)o[a]=arguments[a];return P(_(e=x(this,t,[].concat(o))),"state",{phone:"",country_code:"",errors:[],loading:!1,later:!0}),P(_(e),"handleChange",(function(t){e.setState(P({},t.target.name,t.target.value));var r=e.state.errors;r.length>0&&r[0].hasOwnProperty(t.target.name)&&(delete r[0][t.target.name],e.setState({errors:r}))})),P(_(e),"handleSelectChange",(function(t){e.setState({country_code:t.target.value});var r=e.state.errors;r.length>0&&r[0].hasOwnProperty("country_code")&&(delete r[0].country_code,e.setState({errors:r}))})),P(_(e),"handlerInputError",(function(e,t){return e.some((function(e){return e.hasOwnProperty(t)}))?"error":""})),P(_(e),"displayInputError",(function(e,t){return e.some((function(e){return e.hasOwnProperty(t)}))?n.createElement("p",{style:{marginTop:"5px"},className:"form-error-messsage"},e[0][t]):""})),P(_(e),"handleSubmit",(function(t){t.preventDefault(),e.setState({errors:[],loading:!0}),g.Z.post("/api/user/verify-number",e.state).then((function(t){e.setState({country_code:"",phone:"",errors:[],loading:!1}),e.props.setUser(t.data.user),e.props.history.push("/user/verify-phone/".concat(t.data.id))})).catch((function(t){500===t.response.status&&e.setState({errors:[],loading:!1}),422===t.response.status&&e.setState({errors:e.state.errors.concat(t.response.data.errors),loading:!1})}))})),P(_(e),"renderLater",(function(e){return e?n.createElement(i.rU,{style:{color:"#fff !important",marginLeft:"15px"},to:"/select-organization"},"Set up later"):""})),e}var r,o,a;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&O(e,t)}(t,e),r=t,(o=[{key:"componentDidMount",value:function(){new URLSearchParams(this.props.location.search).get("strict")&&this.setState({later:!1}),this.props.setCreateNewOrg({open:!1,in_org:!1})}},{key:"render",value:function(){var e=this.state,t=e.errors,r=e.loading,o=e.country_code,a=e.phone,i=e.later;return n.createElement(n.Fragment,null,n.createElement(l.Z,{sx:{display:"flex",marginTop:"30px"}},n.createElement(l.Z,{sx:{flex:"0.5",marginRight:"50px",marginTop:"50px",fontSize:"19px"}}),n.createElement(l.Z,{sx:{flex:"0.5",padding:"20px",borderRadius:"6px",mt:"50px"}},n.createElement(u.Z,{variant:"h4",sx:{color:"#fff"}},"Multi-Factor Authentication"),n.createElement(u.Z,{sx:{marginBottom:"50px",color:"#fff"}},"Secure your account with two-factor authentication"),n.createElement("p",{style:{color:"#fff"}},c._F," will send a security code to this mobile phone number whenever you log into the ",c._F," website."),n.createElement("form",{onSubmit:this.handleSubmit},n.createElement(l.Z,{sx:{marginBottom:"15px",display:"flex"}},n.createElement(l.Z,{sx:{flex:"0.3"}},n.createElement(s.Z,{fullWidth:!0},n.createElement(p.Z,{id:"country_code_label_id"},"Select your country"),n.createElement(f.Z,{labelId:"country_code_label_id",id:"country_code",value:o,label:"Select your country",onChange:this.handleSelectChange,className:b()(this.handlerInputError(t,"country_code"),"build__input")},n.createElement(d.Z,{sx:{fontSize:"18px!important"},key:1,value:1},"United States (+1)"),n.createElement(d.Z,{sx:{fontSize:"18px!important"},key:91,value:91},"India (+91)")),this.displayInputError(t,"country_code"))),n.createElement(l.Z,{sx:{marginLeft:"20px",flex:"0.5"}},n.createElement(y.Z,{fullWidth:!0,label:"Phone Number",variant:"outlined",onChange:this.handleChange,name:"phone",value:a,className:b()(this.handlerInputError(t,"phone"),"build__input")}),this.displayInputError(t,"phone"))),n.createElement(m.Z,{type:"submit",size:"large",sx:{paddingRight:"40px",paddingLeft:"40px"},loading:r,loadingIndicator:"Sending...",variant:"contained"},"Send Code Via SMS"),n.createElement("p",{style:{marginTop:"10px"}},this.renderLater(i))))))}}])&&S(r.prototype,o),a&&S(r,a),Object.defineProperty(r,"prototype",{writable:!1}),t}(n.Component);const C=(0,o.$j)(null,{setUser:a.av,setCreateNewOrg:a.ZJ})(j)}}]);