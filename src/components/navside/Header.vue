 <template>
  <div class="header_container">
    <div class="LeftBox">
      <div class="headerLogo">
         <p class="titlename">Steam BOT 管理系统</p>
      </div>
    </div>
     <div class="right-info">
      <div class="avtor info">
        <section style="height:60px;display:flex;align-items: center;">
          <div class="avtorimg-cont">
             <img src="../../assets/img/avtor.png" />
          </div>
          <div style="margin-left:20px;margin-right:30px;max-width:200px">
            <p class="userText">{{employeeName}}</p>
          </div>
        </section>
        <ul class="drop">
          <li @click="Signout()">
            <i class="iconfont icon-tuichu"></i>     
            <span>退出登录</span>
          </li>
        </ul>
      </div>
  </div>

  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      employeeName:"欢迎登陆"
    };
  },
  methods: {
    accountinfor() {
      this.$router.push({ path: "/changeaccount" });
    },
    // 退出
    Signout() {
      this.$router.push({ path: "/" });
      // this.axios.get("management/auth/loginout").then(resp => {
      //   if (resp.data.success) {
      //     this.$router.push({ path: "/" });
      //     this.$store.commit("del_token");
      //   }
      // });
    }
  }
};
</script>

<style lang="scss">
.header_container {
  background: rgb(48, 54, 65);
  height: 60px;
  padding-left: 30px;
  padding-right: 50px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .LeftBox {
    display: flex;
    align-items: center;
    .headerLogo {
      width: 120px;
      height: 45px;
      padding-right: 20px;
      margin-right: 20px;
      line-height: 45px;
      > img {
        width: 100%;
        height: 100%;
      }
    }
    .titlename {
      font-size: 20px;
      color: #fff;
      padding-right: 20px;
    }
  }
  .el-breadcrumb {
    height: 100%;
    font-size: 16px;
    .el-breadcrumb__inner {
      line-height: 60px;
      color: #fff;
    }
    .el-breadcrumb__item:last-child .el-breadcrumb__inner,
    .el-breadcrumb__item:last-child .el-breadcrumb__inner a,
    .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover,
    .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
      color: #fff;
    }
  }
  .right-info{
   float:right;
   width: auto;
   overflow: hidden;
   box-sizing: border-box;
   .info{
      float: left;
      font-size:17px;
      font-weight:400;
      color:#fff;
      margin-left: 50px;
     span{
       line-height: 60px;
       margin-left: 8px;
     }
     .icon{
       float: left;
       margin-top: 14px;
     }
     .item {
        margin-right: 0px;
      }
   }
    .avtor{
      height:59px;
      width:auto;
      min-width: 200px;
      overflow: hidden;
      transition: .2s;
      cursor: pointer;
      position: relative;
      .avtorimg-cont{
        height: 43px;
        width: 43px;
        border-radius: 50%;
        overflow: hidden;
        background: #fff;
        img{
          width: 100%;
          height: auto;
        }
      }
      .userText{
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
      .drop{
        width:100%;
        height:0px;
        overflow: hidden;
        border: 1px solid #E5E5E5;
        background: #fff;
        border-top: none;
        border-right: none;
        transition: .2s;
        position: fixed;
        z-index: 100;
        color: #828A9A;
        max-width: 200px;
        li{
          height: 40px;
          line-height: 40px;
          padding-left: 45px;
          box-sizing: border-box;
          cursor: pointer;
          transition:0.2s;
          font-size: 14px;
          span{
            margin-left: 5px;
            line-height: 40px;
          }
        }
        li:hover{
          transform: all;
          background: #303841;
          color: #fff;
        }
      }
      
   }
   .avtor:hover{
     transform: all;
     .drop{
       height: auto;
     }
   }
 }
}
</style>
