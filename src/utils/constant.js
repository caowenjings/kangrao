//场地类型
// const url="http://192.168.1.10:8080/";
const url="http://149.129.92.14:8080/";
const url1="http://149.129.92.14:3000/";
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
  // 性别
  const Gender= [
    {value: "1",label: "男"},
    {value: "0",label: "女"}
  ]; 
  // 会员关系
  const MemberRelation=[
    {value: "1",label: "父亲"},
    {value: "2",label: "母亲"},
    { value: "3",label: "爷爷"},
    {value: "4",label: "奶奶"},
    {value: "100",label: "其他"}
  ]; 
  // 已婚未婚
  const Marriage =[
    { value: "1", label: "已婚" },
    { value: "0", label: "未婚" }
  ];
  // 联系人关系
  const ContactRel= [
    { value: "1", label: "紧急联系人" },
    { value: "2", label: "日常联系人" },
    { value: "100", label: "其他" }
  ];
  // 学历
  const Education= [
    { value: "1", label: "高中" },
    { value: "2", label: "专科" },
    { value: "3", label: "本科" },
    { value: "4", label: "硕士" },
    { value: "5", label: "博士" }
  ];
  // 离职在职
  const  Employeesstate= [
    { value: "1", label: "在职" },
    { value: "0", label: "离职" }
  ];
  const  Employeesstate1= [
    { value: "1", label: "在职" },
    { value: "2", label: "离职" }
  ];

export default{
    url,
    url1,
    spaceType,
    openCourse,
    Gender,
    MemberRelation,
    Marriage,
    ContactRel,
    Education,
    Employeesstate,
    Employeesstate1
}