// create history
const history = require('history/createHashHistory').default({
  basename: '/sale-admin/',
});
window.g_history = history;
export default history;
