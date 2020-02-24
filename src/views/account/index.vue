<template>
  <div class="account">
    <div class="account-content">
      <div class="account-title">
        <i></i>
        <span>账号信息</span>
      </div>
      <div class="account-infor">
        <div class="account-infor-item">
          <label for>用户名：</label>
          <input type="text" disabled v-model="usertel" />
          <button @click="changeTel">修改</button>
        </div>
        <div class="account-infor-item">
          <label for>密码：</label>
          <input type="password" disabled value="123456" />
          <button @click="changePwd">修改</button>
        </div>
      </div>
    </div>
    <!-- 更换手机号 -->
    <selfModal ref="decomeTel" :styleObj="styleObj">
      <section class="decometel-content" @click.prevent.stop>
        <div class="top">
          <img :src="imgurlde" />
          <span class="title">更换手机号</span>
        </div>
        <div class="select2">
          <p class="tips">我们向您的旧手机号发送了一封含有验证码的短信，请查收并填写</p>
          <div class="tips">
            <label>当前手机号：{{oldcellphone}}</label>
          </div>
          <div class="tips">
            <label>手机验证码：</label>
            <p class="code" :class="{isactive:errorcode}">
              <input type="text" @focus="isfocusCode" v-model="code" placeholder="请输入验证码" />
              <span class="codebtn" :class="{issendcode:codeDisabled}" @click="codebtn">{{msg}}</span>
            </p>
            <p class="errorcode" v-if="errorcode">请输入验证码</p>
          </div>
          <div class="but-button">
            <el-button class="button" @click.native="Continue">继续</el-button>
            <el-button class="cancelbtn" @click.native="closetelModulde">取消</el-button>
          </div>
        </div>
      </section>
    </selfModal>
    <!-- 绑定手机号 -->
    <selfModal ref="bindTel" :styleObj="styleObj">
      <section class="bind-content" @click.prevent.stop>
        <div class="top">
          <img :src="imgurlde" />
          <span class="title">绑定新手机号</span>
        </div>
        <div class="select2">
          <div class="tips">
            <label>手机号码：</label>
            <input
              type="text"
              :class="{isactive:binderrortel}"
              class="bindtel"
              placeholder="请输入手机号"
              v-model="newcellphone"
              @focus="isfocusBinderrortel"
            />
            <p class="errorcode" v-if="binderrortel">{{telmsg}}</p>
          </div>
          <div class="tips">
            <label>手机验证码：</label>
            <p class="code" :class="{isactive:binderrorcode}">
              <input
                type="text"
                @focus="isfocusBinderrorcode"
                v-model="bindcode"
                placeholder="请输入验证码"
              />
              <span
                class="codebtn"
                :class="{isbindcode:codeDisableds}"
                @click="bindcodebtn"
              >{{msg1}}</span>
            </p>
            <p class="errorcode1" v-if="binderrorcode">请输入验证码</p>
          </div>
          <div class="but-button">
            <el-button class="button" @click.native="continueBind">确定</el-button>
            <el-button class="cancelbtn" @click.native="closebind">取消</el-button>
          </div>
        </div>
      </section>
    </selfModal>

    <!-- 修改密码 -->
    <selfModal ref="decomeSelect" :styleObj="styleObj">
      <section class="careers-content" @click.prevent.stop>
        <div class="top">
          <img :src="imgurlde" />
          <h3 class="title">修改密码</h3>
        </div>
        <div class="select1">
          <el-form :model="formpwd" :rules="rules" :inline="true" ref="formpwd">
            <div class="infor-item">
              <el-form-item label="旧密码:" prop="oldpwd">
                <el-input
                  type="password"
                  placeholder="请输入内容"
                  v-model="formpwd.oldpwd"
                  style="width:310px"
                ></el-input>
              </el-form-item>
            </div>
            <div class="infor-item">
              <el-form-item label="新密码:" prop="pwd">
                <el-input
                  type="password"
                  placeholder="请输入内容"
                  v-model="formpwd.pwd"
                  style="width:310px"
                ></el-input>
              </el-form-item>
            </div>
            <div class="infor-item">
              <el-form-item label="确认密码:" prop="surepwd">
                <el-input
                  type="password"
                  placeholder="请输入内容"
                  v-model="formpwd.surepwd"
                  style="width:310px"
                ></el-input>
              </el-form-item>
            </div>
            <div class="but-button">
              <el-button class="button" @click.native="surechange(formpwd)">确定</el-button>
              <el-button class="cancelbtn" @click.native="closemodulde">取消</el-button>
            </div>
          </el-form>
        </div>
      </section>
    </selfModal>
  </div>
</template>

