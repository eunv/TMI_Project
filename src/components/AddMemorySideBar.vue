<template>
  <div class>
    <b-sidebar  no-slide class="addMemory" id="sidebar-2">
      <div class="px-3 py-2">
        <h4>제목</h4>
        <input v-model="title"><br><br>
        {{title}}
        <h4>내용</h4>
        <input type="textarea" v-model="content"><br><br>
        <h4>위치 지정하기</h4>
        {{lat}}{{long}}
<b-button @click="addMemory">저장하기</b-button>
      </div>
    </b-sidebar>
  </div>
</template>

<script>

import {firebase} from "@/firebase/firebaseConfig";
// import * as geofire from 'geofire-common';
// import geofire from 'geofire';
import 'firebase/storage'

export default {
  name: 'addMemorySideBar',
  data() {
    return {
      fbCollection: 'memory',
      userInfo: {},
      title: '',
      content: '',
      hash: null,
      // marker: new firebase.firestore.GeoPoint(this.lat, this.long)
      marker: {},
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
      db.collection('users')
          .doc(self.$store.state.user.uid)
          .get()
          .then((snapshot) => {
            self.userInfo = snapshot.data();
          })
    },
    addMemory(){
      const self = this;         // self를 쓰는 이유는 바깥의 this들과 햇갈리지 않기 위해서
      const db = firebase.firestore();
      const now = new Date();
      const marker = new firebase.firestore.GeoPoint(this.lat, this.long);
      // const firestore.GeoPoint = require('geopoint')
      const _data = {            // data()에 있는 데이터가 바로 들어갈 수 없다.
        title: self.title,
        content: self.content,
        date: now,
        userId: self.$store.state.user.uid,
        // marker: self.marker,
        image:[],
        marker: marker,
        lat: this.lat,
        long: this.long,
        user: {
          name: this.userInfo.name,
        },
      }
      db.collection(self.fbCollection) //<- collection('컬랙션명') 바로 쓸수있다.
          .add(_data)
          .then(() => {            // 아무 문제없이 윗쪽 코드가 다 성공하면 then이 실행
            alert("저장되었습니다")
            location.reload();
          })  // 성공하면 무엇을 할건지 정하면 된다/ 이 코드에선 alert가 실행된다

          .catch((e) => {          // 실패하면 catch가 실행된다. e는 errer의 약자
            console.log(e)
            alert("저장에 실패했습니다.")
          })
    },
    onLoad(map, daum) {
      this.map = map;
      this.maps = daum.map

      let marker = new kakao.maps.Marker({
        position: map.getCenter()
      });

      marker.setMap(map);

      kakao.maps.event.addListener(map, 'click', function (mouseEvent) {

        // 클릭한 위도, 경도 정보를 가져옵니다
        let latlng = mouseEvent.latLng;

        // 마커 위치를 클릭한 위치로 옮깁니다
        marker.setPosition(latlng);

        this.lat = latlng.La;
        this.long = latlng.Ma;
        console.log(this.lat)
      });
    },
  },
  props: {
    lat: Number,
    long: Number
  }

}
</script>

<style>
#sidebar-2{
  left: 310px;
}
</style>

