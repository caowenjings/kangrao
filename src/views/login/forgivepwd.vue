<template>
  <div class="forgive">
    <div class="content">
      <div class="c-right">
        <p class="logintitle">Steam BOT 管理系统</p>
        <p class="c-r-title">
          <span>忘记密码</span>
        </p>
        <div v-if="showAnswer==1" class="account">
          <p class="a_num">账号：</p>
          <input
            :class="{error:errortel}"
            class="list-input"
            @focus="isfocustel"
            v-model="usertel"
            placeholder="请输入你的账号"
            type="text"
          />
          <p class="input-tips" v-if="errortel">{{errorusertelmsg}}</p>
          <div class="btn">
            <span class="l-btn" @click="sureAccount">确定</span>
            <span class="r-btn" @click="jump">返回</span>
          </div>
        </div>
        <div v-if="showAnswer==2" class="answerBox">
          <p class="question">问题：</p>
          <p class="question">{{question}}</p>
          <p class="question">答案：</p>
          <input
            :class="{error1:errorAns}"
            class="list-input"
            @focus="isfocustel"
            v-model="userAns"
            placeholder="请输入你的答案"
            type="text"
          />
          <p class="input-tips" v-if="errorAns">{{errorAnswermsg}}</p>
          <div class="btn">
            <span class="l-btn" @click="resetpwd">确定</span>
            <span class="r-btn" @click="jump1">返回</span>
          </div>
        </div>
        <div v-if="showAnswer==3" class="setPassword">
          <p>新密码：</p>
          <input
            :class="{error2:errorPwd}"
            class="list-input"
            type="password"
            @focus="isfocusSet"
            v-model="userPwd"
            placeholder="请输入新密码"
          />
          <p class="input-tips" v-if="errorPwd">{{errorpwdmsg}}</p>
          <p>确认密码：</p>
          <input
            :class="{error2:errorConPwd}"
            class="list-input"
            type="password"
            @focus="isfocusConSet"
            v-model="userConpwd"
            placeholder="请输入确认密码"
          />
          <p class="input-tips" v-if="errorConPwd">{{errorconpwdmsg}}</p>
          <div class="btn">
            <span class="l-btn" @click="sureAns">确定</span>
            <span class="r-btn" @click="jump">我再想想</span>
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
      usertel: "",
      userAns: "",
      userPwd: "",
      userConpwd: "",
      showAnswer: 1,
      errorusertelmsg: "请输入您的账号",
      errorAnswermsg: "请输入您的答案",
      errorpwdmsg: "请输入您的新密码",
      errorconpwdmsg: "请输入您的确认密码",
      errortel: false,
      errorAns: false,
      errorPwd: false,
      errorConPwd: false,
      question: "",
      memberId: null,
      questionId: null
    };
  },
  methods: {
    isfocuspwd() {
      this.errorpwd = false;
    },
    isfocuscode() {
      this.errorcode = false;
    },
    isfocustel() {
      this.errortel = false;
    },
    isfocusSet() {
      this.errorPwd = false;
    },
    isfocusConSet() {
      this.errorConPwd = false;
    },
    // 确定账号
    sureAccount() {
      if (this.usertel == null || this.usertel == "") {
        this.errortel = true;
        this.showAnswer = 1;
      } else {
        this.errortel = false;
        this.showAnswer = 2;
        this.getQuertion();
      }
    },
    // 获取问题
    getQuertion() {
      this.axios
        .get(this.constant.url+"/login/safe-question/person", {
          params: {
            userName: this.usertel
          }
        })
        .then(resp => {
          var qu = resp.data.payload.question;
          if (resp.data.success) {
            if (qu == "" || qu == null) {
              this.question = "暂无问题";
            } else {
              this.question = qu;
            }
            this.memberId = resp.data.payload.memberId;
            this.questionId = resp.data.payload.questionId;
          } else {
            if (qu == "") {
              this.$message({
                showClose: true,
                message: "此账号暂无问题，请重新输入账号",
                type: "error"
              });
              this.question = "暂无问题";
              this.jump1();
            }
          }
        });
    },
    // 确认回答问题
    resetpwd() {
      if (this.userAns == null || this.userAns == "") {
        this.errorAns = true;
        this.errorAnswermsg = "请输入你的答案";
      } else {
        this.errorAns = false;
        this.initAnswer();
      }
    },
    // 回答问题请求
    initAnswer() {
      this.axios
        .post(this.constant.url+"/login/safe-question/judge", {
          memberId: this.memberId,
          questionId: this.questionId,
          answer: this.userAns
        })
        .then(resp => {
          if (resp.data.success) {
            this.showAnswer = 3;
          } else {
            this.$message({
              showClose: true,
              message: "回答错误，请重新填写你的答案",
              type: "error"
            });
          }
        });
    },
    // 重置密码请求
    initPwd() {
      this.axios
        .put(this.constant.url+"/login/password ", {
          id: this.memberId,
          password: this.userPwd
        })
        .then(resp => {
          if (resp.data.success) {
            this.$message({
              showClose: true,
              message: "重置密码成功",
              type: "success"
            });
            this.$router.push({ path: "/" });
          } else {
            this.userConpwd="";
            this.userPwd ="";
            this.$message({
              showClose: true,
              message: resp.data.msg,
              type: "warning"
            });
          }
        });
    },
    // 重置密码
    sureAns() {
      var reg = /^[a-zA-Z0-9_]{6,20}$/;
      if (this.userPwd == null || this.userPwd == "") {
        this.errorPwd = true;
      } else {
        if (this.userPwd.match(reg) == null) {
          this.errorPwd = true;
          this.errorpwdmsg = "请输入正确格式的密码";
        } else {
          this.errorPwd = false;
        }
      }
      if (this.userConpwd == null || this.userConpwd == "") {
        this.errorconpwdmsg = "请输入您的确认密码";
        this.errorConPwd = true;
        return false;
      } else {
         if (this.userConpwd.match(reg) == null) {
          this.errorConPwd = true;
          this.errorconpwdmsg = "请输入正确格式的密码";
        } else {
          this.errorPwd = false;
        }
      }
      if (this.userConpwd != this.userPwd) {
        this.errorconpwdmsg = "两次密码输入不一样，请重新输入";
        this.errorConPwd = true;
      } else {
        this.errorConPwd = false;
      }
      if (this.errorConPwd == false && this.errorPwd == false) {
        this.initPwd();
      }
    },
    // 跳转登录
    jump() {
      this.$router.push({ path: "/" });
    },
    jump1() {
      this.showAnswer = 1;
      this.userAns = "";
    },
    jump2() {
      this.showAnswer = 2;
    }
  }
};
</script>