<script>
import selfModal from "@/components/public/modul";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value == null || value == "") {
        callback(new Error("请输入密码"));
      } else if (value !== this.formpwd.pwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      usertel: "",
      imgurlde: require("@/assets/img/tips.png"),
      styleObj: {
        position: "fixed",
        bottom: 0,
        top: 0,
        left: 0,
        background: "rgba(113, 111, 111, 0.5)",
        width: "100%"
      },
      oldcellphone: "",
      code: "",
      bindcode: "",
      newcellphone: "",
      formpwd: {
        pwd: "",
        oldpwd: "",
        surepwd: ""
      },
      rules: {
        pwd: [
          {
            required: true,
            message: "请输入新密码",
            trigger: ["blur", "change"]
          }
        ],
        oldpwd: [
          {
            required: true,
            message: "请输入旧密码",
            trigger: ["blur", "change"]
          }
        ],
        surepwd: [
          { required: true, message: "请输密码", trigger: ["blur", "change"] },
          { validator: validatePass, trigger: ["blur", "change"] }
        ]
      },
      errorcode: false,
      binderrorcode: false,
      binderrortel: false,
      telmsg: "请输入手机号",
      codeDisabled: false, // 是否禁用按钮
      countdown: 60, // 倒计时秒数
      timers: null,
      msg: "发送验证码",
      msg1: "发送验证码",
      codeDisableds: false, // 是否禁用按钮
      countdowns: 60, // 倒计时秒数
      timerss: null
    };
  },
  components: {
    selfModal
  },
  methods: {
    isfocusCode() {
      this.errorcode = false;
    },
    isfocusBinderrortel() {
      this.binderrortel = false;
    },
    isfocusBinderrorcode() {
      this.binderrorcode = false;
    },
    // 倒计时
    timeRest() {
      if (!this.timers) {
        this.timers = setInterval(() => {
          if (this.countdown > 0 && this.countdown <= 60) {
            this.countdown--;
            if (this.countdown !== 0) {
              this.msg = "重新发送(" + this.countdown + ")";
            } else {
              clearInterval(this.timers);
              this.msg = "获取验证码";
              this.countdown = 60;
              this.timers = false;
              this.codeDisabled = false;
            }
          }
        }, 1000);
      }
    },
    timeRests() {
      if (!this.timerss) {
        this.timerss = setInterval(() => {
          if (this.countdowns > 0 && this.countdowns <= 60) {
            this.countdowns--;
            if (this.countdowns !== 0) {
              this.msg1 = "重新发送(" + this.countdowns + ")";
            } else {
              clearInterval(this.timerss);
              this.msg1 = "获取验证码";
              this.countdowns = 60;
              this.timerss = false;
              this.codeDisableds = false;
            }
          }
        }, 1000);
      }
    },
    //给原手机发送验证码
    codebtn() {
      if (!this.codeDisabled) {
        this.axios
          .post("/management/user/sendUpdateCellphoneCode", {
            cellphone: this.oldcellphone
          })
          .then(resp => {
            if (resp.status == 200) {
              if (resp.data.success) {
                this.$message({
                  showClose: true,
                  message: resp.data.msg,
                  type: "success"
                });
                this.codeDisabled = true;
                this.timeRest();
              } else {
                this.$message({
                  showClose: true,
                  message: resp.data.msg,
                  type: "warning"
                });
              }
            }
          });
      }
    },
    //更换手机号请求（验证原手机验证码）
    Continue() {
      if (this.code == null || this.code == "") {
        this.errorcode = true;
      } else {
        this.errorcode = false;
        this.updateCellphone();
      }
    },
    updateCellphone() {
      this.axios
        .post("/management/user/verifyUpdateCellphoneCode", {
          cellphone: this.oldcellphone,
          code: this.code
        })
        .then(resp => {
          if (resp.status == 200) {
            if (resp.data.success) {
              this.$message({
                showClose: true,
                message: resp.data.msg,
                type: "success"
              });
              this.$refs.decomeTel.showModal = false;
              this.$refs.bindTel.showModal = true;
            } else {
              this.$message({
                showClose: true,
                message: resp.data.msg,
                type: "warning"
              });
            }
          }
        });
    },
    //发送验证码验证手机号输入
    bindcodebtn() {
      if (!this.codeDisableds) {
        if (this.newcellphone == null || this.newcellphone == "") {
          this.binderrortel = true;
        } else {
          let flg = this.publicjs.phoneNumReg(this.newcellphone);
          if (!flg) {
            this.binderrortel = true;
            this.telmsg = "请输入正确的手机格式";
          } else {
            this.binderrortel = false;
            this.sendCode();
          }
        }
      }
    },
    //绑定手机发送验证码
    sendCode() {
      this.axios
        .post("/management/user/sendBindNewCellphoneCode", {
          cellphone: this.newcellphone
        })
        .then(resp => {
          if (resp.status == 200) {
            if (resp.data.success) {
              this.$message({
                showClose: true,
                message: resp.data.msg,
                type: "success"
              });
              this.codeDisableds = true;
              this.timeRests();
            } else {
              this.$message({
                showClose: true,
                message: resp.data.msg,
                type: "warning"
              });
            }
          }
        });
    },
    // 绑定手机号点击继续
    continueBind() {
      if (this.newcellphone == null || this.newcellphone == "") {
        this.binderrortel = true;
      } else {
        let flg = this.publicjs.phoneNumReg(this.newcellphone);
        if (!flg) {
          this.telmsg = "请输入正确的手机格式";
        } else {
          this.binderrortel = false;
        }
      }
      this.bindcode == ""
        ? (this.binderrorcode = true)
        : (this.binderrorcode = false);
      if (this.binderrorcode == false && this.binderrortel == false) {
        this.bindNewCellphone();
      }
    },
    // 绑定手机号请求(验证验证码)
    bindNewCellphone() {
      this.axios
        .post("/management/user/bindNewCellphone", {
          cellphone: this.newcellphone,
          code: this.bindcode,
          oldCellphone: this.oldcellphone,
          oldCode: this.code
        })
        .then(resp => {
          if (resp.status == 200) {
            if (resp.data.success) {
              this.$message({
                showClose: true,
                message: resp.data.msg,
                type: "success"
              });
              this.getUserTel();
              this.$refs.bindTel.showModal = false;
            } else {
              this.$message({
                showClose: true,
                message: resp.data.msg,
                type: "warning"
              });
            }
          }
        });
    },
    // 关闭弹框
    closemodulde() {
      this.formpwd.pwd = "";
      this.formpwd.oldpwd = "";
      this.formpwd.surepwd = "";
      this.$refs.decomeSelect.showModal = false;
    },
    closetelModulde() {
      this.$refs.decomeTel.showModal = false;
    },
    closebind() {
      this.$refs.bindTel.showModal = false;
      this.binderrortel = false;
      this.binderrorcode = false;
    },
    //确认修改密码
    surechange() {
      this.$refs.formpwd.validate(valid => {
        if (valid) {
          this.givedate();
        } else {
          return false;
        }
      });
    },
    // 打开修改弹框
    changePwd() {
      this.$refs.decomeSelect.showModal = true;
       this.$refs.formpwd.resetFields();
    },
    changeTel() {
      this.$refs.decomeTel.showModal = true;
    },
    //修改密码请求
    givedate() {
      this.axios
        .post("/management/user/updatePwdByOldPwd", {
          cellphone: this.oldcellphone,
          pwd: this.formpwd.pwd,
          oldPwd: this.formpwd.oldpwd
        })
        .then(resp => {
          if (resp.data.success) {
            this.$message({
              showClose: true,
              message: resp.data.msg,
              type: "success"
            });
            this.formpwd.pwd = "";
            this.formpwd.oldpwd = "";
            this.formpwd.surepwd = "";
            this.$refs.decomeSelect.showModal = false;
            this.$refs.formpwd.resetFields();
          } else {
            this.$message({
              showClose: true,
              message: resp.data.msg,
              type: "warning"
            });
            this.formpwd.pwd = "";
            this.formpwd.oldpwd = "";
            this.formpwd.surepwd = "";
            this.$refs.decomeSelect.showModal = false;
          }
        });
    },
    // 获取手机号
    getUserTel() {
      this.axios.get("/management/user/queryUserCellphone", {}).then(resp => {
        if (resp.status == 200) {
          this.oldcellphone = String(resp.data.object.cellphone);
          this.usertel = this.oldcellphone;
        }
      });
    }
  },
  created() {
    this.getUserTel();
  }
};
</script>

