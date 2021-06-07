<template>
  <section >
    <p class="weather__country" v-if="error">Error:{{error}}</p>
     <div v-else-if="weather.desc">
      <p class="weather__country">{{ weather.city }}, {{weather.country}}</p>
      <div class="weather__wrapper">
          <div class="weather__date">{{weather.dt}}</div>
          <div class="weather__temp">{{weather.temp}} ℃</div>
          <div class="weather__desc">{{weather.desc}}</div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import getFormatedDate from '../functions/getFormatedDate.js'
export default {
  props: ['queryCity'],
  data() {
    return {
      weather: {
        city:'',
        country: '',
        temp: '',
        desc: ''
      },
      error: null,
    }
  },
  methods: {
    searchWeather(city) {
      axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=a0646833f3759acb0a1d5725d827841e`)
    .then(response=>{
      this.weather.city=response.data.name;
      this.weather.country = response.data.sys.country
      this.weather.temp = response.data.main.temp
      this.weather.desc = response.data.weather[0].main
      this.weather.dt = getFormatedDate(response.data.dt)
    })
    .catch(e=>this.error=e.message)
    }
  },
watch: {
    queryCity(newCity) {
      this.error=null;
    this.searchWeather(newCity)}
  },
created() {this.queryCity && this.searchWeather(this.queryCity)},
}
</script>
