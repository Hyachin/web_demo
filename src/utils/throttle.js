export const throttle = function (fn, wait = 200) {
    let pre = new Date()
    return function () {
        let now = new Date()
        if (now - pre >= wait) {
            fn(this, arguments)
            pre = now
        }
    }
}