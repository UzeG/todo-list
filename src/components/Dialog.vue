<template>
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
</template>

<script>
export default {};
</script>

<style>
</style>