(this.webpackJsonpaddons=this.webpackJsonpaddons||[]).push([[0],{129:function(e,a,t){},131:function(e,a,t){"use strict";t.r(a);var n=t(1),l=t.n(n),r=t(19),o=t.n(r),i=t(71),c=t(12),s=t(9),u=t(18),m=t(8),g=(t(79),t(133)),d=t(134),b=t(135),p=t(144),v=t(145),f=t(136),y=t(137),h=t(138),E=t(139),S=t(66),C=t(132),O=function(e,a){console.log("raiseEvent()");var t={eventName:e,customData:a};window.parent.postMessage(t,"*")},A=t(14),j=t(15),N=t(30),M=t.n(N),k={APAC:["ANZ","Japan","SEA","Korea","India","China"],EMEA:["Central","North","South","5th Region"],LATAM:["Andean","Brazil","Mexico","Southern-Cone"],NA:["East","Central","West","Canada","Government","Velocity","Channels","5th Region"]},x={"Critical Situation Support":[],"Customer Success Program":["General Questions","Specific Service Element Questions"],"Demo & Trial Support":["Free Trials Process Related","Innovation (Integrations, Tailored Demos, Vision Clips)","POCs, Pilots for Strategic Opps","Use Case Automation tool Questions"],Enablement:["Internal SC/AE Enablement","Partner End-to-End Enablement","Partner Summits, Events, Webinars","Partner Technical Enablement"],"Opportunity Support":["Technical Design / Architecture Review","Other Commercial Support"],"Privacy Support":["Questionnaires/Assessments/Audits","Other"],Roadmap:[],"Subscription Extension":[],"Security Support":["Questionnaires/Assessments/Audits","Other"],"Specialist Engagement":["API (Platform/AppFoundry)","AppFoundry","Cloud Migration","Digital AI","MultiCloud","Must Win Opportunity Engagement","Predictive Engagement","PureBridge","Self-Service Automation","WEM","Outbound","Other"],"Strategic Business Consulting":["CX Whitespace","Help with Financial Analysis (TCO/ROI)","Industry Expertise"],"Other Request":[]},R=t(73),P=t(41),w=t.n(P),q=t(65),T=function(e,a,t){console.log("searchUser([".concat(t,"])"));var n,l=t.split(" "),r=[{type:"EXACT",fields:["state"],value:"active"}],o=Object(u.a)(l);try{for(o.s();!(n=o.n()).done;){var i=n.value;i&&r.push({type:"QUERY_STRING",fields:["name","email","title","department"],value:i})}}catch(s){o.e(s)}finally{o.f()}var c={pageSize:5,pageNumber:1,types:["users"],query:r,sortOrder:"ASC",sortBy:"name"};return fetch("https://api.".concat(e,"/api/v2/search?profile=false"),{method:"POST",headers:{Authorization:"bearer ".concat(a),"Content-Type":"application/json"},body:JSON.stringify(c)}).then((function(e){return e.json()})).then((function(e){if(e.status<200||e.status>299)throw new Error(JSON.stringify(e));return e.results&&e.results.length>0?e.results:[]}))};function D(e){return l.a.createElement("div",{style:{display:"flex",backgroundColor:"#dddddd",borderRadius:"2px",marginBottom:"4px",marginRight:"4px"}},l.a.createElement("div",{style:{fontSize:"0.8em",paddingLeft:"8px",lineHeight:"20px"}},e.name),l.a.createElement("div",null,l.a.createElement(S.a,{style:{height:"20px",lineHeight:"10px",color:"black"},color:"link",size:"sm",outline:!0,onClick:function(){e.onRemoveClick()}},l.a.createElement(A.f,null))))}var F="";function L(e){var a=Object(n.useState)(!1),t=Object(m.a)(a,2),r=t[0],o=t[1],i=Object(n.useState)(!1),c=Object(m.a)(i,2),s=c[0],u=c[1],g=Object(n.useState)(""),d=Object(m.a)(g,2),b=d[0],p=d[1],v=Object(n.useState)([]),f=Object(m.a)(v,2),y=f[0],h=f[1],E=Object(n.useState)([]),S=Object(m.a)(E,2),O=S[0],A=S[1];Object(n.useEffect)((function(){Array.isArray(e.initialValue)?A(e.initialValue):A([])}),[e.initialValue]);var j=function(){var a=Object(q.a)(w.a.mark((function a(t){var n;return w.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:if(console.log("searchForUser([".concat(t,"])")),F=t,p(t),!s){a.next=5;break}return a.abrupt("return");case 5:if(t&&!(t.length<3)){a.next=8;break}return h([]),a.abrupt("return");case 8:return u(!0),a.next=11,T("mypurecloud.com",e.token,t);case 11:n=a.sent,Array.isArray(n)?h(n.map((function(e){return e.name}))):h([]),u(!1),F!==t&&j(F);case 15:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}();return l.a.createElement("div",{style:e&&e.isDisabled?{pointerEvents:"none",backgroundColor:"#F2F2F2"}:{}},l.a.createElement("div",{style:{padding:"4px",border:"1px solid #cccccc",borderRadius:"4px"}},l.a.createElement("div",{style:{display:"flex",flexWrap:"wrap"}},Array.isArray(O)&&O.map((function(a,t){return l.a.createElement(D,{key:t,name:a,onRemoveClick:function(){var t=O.filter((function(e){return e!==a}));A(t),e.onChange(t)}})}))),l.a.createElement(C.a,{onFocus:function(){o(!0),h([])},onBlur:function(){setTimeout((function(){p(""),o(!1)}),200)},style:s?{backgroundColor:"#eeeeee"}:{},placeholder:"Search for user...",value:b||"",onChange:function(e){j(e.target.value)}}),r&&l.a.createElement(C.a,{type:"select",style:{height:"90px",position:"absolute"},multiple:!0,onChange:function(a){var t=a.target.options[a.target.selectedIndex].text;if((!t||!t.startsWith("Searching...")&&!t.startsWith("Type a name..."))&&Array.isArray(O)&&!O.includes(t)){var n=Object(R.a)(O);n.push(t),A(n),e.onChange(n)}}},s&&l.a.createElement("option",null,"Searching..."),!s&&(!b||b.length<3)&&l.a.createElement("option",null,"Type a name..."),!s&&Array.isArray(y)&&y.map((function(e,a){return l.a.createElement("option",{key:a},e)})))))}var I={isTest:!1,status:null,isDeleted:!1,handled:null,created:null,region:null,subRegion:null,product:null,segment:null,requester:null,programManager:null,teamMember:null,customerName:null,createdAt:{value:"Last30Days",label:"Last 30 Days"},requestType:null,category:null,subCategory:null,fixedRequester:!1};function G(e){var a=Object(n.useState)(null),t=Object(m.a)(a,2),r=t[0],o=t[1],i=Object(n.useState)(!1),c=Object(m.a)(i,2),N=c[0],R=c[1],P=Object(n.useState)("edit"),w=Object(m.a)(P,2),q=w[0],T=w[1],D=Object(n.useState)(""),F=Object(m.a)(D,2),G=F[0],J=F[1],B=Object(n.useState)(null),z=Object(m.a)(B,2),W=z[0],V=z[1],U=Object(n.useState)([]),Q=Object(m.a)(U,2),H=Q[0],X=Q[1],$=Object(n.useState)(!1),_=Object(m.a)($,2),K=_[0],Y=_[1],Z=Object(n.useState)(I),ee=Object(m.a)(Z,2),ae=ee[0],te=ee[1],ne=Object(n.useState)(!1),le=Object(m.a)(ne,2),re=le[0],oe=le[1],ie=Object(n.useState)(!1),ce=Object(m.a)(ie,2),se=ce[0],ue=ce[1],me=Object(n.useState)([]),ge=Object(m.a)(me,2),de=ge[0],be=ge[1],pe=Object(n.useState)(!1),ve=Object(m.a)(pe,2),fe=ve[0],ye=ve[1],he=Object(n.useState)([]),Ee=Object(m.a)(he,2),Se=Ee[0],Ce=Ee[1];Object(n.useEffect)((function(){var a=M.a.parse(e.location.search);console.log("parsedQueryString: ",a),o(a);var t=ke(),n=t||I;n.isTest="localhost"===window.location.hostname,console.log("initialFilterSet.isTest: ",n.isTest),a&&a.requester?(console.log("fixed requester and teamMember will be set to: ",a.requester),n.requester=[a.requester],n.teamMember=[a.requester],n.fixedRequester=!0,ue(!0)):a&&a.region&&"super-user"!==a.region.toLowerCase()?(console.log("fixed region will be set to: ",a.region),n.region=[{value:a.region,label:a.region}],oe(!0)):n.fixedRequester=!1,n.subRegion=qe(n.region,n.subRegion),n.subCategory=Te(n.category,n.subCategory),te(n),we(n.region),O("applyFilter",n)}),[]);var Oe=function(e){if(console.log("saveFilterNameValid() ",e),!e)return!1;return!(!(e&&e.length<=30&&/^(?=.*[^\W_])[\w ]*$/.test(e))||je(e))},Ae="filter.configuration.list",je=function(e){console.log("localStorageGet()");var a=localStorage.getItem(Ae);if(!a)return null;var t=JSON.parse(a);return Array.isArray(t)?t.filter((function(a){return a.name===e}))[0]:null},Ne=function(e,a){console.log("localStorageSet()");var t=localStorage.getItem(Ae),n=t?JSON.parse(t):[];if(Array.isArray(n)){var l=n.filter((function(a){return a.name!==e}));l.push({name:e,filterConfiguration:a}),localStorage.setItem(Ae,JSON.stringify(l))}},Me=function(e){console.log("localStorageDrop()");var a=localStorage.getItem(Ae);if(a){var t=JSON.parse(a);if(Array.isArray(t)){var n=t.filter((function(a){return a.name!==e}));localStorage.setItem(Ae,JSON.stringify(n))}}},ke=function(e){console.log("localStorageGetLatestFilter");var a=localStorage.getItem("filter.configuration.latest");if(a)return JSON.parse(a)},xe=function(e){console.log("localStorageSetLatestFilter"),localStorage.setItem("filter.configuration.latest",JSON.stringify(e))},Re=function(){console.log("localStorageDropLatestFilter"),localStorage.removeItem("filter.configuration.latest")},Pe=function(){console.log("reloadFilterList()");var e=function(){console.log("localStorageGetAll()");var e=localStorage.getItem(Ae);if(!e)return[];var a=JSON.parse(e);return Array.isArray(a)?a:[]}().map((function(e){return{value:e.name,label:e.name}}));console.log(e),X(e),V(null)},we=function(e){if(console.log("applySubRegionList()"),Array.isArray(e)&&0!==e.length){var a,t=[],n=Object(u.a)(e);try{for(n.s();!(a=n.n()).done;){var l=a.value,r=k[l.value];if(Array.isArray(r)){var o,i=Object(u.a)(r);try{for(i.s();!(o=i.n()).done;){var c=o.value;t.push({value:"".concat(l.value,"/").concat(c),label:"".concat(l.value,"/").concat(c)})}}catch(s){i.e(s)}finally{i.f()}}}}catch(s){n.e(s)}finally{n.f()}be(t)}else be([])},qe=function(e,a){console.log("removeSelectedSubregionsForNotSelectedRegions()");var t=[];if(!Array.isArray(e))return[];if(!Array.isArray(a))return[];var n,l=Object(u.a)(e);try{for(l.s();!(n=l.n()).done;){var r,o=n.value,i=Object(u.a)(a);try{for(i.s();!(r=i.n()).done;){var c=r.value;c.value.startsWith(o.value)&&t.push(c)}}catch(s){i.e(s)}finally{i.f()}}}catch(s){l.e(s)}finally{l.f()}return t},Te=function(e,a){console.log("removeSelectedSubcategoriesForNotSelectedCategories()");var t=[];if(!Array.isArray(e))return[];if(!Array.isArray(a))return[];var n,l=Object(u.a)(e);try{for(l.s();!(n=l.n()).done;){var r,o=n.value,i=Object(u.a)(a);try{for(i.s();!(r=i.n()).done;){var c=r.value;x[o.value]&&x[o.value].includes(c.value)&&t.push(c)}}catch(s){i.e(s)}finally{i.f()}}}catch(s){l.e(s)}finally{l.f()}return t};return l.a.createElement(l.a.Fragment,null,l.a.createElement(g.a,{color:"light"},l.a.createElement("span",{style:{fontWeight:"600"}},l.a.createElement(A.c,{style:{marginRight:"4px"}}),"Filter configuration"),l.a.createElement(d.a,{className:"ml-auto",navbar:!0},l.a.createElement(b.a,{isOpen:N,toggle:function(){return R((function(e){return!e}))}},l.a.createElement(p.a,{caret:!0},l.a.createElement(A.d,null)),l.a.createElement(v.a,{right:!0},l.a.createElement(f.a,{onClick:function(){console.log("handleMenuOptionLoad()"),Pe(),Y(!1),T("load")}},l.a.createElement(A.b,null)," Filter list..."),l.a.createElement(f.a,{onClick:function(){console.log("handleMenuOptionSave()"),T("save")}},l.a.createElement(A.i,null)," Save filter as..."),l.a.createElement(f.a,{divider:!0}),l.a.createElement(f.a,{onClick:function(){console.log("handleMenuOptionClear()");var e=JSON.parse(JSON.stringify(I));r&&r.requester?(console.log("fixed requester and teamMember will be set to: ",r.requester),e.requester=[r.requester],e.teamMember=[r.requester],e.fixedRequester=!0,ue(!0)):r&&r.region&&"super-user"!==r.region.toLowerCase()&&(console.log("fixed region will be set to: ",r.region),e.region=[{value:r.region,label:r.region}],oe(!0)),te(e),we(e.region),O("clearFilter",{}),Re(),ye(!0)}},l.a.createElement(A.a,null)," Clear filter"))))),"load"===q&&l.a.createElement(y.a,{className:"p-3",style:K?{backgroundColor:"mistyrose"}:{backgroundColor:"antiquewhite"}},l.a.createElement(h.a,null,"Filter list"),l.a.createElement(j.a,{isDisabled:K,noOptionsMessage:function(){return"No filters configured yet"},className:"mb-3",options:H,isMulti:!1,isSearchable:!0,value:W,onChange:function(e){V(e);var a=je(e.value);a&&a.filterConfiguration&&(te(a.filterConfiguration),ye(!0),we(a.filterConfiguration.region))}}),!K&&l.a.createElement(E.a,{style:{textAlign:"center"},inline:!0},l.a.createElement(S.a,{outline:!0,size:"sm",color:"primary",className:"ml-2",onClick:function(){console.log("handleLoadApplyBtn()"),T("edit"),V(null),O("applyFilter",ae),xe(ae),ye(!1)},disabled:!W},l.a.createElement(A.g,null)," Apply"),l.a.createElement(S.a,{outline:!0,size:"sm",color:"danger",className:"ml-2",onClick:function(){console.log("handleLoadDeleteBtn()"),Y(!0)},disabled:!W},l.a.createElement(A.h,null)," Delete"),l.a.createElement(S.a,{outline:!0,size:"sm",color:"secondary",className:"ml-2",onClick:function(){console.log("handleLoadCloseBtn()"),T("edit"),V(null)}},l.a.createElement(A.f,null)," Close")),K&&l.a.createElement(E.a,{style:{textAlign:"center"},inline:!0},l.a.createElement(S.a,{outline:!0,size:"sm",color:"secondary",className:"ml-2",onClick:function(){console.log("handleLoadDeleteCancelBtn()"),Y(!1)}},l.a.createElement(A.f,null)," Cancel"),l.a.createElement(S.a,{outline:!0,size:"sm",color:"danger",className:"ml-2",onClick:function(){console.log("handleLoadDeleteConfirmBtn()"),Y(!1),Me(W.value),Pe()},disabled:!W},l.a.createElement(A.h,null)," Confirm delete"))),"save"===q&&l.a.createElement(y.a,{className:"p-3",style:{backgroundColor:"antiquewhite"}},l.a.createElement(h.a,null,"Save filter as"),l.a.createElement(C.a,{type:"text",className:"form-control",placeholder:"Enter a name",value:G,onChange:function(e){console.log("handleSaveFilterNameChanged() ",e.target.value),J(e.target.value)}}),G&&!Oe(G)&&l.a.createElement("span",{style:{color:"red",fontWeight:"600"}},"Please enter a valid and unique value"),l.a.createElement(E.a,{style:{textAlign:"center"},className:"mt-3",inline:!0},l.a.createElement(S.a,{outline:!0,size:"sm",color:"primary",className:"ml-2",onClick:function(){console.log("handleSaveOkBtn()"),Ne(G,ae),J(""),T("edit")},disabled:!Oe(G)},l.a.createElement(A.e,null)," Save"),l.a.createElement(S.a,{outline:!0,size:"sm",color:"secondary",className:"ml-2",onClick:function(){console.log("handleSaveCancelBtn()"),J(""),T("edit")}},l.a.createElement(A.f,null)," Cancel"))),l.a.createElement("div",{className:"edit"===q?"":"disabled"},l.a.createElement("div",{className:"p-3"},l.a.createElement("div",{className:"mb-3"},"Status",l.a.createElement(j.a,{options:[{value:"Open",label:"Open"},{value:"On Hold",label:"On Hold"},{value:"Waiting On Additional Information",label:"Waiting On Additional Information"},{value:"Closed",label:"Closed"}],isMulti:!0,isSearchable:!0,value:ae.status,onChange:function(e){console.log(e);var a=Object(s.a)({},ae);a.status=e,te(a),ye(!0)}}),l.a.createElement(h.a,{check:!0,className:"ml-4"},l.a.createElement(C.a,{type:"checkbox",checked:ae.isDeleted,onChange:function(e){console.log(e.target.checked);var a=Object(s.a)({},ae);a.isDeleted=e.target.checked,te(a),ye(!0)}})," ","Show deleted only")),l.a.createElement("div",{className:"mb-3"},"Created",l.a.createElement(j.a,{isClearable:!0,options:[{value:"Last30Days",label:"Last 30 Days"},{value:"CurrentMonth",label:"Current Month"},{value:"LastMonth",label:"Last Month"}],isMulti:!1,isSearchable:!0,value:ae.createdAt,onChange:function(e){console.log(e);var a=Object(s.a)({},ae);a.createdAt=e,te(a),ye(!0)}})),l.a.createElement("div",{className:"mb-3"},"Request type",l.a.createElement(j.a,{options:[{value:"0",label:"CC Request"},{value:"1",label:"Trial/POC/Pilot Validation"},{value:"2",label:"Attach Offer"}],isMulti:!0,isSearchable:!0,value:ae.requestType,onChange:function(e){console.log(e);var a=Object(s.a)({},ae);a.requestType=e,te(a),ye(!0)}})),l.a.createElement("div",{className:"mb-3"},"Handled",l.a.createElement(j.a,{options:[{value:"Accepted",label:"Accepted"},{value:"Rejected",label:"Rejected"},{value:"Unhandled",label:"Unhandled"}],isMulti:!0,isSearchable:!0,value:ae.handled,onChange:function(e){console.log(e);var a=Object(s.a)({},ae);a.handled=e,te(a),ye(!0)}})),l.a.createElement("div",{className:"mb-3"},"Region",l.a.createElement(j.a,{isDisabled:re,options:[{value:"APAC",label:"APAC"},{value:"EMEA",label:"EMEA"},{value:"LATAM",label:"LATAM"},{value:"NA",label:"NA"}],isMulti:!0,isSearchable:!0,value:ae.region,onChange:function(e){console.log(e);var a=Object(s.a)({},ae);a.region=e,a.subRegion=qe(a.region,a.subRegion),te(a),ye(!0),we(a.region)}})),l.a.createElement("div",{className:"mb-3"},"Territory",l.a.createElement(j.a,{options:de,isMulti:!0,isSearchable:!0,value:ae.subRegion,onChange:function(e){console.log(e);var a=Object(s.a)({},ae);a.subRegion=e,te(a),ye(!0)}})),l.a.createElement("div",{className:"mb-3"},"Category",l.a.createElement(j.a,{options:[{value:"Critical Situation Support",label:"Critical Situation Support"},{value:"Customer Success Program",label:"Customer Success Program"},{value:"Demo & Trial Support",label:"Demo & Trial Support"},{value:"Enablement",label:"Enablement"},{value:"Opportunity Support",label:"Opportunity Support"},{value:"Privacy Support",label:"Privacy Support"},{value:"Roadmap",label:"Roadmap"},{value:"Subscription Extension",label:"Subscription Extension"},{value:"Security Support",label:"Security Support"},{value:"Specialist Engagement",label:"Specialist Engagement"},{value:"Strategic Business Consulting",label:"Strategic Business Consulting"},{value:"Other Request",label:"Other Request"}],isMulti:!0,isSearchable:!0,value:ae.category,onChange:function(e){console.log(e);var a=Object(s.a)({},ae);a.category=e,a.subCategory=Te(a.category,a.subCategory),te(a),ye(!0),function(e){if(console.log("applySubCategoryList()"),Array.isArray(e)&&0!==e.length){var a,t=[],n=Object(u.a)(e);try{for(n.s();!(a=n.n()).done;){var l=a.value,r=x[l.value];if(Array.isArray(r)){var o,i=Object(u.a)(r);try{for(i.s();!(o=i.n()).done;){var c=o.value;t.push({value:c,label:c})}}catch(s){i.e(s)}finally{i.f()}}}}catch(s){n.e(s)}finally{n.f()}Ce(t)}else Ce([])}(a.category)}})),l.a.createElement("div",{className:"mb-3"},"Sub-category",l.a.createElement(j.a,{options:Se,isMulti:!0,isSearchable:!0,value:ae.subCategory,onChange:function(e){console.log(e);var a=Object(s.a)({},ae);a.subCategory=e,te(a),ye(!0)}})),l.a.createElement("div",{className:"mb-3"},"Product",l.a.createElement(j.a,{options:[{value:"Genesys Cloud",label:"Genesys Cloud"},{value:"Genesys Engage",label:"Genesys Engage"},{value:"Genesys Engage Cloud",label:"Genesys Engage Cloud"},{value:"PureConnect",label:"PureConnect"},{value:"Latitude by Genesys",label:"Latitude by Genesys"}],isMulti:!0,isSearchable:!0,value:ae.product,onChange:function(e){console.log(e);var a=Object(s.a)({},ae);a.product=e,te(a),ye(!0)}})),l.a.createElement("div",{className:"mb-3"},"Market segment",l.a.createElement(j.a,{options:[{value:"Mid-market",label:"Mid-market"},{value:"Commercial",label:"Commercial"},{value:"Enterprise",label:"Enterprise"}],isMulti:!0,isSearchable:!0,value:ae.segment,onChange:function(e){console.log(e);var a=Object(s.a)({},ae);a.segment=e,te(a),ye(!0)}})),l.a.createElement("div",{className:"mb-3"},"Requester name",l.a.createElement(L,{isDisabled:se,token:r&&r.token?r.token:null,initialValue:ae.requester,onChange:function(e){console.log(e);var a=Object(s.a)({},ae);a.requester=e,te(a),ye(!0)}})),l.a.createElement("div",{className:"mb-3"},"Program manager",l.a.createElement(L,{token:r&&r.token?r.token:null,initialValue:ae.programManager,onChange:function(e){console.log(e);var a=Object(s.a)({},ae);a.programManager=e,te(a),ye(!0)}})),l.a.createElement("div",{className:"mb-3"},"Team member",l.a.createElement(L,{isDisabled:se,token:r&&r.token?r.token:null,initialValue:ae.teamMember,onChange:function(e){console.log(e);var a=Object(s.a)({},ae);a.teamMember=e,te(a),ye(!0)}})),l.a.createElement("div",{className:"mb-3"},"Customer name",l.a.createElement(C.a,{placeholder:"Enter a name",value:ae.customerName||"",onChange:function(e){console.log(e.target.value);var a=Object(s.a)({},ae);a.customerName=e.target.value,te(a),ye(!0)}})),fe&&"edit"===q&&l.a.createElement("div",{className:"request-filter-floating-button"},l.a.createElement(S.a,{color:"primary",onClick:function(){console.log("handleApplyFilters()"),O("applyFilter",ae),xe(ae),ye(!1)}},l.a.createElement(A.g,null)," Apply filter")),l.a.createElement("div",{className:"request-filter-floating-button-bottom-placeholder"}))))}var J,B=t(140),z=t(141),W=t(142),V=t(146),U=t(143),Q=t(31),H=t(69),X=t.n(H);J=window.location.href.includes("localhost")?"http://localhost:3000":"https://drbojb15ma.execute-api.eu-central-1.amazonaws.com/dev";var $=function(e,a){console.log("searchMailConfiguration ".concat(JSON.stringify(a)));var t={token:e,region:a.region,product:a.product,category:a.category};return fetch("".concat(J,"/mailconfig"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then((function(e){return e.json()})).then((function(e){if(e.status<200||e.status>299)throw new Error(JSON.stringify(e));return e&&e.length>0?e:[]}))},_=t(70),K=t.n(_),Y=(t(110),t(111),t(26)),Z={placeholder:"Add mail address"},ee={region:void 0,product:void 0,category:void 0};function ae(e){var a=Object(n.useState)(!1),t=Object(m.a)(a,2),r=t[0],o=t[1],i=Object(n.useState)(!1),c=Object(m.a)(i,2),u=c[0],g=c[1],d=Object(n.useState)(null),b=Object(m.a)(d,2),p=b[0],v=b[1],f=Object(n.useState)([]),y=Object(m.a)(f,2),h=y[0],E=y[1],C=Object(n.useState)(null),O=Object(m.a)(C,2),A=O[0],N=O[1],k=Object(n.useState)(ee),x=Object(m.a)(k,2),R=x[0],P=x[1];Object(n.useEffect)((function(){var a=M.a.parse(e.location.search);console.log("parsedQueryString: ",a),v(a)}),[]);var w=function(e){if(e.region&&e.product&&e.category){var a=Object(s.a)({},e);console.log("queryDynamo()",e),"<default>"===e.category&&(a.category=void 0),g(!1),o(!0),N(null),E([]),$(p.token,a).then((function(e){console.log("we have got response !"),console.log(e),0===e.length?(a.category=void 0,$(p.token,a).then((function(e){g(!0),E(e[0].addresses),N(e[0]),o(!1)})).catch((function(){Y.NotificationManager.error("Failed to get configuration objects","Error",3e3),o(!1)}))):(E(e[0].addresses),N(e[0]),o(!1))})).catch((function(){Y.NotificationManager.error("Failed to get configuration objects","Error",3e3),o(!1)}))}};return l.a.createElement(l.a.Fragment,null,l.a.createElement(B.a,{className:"mt-5"},l.a.createElement(S.a,{outline:!0,size:"xl",color:"primary",className:"mb-4",onClick:function(){var e="../../requests.html?region=".concat(p.region);console.log("goBack()",e),window.location.replace(e)}},l.a.createElement(Q.c,null)," Return to previous page"),l.a.createElement(z.a,null,l.a.createElement(W.a,null,l.a.createElement("h1",null,l.a.createElement(Q.a,null)," M.C.A.P (Mail Configuration Admin Page)"))),l.a.createElement("span",null,"This configuration page allow to set email reciepments for requests that match Region, Product and Category combination.",l.a.createElement("br",null),"Please note that this involves frontend and backend behaviour."),l.a.createElement(z.a,{className:"mt-4"},l.a.createElement(W.a,null,l.a.createElement("div",{className:"mb-3"},"Region",l.a.createElement(j.a,{isDisabled:!1,options:[{value:"EMEA",label:"EMEA"},{value:"NA",label:"NA"},{value:"LATAM",label:"LATAM"},{value:"APAC",label:"APAC"}],isMulti:!1,isSearchable:!1,onChange:function(e){var a=Object(s.a)({},R);a.region=e.value,P(a),w(a)}}))),l.a.createElement(W.a,null,l.a.createElement("div",{className:"mb-3"},"Product",l.a.createElement(j.a,{isDisabled:!1,options:[{value:"Genesys Cloud",label:"Genesys Cloud"},{value:"PureConnect",label:"PureConnect"},{value:"Genesys Engage",label:"Genesys Engage"},{value:"Genesys Engage Cloud",label:"Genesys Engage Cloud"},{value:"Latitude by Genesys",label:"Latitude by Genesys"}],isMulti:!1,isSearchable:!1,onChange:function(e){var a=Object(s.a)({},R);a.product=e.value,P(a),w(a)}}))),l.a.createElement(W.a,null,l.a.createElement("div",{className:"mb-3"},"Category",l.a.createElement(j.a,{isDisabled:!1,options:[{value:"<default>",label:"<default>"},{value:"Critical Situation Support",label:"Critical Situation Support"},{value:"Customer Success Program",label:"Customer Success Program"},{value:"Demo & Trial Support",label:"Demo & Trial Support"},{value:"Trial Validation",label:"Trial Validation"},{value:"Enablement",label:"Enablement"},{value:"Opportunity Support",label:"Opportunity Support"},{value:"Privacy Support",label:"Privacy Support"},{value:"Roadmap",label:"Roadmap"},{value:"Subscription Extension",label:"Subscription Extension"},{value:"Security Support",label:"Security Support"},{value:"Specialist Engagement",label:"Specialist Engagement"},{value:"Strategic Business Consulting",label:"Strategic Business Consulting"},{value:"Other Request",label:"Other Request"}],isMulti:!1,isSearchable:!1,onChange:function(e){var a=Object(s.a)({},R);a.category=e.value,P(a),w(a)}})))),l.a.createElement(z.a,null,l.a.createElement(W.a,null,l.a.createElement(V.a,{color:"warning",hidden:!u},"There is no configuration for this combination. Default rules (Region + Product) applied. ",l.a.createElement("br",null),"Once overwritten, new entry will be created."))),l.a.createElement(z.a,null,l.a.createElement(W.a,null,l.a.createElement(K.a,{value:h,onChange:function(e){console.log(e),E(e)},inputProps:Z,validationRegex:/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,onlyUnique:!0,disabled:!A})),l.a.createElement(U.a,{className:"mt-2",color:"primary",hidden:!r})),l.a.createElement(z.a,null,l.a.createElement(W.a,null,l.a.createElement(S.a,{outline:!0,size:"xl",color:"primary",className:"mt-4",onClick:function(){console.log("handleSave()"),o(!0);var e,a=Object(s.a)({},A),t=Object(s.a)({},R);a.token=p.token,a.addresses=h,console.log(a),console.log("cf.category",t.category),"<default>"!==t.category&&void 0===a.category&&(console.log("prepare new object ..."),a.id=X()(),a.category=t.category),(e=a,console.log("updateMailConfiguration ".concat(JSON.stringify(e))),fetch("".concat(J,"/mailconfig"),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then((function(e){return e.json()})).then((function(e){if(e.status<200||e.status>299)throw new Error(JSON.stringify(e));return e&&e.length>0?e:[]}))).then((function(){console.log("saved !"),Y.NotificationManager.success("Configuration updated","Success",3e3),o(!1),g(!1)})).catch((function(e){console.error(e),Y.NotificationManager.error("Failed to update configuration","Error",3e3),o(!1)}))},disabled:!A},l.a.createElement(Q.b,null)," Apply")),l.a.createElement(W.a,null)),l.a.createElement(Y.NotificationContainer,null)))}function te(e){return l.a.createElement("h1",null,"Invalid URL")}var ne=function(){return l.a.createElement(i.a,null,l.a.createElement(c.a,{path:"/requestsfilter",component:G,exact:!0}),l.a.createElement(c.a,{path:"/adminpage",component:ae,exact:!0}),l.a.createElement(c.a,{path:"/",component:te,exact:!0}))};t(129),t(130);o.a.render(l.a.createElement(ne,null),document.getElementById("root"))},74:function(e,a,t){e.exports=t(131)},79:function(e,a,t){}},[[74,1,2]]]);
//# sourceMappingURL=main.53a057eb.chunk.js.map