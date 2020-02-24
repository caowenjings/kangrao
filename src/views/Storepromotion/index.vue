<template>
  <div class="Storepromotion">
    <div class="store-content">
      <div class="store-tab">
        <el-form :inline="true">
          <el-form-item label="上架状态:" class="s-top-item">
            <el-select
              @visible-change="this.publicjs.visibleChange"
              clearable
              v-model="state"
              placeholder="请选择"
              style="width:168px"
            >
              <el-option
                v-for="item in  stateOption"
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
                placeholder="请输入商户名称搜索"
                clearable
                v-model.trim="storeName"
                style="width:178px"
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
        style="min-width:60px; width:100%"
        :header-cell-style="handlemyclass"
        border
      >
        <el-table-column prop="storeName" label="商户名称"></el-table-column>
        <el-table-column prop="isShow" label="上架状态" :formatter="formatState"></el-table-column>
        <el-table-column prop="gmtModified" label="修改时间" :formatter="formatTime"></el-table-column>
        <el-table-column prop="gmtModifiedName" label="审批人"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
             <el-button  type="text" v-if="TopField">
               <span v-if="scope.row.isShow==0" @click="isGrounding(scope.row)">上架</span>
                <span v-else @click="isGrounding(scope.row)">下架</span>
             </el-button>
            <!-- <el-button v-if="scope.row.isShow==0" @click="isGrounding(scope.row)" type="text">上架</el-button>
            <el-button v-else @click="isGrounding(scope.row)" type="text">下架</el-button> -->
            <el-button @click="lookstore(scope.row)" v-if="LookField" type="text">查看详情</el-button>
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
      state: null, //上架状态
      storeName: null,
      stateOption: [{ value: 1, label: "上架" }, { value: 0, label: "下架" }],
      page: 1,
      rows: 10,
      currentPage: 1,
      tabledate: [],
      total: 0
    };
  },
  computed: {
      LookField() {
        return this.publicjs.hasId("mg:market:extension:details");
      },
      TopField() {
        return this.publicjs.hasId("mg:market:extension:top");
      },
    },
  created() {
    this.initDate();
  },
  methods: {
    formatTime: function(row) {
      if (row.gmtModified == "" || row.gmtModified == null) {
        return "--";
      } else {
        return row.gmtModified;
      }
    },
    formatState: function(row) {
      if (row.isShow == 1) {
        return "上架";
      } else if (row.isShow == 0) {
        return "下架";
      } else {
        return "--";
      }
    },
    // 上架下架
    isGrounding(row) {
      let a = null;
      row.isShow == 1 ? (a = 0) : (a = 1);
      this.axios
        .post("/management/promotion/updateShow", {
          isShow: a,
          id: row.id
        })
        .then(resp => {
          if (resp.status == 200) {
            this.$message({
              showClose: true,
              message: resp.data.msg,
              type: "success",
              duration: 1500
            });
            this.initDate();
          } else {
            this.$message({
              showClose: true,
              message: resp.data.msg,
              type: "error",
              duration: 1500
            });
          }
        });
    },
    // 查看详情
    lookstore(row) {
      this.$router.push({
        path: "/Storepromotion/Storepromotion",
        query: { id: row.storeId }
      });
    },
    // 请求
    initDate() {
      this.axios
        .get("/management/promotion/list", {
          params: {
            isShow: this.state,
            rows: this.rows,
            page: this.page,
            storeName: this.storeName
          }
        })
        .then(resp => {
          if (resp.status == 200) {
            this.tabledate = resp.data.data;
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
    //分页
    CurrentChange(val) {
      this.page = val;
      this.initDate();
    },
    SizeChange(val) {
      this.rows = val;
      this.page = 1;
      this.currentPage = 1;
      this.initDate();
    }
  }
};
</script>

<style lang='less'>
.Storepromotion {
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
