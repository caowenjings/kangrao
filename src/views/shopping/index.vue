<template>
  <div class="shopping">
    <div class="shoppingbox">
      <div class="lirun">
        <el-form :model="forms" :rules="rules1" :inline="true" ref="forms">
          <el-form-item label="成本:" prop="money">
            <el-input placeholder="请输入成本" v-model="forms.money" style="width:100px"></el-input>
          </el-form-item>
          <el-form-item label="游戏:" prop="shiC">
            <el-select
              @visible-change="this.publicjs.visibleChange"
              clearable
              v-model="forms.shiC"
              placeholder="请选择"
              style="width:100px"
            >
              <el-option
                v-for="item in shiCoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="价格:" prop="ageranges">
            <el-input v-model="forms.ageranges" clearable style="width:70px"></el-input>
          </el-form-item>
          <el-form-item label="至:" class="courseinfor-item" prop="agerangee">
            <el-input v-model="forms.agerangee" clearable style="width:70px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="forms.checked">按销量排序</el-checkbox>
          </el-form-item>
          <el-form-item v-if="forms.money != null&&forms.money !=''">
            <el-checkbox v-model="forms.rateSort">按利润率排序</el-checkbox>
          </el-form-item>
          <span class="button" @click="surechange(forms)">查询</span>
          <span class="button" @click="resetbtn">重置</span>
        </el-form>
      </div>
      <div class="upexit" style="margin-left: 100px;">
        <!-- :show-file-list="sSHow" -->
        <el-upload
          class="upload-demo"
          :action="action"
          :show-file-list="sSHow"
          :before-remove="beforeRemove"
          :on-success="handleSuccess"
          accept=".json"
          :on-exceed="handleExceed"
          :on-error="error"
          :before-upload="beforeUpload"
        >
          <!-- :file-list="fileList" -->
          <el-button class="button" style="line-height: 40px;">点击上传</el-button>
        </el-upload>
      </div>
      <!-- <span class="button" @click="liSort">利润排序</span> -->
      <div class="shopping_b">
        <div class="shopping_bb" v-if="tabledate.length!=0">
          <li class="shopping_list" v-for="item in tabledate " :key="item.id">
            <div class="addGuan">
              <span v-if="item.followId==null" @click="addGuan(item)">+关注</span>
              <span v-else>已关注</span>
            </div>
            <div class="l_img">
              <img :src="item.img" alt />
            </div>
            <div>
              <el-tooltip class="item" effect="dark" :content="item.propName" placement="top-start">
                <p class="name">{{item.propName}}</p>
              </el-tooltip>
              <div class="price1">
                <span>Steam求购价格:￥</span>
                {{item.steamWant==null?'--':item.steamWant}}
              </div>
              <div class="price1">
                <span>Steam售价:￥</span>
                {{item.steamSell==null?'--':item.steamSell}}
              </div>
              <div class="price1">
                <span>buff最低售价:￥</span>
                {{item.sellMinPrice==null?"--":item.sellMinPrice}}
              </div>
              <div class="price1">
                <span>销量:</span>
                {{item.salesVolume==null?'--':item.salesVolume}}
              </div>
              <div class="price1">
                <span>当前利润:￥</span>
                {{item.profit==null?'--':item.profit}}
              </div>
              <div class="price1">
                <span>利润率:</span>
                {{item.rate==null?'--':item.rate}}%
              </div>
            </div>
          </li>
        </div>
        <div class="nodate" v-else>
          <p>暂无数据</p>
        </div>
      </div>
      <!-- 分页-->
      <div class="Toolbar" v-if="total !=0">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10,15,20, 25,]"
          layout="total,sizes,prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
      <!-- 自动报价弹窗 -->
      <selfModal ref="decomeSelect" :styleObj="styleObj">
        <section class="careers-s" @click.prevent.stop>
          <div class="top">
            <i>i</i>
            <h3 class="title">自动报价</h3>
          </div>
          <div class="select1">
            <!-- <el-form :model="form" :rules="rules" :inline="true" ref="form">
              <div class="infor-item">
                <el-form-item label="成本:" prop="money">
                  <el-input placeholder="请输入成本" v-model="form.money" style="width:170px"></el-input>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="市场:" prop="shiC">
                  <el-select
                    @visible-change="this.publicjs.visibleChange"
                    clearable
                    v-model="form.shiC"
                    placeholder="请选择"
                    style="width:170px"
                  >
                    <el-option
                      v-for="item in shiCoptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="but-buttonfff">
                <el-button class="button" @click.native="surechange(form)">确定</el-button>
                <el-button class="cancelbtn" @click.native="closemodulde">取消</el-button>
              </div>
            </el-form>-->
          </div>
        </section>
      </selfModal>
    </div>
  </div>
