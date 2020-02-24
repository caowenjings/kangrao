<template>
  <div class="createBot">
    <div class="createBot-content">
      <div class="bot_title">
        <i></i>
        <span>{{msg}}</span>
      </div>
      <el-form :inline="true" :rules="rules" :model="form" ref="form">
        <div>
          <el-form-item label="用户名:" prop="name" class="addemployee-infor-item">
            <el-input clearable placeholder="请输入用户名" v-model="form.name" style="width:190px"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="密码:" prop="pwd" class="addemployee-infor-item">
            <el-input
              clearable
              type="password"
              placeholder="请输入内容密码"
              v-model="form.pwd"
              style="width:190px"
            ></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="认证代码:" prop="renZ">
            <el-input clearable placeholder="请输入认证代码" v-model="form.renZ" style="width:190px"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="ApiKey:" prop="apikeys">
            <el-input clearable placeholder="请输入ApiKey" v-model="form.apikeys" style="width:190px"></el-input>
          </el-form-item>
        </div>
        <div class="btnlist">
          <span class="butto" @click="onSubmit(form)">确定</span>
          <span class="cancel" @click="ondelete">取消</span>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import selfModal from "@/components/public/modul";
export default {
  name: "part",
  data() {
    return {
      id: null,
      msg: "添加机器人",
      autoid: null,
      form: {
        name: "",
        pwd: "",
        renZ: "",
        apikeys: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请填写用户名",
            trigger: ["blur", "change"]
          },
          { max: 20, message: "最多填写20个字符", trigger: ["blur", "change"] }
        ],
        pwd: [
          {
            required: true,
            message: "请填写密码",
            trigger: ["blur", "change"]
          }
        ],
        renZ: [
          {
            required: true,
            message: "请填写认证代码",
            trigger: ["blur", "change"]
          }
        ],
        apikeys: [
          {
            required: true,
            message: "请填写apikey",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  components: {
    selfModal
  },
  created() {
    this.id = this.$route.query.id;
    if (this.id == -1) {
      this.$route.meta[1] = "添加机器人";
      this.msg = "添加机器人";
    } else {
      this.$route.meta[1] = "编辑机器人";
      this.msg = "编辑机器人";
      this.autoid = JSON.parse(this.$route.query.num);
      this.initBot();
    }
  },
  methods: {
    // 查询
    initBot() {
      this.axios
        .post(this.constant.url + "bot/one", {
          id: this.autoid.id,
          num: 1
        })
        .then(resp => {
          let nums = resp.data.payload;
          this.form.name = nums.accountName;
          this.form.pwd = nums.password;
          this.form.renZ = nums.twoFactorCode;
          this.form.apikeys = nums.identitySecret;
        });
    },
    // 取消
    ondelete() {
      this.$router.push({
        path: "/rolengt"
      });
    },
    // 确定添加或编辑
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.id == -1) {
            this.initAdd();
          } else {
            this.initEditor();
          }
        } else {
          return false;
        }
      });
    },
    // 确定请求
    initAdd() {
      this.axios
        .post(this.constant.url + "/bot/account-number", {
          accountName: this.form.name,
          password: this.form.pwd,
          identitySecret: this.form.apikeys,
          twoFatorCode: this.form.renZ
        })
        .then(resp => {
          if (resp.data.success) {
            this.$message({
              showClose: true,
              message: "恭喜你，添加成功",
              type: "success"
            });
            this.$router.push({
              path: "/rolengt"
            });
          } else {
            this.$message({
              showClose: true,
              message: resp.data.msg,
              type: "warning"
            });
          }
        });
    },
    // 编辑请求
    initEditor() {
      this.axios
        .post(this.constant.url + "bot/edit", {
          id: this.autoid.id,
          accountName: this.form.name,
          password: this.form.pwd,
          identitySecret: this.form.apikeys,
          twoFatorCode: this.form.renZ
        })
        .then(resp => {
          if (resp.data.success) {
            this.$message({
              showClose: true,
              message: "恭喜你，编辑成功",
              type: "success"
            });
            this.$router.push({
              path: "/rolengt"
            });
          } else {
            this.$message({
              showClose: true,
              message: resp.data.msg,
              type: "warning"
            });
          }
        });
    }
  }
};
</script>

<style lang="less">
.createBot {
  .bot_title {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    i {
      display: inline-block;
      margin-right: 10px;
      width: 4px;
      height: 20px;
      background-color: #000;
    }
  }
  .el-form-item__label {
    width: 85px;
    text-align: left;
  }
  .btnlist {
    margin-top: 10px;
    .butto {
      background-color: #414141 !important;
      border: none;
      height: 40px;
      cursor: pointer;
      color: #fff;
      padding: 0 20px;
      line-height: 40px;
      display: inline-block;
      border-radius: 4px;
    }
    .butto:hover {
      background-color: #000 !important;
    }
    .cancel {
      border-radius: 4px;
      padding: 0 20px;
      line-height: 40px;
      color: #414141;
      display: inline-block;
      border: 1px solid #414141;
      cursor: pointer;
      height: 40px;
      margin-left: 20px;
    }
    .cancel:hover {
      border: 1px solid #000 !important;
      color: #000;
    }
  }
}
</style>
