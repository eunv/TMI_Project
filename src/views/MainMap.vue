<template>
  <div>
    <MainSideBar></MainSideBar>
    <div>
      <SubSideBar></SubSideBar>
    </div>

    <b-button v-b-toggle.sidebar-1 id="sidebar_openBtn" class = "sideOpenBtn">sidebar open</b-button>
    <vue-daum-map
        :appKey="appkey"
        :center.sync="center"
        :level.sync="level"
        :mapTypeId="mapTypeId"
        :libraries="libraries"
        @load="onLoad"
        style="width:100%;height:100vh;"
    >
    </vue-daum-map>
    <b-input-group size="sm" class="mb-2 moveBtn">
      <b-input-group-prepend is-text>
        <b-icon icon="search"></b-icon>
      </b-input-group-prepend>
      <b-form-input type="search" placeholder="Search terms" v-model="geoCoder"></b-form-input>
    </b-input-group>

  </div>
</template>

<script>


import MainSideBar from "@/components/MainSideBar.vue";
import {firebase} from '@/firebase/firebaseConfig';
import VueDaumMap from "vue-daum-map";
import SubSideBar from "@/components/SubSideBar.vue";

export default {
  name: 'mainMap',
  components: {SubSideBar, MainSideBar, VueDaumMap},
  data() {
    return {
      appkey: '149ca1b26e1a09a847fc3342c98b0a30',
      center: {lat: 37.5411, lng: 127.068},
      level: 3,
      mapTypeId: VueDaumMap.MapTypeId.NORMAL,
      libraries: [],
      mapObject: null,
      map: null,
      maps: null,
      markers: [],
      rows: [],
      fbCollection: 'memory',
      userId: this.$store.state.user.uid,
      markersInMap: [],
      geoCoder: '',
      xPosition: 0,
      yPosition: 0,

    }
  },
  async mounted() {
    await this.getDataList()
  },
  methods: {
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

        this.xPosition = latlng.La;
        this.yPosition = latlng.Ma;
        console.log(this.xPosition)
      });
    },
    async getDataList() {
      const self = this;
      const db = firebase.firestore();
      await db.collection(self.fbCollection)
          .where("userId", "==", this.userId)
          .get()
          .then((querySnapshot) => {
            if (querySnapshot.size === 0) {
              return
            }
            querySnapshot.forEach((doc) => {
              const _data = doc.data();
              _data.id = doc.id //각 유저 필드에 따로 id값이 없지만 유저 고유 id를 불로올 수 있음
              console.log(_data.marker._lat)
              console.log(_data.marker._long)
              this.sendFromAppLatLngMarker(_data.marker._lat, _data.marker._long)
            });
          })
    },
    sendFromAppLatLngMarker(lat, long) {
      const self = this;
// 마커가 표시될 위치입니다
      const markerPosition = new kakao.maps.LatLng(lat, long);

      console.log(markerPosition)
      // const markerImageUrl = '/images/marker2.png',
      //     markerImageSize = new this.maps.Size(20, 20), // 마커 이미지의 크기
      //     markerImageOptions = {
      //       // offset: new this.maps.Point(62, 28)// 마커 좌표에 일치시킬 이미지 안의 좌표
      //     };
      //
      // const markerImage = new this.maps.MarkerImage(markerImageUrl, markerImageSize, markerImageOptions);

// 마커를 생성합니다
      const marker = new kakao.maps.Marker({
        map: self.map,
        // image: markerImage,
        position: markerPosition
      });
      self.markersInMap.push(marker)
    },


  },
}
</script>

<style scoped>
#map {
  width: 100%;
  height: 100vh;
}
.sideOpenBtn{
  position: absolute;
  z-index:2;
  /*left: 42%;*/
  /*top: 85%;*/
}
.searchBtn {
  position: absolute;
  z-index:2;
  width: 500px;
  height: 40px;
  left: 40%;
  top: 2%;
}
.moveBtn {
  position: absolute;
  z-index:2;
  width: 500px;
  left: 40%;
  top: 2%;
}


</style>
