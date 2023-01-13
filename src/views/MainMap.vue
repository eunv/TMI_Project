<template>
  <div >
    <div id="map">
      <!--    카카오맵은 id가 map인 영역을 찾아서 랜더링 함-->
    </div>

  </div>

</template>

<script>
export default {
  name: 'mainMap',
  data() {
    return {
      map: null,
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
          "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=f486e714c436dbd1f7761ca8d96e43c8";
      document.head.appendChild(script);
    },
    loadMap() {
      const container = document.getElementById("map");
      const options = {
        //지도 생성할 때 필요한 옵션
        center: new window.kakao.maps.LatLng(37.485474, 126.806064),
        level: 3,
      };
      this.map = new window.kakao.maps.Map(container, options);
    },
  },
  components: {
  }

}
</script>

<style scoped>
#map {
  width: 100%;
  height: 100vh;

}
.side-bar {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
}
</style>
