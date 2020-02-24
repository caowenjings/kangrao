<template>
  <div class="storeinfor">
    <div class="s-infor-content">
      <div class="s-infor-box">
        <p class="ReturnBut" @click="ReturnBack">
          <i class="iconfont icon-fanhui" style="width:14px;height:13px;color:#2477F6"></i>
          <span>返回</span>
        </p>
        <p class="s-infor-title">{{storelnfo.storeName}}</p>
        <div class="s-infor-tab">
          <span :class="{ active:isActive}" @click="basicBtn">基本信息</span>
          <!-- <span :class="{ active:isActive1}" @click="identificBtn">认证信息</span> -->
        </div>
        <div class="s-infor-box">
          <div class="s-infor-list" style="margin-top: 10px;">
            <p>
              主营类目
              <i>:</i>
              {{storelnfo.catgoryName}}
            </p>
          </div>
          <div class="s-infor-list">
            <p>
              学员人数
              <i>:</i>
              {{storelnfo.fileName==null ? storelnfo.fileName="--":storelnfo.fileName}}
            </p>
          </div>
          <div class="s-infor-list">
            <p>
              开业日期
              <i>:</i>
              {{storelnfo.openingDate ==null ? storelnfo.openingDate="--":storelnfo.openingDate}}
            </p>
          </div>
          <div class="s-infor-list">
            <p>
              营业时间
              <i>:</i>
              {{storelnfo.openingStart ==null ? storelnfo.openingStart="--":storelnfo.openingStart}}
            </p>
          </div>
          <div class="s-infor-list">
            <p>
              商户位置
              <i>:</i>
              {{storelnfo.address ==null || storelnfo.address =="" ? storelnfo.address="--":storelnfo.address}}
            </p>
          </div>
          <div class="s-infor-list">
            <p>
              咨询电话
              <i>:</i>
              {{storelnfo.telephone ==null ? storelnfo.telephone ="--":storelnfo.telephone}}
            </p>
          </div>
          <div class="s-infor-list">
            <p>
              商户介绍
              <i>:</i>
              {{storelnfo.storeDesc ==null ? storelnfo.storeDesc="--":storelnfo.storeDesc}}
            </p>
          </div>
          <div class="s-infor-list">
            <p>
              品牌介绍
              <i>:</i>
              {{storelnfo.brandDesc ==null ? storelnfo.brandDesc="--":storelnfo.brandDesc}}
            </p>
          </div>
          <div class="s-infor-list">
            <p>
              课程介绍
              <i>:</i>
              {{storelnfo.courseDesc ==null ? storelnfo.courseDesc="--":storelnfo.courseDesc}}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: true,
      isActive1: false,
      storelnfo: {}
    };
  },
  methods: {
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
    //请求
    initDate() {
      let storeId = this.$route.query.num.id;
      this.axios
        .get("/kidmanagement/store/queryStoreDetialById", {
          params: {
            time: Date.now(),
            id: storeId
          }
        })
        .then(resp => {
          if (resp.status == 200) {
            this.storelnfo = resp.data;
            this.storelnfo.openingDate = this.storelnfo.openingDate.slice(
              0,
              10
            );
            this.storelnfo.openingStart =
              this.storelnfo.openingStart.slice(0, 5) +
              "--" +
              this.storelnfo.openingEnd.slice(0, 5);
          }
        });
    }
  },
  created() {
    this.initDate();
  }
};
</script>

<style lang='less'>
.storeinfor {
  .s-infor-content {
    .ReturnBut {
      color: rgba(36, 119, 246, 1);
      margin-bottom: 10px;
      cursor: pointer;
      font-size: 14px;
    }
    .s-infor-title {
      font-size: 16px;
      font-weight: 500;
      color: rgba(28, 36, 65, 1);
      margin-bottom: 12px;
    }
    .s-infor-tab {
      border-bottom: 1px solid rgba(195, 199, 208, 1);
      margin-bottom: -1px;
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
    .s-infor-box {
      .s-infor-list {
        font-size: 14px;
        i {
          margin: 0 5px;
        }
      }
      .s-infor-list p {
        text-indent: -4.5em;
        margin-left: 4.5em;
        line-height: 30px;
        color: #575968;
      }
    }
  }
}
</style>
