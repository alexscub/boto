<template>
<div class="container">
        <form  action="" @submit.prevent="submitForm">
            <input class="input" type="text" placeholder="enter city" v-model="query">
            <button class="button" type="submit"> Search</button>
        </form>
        <div class="routes-wrapper">
        <router-link exact=true activeClass="button--active" class ="button" :to="{ name: 'weather'}" >
           Now
        </router-link>
        <router-link exact=true activeClass="button--active" class ="button" :to="{ name: 'week'}">
           Week
        </router-link>
        </div>
      <div class="content">
        <transition name="fade" mode="out-in" :duration="{ enter: 500, leave: 300 }">
        <router-view :queryCity="queryCity"></router-view>
        </transition>
      </div>
</div>
</template>

<script>
export default {
  methods: {
    submitForm() {
      this.queryCity=this.query;
    },},
  data() {
    return {
      queryCity: null,
      query: null,
    }
  },
}
</script>