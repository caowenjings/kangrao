<template>
  <div class="merchant-ativityarc">
    <div class="merchant-ativity-content">
      <!-- 筛选 -->
      <el-form :inline="true">
        <el-form-item label="栏目:" class="infor-item">
          <el-select
            @visible-change="this.publicjs.visibleChange"
            v-model="categoryId"
            placeholder="请选择文章栏目"
            clearable
            class="choice_list"
          >
            <el-option
              v-for="item in roleoptions"
              :key="item.id"
              :label="item.categoryName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="infor-item">
          <div class="searchtext">
            <el-input
              type="text"
              placeholder="请输入发布人搜索"
              v-model="userName"
              clearable
              style="width:200px"
            />
            <el-button
              class="search button"
              style=" height: 40px !important;margin-left:10px"
              @click="search"
            >查询</el-button>
            <!-- <span class="myspan">只看自己的</span> -->
          </div>
        </el-form-item>
      </el-form>
      <!-- 新增文章 -->
      <el-button
        class="search button"
        style=" height: 40px !important;"
        @click="tonewarticle"
        v-if="AddField"
      >+ 新增文章</el-button>
      <!-- 列表 -->
      <ul class="articalist" v-if="articlelist.length>0">
        <li v-for="(item,index) in articlelist" :key="index">
          <div class="left">
            <i class="h4">{{item.articleTitle}}</i>
            <p class="pppppp" style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;
overflow: hidden;">{{item.introduction}}</p>
            <div class="spanbot">
              <span>{{item.userName}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <span>发布于 {{item.gmtCreate}}</span>
            </div>
          </div>
          <div class="right">
            <p @click="updateTop(item)" v-if="TopField">{{zdlistL[item.isTop]}}</p>
            <p @click="reedit(item.id)" v-if="EditField">编辑</p>
            <p @click="dellistbefore(item.id)" v-if="CancelField">删除</p>
          </div>
        </li>
      </ul>
      <p v-else class="pp">暂无数据</p>
      <!-- 分页-->
      <div class="Toolbar" v-if="total>0">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5,20,50]"
          layout="total,sizes,prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>

      <!-- 删除-->
      <selfModal ref="deleteSelect" :styleObj="styleObj">
        <div class="delete-content" @click.prevent.stop>
          <div class="top">
            <i class="iconfont icon-icon-test6"></i>
            <span class="t-title">删除文章</span>
          </div>
          <div class="select1">
            <el-form>
              <div class="infor-item">
                <p class="d-c-tips">删除后将不再显示在小程序首页</p>
                <p class="d-c-tips1">你还要继续么？</p>
              </div>
              <div class="but-button">
                <el-button class="button" @click.native="dellist">确定</el-button>
                <el-button class="cancelbtn" @click.native="closedelete">取消</el-button>
              </div>
            </el-form>
          </div>
        </div>
      </selfModal>
    </div>
  </div>
