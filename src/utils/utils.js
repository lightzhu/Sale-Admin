import { parse } from 'querystring'
import pathRegexp from 'path-to-regexp'
import { message } from "antd";

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/
export const isUrl = path => reg.test(path)
export const isAntDesignPro = () => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true
  }

  return window.location.hostname === 'preview.pro.ant.design'
} // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

export const isAntDesignProOrDev = () => {
  const { NODE_ENV } = process.env

  if (NODE_ENV === 'development') {
    return true
  }

  return isAntDesignPro()
}
export const getPageQuery = () => parse(window.location.href.split('?')[1])
/**
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */

export const getAuthorityFromRouter = (router = [], pathname) => {
  const authority = router.find(
    ({ path = '/' }) => path && pathRegexp(path).exec(pathname)
  )
  if (authority) return authority
  return undefined
}
export const getRouteAuthority = (path, routeData) => {
  let authorities
  routeData.forEach(route => {
    // match prefix
    if (pathRegexp(`${route.path}/(.*)`).test(`${path}/`)) {
      if (route.authority) {
        authorities = route.authority
      } // exact match

      if (route.path === path) {
        authorities = route.authority || authorities
      } // get children authority recursively

      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities
      }
    }
  })
  return authorities
}
// 是否是邮箱
export function isMail(str) {
  return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})$/.test(
    str
  )
}
// 是否为手机号码
export function isMobile(str) {
  return /^1(2|3|4|5|6|7|8|9)\d{9}$/.test(str)
}

// 判断对象是否为空({})
export function isEmptyObj(obj) {
  for (var key in obj) {
    return false // 返回false，不为空对象
  }
  return true // 返回true，为空对象
}
// 清理localStorage 和 sessionStorage 缓存
export function clearStorage() {
  return new Promise(function (reslove, reject) {
    try {
      setTimeout(() => {
        window.localStorage.clear()
        window.sessionStorage.clear()
        reslove()
      }, 100)
    } catch (e) {
      reject(e)
    }
  })
}
// 统一message
export function messageShow(resp) {
  if (resp.status == '200') {
    message.success(resp.message);
  } else {
    message.warning(resp.message);
  }
}
