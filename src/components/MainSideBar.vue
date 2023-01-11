<template>
  <div>
    <div class='mainSideBar'>
      <ul>
        <li id='logo'>
          <div>Inventory</div>
          <div>Manager</div>
        </li>
        <li>HOME</li>
        <li>MANAGER</li>
        <li>STATE</li>
        <li>RESISTER</li>
        <li id='company'>
          <div>Welcomt to Inventory</div>
          <div>Seoul Gangnam <br> ... </div>
          <div>@copyright demnodey</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mainSideBar',
  data() {
    return {

    }
  },
  mounted() {
  },
  methods: {
  //   resize: function () {
  //     $(window).resize(function () {
  //       const height = (window.innerHeight / 2) + 'px'
  //       $('#left_btn').css({'top': height})
  //     })
  //   }
  },
}
</script>

<style>
a{color:black}
a:hover{color:rgb(255,98,124);}
.mainSideBar{;
  width:250px;
  height:100vh;
}
.mainSideBar ul {padding: 0 30px}
.mainSideBar ul li { font-size:25px;  height:75px;}
.mainSideBar ul li#logo {font-family: 'Passion One', cursive; font-size:50px; height:170px;}
.mainSideBar ul li#logo div {line-height: 0.8}
.mainSideBar ul li#company {font-size:16px; margin-top:150px; }
#left_btn {position:fixed; top:495px; left:-60px; cursor:pointer}
</style>
