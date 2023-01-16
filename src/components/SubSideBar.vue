<template>
  <div style="position: relative">
    <b-sidebar no-slide id="sidebar-2" shadow>
      <div class="px-3 py-2">

        <h3><b style="margin: 10px">{{userInfo.nickName}}</b></h3>
        <b-button size="sm" @click="confirmEdit">
          <b-icon variant="" icon="pencil-fill" aria-hidden="true"></b-icon> Settings
        </b-button>
<!--        <b-icon icon="pencil-fill" font-scale="1" @click="editInfo"></b-icon>-->
        <hr>

        <div>
          <label for="name" class="grey-text" style="margin:10px">Name</label>
          <input v-model="userInfo.name" type="text" id="name" class="form-control" >
          <label for="name" class="grey-text" style="margin:10px">phone</label>
          <input v-model="userInfo.phoneNum" type="text" id="name" class="form-control">
          <label for="name" class="grey-text" style="margin:10px">g-mail</label>
          <input v-model="userInfo.googleId" type="text" id="name" class="form-control">
        </div>
        <hr>

        <div>
          <h5 style="margin:10px"><b>연결된 사람</b></h5>
          <div class="px-3 py-2 dataFalse" v-if="connCode">
            <div v-for = "otherCode in otherCodes" :key = "otherCode"  style="margin:10px">
              {{otherCode}} <button>입장</button>
            </div>
          </div>
          <div v-else>
            <p>아무도 연결되지 않았어요.</p>
            <p>친구를 초대해 보세요.</p>
          </div>
          <hr>
          <div>
            <h5 style="margin:10px"><b>입장코드 입력</b></h5>
            <input v-model="codeAdd" type="text" id="otherCode" class="form-control">
          </div>
          <hr>
          <div>
            <h5 style="margin:10px"><b>내 입장코드</b></h5>
            <label for="name" class="grey-text" style="margin:10px">{{ userInfo.code }}</label>
          </div>
        </div>

      </div>
    </b-sidebar>
  </div>
</template>

<script>

import {firebase} from "@/firebase/firebaseConfig";

export default {
  name: 'subSideBar',
  data() {
    return {
      fbCollection: 'users',
      userInfo: [],
      memoryList: [],
      whatData : false,
      googleEmail: '',
      connCode: false,
      otherCodes: [],
      userId: this.$store.state.user.uid,
      cocdeAdd: '',
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
            if(self.userInfo.otherCode.length> 1) {
              self.connCode = true
            }
            for(var i = 0; i < self.userInfo.otherCode.length; i++) {
              if(self.userInfo.otherCode[i] != self.userInfo.code) {
                self.otherCodes.push(self.userInfo.otherCode[i])
              }
            }

          })
    },
    confirmEdit() {
      const self = this;
      const db = firebase.firestore();

      const _data = {
        name: self.userInfo.name,
        phoneNum: self.userInfo.phoneNum,
        googleId: self.userInfo.googleId,

      }
      db.collection(self.fbCollection)
          .doc(self.userId)
          .set(_data, {merge: true} )
          .then(() => {
            alert("수정 완료!")
          })
    },
    // getDatalist() {
    //   const self = this;
    //   const db = firebase.firestore();
    //   console.log(self.whatData)
    //   db.collection("memory")
    //       .where("userId",'==',self.$store.state.user.uid)
    //       .get()
    //       .then((querySnapshot) => {
    //         if (querySnapshot.size === 0) {
    //           self.whatData = true
    //           console.log(self.whatData)
    //         }
    //         querySnapshot.forEach((memory) => {
    //           const _data = memory.data();
    //           _data.id = memory.id
    //           self.memoryList.push(_data);
    //           console.log(self.memoryList)
    //         });
    //       })
    // },

  },

}
</script>

<style>
#sidebar-2 {
  left: 13.8%;
  z-index:10;
  background: white;
  width: 400px;
}
</style>
