<template>
  <div id="main-container">
    <el-container>
      <el-header>
        <el-row :gutter="10" justify="center">
          <el-col id="todo-title">Todo List</el-col>
        </el-row>
      </el-header>

      <el-main>
        <div id="addIpt">
          <el-row :gutter="10" justify="center" align="middle">
            <el-col :span="1.6">
              <el-button type="primary" @click="addBtn"
                >添加新事项</el-button
              >
            </el-col>
          </el-row>
        </div>

        <div id="list">
          <el-row
            :gutter="20"
            v-for="todo of todos"
            :key="todo.id"
            justify="center"
          >
            <el-col :span="1" class="todo-done">
              <el-checkbox
                @change="changeDone(todo.id)"
                v-model="todo.done"
              ></el-checkbox>
            </el-col>
            <el-col :span="3" class="todo-content">
              {{ todo.content }}
            </el-col>
            <el-col :span="4" class="todo-importance">
              <el-rate v-model="todo.importance" disabled></el-rate>
            </el-col>
            <el-col :span="1.5">
              <el-button type="success" plain @click="editBtn(todo)"
                >编辑</el-button
              >
            </el-col>
            <el-col :span="1.5" class="todo-delete">
              <el-popconfirm
                title="确认删除该项？"
                @confirm="deleteTodo(todo.id)"
                confirm-button-text="是"
                cancel-button-text="否"
              >
                <template #reference>
                  <el-button type="warning" plain>删除</el-button>
                </template>
              </el-popconfirm>
            </el-col>
          </el-row>
        </div>
      </el-main>
    </el-container>

    <!-- 表单对话框 -->
    <router-view></router-view>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { inject } from "vue";
import { nanoid } from "nanoid";
import router from "../router";

export default {
  name: "TodoList",
  setup(props, context) {
    const emitter = inject("emitter");

    let dialog = reactive({
      visible: false,
      content: "",
      importance: 5,
      done: false,
    });

    let todos = ref(JSON.parse(localStorage.getItem("todos")) || []);

    // 删除
    let deleteTodo = function (id) {
      todos.value = todos.value.filter((todo) => todo.id !== id);

      updateLocalTodos();
    };

    // 添加
    let addTodo = function (targetTodo) {
      todos.value.push({id: nanoid(), ...targetTodo});

      dialog.visible = false;

      updateLocalTodos();
    };
    emitter.on("addTodo", addTodo);

    // 编辑
    let editTodo = function (targetTodo) {
      // 更新todos
      for (const index in todos.value) {
        if (todos.value[index].id == targetTodo.id) {
          todos.value[index] = targetTodo;
          break;
        }
      }
      // 更新本地存储
      updateLocalTodos();
    };
    emitter.on("editTodo", editTodo);

    // 改变完成状态
    let changeDone = function (id) {
      updateLocalTodos();
    };

    // 清空表单数据
    let initTodoForm = function () {
      dialog.content = "";
      dialog.importance = 5;
      dialog.done = false;
    };

    // 更新本地存储
    let updateLocalTodos = function () {
      localStorage.setItem("todos", JSON.stringify(todos.value));
    };

    // 添加按钮回调
    let addBtn = function () {
      router.push({
        name: "add",
      });
    };
    // 编辑按钮回调
    let editBtn = function (targetTodo) {
      router.push({
        name: "edit",
        params: {
          id: targetTodo.id,
        },
      });
    };

    return {
      todos,
      deleteTodo,
      dialog,
      changeDone,
      addBtn,
      editBtn,
    };
  },
};
</script>

<style scoped>
#main-container {
  --header-height: 80;
  /* font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif; */
}

.el-header {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  text-align: center;
  height: calc(var(--header-height) * 1px);
  line-height: calc(var(--header-height) * 1px);
}

.el-main {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

#list {
  --todo-height: 40;
}

#todo-title {
  font-size: calc(var(--header-height) * 0.4px);
  font-weight: bolder;
  text-shadow: rgba(0, 0, 0, 0.12) 3px 3px 1px;
}
#list .el-row {
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04); */
}

#list .el-row .el-col {
  height: calc(var(--todo-height) * 1px);
  line-height: calc(var(--todo-height) * 1px);
  background-color: aliceblue;
}

#list .el-row .el-col:nth-child(1) {
  border-radius: 10px 0px 0px 10px;
}
#list .el-row .el-col:last-child {
  border-radius: 0px 10px 10px 0px;
}

#list .el-row:not(:last-child) {
  margin-bottom: calc(var(--todo-height) * 0.4px);
}

#list .el-col {
  /* border: 1px solid red; */
  overflow: hidden;
}

/*  */
#list .todo-done {
  text-align: center;
  min-width: 40px;
}

#list .todo-content {
  overflow: auto;
  min-width: 100px;
  font-size: 14px;
  color: #555;
  text-shadow: #555 0px 0px 0px;
}

#list .todo-importance {
  min-width: 130px;
}

#list .todo-delete {
  text-align: center;
  min-width: 80px;
}
/*  */

#list .todo-delete button {
}

/* <----- DIALOG -----> */
#addIpt .el-row:nth-child(1) {
  margin-bottom: 15px;
}

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
