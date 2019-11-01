module.exports = {
  plugins: {
    // autoprefixer: {}, // 因集成到了cssnano，故删除
    'postcss-import': {},
    'postcss-url': {},
    'postcss-aspect-ratio-mini': {},
    'postcss-write-svg': { utf8: false },
    'postcss-cssnext': {},
    'postcss-px-to-viewport': {
      viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
      viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
      unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
      // 因引入vantui,所以设置不编译vant,加.van即可,否则vantui的宽高会被vw更改,伪元素的content也会被vw适配警告
      // selectorBlackList: ['.ignore', '.hairlines', 'van-cell--required', 'van-loading__spinner--spinner', 'van-tabbar-item__icon--dot', 'van-cell:not(:last-child)'],  // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
      selectorBlackList: ['.ignore', '.hairlines'],
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
      mediaQuery: false // 允许在媒体查询中转换`px`
    },
    'cssnano': {
      // preset: "advanced",
      // autoprefixer: false,
      // "postcss-zindex": false
      // 只要启用了这个插件，z-index的值就会重置为1，千万记得将postcss-zindex设置为false,cssnano v4版本要替换为如下配置
      'cssnano-preset-advanced': {
        zindex: false,
        autoprefixer: false,
        reduceIdents: false
      }
    }
  }
}

// 可能遇到的问题
// @keyframes 和media查询里的px默认是不转化的，设置mediaQuery： true则媒体查询里也会转换px，@keyframes可以暂时手动填写vw单位的转化结果