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
            </tr>
            </thead>
            <tbody>
            <tr v-for="(memoryList,i) in memoryList" :key="i">
              <td>{{memoryList.date}}<br> {{memoryList.title}}</td>
              <td>{{memoryList.image}}</td></tr>
            {{lat}}
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
      <AddMemorySideBar :lat="lat" :long="long"></AddMemorySideBar>

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
          self.memoryList.push(_data);
          console.log(self.memoryList)
          });
      })
    },
    goMyPage() {
      self.$router.push('/myPage')
    },

  },
  props: {
    lat: Number,
    long: Number
  }

}
</script>

<style>
#sidebar-1{
  left: 0px;
}
</style>