</template>
<script>
import selfModal from "@/components/public/modul";
export default {
  data() {
    return {
      total: 0,
      page: 1,
      rows: 5,
      categoryId: null,
      roleoptions: [],
      userName: null,
      articlelist: [],
      zdlistL: ["置顶", "取消置顶"],
      styleObj: {
        position: "fixed",
        bottom: 0,
        top: 0,
        left: 0,
        background: "rgba(113, 111, 111, 0.5)",
        width: "100%"
      },
      delid: null,
      currentPage: 1
    };
  },
  computed: {
    AddField() {
      return this.publicjs.hasId("mg:market:article:add");
    },
    EditField() {
      return this.publicjs.hasId("mg:market:article:update");
    },
    CancelField() {
      return this.publicjs.hasId("mg:market:article:delete");
    },
    TopField() {
      return this.publicjs.hasId("mg:market:article:top");
    }
  },
  components: {
    selfModal
  },
  created() {
    // this.initDate();
  },
  mounted() {
    this.queryArticleCategory();
    this.getdate();
  },
  methods: {
    tonewarticle() {
      this.$router.history.push("/newarticle");
    },
    // 查询文章分类栏目
    queryArticleCategory() {
      this.axios.get("management/common/queryArticleCategory").then(resp => {
        // console.log(127,resp.data.object);
        this.roleoptions = resp.data.object;
      });
    },
    //文章列表
    getdate() {
      this.axios
        .get("/management/article/list", {
          params: {
            page: this.page,
            rows: this.rows,
            categoryId: this.categoryId,
            userName: this.userName
          }
        })
        .then(resp => {
          console.log(143, resp.data);
          this.articlelist = resp.data.data;
          this.total = resp.data.total;
        });
    },
    //搜索
    search() {
      this.page = 1;
      this.getdate();
    },
    //置顶
    updateTop(item) {
      console.log(125, item);
      this.axios
        .post("management/article/updateTop", {
          id: item.id,
          isTop: item.isTop == 1 ? 0 : 1
        })
        .then(resp => {
          console.log(resp);
          if (resp.data.success) {
            this.$message({
              message: resp.data.msg,
              type: "success",
              center: true,
              duration: 1500
            });
            this.getdate();
          } else {
            this.$message({
              message: resp.data.msg,
              type: "error",
              center: true,
              duration: 1500
            });
          }
        });
    },
    //删除
    dellistbefore(id) {
      this.delid = id;
      this.$refs.deleteSelect.showModal = true;
    },
    closedelete() {
      this.$refs.deleteSelect.showModal = false;
    },
    dellist() {
      // console.log(155,item);
      this.axios
        .post("management/article/deleteArticle", {
          id: this.delid
        })
        .then(resp => {
          if (resp.data.success) {
            this.$message({
              message: resp.data.msg,
              type: "success",
              center: true,
              duration: 1500
            });
            this.getdate();
            this.$refs.deleteSelect.showModal = false;
          } else {
            this.$message({
              message: resp.data.msg,
              type: "error",
              center: true,
              duration: 1500
            });
            this.$refs.deleteSelect.showModal = false;
          }
        });
    },
    handleSizeChange(val) {
      this.rows = val;
      this.getDate();
    },
    // 工具条
    handleCurrentChange(val) {
      this.page = val;
      this.getdate();
    },
    reedit(id) {
      console.log(id);
      // "/newarticle"
      this.$router.history.push({
        path: "/newarticle",
        query: { id }
      });
    }
  }
};
</script>

<style lang="less">
.myspan {
  color: #2477f6;
  cursor: pointer;
  font-size: 14px;
  margin-left: 5px;
}
.articalist {
  width: 80%;
  min-width: 775px;
  
  li {
    height: auto;
    overflow: hidden;
    border-bottom: 1px solid #d3d7e2;
    padding-top: 20px;
    padding-bottom: 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      width: 80%;
      .h4 {
        font-size: 18px;
        color: #282828;
        font-weight: 400;
        overflow: hidden;

        text-overflow: ellipsis;

        display: -webkit-box;

        -webkit-box-orient: vertical;

        -webkit-line-clamp: 1;
      }
      p {
        margin-top: 13px;
        margin-bottom: 13px;
        font-size: 14px;
        color: #999;
        overflow: hidden;

        text-overflow: ellipsis;

        display: -webkit-box;

        -webkit-box-orient: vertical;

        -webkit-line-clamp: 2;
      }
  .pppppp{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;  // 控制多行的行数
    -webkit-box-orient: vertical;

  }
      .spanbot {
        font-size: 14px;
        color: #999;
        span:first-child {
          color: #2477f6;
        }
      }
    }
    .right {
      display: flex;
      align-items: center;
      p {
        color: #2477f6;
        font-size: 14px;
        cursor: pointer;
        margin-left: 8px;
      }

      p:first-child {
        margin-left: 0px;
      }
    }
  }
}
.pp {
  line-height: 60px;
  width: 80%;
  text-align: center;
  margin-top: 20px;
  color: #909399;
  border: 1px solid #EBEEF5;
  border-radius: 4px;
}

//   删除弹框
.delete-content {
  // min-width: 500px;
  width: 332px;
  height: 179px;
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
    i {
      font-size: 30px;
      color: #ff1200;
    }
    .t-title {
      font-size: 16px;
      font-weight: 500;
      color: #666;
      margin-left: 10px;
      margin-top: 8px;
    }
  }
  .d-c-tips {
    font-size: 14px;
    color: #888888;
  }
  .d-c-tips1 {
    font-size: 14px;
    color: #888888;
    margin-top: 12px;
    margin-bottom: 15px;
  }
  .el-form-item__label {
    color: #888888;
  }
  .el-textarea__inner {
    height: 120px;
    width: 300px;
  }
  .select1 {
    margin-left: 40px;
  }
  .but-button {
      margin-right: 45px;
      float: right;
      text-align: center;
      display: flex;
  }
}
</style>
