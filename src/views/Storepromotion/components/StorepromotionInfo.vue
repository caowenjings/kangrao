<template>
  <div class="StorepromotionInfo">
    <div class="promotion_contant">
      <div class="promotion_left">
        <div class="p_name">{{storename}}</div>
        <div>
          <p class="p_title" id="a01">1. 基本信息</p>
          <p class="p_t_title" id="a02">1. 1 详细地址</p>
          <p class="p_info">{{form.fullAdress}}</p>
          <p class="p_t_title" id="a03">1. 2 商户简介</p>
          <p class="p_info">{{form.storeDesc==null?"--":form.storeDesc}}</p>
          <p class="p_t_title" id="a04">1. 3 详细介绍</p>
          <div class="p_info" v-if="form.detailDesc==null">--</div>
          <div class="p_info" v-else v-html="form.detailDesc"></div>
        </div>
        <div class="imgbox">
          <p class="p_title" id="a05">2. 图片配置</p>
          <p class="p_t_title" id="a06">2. 1 列表图</p>
          <div v-if="form.coverPath !=null" class="imglist mt">
            <img :src="form.coverPath" alt   @mouseenter="mouseenter(form.coverPath)" />
          </div>
          <div v-else class="imglist mt">
            <el-image>
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
          <p class="p_t_title" id="a07">2. 2 logo图</p>
          <div v-if="form.logo !=null" class="imglist1 mt">
            <img :src="form.logo" alt @mouseenter="mouseenter(form.logo)" />
          </div>
          <div v-else class="imglist1 mt">
            <el-image>
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
          <p class="p_t_title" id="a08">2. 3 轮播图</p>
          <div v-if="form.carouselImages.length !=0" class="imglist2 mt">
            <img v-for="it in form.carouselImages" @mouseenter="mouseenter(it)" :key="it" :src="it" alt />
          </div>
          <div v-else class="imglist2 mt">
            <el-image>
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
        </div>
        <div>
          <p class="p_title" id="a09">3.宣传课程</p>
          <div class="xuan_table">
            <el-table
              :data="form.propagandaCourses"
              style="width:500px"
              :header-cell-style="handlemyclass"
              border
            >
              <el-table-column label="课程图片 ">
                <template slot-scope="scope">
                  <img :src="scope.row.courseImage" @mouseenter="mouseenter(scope.row.courseImage)" alt />
                </template>
              </el-table-column>
              <el-table-column prop="courseName" label="课程名称 "></el-table-column>
              <el-table-column prop="features" label="课程亮点 "></el-table-column>
            </el-table>
          </div>
        </div>
        <div>
          <p class="p_title" id="a10">4. 活动配置</p>
          <div class="xuan_table">
            <el-table
              :data="form.activityInformationVos"
              style="width:500px"
              :header-cell-style="handlemyclass"
              border
            >
              <el-table-column label="活动图片 ">
                <template slot-scope="scope">
                  <img v-for="it in scope.row.posterImages"  @mouseenter="mouseenter(scope.row.posterImages)"  :key="it" :src="it" alt />
                </template>
              </el-table-column>
              <el-table-column prop="activityTitle" label="活动名称 "></el-table-column>
            </el-table>
          </div>
        </div>
        <div style="margin-bottom: 20px;">
          <p class="p_title" id="a11">5. 师资力量</p>
          <div class="xuan_table">
            <el-table
              :data="form.teacherStrengths"
              style="width:500px"
              :header-cell-style="handlemyclass"
              border
            >
              <el-table-column label="教师图片 ">
                <template slot-scope="scope">
                  <img :src="scope.row.headImage" @mouseenter="mouseenter(scope.row.headImage)" alt />
                </template>
              </el-table-column>
              <el-table-column prop="teacherName" label="教师姓名"></el-table-column>
              <el-table-column prop="features" label="教师亮点  "></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="promotion_right">
        <div>
          <ul>
            <li @click="cur=0" :class="{active:cur==0}">
              <a href="#a01">1. 基本信息</a>
            </li>
            <li @click="cur=1" :class="{active:cur==1}">
              <p>
                <a href="#a02">1.1 详细地址</a>
              </p>
            </li>
            <li @click="cur=2" :class="{active:cur==2}">
              <p>
                <a href="#a03">1.2 商户简介</a>
              </p>
            </li>
            <li @click="cur=3" :class="{active:cur==3}">
              <p>
                <a href="#a04">1.3 详细介绍</a>
              </p>
            </li>
            <li @click="cur=10" :class="{active:cur==10}">
              <a href="#a05">2. 图片配置</a>
            </li>
            <li @click="cur=4" :class="{active:cur==4}">
              <p>
                <a href="#a06">2.1 列表图</a>
              </p>
            </li>
            <li @click="cur=5" :class="{active:cur==5}">
              <p>
                <a href="#a07">2.2 logo图</a>
              </p>
            </li>
            <li @click="cur=6" :class="{active:cur==6}">
              <p>
                <a href="#a08">2.3 轮播图</a>
              </p>
            </li>
            <li @click="cur=7" :class="{active:cur==7}">
              <a href="#a09">3. 宣传课程</a>
            </li>
            <li @click="cur=8" :class="{active:cur==8}">
              <a href="#a10">4. 活动配置</a>
            </li>
            <li @click="cur=9" :class="{active:cur==9}">
              <a href="#a11">5. 师资力量</a>
            </li>
          </ul>
        </div>
      </div>
      <selfModal ref="enlarge" :styleObj="styleObj">
        <div class="PlusImg" @click.prevent.stop>
          <div class="PlusImgBox" @mouseleave="mouseleave">
            <el-image fit="contain" :src="enlargeUrl" object-fit="contain" />
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
      cur: 0,
      ids: null,
      storeInfo: null,
      storename: null,
      form: {
        fullAdress: "商户未填写详细地址",
        storeDesc: "",
        detailDesc: "",
        coverPath: "",
        logo: "",
        carouselImages: "",
        propagandaCourses: [],
        activityInformationVos: [],
        teacherStrengths: []
      },
      styleObj: {
        position: "fixed",
        bottom: 0,
        top: 0,
        left: 0,
        background: "rgba(113, 111, 111, 0.5)",
        width: "100%"
      },
      enlargeUrl: ""
    };
  },
  components: {
    selfModal
  },
  created() {
    this.ids = this.$route.query.id;
    if (this.ids != null) {
      this.initDate();
    }
  },
  methods: {
    //鼠标移入图片
    mouseenter(val) {
      this.enlargeUrl = val;
      this.$refs.enlarge.showModal = true;
    },
    //鼠标移出事件
    mouseleave() {
      this.enlargeUrl = "";
      this.$refs.enlarge.showModal = false;
    },
    // 请求详情
    initDate() {
      this.axios
        .get("/management/promotion/queryStoreDetails", {
          params: {
            storeId: this.ids
          }
        })
        .then(resp => {
          if (resp.status == 200) {
            this.storeInfo = resp.data.object;
            this.showInfo(this.storeInfo);
          }
        });
    },
    // 设置表头颜色
    handlemyclass: function() {
      return "background-color:rgba(245,245,245,1);color:#28282F;font-weight:bold;font-size:16px;";
    },
    // 数据赋值
    showInfo(s) {
      this.form.fullAdress = s.fullAdress;
      this.form.storeDesc = s.storeDesc;
      this.form.detailDesc = s.detailDesc;
      this.form.coverPath = s.coverPath;
      this.form.logo = s.logo;
      this.form.carouselImages = s.carouselImages;
      this.form.propagandaCourses = s.propagandaCourses;
      this.form.activityInformationVos = s.activityInformationVos;
      this.form.propagandaCourses = s.propagandaCourses;
      this.form.teacherStrengths = s.teacherStrengths;
      this.storename = s.storeName;
    }
  }
};
</script>

