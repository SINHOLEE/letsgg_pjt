export default () => {
    if (process.env.NODE_ENV === 'production') {
        return "https://letsgg.site/api";
    } else if (process.env.NODE_ENV === 'development') {
        return "https://letsgg.site/api";
        // return "https://k02a1011.p.ssafy.io/api";
    }
    return "http://letsgg.site:8081/api";
};