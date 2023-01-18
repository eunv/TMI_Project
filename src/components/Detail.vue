<template>
  <div v-if="modal == true" class="black-bg">
    <div class="white-bg">
      <button @click="$emit('closeModal')">닫기</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data() {
    return {
    }
  },

  watch : {

  },
  props : {
    items: Array,
    modal : Boolean,

  }
}
</script>

<style>
#detail{
  position: absolute;
  z-index : 100;
  height: 50%;
}
body {
  margin : 0;
}

.black-bg {
  width: 50%; height: 50%;
  background: rgba(0,0,0,0.5);
  position: absolute; padding: 20px;
}
.white-bg {
  width: 50%; background: white;
  border-radius: 8px;
  padding: 20px;
}
</style>