"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[468],{50468:(e,t,n)=>{n.r(t),n.d(t,{default:()=>h});var r=n(67294),o=n(68156),i=n(80333),u=n(99226),a=n(23972);function c(e){return c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},c(e)}function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,b(r.key),r)}}function f(e,t,n){return t=s(t),function(e,t){if(t&&("object"===c(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return y(e)}(e,p()?Reflect.construct(t,n||[],s(e).constructor):t.apply(e,n))}function p(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(p=function(){return!!e})()}function s(e){return s=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},s(e)}function y(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function m(e,t){return m=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},m(e,t)}function b(e){var t=function(e,t){if("object"!=c(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!=c(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==c(t)?t:String(t)}const h=function(e){function t(){var e,n,r,o;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var i=arguments.length,u=new Array(i),a=0;a<i;a++)u[a]=arguments[a];return e=f(this,t,[].concat(u)),n=y(e),o={email:""},(r=b(r="state"))in n?Object.defineProperty(n,r,{value:o,enumerable:!0,configurable:!0,writable:!0}):n[r]=o,e}var n,c,p;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&m(e,t)}(t,e),n=t,(c=[{key:"componentDidMount",value:function(){var e=this.props.match.params.email;this.setState({email:e})}},{key:"componentWillUnmount",value:function(){this.setState=function(e,t){}}},{key:"render",value:function(){var e=this.state.email;return r.createElement(r.Fragment,null,r.createElement(i.Z,{signup:!0}),r.createElement(u.Z,{sx:{display:"flex",marginTop:"30px"}},r.createElement(u.Z,{sx:{flex:"0.5",marginRight:"50px",marginTop:"50px",fontSize:"19px"}}),r.createElement(u.Z,{sx:{flex:"0.5",padding:"20px",borderRadius:"6px",mt:"50px"},className:"_auth__right"},r.createElement(a.Z,{variant:"h4"},"Account Created successfully."),r.createElement(o.Z,{color:"blue"},"You're almost there! We have sent an email to ",r.createElement("strong",null,e)," with login creditials, please check your inbox."),r.createElement("p",null,"If you don't see it, you may need to ",r.createElement("b",null,"check your spam")," folder"))))}}])&&l(n.prototype,c),p&&l(n,p),Object.defineProperty(n,"prototype",{writable:!1}),t}(r.Component)}}]);