// import 'app.vue'
import App from './app.vue' // 根vue文件
import Vue from 'vue' // 引入vue.js对象
import './style/index.css'
import './style/index.less'
import gifStr from './assets/1.gif'
import pngStr from './assets/logo_small.png'
const gif = document.createElement('img')
const png = document.createElement('img')
gif.src = gifStr
png.src = pngStr
document.body.appendChild(gif)
document.body.appendChild(png)
const fn = () => console.log(第一天);
fn()