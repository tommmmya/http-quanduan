<template>
 <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    
    <el-tab-pane label="信息" name="信息">






    </el-tab-pane>
    <el-tab-pane label="修改" name="修改">修改</el-tab-pane>
    <el-tab-pane label="测试" name="测试">测试</el-tab-pane>
   
  </el-tabs>
</template>

<script setup>
import { ref,reactive } from 'vue'
const activeName = ref("信息")

const handleClick = (tab,event ) => {
 
}
const props=defineProps({
    interface:{
        type:Object
    }
})
console.log(props.interface,2333);






</script>

<style scoped>
:deep(.el-tabs__nav){
margin-left:20px;
}
</style>