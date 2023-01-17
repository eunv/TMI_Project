<template>
  <div>
    <MainSideBar @changeLat="center.lat=$event" @changeLng="center.lng=$event" :centerLat="centerLat" :centerLng="centerLng"></MainSideBar>

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
        <b-icon icon="search"></b-icon>
    <div>
      <b-button size="sm" class="moveBtn btn-mdb-color">
        <b-icon icon="search" aria-hidden="true"></b-icon> 검색
      </b-button>
      <input class="searchInput" type="text" v-model="geoCoder">
    </div>


  </div>
</template>

<script>


import MainSideBar from "@/components/MainSideBar.vue";
import {firebase} from '@/firebase/firebaseConfig';
import VueDaumMap from "vue-daum-map";


export default {
  name: 'mainMap',
  components: { MainSideBar, VueDaumMap},
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
      lat: 0,
      long: 0,
      centerLat: 37,
      centerLng: 127,
      makerOn: false,
      items: {},

    }
  },
  async mounted() {
    await this.getDataList()
  },
  methods: {
    onLoad(map, daum) {
      this.map = map;
      this.maps = daum.map

      // let marker = new kakao.maps.Marker({
      //   position: map.getCenter()
      // });
      //
      // marker.setMap(map);
      //
      // kakao.maps.event.addListener(map, 'click', (mouseEvent) => {
      //
      //   // 클릭한 위도, 경도 정보를 가져옵니다
      //   let latlng = mouseEvent.latLng;
      //
      //   // 마커 위치를 클릭한 위치로 옮깁니다
      //   marker.setPosition(latlng);
      //
      //   this.xPosition = latlng.La;
      //   this.yPosition = latlng.Ma;
      //   console.log(this.xPosition)
      //   console.log(this.yPosition)
      // });
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
              this.sendFromAppLatLngMarker(_data.marker._lat, _data.marker._long, _data)
            });
          })
    },
    sendFromAppLatLngMarker(lat, long, data) {
      const self = this;
// 마커가 표시될 위치입니다
      const markerPosition = new kakao.maps.LatLng(lat, long);
      const selectedMarker = null;
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
      // 마커에 click 이벤트를 등록합니다
      kakao.maps.event.addListener(marker, 'click', function() {

        // 클릭된 마커가 없고, click 마커가 클릭된 마커가 아니면
        // 마커의 이미지를 클릭 이미지로 변경합니다
        if (!selectedMarker || selectedMarker !== marker) {

          // 클릭된 마커 객체가 null이 아니면
          // 클릭된 마커의 이미지를 기본 이미지로 변경하고
          !!selectedMarker && selectedMarker.setImage(selectedMarker.normalImage);

          // 현재 클릭된 마커의 이미지는 클릭 이미지로 변경합니다
          // marker.setImage(clickImage);
          console.log("선택~")
        }
        // 클릭된 마커를 현재 클릭된 마커 객체로 설정합니다
        this.selectedMarker = marker;
      });
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
.searchInput {
  position: absolute;
  z-index:2;
  width: 500px;
  height: 40px;
  left: 40%;
  top: 2%;
}
.moveBtn {
  position: absolute;
  z-index:3;
  width: 88px;
  height: 35px;
  left: 62%;
  top: 2%;
}


</style>