<style lang='less'>
.account {
  .account-content {
    // 账号标题
    .account-title {
      display: flex;
      align-items: center;
      i {
        width: 4px;
        height: 16px;
        display: inline-block;
        background-color: #2477f6;
      }
      span {
        font-size: 14px;
        color: rgba(36, 119, 246, 1);
        margin-left: 5px;
      }
    }
    .account-infor-item {
      margin-top: 20px;
    }
    // 账号信息
    .account-infor {
      label {
        font-size: 14px;
        color: rgba(87, 89, 104, 1);
        width: 60px;
        text-align: left;
        display: inline-block;
      }
      input {
        width: 200px;
        height: 40px;
        border: 1px solid rgba(211, 215, 226, 1);
        border-radius: 4px;
        text-indent: 1em;
      }
      button {
        font-size: 14px;
        color: rgba(36, 119, 246, 1);
        cursor: pointer;
        background-color: #fff !important;
      }
    }
  }
  .el-form-item__label {
    font-size: 14px;
    font-weight: 500;
    color: rgba(136, 136, 136, 1);
    width: 90px;
  }
}
// 修改密码模态弹框
.careers-content {
  width: 489px;
  height: 310px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  padding: 0 35px;
  box-sizing: border-box;
  .top {
    margin-top: 20px;
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    .title {
      font-size: 18px;
      font-weight: 500;
      color: rgba(36, 119, 246, 1);
      margin-left: 10px;
    }
  }
  .but-button {
    margin-right: 15px;
    float: right;
  }
}
// 修改手机模态弹框
.decometel-content {
  width: 480px;
  height: 240px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  padding: 0 35px;
  box-sizing: border-box;
  .top {
    margin-top: 15px;
    display: flex;
    .title {
      font-size: 20px;
      font-weight: 500;
      color: rgba(36, 119, 246, 1);
      margin-left: 10px;
    }
  }
  .tips {
    font-size: 14px;
    font-weight: 500;
    color: rgba(136, 136, 136, 1);
    margin-top: 15px;
  }
  .select2 {
    .errorcode {
      margin-left: 87px;
      width: 217px;
      font-size: 12px;
      color: red;
      // background-color: #fee4e4;
      font-size: 13px;
      // border-top: 3px solid red;
    }
    .code {
      display: inline-block;
      height: 30px;
      border: 1px solid rgba(211, 215, 226, 1);
      display: inline-block;
      line-height: 30px;
      margin: -1px;
      padding: 0;
      font-size: 14px;
      color: rgba(206, 205, 205, 1);
      text-indent: 1em;
      border-right: none;
      margin-top: 5px;
      cursor: pointer;
      input {
        width: 200px;
      }
    }
    .isactive {
      border: 1px solid red;
    }
    .codebtn {
      margin: -1px;
      width: 90px;
      height: 30px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(36, 119, 246, 1);
      display: inline-block;
      text-align: center;
      line-height: 30px;
      font-size: 14px;
      color: rgba(36, 119, 246, 1);
      text-indent: 0em;
    }
    .issendcode {
      border: 1px solid #828a9a;
      color: #828a9a;
    }
    .issendcode:hover {
      border: 1px solid rgba(40, 40, 47, 0.7);
      color: rgba(40, 40, 47, 0.7);
    }
    .but-button {
      position: absolute;
      bottom: 15px;
      right: 47px;
      float: right;
      display: flex;
    }
  }
}
// 绑定手机号
.bind-content {
  width: 480px;
  height: 280px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  padding: 0 35px;
  box-sizing: border-box;
  .top {
    display: flex;
    align-items: center;
    margin-top: 20px;
    .title {
      font-size: 20px;
      color: rgba(36, 119, 246, 1);
      margin-left: 10px;
    }
  }
  .tips {
    font-size: 14px;
    color: rgba(136, 136, 136, 1);
    margin-top: 20px;
  }
  .select2 {
    label {
      display: inline-block;
      width: 94px;
      text-align: right;
    }
    .bindtel {
      border: 1px solid rgba(211, 215, 226, 1);
      line-height: 40px;
      height: 40px;
      width: 300px;
      text-indent: 1em;
    }
    .errorcode {
      margin-left: 98px;
      margin-right: 10px;
      color: red;
      // background-color: #fee4e4;
      font-size: 13px;
      // border-top: 2px solid red;
    }
    .errorcode1 {
      margin-left: 98px;
      margin-right: 110px;
      color: red;
      // background-color: #fee4e4;
      font-size: 13px;
      // border-top: 3px solid red;
    }
    .code {
      display: inline-block;
      height: 40px;
      border: 1px solid rgba(211, 215, 226, 1);
      display: inline-block;
      line-height: 40px;
      margin: -1px;
      padding: 0;
      font-size: 14px;
      color: rgba(206, 205, 205, 1);
      border-right: none;
      input {
        width: 200px;
        text-indent: 1em;
      }
    }
    .isactive {
      border: 1px solid red;
    }
    .codebtn {
      margin: -1px;
      width: 98px;
      height: 40px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid #5092f8;
      display: inline-block;
      text-align: center;
      line-height: 40px;
      font-size: 14px;
      font-weight: 500;
      color: #5092f8;
      cursor: pointer;
    }
    .codebtn:hover {
      border: 1px solid rgba(36, 119, 246, 1);
      color: rgba(36, 119, 246, 1);
    }
    .isbindcode {
      border: 1px solid #828a9a;
      color: #828a9a;
    }
    .isbindcode:hover {
      border: 1px solid rgba(40, 40, 47, 0.7);
      color: rgba(40, 40, 47, 0.7);
    }
    .but-button {
      margin-right: 10px;
      margin-top: 20px;
      float: right;
      display: flex;
    }
  }
}
</style>
