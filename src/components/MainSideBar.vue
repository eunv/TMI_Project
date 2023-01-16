<template>
  <div>
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
<!--      <b-button v-b-toggle.sidebar-2 id="sidebar_openBtn">subPage</b-button>-->
      <b-icon v-b-toggle.sidebar-2 id="sidebar_openBtn" icon="pencil-fill" font-scale="1.5" class="goMypage"></b-icon>
      <b-button variant="outline-info" class="mb-2 logOutBtn">
        <b-icon icon="power" aria-hidden="true"></b-icon> Logout
      </b-button>
    </b-sidebar>
  </div>
</template>

<script>

import {firebase} from "@/firebase/firebaseConfig";

export default {
  name: 'mainSideBar',
  components: {},
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

  },

}
</script>

<style>
.logOutBtn {
  position: absolute;
  z-index:2;
  font-size: 15px;
  width: 130px;
  height: 40px;
  left: 50%;
  top: 95%;
}
.goMypage {
  position: absolute;
  left:10px;
  top:90%;
}

</style>
