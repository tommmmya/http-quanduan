<script setup>
import { ref,reactive, onMounted } from 'vue'
import paramsTable from '../measure/params-table.vue'
import { updateApi } from '../../../../api/interface';
const props=defineProps({
    curapi:{
        type:Object
    }
})
const methods = [
  {
    value: 'GET',
    label: 'GET',
  },
  {
    value: 'POST',
    label: 'POST',
  },
  {
    value: 'PUT',
    label: 'PUT',
  },
  {
    value: 'PATCH',
    label: 'PATCH',
  },
  {
    value: 'DELETE',
    label: 'DELETE',
  },
]
const activeName=ref('params')
const updata=()=>{
  console.log('@@@curapiUpdata',props.curapi);
  const {_id,name,group,method,path,params,query,body,response}=props.curapi
  updateApi(_id,{name,group,method,path,params,query,body,response}).then(res=>{
    console.log('@@@res',res);
  })

}

</script>

<template>
  <div class="modify">
    <div class="a">
      <el-select v-model="curapi.method" class="method">
        <el-option
          v-for="item in methods"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-input
        v-model="curapi.path"
        class="url"
      />
      <el-button type="primary" @click="updata()">保存</el-button>
    </div>
    <input type="text" class="summary" v-model="curapi.summary" placeholder="接口描述">
    <el-row>
      <el-col :span="4" class="b">
        <div class="label">状态</div>
        <el-select v-model="curapi.state">
          <el-option label="开发中" value="开发中" />
          <el-option label="已完成" value="已完成" />
        </el-select>
      </el-col>
      <el-col :span="4" class="b">
        <div class="label">责任人</div>
        <el-select v-model="curapi.creator">
          <el-option label="张三" value="张三" />
          <el-option label="李四" value="李四" />
          <el-option label="王五" value="王五" />
        </el-select>
      </el-col>
      <el-col :span="4"  class="b" >
        <div class="label">标签</div>
        <el-select multiple v-model="curapi.tags">
          <el-option label="默认" value="默认" />
          <el-option label="dog" value="dog" />
          <el-option label="cat" value="cat" />
        </el-select>
      </el-col>
    </el-row>
    <div class="label">说明</div>
    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" v-model="curapi.description" style="width: 60%;"></el-input>
    <div style="margin-top: 1rem">请求参数</div>
      <el-tabs
        v-model="activeName"
        class="params-tabs"
        @tab-click="handleClick"
      >
        <el-tab-pane label="Params" name="params">
          <span>Query参数</span>
          <params-table :params="curapi.query" label="query" />
          <br />
          <span>params参数</span>
          <params-table :params="curapi.params" label="params" />
        </el-tab-pane>
        <el-tab-pane label="Body" name="body">
          <params-table :params="curapi.body" label="object" />
        </el-tab-pane>
      </el-tabs>
      <div class="response">
        <span style="margin-bottom: 10px; display: block">返回响应</span>
        <el-tabs type="border-card">
          <el-tab-pane label="成功">
            <params-table label="response" :params="curapi.response[0].body" />
          </el-tab-pane>
        </el-tabs>
      </div>
  </div>
</template>

<style scoped lang="less">
.modify {
  padding: 0 1rem;
  overflow: auto;
  .a {
    .method {
      width: 100px;
      background: rgb(248, 248, 248);
    }
    .url {
      width: 80%;
      height: 2rem;
      margin: 0 1rem;
    }
  }
  .summary {
    margin: 0.5rem 0;
    height: 2rem;
    width: 90%;
    font-size: 15px;
    outline: none;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  }
  .summary:focus {
    border-bottom: 1px solid #409eff;
  }
  .b {
    margin-right: 1rem;
  }
  .label {
    margin: 0.5rem 0;
  }
  :deep(.el-tabs__nav) {
    margin-left: 0px;
  }
  :deep(.el-tabs__item.is-top:nth-child(2)) {
    padding-left: 10px;
  }

}


</style>