<style lang='less'>
.forgive {
  background-color: #101318;
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  min-width: 1200px;
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px white inset;
    text-indent: 1em;
  }

  .content {
    background-color: #fff;
    border: 1px solid #000;
    border-radius: 4px;
    box-sizing: border-box;
    width: 600px;
    height: 500px;
    .logintitle {
      font-size: 26px;
      font-weight: bold;
      color: rgba(87, 89, 104, 1);
      text-align: center;
      margin-top: 80px;
    }
    .account {
      height: 270px;
      margin-top: 10px;
      position: relative;
      .a_num {
        margin-top: 10px;
        font-size: 16px;
      }
      input {
        width: 340px;
        height: 40px;
        border: 1px solid rgba(211, 215, 226, 1);
        border-radius: 2px;
        margin-top: 20px;
        padding: 0 10px;
        box-sizing: border-box;
      }
      .error {
        border: 1px solid red;
      }
    }
    .answerBox {
      height: 270px;
      margin-top: 10px;
      position: relative;
      .question {
        margin-top: 10px;
        font-size: 16px;
      }
      input {
        width: 280px;
        height: 40px;
        border: 1px solid rgba(211, 215, 226, 1);
        border-radius: 2px;
        margin-top: 20px;
        padding: 0 10px;
        box-sizing: border-box;
      }
      .error1 {
        border: 1px solid red;
      }
    }
    .setPassword {
      height: 270px;
      margin-top: 10px;
      position: relative;
      p {
        margin-top: 10px;
      }
      input {
        width: 340px;
        height: 36px;
        border: 1px solid rgba(211, 215, 226, 1);
        border-radius: 2px;
        margin-top: 10px;
        padding: 0 10px;
        box-sizing: border-box;
      }
      .error2 {
        border: 1px solid red;
      }
    }
    // 右边
    .c-right {
      border-radius: 4px;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      //   标题
      .c-r-title {
        width: 600px;
        display: flex;
        justify-content: center;
        span {
          display: inline-block;
          border-bottom: 1px solid #2477fb;
          padding-bottom: 8px;
          margin-top: 20px;
          text-align: center;
          font-size: 20px;
          color: #2477fb;
        }
      }
      .input-tips {
        color: red;
        margin-top: 4px;
        margin-left: 10px;
        font-size: 13px;
      }
      // 按钮
      .btn {
        position: absolute;
        bottom: 20px;
        width: 340px;
        height: 40px;
        display: flex;
        justify-content: space-between;
        .l-btn,
        .r-btn {
          width: 160px;
          height: 40px;
          line-height: 40px;
          font-size: 18px;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
        }
        .l-btn {
          text-align: center;
          background: rgb(48, 54, 65, 0.8);
          border: 1px solid #000;
          font-size: 14px;
          border-radius: 4px;
          cursor: pointer;
          color: #fff;
        }
        .l-btn:hover {
          background: #000;
          color: #fff;
          font-size: 14px;
        }
        .r-btn {
          border: 1px solid #d3d7e2;
          color: #d3d7e2;
          background-color: #fff;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          text-align: center;
        }
        .r-btn:hover {
          background: #000;
          color: #fff;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
