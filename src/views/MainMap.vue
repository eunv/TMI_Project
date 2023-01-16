<template>
  <div>
    <MainSideBar></MainSideBar>
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
    <div id="map">
      <!--    카카오맵은 id가 map인 영역을 찾아서 랜더링 함-->
    </div>

  </div>
</template>

<script>


import MainSideBar from "@/components/MainSideBar.vue";
import {firebase} from '@/firebase/firebaseConfig';
import VueDaumMap from "vue-daum-map";

export default {
  name: 'mainMap',
  components: {MainSideBar, VueDaumMap},
  data() {
    return {
      appkey: 'f486e714c436dbd1f7761ca8d96e43c8',
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
      markersInMap : [],
    }
  },
  async mounted() {
    await this.getDataList()
  },
  methods: {
    onLoad(map, daum) {
      this.map = map;
      this.maps = daum.map
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
              this.sendFromAppLatLngMarker(_data.marker._lat,_data.marker._long)
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
  }
}

</script>

<style scoped>
#map {
  width: 100%;
  height: 100vh;
}

.side_bar {
  width: 130px;
  height: 100vh;
}
</style>
