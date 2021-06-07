<template>
  <section>
     <p  class="weather__country" v-if="error">Error:{{error}}</p>
     <div v-else-if="daily">
      <p class="weather__country">{{city }},{{country }}</p>
        <div class="weather__wrapper" v-for="(item) in daily" :key="item.dt">
          <div class="weather__date">{{item.dt}}</div>
          <div class="weather__temp">{{item.temp}} ℃</div>
          <div class="weather__desc">{{item.desc}}</div>
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
      city:'',
      country: '',
      lon:null,
      lat:null,
      daily:null,
      error: null,
    }
  },
  methods: {
    getCoords(newCity) {
    return axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${newCity}&units=metric&appid=a0646833f3759acb0a1d5725d827841e`)
    .then(response=>{
      console.log(response)
      this.lon=response.data.coord.lon
      this.lat=response.data.coord.lat
      this.city=response.data.name;
      this.country = response.data.sys.country
    })
    },
    searchWeather(city) {
      this.getCoords(city)
    .then(()=>axios.get(`http://api.openweathermap.org/data/2.5/onecall?&exclude=current,minutely,hourly,alerts&lat=${this.lat}&lon=${this.lon}&&units=metric&appid=a0646833f3759acb0a1d5725d827841e`))
     .then(resp=>this.daily=resp.data.daily.map(el=>{
       return{dt:getFormatedDate(el.dt),desc:el.weather[0].main, temp:el.temp.day}
     }))
     .catch(e=>this.error=e.message)
     },
  },
  watch: {
    queryCity(newCity) {
    this.error=null;
    this.searchWeather(newCity)
  },
},
created() {this.queryCity && this.searchWeather(this.queryCity)},
}
</script>
