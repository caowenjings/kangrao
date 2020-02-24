<template>
  <div class="storeinfor">
    <div class="s-infor-content">
      <div class="s-infor-box">
        <div class="s_info_title">
          <div class="s_t_left">
            <img v-if="basic.logo != null" :src="basic.logo" alt />
            <img v-else src="../../../../src/assets/img/defautlogo.png" alt />
          </div>
          <div class="s_t_right">
            <div class="s_name">
              <span>{{basic.storeName}}</span>
            </div>
            <div class="store_info">
              <span>店长：--</span>
              <span class="version">产品版本: 基础版</span>
              <p>创建时间：{{store.gmtCreate}}</p>
              <p
                v-if="store.effectiveDate != null"
              >生效日期：{{store.effectiveDate}}~{{store.expiringDate}}</p>
              <p v-else>生效日期：--</p>
            </div>
            <div class="store-tab">
              <span :class="{ active:isActive}" @click="basicBtn">商户信息</span>
              <span :class="{ active:isActive1}" @click="identificBtn">版本信息</span>
            </div>
            <div class="store_information" v-if="isActive">
              <p class="sbutitle_c">
                <i></i>
                <span>基础信息</span>
              </p>
              <div class="Basic_box">
                <div class="Basic_list">
                  <p class="Basic_list_li basic_mr">
                    主营类目
                    <i>:</i>
                    <span>{{basic.catgoryName == null ?"--":basic.catgoryName}}</span>
                  </p>
                  <p class="Basic_list_li basic_mr">
                    开业日期
                    <i>:</i>
                    <span>{{basic.openingDate==null ?"--":basic.openingDate}}</span>
                  </p>
                  <p class="Basic_list_li">
                    商户区域
                    <i>:</i>
                    <span>{{basic.address==null ?"--":basic.address}}</span>
                  </p>
                </div>
                <div class="Basic_list">
                  <p class="Basic_list_li basic_mr">
                    详细地址
                    <i>:</i>
                    <span>{{basic.courseDesc==null ?"--":basic.courseDesc}}</span>
                  </p>
                  <p class="Basic_list_li basic_mr">
                    会员人数
                    <i>:</i>
                    <span>{{basic.fileName==null ?"--":basic.fileName}}</span>
                  </p>
                  <p class="Basic_list_li">
                    营业时间
                    <i>:</i>
                    <span>{{basic.openingEnd==null ?"--":basic.openingEnd}}</span>
                  </p>
                </div>
                <div class="Basic_list">
                  <p class="Basic_list_li basic_mr">
                    咨询电话
                    <i>:</i>
                    <span>{{basic.telephone==null ?"--":basic.telephone}}</span>
                  </p>
                </div>
                <div class="Basic_list">
                  <p class="Basic_list_desc">
                    商户介绍
                    <i>:</i>
                    <span>{{basic.storeDesc==null ?"--":basic.storeDesc}}</span>
                  </p>
                </div>
                <div class="Basic_list">
                  <p class="Basic_list_desc">
                    品牌介绍
                    <i>:</i>
                    <span>{{basic.brandDesc==null ?"--":basic.brandDesc}}</span>
                  </p>
                </div>
                <div class="Basic_list">
                  <p class="Basic_list_desc">
                    课程介绍
                    <i>:</i>
                    <span>{{basic.courseDesc==null ?"--":basic.courseDesc}}</span>
                  </p>
                </div>
              </div>
              <p class="sbutitle_c">
                <i></i>
                <span>认证信息</span>
              </p>
              <div class="authentication">
                <p style="margin-top:10px;">企业信息</p>
                <div class="authentication_list">
                  <p class="authentication_li authent_mr">
                    证件类型
                    <i>:</i>
                    <span>企业营业执照</span>
                  </p>
                  <p class="authentication_li authent_mr">
                    企业名称
                    <i>:</i>
                    <span>{{auth.enterpriseName==null ?"--":auth.enterpriseName}}</span>
                  </p>
                </div>
                <div class="authentication_list">
                  <p class="authentication_li authent_mr">
                    注册所在地
                    <i>:</i>
                    <span>{{auth.registerAddress==null ?"--":auth.registerAddress}}</span>
                  </p>
                  <p class="authentication_li authent_mr">
                    统一社会信用代码
                    <i>:</i>
                    <span>{{auth.enterpriseCode==null ?"--":auth.enterpriseCode}}</span>
                  </p>
                </div>
                <div class="authentication_list">
                  <p class="authentication_li authent_mr">
                    有效期限
                    <i>:</i>
                    <span>{{auth.vaildStart==null ?"--":auth.vaildStart}}</span>
                  </p>
                </div>
                <div class="authentication_list">
                  <div class="authentication_li1 authent_mr">
                    认证附件
                    <i>:</i>
                    <div>
                      <img
                        @mouseenter="mouseenter(auth.licensePath)"
                        v-if="auth.licensePath !=null"
                        :src="auth.licensePath"
                        alt
                      />
                      <el-image v-else>
                        <div slot="error" class="image-slot">
                          <i class="el-icon-picture-outline"></i>
                        </div>
                      </el-image>
                    </div>
                  </div>
                </div>
                <p style="margin-top:10px;">法定代表人信息</p>
                <div class="authentication_list">
                  <p class="authentication_li authent_mr">
                    法人姓名
                    <i>:</i>
                    <span>{{auth.corporation==null ?"--":auth.corporation}}</span>
                  </p>
                  <p class="authentication_li authent_mr">
                    身份证号
                    <i>:</i>
                    <span>{{auth.idcard==null ?"--":auth.idcard}}</span>
                  </p>
                  <p class="authentication_li">
                    身份证有效期
                    <i>:</i>
                    <span>{{auth.idcardValidDateS==null ?"--":auth.idcardValidDateS}}</span>
                  </p>
                </div>
                <div class="authentication_list">
                  <div class="authentication_li2 authent_mr">
                    身份证人像面
                    <i>:</i>
                    <div>
                      <img
                        @mouseenter="mouseenter(auth.idcardFrontPath)"
                        v-if="auth.idcardFrontPath !=null"
                        :src="auth.idcardFrontPath"
                        alt
                      />
                      <el-image v-else style=" margin-right: 129px;">
                        <div slot="error" class="image-slot">
                          <i class="el-icon-picture-outline"></i>
                        </div>
                      </el-image>
                    </div>
                  </div>
                  <div class="authentication_li2">
                    身份证国徽面
                    <i>:</i>
                    <div>
                      <img
                        @mouseenter="mouseenter(auth.idcardReversePath)"
                        v-if="auth.idcardReversePath !=null"
                        :src="auth.idcardReversePath"
                        alt
                      />
                      <el-image v-else>
                        <div slot="error" class="image-slot">
                          <i class="el-icon-picture-outline"></i>
                        </div>
                      </el-image>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 版本信息 -->
            <div class="authentication_information" v-else>
              <p>版本信息</p>
            </div>
          </div>
        </div>
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
</template>
<script>
import selfModal from "@/components/public/modul";
export default {
  data() {
    return {
      enlargeUrl: "",
      isActive: true,
      isActive1: false,
      storelnfo: null,
      storeId: null,
      store: null,
      basic: {
        version: null,
        gmtCreate: null,
        catgoryName: null,
        openingDate: null,
        address: null,
        courseDesc: null,
        fileName: null,
        openingEnd: null,
        telephone: null,
        storeDesc: null,
        logo: null,
        storeName: null
      },
      auth: {
        enterpriseName: null,
        registerAddress: null,
        enterpriseCode: null,
        idcardValidDateS: null,
        licensePath: null,
        corporation: null,
        idcard: null,
        idcardFrontPath: null,
        idcardReversePath: null
      },
      styleObj: {
        position: "fixed",
        bottom: 0,
        top: 0,
        left: 0,
        background: "rgba(113, 111, 111, 0.5)",
        width: "100%"
      }
    };
  },
  components: {
    selfModal
  },
  created() {
    this.storeId = JSON.parse(this.$route.query.id).id;
    this.store = JSON.parse(this.$route.query.id);
    this.getBasic(this.store);
    this.initDate();
    this.initAuthentiDate();
  },
  methods: {
    //鼠标移入图片
    mouseenter(val) {
      this.enlargeUrl = val;
      this.$refs.enlarge.showModal = true;
    },
    //鼠标移出事件
    mouseleave() {
      this.$refs.enlarge.showModal = false;
    },
    // 返回
    ReturnBack() {
      this.$router.go(-1);
    },
    // tab切换
    basicBtn() {
      this.isActive = true;
      this.isActive1 = false;
    },
    identificBtn() {
      this.isActive = false;
      this.isActive1 = true;
    },
    // 上一个页面传过来的赋值
    getBasic(s) {
      this.basic.storeName = s.storeName;
      this.basic.logo = s.logo;
      this.basic.version = s.versionName;
    },
    //基础请求
    initDate() {
      this.axios
        .get("/kidmanagement/store/queryStoreDetialById", {
          params: {
            time: Date.now(),
            id: this.storeId
          }
        })
        .then(resp => {
          if (resp.status == 200) {
            this.storelnfo = resp.data;
            console.log(12123, resp);
            this.showBasic(this.storelnfo);
          }
        });
    },
    // 基础信息赋值
    showBasic(s) {
      s.gmtCreate == null
        ? (this.basic.gmtCreate = "--")
        : (this.basic.gmtCreate = s.gmtCreate);
      this.basic.catgoryName = s.catgoryName;
      this.basic.openingDate = s.openingDate;
      this.basic.address = s.address;
      this.basic.courseDesc = s.courseDesc;
      this.basic.fileName = s.fileName;
      this.basic.openingEnd =
        s.openingEnd.slice(0, 5) + "-" + s.openingStart.slice(0, 5);
      this.basic.telephone = s.telephone;
      this.basic.courseDesc = s.courseDesc;
      this.basic.storeDesc = s.storeDesc;
      this.basic.brandDesc = s.brandDesc;
      // this.basic.logo = s.logo;
      // this.basic.storeName = s.storeName;
      console.log(1212, s);
    },
    //认证信息
    initAuthentiDate() {
      this.axios
        .get("/kidmanagement/store/authenticationInfo", {
          params: {
            time: Date.now(),
            id: this.storeId
          }
        })
        .then(resp => {
          if (resp.status == 200) {
            console.log(520, resp);
            this.showAuthent(resp.data.object);
          }
        });
    },
    showAuthent(s) {
      this.auth.enterpriseName = s.enterpriseName;
      this.auth.registerAddress = s.registerAddress;
      this.auth.enterpriseCode = s.enterpriseCode;
      this.auth.vaildStart = s.validStart + "~" + s.validEnd;
      this.auth.licensePath = s.licencePath;
      this.auth.corporation = s.corporation;
      this.auth.idcard = s.idcard;
      this.auth.idcardFrontPath = s.idcardFrontPath;
      this.auth.idcardReversePath = s.idcardReversePath;
      this.auth.idcard = s.idcard;
      this.auth.idcardValidDateS =
        s.idcardValidDateS + "-" + s.idcardValidDateE;
    }
  }
};
</script>

