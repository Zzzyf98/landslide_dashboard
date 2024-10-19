module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '106': '20rem',
        '110': '22rem',
        '114': '24rem',
        '118': '26rem', 
        '120': '28rem', 
        '124': '30rem', 
        '128': '32rem', 
        '144': '36rem', 
        '160': '40rem', 
        '176': '44rem', 
        // 你可以根据需要添加更多自定义高度
      }
    },
  },
  plugins: [],
}