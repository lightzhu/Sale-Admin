(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[8],{aeIQ:function(e,t,a){"use strict";var r=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(a("p0pE")),u=r(a("d6i3")),d=a("wIta"),i={namespace:"order",state:{list:[],refund:[],totalSize:0},effects:{fetch:u.default.mark(function e(t,a){var r,n,i,s;return u.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,n=a.call,i=a.put,e.next=4,n(d.queryOrderList,r);case 4:return s=e.sent,e.next=7,i({type:"queryList",payload:s});case 7:case"end":return e.stop()}},e)}),appendFetch:u.default.mark(function e(t,a){var r,n,i,s;return u.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,n=a.call,i=a.put,e.next=4,n(d.queryOrderList,r);case 4:return s=e.sent,e.next=7,i({type:"appendList",payload:Array.isArray(s)?s:[]});case 7:case"end":return e.stop()}},e)}),submit:u.default.mark(function e(t,a){var r,n,i,s,c;return u.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,n=a.call,i=a.put,s=r.id?1===Object.keys(r).length?d.removeFakeList:d.updateFakeList:d.addFakeList,e.next=5,n(s,r);case 5:return c=e.sent,e.next=8,i({type:"queryList",payload:c});case 8:case"end":return e.stop()}},e)}),fetchRefundList:u.default.mark(function e(t,a){var r,n,i,s;return u.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,n=a.call,i=a.put,e.next=4,n(d.refundList,r);case 4:return s=e.sent,e.next=7,i({type:"updateRefundList",payload:s});case 7:case"end":return e.stop()}},e)}),fetchRefundCondition:u.default.mark(function e(t,a){var r,n,i,s;return u.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.payload,n=a.call,i=a.put,e.next=4,n(d.queryRefundCondition,r);case 4:return s=e.sent,e.next=7,i({type:"updateRefundList",payload:s});case 7:case"end":return e.stop()}},e)})},reducers:{queryList:function(e,t){return(0,n.default)({},e,{list:t.payload.data})},appendList:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{list:[]},t=arguments.length>1?arguments[1]:void 0;return(0,n.default)({},e,{list:e.list.concat(t.payload)})},updateRefundList:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{refund:[]},t=arguments.length>1?arguments[1]:void 0;return t.payload.data.forEach(function(e){e["description"]="".concat(e["description"],";\u5356\u5bb6\u5730\u5740:").concat(e.address,"\u3002")}),(0,n.default)({},e,{totalSize:t.payload.total,refund:t.payload.data})}}},s=i;t.default=s},wIta:function(e,t,a){"use strict";var r=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.queryOrderList=c,t.removeFakeList=p,t.addFakeList=f,t.updateFakeList=y,t.refundList=v,t.queryRefundCondition=k;var n=r(a("p0pE")),u=r(a("jehZ")),d=r(a("d6i3")),i=r(a("1l/V")),s=r(a("t3Un"));function c(e){return l.apply(this,arguments)}function l(){return l=(0,i.default)(d.default.mark(function e(t){return d.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,s.default)("/order/list",{params:t}));case 1:case"end":return e.stop()}},e)})),l.apply(this,arguments)}function p(e){return o.apply(this,arguments)}function o(){return o=(0,i.default)(d.default.mark(function e(t){var a;return d.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a=(0,u.default)({},t),e.abrupt("return",(0,s.default)("/order/fake_list",{method:"POST",data:(0,n.default)({},a,{method:"delete"})}));case 2:case"end":return e.stop()}},e)})),o.apply(this,arguments)}function f(e){return h.apply(this,arguments)}function h(){return h=(0,i.default)(d.default.mark(function e(t){var a;return d.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a=(0,u.default)({},t),e.abrupt("return",(0,s.default)("/order/fake_list",{method:"POST",data:(0,n.default)({},a,{method:"post"})}));case 2:case"end":return e.stop()}},e)})),h.apply(this,arguments)}function y(e){return w.apply(this,arguments)}function w(){return w=(0,i.default)(d.default.mark(function e(t){var a;return d.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a=(0,u.default)({},t),e.abrupt("return",(0,s.default)("/order/fake_list",{method:"POST",data:(0,n.default)({},a,{method:"update"})}));case 2:case"end":return e.stop()}},e)})),w.apply(this,arguments)}function v(e){return m.apply(this,arguments)}function m(){return m=(0,i.default)(d.default.mark(function e(t){return d.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,s.default)("/order/refund_list",{method:"GET",params:t}));case 1:case"end":return e.stop()}},e)})),m.apply(this,arguments)}function k(e){return x.apply(this,arguments)}function x(){return x=(0,i.default)(d.default.mark(function e(t){return d.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,s.default)("/order/refund_list_condition",{method:"GET",params:t}));case 1:case"end":return e.stop()}},e)})),x.apply(this,arguments)}}}]);