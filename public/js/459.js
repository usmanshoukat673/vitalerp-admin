"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[459],{80459:(e,t,r)=>{r.r(t),r.d(t,{default:()=>P});var n=r(96540),o=r(8321),a=r(2543),i=r.n(a),s=r(75659),c=r(81429),u=r(84719),l=r(33551),p=r(1043),f=r(51629),d=r(46942),m=r.n(d),h=r(67438),y=r(11512);function g(e){return g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},g(e)}function b(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,O(n.key),n)}}function v(e,t,r){return t=S(t),function(e,t){if(t&&("object"==g(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}(e,x()?Reflect.construct(t,r||[],S(e).constructor):t.apply(e,r))}function x(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(x=function(){return!!e})()}function S(e){return S=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},S(e)}function w(e,t){return w=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},w(e,t)}function E(e,t,r){return(t=O(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function O(e){var t=function(e,t){if("object"!=g(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t||"default");if("object"!=g(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==g(t)?t:t+""}var _=function(e){function t(e){var r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),E(r=v(this,t,[e]),"state",{code:"",id:"",errors:[],loading:!1,loading_resend:!1,enable_resend:!0}),E(r,"setID",(function(){var e=r.props.match.params.token;i().isEmpty(e)||r.state.id===e||r.setState({id:e})})),E(r,"handleChange",(function(e){r.setState(E({},e.target.name,e.target.value));var t=r.state.errors;t.length>0&&t[0].hasOwnProperty(e.target.name)&&(delete t[0][e.target.name],r.setState({errors:t}))})),E(r,"handlerInputError",(function(e,t){return e.some((function(e){return e.hasOwnProperty(t)}))?"error":""})),E(r,"displayInputError",(function(e,t){return e.some((function(e){return e.hasOwnProperty(t)}))?n.createElement("p",{style:{marginTop:"5px"},className:"form-error-messsage"},e[0][t]):""})),E(r,"handleSubmit",(function(e){e.preventDefault(),r.setState({errors:[],loading:!0}),y.A.post("/api/user/verify-otp",r.state).then((function(e){r.setState({code:"",errors:[],loading:!1}),r.props.setUser(e.data.user),r.props.history.push("/select-organization"),c.hm.success("Multi-Factor Authentication has been successfully configured.","Success")})).catch((function(e){500===e.response.status&&r.setState({errors:[],loading:!1}),422===e.response.status&&r.setState({errors:r.state.errors.concat(e.response.data.errors),loading:!1})}))})),E(r,"handleResendVerificationCode",(function(e){e.preventDefault(),r.setState({errors:[],loading_resend:!0}),y.A.post("/api/user/resend-otp",r.state).then((function(e){r.setState({errors:[],loading_resend:!1}),r.props.setUser(e.data.user),r.props.history.push("/user/verify-phone/".concat(e.data.id))})).catch((function(e){500===e.response.status&&r.setState({errors:[],loading_resend:!1}),422===e.response.status&&r.setState({errors:r.state.errors.concat(e.response.data.errors),loading_resend:!1})}))})),setTimeout(function(){this.setState({enable_resend:!1})}.bind(r),6e4),r.props.setCreateNewOrg({open:!1,in_org:!1}),r}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&w(e,t)}(t,e),r=t,(o=[{key:"componentDidMount",value:function(){this.setID()}},{key:"componentDidUpdate",value:function(e){this.setID()}},{key:"render",value:function(){var e=this.state,t=e.errors,r=e.loading,o=e.code,a=e.loading_resend;return n.createElement(u.A,{sx:{display:"flex",marginTop:"30px"}},n.createElement(u.A,{sx:{flex:"0.5",marginRight:"50px",marginTop:"50px",fontSize:"19px"}}),n.createElement(u.A,{sx:{flex:"0.5",padding:"20px",borderRadius:"6px",mt:"50px"}},n.createElement(l.A,{variant:"h4",sx:{color:"#fff"}},"Multi-Factor Authentication"),n.createElement(l.A,{sx:{marginBottom:"50px",color:"#fff"}},"Enter a verification code"),n.createElement("p",{style:{color:"#fff"}},"Please enter verification code which is sent via SMS on your mobile number, please note verification code will expire in 2 minutes."),n.createElement("form",{className:"",onSubmit:this.handleSubmit},n.createElement(u.A,{sx:{marginBottom:"15px",width:"45%"}},n.createElement(p.A,{fullWidth:!0,label:"Verification Code",variant:"outlined",onChange:this.handleChange,name:"code",value:o,className:m()(this.handlerInputError(t,"code"),"build__input")}),this.displayInputError(t,"code")),n.createElement(u.A,{sx:{display:"flex"}},n.createElement(h.A,{type:"submit",size:"large",sx:{paddingRight:"40px",paddingLeft:"40px",marginRight:"20px"},loading:r,loadingIndicator:"Verifing...",variant:"contained"},"Verify"),n.createElement(f.A,{type:"button",size:"large",onClick:this.handleResendVerificationCode,sx:{paddingRight:"40px",paddingLeft:"40px"},disabled:a,variant:"outlined"},"Resend new Code?")))))}}])&&b(r.prototype,o),a&&b(r,a),Object.defineProperty(r,"prototype",{writable:!1}),r;var r,o,a}(n.Component);const P=(0,o.Ng)(null,{setUser:s.gV,setCreateNewOrg:s.vm})(_)}}]);