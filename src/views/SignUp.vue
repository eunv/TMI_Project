<template>
  <div class="black-bg">
    <div class="white-bg">
      <p class="h4 text-center mb-4">Sign up</p>
      <label for="defaultFormRegisterNameEx" class="grey-text">이름</label>
      <input v-model="name" type="text" id="defaultFormRegisterNameEx" class="form-control" maxlength=10/>
      <br />
      <label for="defaultFormRegisterNameEx" class="grey-text">닉네임</label>
      <input v-model="nickName" type="text" id="defaultFormRegisterNameEx" class="form-control" maxlength="5"/>
      <br />
      <label for="defaultFormRegisterConfirmEx" class="grey-text">전화번호</label>
      <input v-model="phoneNum" type="text" id="defaultFormRegisterConfirmEx" class="form-control" maxlength="13"
             oninput="javascript: this.value = this.value.replace(/[^0-9]/, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);"/>
      <br />
      <label for="defaultFormRegisterEmailEx" class="grey-text">아이디</label>
      <input v-model="id" type="text" id="defaultFormRegisterEmailEx" class="form-control"  @change="validateId(id)"/>
      <button class="btn btn-unique" type="submit" @click="overlapCheckId(id)">중복확인</button>
      <br />
      <label for="defaultFormRegisterConfirmEx" class="grey-text">비밀번호</label>
      <input v-model="password" type="password" id="defaultFormRegisterConfirmEx" class="form-control" placeholder="영문자+숫자+특수문자 조합"/>
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
      autoHyphen:''
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
                  id: self.id,
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
    overlapCheckId(id){
      const self = this;
      const db = firebase.firestore();
      db.collection(self.fbCollection)
          .where("id", "==", id )
          .get()
          .then((querySnapshot) => {
            console.log(querySnapshot.size)
            if (querySnapshot.size >= 1) {
              alert('중복된 아이디가 있습니다')
              self.id=''
            }
            else {
              alert('사용 가능합니다')
            }
          })
    },
    validateId(id) {

      if (id.length < 6) {
        alert("아이디는 최소 6자리 이상입니다.")
        this.id=''
        return false
      } else if (id.search(/\s/) !== -1) {
        alert("아이디에 공백은 불가능합니다.")
        this.id=''
        return false
      } else {
        return true
      }
    },
  },
}
</script>

<style>
body{
  background-image: url("../assets/images/bgPhoto.jpg");
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