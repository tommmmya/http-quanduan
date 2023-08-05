<style scoped lang="less">

.icon-search{
position:absolute;
z-index:999;
margin-top:6px;
margin-left:15px;
}
.home{
    height:100%;
    display: flex;
    
}
.left-nav{
    height:100%;
    display: flex;
    flex-direction: column;
    width:91px;
    border-right: 1px solid #ededed;
}
.nav{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 13px 0;
    width:91px;
    background-color: rgba(51, 51, 51, 0.1);;
}
.span {
    margin-top: 2px;
    font-weight: bold;
    font-size: 12px;
}
.between {
    height:100%;
    width:239px;
    border-right:1px solid #ededed;
    
}
.input {
    display: flex;
    padding:10px;
    position: relative;
    border-bottom:1px solid #ededed ;
     align-items: center; 
}
.neirong {
    flex:1;
    .topbutton{
        padding:10px;
        border-bottom: 1px solid #ededed;
    }
}
.table {
    width:100%;
    cursor: pointer;
}
</style>


<template>
  <!-- 唐茂修改2023.8.5.12.52 -->
<div class="home">
    <!-- 左侧导航栏 -->
<aside class="left-nav">
<div class="nav">
    <i class="iconfont icon-xiangmu_xiangmuguanli" style="font-size:20px"></i>
    <div class="span">项目管理</div>
</div>
</aside>
<!-- 中间 -->
<div class="between"> 
<div class="input">
    <el-input
       v-model="sousuo"
        placeholder="搜索"
        style="width:180px;"
      />
      <i class="iconfont icon-icon_tianjia" style="font-size:22px;margin-left:10px;cursor: pointer;"></i>
</div>
<div class="allproject">
   <allProject name="所有项目" :projects="projects"></allProject>
</div>
</div>
<!-- 内容 -->
<div class="neirong">
 <!-- 顶部 -->
 <div class="topbutton">
 <el-button type="primary" size="default" @click="">创建新项目</el-button>
 <el-button  type="success" size="default" @click="">导入</el-button>
 </div>
 <div class="table">
    <el-table  stripe :data="projects" @row-click="projectClick" >
    <el-table-column prop="name" label="名称" width="140" />
    <el-table-column prop="time" label="时间"  />
    <el-table-column prop="describe" label="介绍" />
    <el-table-column label="操作" >
        <template #default="scope">
 <el-dropdown>
    <i class="iconfont icon-gengduo" style="font-size:25px;cursor: pointer;"></i>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>查看项目信息</el-dropdown-item>
        <el-dropdown-item>修改信息</el-dropdown-item>
        <el-dropdown-item>设置成员权限</el-dropdown-item>
        <el-dropdown-item @click="Delete(scope)">删除</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
      </template>

    </el-table-column>
  </el-table>
</div>


</div>
</div>
</template>

<script setup>
import { ref,reactive } from 'vue'
import allProject from '../../components/all-project.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router';
const sousuo=ref('')

const router=useRouter()

const projects=ref([{
    id:'1000001',
    name:"项目1",
    time:"2023:8:3:14.07",
    describe:"1.0.0"
},
{
    id:'1000002',
    name:"项目2",  
    time:"2023:8:3:14.07",
    describe:"1.0.0"
},
{
    id:'1000003',
    name:"项目3",   
    time:"2023:8:3:14.07",
    describe:"1.0.0"
}])
const projectClick=(row)=>{
    
    router.push({name:'interface',params:{id:row.id}})
}
//删除
const Delete=(scope)=>{
    ElMessageBox.confirm(
    '确定删除该项目？',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
      projects.value.splice(scope.$index,1)
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })

}
</script>

