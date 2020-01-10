(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0fab5674"],{"0eaf":function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"dataplanes"},[e("DataOverview",{attrs:{"has-error":t.hasError,"is-loading":t.isLoading,"is-empty":t.isEmpty,"empty-state":t.empty_state,"display-data-table":!0,"table-data":t.tableData,"table-data-is-empty":t.tableDataIsEmpty,"table-actions-route-name":"dataplane-details"},on:{reloadData:t.bootstrap}},[e("template",{slot:"tableDataActionsLinkText"},[t._v("\n      View\n    ")])],2)],1)},s=[],i=(e("55dd"),e("7f7f"),e("ac6a"),e("d7c2")),r=e("2778"),o={name:"Dataplanes",components:{DataOverview:r["a"]},data:function(){return{isLoading:!0,isEmpty:!1,hasError:!1,tableDataIsEmpty:!1,empty_state:{title:"No Data",message:"There are no Dataplanes present."},tableData:{headers:[{label:"Status",key:"status"},{label:"Name",key:"name"},{label:"Mesh",key:"mesh"},{label:"Tags",key:"tags"},{label:"Last Connected",key:"lastConnected"},{label:"Last Updated",key:"lastUpdated"},{label:"Total Updates",key:"totalUpdates"},{key:"actions",hideLabel:!0}],data:[]}}},watch:{$route:function(t,a){this.bootstrap()}},beforeMount:function(){this.bootstrap()},methods:{bootstrap:function(){var t=this;this.isLoading=!0,this.isEmpty=!1;var a=this.$route.params.mesh,e=function(){return t.$api.getAllDataplanesFromMesh(a).then((function(e){if(e.items.length>0){var n=e.items,s=[];n.forEach((function(e){t.$api.getDataplaneOverviews(a,e.name).then((function(t){var a,e,n="n/a",r=n,o=[],l="Offline",c=[],u=[],d=t.dataplane.networking.inbound,p=t.dataplane.networking.gateway;if(d||p)if(d)for(var f=0;f<d.length;f++)r=Object(i["a"])(d[f].tags);else p&&(r=Object(i["a"])(p.tags));if(t.dataplaneInsight.subscriptions&&t.dataplaneInsight.subscriptions.length){t.dataplaneInsight.subscriptions.forEach((function(t){var a=t.status.total.responsesSent||n,e=t.connectTime||n,s=t.status.lastUpdateTime||n,i=t.disconnectTime||null;o.push(a),c.push(e),u.push(s),l=e&&e.length&&!i?"Online":"Offline"})),o!==n&&(o=o.reduce((function(t,a){return t+a})));var m=c.reduce((function(t,a){return t&&a?t.MeasureDate>a.MeasureDate?t:a:null})),b=u.reduce((function(t,a){return t&&a?t.MeasureDate>a.MeasureDate?t:a:null})),g=new Date(m),y=new Date(b);m&&!isNaN(g)&&(a=Object(i["b"])(g)),b&&!isNaN(y)&&(e=Object(i["b"])(y))}else a="never",e="never",o=0;s.push({name:t.name,mesh:t.mesh,tags:r,status:l,lastConnected:a,lastUpdated:e,totalUpdates:o,type:"dataplane"}),s.sort((function(t,a){return t.name>a.name?1:t.name===a.name&&t.mesh>a.mesh?1:-1}))})).catch((function(t){console.error(t)}))})),t.tableData.data=s,t.tableDataIsEmpty=!1}else t.isEmpty=!0})).catch((function(a){t.hasError=!0,console.error(a)})).finally((function(){t.isLoading=!1}))};e()}}},l=o,c=e("2877"),u=Object(c["a"])(l,n,s,!1,null,null,null);a["default"]=u.exports},"12e7":function(t,a,e){"use strict";var n=e("3b59"),s=e.n(n);s.a},"1af6":function(t,a,e){var n=e("63b6");n(n.S,"Array",{isArray:e("9003")})},"20fd":function(t,a,e){"use strict";var n=e("d9f6"),s=e("aebd");t.exports=function(t,a,e){a in t?n.f(t,a,s(0,e)):t[a]=e}},2699:function(t,a,e){},2778:function(t,a,e){"use strict";var n=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"data-overview"},[t.isReady?n("div",{staticClass:"data-overview-content"},[t.displayRefreshControl?n("div",{staticClass:"data-table-controls mb-2"},[n("KButton",{attrs:{appearance:"secondary",size:"small"},on:{click:function(a){return t.$emit("reloadData")}}},[t._v("\n        Refresh\n      ")])],1):t._e(),!t.isLoading&&t.displayMetrics&&t.metricsData?n("MetricGrid",{attrs:{metrics:t.metricsData}}):t.isLoading&&t.displayMetrics?n("KEmptyState",{attrs:{"cta-is-hidden":""}},[n("template",{slot:"title"},[t._v("\n        "+t._s(t.emptyState.title)+"\n      ")]),t.showCta?n("template",{slot:"message"},[t.ctaAction&&t.ctaAction.length?n("router-link",{attrs:{to:t.ctaAction}},[t._v("\n          "+t._s(t.emptyState.ctaText)+"\n        ")]):t._e(),t._v("\n        "+t._s(t.emptyState.message)+"\n      ")],1):t._e()],2):t._e(),t.displayDataTable&&!t.tableDataIsEmpty&&t.tableData?n("div",[n("KTable",{staticClass:"{ 'data-table-is-hidden' : tableDataIsEmpty }",attrs:{options:t.tableDataFiltered,"has-hover":""},scopedSlots:t._u([t.displayTableDataStatus?{key:"status",fn:function(a){var e=a.rowValue;return[n("div",{staticClass:"entity-status",class:{"is-offline":"offline"===e.toLowerCase()}},[n("span",{staticClass:"entity-status__dot"}),n("span",{staticClass:"entity-status__label"},[t._v(t._s(e))])])]}}:null,{key:"actions",fn:function(a){var e=a.row;return[n("router-link",{attrs:{to:{name:t.tableActionsRouteName,params:{mesh:"mesh"===e.type.toLowerCase()?e.name:e.mesh,dataplane:"dataplane"===e.type.toLowerCase()?e.name:null,trafficpermission:"trafficpermission"===e.type.toLowerCase()?e.name:null,trafficroute:"trafficroute"===e.type.toLowerCase()?e.name:null,trafficlog:"trafficlog"===e.type.toLowerCase()?e.name:null,healthcheck:"healthcheck"===e.type.toLowerCase()?e.name:null,proxytemplate:"proxytemplate"===e.type.toLowerCase()?e.name:null,service:"service"===e.type.toLowerCase()?e.name:null}}}},[t._t("tableDataActionsLinkText")],2)]}}],null,!0)}),t.tableData&&t.tableRowCount>t.pageSize?n("Pagination",{staticClass:"ml-2 mr-2 mb-2",attrs:{"has-previous":t.pageNumber>0,"has-next":t.pageNumber<t.pageCount-1},on:{next:t.goToNextPage,previous:t.goToPreviousPage}}):t._e()],1):t._e(),t.displayDataTable&&t.tableDataIsEmpty&&t.tableData?n("KEmptyState",{attrs:{"cta-is-hidden":""}},[n("template",{slot:"title"},[n("div",{staticClass:"card-icon mb-3"},[n("img",{attrs:{src:e("a448")}})]),t._v("\n        No Items Found\n      ")])],2):t._e(),t.$slots.content?n("div",{staticClass:"data-overview-content mt-6"},[t._t("content")],2):t._e()],1):n("KEmptyState",{attrs:{"cta-is-hidden":""}},[n("template",{slot:"title"},[n("div",{staticClass:"card-icon mb-3"},[n("KIcon",{attrs:{icon:"spinner",color:"rgba(0, 0, 0, 0.1)",size:"48"}})],1),t._v("\n      Data Loading...\n    ")])],2)],1)},s=[],i=e("75fc"),r=(e("ac6a"),e("ffc1"),e("be10")),o=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"pagination"},[e("KButton",{attrs:{disabled:!t.hasPrevious,appearance:"primary","data-testid":"previous"},on:{click:function(a){return t.$emit("previous")}}},[t._v("\n    ‹ Previous\n  ")]),e("KButton",{attrs:{disabled:!t.hasNext,appearance:"primary","data-testid":"next"},on:{click:function(a){return t.$emit("next")}}},[t._v("\n    Next ›\n  ")])],1)},l=[],c={name:"Pagination",props:{hasPrevious:{type:Boolean,default:!1},hasNext:{type:Boolean,default:!1}}},u=c,d=(e("12e7"),e("2877")),p=Object(d["a"])(u,o,l,!1,null,"336ceb96",null),f=p.exports,m={name:"DataOverview",components:{MetricGrid:r["a"],Pagination:f},props:{displayMetrics:{type:Boolean,default:!1},metricsData:{type:Array,default:null},isLoading:{type:Boolean,default:!1},hasError:{type:Boolean,default:!1},isEmpty:{type:Boolean,default:!1},emptyState:{type:Object,default:null},ctaAction:{type:Object,default:function(){}},showCta:{type:Boolean,default:!0},displayDataTable:{type:Boolean,default:!1},tableData:{type:Object,default:null},tableDataIsEmpty:{type:Boolean,default:!1},tableDataActionsLink:{type:String,default:null},tableActionsRouteName:{type:String,default:null},displayTableDataStatus:{type:Boolean,default:!0},displayRefreshControl:{type:Boolean,default:!0}},data:function(){return{pageSize:12,pageNumber:0}},computed:{isReady:function(){return!this.isEmpty&&!this.hasError&&!this.isLoading},tableRowCount:function(){return Object.entries(this.tableData.data).length},pageCount:function(){var t=Object.entries(this.tableData.data).length,a=this.pageSize;return Math.ceil(t/a)},tableDataFiltered:function(){var t=this.tableData.data,a=this.tableData.headers,e=this.pageNumber*this.pageSize,n=e+this.pageSize,s=t.slice(e,n),r={headers:a,data:Object(i["a"])(s)};return r}},methods:{goToPreviousPage:function(){this.pageNumber--},goToNextPage:function(){this.pageNumber++}}},b=m,g=(e("9947"),Object(d["a"])(b,n,s,!1,null,null,null));a["a"]=g.exports},"2f21":function(t,a,e){"use strict";var n=e("79e5");t.exports=function(t,a){return!!t&&n((function(){a?t.call(null,(function(){}),1):t.call(null)}))}},"3b59":function(t,a,e){},"549b":function(t,a,e){"use strict";var n=e("d864"),s=e("63b6"),i=e("241e"),r=e("b0dc"),o=e("3702"),l=e("b447"),c=e("20fd"),u=e("7cd6");s(s.S+s.F*!e("4ee1")((function(t){Array.from(t)})),"Array",{from:function(t){var a,e,s,d,p=i(t),f="function"==typeof this?this:Array,m=arguments.length,b=m>1?arguments[1]:void 0,g=void 0!==b,y=0,h=u(p);if(g&&(b=n(b,m>2?arguments[2]:void 0,2)),void 0==h||f==Array&&o(h))for(a=l(p.length),e=new f(a);a>y;y++)c(e,y,g?b(p[y],y):p[y]);else for(d=h.call(p),e=new f;!(s=d.next()).done;y++)c(e,y,g?r(d,b,[s.value,y],!0):s.value);return e.length=y,e}})},"54a1":function(t,a,e){e("6c1c"),e("1654"),t.exports=e("95d5")},"55dd":function(t,a,e){"use strict";var n=e("5ca1"),s=e("d8e8"),i=e("4bf8"),r=e("79e5"),o=[].sort,l=[1,2,3];n(n.P+n.F*(r((function(){l.sort(void 0)}))||!r((function(){l.sort(null)}))||!e("2f21")(o)),"Array",{sort:function(t){return void 0===t?o.call(i(this)):o.call(i(this),s(t))}})},"75fc":function(t,a,e){"use strict";var n=e("a745"),s=e.n(n);function i(t){if(s()(t)){for(var a=0,e=new Array(t.length);a<t.length;a++)e[a]=t[a];return e}}var r=e("774e"),o=e.n(r),l=e("c8bb"),c=e.n(l);function u(t){if(c()(Object(t))||"[object Arguments]"===Object.prototype.toString.call(t))return o()(t)}function d(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function p(t){return i(t)||u(t)||d()}e.d(a,"a",(function(){return p}))},"774e":function(t,a,e){t.exports=e("d2d5")},"79b0":function(t,a,e){"use strict";var n=e("9e30"),s=e.n(n);s.a},"95d5":function(t,a,e){var n=e("40c3"),s=e("5168")("iterator"),i=e("481b");t.exports=e("584a").isIterable=function(t){var a=Object(t);return void 0!==a[s]||"@@iterator"in a||i.hasOwnProperty(n(a))}},9947:function(t,a,e){"use strict";var n=e("2699"),s=e.n(n);s.a},"9e30":function(t,a,e){},a448:function(t,a){t.exports="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0MiI+CiAgPHBhdGggZmlsbD0iI0Q5RDlEOSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNNDggNHY1aC0yVjZIMnYzSDBWMkMwIC44OTU0MzA1Ljg5NTQzMSAwIDIgMGg0NGMxLjEwNDU2OSAwIDIgLjg5NTQzMDUgMiAydjJ6bS0yIDI2aC00di0yaDR2LTNoMnY4aC0ydi0zek0yIDMwdjNIMHYtOGgydjNoNHYySDJ6bTQ0LTEyaC00di0yaDR2LTNoMnY4aC0ydi0zek0yIDE4djNIMHYtOGgydjNoNHYySDJ6bTgtMmg0djJoLTR2LTJ6bTggMGg0djJoLTR2LTJ6bTggMGg0djJoLTR2LTJ6bTggMGg0djJoLTR2LTJ6TTEwIDI4aDR2MmgtNHYtMnptOCAwaDR2MmgtNHYtMnptOCAwaDR2MmgtNHYtMnptOCAwaDR2MmgtNHYtMnptMTIgMTRoLTR2LTJoNHYtM2gydjNjMCAxLjEwNDU2OTUtLjg5NTQzMSAyLTIgMnpNMiA0MGg0djJIMmMtMS4xMDQ1NjkgMC0yLS44OTU0MzA1LTItMnYtM2gydjN6bTggMGg0djJoLTR2LTJ6bTggMGg0djJoLTR2LTJ6bTggMGg0djJoLTR2LTJ6bTggMGg0djJoLTR2LTJ6TTIgMnYyaDQ0VjJIMnoiLz4KPC9zdmc+Cg=="},a745:function(t,a,e){t.exports=e("f410")},be10:function(t,a,e){"use strict";var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return t.metrics?e("div",{staticClass:"info-grid"},t._l(t.metrics,(function(a,n){return null!==a.value?e("div",{key:n,staticClass:"metric",class:a.status,attrs:{"data-testid":a.metric}},[e("span",{staticClass:"metric-title"},[t._v(t._s(a.metric))]),e("span",{staticClass:"metric-value",class:{"has-error":n===t.hasError[n]}},[t._v(t._s(t._f("formatError")(t._f("formatValue")(a.value))))])]):t._e()})),0):t._e()},s=[],i=(e("456d"),e("ac6a"),e("6b54"),{name:"MetricsGrid",filters:{formatValue:function(t){return t?t.toLocaleString("en").toString():0},formatError:function(t){return"--"===t?"error calculating":t}},props:{metrics:{type:Array,required:!0,default:function(){}}},computed:{hasError:function(){var t=this,a={};return Object.keys(this.metrics).forEach((function(e){"--"===t.metrics[e].value&&(a[e]=e)})),a}}}),r=i,o=(e("79b0"),e("2877")),l=Object(o["a"])(r,n,s,!1,null,null,null);a["a"]=l.exports},c8bb:function(t,a,e){t.exports=e("54a1")},d2d5:function(t,a,e){e("1654"),e("549b"),t.exports=e("584a").Array.from},f410:function(t,a,e){e("1af6"),t.exports=e("584a").Array.isArray},ffc1:function(t,a,e){var n=e("5ca1"),s=e("504c")(!0);n(n.S,"Object",{entries:function(t){return s(t)}})}}]);