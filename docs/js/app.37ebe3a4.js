(function(){"use strict";var e={866:function(e,n,t){var o=t(963),r=t(252);const l={id:"main"};function i(e,n){const t=(0,r.up)("router-view");return(0,r.wg)(),(0,r.iD)("div",l,[(0,r.Wm)(t)])}var u=t(744);const a={},c=(0,u.Z)(a,[["render",i]]);var d=c,s=t(201),f=t(655),v=t(262),p=t(577),g=t.p+"img/prograph.79df9a2d.png",m=t.p+"img/001.c3481a3e.png",h=t.p+"img/002.36efbba6.png",b=t.p+"img/003.aba9bd7a.png",y=t.p+"img/004.86e5fe5e.png",w=t(29),_=t(442),k=t.n(_),j=t(781),x=function(e){return(0,r.dD)("data-v-42b1d8a7"),e=e(),(0,r.Cn)(),e},O=x((function(){return(0,r._)("img",{style:{height:"15%"},src:g},null,-1)})),W={class:"overview"},P=x((function(){return(0,r._)("pre",{style:{"margin-left":"15px","font-size":"medium"}},"Shift\t\t: Multiple selection of nodes and edges.",-1)})),C=x((function(){return(0,r._)("pre",{style:{"margin-left":"15px","font-size":"medium"}},"Command\t: Multiple selections by specifying a range",-1)})),H=x((function(){return(0,r._)("pre",{style:{"margin-left":"15px","font-size":"medium"}},"Right Click\t: Open menu to change name and cost.",-1)})),S={style:{"text-align":"end"}},U=x((function(){return(0,r._)("img",{src:m},null,-1)})),M=x((function(){return(0,r._)("img",{src:h},null,-1)})),T=x((function(){return(0,r._)("img",{src:b},null,-1)})),E=x((function(){return(0,r._)("img",{src:y},null,-1)})),V={class:"graph-space"},N={class:"demo-control-panel"},Z={class:"frame"},q={class:"left"},z=x((function(){return(0,r._)("label",null,"Node:",-1)})),D=x((function(){return(0,r._)("label",null,"Edge:",-1)})),F={class:"right"},L=x((function(){return(0,r._)("label",null,"Position:",-1)})),B=x((function(){return(0,r._)("label",null,"LayOut:",-1)})),I={ref:"viewMenu",class:"context-menu"},G=(0,r.aZ)({__name:"Home",setup:function(e){var n=function(){function e(e){Object.defineProperty(this,"map",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"edgeMap",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_sorter",{enumerable:!0,configurable:!0,writable:!0,value:function(e,n){return parseFloat(e)-parseFloat(n)}});var n={},t={};Object.entries(e).forEach((function(e){var o=e[0],r=e[1],l=r.source,i=r.target,u=Number(r.cost);n[l]||(n[l]={}),n[i]||(n[i]={}),t[l]||(t[l]={}),t[i]||(t[i]={}),n[l][i]?n[l][i]>u&&(n[l][i]=u,n[i][l]=u,t[l][i]=o,t[i][l]=o):(n[l][i]=u,n[i][l]=u,t[l][i]=o,t[i][l]=o)})),this.map=n,this.edgeMap=t}return Object.defineProperty(e.prototype,"findShortestPath",{enumerable:!1,configurable:!0,writable:!0,value:function(e){return this._findShortestPath(this.map,e)}}),Object.defineProperty(e.prototype,"convertNodesToEdges",{enumerable:!1,configurable:!0,writable:!0,value:function(e){var n=[];if(0===e.length)return[];for(var t=e[0],o=1;o<e.length;o++){var r=e[o];n.push(this.edgeMap[t][r]),t=r}return n}}),Object.defineProperty(e.prototype,"_extractKeys",{enumerable:!1,configurable:!0,writable:!0,value:function(e){var n,t=[];for(n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.push(n);return t}}),Object.defineProperty(e.prototype,"_findPaths",{enumerable:!1,configurable:!0,writable:!0,value:function(e,n,t){var o,r={},l={0:[n]},i={},u=function(e,n){var t=""+e;l[t]||(l[t]=[]),l[t].push(n)};r[n]=0;while(l){if(!(o=this._extractKeys(l)).length)break;o.sort(this._sorter);var a=o[0],c=l[a],d=c.shift()||"",s=parseFloat(a),f=e[d]||{};for(var v in c.length||delete l[a],f)if(Object.prototype.hasOwnProperty.call(f,v)){var p=f[v],g=p+s,m=r[v];(void 0===m||m>g)&&(r[v]=g,u(g,v),i[v]=d)}}return void 0===r[t]?null:i}}),Object.defineProperty(e.prototype,"_extractShortest",{enumerable:!1,configurable:!0,writable:!0,value:function(e,n){var t=[],o=n;while(void 0!==o)t.push(o),o=e[o];return t.reverse(),t}}),Object.defineProperty(e.prototype,"_findShortestPath",{enumerable:!1,configurable:!0,writable:!0,value:function(e,n){n=(0,f.ev)([],n,!0);var t,o,r,l=n.shift()||"",i=[];while(n.length){if(t=n.shift()||"",o=this._findPaths(e,l,t),!o)return null;if(r=this._extractShortest(o,t),!n.length)return i.concat(r);i.push.apply(i,r.slice(0,-1)),l=t}}}),e}(),t=(0,v.iH)(!1),o=(0,v.qj)({}),l=(0,v.qj)({}),i=(0,v.qj)({nodes:{}}),u=(0,v.iH)(Object.keys(o).length+1),a=(0,v.iH)(Object.keys(l).length+1),c=(0,v.iH)([]),d=(0,v.iH)([]),s=(0,v.iH)(!1);var g=40,m=((0,v.iH)(1),(0,v.iH)()),h=(0,v.qj)(w.Ye());function b(e){var n,t,r,u,a;if(!(Object.keys(o).length<=1||0==Object.keys(l).length)){var c=new(k().graphlib.Graph);c.setGraph({rankdir:e,nodesep:2*g,edgesep:g,ranksep:2*g}),c.setDefaultEdgeLabel((function(){return{}})),Object.entries(o).forEach((function(e){var n=e[0],t=e[1];c.setNode(n,{label:t.name,width:g,height:g})})),Object.values(l).forEach((function(e){c.setEdge(e.source,e.target)})),k().layout(c);var d={};c.nodes().forEach((function(e){var n=c.node(e).x,t=c.node(e).y;i.nodes[e]={x:n,y:t},d.top=d.top?Math.min(d.top,t):t,d.bottom=d.bottom?Math.max(d.bottom,t):t,d.left=d.left?Math.min(d.left,n):n,d.right=d.right?Math.max(d.right,n):n}));var s=2*g,f={top:(null!==(n=d.top)&&void 0!==n?n:0)-s,bottom:(null!==(t=d.bottom)&&void 0!==t?t:0)+s,left:(null!==(r=d.left)&&void 0!==r?r:0)-s,right:(null!==(u=d.right)&&void 0!==u?u:0)+s};null===(a=m.value)||void 0===a||a.setViewBox(f)}}function y(e){var n;null===(n=m.value)||void 0===n||n.transitionWhile((function(){b(e)}))}function _(){var e="node".concat(u.value),n="N".concat(u.value);o[e]={name:n},u.value++}function x(){for(var e=0,n=c.value;e<n.length;e++){var t=n[e];delete o[t]}}function G(){if(2===c.value.length){var e=(0,f.ev)((0,f.ev)([],c.value,!0),[1,"edge"],!1),n=e[0],t=e[1],o=e[2],r=e[3],i="edge".concat(a.value);l[i]={source:n,target:t,cost:o,name:r},a.value++}}function Y(){for(var e=0,n=d.value;e<n.length;e++){var t=n[e];delete l[t]}}function K(e){delete o[e]}function R(e){delete l[e]}function A(e,n){e.style.left=n.x+"px",e.style.top=n.y+"px",e.style.visibility="visible";var t=function(n){n.target&&e.contains(n.target)||(e.style.visibility="hidden",document.removeEventListener("pointerdown",t,{capture:!0}))};document.addEventListener("pointerdown",t,{passive:!0,capture:!0})}h.node.selectable=!0,h.node.focusring.color="#B388FF",h.edge.selectable=!0,h.edge.normal.width=3,h.edge.marker={source:{type:"none",width:4,height:4,margin:-1,units:"strokeWidth",color:null},target:{type:"arrow",width:4,height:4,margin:-1,units:"strokeWidth",color:null}},h.path={visible:!0,curveInNode:!0,path:{width:14,color:"#ff000088"}},h.view.boxSelectionEnabled=!0,h.view.layoutHandler=new w.Me({grid:15}),(0,r.bv)((function(){return b("TB")}));var X=(0,v.iH)(),J=(0,v.iH)(""),Q=(0,v.iH)("");function $(e){var n,t=e.node,r=e.event;r.stopPropagation(),r.preventDefault(),X.value&&(J.value=null!==(n=o[t].name)&&void 0!==n?n:"",Q.value=null!==t&&void 0!==t?t:"",A(X.value,r))}var ee=(0,v.iH)(),ne=(0,v.iH)([]);function te(e){var n=e.event;n.stopPropagation(),n.preventDefault(),ee.value&&(ne.value=e.summarized?e.edges:[e.edge],e.edge&&(l[e.edge].name=e.edge),A(ee.value,n))}var oe=(0,v.iH)({}),re=(0,v.iH)("node2");(0,r.m0)((function(){var e=new n(l),t=e.findShortestPath(["node1",re.value]);if(t){var o=e.convertNodesToEdges(t);oe.value={shortestPath:{edges:o}}}}));var le={"view:mode":function(e){s.value="box-selection"===e},"node:contextmenu":$,"edge:contextmenu":te,"node:pointerover":function(e){var n=e.node;"node1"!==n&&(re.value=n)}};return function(e,n){var u=(0,r.up)("el-alert"),a=(0,r.up)("el-button"),s=(0,r.up)("el-carousel-item"),g=(0,r.up)("el-carousel"),b=(0,r.up)("el-dialog"),w=(0,r.up)("v-edge-label"),k=(0,r.up)("v-network-graph"),A=(0,r.up)("el-input"),$=(0,r.up)("el-form-item");return(0,r.wg)(),(0,r.iD)(r.HY,null,[O,(0,r._)("div",W,[(0,r.Wm)(u,{type:"info","show-icon":"",closable:!1},{default:(0,r.w5)((function(){return[P,C,H]})),_:1}),(0,r._)("div",S,[(0,r.Wm)(a,{type:"text",onClick:n[0]||(n[0]=function(e){return t.value=!0})},{default:(0,r.w5)((function(){return[(0,r.Uk)("Tutorial")]})),_:1})])]),(0,r.Wm)(b,{modelValue:t.value,"onUpdate:modelValue":n[1]||(n[1]=function(e){return t.value=e}),title:"Tutorial",center:""},{default:(0,r.w5)((function(){return[(0,r.Wm)(g,{style:{"text-align":"center"}},{default:(0,r.w5)((function(){return[(0,r.Wm)(s,null,{default:(0,r.w5)((function(){return[U]})),_:1}),(0,r.Wm)(s,null,{default:(0,r.w5)((function(){return[M]})),_:1}),(0,r.Wm)(s,null,{default:(0,r.w5)((function(){return[T]})),_:1}),(0,r.Wm)(s,null,{default:(0,r.w5)((function(){return[E]})),_:1})]})),_:1})]})),_:1},8,["modelValue"]),(0,r._)("div",V,[(0,r._)("div",N,[(0,r._)("div",Z,[(0,r._)("span",q,[z,(0,r.Wm)(a,{onClick:_,icon:(0,v.SU)(j.aZ7)},null,8,["icon"]),(0,r.Wm)(a,{disabled:0==c.value.length,onClick:x,icon:(0,v.SU)(j.vsd)},null,8,["disabled","icon"]),D,(0,r.Wm)(a,{disabled:2!=c.value.length,onClick:G,icon:(0,v.SU)(j.aZ7)},null,8,["disabled","icon"]),(0,r.Wm)(a,{disabled:0==d.value.length,onClick:Y,icon:(0,v.SU)(j.vsd)},null,8,["disabled","icon"])]),(0,r._)("span",F,[L,(0,r.Wm)(a,{onClick:n[2]||(n[2]=function(e){var n;return null===(n=m.value)||void 0===n?void 0:n.panToCenter()}),icon:(0,v.SU)(j.hdx)},null,8,["icon"]),(0,r.Wm)(a,{onClick:n[3]||(n[3]=function(e){var n;return null===(n=m.value)||void 0===n?void 0:n.fitToContents()}),icon:(0,v.SU)(j.ITT)},null,8,["icon"]),(0,r.Wm)(a,{onClick:n[4]||(n[4]=function(e){var n;return null===(n=m.value)||void 0===n?void 0:n.zoomIn()}),icon:(0,v.SU)(j.DYM)},null,8,["icon"]),(0,r.Wm)(a,{onClick:n[5]||(n[5]=function(e){var n;return null===(n=m.value)||void 0===n?void 0:n.zoomOut()}),icon:(0,v.SU)(j.H9A)},null,8,["icon"]),B,(0,r.Wm)(a,{onClick:n[6]||(n[6]=function(e){return y("LR")}),icon:(0,v.SU)(j.TZ)},null,8,["icon"]),(0,r.Wm)(a,{onClick:n[7]||(n[7]=function(e){return y("TB")}),icon:(0,v.SU)(j.HXv)},null,8,["icon"])])])]),(0,r.Wm)(k,{"selected-nodes":c.value,"onUpdate:selected-nodes":n[8]||(n[8]=function(e){return c.value=e}),"selected-edges":d.value,"onUpdate:selected-edges":n[9]||(n[9]=function(e){return d.value=e}),ref_key:"graph",ref:m,class:"graph",paths:oe.value,nodes:o,edges:l,layouts:i,configs:(0,v.SU)(h),"event-handlers":le},{"edge-label":(0,r.w5)((function(e){var n=e.edge,t=(0,f._T)(e,["edge"]);return[(0,r.Wm)(w,(0,r.dG)({text:"".concat(n.cost),align:"center","vertical-align":"below"},t),null,16,["text"])]})),_:1},8,["selected-nodes","selected-edges","paths","nodes","edges","layouts","configs"]),(0,r._)("div",I,"Menu for the background",512),(0,r._)("div",{ref_key:"nodeMenu",ref:X,class:"context-menu"},[(0,r.Uk)((0,p.zw)(J.value)+" ",1),(0,r._)("div",null,[(0,r.Wm)($,{label:"Name",style:{"margin-top":"15px"}},{default:(0,r.w5)((function(){return[o[Q.value]?((0,r.wg)(),(0,r.j4)(A,{key:0,modelValue:o[Q.value].name,"onUpdate:modelValue":n[10]||(n[10]=function(e){return o[Q.value].name=e})},null,8,["modelValue"])):(0,r.kq)("",!0)]})),_:1})]),(0,r._)("div",{onClick:n[11]||(n[11]=function(e){return K(Q.value)})}," 削除 ")],512),(0,r._)("div",{ref_key:"edgeMenu",ref:ee,class:"context-menu"},[(0,r._)("div",null,[(0,r.Wm)($,{label:"Name",style:{"margin-top":"15px"}},{default:(0,r.w5)((function(){return[l[ne.value.join(", ")]?((0,r.wg)(),(0,r.j4)(A,{key:0,modelValue:l[ne.value.join(", ")].name,"onUpdate:modelValue":n[12]||(n[12]=function(e){return l[ne.value.join(", ")].name=e})},null,8,["modelValue"])):(0,r.kq)("",!0)]})),_:1})]),(0,r._)("div",null,[(0,r.Wm)($,{label:"Cost",style:{"margin-top":"15px"}},{default:(0,r.w5)((function(){return[l[ne.value.join(", ")]?((0,r.wg)(),(0,r.j4)(A,{key:0,modelValue:l[ne.value.join(", ")].cost,"onUpdate:modelValue":n[13]||(n[13]=function(e){return l[ne.value.join(", ")].cost=e})},null,8,["modelValue"])):(0,r.kq)("",!0)]})),_:1})]),(0,r._)("div",{onClick:n[14]||(n[14]=function(e){return R(ne.value.join(", "))})}," 削除 ")],512)])],64)}}});const Y=(0,u.Z)(G,[["__scopeId","data-v-42b1d8a7"]]);var K=Y,R=[{path:"/",name:"home",component:K}],A=(0,s.p7)({history:(0,s.r5)(),routes:R}),X=A,J=t(27),Q=(t(834),(0,o.ri)(d));Q.use(X),Q.use(w.ZP),Q.use(J.Z),Q.mount("#app")}},n={};function t(o){var r=n[o];if(void 0!==r)return r.exports;var l=n[o]={exports:{}};return e[o].call(l.exports,l,l.exports,t),l.exports}t.m=e,function(){var e=[];t.O=function(n,o,r,l){if(!o){var i=1/0;for(d=0;d<e.length;d++){o=e[d][0],r=e[d][1],l=e[d][2];for(var u=!0,a=0;a<o.length;a++)(!1&l||i>=l)&&Object.keys(t.O).every((function(e){return t.O[e](o[a])}))?o.splice(a--,1):(u=!1,l<i&&(i=l));if(u){e.splice(d--,1);var c=r();void 0!==c&&(n=c)}}return n}l=l||0;for(var d=e.length;d>0&&e[d-1][2]>l;d--)e[d]=e[d-1];e[d]=[o,r,l]}}(),function(){t.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(n,{a:n}),n}}(),function(){t.d=function(e,n){for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)}}(),function(){t.p=""}(),function(){var e={143:0};t.O.j=function(n){return 0===e[n]};var n=function(n,o){var r,l,i=o[0],u=o[1],a=o[2],c=0;if(i.some((function(n){return 0!==e[n]}))){for(r in u)t.o(u,r)&&(t.m[r]=u[r]);if(a)var d=a(t)}for(n&&n(o);c<i.length;c++)l=i[c],t.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return t.O(d)},o=self["webpackChunkclient"]=self["webpackChunkclient"]||[];o.forEach(n.bind(null,0)),o.push=n.bind(null,o.push.bind(o))}();var o=t.O(void 0,[998],(function(){return t(866)}));o=t.O(o)})();
//# sourceMappingURL=app.37ebe3a4.js.map