</template>
<script>
import selfModal from "@/components/public/modul";
export default {
  data() {
    let validatenum = (rule, value, callback) => {
      if (this.forms.agerangee != "" && value == "") {
        callback(new Error("填写价格最低值"));
      } else {
        value = Number(value);
        if (typeof value === "number" && !isNaN(value)) {
          if (value < 0) {
            callback(new Error("数组不能小于0"));
          } else {
            if (this.forms.agerangee != "") {
              value > this.forms.agerangee
                ? callback(new Error("必须小于最高值"))
                : callback();
            } else {
              callback();
            }
          }
        } else {
          callback(new Error("必须为数字"));
        }
      }
    };
    let validatenums = (rule, value, callback) => {
      if (this.forms.ageranges != "" && value == "") {
        callback(new Error("填写价格最高值"));
      } else {
        value = Number(value);
        if (typeof value === "number" && !isNaN(value)) {
          if (value < 0) {
            callback(new Error("数组不能小于0"));
          } else {
            if (this.forms.ageranges != "") {
              value < this.forms.ageranges
                ? callback(new Error("必须大于最低值"))
                : callback();
            } else {
              callback();
            }
          }
        } else {
          callback(new Error("必须为数字"));
        }
      }
    };
    return {
      sSHow: true,
      show: false,
      action: this.constant.url + "/prop/buff",
      fileList: [],
      styleObj: {
        position: "fixed",
        bottom: 0,
        top: 0,
        left: 0,
        background: "rgba(113, 111, 111, 0.5)",
        width: "100%"
      },
      page: 1,
      rows: 10,
      total: 0,
      currentPage: 1,
      tabledate: [],
      shiCoptions: [
        { value: "Dota2", label: "Dota2" },
        { value: "Csgo", label: "Csgo" }
      ],
      forms: {
        money: "",
        shiC: " ",
        ageranges: "",
        agerangee: "",
        checked: false,
        rateSort: false
      },
      rules1: {
        agerangee: [{ validator: validatenums, trigger: "blur" }],
        ageranges: [{ validator: validatenum, trigger: "blur" }]
      },
      rules: {
        money: [
          {
            required: true,
            message: "请填写用户名",
            trigger: ["blur", "change"]
          },
          { max: 20, message: "最多填写20个字符", trigger: ["blur", "change"] }
        ],
        shiC: [
          {
            required: true,
            message: "请选择市场",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  watch: {
    "forms.checked": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.forms.money = "";
          this.forms.rateSort = false;
        }
      }
    },
    "forms.money": {
      handler(newValue, oldValue) {
        if (newValue == null || newValue.trim() == "") {
          console.log(333, newValue);
        } else {
          this.forms.checked = false;
        }
      }
    }
  },
  components: {
    selfModal
  },
  created() {
    this.show = false;
    this.initDate();
  },
  methods: {
    error(res, file) {
      this.$message({
        showClose: true,
        message: file.response.message,
        type: "warning"
      });
    },
    beforeUpload() {
      console.log(333, this.fileList);
      this.sSHow = true;
      this.fileList = [];
    },
    handleSuccess(res, file) {
      this.sSHow = false;
      if (file.success) {
        this.$message({
          showClose: true,
          message: "恭喜你，上传成功！",
          type: "success"
        });
        var num = {
          name: file.name,
          url: file.url
        };
        this.fileList.push(num);
      } else {
        this.$message({
          showClose: true,
          message: file.response.message,
          type: "warning"
        });
      }
      // this.initDate();
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      console.log(file, fileList);
      fileList = [];
      // return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 打开弹框
    liSort() {
      this.forms.money = "";
      this.forms.shiC = "";
      this.$refs.decomeSelect.showModal = true;
    },
    resetbtn() {
      this.forms.money = "";
      this.forms.shiC = "";
      this.forms.ageranges = "";
      this.forms.agerangee = "";
    },
    surechange() {
      this.page = 1;
      this.$refs.forms.validate(valid => {
        if (valid) {
          this.initDate();
        } else {
          return false;
        }
      });
      this.$refs.decomeSelect.showModal = false;
    },
    closemodulde() {
      this.$refs.decomeSelect.showModal = false;
    },
    // 添加关注
    addGuan(item) {
      this.axios
        .post(this.constant.url + "/prop/addFollow/", {
         propName:item.propName
        })
        .then(resp => {
          if (resp.data.success) {
            this.initDate();
          } else {
             this.$message.error(resp.data.message);
          }
        });
    },
    // 工具条
    handleCurrentChange(val) {
      this.page = val;
      this.initDate();
    },
    handleSizeChange(val) {
      this.rows = val;
      this.currentPage = 1;
      this.page = 1;
      this.initDate();
    },
    initDate() {
      if (this.forms.shiC == "" || this.forms.shiC == " ") {
        this.forms.shiC = null;
      }
      if (this.forms.money == "" || this.forms.money == null) {
        this.forms.rateSort = false;
      }
      this.axios
        .post(this.constant.url + "/prop/profit", {
          page: this.page,
          size: this.rows,
          rateSort: this.forms.rateSort,
          costPrice: this.forms.money,
          gameName: this.forms.shiC,
          minPrice: this.forms.ageranges,
          maxPrice: this.forms.agerangee,
          volumeSort: this.forms.checked
        })
        .then(resp => {
          if (resp.status == 200) {
            this.total = resp.data.payload.total;
            this.tabledate = resp.data.payload.propList;
          }
        });
    }
  }
};
</script>
<style lang="scss">
.shopping {
  padding: 30px;
  box-sizing: border-box;
  .el-upload-list__item {
    width: 200px;
    // display: none;
  }
  .s {
    .el-upload-list__item-name,
    .el-upload-list__item-status-label {
      display: none;
    }
  }
  .shoppingbox {
    background: #1b1f2a;
    position: relative;
    .lirun {
      display: flex;
      margin-left: 100px;
    }
    .button {
      height: 40px;
      display: inline-block;
      line-height: 40px;
      font-size: 20px;
    }
  }
  .shopping_b {
    display: flex;
    justify-content: center;
  }
  .nodate {
    border: 1px solid #000;
    margin-top: 50px;
    color: #afb0b2;
    font-size: 25px;
    width: 890px;
    border: 2px solid #2c3040;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    margin-left: 20px;
  }
  .addGuan {
    display: flex;
    justify-content: flex-end;
    padding: 5px 5px 10px 5px;
    font-size: 14px;
    cursor: pointer;
  }
  .shopping_bb {
    display: flex;
    flex-wrap: wrap;
    width: 890px;
  }
  .shopping_list {
    margin-top: 20px;
    margin-right: 15px;
    width: 205px;
    height: 390px;
    padding: 5px;
    box-sizing: border-box;
    background: #2c3040;
    color: #939395;
    border: 2px solid #2c3040;
    position: relative;
    .l_img {
      width: 100%;
      display: flex;
      justify-content: center;
      width: 190px;
      height: 127px;
      overflow: hidden;
      box-sizing: border-box;
      background: linear-gradient(top, #424142, #7f7f7f);
      img {
        width: 100%;
        height: 80;
      }
      img:hover {
        transform: scale(1.4);
      }
    }
    .name {
      color: #afb0b2;
      font-size: 20px;
      margin-top: 10px;
      line-height: 22px;
      font-size: 16px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .name :hover {
      color: #c76940;
    }
    .price {
      display: flex;
      justify-content: space-between;
      font-size: 16px;
      color: #8c8f95;
      line-height: 30px;
      span {
        color: #e46409;
        font-size: 14px;
        font-weight: normal;
      }
    }
    .price1 {
      color: #e46409;
      font-weight: normal;
      span {
        font-size: 16px;
        color: #8c8f95;
        line-height: 26px;
      }
    }
  }
  .Toolbar {
    .el-input__inner {
      background-color: #2c3040;
      color: #fff;
      border: 1px solid #2c3040 !important;
    }

    .el-pagination .el-pager,
    .Toolbar .el-pagination .el-pager li {
      background-color: #2c3040 !important;
    }
    .el-pagination .btn-next,
    .el-pagination .btn-prev {
      background-color: #2c3040 !important;
      border: 1px solid #2c3040 !important;
      color: #fff;
    }
    .el-pagination.is-background .btn-next,
    .el-pagination.is-background .btn-prev,
    .el-pagination.is-background .el-pager li {
      margin: 0 5px;
      background-color: #2c3040;
      color: #fff;
      min-width: 30px;
      border-radius: 2px;
    }
    .el-pagination .el-pager,
    .el-pagination .el-pager li {
      background-color: #2c3040 !important;
      cursor: pointer;
      // border-left: 1px solid #000;
    }
    .el-pagination.is-background .el-pager li:not(.disabled).active {
      color: #a18551;
      background-color: #2c3040 !important;
      border-color: #a18551;
    }
  }
  //自动报价
  .careers-s {
    .el-form-item__label {
      width: 55px;
      text-align: right;
    }
    width: 350px;
    height: 250px;
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
      i {
        display: inline-block;
        width: 25px;
        height: 25px;
        background-color: #414141;
        margin-right: 5px;
        border-radius: 50%;
        color: #fff;
        text-align: center;
      }
      .title {
        font-size: 18px;
        font-weight: 500;
        color: #414141;
        margin-left: 10px;
      }
    }
    .but-buttonfff {
      .button {
        margin-left: 0;
      }
    }
  }
}
</style>