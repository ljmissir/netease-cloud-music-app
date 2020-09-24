const { ref } = require("vue");

// 获取验证码
const useCountDown = (count) => {
  const text = ref("获取验证码");

  const countDown = (count) => {
    count--;
    const timer = setTimeout(() => {
      text.value = `${count}s后可重新获取`;
      if (count < 0) {
        clearTimeout(timer);
        text.value = "获取验证码";
      }
      countDown(count);
    }, 1000);
  };

  const setCount = () => {
    countDown(count);
  };

  return [text, setCount, count];
};

// 加减1
const useCount = (num) => {
  const count = ref(num);
  const increase = () => {
    count.value++;
  };

  const decrease = () => {
    if (count.value <= 1) {
      return;
    }
    count.value--;
  };

  return [count, increase, decrease];
};

module.exports = {
  useCountDown,
  useCount,
};
