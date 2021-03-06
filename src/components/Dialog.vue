<template>
  <el-dialog
    v-model="dlgVisible"
    title="Add Todo"
    :width="dlgWidth"
    @closed="compileInterruptFn"
  >
    <div id="todo-form">
      <!-- content -->
      <el-row :gutter="10" align="middle" justify="center">
        <el-col :span="8" class="form-title">
          <span>内容:</span>
        </el-col>
        <el-col :span="8">
          <el-input
            v-model="todoForm.content"
            maxlength="10"
            minlength="1"
            show-word-limit
            placeholder=""
          ></el-input>
        </el-col>
      </el-row>
      <!-- importance -->
      <el-row :gutter="10" align="middle" justify="center">
        <el-col :span="8" class="form-title">
          <span>重要程度:</span>
        </el-col>
        <el-col :span="8">
          <el-rate v-model="todoForm.importance"></el-rate>
        </el-col>
      </el-row>
      <!-- done -->
      <el-row :gutter="10" align="middle" justify="center">
        <el-col :span="8" class="form-title">
          <span>完成:</span>
        </el-col>
        <el-col :span="8">
          <el-checkbox v-model="todoForm.done"></el-checkbox>
        </el-col>
      </el-row>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="compileInterruptFn">关闭</el-button>
        <el-button type="primary" @click="compileFinFn">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { computed, reactive, ref } from "vue";
import { inject } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "Dialog",
  setup(props, context) {
    const emitter = inject("emitter");

    const router = useRouter();
    const route = useRoute();

    let dlgVisible = ref(true);
    let dlgWidth = computed(() => {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {  // 移动
        return "90%"
      } else {  // PC
        return 450;
      }
    });

    let currentTodoId = ref("");
    let todoForm = reactive({
      content: "",
      importance: 5,
      done: false,
    });

    // 完成编辑
    let compileFinFn = function () {
      if (currentTodoId.value) {
        let editedTodo = { id: currentTodoId.value, ...todoForm };

        emitter.emit("editTodo", editedTodo);
      } else {
        let addedTodo = { ...todoForm };
        emitter.emit("addTodo", addedTodo);
      }

      router.replace({
        name: "index",
      });
    };

    // 中断/取消编辑
    let compileInterruptFn = function () {
      router.replace({
        name: "index",
      });
    };

    return {
      dlgWidth,
      dlgVisible,
      todoForm,
      currentTodoId,
      compileFinFn,
      compileInterruptFn,
      router,
      route,
    };
  },
  mounted() {
    if (this.route.name == "edit") {
      this.currentTodoId = this.route.params.id;
      JSON.parse(localStorage.getItem("todos")).forEach((todo) => {
        if (todo.id == this.currentTodoId) {
          this.todoForm.content = todo.content;
          this.todoForm.importance = todo.importance;
          this.todoForm.done = todo.done;
        }
      });
    }
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