(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[1],{RqF3:function(e,t,n){"use strict";var r=n("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n("2Taf")),o=r(n("vZ4D")),i=r(n("l4Ni")),u=r(n("ujKo")),l=r(n("MhPg")),d=r(n("q1tI")),s=n("Hg0r"),c=n("Hx5s"),f=n("ArA+"),p=n("s4NR"),h=function(e){function t(){var e,n;(0,a.default)(this,t);for(var r=arguments.length,o=new Array(r),l=0;l<r;l++)o[l]=arguments[l];return n=(0,i.default)(this,(e=(0,u.default)(t)).call.apply(e,[this].concat(o))),n.state={isReady:!1},n}return(0,l.default)(t,e),(0,o.default)(t,[{key:"componentWillMount",value:function(){}},{key:"componentDidMount",value:function(){var e=this.props.dispatch;this.setState({isReady:!0}),e&&e({type:"user/fetchCurrent",payload:{id:window.localStorage.getItem("id")}})}},{key:"render",value:function(){var e=this.state.isReady,t=this.props,n=t.children,r=t.loading,a=t.currentUser,o=a&&a.id,i=(0,p.stringify)({redirect:window.location.href});return!o&&r||!e?d.default.createElement(c.PageLoading,null):o?n:d.default.createElement(f.Redirect,{to:"/user/login?".concat(i)})}}]),t}(d.default.Component),g=(0,s.connect)(function(e){var t=e.user,n=e.loading;return{currentUser:t.currentUser,loading:n.models.user}})(h);t.default=g}}]);