<style lang='less'>
.StorepromotionInfo {
  .el-image {
    i {
      font-size: 80px;
      color: #ccc;
    }
  }
  .promotion_contant {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-between;
  }
  .promotion_left {
    flex: 1;
    height: 100%;
    .p_name {
      font-size: 20px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }
    .p_title {
      font-size: 18px;
      font-weight: 400;
      color: rgba(36, 119, 246, 1);
      margin-top: 15px;
    }
    .p_t_title {
      font-size: 14px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      margin-top: 15px;
    }
    .p_info {
      font-size: 14px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      margin-top: 15px;
      margin-left: 15px;
      line-height: 25px;
    }
    .imgbox {
      .mt {
        margin-top: 15px;
        margin-left: 15px;
      }
      .imglist {
        img {
          width: 212px;
          height: 106px;
        }
      }
      .imglist1 {
        img {
          width: 106px;
          height: 106px;
        }
      }
      .imglist2 {
        display: flex;
        img {
          width: 126px;
          height: 121px;
          margin-right: 15px;
        }
      }
    }
    .xuan_table {
      margin-top: 15px;
      margin-left: 15px;
      img {
        width: 158px;
        height: 89px;
      }
    }
  }
  .promotion_right {
    height: 430px;
    width: 400px;
    ul {
      position: fixed;
      right: 50px;
      width: 360px;
      border-left: 2px solid #d3d7e2;
      padding-left: 16px;
      .active:before {
        display: inline-block;
        background: #2477f6;
        border-radius: 50%;
        content: "";
        margin-right: 15px;
        margin-left: -26px;
        width: 15px;
        height: 15px;
        margin: 5px 15px 0 -24px;
        position: relative;
        box-shadow: 0 0 0 3px #91bbfa;
      }
      .active {
        a {
          color: #2477f6 !important;
        }
      }
      li {
        display: flex;
        margin-top: 15px;
        a {
          color: #888888;
        }
        p {
          padding-left: 15px;
        }
      }
    }
  }
  // 图片放大弹框
  .PlusImg {
    width: 60%;
    height: 80%;
    border-radius: 4px;
    position: absolute;
    margin-top: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    box-sizing: border-box;
    .PlusImgBox {
      padding: 20px;
      background: rgba(255, 255, 255, 1);
    }
    .c-tips {
      text-align: center;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(87, 89, 104, 1);
    }
    .top {
      margin-left: 95px;
      height: auto;
      overflow: hidden;
    }
    .c-but-button {
      text-align: center;
      margin-top: 20px;
      .cancelbtn,
      .button {
        padding: 0;
        width: 60px;
        height: 30px !important;
        font-size: 14px;
        font-weight: 400;
      }
    }
  }
}
</style>
