<template>
  <div class = "front">
    <b-button v-b-toggle.sidebar-1>Toggle Sidebar</b-button>
    <b-sidebar id="sidebar-1" title="Sidebar" shadow>
      <div class="px-3 py-2">
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
          in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </p>
        <b-img src="https://picsum.photos/500/500/?image=54" fluid thumbnail></b-img>
      </div>
      <b-button variant="success" @click="this.$router.push('/')">작성완료</b-button>

    </b-sidebar>
  </div>
</template>

<script>

export default {
  name: 'mainSideBar',
  data() {
    return {

    }
  },
  mounted() {
  },
  methods: {



  },

}
</script>

<style>

</style>
