<template>
  <el-dialog v-model="dlgVisible" title="Add Todo" :width="400">
    <div id="todo-form">
      <!-- content -->
      <el-row :gutter="10" align="middle" justify="center">
        <el-col :span="6" class="form-title">
          <span>content:</span>
        </el-col>
        <el-col :span="8">
          <el-input v-model="todoForm.content" placeholder=""></el-input>
        </el-col>
      </el-row>
      <!-- importance -->
      <el-row :gutter="10" align="middle" justify="center">
        <el-col :span="6" class="form-title">
          <span>importance:</span>
        </el-col>
        <el-col :span="8">
          <el-rate v-model="todoForm.importance"></el-rate>
        </el-col>
      </el-row>
      <!-- done -->
      <el-row :gutter="10" align="middle" justify="center">
        <el-col :span="6" class="form-title">
          <span>done:</span>
        </el-col>
        <el-col :span="8">
          <el-checkbox v-model="todoForm.done"></el-checkbox>
        </el-col>
      </el-row>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="changeDlgState(false)">Cancel</el-button>
        <el-button type="primary" @click="addTodo">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { reactive, ref } from "vue";

export default {
  name: "Dialog",
  setup(props, context) {
    let dlgVisible = ref(false);
    let todoForm = reactive({
      content: "",
      importance: 5,
      done: false,
    });

    let changeDlgState = function(boolVal) {
      dlgVisible.value = boolVal;
    }

    return {
      todoForm,
      changeDlgState
    };
  },
  mounted() {
    this.$bus.on('changeDlgState', changeDlgState);
  },
};
</script>

<style scoped>
#todo-form {
  --row-height: 40;
  width: 100%;
}

#todo-form .el-row {
  height: calc(var(--row-height) * 1px);
}

#todo-form .form-title {
  font-size: calc(var(--row-height) * 0.4px);
}
</style>