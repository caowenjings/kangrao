<template>
  <div class="memberactivation">
    <div class="memberactivationlistdetaile">
      <div class="top">
        <section>
          <div class="left">
            <img :src="item.logo" v-if="item.logo">
            <img src="../../../assets/img/defautlogo.png" v-else>
          </div>
          <i class="i">{{item.storeName}}</i>
        </section>
        <section class="inner">
          <div class="inner-inner">
            <p>
              <span>店长：张三</span>
              <span>产品版本：{{item.versionName}}</span>
            </p>
            <p>创建时间：{{item.gmtCreate}}</p>
            <p>生效日期：{{item.effectiveDate||'--'}} ～ {{item.expiringDate||'--'}}</p>
          </div>
        </section>
        <section class="secondinner">
          <div class="secondinner-inner">
            <div class="title">激活明细</div>
            <ul class="ul">
              <li>
                <p>会员人数</p>
                <div>
                  <i>{{item.memberNum}}</i>
                  <span>人</span>
                </div>
              </li>
              <li>
                <p>激活人数</p>
                <div>
                  <i>{{item.membersIsValid}}</i>
                  <span>人</span>
                </div>
              </li>
              <li>
                <p>激活占比</p>
                <div>
                  <i>{{item.IsValidpercent}}</i>
                  <span>%</span>
                </div>
              </li>
            </ul>

            <div class="title1">激活会员明细</div>
            <!-- 筛选 -->
            <el-form :inline="true">
              <el-form-item label="激活状态:" class="infor-item">
                <el-select
                  @visible-change="this.publicjs.visibleChange"
                  v-model="isActive"
                  placeholder="请选择会员激活状态"
                  clearable
                  style="width:180px"
                  class="choice_list"
                >
                  <el-option
                    v-for="item in roleoptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item class="infor-item" style="margin-left:20px">
                <div class="searchtext">
                  <el-input
                    placeholder="请输入会员名称搜索"
                    v-model="studentName"
                    clearable
                    style="width:207px"
                  ></el-input>
                  <el-button
                    class="search button"
                    style=" height: 40px !important;margin-left:10px"
                    @click="search"
                  >查询</el-button>
                  <!-- <i class="iconfont icon-icon-test1"></i> -->
                </div>
              </el-form-item>
            </el-form>

            <el-button
              class="search button"
              style=" height: 40px !important; margin-bottom:20px"
              @click="exportMemberexcel"
            >导出</el-button>

            <!-- 表格 -->
            <el-table
              :data="tabledate"
              class="table"
              style="min-width:800px; width:70%"
              :header-cell-style="tableStyleObj"
              :row-class-name="tableRowClassName"
              border
            >
              <el-table-column  label="是否激活" >

                  <template slot-scope="scope">
                    <p>{{arr[scope.row.isValid]}}</p>
             
                  </template>
              </el-table-column>

              <el-table-column prop="studentName" label="会员姓名"></el-table-column>
              <el-table-column prop="birthday" label="出生日期" :formatter="formatisbirt"></el-table-column>
              <el-table-column prop="parentName" label="家长姓名" :formatter="formatisname"></el-table-column>
              <el-table-column prop="bindingDate" label="绑定时间" :formatter="formatcoursEnd"></el-table-column>
            </el-table>

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
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
// import fileDownload from 'js-file-download'
export default {
  data() {
    return {
      total: 0,
      page: 1,
      rows:5,
      item:{},
      isActive:null,
      roleoptions:[
        {
          label:"已激活",
          value:"已激活",
          id:1,
        },
        {
          label:"未激活",
          value:"未激活",
          id:0,
        }
      ],
      studentName:null,
      tabledate:[],
      currentPage:1,
      arr:['未激活','已激活']
    };
  },
  created() {
    // this.initDate();
  },
  mounted() {
    // console.log(this.$route.query.item);
    this.item=JSON.parse(this.$route.query.item);
    this.getdata();
    // this.exportMemberexcel();
  },
  methods: {
    tableRowClassName({row}) {
        if ( row.isValid=== 1) {
          return 'warning-row';
        } 
         return '';
       
    },
    //表头样式
    tableStyleObj({ rowIndex, columnIndex }) {
      if (rowIndex === columnIndex) {
        return {
          background: "#F5F5F5",
          color: "#28282F"
        };
      }
      return {
        background: "#F5F5F5",
        color: "#28282F",
        "text-align": "left"
      };
    },
    handleSizeChange(val) {
      this.rows = val;
      this.getdata();
    },
    // 工具条
    handleCurrentChange(val) {
      this.page = val;
      this.getdata();
    },
    formatisValid: function(row) {
      if (row.isValid == 1) {
        return "已激活";
      } else {
        return "未激活";
      }
    },
    formatcoursEnd: function(row) {
      if (row.bindingDate == null) {
        return "--";
      } else {
        return row.bindingDate;
      }
    },
    formatisname: function(row) {
      if (row.parentName == null||row.parentName =="") {
        return "--";
      } else {
        return row.parentName;
      }
    },
    formatisbirt: function(row) {
      if (row.birthday == null||row.birthday =="") {
        return "--";
      } else {
        return row.birthday;
      }
    },
    //获取表格
    getdata(){
      this.axios.get("kidmanagement/member/memberIsActivateList",{
        params:{
          studentName:this.studentName,
          rows:this.rows,
          page:this.page,
          isActive:this.isActive,
          storeId:this.item.id
        }
      }).then(resp=>{
        console.log(196,resp.data);
        this.tabledate=resp.data.object.rows;
        this.total=resp.data.object.total;
      })
    },
    //搜索
    search(){
      this.page=1;
      this.getdata();
    },
    //导出
    exportMemberexcel(){
      this.axios.get("kidmanagement/member/exportMemberexcel",{
        params:{
          isActive:this.isActive,
          storeId:this.item.id,
          studentName:this.studentName,
        },
       
      }).then(resp=>{
        console.log(resp.request.responseURL);
        var link = document.createElement('a')
        link.href =resp.request.responseURL
        link.download = '会员激活明细'
        link.click()
        //释放内存
        window.URL.revokeObjectURL(link.href)

        // var fileDownload = require('js-file-download');
        // fileDownload(resp.data, '会员激活明细.xls');
        
      })
      
    }
  }
};
</script>

