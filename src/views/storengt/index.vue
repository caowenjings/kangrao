<template>
  <div class="storelist">
    <div class="store-content">
      <div class="store-tab">
        <el-form :inline="true">
          <el-form-item label="商户分类:" class="s-top-item">
            <el-select
              @visible-change="this.publicjs.visibleChange"
              clearable
              v-model="storeId"
              placeholder="请选择"
              style="width:168px"
            >
              <el-option
                v-for="item in  storeOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态:" class="s-top-item">
            <el-select
              @visible-change="this.publicjs.visibleChange"
              clearable
              v-model="isValid"
              placeholder="请选择"
              style="width:168px"
            >
              <el-option
                v-for="item in  ValidOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <div class="t-search">
              <el-input
                class="s-search"
                placeholder="输入商户姓名"
                clearable
                v-model.trim="keyword"
                style="width:158px"
              ></el-input>
              <span class="cha button" @click="searchbtn">查询</span>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <!-- 表格 -->
      <el-table
        :data="tabledate"
        class="table"
        style="min-width:60px;width:100%"
        :header-cell-style="handlemyclass"
        border
      >
        <el-table-column prop="storeName" label="商户名称"></el-table-column>
        <el-table-column prop="catgoryName" label="商户类型" :formatter="formatcatgoryName"></el-table-column>
        <el-table-column prop="versionName" label="使用版本" :formatter="formatversionName"></el-table-column>
        <el-table-column prop="memberNum" label="会员数量" :formatter="formatfileName"></el-table-column>
        <el-table-column fixed="right" v-if="LookField" label="操作">
          <template slot-scope="scope">
            <el-button
              @click="lookstore(scope.row)"
              type="text"
              v-if="LookField"
              size="small"
            >查看详情</el-button>
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
      storeOption: [],
      ValidOption: [{ value: 1, label: "正常" }, { value: 0, label: "停用" }],
      isValid: null, //状态
      storeId: null,
      keyword: null, //商户名称
      total: 0,
      currentPage: 1,
      page: 1,
      rows: 10,
      tabledate: []
    };
  },
  computed: {
    //查看商户详情
    LookField() {
      return this.publicjs.hasId("mg:store:information:details");
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
    formatversionName: function(row) {
      if (row.versionName == "" || row.versionName == null) {
        return "--";
      } else {
        return row.versionName;
      }
    },
    formatfileName: function(row) {
      if (row.memberNum == "") {
        return "0";
      } else {
        return row.memberNum;
      }
    },
    //商户类型
    getType() {
      this.axios
        .get("/kidmanagement/baseBusinessCatgory/queryBusinessCatgoryList", {})
        .then(resp => {
          var array = resp.data;
          var array2 = [];
          array.map(item => {
            array2.push(
              Object.assign({}, { value: item.id, label: item.catgoryName })
            );
          });
          this.storeOption = array2;
        });
    },
    //获取列表
    initDate() {
      this.axios
        .post("/kidmanagement/store/queryStores", {
          keyword: this.keyword,
          rows: this.rows,
          page: this.page,
          catgoryId: this.storeId,
          isValid: this.isValid
        })
        .then(resp => {
          console.log(2323,resp);
          if (resp.status == 200) {
            this.tabledate = resp.data.rows;
            this.total = resp.data.total;
          }
        });
    },
    // 搜索
    searchbtn() {
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
      this.page = 1;
      this.currentPage = 1;
      this.initDate();
    },
    // 查看详情
    lookstore(row) {
      this.$router.push({ path: "/storelnfor", query: { id:JSON.stringify(row) } });
    }
  }
};
</script>

<style lang='less'>
.storelist {
  .store-content {
    .store-tab {
      display: flex;
      align-items: center;
      .s-top-item {
        margin-right: 25px;
      }
    }
    .t-search {
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
