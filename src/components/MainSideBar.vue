<template>
  <div class>
    <b-sidebar id="sidebar-1" shadow>
      <div class="px-3 py-2">
        <h3>
          {{userInfo.nickName}}'s Map
        </h3>
        {{memoryList}}
      </div>
      <div class="px-3 py-2 dataFalse" v-if="whatData">
        <p>
          추억을 남겨보세요
        </p>
      </div>
      <router-link to="maPage">My Page</router-link>
    </b-sidebar>
  </div>
</template>

<script>

import {firebase} from "@/firebase/firebaseConfig";

export default {
  name: 'mainSideBar',
  data() {
    return {
      fbCollection: 'users',
      userInfo : [],
      memoryList: [],
      whatData : false,
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

}
</script>

<style>

</style>
