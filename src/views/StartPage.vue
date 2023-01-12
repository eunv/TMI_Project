<template>
  <div>
    <div class = "title">
      <h2><span class = "text-red">T</span>rip</h2>
      <h2><span class = "text-red">M</span>emory</h2>
      <h2><span class = "text-red">I</span>nformation</h2>
    </div>
    <hr align = "center" width = "500px" color="white"/>
    <button class = "loginButton white">구글로 시작하기</button>
    <img class = "googleImg" src = "../assets/images/googleImage.png">
    <router-link to="login" class="loginLink">로그인</router-link>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {

    }
  },

}
</script>

<style>
body {
  background-image: url("../assets/images/bgPhoto.jpg");
  background-color:rgba(0, 0, 0, 0.5);
  background-size: cover;
}
a {
  text-decoration:none;
  color: white;
  font-weight: 600;

}
.title {
  position: absolute;
  /*width: 35%;*/
  /*height: 40%;*/
  left: 30%;
  top: 300px;

  /*font-family: 'Roboto';*/
  font-style: normal;
  font-weight: 700;
  font-size: 500px;
  line-height: 59px;

  color: #FFFFFF;

  text-shadow: 0px 8px 4px rgba(0, 0, 0, 0.25);
}
h2{
  font-style: normal;
  font-weight: 700;
  font-size: 75px;
  line-height: 59px;
}
hr {
  position: absolute;
  left: 37%;
  top: 67%;
  height: 3px;
}
.text-red {
  color: red;
}
.loginButton{
  position: absolute;
  width: 350px;
  height: 60px;
  left: 40%;
  top: 70%;
  font-size:23px;
  line-height: 50px;
  text-align: center;
  background: white;
  /*border: solid 2px grey;*/
  border-radius: 12px;
}
.googleImg {
  position: absolute;
  left: 42%;
  top: 70.8%;
  width: 40px;
  height: 40px;
}
.loginLink {
  position: absolute;
  left: 41%;
  top: 77%;
  font-size:23px;
  color: white;
}
</style>