export const getCookie = cookieName => {
    let cookieExpression = cookieName + '=';
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookieList = decodedCookie.split(';');
    for (let cookie of cookieList) {
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieExpression) === 0) {
            return cookie.substring(cookieExpression.length, cookie.length);
        }
    }
    return null;
};
