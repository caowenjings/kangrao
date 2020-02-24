<template>
  <div class="like">
    <div class="shoppingbox">
      <div class="shopping_b">
        <div class="shopping_bb" v-if="tabledate.length!=0">
          <li class="shopping_list" v-for="item in tabledate " :key="item.id">
            <div class="addGuan">
              <span @click="addGuan(item)">取消关注</span>
            </div>
            <div class="addGuan">
              <span v-if="item.botId==null" @click="openRoot(item)">选择机器人</span>
              <span v-else @click="openRoot(item)">已选择</span>
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
    </div>
    <selfModal ref="decomeSelect" :styleObj="styleObj">
      <section class="careers-s" @click.prevent.stop>
        <div class="top">
          <i>i</i>
          <h3 class="title">选择机器人</h3>
        </div>
        <div class="select1">
          <el-select
            @visible-change="this.publicjs.visibleChange"
            v-model="root"
            placeholder="请选择"
            style="width:280px"
          >
            <el-option
              v-for="item in rootoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="buttonBox">
          <span class="button" @click="sure(1)">确定</span>
          <span class="cancelbtn" @click="sure(0)">取消</span>
        </div>
      </section>
    </selfModal>
  </div>
</template>
<script>
import selfModal from "@/components/public/modul";
export default {
  data() {
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
      rootoptions: [],
      root: null,
      likeItem: null,
      shiCoptions: [
        { value: "Dota2", label: "Dota2" },
        { value: "Csgo", label: "Csgo" }
      ]
    };
  },
  created() {
    this.getRoot();
    this.initDate();
  },
  components: {
    selfModal
  },
  methods: {
s(){
  var name="sss",age="18";
  var person={
    name,
    age,
    show(){
      return this.name;
    }
  }

},


    openRoot(item) {
      this.root = item.botId;
      this.likeItem = item;
      this.$refs.decomeSelect.showModal = true;
    },
    sure(s) {
      if (s == 0) {
        this.root = null;
        this.$refs.decomeSelect.showModal = false;
      } else {
        if (this.root =="") {
          this.$message({
            showClose: true,
            message: "请选择机器人！",
            type: "warning"
          });
        } else {
          this.sureRoot();
          this.$refs.decomeSelect.showModal = false;
        }
      }
    },
    sureRoot() {
      this.axios
        .post(this.constant.url + "/bot/choice", {
          buffId: this.likeItem.buffId,
          botId: this.root
        })
        .then(resp => {
          if (resp.data.success) {
            this.root = null;
            this.initDate();
            this.$message({
              showClose: true,
              message: "恭喜你，选择机器人成功",
              type: "success"
            });
          } else {
            this.$message({
              showClose: true,
              message: reap.data.msg,
              type: "warning"
            });
          }
        });
    },
    // 添加关注
    addGuan(item) {
      this.axios
        .delete(this.constant.url + "/prop/follow/" + item.followId, {})
        .then(resp => {
          if (resp.data.success) {
            this.initDate();
          } else {
            this.$message.error(reap.data.msg);
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
      this.axios
        .post(this.constant.url + "/prop/follow", {
          page: this.page,
          size: this.rows
        })
        .then(resp => {
          if (resp.status == 200) {
            this.total = resp.data.payload.total;
            this.tabledate = resp.data.payload.propList;
          }
        });
    },
    getRoot() {
      this.axios.get(this.constant.url + "/bot/online", {}).then(resp => {
        if (resp.status == 200) {
          var array = resp.data.payload;
          this.rootoptions = array.map(item => {
            return Object.assign(
              {},
              { value: item.id, label: item.accountName }
            );
          });
          var num = [{ value: null, label: "空机器人" }];
          this.rootoptions = [...num, ...this.rootoptions];
        }
      });
    }
  }
};
</script>
<style lang="scss">
.like {
  padding: 30px;
  box-sizing: border-box;
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
    height: 360px;
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
    .select1 {
      margin-top: 25px;
    }
    width: 350px;
    height: 200px;
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
    .buttonBox {
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
      span {
        margin-left: 0;
        height: 40px;
        cursor: pointer;
        display: inline-block;
        line-height: 40px;
      }
      .cancelbtn {
        padding: 0 20px;
        margin-left: 20px;
      }
    }
  }
}
</style>