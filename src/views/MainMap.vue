<template>
  <div style="position:relative">
    <MainSideBar></MainSideBar>
    <div id="map">
      <!--    카카오맵은 id가 map인 영역을 찾아서 랜더링 함-->
      <b-button v-b-toggle.sidebar-1 id="sidebar_openBtn" class = "sideOpenBtn">sidebar open</b-button>
    </div>

  </div>
</template>

<script>


import MainSideBar from "@/components/MainSideBar.vue";

export default {
  name: 'mainMap',
  components: {MainSideBar},
  data() {
    return {
      map: null,
      xPosition:0,
      yPosition:0,
    }
  },
  mounted() {
    if(window.kakao && window.kakap.maps) {
      // 카카오맵이 제대로 script에 등록되었는 확인
      this.loadMap();
    } else {
      // 없다면 카카오 스크립트 추가 후 맵 실행
      this.loadScript();
    }
  },
  methods: {
    loadScript() {
      const script = document.createElement("script");

      script.onload = () => window.kakao.maps.load(this.loadMap);
      script.src =
          // 동적로딩을 위해서 autoload=fales 추가
          "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=149ca1b26e1a09a847fc3342c98b0a30";
      document.head.appendChild(script);
    },
    loadMap() {
      const container = document.getElementById("map");
      const options = {
        //지도 생성할 때 필요한 옵션
        center: new window.kakao.maps.LatLng(37.485474, 126.806064),
        level: 3,
      };
      let map = new window.kakao.maps.Map(container, options);
      this.map = map;
      let marker = new kakao.maps.Marker({
        position: map.getCenter()
      });

      marker.setMap(map);

      kakao.maps.event.addListener(map, 'click', function(mouseEvent) {

        // 클릭한 위도, 경도 정보를 가져옵니다
        let latlng = mouseEvent.latLng;

        // 마커 위치를 클릭한 위치로 옮깁니다
        marker.setPosition(latlng);

        this.xPosition = latlng.La;  //바인딩이 되질 않습니다.
        this.yPosition = latlng.Ma;
        console.log(this.xPosition)
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

</style>
