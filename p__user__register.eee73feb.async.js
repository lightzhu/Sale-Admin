(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[12],{ZsZz:function(e,t,a){"use strict";var l=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=l(a("jehZ"));a("+L6B");var s=l(a("2/Rp"));a("y8nQ");var n=l(a("Vl3Y"));a("5NDa");var o=l(a("5rEg")),i=l(a("2Taf")),u=l(a("vZ4D")),d=l(a("l4Ni")),f=l(a("ujKo")),m=l(a("MhPg")),c=l(a("q1tI")),p=l(a("cR3f")),v={labelCol:{xs:{span:24},sm:{span:5}},wrapperCol:{xs:{span:24},sm:{span:12}}},h={wrapperCol:{xs:{span:12,offset:4},sm:{span:12,offset:4}}},g=function(e){function t(e){var a;return(0,i.default)(this,t),a=(0,d.default)(this,(0,f.default)(t).call(this,e)),a.handleSubmit=function(e){e.preventDefault();var t=a.props.submit;a.props.form.validateFieldsAndScroll(function(e,a){e?console.log(a):(console.log("Received values of form: ",a),t(a))})},a.formReset=function(){a.props.form.resetFields()},a.validateToNextPassword=function(e,t,l){var r=a.props.form;t&&a.state.confirmDirty&&r.validateFields(["confirm"],{force:!0}),l()},a.compareToFirstPassword=function(e,t,l){var r=a.props.form;console.log(t,r.getFieldValue("password")),t&&t!==r.getFieldValue("password")?l("Two passwords that you enter is inconsistent!"):l()},a.handleConfirmBlur=function(e){var t=e.target.value;a.setState({confirmDirty:a.state.confirmDirty||!!t})},a.validPhoneNum=function(e){var t=a.props.isMobile,l=e.target.value;0==l.toString().trim().length||t(l)?a.setState({isPhoneNum:"success"}):a.setState({isPhoneNum:"error"})},a.state={isPhoneNum:"",confirmDirty:!1},a}return(0,m.default)(t,e),(0,u.default)(t,[{key:"render",value:function(){var e=this.props.form.getFieldDecorator;return c.default.createElement("div",{className:p.default.container},c.default.createElement("div",{id:"components-form-demo-validate-static"},c.default.createElement(n.default,(0,r.default)({},v,{onSubmit:this.handleSubmit}),c.default.createElement(n.default.Item,{label:"E-mail",hasFeedback:!0},e("email",{rules:[{type:"email",message:"The input is not valid E-mail!"},{required:!0,message:"Please input your E-mail!"}]})(c.default.createElement(o.default,{placeholder:"Please input your email"}))),c.default.createElement(n.default.Item,{label:"UserName",hasFeedback:!0},e("user_name",{rules:[{required:!0,message:"Should be only alphabets"}]})(c.default.createElement(o.default,{placeholder:"Please input name",maxLength:20}))),c.default.createElement(n.default.Item,{label:"Password",hasFeedback:!0},e("password",{rules:[{required:!0,message:"Please input your password!"},{validator:this.validateToNextPassword}]})(c.default.createElement(o.default.Password,null))),c.default.createElement(n.default.Item,{label:"Confirm Password",hasFeedback:!0},e("confirm",{rules:[{required:!0,message:"Please confirm your password!"},{validator:this.compareToFirstPassword}]})(c.default.createElement(o.default.Password,{onBlur:this.handleConfirmBlur}))),c.default.createElement(n.default.Item,{label:"Phone Number",validateStatus:this.state.isPhoneNum},e("phone",{rules:[{required:!1,message:"Please input your phone number!"}]})(c.default.createElement(o.default,{style:{width:"100%"},onBlur:this.validPhoneNum}))),c.default.createElement(n.default.Item,h,c.default.createElement("div",{className:p.default.btns},c.default.createElement("div",null,c.default.createElement(s.default,{type:"primary",onClick:this.formReset},"Reset")),c.default.createElement("div",{offset:5},c.default.createElement(s.default,{type:"primary",htmlType:"submit"},"Register")))))))}}]),t}(c.default.Component),b=g;t.default=b},cR3f:function(e,t,a){e.exports={btns:"antd-pro-pages-user-register-register-form-index-btns"}},qq80:function(e,t,a){"use strict";var l=a("tAuX"),r=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("y8nQ");var s=r(a("Vl3Y")),n=r(a("p0pE")),o=l(a("q1tI")),i=a("Hg0r"),u=a("+n12"),d=r(a("vyRF")),f=r(a("ZsZz")),m=function(e){console.log(e);var t=function(t){var a=e.dispatch;a({type:"login/register",payload:(0,n.default)({},t)})},a=s.default.create({name:"validate_reguster"})(f.default);return o.default.createElement("div",{className:d.default.main},o.default.createElement(a,{isMobile:u.isMobile,submit:t}))},c=(0,i.connect)(function(e){var t=e.login,a=e.loading;return{isRegister:t.isRegister,submitting:a.effects["login/register"]}})(m);t.default=c},vyRF:function(e,t,a){e.exports={main:"antd-pro-pages-user-register-style-main"}}}]);