(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[16],{YSoM:function(e,a,t){"use strict";var l=t("g09b");Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0,t("IzEo");var s=l(t("bx4M"));t("14J3");var d=l(t("BMrR"));t("jCWc");var n=l(t("kPKH"));t("Znn+");var r=l(t("ZTPi"));t("iQDF");for(var u=l(t("+eQT")),i=t("Y2fQ"),f=l(t("q1tI")),m=l(t("ZhIB")),c=t("hGx1"),o=l(t("/t5D")),g=u.default.RangePicker,E=r.default.TabPane,k=[],h=0;h<7;h+=1)k.push({title:(0,i.formatMessage)({id:"dashboard.analysis.test"},{no:h}),total:323234});var y=function(e){var a=e.rangePickerValue,t=e.salesData,l=e.isActive,u=e.handleRangePickerChange,h=e.loading,y=e.selectDate;return f.default.createElement(s.default,{loading:h,bordered:!1,bodyStyle:{padding:0}},f.default.createElement("div",{className:o.default.salesCard},f.default.createElement(r.default,{tabBarExtraContent:f.default.createElement("div",{className:o.default.salesExtraWrap},f.default.createElement("div",{className:o.default.salesExtra},f.default.createElement("a",{className:l("today"),onClick:function(){return y("today")}},f.default.createElement(i.FormattedMessage,{id:"dashboard.analysis.all-day",defaultMessage:"All Day"})),f.default.createElement("a",{className:l("week"),onClick:function(){return y("week")}},f.default.createElement(i.FormattedMessage,{id:"dashboard.analysis.all-week",defaultMessage:"All Week"})),f.default.createElement("a",{className:l("month"),onClick:function(){return y("month")}},f.default.createElement(i.FormattedMessage,{id:"dashboard.analysis.all-month",defaultMessage:"All Month"})),f.default.createElement("a",{className:l("year"),onClick:function(){return y("year")}},f.default.createElement(i.FormattedMessage,{id:"dashboard.analysis.all-year",defaultMessage:"All Year"}))),f.default.createElement(g,{value:a,onChange:u,style:{width:256}})),size:"large",tabBarStyle:{marginBottom:24}},f.default.createElement(E,{tab:f.default.createElement(i.FormattedMessage,{id:"dashboard.analysis.sales",defaultMessage:"Sales"}),key:"sales"},f.default.createElement(d.default,{type:"flex"},f.default.createElement(n.default,{xl:16,lg:12,md:12,sm:24,xs:24},f.default.createElement("div",{className:o.default.salesBar},f.default.createElement(c.Bar,{height:295,title:f.default.createElement(i.FormattedMessage,{id:"dashboard.analysis.sales-trend",defaultMessage:"Sales Trend"}),data:t}))),f.default.createElement(n.default,{xl:8,lg:12,md:12,sm:24,xs:24},f.default.createElement("div",{className:o.default.salesRank},f.default.createElement("h4",{className:o.default.rankingTitle},f.default.createElement(i.FormattedMessage,{id:"dashboard.analysis.sales-ranking",defaultMessage:"Sales Ranking"})),f.default.createElement("ul",{className:o.default.rankingList},k.map(function(e,a){return f.default.createElement("li",{key:e.title},f.default.createElement("span",{className:"".concat(o.default.rankingItemNumber," ").concat(a<3?o.default.active:"")},a+1),f.default.createElement("span",{className:o.default.rankingItemTitle,title:e.title},e.title),f.default.createElement("span",{className:o.default.rankingItemValue},(0,m.default)(e.total).format("0,0")))})))))),f.default.createElement(E,{tab:f.default.createElement(i.FormattedMessage,{id:"dashboard.analysis.visits",defaultMessage:"Visits"}),key:"views"},f.default.createElement(d.default,null,f.default.createElement(n.default,{xl:16,lg:12,md:12,sm:24,xs:24},f.default.createElement("div",{className:o.default.salesBar},f.default.createElement(c.Bar,{height:292,title:f.default.createElement(i.FormattedMessage,{id:"dashboard.analysis.visits-trend",defaultMessage:"Visits Trend"}),data:t}))),f.default.createElement(n.default,{xl:8,lg:12,md:12,sm:24,xs:24},f.default.createElement("div",{className:o.default.salesRank},f.default.createElement("h4",{className:o.default.rankingTitle},f.default.createElement(i.FormattedMessage,{id:"dashboard.analysis.visits-ranking",defaultMessage:"Visits Ranking"})),f.default.createElement("ul",{className:o.default.rankingList},k.map(function(e,a){return f.default.createElement("li",{key:e.title},f.default.createElement("span",{className:"".concat(o.default.rankingItemNumber," ").concat(a<3?o.default.active:"")},a+1),f.default.createElement("span",{className:o.default.rankingItemTitle,title:e.title},e.title),f.default.createElement("span",null,(0,m.default)(e.total).format("0,0")))})))))))))},M=y;a.default=M}}]);