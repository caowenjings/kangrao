<template>
  <div class="login">
    <!-- <div class="main-con">
		<div class="shooting_star"></div>
		<div class="shooting_star"></div>
		<div class="shooting_star"></div>
		<div class="shooting_star"></div>
		<div class="shooting_star"></div>
		<div class="shooting_star"></div>
		<div class="shooting_star"></div>
	</div> -->
    <div class="content" :style="conheight">
      <div class="c-right">
        <p class="logintitle">Steam BOT 管理系统</p>
        <p class="c-r-title">
          <span>账号密码登录</span>
        </p>
        <div>
          <div class="l-r-list" :class="{iserror:errortel}">
            <i class="iconfont icon-zhanghao"></i>
            <span class="list-tips">账号</span>
            <input class="list-input" @focus="isfocustel" v-model="formUser.maccount" type="text" />
          </div>
          <p class="input-tips" v-if="errortel">{{errortelmsg}}</p>
          <div class="l-r-list" :class="{iserror:errorpwd}">
            <i class="iconfont icon-zhanghao"></i>
            <span class="list-tips">密码</span>
            <input
              class="list-input"
              @focus="isfocuspwd"
              type="password"
              v-model="formUser.mpassword"
            />
          </div>
          <p class="input-tips" v-if="errorpwd">{{errorpwdmsg}}</p>
          <div class="forgibeBtn" @click="forgiveBtn">
            <span>忘记密码？</span>
          </div>
          <div style="cursor:pointer">
            <button class="btnlogin" @click="btnlogin" style="cursor:pointer">登录</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      formUser: {
        maccount: null,
        mpassword: ""
      },
      errortelmsg: "请输入账号",
      errorpwdmsg: "请输入密码",
      errortel: false,
      errorpwd: false,
      conheight: "",
      cellphone: ""
    };
  },
  mounted() {
    var lett = this;
    document.onkeydown = function(e) {
      var key = e.keyCode;
      if (lett.$route.fullPath == "/") {
        if (key == 13) {
          lett.btnlogin();
        }
      }
    };
  },
  methods: {
    isfocustel() {
      this.errortel = false;
    },
    isfocuspwd() {
      this.errorpwd = false;
    },
    // 跳转忘记密码
    forgiveBtn() {
      this.$router.push({ path: "/forgivepwd" });
    },
    // 点击登陆
    btnlogin() {
      if (this.formUser.maccount == null || this.formUser.maccount == "") {
        this.errortelmsg = "请输入账号";
        this.errortel = true;
      } else {
        this.errortel = false;
      }
      if (this.formUser.mpassword == "") {
        this.errorpwdmsg = "请输入密码";
        this.errorpwd = true;
      } else {
        var reg = /^[a-zA-Z0-9_]{6,20}$/;
        if (this.formUser.mpassword.match(reg) == null) {
          this.errorpwd = true;
          this.errorpwdmsg = "请输入正确格式的密码";
        } else {
          this.errorpwd = false;
        }
      }
      if (this.errortel == false && this.errorpwd == false) {
        this.initDate();
      }
    },
    initDate() {
      this.axios
        .post(this.constant.url+"/login/index", {
          username:this.formUser.maccount,
          password: this.formUser.mpassword
        })
        .then(resp => {
          if (resp.data.success) {
            this.$message({
              showClose: true,
              message: "登陆成功!",
              type: "success"
            });
            this.$router.push({ path: "/rolengt" });
          } else {
            this.$message({
              showClose: true,
              message: resp.data.msgmessage,
              type: "error"
            });
          }
        });
    }
  }
};
</script>

<style lang='less'>
.login {
  background-color: #101318;
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 1200px;
  .content {
    display: flex;
    justify-content: center;
    background-color: #fff;
   align-items: center;
    width: 600px;
    height: 500px;
    border-radius: 5px;
    .input-tips {
      font-size: 13px;
      color: red;
      background-color: #fee4e4;
      font-size: 13px;
    }
    .l-r-list {
      margin-top: 20px;
      width: 340px;
      border: 1px solid rgba(211, 215, 226, 1);
      border-radius: 2px;
      height: 50px;
      line-height: 50px;
      box-sizing: border-box;
      color: #575968;
      padding-left: 20px;
      .list-tips {
        height: 50px;
        display: inline-block;
        padding-right: 20px;
        border-right: 1px solid rgba(211, 215, 226, 1);
        font-size: 14px;
      }
      input {
        text-indent: 1em;
        height: 40px;
        width: 230px;
      }
      input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 1000px white inset;
      }
    }
    .c-right {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      align-items: center;
      .logintitle {
        font-size: 26px;
        font-weight: bold;
        color: rgba(87, 89, 104, 1);
        line-height: 60px;
      }
      .c-r-title {
        span {
          font-size: 18px;
          color: #2477fb;
        }
        margin-top: 10px;
        border-bottom: 1px solid #2477fb;
        padding-bottom: 8px;
      }
      .btnlogin {
        width: 340px;
        height: 40px;
        background: rgb(48, 54, 65,.8);
        border-radius: 2px;
        font-size: 16px;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        line-height: 40px;
        text-align: center;
        margin-top: 30px;
      }
      .btnlogin:hover {
          background: #000;
      }
      .btnlogin:active {
          background: #000;
      }
    }
  }
  // 忘记密码
  .forgibeBtn {
    width: 340px;
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    span {
      cursor: pointer;
      color: #5092f8;
    }
    span :hover {
      color: #2477f6;
    }
  }
}
.main-con{
  position: absolute;
  z-index: -1;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
@-webkit-keyframes tail {
  0% {
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
 
@keyframes tail {
  0% {
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@-webkit-keyframes shooting {
  0% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
  }
  100% {
    -webkit-transform: translateY(100px);
            transform: translateY(100px);
  }
}
@keyframes shooting {
  0% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
  }
  100% {
    -webkit-transform: translateY(100px);
            transform: translateY(100px);
  }}
</style>
