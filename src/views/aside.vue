<template>
  <!-- 公共的侧边栏和头部 -->
  <div class="manage_page fillcontain">
    <!-- 头部 -->
    <Header></Header>
    <el-row style="height:calc(100% - 60px);">
      <el-col :span="3" style="height:100%;overflow-y:auto;background-color:rgba(48,54,65,1)">
        <!-- 导航 -->
        <el-menu
          :default-active="defaultActive"
          background-color="rgba(48,54,65,1)"
          text-color="#FFF"
          router
        >
          <el-submenu index="1" >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span class="ttts">机器人管理</span>
            </template>
            <el-menu-item-group >
              <el-menu-item index="rolengt">机器人列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span class="ttts">商品管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="shopping">商品列表</el-menu-item>
              <el-menu-item index="like">特别关注</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
      <div
        v-if="MenuLiObj&&Level3Data"
        class="MenuLiBox"
        :style="refsHeight<BoxHeight-refsTop?`top:${refsTop}px;left:${menuLiWidth}px`:`bottom:0px;left:${menuLiWidth}px`"
        ref="MenuLiBox"
      >
        <ul>
          <li
            v-for="(item,i) in Level3Data"
            :key="i"
            @click="MenuLiClick(item,i)"
            :class="AcitveId==item.path?'liActive':''"
          >{{item.menuName}}</li>
        </ul>
      </div>
      <div
        v-if="MenuLiObj&&Level3Data"
        class="Triangle"
        :style="`top:${refsTop}px;left:${menuLiWidth-10}px`"
      ></div>
      <!-- 页面内容 -->
      <el-col :span="21" style="height: 100%;overflow: hidden">
        <div v-if="MenuLiObj" class="MaskBox" @mouseover="BoxMouseover()"></div>
        <div class="main-container" style="overflow-y: auto">
          <div class="toppp">
            <div class="SelectedStore_top">
              <p class="b_t_title1" v-for="(item, index) in $route.meta" :key="index">{{item}}</p>
            </div>
          </div>
          <!-- 引用页面内容 -->
          <router-view></router-view>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Header from "../components/navside/Header";
