<template>
  <div class="black-bg">
    <div class="white-bg">
        <form>
          <p class="h4 text-center mb-4">Sign up</p>
          <label for="defaultFormRegisterNameEx" class="grey-text">이름</label>
          <input type="text" id="defaultFormRegisterNameEx" class="form-control" />
          <br />
          <label for="defaultFormRegisterConfirmEx" class="grey-text">나이</label>
          <input type="password" id="defaultFormRegisterConfirmEx" class="form-control" />
          <br />
          <label for="defaultFormRegisterConfirmEx" class="grey-text">전화번호</label>
          <input type="text" id="defaultFormRegisterConfirmEx" class="form-control" />
          <br />
          <label for="defaultFormRegisterEmailEx" class="grey-text">아이디</label>
          <input type="email" id="defaultFormRegisterEmailEx" class="form-control" />
          <br />
          <label for="defaultFormRegisterConfirmEx" class="grey-text">비밀번호</label>
          <input type="password" id="defaultFormRegisterConfirmEx" class="form-control" />
          <br />
          <label for="defaultFormRegisterPasswordEx" class="grey-text">비밀번호 확인</label>
          <input type="password" id="defaultFormRegisterPasswordEx" class="form-control" />
          <div class="text-center mt-4">
            <button class="btn btn-unique" type="submit">Register</button>
          </div>
        </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  data(){
    return{
      fbCollection: "users",
      name: "",
      age: "",
      phoneNum: '',
      password: 0,
      comparePassword: true,
      level: '1',
    }
  },
  methods: {

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
