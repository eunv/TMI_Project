<template>
  <div v-if="modal == true" class="black-bg">
    <div class="white-bg">
      <button class="closeBtn" @click="$emit('closeModal')">닫기</button>
<!--      {{items}}-->
      <b-icon id="sidebar_openBtn" icon="pencil-fill" font-scale="1.5" class="editButton"></b-icon>
      <h5>{{memory.date}}</h5>
      <h5 class="title1" >제목: {{memory.title}}</h5>
      <h5 class="content1 ">{{memory.content}}</h5>
      <img :src="memory.image" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data() {
    return {
      memory: {},
    }
  },
  watch : {

  },
  props : {
    items: Array,
    obj: Object,
    modal : Boolean,
  },
  created() {
    this.memory= this.obj
  },
  // mounted() {
  //   // console.log("memory:"+this.memory.title)
  //   // console.log("obj:"+this.obj)
  //   // console.log("items:"+this.items)
  // },

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
  width: 100%; background: white;
  height: 100%;
  border-radius: 8px;
  padding: 20px;
}
.closeBtn {
  position: absolute;
  left: 49%;
  top: 85%;
}
img {
  width: 300px;
  height: 300px;
  object-fit: cover;
  /*margin: 20px;*/
}
.title1 {
  position: absolute;
  top: 20%;
  left: 50%;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
}
.content1 {
  position: absolute;
  top: 30%;
  left: 50%;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
}
.editButton {
  position: absolute;
  top:10%;
  left: 90%;
}
</style>
