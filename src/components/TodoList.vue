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
          <el-row :gutter="10" justify="center">
            <el-col :span="2">
              <el-button type="primary" @click="dialog.visible = true"
                >添加新事项</el-button
              >
            </el-col>
          </el-row>

          <el-dialog v-model="dialog.visible" title="Add Todo" width="30%">
            <div id="todo-form">
              <!-- content -->
              <el-row :gutter="10" align="middle" justify="center">
                <el-col :span="6" class="form-title">
                  <span>content:</span>
                </el-col>
                <el-col :span="8">
                  <el-input v-model="dialog.content" placeholder=""></el-input>
                </el-col>
              </el-row>
              <!-- importance -->
              <el-row :gutter="10" align="middle" justify="center">
                <el-col :span="6" class="form-title">
                  <span>importance:</span>
                </el-col>
                <el-col :span="8">
                  <el-rate v-model="dialog.importance"></el-rate>
                </el-col>
              </el-row>
              <!-- done -->
              <el-row :gutter="10" align="middle" justify="center">
                <el-col :span="6" class="form-title">
                  <span>done:</span>
                </el-col>
                <el-col :span="8">
                  <el-checkbox v-model="dialog.done"></el-checkbox>
                </el-col>
              </el-row>
            </div>

            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialog.visible = false">Cancel</el-button>
                <el-button type="primary" @click="addTodo">Confirm</el-button>
              </span>
            </template>
          </el-dialog>
        </div>

        <div id="list">
          <el-row
            :gutter="20"
            v-for="todo of todos"
            :key="todo.id"
            justify="center"
          >
            <el-col :span="1" class="done-checkbox-col">
              <el-checkbox @change="changeDone(todo.id)" v-model="todo.done"></el-checkbox>
            </el-col>
            <el-col :span="3">
              {{ todo.content }}
            </el-col>
            <el-col :span="4">
              <el-rate v-model="todo.importance" disabled></el-rate>
            </el-col>
            <!-- <el-col :span="1.5">
              <el-button type="success" plain @click="dialog.visible = true">edit</el-button>
            </el-col> -->
            <el-col :span="1.5" class="delete-button-col">
              <el-popconfirm
                title="Are you sure to delete this?"
                @confirm="deleteTodo(todo.id)"
              >
                <template #reference>
                  <el-button type="warning" plain>Delete</el-button>
                </template>
              </el-popconfirm>
            </el-col>
          </el-row>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { nanoid } from "nanoid";

export default {
  name: "TodoList",
  setup(props, context) {
    let dialog = reactive({
      visible: false,
      content: "",
      importance: 5,
      done: false,
    });

    let todos = ref(JSON.parse(localStorage.getItem('todos')) || []);

    let deleteTodo = function (id) {
      todos.value = todos.value.filter((todo) => todo.id !== id);

      updateLocalTodos();
    };

    let addTodo = function () {
      todos.value.push({
        id: nanoid(),
        content: dialog.content,
        importance: dialog.importance,
        done: dialog.done,
      });

      initTodoForm();
      dialog.visible = false;
      
      updateLocalTodos();
    };

    let changeDone = function(id) {
      updateLocalTodos();
    }

    let initTodoForm = function() {
      dialog.content = '';
      dialog.importance = 5;
      dialog.done = false;
    }

    let updateLocalTodos = function () {
      localStorage.setItem('todos', JSON.stringify(todos.value));
    }

    return {
      todos,
      deleteTodo,
      dialog,
      addTodo,
      changeDone
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

#list .el-row:not(:last-child) {
  margin-bottom: calc(var(--todo-height) * 0.4px);
}

#list .el-col {
  /* border: 1px solid red; */
  overflow: hidden;
}

#list .done-checkbox-col {
  text-align: center;
}

#list .delete-button-col {
  text-align: center;
}

/* #list .delete-button-col button {
  display: none;
}

#list .el-row:hover button {
  display: inline;
} */

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
