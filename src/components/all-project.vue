<template>
  <div class="baseproject">
    <i
      :class="{ rotate: !arrow }"
      @click="Rotate"
      v-show="projects&&projects[0].id"
      class="iconfont icon-arrow-down"
      style="font-size: 12px"
    ></i>
    <i
      v-if="projects&&projects[0].id"
      class="iconfont icon-menu"
      style="margin: 0 10px"
    ></i>
    <i
      v-else
      class="iconfont icon-gengduo"
      style="font-size: 18px; margin-left: 20px; margin-right: 10px"
    ></i>
    <div class="span">{{ name }}</div>
    <div v-if="projects&&projects[0].id" class="span">({{ projects.length }})</div>
  </div>
  <ul
    :class="{ height: !arrow }"
    style="overflow: hidden"
    v-if="projects&&projects[0].id"
  >
    <li
      class="li"
      v-for="(item, index) in projects" :key="index"
      @click="router.push({ name: 'interface', params: { id: item.id } })"
    >
      {{ item.name }}
    </li>
  </ul>
  <ul v-else v-for="(item, index) in projects">
    <div v-if="item[0]" class="baseproject" style="background-color: #ffffff">
      <i
        v-if="item[0]"
        :class="{ rotate: !item[0].arrow }"
        @click="Rotate2(item)"
        class="iconfont icon-arrow-down"
        style="font-size: 12px"
      ></i>
      <i class="iconfont icon-menu" style="margin: 0 10px"></i>
      <div class="span" @click="console.log(typeof item)">
        {{ item[0].group }}
      </div>
      <div class="span">({{ panduanchangdu(item) }})</div>
      <!-- 添加接口 -->
      <span class="addBtn" @click="(createApi = true), newApi(item)">+</span>
    </div>
    <div
      v-if="item[0]"
      :class="{ height: !item[0].arrow }"
      style="overflow: hidden"
    >
      <li v-for="(items, indexs) in item" :key="items.id">
        <div class="li" @click="navchange(items)">
          {{ items.name }}
        </div>
      </li>
    </div>
  </ul>
  <!-- 添加接口 -->
  <el-dialog v-model="createApi" title="添加接口" width="60%">
    <div class="modify">
      <div class="a">
        <el-select v-model="data.method" class="method">
          <el-option
            v-for="item in methods"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-input v-model="data.url" class="url" />
        <el-button type="primary">保存</el-button>
        <el-button type="danger">删除</el-button>
      </div>
      <div class="label">接口名称</div>
      <el-input v-model="data.name" style="width: 60%"></el-input>
      <div class="label">说明</div>
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4 }"
        v-model="data.description"
        style="width: 60%"
      ></el-input>
      <div style="margin-top: 1rem">请求参数</div>
      <el-tabs
        v-model="activeName"
        class="params-tabs"
        @tab-click="handleClick"
      >
        <el-tab-pane label="Params" name="params">
          <params-table />
        </el-tab-pane>
        <el-tab-pane label="Body" name="body">
          <params-table />
        </el-tab-pane>
        <el-tab-pane label="Cookie" name="cookie">
          <params-table />
        </el-tab-pane>
        <el-tab-pane label="Header" name="header">
          <params-table />
        </el-tab-pane>
      </el-tabs>
      <div class="response">
        <span>返回响应</span>
        <el-tabs type="border-card">
          <el-tab-pane label="成功">
            <params-table></params-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="(createApi = false), (createApiOK = false)"
          >取消</el-button
        >
        <el-button type="primary" @click="createApiOK(), (createApi = false)">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
    
    <script setup>
import { ref, reactive, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import paramsTable from "../views/interfaces/components/measure/params-table.vue";
const props = defineProps({
  name: {
    type: String,
  },
  projects: {
    type: Array,
    default: [{
      id:'123'
    }],
  },
});
const router = useRouter();
const emits = defineEmits(["navchange","clickOK"]);

const navchange = (item) => {
  emits("navchange", item);
};

const methods = [
  {
    value: "GET",
    label: "GET",
  },
  {
    value: "POST",
    label: "POST",
  },
  {
    value: "PUT",
    label: "PUT",
  },
  {
    value: "PATCH",
    label: "PATCH",
  },
  {
    value: "DELETE",
    label: "DELETE",
  },
];

//新建接口的数据，绑定好
const data = reactive({
  group: '',
  name: "",
  method: '',
  url: "/dog",
  description: "接口描述",
});

//
const panduanchangdu=(item)=>{
  if(Reflect.has(item[0], 'name')){
    return item.length
  }else {
    return 0
  }

}


const createApi = ref(false);
const newApi = (item) => {
  data.group=item[0].group;
};
//发送请求后，清空数据
const clearGroup = () => {
  data.group = "";
  data.name = "";
  data.method = "";
  data.url = "";
  data.description = "";
};
//发送请求
const createApiOK = () => {
  console.log('data:',data);
  emits('clickOK',data)
  clearGroup();
  createApi.value = false;
};
defineExpose({
  createApi,
  data
})

//箭头展开和收缩
// true则为展开
const arrow = ref(true);
const Rotate = () => {
  arrow.value = !arrow.value;
  console.log(arrow.value);
};

const Rotate2 = (item) => {
  item[0].arrow = !item[0].arrow;
  console.log(item[0].arrow);
};
</script>
    
    <style scoped lang="less">
.baseproject {
  height: 30px;
  width: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-left: 10px;
  background-color: hsl(0, 0%, 95.1%);
  cursor: pointer;
  .addBtn {
    margin-left: auto;
    margin-right: 10px;
    font-size: 20px;
    color: #999999;
  }
}
.span {
  font-size: 12px;
}
.height {
  height: 0 !important;
  transition: 0.3 all;
}
.rotate {
  transform: rotate(90deg);
}
.li {
  height: 30px;
  font-size: 13px;
  line-height: 30px;
  width: 100%;
  padding-left: 60px;
  box-sizing: border-box;
  cursor: pointer;
  transition: 0.3s all;
}
.li:hover {
  background-color: hsl(0, 0%, 95.1%);
}

.modify {
  padding: 0 1rem;
  overflow: auto;
  .a {
    .method {
      width: 100px;
      background: rgb(248, 248, 248);
    }
    .url {
      width: 60%;
      height: 2rem;
      margin: 0 1rem;
    }
  }

  .label {
    margin: 0.5rem 0;
  }
  :deep(.el-tabs__nav) {
    margin-left: 0px;
  }
}
</style>