(function(e){function n(n){for(var c,r,i=n[0],u=n[1],l=n[2],d=0,f=[];d<i.length;d++)r=i[d],Object.prototype.hasOwnProperty.call(o,r)&&o[r]&&f.push(o[r][0]),o[r]=0;for(c in u)Object.prototype.hasOwnProperty.call(u,c)&&(e[c]=u[c]);s&&s(n);while(f.length)f.shift()();return a.push.apply(a,l||[]),t()}function t(){for(var e,n=0;n<a.length;n++){for(var t=a[n],c=!0,i=1;i<t.length;i++){var u=t[i];0!==o[u]&&(c=!1)}c&&(a.splice(n--,1),e=r(r.s=t[0]))}return e}var c={},o={app:0},a=[];function r(n){if(c[n])return c[n].exports;var t=c[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,r),t.l=!0,t.exports}r.m=e,r.c=c,r.d=function(e,n,t){r.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,n){if(1&n&&(e=r(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(r.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var c in e)r.d(t,c,function(n){return e[n]}.bind(null,c));return t},r.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(n,"a",n),n},r.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},r.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],u=i.push.bind(i);i.push=n,i=i.slice();for(var l=0;l<i.length;l++)n(i[l]);var s=u;a.push([1,"chunk-vendors"]),t()})({0:function(e,n){},1:function(e,n,t){e.exports=t("cd49")},cd49:function(e,n,t){"use strict";t.r(n);t("e260"),t("e6cf"),t("cca6"),t("a79d");var c=t("7a23"),o={id:"app"};function a(e,n,t,a,r,i){var u=Object(c["K"])("router-view");return Object(c["C"])(),Object(c["j"])("div",o,[Object(c["m"])(u)])}var r=Object(c["n"])({name:"App"}),i=(t("f085"),t("6b0d")),u=t.n(i),l=u()(r,[["render",a]]),s=t("6c02"),d=(t("caad"),t("2532"),t("b0c0"),function(e){return Object(c["F"])("data-v-e3416154"),e=e(),Object(c["D"])(),e}),f={class:"header"},b=d((function(){return Object(c["k"])("h1",{class:"title"},"Fuente",-1)})),p={class:"section"},O={class:"main"},j={key:0,class:"upload"},m={class:"upload-container"},v=d((function(){return Object(c["k"])("p",{class:"upload-description"},"点击或者拖拽字体文件到此区域",-1)})),h={key:1,class:"icons"},y=["onClick","innerHTML"],g=["onClick"],C=["onClick"],k={class:"drawer-header"},w=d((function(){return Object(c["k"])("span",{style:{"margin-left":"6px"}},"全部清除",-1)})),x=Object(c["l"])("下载");function U(e,n,t,o,a,r){var i=Object(c["K"])("ShoppingCartOutlined"),u=Object(c["K"])("Badge"),l=Object(c["K"])("UploadOutlined"),s=Object(c["K"])("Upload"),d=Object(c["K"])("ClearOutlined"),U=Object(c["K"])("Button"),_=Object(c["K"])("Drawer");return Object(c["C"])(),Object(c["j"])(c["b"],null,[Object(c["k"])("header",f,[b,Object(c["k"])("section",p,[Object(c["m"])(u,{count:e.icons.length,onClick:e.onShowDrawer,style:{cursor:"pointer"}},{default:Object(c["U"])((function(){return[Object(c["m"])(i,{style:{"font-size":"24px"}})]})),_:1},8,["count","onClick"])])]),Object(c["k"])("main",O,[e.list.length?(Object(c["C"])(),Object(c["j"])("ul",h,[(Object(c["C"])(!0),Object(c["j"])(c["b"],null,Object(c["J"])(e.list,(function(n){return Object(c["C"])(),Object(c["j"])("li",{class:Object(c["t"])([{"icons-item-selected":e.icons.includes(n.name)},"icons-item"]),key:n.unicode},[Object(c["k"])("div",{onClick:function(t){return e.onAddCart(n.name)},class:"iconfont icon",innerHTML:n.unicode},null,8,y),Object(c["k"])("div",{onClick:function(t){return e.onCopy(n.name)},class:"icon-name",title:"点击复制"},Object(c["N"])(n.name),9,g),Object(c["k"])("div",{onClick:function(t){return e.onCopy(n.unicode)},class:"icon-unicode",title:"点击复制"},Object(c["N"])(n.unicode),9,C)],2)})),128))])):(Object(c["C"])(),Object(c["j"])("div",j,[Object(c["m"])(s,{beforeUpload:function(){return!1},showUploadList:!1,onChange:e.onFileChange},{default:Object(c["U"])((function(){return[Object(c["k"])("div",m,[Object(c["m"])(l,{style:{"font-size":"30px"}}),v])]})),_:1},8,["beforeUpload","onChange"])]))]),Object(c["m"])(_,{visible:e.visible,onClose:n[1]||(n[1]=function(n){return e.visible=!1}),closable:!1},{default:Object(c["U"])((function(){return[Object(c["k"])("header",k,[Object(c["m"])(u,{count:e.icons.length},{default:Object(c["U"])((function(){return[Object(c["m"])(i,{style:{"font-size":"30px"}})]})),_:1},8,["count"]),Object(c["k"])("div",{class:"drawer-clear",onClick:n[0]||(n[0]=function(n){return e.icons=[]})},[Object(c["m"])(d,{style:{"font-size":"18px"}}),w])]),Object(c["m"])(U,{shape:"round",block:"",onClick:e.onDownload},{default:Object(c["U"])((function(){return[x]})),_:1},8,["onClick"])]})),_:1},8,["visible"])],64)}var _=t("5530"),P=(t("380f"),t("f64c")),D=(t("b846"),t("a071")),S=(t("153b"),t("9571")),F=(t("e1f5"),t("5efb")),H=(t("7a59"),t("39ab")),K=(t("99af"),t("a434"),t("d81d"),t("4de4"),t("a788")),A=t("5816"),M=t("5f89"),z=t("8f69"),B=Object(c["n"])({components:{Upload:H["a"].Dragger,ShoppingCartOutlined:A["a"],UploadOutlined:M["a"],ClearOutlined:z["a"],Button:F["a"],Drawer:S["a"],Badge:D["a"]},setup:function(){var e=Object(c["H"])({}),n=Object(c["H"])([]),t=Object(c["H"])([]),o=Object(c["H"])(!1),a=function(e){var n=document.createElement("input");document.body.appendChild(n),n.setAttribute("value",e),n.select(),document.execCommand("copy")&&(document.execCommand("copy"),P["a"].success("".concat(e," 复制成功"))),document.body.removeChild(n)},r=function(e){for(var n=[],t=0;t<e.length;t++){var c=e.get(t),o=c.name,a=c.unicode;o&&".notdef"!==o&&n.push({name:o,unicode:"&#".concat(a,";"),glyph:c})}return n},i=function(n){var t=document.createElement("style"),c=e.value.familyName;t.innerHTML="\n        @font-face {\n          font-family: '".concat(c,"';\n          src: url('").concat(n,"') format('truetype');\n        }\n        .iconfont {\n          font-family: '").concat(c,"' !important;\n          font-size: 16px;\n          font-style: normal;\n          -webkit-font-smoothing: antialiased;\n          -moz-osx-font-smoothing: grayscale;\n        }"),document.body.append(t)},u=function(n){var c=n.file,o=new FileReader;o.readAsArrayBuffer(c),o.onload=function(n){var c=n.target;if(c){var o=K["a"].parse(c.result),a=o.glyphs,i=o.unitsPerEm,u=o.ascender,l=o.descender,s=o.names,d=s.fontFamily.en;e.value={styleName:d,familyName:d,unitsPerEm:i,descender:l,ascender:u},t.value=r(a)}};var a=new FileReader;a.readAsDataURL(c),a.onload=function(e){var n=e.target;n&&i(n.result)}},l=function(e){n.value.includes(e)?n.value.splice(n.value.indexOf(e),1):n.value.push(e)},s=function(){n.value.length>0?o.value=!0:P["a"].warn("请至少选择一个图标")},d=function(){var o=Object(c["O"])(t.value).filter((function(e){var t=e.name;return n.value.includes(t)})).map((function(e){var n=e.glyph;return n}));0!==o.length&&(o.unshift(new K["a"].Glyph({path:new K["a"].Path,advanceWidth:650,name:".notdef",unicode:0})),new K["a"].Font(Object(_["a"])(Object(_["a"])({},e.value),{},{glyphs:o})).download())};return{onFileChange:u,onShowDrawer:s,onDownload:d,onAddCart:l,visible:o,onCopy:a,icons:n,list:t}}}),L=(t("f42d"),u()(B,[["render",U],["__scopeId","data-v-e3416154"]])),N=[{path:"/",name:"Home",component:L}],T=Object(s["a"])({history:Object(s["b"])("/"),routes:N}),E=T;Object(c["i"])(l).use(E).mount("#app")},f085:function(e,n,t){"use strict";t("fcd5")},f206:function(e,n,t){},f42d:function(e,n,t){"use strict";t("f206")},fcd5:function(e,n,t){}});
//# sourceMappingURL=app.59a77746.js.map