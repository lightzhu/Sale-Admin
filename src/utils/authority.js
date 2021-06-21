import RenderAuthorize from "@/components/Authorized";

export function getAuthority (str) {
  const authorityString =
    typeof str === 'undefined' && localStorage
      ? localStorage.getItem('authority')
      : str // authorityString could be admin, "admin", ["admin"]

  let authority
  try {
    if (authorityString) {
      authority = JSON.parse(authorityString)
    }
  } catch (e) {
    authority = authorityString
  }

  if (typeof authority === 'string') {
    return [authority]
  }
  // preview.pro.ant.design only do not use in your production.
  // preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  if (
    !authority &&
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site'
  ) {
    return ['admin']
  }

  return authority
}
export function setAuthority (authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority
  localStorage.setItem('authority', JSON.stringify(proAuthority)) // auto reload
  reloadAuthorized()
}

export let Authorized = RenderAuthorize(getAuthority()); // Reload the rights component

export const reloadAuthorized = () => {
  Authorized = RenderAuthorize(getAuthority());
};
/**
 * hard code
 * block need it。
 */
window.reloadAuthorized = reloadAuthorized;
