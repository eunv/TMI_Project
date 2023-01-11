<template>
  <div>
    <MainMap></MainMap>
    <MainSideBar></MainSideBar>
  </div>
</template>

<script>


import MainMap from "@/views/MainMap.vue";
import MainSideBar from "@/components/MainSideBar.vue";

export default {
  name: 'home',
  components: {
    MainSideBar,
    MainMap
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style>

</style>
