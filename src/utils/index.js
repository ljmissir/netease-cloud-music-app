const utils = {
  // 获取地址栏参数
  getUrlParams() {
    let search = window.location.search;
    let hash = window.location.hash;
    let match1 = (search && search.match(/([^?=&]+)=([^?&]+)/g)) || [];
    let match2 = (hash && hash.match(/([^?=&]+)=([^?&]+)/g)) || [];
    let match = match1.concat(match2);
    return (
      match &&
      match.reduce(function(a, b) {
        let val = b.split(/([^?=&]+)=([^?&]+)/g);
        a[val[1]] = val[2];
        return a;
      }, {})
    );
  },
  //! 防抖的原理就是：你尽管触发事件，但是我一定在事件触发n秒后才执行，如果n秒内重复触发事件，则重新计时
  debounce(fn, delay) {
    var timer;
    return function() {
      timer && clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, arguments);
      }, delay);
    };
  },
  // ! 节流原理：规定在一个单位时间内，只能执行一次函数。如果这个单位时间内触发多次函数，只有一次生效，稀释事件执行频率
  throttle(fn, delay) {
    var pre = 0;
    return function() {
      var now = new Date().getTime();
      if (now - pre > delay) {
        fn.apply(this, arguments);
        pre = now;
      }
    };
  },
};

export default utils;
