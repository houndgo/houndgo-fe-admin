<template>
  <div class="app-container">
    <el-form ref="form" :model="form"  v-loading="loading" :rules="rules" label-width="120px">
      <el-form-item label="用户名"  prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>

       <el-form-item label="密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>

      <el-form-item label="账户类型" prop="role">
        <el-select v-model="form.role" placeholder="账户类型">
          <el-option label="管理员" value="90"></el-option>
          <el-option label="新闻编辑" value="80"></el-option>
          <el-option label="用户认证编辑" value="70"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="个性签名" prop="signature">
        <el-input type="textarea" v-model="form.signature"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">创建</el-button>
        <el-button @click="onCancel">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { register } from '../../api/register'

export default {
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        role: '',
        signature: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
        ],
        role: [
          { required: true, message: '请选择账户类型', trigger: 'change' }
        ]
      },
      loading: false
    }
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.postRegist()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    postRegist() {
      this.loading = true
      register(this.form).then(response => {
        this.$message({
          message: '创建成功!',
          type: 'success'
        })
        this.loading = false
        this.resetForm()
      }).catch(() => {
        this.loading = false
      })
    },
    onCancel() {
      this.resetForm()
    },
    resetForm() {
      this.$refs['form'].resetFields()
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