export default {
  data() {
    return {
      s:0,
      menuInfor: null,
      refsTop: null,
      MenuLiObj: false,
      refsHeight: null,
      menuLiWidth: null,
      Level3Data: null,
      MenuLiTop: null,
      MenuLiType: false,
      MenuLiBox: false,
      Triangle: false,
      AcitveId: null
    };
  },
  computed: {
    defaultActive: function() {
      let routera = this.$route.path.replace("", "");
      if (routera == "setrole") {
        routera = "rolengt";
      }
      if (routera == "shopping") {
        routera = "shopping";
      }
      if(routera=="like"){
        routera="like"
      }
      if (
        routera == "detailemployee" ||
        routera == "disposeemployee" ||
        routera == "addemployee"
      ) {
        routera = "employee";
      }
      if (routera == "storelnfor") {
        routera = "storelist";
      }
      if (
        routera == "/platform/SelectedStore" ||
        routera == "/platform/ActivityRecommendation"
      ) {
        routera = "/platform/banner";
      }
      if (routera == "/memberactivationdetaile") {
        routera = "/memberactivation";
      }
      if (routera == "/storelnfor") {
        routera = "/storelist";
      }
       if (routera == "/like") {
        routera = "/like";
      }
      if (routera == "/Storepromotion/Storepromotion") {
        routera = "/Storepromotion/index";
      }
      if (routera == "/newarticle") {
        routera = "/article";
      }
      return routera;
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  components: {
    Header
  },
  methods: {
    changeType(num) {
      return "" + num;
    },
    ThisMousemove(itemone) {
      this.MenuLiObj = true;
      this.refsTop =
        this.$refs.menuBox[itemone.sequence].getBoundingClientRect().top - 60;
      this.BoxHeight = document.documentElement.clientHeight;
      this.menuLiWidth = this.$refs.menuBox[itemone.sequence].offsetWidth + 2;
      this.Level3Data = itemone.children ? itemone.children : null;
      this.refsHeight = itemone.children ? itemone.children.length * 60 : 0;
      this.MenuLiType = true;
      this.MenuLiBox = true;
      this.Triangle = true;
    },
    Thismouseleave() {
      if (!this.MenuLiType || !this.MenuLiBox || !this.Triangle) {
        this.MenuLiObj = false;
      }
    },
    handleScroll() {
      this.MenuLiObj = false;
    },
    BoxMouseover() {
      this.MenuLiObj = false;
    },
    MenuLiClick(item) {
      this.AcitveId = item.path;
      this.$router.history.push(item.path);
    }
  }
};
</script>

<style lang="less">
.el-menu {
  border: none;
}
.main-container {
  .ttts{
    font-weight: bold;
  }
  height: 100%;
  .toppp {
    height: 60px;
    width: calc(100% - 40px);
    padding: 0;
    box-sizing: border-box;
    margin-top: 20px;
    margin-left: 20px;
    box-shadow: 0px 2px 9px 1px rgba(40, 40, 47, 0.2);
    border-radius: 4px;
  }
  .SelectedStore_top {
    height: 60px;
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 16px;
    border-radius: 4px;
    padding: 0;
    .b_t_title1 {
      text-align: center;
      line-height: 60px;
      font-weight: bold;
      height: 60px;
      margin-left: 20px;
    }
    .b_t_title1:first-child {
      height: 60px;
      line-height: 60px;
      width: 150px;
      background: rgba(248, 248, 248, 1);
      border-radius: 4px;
      color: rgba(51, 51, 51, 1);
      text-align: center;
      margin-left: 0px;
    }
  }
}
.titlename {
  font-size: 18px;
  font-weight: 500;
  color: #fff;
}
.navimgcont {
  height: 50px;
  width: 111px;
  overflow: hidden;
  img {
    width: 100%;
    height: auto;
  }
}
.el-submenu__title {
  img {
    margin-left: 20px;
  }
  span {
    color: rgb(159, 159, 168);
    font-size: 16px;
  }
}
.el-menu-item-group {
  ul {
    li {
      border-left: 3px solid rgb(48, 54, 65);
      padding-left: 25px;
      box-sizing: border-box;
    }
    li:hover {
      background-color: rgba(48, 54, 65, 1) !important;
    }
    li {
      color: rgb(159, 159, 168) !important;
    }
    .is-active {
      color: #fff !important;
      padding-left: 3px;
      background: #1d2129 !important;
    }
    .is-active:hover {
      background: #1d2129 !important;
    }
  }
}
.el-submenu {
  .el-submenu__title:hover {
    background-color: rgba(48, 54, 65, 1) !important;
  }
}
.is-active {
  i {
    color: #fff !important;
  }
  .el-submenu__title {
    span {
      color: #fff;
    }
  }
}
.el-submenu .el-menu-item {
  min-width: 200px !important;
  margin-left: 40px;
  box-sizing: border-box;
}
.fillcontain {
  overflow-x: hidden;
  .MenuLiBox {
    position: absolute;
    width: 144px;
    padding: 0 13px;
    z-index: 99999;
    font-size: 14px;
    > ul {
      > li {
        padding: 20px 0;
        height: 20px;
        color: rgba(255, 255, 255, 0.5);
        cursor: pointer;
        &:hover {
          color: rgba(255, 255, 255, 1);
          font-weight: bold;
        }
      }
      .liActive {
        color: rgba(255, 255, 255, 1);
        font-weight: bold;
      }
    }
  }
  .MaskBox {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 9999;
  }
  .Triangle {
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid #3d62f6;
    position: absolute;
    z-index: 99999;
    margin-top: 15px;
  }
  .el-menu-item {
    padding: 0 !important;
    min-width: calc(100% - 20px);
    .MenuLi {
      display: flex;
      padding-left: 40px;
      min-width: calc(100% - 60px);
      justify-content: space-between;
      &:hover {
        color: rgba(255, 255, 255, 1);
        font-weight: bold;
      }
      .MenuLiSpan {
        margin-right: 20px;
      }
    }
  }
}
.el-row {
  display: flex;
}
.el-col-3 {
  min-width: 200px;
}
.header_container {
  min-width: 1000px;
}
.main-container {
  width: 100%;
  height: 100%;
  min-width: 900px;
  overflow-x: auto;
}
.main-container > div {
  width: 100%;
  overflow-x: auto;
  height: calc(100% - 80px);
  padding: 20px;
  box-sizing: border-box;
}
.main-container > div > div {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 9px 1px rgba(40, 40, 47, 0.2);
  border-radius: 4px;
  padding: 20px;
  padding-bottom: 0px;
  box-sizing: border-box;
  overflow-y: auto;
  position: relative;
}
</style>
