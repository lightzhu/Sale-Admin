(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[11],{ZsZz:function(e,t,a){"use strict";var l=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=l(a("jehZ"));a("+L6B");var s=l(a("2/Rp"));a("y8nQ");var n=l(a("Vl3Y"));a("5NDa");var o=l(a("5rEg")),u=l(a("2Taf")),d=l(a("vZ4D")),i=l(a("l4Ni")),f=l(a("ujKo")),m=l(a("MhPg"));a("OaEy");var c=l(a("2fM7")),p=l(a("q1tI")),v=l(a("cR3f")),h=(a("luuv"),c.default.Option,{labelCol:{xs:{span:24},sm:{span:5}},wrapperCol:{xs:{span:24},sm:{span:12}}}),b={wrapperCol:{xs:{span:12,offset:4},sm:{span:12,offset:4}}},y=function(e){function t(e){var a;return(0,u.default)(this,t),a=(0,i.default)(this,(0,f.default)(t).call(this,e)),a.handleSubmit=function(e){e.preventDefault(),a.props.form.validateFieldsAndScroll(function(e,t){e?console.log(t):console.log("Received values of form: ",t)})},a.formReset=function(){a.props.form.resetFields()},a.validateToNextPassword=function(e,t,l){var r=a.props.form;t&&a.state.confirmDirty&&r.validateFields(["confirm"],{force:!0}),l()},a.compareToFirstPassword=function(e,t,l){var r=a.props.form;console.log(t,r.getFieldValue("password")),t&&t!==r.getFieldValue("password")?l("Two passwords that you enter is inconsistent!"):l()},a.handleConfirmBlur=function(e){var t=e.target.value;a.setState({confirmDirty:a.state.confirmDirty||!!t})},a.validPhoneNum=function(e){var t=a.props.isMobile,l=e.target.value;console.log(0),t(l)?a.setState({isPhoneNum:"success"}):a.setState({isPhoneNum:"error"})},a.state={isPhoneNum:"",confirmDirty:!1},a}return(0,m.default)(t,e),(0,d.default)(t,[{key:"render",value:function(){var e=this.props.form.getFieldDecorator;return p.default.createElement("div",{className:v.default.container},p.default.createElement("div",{id:"components-form-demo-validate-static"},p.default.createElement(n.default,(0,r.default)({},h,{onSubmit:this.handleSubmit}),p.default.createElement(n.default.Item,{label:"company",hasFeedback:!0},e("company",{rules:[{required:!0,message:"Should be a company name"}]})(p.default.createElement(o.default,{placeholder:"Please input company name"}))),p.default.createElement(n.default.Item,{label:"E-mail",hasFeedback:!0},e("email",{rules:[{type:"email",message:"The input is not valid E-mail!"},{required:!0,message:"Please input your E-mail!"}]})(p.default.createElement(o.default,{placeholder:"Please input your email"}))),p.default.createElement(n.default.Item,{label:"UserName",hasFeedback:!0},e("username",{rules:[{required:!0,message:"Should be only alphabets"}]})(p.default.createElement(o.default,{placeholder:"Please input name",maxLength:20}))),p.default.createElement(n.default.Item,{label:"Password",hasFeedback:!0},e("password",{rules:[{required:!0,message:"Please input your password!"},{validator:this.validateToNextPassword}]})(p.default.createElement(o.default.Password,null))),p.default.createElement(n.default.Item,{label:"Confirm Password",hasFeedback:!0},e("confirm",{rules:[{required:!0,message:"Please confirm your password!"},{validator:this.compareToFirstPassword}]})(p.default.createElement(o.default.Password,{onBlur:this.handleConfirmBlur}))),p.default.createElement(n.default.Item,{label:"Phone Number",validateStatus:this.state.isPhoneNum},e("phone",{rules:[{required:!1,message:"Please input your phone number!"}]})(p.default.createElement(o.default,{style:{width:"100%"},onBlur:this.validPhoneNum}))),p.default.createElement(n.default.Item,b,p.default.createElement("div",{className:v.default.btns},p.default.createElement("div",null,p.default.createElement(s.default,{type:"primary",onClick:this.formReset},"Reset")),p.default.createElement("div",{offset:5},p.default.createElement(s.default,{type:"primary",htmlType:"submit"},"Register")))))))}}]),t}(p.default.Component),g=y;t.default=g},cR3f:function(e,t,a){e.exports={btns:"antd-pro-pages-user-register-register-form-index-btns"}},qq80:function(e,t,a){"use strict";var l=a("tAuX"),r=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("y8nQ");var s=r(a("Vl3Y")),n=l(a("q1tI")),o=(a("ArA+"),a("Hg0r"),a("+n12")),u=r(a("vyRF")),d=r(a("ZsZz")),i=function(e){console.log(e);var t=s.default.create({name:"validate_reguster"})(d.default);return n.default.createElement("div",{className:u.default.main},n.default.createElement(t,{isMobile:o.isMobile}))},f=i;t.default=f},vyRF:function(e,t,a){e.exports={main:"antd-pro-pages-user-register-style-main"}}}]);