<style lang="less">
.memberactivationlistdetaile {
  .top {
    section {
      .left {
        width: 54px;
        height: 54px;
        border-radius: 50%;
        box-shadow: 0px 2px 9px 1px rgba(40, 40, 47, 0.2);
        float: left;
        overflow: hidden;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .i {
        font-size: 20px;
        color: #333;
        line-height: 54px;
        margin-left: 10px;
      }
    }
    .inner {
      padding-left: 64px;
      box-sizing: border-box;
      .inner-inner {
        height: auto;
        width: 1064px;
        border-bottom: 1px solid #d3d7e2;
        padding-bottom: 18px;
        box-sizing: border-box;
        p {
          font-size: 14px;
          color: #333;
          margin-top: 15px;
          span:last-child {
            margin-left: 100px;
          }
        }
        p:first-child {
          margin-top: 0;
        }
      }
    }
    .secondinner {
      padding-left: 64px;
      box-sizing: border-box;
      margin-top: 18px;
      .secondinner-inner {
        //  height: 50px;
        // border: 1px solid red;
        .title {
          font-size: 14px;
          color: #2477f6;
          border-left: 4px solid #2477f6;
          height: 16px;
          line-height: 16px;
          padding-left: 8px;
          box-sizing: border-box;
        }
        .ul {
          height: auto;
          overflow: hidden;
          margin-top: 15px;
          li {
            float: left;
            margin-left: 100px;
            p {
              font-size: 14px;
              color: #333;
            }
            div {
              margin-top:5px;
              i {
                font-size: 24px;
                color: #2477f6;
                margin-left: 0;
              }
              span {
                font-size: 14px;
                color: #333;
              }
            }
          }
          li:first-child {
            margin-left: 0px;
          }
        }
        .title1 {
          font-size: 14px;
          color: #333;
          margin-top: 15px;
          height: 16px;
          line-height: 16px;
          margin-bottom: 20px;
        }
      }
    }
  }
  td:first-child{
    p{
      width: 60px;
      background: #2477F6FF;
      color: #fff;
      border-radius: 4px;
      text-align: center;
    }
  }
  .warning-row{
    td:first-child{
    p{
      width: 60px;
      background: #28CC8BFF;
      color: #fff;
      border-radius: 4px;
      text-align: center;
    }
    }
  }
}
</style>
