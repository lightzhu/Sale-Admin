import React from 'react'
import { connect } from 'dva'
import { PageLoading } from '@ant-design/pro-layout'
import { Redirect } from 'umi'
import { stringify } from 'querystring'

class AppMian extends React.Component {
  state = {
    isReady: false,
  }
  componentWillMount() {}
  componentDidMount() {
    const { dispatch } = this.props
    this.setState({
      isReady: true,
    })
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
        payload: { id: window.localStorage.getItem('id') },
      })
    }
  }
  render() {
    const { isReady } = this.state
    const { children, loading, currentUser } = this.props // You can replace it to your authentication rule (such as check token exists)
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
    const isLogin = currentUser && currentUser.id
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
