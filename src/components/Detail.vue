<template>
  <div v-if="modal == true" class="black-bg">
    <div class="white-bg">
<!--      수정버튼을 누르지 않았으면 상세페이지 출력-->
      <div v-if="edit == false">
        <button class="closeBtn" @click="$emit('closeModal')">닫기</button>
        <div v-if="owner == true">
          <b-icon id="sidebar_openBtn" icon="pencil-fill" font-scale="1.5" class="editButton" @click="goEdit"></b-icon>
        </div>

        <h5 class="date1">{{memory.date}}</h5>
        <h5 class="title1" >제목: {{memory.title}}</h5>
        <h5 class="content1 ">{{memory.content}}</h5>
        <img class="img2" :src="memory.image" />
      </div>
<!--      수정버튼을 누르면 수정페이지 출력-->
      <div v-if="edit == true ">
        <h5>{{memory.date}}</h5>
        <img :src="memory.image" />
        <label for="title" class="grey-text labelTag1" style="margin:10px">제목</label>
        <input  v-model="memory.title" type="text" id="title" class="form-control inputTag1" >
        <label for="content" class="grey-text labelTag2" style="margin:10px">내용</label>
        <input v-model="memory.content" type="text" id="content" class="form-control inputTag2" >
        <button class="no btn-outline-mdb-color" @click="endEdit">취소</button>
        <button class="ok btn-outline-mdb-color" @click="confirm">수정</button>

      </div>
    </div>
  </div>
</template>

<script>
import {firebase} from "@/firebase/firebaseConfig";

export default {
  name: 'detail',
  data() {
    return {
      memory: {},
      edit: false,
      fbCollection: "memory",
      owner: true,
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
  mounted() {
    this.ownerCheck()
  },
  methods: {
    goEdit() {
      this.edit=true
    },
    endEdit() {
      this.edit=false
    },
    confirm() {
      const self = this;
      const db = firebase.firestore();
      const _data = {
        title: self.memory.title,
        content: self.memory.content,
      }
      db.collection(self.fbCollection)
          .doc(self.memory.id)
          .set(_data, {merge: true} )
          .then(() => {
            alert("수정되었습니다.")
            self.$router.go();
          })
    },
    ownerCheck() {
      const self = this;
      if(self.$store.state.user.uid === self.memory.userId){
        self.owner = true
        console.log("주인임")
      }
      else {
        self.owner = false
        console.log("주인아님")
      }

    },

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

/*.black-bg {*/
/*  width: 100%; height: 100%;*/
/*  background: rgba(0,0,0,0.5);*/
/*  position: absolute; padding: 20px;*/
/*}*/
.white-bg {
  width: 700px; background: white;
  height: 500px;
  border-radius: 8px;
  position: absolute;

  top: 50%;

  left: 60%;

  transform: translate(-50%, -50%);
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
  margin: 20px;
}
.date1 {
  position: absolute;
  top: 10px;
  left: 20px;
}
.img2 {
  position: absolute;
  top: 20px;
}
.title1 {
  position: absolute;
  top: 100px;
  left: 400px;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
}
.content1 {
  position: absolute;
  top: 150px;
  left: 400px;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 20px
}
.editButton {
  position: absolute;
  top:40px;
  left: 730px;
}
.labelTag1 {
  position: absolute;
  top:100px;
  left: 400px;
  width: 600px;
}
.inputTag1 {
  position: absolute;
  top:150px;
  left: 400px;
  width: 600px;
}
.labelTag2 {
  position: absolute;
  top:200px;
  left: 400px;
  width: 600px;
}
.inputTag2 {
  position: absolute;
  top:250px;
  left: 400px;
  width: 600px;
}
.no {
  position: absolute;
  top:90%;
  left:650px;
}
.ok {
  position: absolute;
  top:90%;
  left:600px;
}
</style>
