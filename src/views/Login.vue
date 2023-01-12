<template>
  <div class="black-bg">
    <div class="white-bg">
    <p class="h4 text-center mb-4">Sign in</p>
    <label for="idIn" class="grey-text">Your id</label>
    <input type="text" id="idIn" class="form-control" />
    <br />
    <label for="pwIn" class="grey-text">Your password</label>
    <input type="password" id="pwIn" class="form-control" />
    <div class="text-center mt-4">
      <button class="btn btn-indigo" type="submit" @click="login">Login</button>
    </div>
  <!-- Default form login -->
      </div>
  </div>
</template>

<script>

import {firebase} from "@/firebase/firebaseConfig";

export default {
  name: 'login',
  components: {
  },
  data() {
    return {
      id: '',
      password:'',
    }
  },
  methods: {
    login() {
      const self = this;
      firebase.auth().signInWithEmailAndPassword(self.id+'@timproject.co.kr', self.password)
          .then(() => {
            alert('로그인 완료')
            setTimeout(() => {this.loginCheck()},1);
          })
          .catch((error) => {
            alert(error)
          })
    },
    loginCheck(){
      if(this.$store.state.user != null){
        if( this.$store.state.user.displayName === '0'){
          this.$router.push('teacherHome')
        }else if(this.$store.state.user.displayName === '1'){
          this.$router.push('studentHome')
        }
      }
    },
  }
}
</script>

<style>

.loginForm {
  position: absolute;
  width: 350px;
  height: 60px;
  left: 40%;
  top: 30%;
}
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
