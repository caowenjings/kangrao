<template>
  <div class="storelist">
    <div class="store-content">
      <div class="s-type-btn">
        <button
          v-if="openDisabled"
          class="s-open"
          :disabled="openDisabled"
          :class="{btndisabled:openDisabled}"
          @click="open"
        >{{title}}</button>
        <p class="s-title" :class="{changetitle:isactive}">商户类型：</p>
        <ul :class="{changehelght:isactive}">
          <li
            v-for="(items,index) in navList"
            :class="{active:items.isActive}"
            @click="activeFun(items)"
            :key="index"
          >{{items.text}}</li>
        </ul>
      </div>
      <div class="t-search">
        <div class="s-search">
          <input type="text" placeholder="请输入搜索内容" v-model="keyword" />
        </div>
        <p class="cha button" @click="searchbtn">查询</p>
      </div>
      <!-- 表格 -->
      <el-table
        :data="tabledate"
        class="table"
        style="min-width:55px; width:100%"
        :header-cell-style="handlemyclass"
        border
      >
        <el-table-column prop="storeName" label="名称"></el-table-column>
        <el-table-column prop="catgoryName" label="类型" :formatter="formatcatgoryName"></el-table-column>
        <el-table-column prop="courseName" label="版本" :formatter="formatcourseName"></el-table-column>
        <el-table-column prop="fileName" label="学员" :formatter="formatfileName"></el-table-column>
        <el-table-column fixed="right" v-if="LookField" label="操作">
          <template slot-scope="scope">
            <el-button
              @click="lookstore(scope.$index, scope.row)"
              type="text"
              v-if="LookField"
              size="small"
            >查看详情</el-button>
            <!-- <el-button @click="editstudent(scope.$index, scope.row)" type="text" size="small">冻结/激活</el-button> -->
            <!-- <el-button @click="editstudent(scope.$index, scope.row)" type="text" size="small">配置</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页-->
      <div class="Toolbar" v-if="total != 0">
        <el-pagination
          background
          @size-change="SizeChange"
          @current-change="CurrentChange"
          :current-page="currentPage"
          :page-sizes="[10,20,50]"
          layout="total,sizes,prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "展开",
      isactive: false,
      total: 0,
      currentPage: 1,
      keyword: null,
      catgoryId: null,
      page: 1,
      rows: 10,
      navList: [{ text: "全部", isActive: true, index: null }],
      tabledate: [],
      openDisabled: true
    };
  },
  computed: {
    //查看商户详情
    LookField() {
      return this.publicjs.hasId(16);
    }
  },
  created() {
    this.getType();
    this.initDate();
  },
  methods: {
    formatcatgoryName: function(row) {
      if (row.catgoryName == "" || row.catgoryName == null) {
        return "--";
      } else {
        return row.catgoryName;
      }
    },
    formatcourseName: function(row) {
      if (row.courseName == "" || row.courseName == null) {
        return "--";
      } else {
        return row.courseName;
      }
    },
    formatfileName: function(row) {
      if (row.fileName == "" || row.fileName == null) {
        return "--";
      } else {
        return row.fileName;
      }
    },
    // 展开
    open() {
      if (this.title == "展开") {
        this.isactive = true;
        this.title = "取消展开";
      } else {
        this.isactive = false;
        this.title = "展开";
      }
    },
    //   商户类型
    getType() {
      this.axios
        .get("/kidmanagement/baseBusinessCatgory/queryBusinessCatgoryList", {})
        .then(resp => {
          var array = resp.data;
          var array2 = [];
          array.map(item => {
            array2.push(
              Object.assign(
                {},
                { index: item.id, text: item.catgoryName, isActive: false }
              )
            );
          });
          this.navList = this.navList.concat(array2);
          this.navList.length < 15
            ? (this.openDisabled = true)
            : (this.openDisabled = false);
        });
    },
    // 请求
    initDate() {
      this.axios
        .post("/kidmanagement/store/queryStores", {
          keyword: this.keyword,
          rows: this.rows,
          page: this.page,
          catgoryId: this.catgoryId
        })
        .then(resp => {
          if (resp.status == 200) {
            this.tabledate = resp.data.rows;
            this.total = resp.data.total;
          }
        });
    },
    // 商户类型点击
    activeFun: function(data) {
      this.navList.forEach(function(obj) {
        obj.isActive = false;
      });
      data.isActive = !data.isActive;
      if (data.isActive) {
        this.catgoryId = data.index;
        this.keyword = null;
        this.page = 1;
        this.initDate();
      }
    },
    // 搜索
    searchbtn() {
      this.catgoryId = null;
      this.page = 1;
      this.initDate();
    },
    // 设置表头颜色
    handlemyclass: function() {
      return "background-color:rgba(245,245,245,1);color:#28282F;font-weight:bold;font-size:16px;";
    },
    // 工具条
    CurrentChange(val) {
      this.page = val;
      this.initDate();
    },
    SizeChange(val) {
      this.rows = val;
      this.initDate();
    },
    // 查看详情
    lookstore(index, row) {
      this.$router.push({ path: "/storelnfor", query: { num: row } });
    }
  }
};
</script>

<style lang='less'>
.storelist {
  .store-content {
    .s-type-btn {
      border-bottom: 1px solid rgba(195, 199, 208, 1);
      padding-bottom: 20px;
      margin-bottom: 20px;
      overflow: hidden;
      .s-title {
        float: left;
        margin-top: 3px;
        font-size: 14px;
      }
      .changetitle {
        height: 90px;
      }
      ul {
        display: flex;
        flex-wrap: wrap;
      }
      .changehelght {
        height: auto;
      }
      ul li {
        height: 30px;
        text-align: center;
        display: inline-block;
        padding: 0 20px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(28, 36, 65, 1);
        line-height: 30px;
        margin-bottom: 10px;
        cursor: pointer;
      }
      ul li:hover {
        background: #2477f6;
        border-radius: 4px;
        color: #fff;
      }
      li:nth-child(1) {
        margin-left: 20px;
      }
      .active {
        background: #5092f8;
        border-radius: 4px;
        color: #fff;
      }
      .s-open {
        float: right;
        display: inline-block;
        color: #2477f6;
        background-color: #fff !important;
        font-size: 14px;
        margin-top: 3px;
      }
      .btndisabled {
        color: #606266 !important;
      }
    }
    .t-search {
      display: flex;
      .s-search {
        cursor: pointer;
        border: 1px solid rgba(195, 199, 208, 1);
        border-radius: 4px;
        height: 36px;
        overflow: hidden;
        margin-bottom: 20px;
        input {
          width: 200px;
          height: 36px;
          font-size: 14px;
          font-weight: 400;
          line-height: 40px;
          text-indent: 1em;
          float: left;
        }
        // img {
        //   width: 20px;
        //   height: 20px;
        //   float: right;
        //   margin-top: 10px;
        //   margin-right: 10px;
        // }
      }
      .cha {
        display: inline-block;
        font-size: 14px;
        height: 36px;
        line-height: 36px;
        margin-left: 10px;
      }
    }
    // 表格
    .table {
      button {
        background: none !important;
        font-size: 14px;
      }
    }
  }
}
</style>
