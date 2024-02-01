function Q(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter(function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable})),r.push.apply(r,o)}return r}function k(t){for(var e=1;e<arguments.length;e++){var r=arguments[e]!=null?arguments[e]:{};e%2?Q(Object(r),!0).forEach(function(o){Ot(t,o,r[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):Q(Object(r)).forEach(function(o){Object.defineProperty(t,o,Object.getOwnPropertyDescriptor(r,o))})}return t}function A(t){return A=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},A(t)}function Ot(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var W,St={Webkit:"-webkit-",Moz:"-moz-",ms:"-ms-",O:"-o-"};function B(){if(W!==void 0)return W;W="";var t=document.createElement("p").style,e="Transform";for(var r in St)r+e in t&&(W=r);return W}function lt(){return B()?"".concat(B(),"TransitionProperty"):"transitionProperty"}function Y(){return B()?"".concat(B(),"Transform"):"transform"}function tt(t,e){var r=lt();r&&(t.style[r]=e,r!=="transitionProperty"&&(t.style.transitionProperty=e))}function j(t,e){var r=Y();r&&(t.style[r]=e,r!=="transform"&&(t.style.transform=e))}function Tt(t){return t.style.transitionProperty||t.style[lt()]}function Wt(t){var e=window.getComputedStyle(t,null),r=e.getPropertyValue("transform")||e.getPropertyValue(Y());if(r&&r!=="none"){var o=r.replace(/[^0-9\-.,]/g,"").split(",");return{x:parseFloat(o[12]||o[4],0),y:parseFloat(o[13]||o[5],0)}}return{x:0,y:0}}var Pt=/matrix\((.*)\)/,Et=/matrix3d\((.*)\)/;function Ct(t,e){var r=window.getComputedStyle(t,null),o=r.getPropertyValue("transform")||r.getPropertyValue(Y());if(o&&o!=="none"){var n,i=o.match(Pt);if(i)i=i[1],n=i.split(",").map(function(f){return parseFloat(f,10)}),n[4]=e.x,n[5]=e.y,j(t,"matrix(".concat(n.join(","),")"));else{var a=o.match(Et)[1];n=a.split(",").map(function(f){return parseFloat(f,10)}),n[12]=e.x,n[13]=e.y,j(t,"matrix3d(".concat(n.join(","),")"))}}else j(t,"translateX(".concat(e.x,"px) translateY(").concat(e.y,"px) translateZ(0)"))}var Mt=/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,C;function rt(t){var e=t.style.display;t.style.display="none",t.offsetHeight,t.style.display=e}function S(t,e,r){var o=r;if(A(e)==="object"){for(var n in e)e.hasOwnProperty(n)&&S(t,n,e[n]);return}if(typeof o!="undefined"){typeof o=="number"&&(o="".concat(o,"px")),t.style[e]=o;return}return C(t,e)}function Xt(t){var e,r,o,n=t.ownerDocument,i=n.body,a=n&&n.documentElement;return e=t.getBoundingClientRect(),r=Math.floor(e.left),o=Math.floor(e.top),r-=a.clientLeft||i.clientLeft||0,o-=a.clientTop||i.clientTop||0,{left:r,top:o}}function vt(t,e){var r=t["page".concat(e?"Y":"X","Offset")],o="scroll".concat(e?"Top":"Left");if(typeof r!="number"){var n=t.document;r=n.documentElement[o],typeof r!="number"&&(r=n.body[o])}return r}function dt(t){return vt(t)}function ht(t){return vt(t,!0)}function E(t){var e=Xt(t),r=t.ownerDocument,o=r.defaultView||r.parentWindow;return e.left+=dt(o),e.top+=ht(o),e}function _(t){return t!=null&&t==t.window}function gt(t){return _(t)?t.document:t.nodeType===9?t:t.ownerDocument}function Vt(t,e,r){var o=r,n="",i=gt(t);return o=o||i.defaultView.getComputedStyle(t,null),o&&(n=o.getPropertyValue(e)||o[e]),n}var Dt=new RegExp("^(".concat(Mt,")(?!px)[a-z%]+$"),"i"),Bt=/^(top|right|bottom|left)$/,I="currentStyle",F="runtimeStyle",O="left",Yt="px";function Ht(t,e){var r=t[I]&&t[I][e];if(Dt.test(r)&&!Bt.test(e)){var o=t.style,n=o[O],i=t[F][O];t[F][O]=t[I][O],o[O]=e==="fontSize"?"1em":r||0,r=o.pixelLeft+Yt,o[O]=n,t[F][O]=i}return r===""?"auto":r}typeof window!="undefined"&&(C=window.getComputedStyle?Vt:Ht);function M(t,e){return t==="left"?e.useCssRight?"right":t:e.useCssBottom?"bottom":t}function et(t){if(t==="left")return"right";if(t==="right")return"left";if(t==="top")return"bottom";if(t==="bottom")return"top"}function ot(t,e,r){S(t,"position")==="static"&&(t.style.position="relative");var o=-999,n=-999,i=M("left",r),a=M("top",r),f=et(i),s=et(a);i!=="left"&&(o=999),a!=="top"&&(n=999);var l="",h=E(t);("left"in e||"top"in e)&&(l=Tt(t)||"",tt(t,"none")),"left"in e&&(t.style[f]="",t.style[i]="".concat(o,"px")),"top"in e&&(t.style[s]="",t.style[a]="".concat(n,"px")),rt(t);var w=E(t),p={};for(var c in e)if(e.hasOwnProperty(c)){var v=M(c,r),d=c==="left"?o:n,x=h[c]-w[c];v===c?p[v]=d+x:p[v]=d-x}S(t,p),rt(t),("left"in e||"top"in e)&&tt(t,l);var m={};for(var g in e)if(e.hasOwnProperty(g)){var b=M(g,r),T=e[g]-h[g];g===b?m[b]=p[b]+T:m[b]=p[b]-T}S(t,m)}function Nt(t,e){var r=E(t),o=Wt(t),n={x:o.x,y:o.y};"left"in e&&(n.x=o.x+e.left-r.left),"top"in e&&(n.y=o.y+e.top-r.top),Ct(t,n)}function Lt(t,e,r){if(r.ignoreShake){var o=E(t),n=o.left.toFixed(0),i=o.top.toFixed(0),a=e.left.toFixed(0),f=e.top.toFixed(0);if(n===a&&i===f)return}r.useCssRight||r.useCssBottom?ot(t,e,r):r.useCssTransform&&Y()in document.body.style?Nt(t,e):ot(t,e,r)}function G(t,e){for(var r=0;r<t.length;r++)e(t[r])}function yt(t){return C(t,"boxSizing")==="border-box"}var jt=["margin","border","padding"],R=-1,It=2,U=1,Ft=0;function zt(t,e,r){var o={},n=t.style,i;for(i in e)e.hasOwnProperty(i)&&(o[i]=n[i],n[i]=e[i]);r.call(t);for(i in e)e.hasOwnProperty(i)&&(n[i]=o[i])}function P(t,e,r){var o=0,n,i,a;for(i=0;i<e.length;i++)if(n=e[i],n)for(a=0;a<r.length;a++){var f=void 0;n==="border"?f="".concat(n).concat(r[a],"Width"):f=n+r[a],o+=parseFloat(C(t,f))||0}return o}var y={getParent:function(e){var r=e;do r.nodeType===11&&r.host?r=r.host:r=r.parentNode;while(r&&r.nodeType!==1&&r.nodeType!==9);return r}};G(["Width","Height"],function(t){y["doc".concat(t)]=function(e){var r=e.document;return Math.max(r.documentElement["scroll".concat(t)],r.body["scroll".concat(t)],y["viewport".concat(t)](r))},y["viewport".concat(t)]=function(e){var r="client".concat(t),o=e.document,n=o.body,i=o.documentElement,a=i[r];return o.compatMode==="CSS1Compat"&&a||n&&n[r]||a}});function nt(t,e,r){var o=r;if(_(t))return e==="width"?y.viewportWidth(t):y.viewportHeight(t);if(t.nodeType===9)return e==="width"?y.docWidth(t):y.docHeight(t);var n=e==="width"?["Left","Right"]:["Top","Bottom"],i=Math.floor(e==="width"?t.getBoundingClientRect().width:t.getBoundingClientRect().height),a=yt(t),f=0;(i==null||i<=0)&&(i=void 0,f=C(t,e),(f==null||Number(f)<0)&&(f=t.style[e]||0),f=Math.floor(parseFloat(f))||0),o===void 0&&(o=a?U:R);var s=i!==void 0||a,l=i||f;return o===R?s?l-P(t,["border","padding"],n):f:s?o===U?l:l+(o===It?-P(t,["border"],n):P(t,["margin"],n)):f+P(t,jt.slice(o),n)}var At={position:"absolute",visibility:"hidden",display:"block"};function it(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];var o,n=e[0];return n.offsetWidth!==0?o=nt.apply(void 0,e):zt(n,At,function(){o=nt.apply(void 0,e)}),o}G(["width","height"],function(t){var e=t.charAt(0).toUpperCase()+t.slice(1);y["outer".concat(e)]=function(o,n){return o&&it(o,t,n?Ft:U)};var r=t==="width"?["Left","Right"]:["Top","Bottom"];y[t]=function(o,n){var i=n;if(i!==void 0){if(o){var a=yt(o);return a&&(i+=P(o,["padding","border"],r)),S(o,t,i)}return}return o&&it(o,t,R)}});function wt(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r]);return t}var u={getWindow:function(e){if(e&&e.document&&e.setTimeout)return e;var r=e.ownerDocument||e;return r.defaultView||r.parentWindow},getDocument:gt,offset:function(e,r,o){if(typeof r!="undefined")Lt(e,r,o||{});else return E(e)},isWindow:_,each:G,css:S,clone:function(e){var r,o={};for(r in e)e.hasOwnProperty(r)&&(o[r]=e[r]);var n=e.overflow;if(n)for(r in e)e.hasOwnProperty(r)&&(o.overflow[r]=e.overflow[r]);return o},mix:wt,getWindowScrollLeft:function(e){return dt(e)},getWindowScrollTop:function(e){return ht(e)},merge:function(){for(var e={},r=0;r<arguments.length;r++)u.mix(e,r<0||arguments.length<=r?void 0:arguments[r]);return e},viewportWidth:0,viewportHeight:0};wt(u,y);var z=u.getParent;function $(t){if(u.isWindow(t)||t.nodeType===9)return null;var e=u.getDocument(t),r=e.body,o,n=u.css(t,"position"),i=n==="fixed"||n==="absolute";if(!i)return t.nodeName.toLowerCase()==="html"?null:z(t);for(o=z(t);o&&o!==r&&o.nodeType!==9;o=z(o))if(n=u.css(o,"position"),n!=="static")return o;return null}var at=u.getParent;function Rt(t){if(u.isWindow(t)||t.nodeType===9)return!1;var e=u.getDocument(t),r=e.body,o=null;for(o=at(t);o&&o!==r&&o!==e;o=at(o)){var n=u.css(o,"position");if(n==="fixed")return!0}return!1}function K(t,e){for(var r={left:0,right:1/0,top:0,bottom:1/0},o=$(t),n=u.getDocument(t),i=n.defaultView||n.parentWindow,a=n.body,f=n.documentElement;o;){if((navigator.userAgent.indexOf("MSIE")===-1||o.clientWidth!==0)&&o!==a&&o!==f&&u.css(o,"overflow")!=="visible"){var s=u.offset(o);s.left+=o.clientLeft,s.top+=o.clientTop,r.top=Math.max(r.top,s.top),r.right=Math.min(r.right,s.left+o.clientWidth),r.bottom=Math.min(r.bottom,s.top+o.clientHeight),r.left=Math.max(r.left,s.left)}else if(o===a||o===f)break;o=$(o)}var l=null;if(!u.isWindow(t)&&t.nodeType!==9){l=t.style.position;var h=u.css(t,"position");h==="absolute"&&(t.style.position="fixed")}var w=u.getWindowScrollLeft(i),p=u.getWindowScrollTop(i),c=u.viewportWidth(i),v=u.viewportHeight(i),d=f.scrollWidth,x=f.scrollHeight,m=window.getComputedStyle(a);if(m.overflowX==="hidden"&&(d=i.innerWidth),m.overflowY==="hidden"&&(x=i.innerHeight),t.style&&(t.style.position=l),e||Rt(t))r.left=Math.max(r.left,w),r.top=Math.max(r.top,p),r.right=Math.min(r.right,w+c),r.bottom=Math.min(r.bottom,p+v);else{var g=Math.max(d,w+c);r.right=Math.min(r.right,g);var b=Math.max(x,p+v);r.bottom=Math.min(r.bottom,b)}return r.top>=0&&r.left>=0&&r.bottom>r.top&&r.right>r.left?r:null}function Ut(t,e,r,o){var n=u.clone(t),i={width:e.width,height:e.height};return o.adjustX&&n.left<r.left&&(n.left=r.left),o.resizeWidth&&n.left>=r.left&&n.left+i.width>r.right&&(i.width-=n.left+i.width-r.right),o.adjustX&&n.left+i.width>r.right&&(n.left=Math.max(r.right-i.width,r.left)),o.adjustY&&n.top<r.top&&(n.top=r.top),o.resizeHeight&&n.top>=r.top&&n.top+i.height>r.bottom&&(i.height-=n.top+i.height-r.bottom),o.adjustY&&n.top+i.height>r.bottom&&(n.top=Math.max(r.bottom-i.height,r.top)),u.mix(n,i)}function Z(t){var e,r,o;if(!u.isWindow(t)&&t.nodeType!==9)e=u.offset(t),r=u.outerWidth(t),o=u.outerHeight(t);else{var n=u.getWindow(t);e={left:u.getWindowScrollLeft(n),top:u.getWindowScrollTop(n)},r=u.viewportWidth(n),o=u.viewportHeight(n)}return e.width=r,e.height=o,e}function ft(t,e){var r=e.charAt(0),o=e.charAt(1),n=t.width,i=t.height,a=t.left,f=t.top;return r==="c"?f+=i/2:r==="b"&&(f+=i),o==="c"?a+=n/2:o==="r"&&(a+=n),{left:a,top:f}}function X(t,e,r,o,n){var i=ft(e,r[1]),a=ft(t,r[0]),f=[a.left-i.left,a.top-i.top];return{left:Math.round(t.left-f[0]+o[0]-n[0]),top:Math.round(t.top-f[1]+o[1]-n[1])}}function ut(t,e,r){return t.left<r.left||t.left+e.width>r.right}function ct(t,e,r){return t.top<r.top||t.top+e.height>r.bottom}function $t(t,e,r){return t.left>r.right||t.left+e.width<r.left}function _t(t,e,r){return t.top>r.bottom||t.top+e.height<r.top}function V(t,e,r){var o=[];return u.each(t,function(n){o.push(n.replace(e,function(i){return r[i]}))}),o}function D(t,e){return t[e]=-t[e],t}function st(t,e){var r;return/%$/.test(t)?r=parseInt(t.substring(0,t.length-1),10)/100*e:r=parseInt(t,10),r||0}function pt(t,e){t[0]=st(t[0],e.width),t[1]=st(t[1],e.height)}function mt(t,e,r,o){var n=r.points,i=r.offset||[0,0],a=r.targetOffset||[0,0],f=r.overflow,s=r.source||t;i=[].concat(i),a=[].concat(a),f=f||{};var l={},h=0,w=!!(f&&f.alwaysByViewport),p=K(s,w),c=Z(s);pt(i,c),pt(a,e);var v=X(c,e,n,i,a),d=u.merge(c,v);if(p&&(f.adjustX||f.adjustY)&&o){if(f.adjustX&&ut(v,c,p)){var x=V(n,/[lr]/gi,{l:"r",r:"l"}),m=D(i,0),g=D(a,0),b=X(c,e,x,m,g);$t(b,c,p)||(h=1,n=x,i=m,a=g)}if(f.adjustY&&ct(v,c,p)){var T=V(n,/[tb]/gi,{t:"b",b:"t"}),q=D(i,1),J=D(a,1),xt=X(c,e,T,q,J);_t(xt,c,p)||(h=1,n=T,i=q,a=J)}h&&(v=X(c,e,n,i,a),u.mix(d,v));var H=ut(v,c,p),N=ct(v,c,p);if(H||N){var L=n;H&&(L=V(n,/[lr]/gi,{l:"r",r:"l"})),N&&(L=V(n,/[tb]/gi,{t:"b",b:"t"})),n=L,i=r.offset||[0,0],a=r.targetOffset||[0,0]}l.adjustX=f.adjustX&&H,l.adjustY=f.adjustY&&N,(l.adjustX||l.adjustY)&&(d=Ut(v,c,p,l))}return d.width!==c.width&&u.css(s,"width",u.width(s)+d.width-c.width),d.height!==c.height&&u.css(s,"height",u.height(s)+d.height-c.height),u.offset(s,{left:d.left,top:d.top},{useCssRight:r.useCssRight,useCssBottom:r.useCssBottom,useCssTransform:r.useCssTransform,ignoreShake:r.ignoreShake}),{points:n,offset:i,targetOffset:a,overflow:l}}function Gt(t,e){var r=K(t,e),o=Z(t);return!r||o.left+o.width<=r.left||o.top+o.height<=r.top||o.left>=r.right||o.top>=r.bottom}function bt(t,e,r){var o=r.target||e,n=Z(o),i=!Gt(o,r.overflow&&r.overflow.alwaysByViewport);return mt(t,n,r,i)}bt.__getOffsetParent=$;bt.__getVisibleRectForElement=K;function Kt(t,e,r){var o,n,i=u.getDocument(t),a=i.defaultView||i.parentWindow,f=u.getWindowScrollLeft(a),s=u.getWindowScrollTop(a),l=u.viewportWidth(a),h=u.viewportHeight(a);"pageX"in e?o=e.pageX:o=f+e.clientX,"pageY"in e?n=e.pageY:n=s+e.clientY;var w={left:o,top:n,width:0,height:0},p=o>=0&&o<=f+l&&n>=0&&n<=s+h,c=[r.points[0],"cc"];return mt(t,w,k(k({},r),{},{points:c}),p)}export{bt as a,Kt as b};
