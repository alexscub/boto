
// SCSS
import './assets/scss/main.scss'

// CSS (example)
// import './assets/css/main.css'

// Vue.js
import Vue from 'vue'
import Router from 'vue-router'
import App from './js/App.vue'
import Weather from './js/components/Weather.vue'
import WeekWeather from './js/components/WeekWeather.vue'
import NotFound from './js/pages/NotFound.vue'
import Main from './js/pages/Main.vue'

Vue.use(Router)

const router = new Router({
 routes: [
   {
     path: '/',
     component: Main,
     children: [
      {
        path: '',
        name:'weather',
        component: Weather,
      },
      {
        path: '/week',
        name:'week',
        component: WeekWeather,
      },
    ],
     props: true,
   },
   {
    path: '*',
    component: NotFound,
  },
 ],
  mode: 'hash'
})

new Vue({
 el: '#app',
 render: h => h(App),
 router
})
