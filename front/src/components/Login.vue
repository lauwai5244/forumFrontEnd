<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 頭像 -->
      <div class="avatar_box">
        <img src="../assets/img/test.jpg" alt="" />
      </div>
      <!-- 表單 -->

      <el-form
        ref="loginFormRef"
        :model="loginForm"
        label-width="0px"
        class="login_from"
        :rules="rulesForm"
      >
        <!-- 賬號 -->
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user"
            v-model="loginForm.username"
          ></el-input>
        </el-form-item>

        <!-- 密碼 -->
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            v-model="loginForm.password"
            type="password"
            @keyup.native.enter="login"
          ></el-input>
        </el-form-item>

        <!-- 按鈕 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login"> 登錄 </el-button>
          <el-button type="info" @click="querySort">申請賬號</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      // 登錄表單的數據綁定對象
      loginForm: {
        username: "",
        password: "",
      },
      // 登錄表單的驗證對象
      rulesForm: {
        username: [
          { required: true, message: "請輸入使用者賬號", trigger: "blur" },
          { min: 3, max: 15, message: "長度為3到15", trigger: "blur" },
        ],
        password: [
          { required: true, message: "請輸使用者入密碼", trigger: "blur" },
          { min: 3, max: 15, message: "長度為3到15", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    doSomething(response) {
      //console.log(response.data);
      sessionStorage["token"] = response.data;
      this.$message({
        message: "登入成功",
        type: "success",
      });
      this.$router.push({ path: "/Home" });
    },

    querySort() {
      this.$router.push({ path: "/Apply" });
    },
    //  重置登錄表單
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$refs.loginFormRef.validate((valid) => {
        if (!valid) return;
        else {
          //console.log(this.loginForm.username);
          //console.log(this.loginForm.password);

          axios
            .post("https://forum1234.azurewebsites.net/api/Users", {
              username: this.loginForm.username,
              password: this.loginForm.password,
            })
            .then((response) => this.doSomething(response))
            .catch((error) =>
              this.$message({
                message: "賬號或密碼錯誤",
                type: "warning",
              })
            );
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  background-image: linear-gradient(to top, #4f4f4f, #3d7878);
  height: 100vh;
  width: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 9px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 20px #303133;
}
.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #c0c4cc;
  position: relative;
  background: #fff;
  left: 50%;
  transform: translate(-50%, -50%);
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #eee;
  }
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.login_from {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 68%;
  padding: 0 60px;
  box-sizing: border-box;
}
</style>
