<template>
  <div class>
    <b-sidebar class="mainSide" id="sidebar-1" shadow>
      <div class="px-3 py-2">
        <div>
          <h3>
          {{userInfo.nickName}}'s Map
        </h3>
        </div>
        <div>
          <table class="table " border="1" style="margin-left: auto; margin-right: auto;">
            <thead>
            <tr>
            </tr>,
            </thead>
            <tbody>
            <tr @click="$emit('changeLat', memoryList.marker._lat), $emit('changeLng', memoryList.marker._long)" v-for="(memoryList,i) in memoryList" :key="i">
              <td>{{memoryList.date}}<br> {{memoryList.title}}</td>
              <td>{{memoryList.image}}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="px-3 py-2 dataFalse" v-if="whatData">
        <p>
          추억을 남겨보세요
        </p>
      </div>
      <router-link to="maPage">My Page</router-link>
      <b-button v-b-toggle.sidebar-2 id="sidebar_openBtn" class = "sideOpenBtn">moresidebar open</b-button>
      <AddMemorySideBar></AddMemorySideBar>

    </b-sidebar>
  </div>
</template>

<script>

import {firebase} from "@/firebase/firebaseConfig";
import AddMemorySideBar from '@/components/AddMemorySideBar.vue';
// import VueDaumMap from 'vue-daum-map';

export default {
  name: 'mainSideBar',
  components: {AddMemorySideBar},
  data() {
    return {
      fbCollection: 'users',
      userInfo : [],
      memoryList: [],
      whatData : false,
      modalWindow : false,
      lat1: this.lat,
      long1: this.long
    }
  },
  mounted() {
    const self = this;
    self.init();
  },
  methods: {
    init() {
      const self = this;
      self.getData();
    },
    changeCenter(){
      this.$emit("changeCenter", this.memoryList.marker._lat)
    },
    getData() {
      const self = this;
      const db = firebase.firestore();
      db.collection(self.fbCollection)
          .doc(self.$store.state.user.uid)
          .get()
          .then((snapshot) => {
            self.userInfo = snapshot.data();
            setTimeout(() => {this.getDatalist()},1);
          })
    },
    getDatalist() {
      const self = this;
      const db = firebase.firestore();
      console.log(self.whatData)
      db.collection("memory")
      .where("userId",'==',self.$store.state.user.uid)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size === 0) {
          self.whatData = true
          console.log(self.whatData)
        }
        querySnapshot.forEach((memory) => {
          const _data = memory.data();
          _data.id = memory.id
          const date = new Date(_data.seconds * 1000);
          _data.date = getDate(date);
          self.memoryList.push(_data);
          // console.log(self.memoryList)
          // console.log(self.memore)
          });
      })
      const getDate = (date, separated = '-', notFullYear = false) => {
        if (date instanceof Date) {
          let year = date.getFullYear()
          let month = date.getMonth() + 1
          let day = date.getDate()

          if (notFullYear) year = year.toString().slice(2, 4)
          if (month < 10) month = `0${month}`
          if (day < 10) day = `0${day}`

          return `${year}${separated}${month}${separated}${day}`
        } else return '';
      }
    },
    goMyPage() {
      self.$router.push('/myPage')
    },

  },
  props: {
    centerLat: Number,
    centerLng: Number
  },
  watch:{

  }

}
</script>

<style>
#sidebar-1{
  left: 0px;
}
</style>

