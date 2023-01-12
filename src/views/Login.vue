<template>
<<<<<<< HEAD
  <div class="black-bg">
    <div class="white-bg">
    <p class="h4 text-center mb-4">Sign in</p>
    <label for="idIn" class="grey-text" >Your id</label>
    <input type="text" id="idIn" class="form-control" v-model = "id"/>
    <br />
    <label for="pwIn" class="grey-text">Your password</label>
    <input type="password" id="pwIn" class="form-control" v-model = "password"/>
    <div class="text-center mt-4">
      <button class="btn btn-indigo" type="submit" @click="login">Login</button>
    </div>
  <!-- Default form login -->
      </div>
=======
  <div>
    <div class = "title">
      <h2><span class = "text-red">T</span>rip</h2>
      <h2><span class = "text-red">M</span>emory</h2>
      <h2><span class = "text-red">I</span>nformation</h2>
    </div>
    <button class = "loginButton white">구글로 시작하기</button>
>>>>>>> 36cd6d59ccbe760799247378c04ed9d54046a9f0
  </div>
</template>

<script>
<<<<<<< HEAD

import {firebase} from "@/firebase/firebaseConfig";

export default {
  name: 'login',
  components: {
  },
  data() {
    return {
      id: '',
      password: '',
    }
  },
  methods: {
    login() {
      const self = this;
      firebase.auth().signInWithEmailAndPassword(self.id+'@timproject.co.kr', self.password)
          .then(() => {
            alert('로그인 완료')
            self.$router.push('/mainMap')
          })
          .catch((error) => {
            alert(error)
          })
    },
  }
=======
export default {
  name: 'login',
  data() {
    return {

    }
  },

>>>>>>> 36cd6d59ccbe760799247378c04ed9d54046a9f0
}
</script>

<style>
<<<<<<< HEAD

.black-bg {
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.5);
  position: fixed; padding: 20px;
}
.white-bg {
  width: 35%;
  background: white;
  border-radius: 8px;
  padding: 50px;
  position: absolute;
  top: 30%;
  left: 37%;
  margin: -50px 0 0 -50px;
}
</style>
=======
body {
  background-image: url("../assets/images/bgPhoto.jpg");
  background-color:rgba(0, 0, 0, 0.5);
  background-size: cover;
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
.text-red {
  color: red;
}
.loginButton{
  position: absolute;
  width: 350px;
  height: 60px;
  left: 40%;
  top: 70%;
  font-size:25px;
  line-height: 50px;
  text-align: center;
  background: white;
  /*border: solid 2px grey;*/
  border-radius: 12px;
}
</style>
>>>>>>> 36cd6d59ccbe760799247378c04ed9d54046a9f0
