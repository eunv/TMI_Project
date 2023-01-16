<template>
  <div>
    <b-sidebar no-slide="true" className="subSide" id="sidebar-3" shadow>
      <div className="px-3 py-2">
        <p>hi mypage</p>

      </div>
    </b-sidebar>
  </div>
</template>

<script>

import {firebase} from "@/firebase/firebaseConfig";

export default {
  name: 'myPage',
  data() {
    return {
      fbCollection: 'users',
      userInfo: [],
      memoryList: [],
      whatData: false,
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
            setTimeout(() => {
              this.getDatalist()
            }, 1);
          })
    },
    getDatalist() {
      const self = this;
      const db = firebase.firestore();
      console.log(self.whatData)
      db.collection("memory")
          .where("userId", '==', self.$store.state.user.uid)
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
#sidebar-3 {
  left: 13.8%;
  z-index: 10;
  background: white;
  width: 400px;
}
</style>
