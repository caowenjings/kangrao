//场地类型
const spaceType=[
    { value: "1", label: "教室" },
    { value: "2", label: "场馆" },
    { value: "3", label: "户外" },
    { value: "100", label: "其他" }
  ];
 const openCourse=[
    { value: "1", label: "demo" },
    { value: "2", label: "常规" },
    { value: "100", label: "其他" }
  ]; 
  const Gender= [
    {value: "1",label: "男"},
    {value: "0",label: "女"}
  ]; 
  const MemberRelation=[
    {value: "1",label: "父亲"},
    {value: "2",label: "母亲"},
    { value: "3",label: "爷爷"},
    {value: "4",label: "奶奶"},
    {value: "100",label: "其他"}
  ]; 
export default{
    spaceType,
    openCourse,
    Gender,
    MemberRelation,
    //格式化日期
    formatData:function(time){
        if (time == null) {
        return;
        }
        let date = new Date(Number(time));
        Date.prototype.Format = function(fmt) {
        var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds()
        };
        if (/(y+)/.test(fmt))
        fmt = fmt.replace(
        RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
        for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1
        ? o[k]
        : ("00" + o[k]).substr(("" + o[k]).length)
        );
        return fmt;
        };
        date.Format("yyyy-MM-dd hh:mm:ss");
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        let hour = date.getHours();
        let minu = date.getMinutes();
        month += 1;
        if (month < 10) {
        month = "0" + month;
        }
        if (day < 10) {
        day = "0" + day;
        }
        let text = '';
        if(hour < 10){
        hour = "0" + hour
        }else if( hour < 13 || hour == 0){
        text = 'am';
        }else if(hour >= 13){
        text = 'pm';
        }
        if(minu < 10){
        minu = "0" + minu;
        }
        return year + "-" + month + "-" + day + " " + hour + ":" + minu + " " + text;
    },
    //手机号正则
    phoneNumReg:function(phone){
      var reg=11 && /^1(3|4|5|7|8)\d{9}$/;
      if(!reg.test(phone)){
        return false;
      }else{
        return true;
      }
    },
    //身份证号正则
    IDNumReg:function(value){
        if (value && (!(/\d{17}[\d|x]|\d{15}/).test(value) || (value.length !== 15 && value.length !== 18))){
            return false;
        }else{
            return true;
        }
    },
     //权限数组判定
    //  hasId(id){
    //   let powerlist=JSON.parse(localStorage.getItem('btnInfor'));
    //   powerlist=powerlist.filter(curr=>curr.id==id)
    //   if(powerlist.length!=0){
    //     return true;
    //   }else{
    //     return false;
    //   }
    // },
    hasId(id){
      let powerlist=JSON.parse(localStorage.getItem('btnInfor'));
      powerlist=powerlist.filter(curr=>curr.menuCode==id)
      if(powerlist.length!=0){
        return true;
      }else{
        return false;
      }
    },
    // 转年龄
    GetAge(str){
        var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
        if (r == null) return false;
        var d = new Date(r[1], r[3] - 1, r[4]);
        if (
          d.getFullYear() == r[1] &&
          d.getMonth() + 1 == r[3] &&
          d.getDate() == r[4]
        ) {
          var Y = new Date().getFullYear();
          return Y - r[1] + "岁";
        }
      },
      visibleChange(isVisible) {
        const isEdge = window.navigator.userAgent.includes('Edge');
        if (isEdge && !isVisible) {
            document
                .querySelectorAll('body > .el-select-dropdown.el-popper')
                .forEach((it) => it.remove())
        }
    }
}