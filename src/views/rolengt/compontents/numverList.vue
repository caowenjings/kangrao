<template>
  <div class="employee">
    <div class="employee-content">
      <div class="store-tab">
        <el-form :inline="true">
          <el-form-item label="游戏名称:" class="s-top-item">
            <el-select
              @visible-change="this.publicjs.visibleChange"
              clearable
              v-model="gamename"
              placeholder="请选择"
              style="width:168px"
            >
              <el-option
                v-for="item in  gamenameOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <span class="button" @click="seach">查询</span>
        </el-form>
      </div>
      <div class="table">
        <el-table
          style="width:85%"
          :data="tabledate"
          class="table"
          border
          :header-cell-style="handlemyclass"
        >
          <el-table-column type="index" label="序号" width="60"></el-table-column>
          <el-table-column prop="market_name" label="名称"></el-table-column>
          <el-table-column prop="appid" label="所属游戏" :formatter="formatmenu"></el-table-column>
          <el-table-column prop="amount" label="数量"></el-table-column>
          <el-table-column prop="marketable" label="可否交易" :formatter="formatmess"></el-table-column>
        </el-table>
      </div>
       <!-- 分页-->
      <div class="Toolbar" v-if="total !=0">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10,15,20,25]"
          layout="total,sizes,prev,pager,next,jumper"
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
      tabledate: [],
      gamename: "",
      gamenameOption: [
        { value: 570, label: "dota2" },
        { value: 730, label: "csgo" }
      ],
      page: 1,
      rows: 10,
      total:0,
      currentPage:1,
      ids: null,
      appId: null
    };
  },
  created() {
    this.ids = JSON.parse(this.$route.query.id);
    this.initDate();
  },
  methods: {
     formatmenu: function(row) {
      if (row.appid == 570) {
        return "dota2";
      } else if (row.appid == 730) {
        return "csgo";
      } else {
        return row.appid;
      }
    },
     formatmess: function(row) {
      if (row.marketable) {
      return "可交易";
      }else {
        return "不可交易";
      }
    },
    getCellClassName(scope) {
      return scope.rowIndex === 0 && scope.columnIndex === 0
        ? "hide-selection"
        : "show-selection";
    },
    // 表格序号 除去合计从第一开始，如下图
    indexFun(index) {
      return index;
    },
    // 插入合计的数据
    summaryFun() {
      var obj = ["游戏"];
      this.tabledate.unshift(obj);
    },
    // 合并合计第一行
    arraySpanMethod({ rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        if (columnIndex === 0) {
          return [0, 0];
        } else if (columnIndex === 1) {
          return [0, 0];
        } else if (columnIndex === 2) {
          return [0, 0];
        } else if (columnIndex === 3) {
          return [0, 0];
        } else if (columnIndex === 4) {
          return [0, 0];
        } else if (columnIndex === 5) {
          return [0, 0];
        } else if (columnIndex === 6) {
          return [0, 0];
        } else if (columnIndex === 7) {
          return [0, 0];
        } else if (columnIndex === 8) {
          return [0, 0];
        } else if (columnIndex === 9) {
          return [1, 11];
        } else if (columnIndex === 10) {
          return [0, 0];
        }
      }
    },
    formatmenuName: function(row) {
      if (row.menuName == "" || row.menuName == null) {
        return "--";
      } else {
        return row.menuName;
      }
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
    // 查询
    seach() {
      this.page=1;
      this.initDate();
    },
    // 设置表头颜色
    handlemyclass: function() {
      return "background-color:rgba(245,245,245,1);color:#28282F;font-weight:bold;font-size:16px;";
    },
    // 请求列表
    initDate() {
      if (this.gamename == null || this.gamename == "") {
        this.appId = 999;
      } else {
        this.appId = this.gamename;
      }
      this.axios
        .post(this.constant.url1 + "bots/items", {
          page:this.page,
          size:this.rows,
          id: this.ids.id,
          accountName: this.ids.accountName,
          appId: this.appId
        })
        .then(resp => {
          this.total=resp.data.total;
            this.tabledate = resp.data.data;
             console.log(999,this.tabledate)
        });
    }
  }
};
</script>

<style lang='less'>
.employee {
  font-size: 23px;
  .el-table {
    overflow: visible !important;
  }
  .button {
    height: 40px;
    line-height: 40px;
    text-align: center;
    display: inline-block;
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
    }
    .el-pagination.is-background .el-pager li:not(.disabled).active {
      color: #a18551;
      background-color: #2c3040 !important;
      border-color: #a18551;
    }
  }
}
</style>
