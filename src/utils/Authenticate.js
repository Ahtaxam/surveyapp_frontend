export const tokenName = "expressToken";
export const authToken = () =>
  // document.cookie.match(new RegExp("(^| )" + tokenName + "=([^;]+)")) !== null
  //   ? document.cookie.match(new RegExp("(^| )" + tokenName + "=([^;]+)"))[2]
  //   : null; // eslint-disable-line
  localStorage.getItem("token");
