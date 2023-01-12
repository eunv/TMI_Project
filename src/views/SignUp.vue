<template>
  <div class="black-bg">
    <div class="white-bg">
      <p class="h4 text-center mb-4">Sign up</p>
      <label for="defaultFormRegisterNameEx" class="grey-text">이름</label>
      <input v-model="name" type="text" id="defaultFormRegisterNameEx" class="form-control" />
      <br />
      <label for="defaultFormRegisterNameEx" class="grey-text">닉네임</label>
      <input v-model="nickName" type="text" id="defaultFormRegisterNameEx" class="form-control" />
      <br />
      <label for="defaultFormRegisterConfirmEx" class="grey-text">전화번호</label>
      <input v-model="phoneNum" type="text" id="defaultFormRegisterConfirmEx" class="form-control" />
      <br />
      <label for="defaultFormRegisterEmailEx" class="grey-text">아이디</label>
      <input v-model="id" type="text" id="defaultFormRegisterEmailEx" class="form-control" />
      <br />
      <label for="defaultFormRegisterConfirmEx" class="grey-text">비밀번호</label>
      <input v-model="password" type="password" id="defaultFormRegisterConfirmEx" class="form-control" />
      <br />
      <label for="defaultFormRegisterPasswordEx" class="grey-text">비밀번호 확인</label>
      <input v-model="comparePassword" type="password" id="defaultFormRegisterPasswordEx" class="form-control" />
      <div class="text-center mt-4">
        <button class="btn btn-unique" type="submit" @click="signup">Register</button>
      </div>
    </div>
  </div>
</template>

<script>
import {firebase} from '@/firebase/firebaseConfig';

export default {
  name: "SignUp",
  data(){
    return{
      fbCollection: "users",
      name: "",
      nickName: '',
      phoneNum: '',
      id:'',
      password: '',
      comparePassword: '',
    }
  },
  methods: {
    signup(){
      const self = this;
      const db = firebase.firestore();
      firebase.auth().createUserWithEmailAndPassword(this.id+'@timproject.co.kr', this.password)
          .then( (result) =>{
            let user = result.user;
            db.collection(self.fbCollection)
                .doc(result.user.uid)
                .set({
                  name: self.name,
                  nickName: self.nickName,
                  phoneNum: self.phoneNum,
                })
            alert('회원가입 완료!');
            user.updateProfile({displayName: self.name, photoURL: self.level})
            // firebase.auth().signOut()
            this.$router.push('/');
          }).catch(err => {
        console.error(err);
        alert('에러 : ' + err.message)
      })
    },
    autoHyphen(){ = (target) => {
      target.value = target.value
          .replace(/[^0-9]/g, '')
          .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
    }
    }
  },
}
</script>

<style>
  body{
    background-image: url("bgPhoto.jpg");
    background-size: cover;
  }
  .black-bg {
    width: 100%; height: 100%;
    background: rgba(0,0,0,0.5);
    position: fixed; padding: 20px;
  }
  .white-bg {
    width: 60%; background: white;
    border-radius: 8px;
    padding: 50px;
    position: absolute;
    top: 10%;
    left: 24%;
    margin: -50px 0 0 -50px;
  }
</style>
