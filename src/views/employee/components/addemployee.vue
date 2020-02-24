<template>
  <div class="addemploy">
    <div class="addemploy-content">
      <div class="em_title">
        <i></i>
        <span>{{msg}}</span>
      </div>
      <div class="addemployeeform">
        <el-form :inline="true" :rules="rules" :model="form" ref="form">
          <div class="flexBox flexBox3" v-if="employeeid != -1">
            <el-form-item label="员工状态:" prop="isvalid" class="infor-item">
              <el-select
                @visible-change="this.publicjs.visibleChange"
                clearable
                v-model="form.isvalid"
                placeholder="请选择"
                class="choice_list"
                style="width:100%"
              >
                <el-option
                  v-for="item in stateoptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="flexBox flexBox3">
            <el-form-item label="姓名:" prop="employeeName" class="addemployee-infor-item">
              <el-input
                clearable
                placeholder="请输入内容"
                v-model="form.employeeName"
                style="width:100%"
              ></el-input>
            </el-form-item>
            <el-form-item label="身份证号码:" prop="idCard" class="addemployee-infor-item">
              <el-input clearable placeholder="请输入内容" v-model="form.idCard" style="width:100%"></el-input>
            </el-form-item>
            <el-form-item label="性别:" prop="gender">
              <el-select
                clearable
                @visible-change="this.publicjs.visibleChange"
                v-model="form.gender"
                placeholder="请选择"
                class="choice_list"
                style="width:100%"
              >
                <el-option
                  v-for="item in sexoptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="flexBox flexBox3">
            <el-form-item label="出生日期:" class="addemployee-infor-item">
              <el-date-picker
                v-model="form.birthday"
                type="date"
                clearable
                placeholder="选择日期"
                style="width:100%"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions0"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="联系方式:" prop="cellphone" class="addemployee-infor-item">
              <el-input clearable placeholder="请输入内容" v-model="form.cellphone" style="width:100%"></el-input>
            </el-form-item>
            <el-form-item label="婚姻状况:">
              <el-select
                @visible-change="this.publicjs.visibleChange"
                clearable
                v-model="form.marriage"
                placeholder="请选择"
                class="choice_list"
                style="width:100%"
              >
                <el-option
                  v-for="item in  marriagestate"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="flexBox flexBox3">
            <el-form-item label="学历:" class="addemployee-infor-item">
              <el-select
                @visible-change="this.publicjs.visibleChange"
                clearable
                v-model="form.education"
                placeholder="请选择"
                class="choice_list"
                style="width:100%"
              >
                <el-option
                  v-for="item in educationstate"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="毕业院校:" class="addemployee-infor-item">
              <el-input clearable placeholder="请输入内容" v-model="form.graduate" style="width:100%"></el-input>
            </el-form-item>
            <el-form-item label="毕业专业:">
              <el-input clearable placeholder="请输入内容" v-model="form.major" style="width:100%"></el-input>
            </el-form-item>
          </div>
          <div class="flexBox flexBox3">
            <el-form-item label="邮箱:" prop="email" class="addemployee-infor-item">
              <el-input clearable placeholder="请输入内容" v-model="form.email" style="width:100%"></el-input>
            </el-form-item>
            <el-form-item label="通讯地址:">
              <el-input
                clearable
                placeholder="请输入内容"
                v-model="form.address"
                class="address"
                style="width:244%"
              ></el-input>
            </el-form-item>
          </div>
          <div class="flexBox flexBox3">
            <el-form-item label="联系人:" class="addemployee-infor-item">
              <el-input clearable placeholder="请输入内容" v-model="form.contact" style="width:100%"></el-input>
            </el-form-item>
            <el-form-item label="联系人关系:" class="addemployee-infor-item">
              <el-select
                @visible-change="this.publicjs.visibleChange"
                clearable
                v-model="form.contactrel"
                placeholder="请选择"
                class="choice_list"
                style="width:100%"
              >
                <el-option
                  v-for="item in contactstate"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="联系人电话:" prop="contactphone">
              <el-input
                clearable
                placeholder="请输入内容"
                v-model="form.contactphone"
                style="width:100%"
              ></el-input>
            </el-form-item>
          </div>
          <div class="btn">
            <el-form-item class="btnlist">
              <el-button class="button" @click="onSubmit(form)">确定</el-button>
              <el-button class="cancelbtn" @click="ondelete">取消</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    let validatenum = (rule, value, callback) => {
      if (
        value &&
        (!/\d{17}[\d|x]|\d{15}/.test(value) ||
          (value.length !== 15 && value.length !== 18))
      ) {
        callback(new Error("请填写正确格式的身份证号码"));
      } else {
        callback();
      }
    };
    return {
      employeename: null,
      msg: "添加员工",
      stateoptions: this.constant.Employeesstate1,//员工状态
      educationstate: this.constant.Education, //学历
      marriagestate: this.constant.Marriage, //已婚未婚
      contactstate: this.constant.ContactRel, //联系人关系
      sexoptions: this.constant.Gender, //性别
      employeeid: -1,
      form: {
        employeeName: "",
        idCard: "",
        gender: "",
        birthday: "",
        marriage: "",
        cellphone: "",
        education: "",
        graduate: "",
        major: "",
        email: "",
        address: "",
        contact: "",
        contactrel: "",
        contactphone: "",
        isvalid: ""
      },
      rules: {
        employeeName: [
          {
            required: true,
            message: "请填写姓名",
            trigger: ["blur", "change"]
          },
          { max: 20, message: "最多填写20个字符", trigger: ["blur", "change"] }
        ],
        isvalid: [
          {
            required: true,
            message: "请选择员工状态",
            trigger: ["blur", "change"]
          }
        ],
        gender: [
          { required: true, message: "请选择性别", trigger: ["blur", "change"] }
        ],
        idCard: [{ validator: validatenum, trigger: ["blur", "change"] }],
        cellphone: [
          {
            required: true,
            message: "请填写联系方式",
            trigger: ["blur", "change"]
          },
          {
            pattern: /^1[34578]\d{9}$/,
            message: "请填写正确格式",
            trigger: ["blur", "change"]
          }
        ],
        email: [
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          },
          { max: 20, message: "最多填写20个字符", trigger: ["blur", "change"] }
        ],
        contactphone: [
          {
            pattern: /^1[34578]\d{9}$/,
            message: "请填写正确格式",
            trigger: ["blur", "change"]
          }
        ]
      },
      information: {},
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6; //如果没有后面的-8.64e6就是不可以选择今天的
        }
      }
    };
  },
  created() {
    this.initDate();
  },
  methods: {
    // 取消
    ondelete() {
      this.$router.go(-1);
    },
    //  提交
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.employeeid == -1) {
            this.givedate();
          } else {
            this.upDate();
          }
        } else {
          return false;
        }
      });
    },
    givedate() {
      let genders = null,
        marriages = null,
        cellphones = null,
        educations = null,
        contactrels = null;
      if (this.form.gender == null || this.form.gender == "") {
        genders = this.form.gender;
      } else {
        genders = Number(this.form.gender);
      }

      if (this.form.marriage == null || this.form.marriage == "") {
        marriages = this.form.marriage;
      } else {
        marriages = Number(this.form.marriage);
      }

      if (this.form.cellphone == null || this.form.cellphone == "") {
        cellphones = this.form.cellphone;
      } else {
        cellphones = Number(this.form.cellphone);
      }

      if (this.form.education == null || this.form.education == "") {
        educations = this.form.education;
      } else {
        educations = Number(this.form.education);
      }
      if (this.form.contactrel == null || this.form.contactrel == "") {
        contactrels = this.form.contactrel;
      } else {
        contactrels = Number(this.form.contactrel);
      }

      this.axios
        .post("/management/user/addUser", {
          userName: this.form.employeeName,
          idcard: this.form.idCard,
          gender: genders,
          birthday: this.form.birthday,
          marriage: marriages,
          cellphone: cellphones,
          education: educations,
          graduate: this.form.graduate,
          major: this.form.major,
          email: this.form.email,
          address: this.form.address,
          contact: this.form.contact,
          contactRel: contactrels,
          contactPhone: this.form.contactphone
        })
        .then(resp => {
          if (resp.status == 200) {
            if (resp.data.success) {
              this.$message({
                showClose: true,
                message: "恭喜你，添加成功",
                type: "success"
              });
              this.$router.push({ path: "/employee" });
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
    // 获取修改员工信息
    initDate() {
      this.employeeid = this.$route.query.num_id;
      this.employeeid == -1 ? (this.msg = "添加员工") : (this.msg = "修改员工");
      if (this.employeeid != -1) {
        this.axios
          .get("/management/user/getUser", {
            params: {
              time: Date.now(),
              id: this.employeeid
            }
          })
          .then(resp => {
            if (resp.status == 200) {
              this.information = resp.data.object;
              this.employeename = this.information.userName;
              this.form.idCard = this.information.idcard;
              this.form.employeeName = this.information.userName;
              this.form.birthday = this.information.birthday;
              this.form.cellphone = this.information.cellphone;
              this.form.contact = this.information.contact;
              this.form.address = this.information.address;
              this.form.graduate = this.information.graduate;
              this.form.major = this.information.major;
              this.form.email = this.information.email;
              this.form.contactphone = this.information.contactPhone;
              this.form.isvalid=String(this.information.userStatus);

              this.information.gender == null
                ? (this.form.gender = "")
                : (this.form.gender = String(this.information.gender));
              this.information.marriage == null
                ? (this.form.marriage = "")
                : (this.form.marriage = String(this.information.marriage));
              this.information.education == null ||
              this.information.education == 0
                ? (this.form.education = "")
                : (this.form.education = String(this.information.education));
              this.information.contactRel == null ||
              this.information.contactRel == 0
                ? (this.form.contactrel = "")
                : (this.form.contactrel = String(this.information.contactRel));
              console.log(resp);
            }
          });
      }
    },
    // 修改员工
    upDate() {
      let gender = null;
      let marriage = null,
        cellphone = null,
        education = null,
        contactrel = null;
      if (this.form.gender == null || this.form.gender == "") {
        gender = this.form.gender;
      } else {
        gender = Number(this.form.gender);
      }
      if (this.form.marriage == null || this.form.marriage == "") {
        marriage = this.form.marriage;
      } else {
        marriage = Number(this.form.marriage);
      }

      if (this.form.cellphone == null || this.form.cellphone == "") {
        cellphone = this.form.cellphone;
      } else {
        cellphone = Number(this.form.cellphone);
      }

      if (this.form.education == null || this.form.education == "") {
        education = this.form.education;
      } else {
        education = Number(this.form.education);
      }
      if (this.form.contactrel == null || this.form.contactrel == "") {
        contactrel = this.form.contactrel;
      } else {
        contactrel = Number(this.form.contactrel);
      }

      this.axios
        .post("/management/user/updateUser", {
          id: this.$route.query.num_id,
          userName: this.form.employeeName,
          idcard: this.form.idCard,
          gender: gender,
          birthday: this.form.birthday,
          marriage: marriage,
          cellphone: cellphone,
          education: education,
          graduate: this.form.graduate,
          major: this.form.major,
          email: this.form.email,
          address: this.form.address,
          contact: this.form.contact,
          contactRel: contactrel,
          contactPhone: this.form.contactphone,
          userStatus:this.form.isvalid
        })
        .then(resp => {
          console.log(999, resp);
          if (resp.status == 200) {
            if (resp.data.success) {
              this.$message({
                showClose: true,
                message: "恭喜你，修改成功",
                type: "success"
              });
              this.$router.push({
                path: "/detailemployee",
                query: { num_id: this.$route.query.num_id }
              });
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
  }
};
</script>

<style lang='less'>
.addemploy {
  .addemploy-content {
    .el-tabs__header {
      margin: 0;
    }
    .em_title {
      display: flex;
      align-items: center;
      color: #2477f6;
      font-size: 14px;
      margin-bottom: 15px;
      i {
        display: inline-block;
        width: 4px;
        height: 16px;
        background-color: #2477f6;
        margin-right: 5px;
      }
    }
    .employeename {
      font-size: 30px;
      color: rgba(48, 54, 65, 1);
      margin-bottom: 20px;
    }
    // 自适应
    .el-form-item {
      display: flex;
    }
    .el-form-item__content {
      width: 100%;
    }
    .flexBox {
      display: flex;
    }
    .flexBox3 {
      > div {
        width: calc(75% / 3);
        min-width: 250px;
      }
    }
    .address {
      min-width: 183px;
    }
    .addemployeeform {
      .el-form-item__label {
        font-size: 14px;
        color: rgba(40, 40, 47, 1);
        line-height: 40px;
        text-align: left;
        min-width: 86px;
      }
      .addemployee-infor-item {
        margin-right: 35px;
      }
      // 按钮
      .btn {
        width: 80.5%;
        border-top: 1px solid #d3d7e2;
        padding-top: 20px;
      }
    }
  }
}
</style>
