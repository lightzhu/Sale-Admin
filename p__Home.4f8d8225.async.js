(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[7],{"5/F1":function(e,t,a){"use strict";var l=a("tAuX"),n=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("2qtc");var o=n(a("kLXV"));a("14J3");var r=n(a("BMrR"));a("+L6B");var i=n(a("2/Rp"));a("6UJt");var d=n(a("DFOY"));a("jCWc");var s=n(a("kPKH"));a("y8nQ");var u=n(a("Vl3Y")),c=n(a("jehZ"));a("5NDa");var f=n(a("5rEg")),p=n(a("p0pE")),m=n(a("2Taf")),h=n(a("vZ4D")),v=n(a("l4Ni")),E=n(a("ujKo")),g=n(a("MhPg"));a("OaEy");var y=n(a("2fM7")),b=l(a("q1tI")),L=a("Hg0r"),k=a("UGL3"),C=a("FqRs"),S=a("jijL"),w=y.default.Option,x=function(e){function t(e){var a;return(0,m.default)(this,t),a=(0,v.default)(this,(0,E.default)(t).call(this,e)),a.formLayout={labelCol:{span:7},wrapperCol:{span:17}},a.formLayout2={labelCol:{span:4},wrapperCol:{span:20}},a.handleCreate=function(){var e=a.props,t=e.form,l=e.updateShops,n=e.isShopEdit,o=e.shopInfo;t.validateFields(function(e,t){if(!e){var a=(0,p.default)({},t);console.log(a),n?(0,k.updateShopInfo)((0,p.default)({id:o.id},a)).then(function(e){1==e.status&&l()}):(0,k.creatShop)(a).then(function(e){console.log(e),1==e.status&&l()})}})},a.handleCategoryChange=function(){},a.renderContent=function(e,t){var l=a.props.form,n=l.getFieldDecorator;return[b.default.createElement(s.default,{span:12,key:"name"},b.default.createElement(u.default.Item,(0,c.default)({},a.formLayout,{label:"\u5e97\u94fa\u540d\u79f0"}),n("name",{initialValue:e.name,rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u5e97\u94fa\u540d\u79f0"}]})(b.default.createElement(f.default,{placeholder:"\u8bf7\u8f93\u5165\u5e97\u94fa\u540d\u79f0"})))),b.default.createElement(s.default,{span:12,key:"category"},b.default.createElement(u.default.Item,(0,c.default)({},a.formLayout,{label:"\u5e97\u94fa\u7c7b\u522b"}),n("category",{rules:[{required:!0,message:"Please select your gender!"}],initialValue:e.category})(b.default.createElement(y.default,{placeholder:"\u8bf7\u9009\u62e9\u7c7b\u522b",onChange:a.handleCategoryChange},t.length?t.map(function(e,t){return b.default.createElement(w,{key:e.id,value:e.id},e.name)}):null)))),b.default.createElement(s.default,{span:12,key:"phone"},b.default.createElement(u.default.Item,(0,c.default)({},a.formLayout,{label:"\u624b\u673a\u53f7"}),n("phone",{initialValue:e.phone,rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u624b\u673a\u53f7"}]})(b.default.createElement(f.default,{type:"number",placeholder:"\u8bf7\u8f93\u5165\u624b\u673a\u53f7"})))),b.default.createElement(s.default,{span:12,key:"address"},b.default.createElement(u.default.Item,(0,c.default)({},a.formLayout,{label:"\u5730\u5740"}),n("address",{initialValue:e.address,rules:[{type:"array",required:!0,message:"\u8bf7\u9009\u62e9\u5730\u5740!"}]})(b.default.createElement(d.default,{options:S.address})))),b.default.createElement(s.default,{span:24,key:"description"},b.default.createElement(u.default.Item,(0,c.default)({},a.formLayout2,{label:"\u5e97\u94fa\u63cf\u8ff0"}),n("description",{initialValue:e.description,rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u5e97\u94fa\u63cf\u8ff0"}]})(b.default.createElement(f.default.TextArea,{rows:4,placeholder:"\u8bf7\u8f93\u5165\u5e97\u94fa\u63cf\u8ff0"}))))]},a.renderFooter=function(){var e=a.props,t=e.isShopEdit,l=e.handleCancel;return[b.default.createElement(i.default,{key:"cancel",onClick:function(){return l(!1)}},"\u53d6\u6d88"),b.default.createElement(i.default,{key:"forward",type:"primary",onClick:a.handleCreate},t?"\u786e\u8ba4\u4fee\u6539":"\u786e\u8ba4\u65b0\u589e")]},a.state={currentStep:0,categoryList:[]},a}return(0,g.default)(t,e),(0,h.default)(t,[{key:"componentDidMount",value:function(){var e=this;(0,C.getGoodCategory)({id:0}).then(function(t){t.length&&e.setState({categoryList:t})})}},{key:"render",value:function(){var e=this.props,t=e.creatShopVisible,a=e.handleCancel,l=e.isShopEdit,n=this.props,i=n.shopInfo,d=(n.admin,this.state.categoryList);return b.default.createElement(o.default,{width:660,bodyStyle:{padding:"30px 40px 30px"},destroyOnClose:!0,title:l?"\u4fee\u6539\u5e97\u94fa":"\u65b0\u589e\u5e97\u94fa",visible:t,footer:this.renderFooter(),onCancel:function(){return a(!1)}},b.default.createElement(u.default,{className:"add-shop-form"},b.default.createElement(r.default,{gutter:24},this.renderContent(i,d))))}}]),t}(b.Component);x.defaultProps={handleUpdate:function(){},handleUpdateModalVisible:function(){},values:{}};var I=(0,L.connect)(function(e){var t=e.shop,a=e.user;return{shopInfo:t.shopInfo,admin:a.currentUser}})(u.default.create()(x));t.default=I},"9cQA":function(e,t,a){"use strict";var l=a("tAuX"),n=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("2qtc");var o=n(a("kLXV"));a("T2oS");var r=n(a("W9HT")),i=n(a("2Taf")),d=n(a("vZ4D")),s=n(a("l4Ni")),u=n(a("ujKo")),c=n(a("MhPg")),f=l(a("q1tI")),p=a("Hg0r"),m=n(a("iWl8")),h=n(a("PDBv")),v=n(a("5/F1")),E=n(a("pmf8")),g=n(a("Ww8N")),y=function(e){function t(e){var a;return(0,i.default)(this,t),a=(0,s.default)(this,(0,u.default)(t).call(this,e)),a.reqRef=0,a.handleOk=function(e){var t=a.props.commodity.fileList;console.log(t),a.setState({editPicShow:!1})},a.handleCancel=function(e){a.setState({editPicShow:!1,creatShopVisible:!1})},a.state={homeData:{},editPicShow:!1,creatShopVisible:!1,isShopEdit:!1},a}return(0,c.default)(t,e),(0,d.default)(t,[{key:"componentDidMount",value:function(){var e=this.props.dispatch;e&&(this.getShopList(),this.loadHomeSum())}},{key:"getShopList",value:function(){var e=this.props.dispatch;e&&e({type:"shop/fetchShops",payload:{id:window.sessionStorage.getItem("id")}}),this.handleCancel()}},{key:"loadHomeSum",value:function(){var e=this.props.dispatch;e&&e({type:"home/fetch"})}},{key:"productsMore",value:function(){var e=this.props.dispatch;e({type:"home/getRepertory"})}},{key:"setImageList",value:function(e){var t=this.props.dispatch;t({type:"commodity/saveFileList",payload:e}),this.setState({editPicShow:!0})}},{key:"handleCreatVisible",value:function(e){e||this.props.dispatch({type:"shop/initShop"}),this.setState({isShopEdit:e,creatShopVisible:!0})}},{key:"componentWillUnmount",value:function(){}},{key:"creatLeft",value:function(e,t,a){if(e){var l=e.map(function(e,l){return 1==t?f.default.createElement("li",{key:l},f.default.createElement("p",null,e.name),f.default.createElement("p",null,f.default.createElement("span",null,a),e.val)):f.default.createElement("li",{key:l},f.default.createElement("p",null,e.name),f.default.createElement("p",null,e.val,f.default.createElement("span",null,a)))});return f.default.createElement("ul",null,l)}}},{key:"render",value:function(){var e=this.props,t=e.home,a=e.shop,l=e.shopsListLoading,n=e.productsListLoading,i=e.ProductsList,d=e.dispatch,s=t.sumMoney,u=t.sumBills,c=a.shopsList;return f.default.createElement("div",{className:g.default.main},f.default.createElement("div",{className:g.default.sumtop},f.default.createElement("h5",null,"\u9500\u552e\u4e1a\u7ee9\u4e00\u89c8"),f.default.createElement("div",{className:g.default.sumcontent},f.default.createElement("div",{className:g.default.topleft},this.creatLeft(s,"1","$")),f.default.createElement("div",{className:g.default.topright},this.creatLeft(u,"2","\u5355")))),f.default.createElement("div",{className:g.default.spin},f.default.createElement(r.default,{spinning:l,size:"large"})),f.default.createElement(o.default,{title:"\u7f16\u8f91\u5546\u54c1\u56fe\u7247",className:g.default.standardListForm,width:660,destroyOnClose:!0,visible:this.state.editPicShow,onOk:this.handleOk,onCancel:this.handleCancel},f.default.createElement(E.default,null)),f.default.createElement(h.default,{shopsList:c,creatShop:this.handleCreatVisible.bind(this),updateShop:this.handleCreatVisible.bind(this),dispatch:d}),f.default.createElement(m.default,{title:"\u6211\u7684\u5e93\u5b58",loading:n,loadMore:this.productsMore.bind(this),setImageList:this.setImageList.bind(this),list:i}),f.default.createElement(v.default,{creatShopVisible:this.state.creatShopVisible,isShopEdit:this.state.isShopEdit,handleCancel:this.handleCancel,handleCreatVisible:this.handleCreatVisible.bind(this),updateShops:this.getShopList.bind(this)}))}}]),t}(f.default.Component),b=(0,p.connect)(function(e){var t=e.home,a=e.shop,l=e.commodity,n=e.loading;return{home:t,shop:a,commodity:l,shopsListLoading:n.effects["shop/fetchShops"],loading:n.effects["home/fetch"],billLoading:n.effects["home/getBills"],productsListLoading:n.effects["home/getRepertory"]}})(y);t.default=b},PDBv:function(e,t,a){"use strict";var l=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("14J3");var n=l(a("BMrR"));a("Telt");var o=l(a("Tckk"));a("jCWc");var r=l(a("kPKH"));a("+L6B");var i=l(a("2/Rp"));a("IzEo");var d=l(a("bx4M")),s=a("RBnf"),u=l(a("q1tI")),c=l(a("vZ7W")),f=d.default.Meta,p=function(e){var t=e.shopsList,a=e.creatShop,l=e.updateShop,p=e.dispatch;return u.default.createElement("div",{className:c.default.cardList},u.default.createElement(n.default,{type:"flex",justify:"space-between"},u.default.createElement(r.default,{span:11},u.default.createElement(i.default,{type:"dashed",className:c.default.newButton,onClick:function(){a(!1)}},u.default.createElement(s.PlusOutlined,null)," \u65b0\u589e\u5e97\u94fa")),t.map(function(e,t){return u.default.createElement(r.default,{span:t%2?11:12,key:t},u.default.createElement(d.default,{actions:[u.default.createElement(s.SettingOutlined,{key:"setting"}),u.default.createElement(s.EditOutlined,{key:"edit",onClick:function(){p({type:"shop/fetch",payload:{id:e.id}}),l(!0)}}),u.default.createElement(s.EllipsisOutlined,{key:"ellipsis"})]},u.default.createElement(f,{avatar:u.default.createElement(o.default,{src:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"}),title:e.name,description:e.shopDesc}),u.default.createElement("ul",{className:c.default.shopBill},u.default.createElement("li",null,u.default.createElement("span",null,"\u4eca\u65e5\u8ba2\u5355"),u.default.createElement("span",null,e.dayBill)),u.default.createElement("li",null,u.default.createElement("span",null,"\u672c\u5468\u8ba2\u5355"),u.default.createElement("span",null,e.weekBill)),u.default.createElement("li",null,u.default.createElement("span",null,"\u672c\u6708\u8ba2\u5355"),u.default.createElement("span",null,e.monthBill)),u.default.createElement("li",null,u.default.createElement("span",null,"\u672c\u6708\u8425\u4e1a\u989d"),u.default.createElement("span",null,e.monthCount)))))})))},m=p;t.default=m},Ww8N:function(e,t,a){e.exports={main:"antd-pro-pages-home-index-main",spin:"antd-pro-pages-home-index-spin",sumtop:"antd-pro-pages-home-index-sumtop",sumcontent:"antd-pro-pages-home-index-sumcontent",topleft:"antd-pro-pages-home-index-topleft",topright:"antd-pro-pages-home-index-topright"}},iWl8:function(e,t,a){"use strict";var l=a("tAuX"),n=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("cWXX");var o=n(a("/ezw"));a("Mwp2");var r=n(a("VXEj"));a("Telt");var i=n(a("Tckk"));a("Q9mQ");var d=n(a("diRs"));a("+L6B");var s=n(a("2/Rp")),u=n(a("qIgq")),c=l(a("q1tI")),f=a("ArA+"),p=n(a("vZ7W")),m=function(e){var t=e.title,a=e.list,l=e.loading,n=e.loadMore,m=e.setImageList,h=(0,c.useState)(null),v=(0,u.default)(h,2),E=v[0],g=v[1],y=function(e){return e?null:c.default.createElement("div",{style:{textAlign:"center",marginTop:12,height:32,lineHeight:"32px"}},c.default.createElement(s.default,{onClick:n},"loading more"))},b=function(){E&&m(E.imageList)},L=c.default.createElement("div",{className:"tools"},c.default.createElement(s.default,{size:"small",block:!0,onClick:b},"\u7ba1\u7406\u56fe\u7247"),c.default.createElement(s.default,{size:"small",block:!0},"\u5220\u9664\u5546\u54c1"),c.default.createElement(s.default,{size:"small",block:!0,type:"danger"},"\u505c\u552e\u5546\u54c1"));return c.default.createElement("div",{className:p.default.listBox},c.default.createElement("div",{className:p.default.head},c.default.createElement("h5",null,t),c.default.createElement(f.Link,{to:"/commodity/commodityAdd"},c.default.createElement(s.default,{type:"primary"},"\u4e0a\u67b6\u5546\u54c1"))),c.default.createElement(r.default,{className:[p.default.list,"felx-list"],loading:l,itemLayout:"horizontal",loadMore:y(l),dataSource:a,renderItem:function(e){return c.default.createElement(r.default.Item,{actions:[c.default.createElement(d.default,{content:L,trigger:"click"},c.default.createElement("a",{key:"list-loadmore-edit",onClick:function(t){t.preventDefault(),g(e)}},"edit")),c.default.createElement("a",{key:"list-loadmore-more"},"more")]},c.default.createElement(o.default,{avatar:!0,title:!1,loading:e.loading,active:!0},c.default.createElement(r.default.Item.Meta,{avatar:c.default.createElement(i.default,{shape:"square",size:"large",src:e.proImg}),title:c.default.createElement("a",{href:"https://i.ebayimg.com/thumbs/images/g/yc4AAOSwQN5ag2m8/s-l225.webp"},e.product)}),c.default.createElement("div",{className:p.default.content},c.default.createElement("span",{className:p.default.amount},e.amount," \u4ef6"),c.default.createElement("span",{className:p.default.status},"(",e.specification,")"))))}}))},h=m;t.default=h},jijL:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.address=void 0;var l=[{value:"\u6d59\u6c5f",label:"\u6d59\u6c5f",children:[{value:"\u676d\u5dde",label:"\u676d\u5dde",children:[{value:"\u897f\u6e56",label:"\u897f\u6e56"},{value:"\u8427\u5c71",label:"\u8427\u5c71"}]},{value:"\u5b81\u6ce2",label:"\u5b81\u6ce2",children:[{value:"\u911e\u5dde",label:"\u911e\u5dde"},{value:"\u9547\u6d77",label:"\u9547\u6d77"}]}]},{value:"\u6c5f\u82cf",label:"\u6c5f\u82cf",children:[{value:"\u5357\u4eac",label:"\u5357\u4eac",children:[{value:"\u6c5f\u5b81",label:"\u6c5f\u5b81"}]}]}];t.address=l},k5A4:function(e,t,a){e.exports={card:"antd-pro-components-edit-pic-index-card",heading:"antd-pro-components-edit-pic-index-heading",steps:"antd-pro-components-edit-pic-index-steps",errorIcon:"antd-pro-components-edit-pic-index-errorIcon",anticon:"antd-pro-components-edit-pic-index-anticon",errorPopover:"antd-pro-components-edit-pic-index-errorPopover",errorListItem:"antd-pro-components-edit-pic-index-errorListItem",errorField:"antd-pro-components-edit-pic-index-errorField",editable:"antd-pro-components-edit-pic-index-editable",advancedForm:"antd-pro-components-edit-pic-index-advancedForm",optional:"antd-pro-components-edit-pic-index-optional"}},pmf8:function(e,t,a){"use strict";var l=a("tAuX"),n=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("y8nQ");var o=n(a("Vl3Y"));a("2qtc");var r=n(a("kLXV"));a("DZo9");var i=n(a("8z0m"));a("fOrg");var d=n(a("+KLJ"));a("Pwec");var s=n(a("CtXQ")),u=n(a("d6i3")),c=n(a("1l/V")),f=n(a("qIgq")),p=l(a("q1tI")),m=a("Hg0r"),h=n(a("k5A4")),v={labelCol:{span:5},wrapperCol:{span:19}},E=function(e){var t=e.fileList,a=e.dispatch,l=(0,p.useState)(!1),n=(0,f.default)(l,2),m=n[0],E=n[1],g=(0,p.useState)(""),y=(0,f.default)(g,2),b=y[0],L=y[1],k=function(e){return new Promise(function(t,a){var l=new FileReader;l.readAsDataURL(e),l.onload=function(){return t(l.result)},l.onerror=function(e){return a(e)}})},C=function(){return E(!1)},S=function(){var e=(0,c.default)(u.default.mark(function e(t){return u.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(t.url||t.preview){e.next=4;break}return e.next=3,k(t.originFileObj);case 3:t.preview=e.sent;case 4:E(!0),L(t.url||t.preview);case 6:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),w=p.default.createElement("div",null,p.default.createElement(s.default,{type:"plus"}),p.default.createElement("div",{className:"ant-upload-text"},"Upload")),x=function(e){console.log(e),a&&a({type:"commodity/saveFileList",payload:e.fileList})};return p.default.createElement(p.default.Fragment,null,p.default.createElement(o.default,{layout:"horizontal",className:h.default.stepForm},p.default.createElement(d.default,{closable:!0,showIcon:!0,message:"\u6700\u591a\u53ea\u80fd\u4e0a\u4f205\u5f20\u7167\u7247,\u5305\u62ec\u4ea7\u54c1\u4e3b\u56fe\u3001\u5c3a\u5bf8\u56fe\u53ca\u89c4\u683c\u56fe\u3002",style:{marginBottom:24}}),p.default.createElement("div",{className:"clearfix"},p.default.createElement(i.default,{action:"https://www.mocky.io/v2/5cc8019d300000980a055e76",listType:"picture-card",fileList:t,onPreview:S,onChange:x},t.length>=5?null:w),p.default.createElement(r.default,{visible:m,footer:null,onCancel:C},p.default.createElement("img",{alt:"example",style:{width:"100%"},src:b}))),p.default.createElement(o.default.Item,{style:{marginBottom:8},wrapperCol:{xs:{span:24,offset:0},sm:{span:v.wrapperCol.span,offset:v.labelCol.span}},label:""})))},g=(0,m.connect)(function(e){var t=e.commodity;return{fileList:t.fileList}})(E);t.default=g},vZ7W:function(e,t,a){e.exports={listBox:"antd-pro-pages-home-components-style-listBox",list:"antd-pro-pages-home-components-style-list",content:"antd-pro-pages-home-components-style-content",amount:"antd-pro-pages-home-components-style-amount",head:"antd-pro-pages-home-components-style-head",newButton:"antd-pro-pages-home-components-style-newButton",cardList:"antd-pro-pages-home-components-style-cardList",shopBill:"antd-pro-pages-home-components-style-shopBill"}}}]);