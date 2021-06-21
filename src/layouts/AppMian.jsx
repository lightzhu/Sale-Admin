import React from 'react'
import { connect } from 'dva'
import { PageLoading } from '@ant-design/pro-layout'
import { Redirect } from 'umi'
import { stringify } from 'querystring'
import Cookies from "js-cookie";
class AppMian extends React.Component {
  state = {
    isReady: false,
  }
  componentDidMount() {
    const { dispatch } = this.props
    this.setState({
      isReady: true,
    })
    if (dispatch) {
      dispatch({
        type: 'user/queryCurrent',
        payload: { id: window.sessionStorage.getItem('id') },
      })
    }
  }
  render() {
    const { isReady } = this.state
    const { children, loading, currentUser } = this.props
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
    const isLogin = Cookies.get('sessionId')||currentUser // currentUser && currentUser.id
    // console.log(isLogin)
    const queryString = stringify({
      redirect: window.location.href,
    })

    if ((!isLogin && loading) || !isReady) {
      return <PageLoading />
    }

    if (!isLogin) {
      return <Redirect to={`/user/login?${queryString}`}></Redirect>
    }
    return children
  }
}

export default connect(({ user, loading }) => ({
  currentUser: user.currentUser,
  loading: loading.models.user,
}))(AppMian)
