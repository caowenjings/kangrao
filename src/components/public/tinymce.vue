<template>
  <div class="tinymce-editor">
    <editor v-model="myValue"
            :init="init"
            ref = 'con'
            :disabled="disabled"
            @onClick="onClick">
      <br/>
    </editor>
    <!--<div v-html="myValue">-->
    <!--</div> -->
  </div>
</template>

<script>

  import tinymce from 'tinymce/tinymce'
  import Editor from '@tinymce/tinymce-vue'
  import 'tinymce/themes/silver'
  // 编辑器插件plugins
  // 更多插件参考：https://www.tiny.cloud/docs/plugins/
  import 'tinymce/plugins/image'// 插入上传图片插件
  // import 'tinymce/plugins/media'// 插入视频插件
  import 'tinymce/plugins/table'// 插入表格插件
  import 'tinymce/plugins/lists'// 列表插件
  import 'tinymce/plugins/wordcount'// 字数统计插件
  import axios from 'axios'

  export default {
    name: "tinymce",
    components: {
      Editor
    },
    props: {
      value: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      plugins: {
        type: [String, Array],
        default: 'lists image table wordcount'
      },
      toolbar: {
        type: [String, Array],
        default: 'undo redo |  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat'
      },
      charsetLength:{
        type: Number,
        default: 500
      },
      url: {
        default: 'https://shop.kiidcloud.com/platform/systemManagement/uploadImgForText',
        type: String
      },
      accept: {
        default: 'image/jpeg, image/png',
        type: String
      },
      maxSize: {
        default: 2097152,
        type: Number
      },
      withCredentials: {
        default: false,
        type: Boolean
      }
    },
    data() {
      return {
        init: {
          language_url: '../../static/tinymce/zh_CN.js',
          language: 'zh_CN',
          skin_url: '../../static/tinymce/skins/ui/oxide',
          // skin_url: '/tinymce/skins/ui/oxide',//暗色系
          height: 350,
          plugins: this.plugins,
          toolbar: this.toolbar,
          branding: true,//是否禁用“Powered by TinyMCE”
          menubar: false,//顶部菜单栏显示
          // 图片上传
          images_upload_handler: function (blobInfo, success, failure) {
            if (blobInfo.blob().size > self.maxSize) {
              failure('文件体积过大')
            }
            const isJPG = blobInfo.blob().type === 'image/jpeg'|| blobInfo.blob().type  === 'image/png'
              || blobInfo.blob().type  === 'image/bmp' ||blobInfo.blob().type  === 'image/jpg';
            if (!isJPG) {
              failure('图片格式错误')
              return false
            }
            uploadPic()
            function uploadPic (file) {
              console.log(file)
              let formData = new FormData()
              // 服务端接收文件的参数名，文件数据，文件名
              formData.append('file', blobInfo.blob(), blobInfo.filename())
              axios({
                method: 'POST',
                // 这里是你的上传地址
                url: 'https://shop.kiidcloud.com/platform/systemManagement/uploadImgForText',
                data: formData,
              })
                .then((res) => {
                  success(res.data.object)
                })
                .catch(() => {
                  failure('上传失败')
                })
            }
          },
          max_chars :"10",
          autoresize_bottom_margin: 50,  autoresize_max_height: 500,  autoresize_min_height: 350,  autoresize_on_init: true,  autoresize_overflow_padding: 50,
          max_chars_indicator :"lengthBox",
        },
        myValue: this.value,
        lengthInput:'',
        charsetInputLength: false,
        tinymceInputChat:''
      }
    },
    mounted() {
      tinymce.init({})
    },
    methods: {
      // 添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
      // 需要什么事件可以自己增加
      onClick(e) {
        this.$emit('onClick', e, tinymce)
        /*
         * @param str
         * @param charset  charset utf-8, utf-16
         * @returns {number}
         */
        let sizeof = function(str, charset){
          var total = 0,
            charCode,
            i,
            len;
          charset = charset ? charset.toLowerCase() : '';
          if(charset === 'utf-16' || charset === 'utf16'){
            for(i = 0, len = str.length; i < len; i++){
              charCode = str.charCodeAt(i);
              if(charCode <= 0xffff){
                total += 2;
              }else{
                total += 4;
              }
            }
          }else{
            for(i = 0, len = str.length; i < len; i++){
              charCode = str.charCodeAt(i);
              if(charCode <= 0x007f) {
                total += 1;
              }else if(charCode <= 0x07ff){
                total += 2;
              }else if(charCode <= 0xffff){
                total += 3;
              }else{
                total += 4;
              }
            }
          }
          return total;
        }
        let tinymceData  = sizeof( this.myValue,'utf-8')  / 1024/1024 > 21;
        if(tinymceData){
          this.$message({
            message: "输入过内容过多，请修改",
            type: "error",
            center: true,
            duration: 800
          });
        }
        this.$nextTick(()=>{
          //dom元素更新后执行，此时能拿到p元素的属性
          // this.message = this.$refs.myWidth.offsetWidth;
        })
      },
      // 可以添加一些自己的自定义事件，如清空内容
      clear() {
        this.myValue = ''
      }
    },
    watch: {
      value(newValue) {
        this.myValue = newValue;
        var reg = /[\u4e00-\u9fa5]/g;
        if(this.myValue.length > 100){
          this.tinymceInputChat =   this.myValue.match(reg).join("").length
        }
        this.$emit('inputContent', this.tinymceInputChat)
      },
      myValue(newValue) {
        this.$emit('input', newValue)
      },
    }
  }
</script>

<style scoped>
  /deep/ .tox-statusbar__branding{
    display: none;
  }
  .tinymce-editor{
    min-height: 50px;
  }
  #tinymce{
    min-height: 50px;
  }
  .tox-editor-container{
    min-height: 50px;
  }
</style>
<style>
  .tox-statusbar__resize-handle{
    display: none !important;
  }
</style>