<style lang='less'>
.storeinfor {
  .el-image {
    i {
      font-size: 90px;
      color: #ccc;
    }
  }
  .s-infor-content {
    .ReturnBut {
      color: rgba(36, 119, 246, 1);
      margin-bottom: 10px;
      cursor: pointer;
      font-size: 14px;
    }
  }
  // 中间内容
  .s_info_title {
    display: flex;
  }
  .s_t_left {
    width: 55px;
    height: 55px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      box-shadow: 0px 2px 9px 1px rgba(40, 40, 47, 0.2)
    }
  }
  .s_t_right {
    width: 75%;
    padding-left: 15px;
    box-sizing: border-box;
    .s_name {
      font-size: 20px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      margin-top: 13px;
    }
    .store_info {
      margin-top: 20px;
      .version {
        margin-left: 100px;
      }
      p {
        margin-top: 15px;
      }
    }
    // tab切换
    .store-tab {
      width: 100%;
      border-bottom: 1px solid #d3d7e2;
      margin: -1px;
      margin-top: 15px;
      span {
        font-size: 14px;
        font-weight: 400;
        color: rgba(28, 36, 65, 1);
        margin-right: 60px;
        display: inline-block;
        padding-bottom: 5px;
        cursor: pointer;
      }
      .active {
        color: rgba(36, 119, 246, 1);
        border-bottom: 2px solid rgba(36, 119, 246, 1);
      }
    }
    // 小标题
    .sbutitle_c {
      display: flex;
      align-items: center;
      margin-top: 15px;
      i {
        width: 4px;
        height: 16px;
        display: inline-block;
        background: rgba(36, 119, 246, 1);
      }
      span {
        font-size: 14px;
        font-weight: 500;
        color: rgba(40, 40, 47, 1);
        margin-left: 5px;
        color: rgba(36, 119, 246, 1);
      }
    }
    // 基础信息
    .Basic_box {
      .Basic_list {
        color: #575968;
        margin-top: 15px;
        display: flex;
        .Basic_list_li {
          width: 350px;
          overflow: hidden;
          text-overflow: ellipsis;
          -o-text-overflow: ellipsis;
          white-space: nowrap;
        }
        .basic_mr {
          margin-right: 100px;
        }
        .Basic_list_desc {
          i {
            margin: 0 5px;
          }
          text-indent: -5.5em;
          margin-left: 5.5em;
          line-height: 30px;
        }
      }
    }
    // 认证信息
    .authentication {
      color: #575968;
      padding-bottom: 40px;
      box-sizing: border-box;
      .authentication_list {
        display: flex;
        margin-top: 15px;
        .authentication_li {
          width: 340px;
          overflow: hidden;
          text-overflow: ellipsis;
          -o-text-overflow: ellipsis;
          white-space: nowrap;
        }
        .authentication_li1 {
          display: flex;
          i {
            margin: 0 5px;
          }
          img {
            width: 113px;
            height: 135px;
            background: rgba(211, 215, 226, 1);
            margin-right: 10px;
          }
        }
        .authentication_li2 {
          display: flex;
          i {
            margin: 0 5px;
          }
          img {
            width: 205px;
            height: 135px;
            background: rgba(211, 215, 226, 1);
            margin-right: 22px;
          }
        }
        .authent_mr {
          margin-right: 65px;
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
