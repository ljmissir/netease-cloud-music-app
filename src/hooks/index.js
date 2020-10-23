const { ref } = require("vue");
const { useStore } = require("vuex");

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

const useSetPlayList = ({ songs, id }) => {
  const store = useStore();

  const setPlayList = () => store.dispatch("setPlayList", { songs, id });

  return { setPlayList };
};

module.exports = {
  useCountDown,
  useSetPlayList
};
