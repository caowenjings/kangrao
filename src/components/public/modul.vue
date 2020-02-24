<template>
    <section class="self-modal" v-show='showModal'  @click="cancelClick" v-bind:style="styleObj" @touchmove.stop.prevent>
      <!-- 自定义内容 -->
      <slot></slot>
    </section>
</template>
<script>
export default {
  name: 'selfModal',
  data () {
    return {
      showModal: false
    }
  },

  props: {
    styleObj: { // 用于承接样式类
      type: Object,
      default: function () {
        return {
          position: 'fixed',
          bottom: 0,
          top: 0,
          left: 0,
          right:0,
          width: '100%',
          background: 'rgba(113,111,111,0.5)'
        }
      }
    }
  },
  methods: {
    // 确定
    sureClick () {
      this.showModal = true
      return new Promise(function (resolve) {
        resolve('sure')
      }, function () {})
    },
    // 取消
    cancelClick () {
      this.showModal = false
      return new Promise(function (resolve) {
        resolve('cancel')
      }, function () {})
    }
  }
}
</script>
<style scoped lang='scss'>
.self-modal{
  z-index:200;
}
</style>
