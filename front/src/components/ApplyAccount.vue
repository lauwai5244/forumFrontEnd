<template>
  <div class="Apply_container">
    <div class="Apply_box">
      <!-- 表單 -->

      <el-form
        ref="ApplyFormRef"
        :model="ApplyForm"
        label-width="60px"
        class="Apply_from"
        :rules="rulesForm"
        label-position="top"
      >
        <!-- 賬號 -->
        <el-form-item prop="username" label="賬號">
          <el-input v-model="ApplyForm.username"></el-input>
        </el-form-item>

        <!-- 密碼 -->
        <el-form-item prop="password" label="密碼">
          <el-input v-model="ApplyForm.password" type="password"></el-input>
        </el-form-item>

        <!-- 驗證密碼 -->
        <el-form-item prop="verifyPassword" label="驗證密碼">
          <el-input
            v-model="ApplyForm.verifyPassword"
            type="password"
          ></el-input>
        </el-form-item>

        <!-- 按鈕 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="Apply"> 提交申請 </el-button>
          <el-button type="info" @click="querySort">返回登錄</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script >
import axios from "axios";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value !== this.ApplyForm.password) {
        callback(new Error("輸入的密碼不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 登錄表單的數據綁定對象
      ApplyForm: {
        username: "",
        password: "",
        verifyPassword: "",
      },
      // 登錄表單的驗證對象
      rulesForm: {
        username: [
          { required: true, message: "請輸入使用者賬號", trigger: "blur" },
          { min: 3, max: 15, message: "長度為3到15", trigger: "blur" },
        ],
        password: [
          { required: true, message: "請輸入使用者密碼", trigger: "blur" },
          { min: 3, max: 15, message: "長度為3到15", trigger: "blur" },
        ],
        verifyPassword: [
          { validator: validatePass, trigger: "blur" },
          { required: true, message: "請輸入驗證密碼", trigger: "blur" },
          { min: 3, max: 15, message: "長度為3到15", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    querySort() {
      this.$router.push({ path: "/login" });
    },
    doSomething(response) {
      console.log(response.data);
      this.querySort(),
        this.$message({
          message: "申請成功",
          type: "success",
        });
    },
    //  重置登錄表單
    resetApplyForm() {
      this.$refs.ApplyFormRef.resetFields();
    },
    Apply() {
      this.$refs.ApplyFormRef.validate((valid) => {
        if (!valid) return;
        else {
          // console.log(this.ApplyForm.username);
          // console.log(this.ApplyForm.password);
          axios
            .put("https://forum1234.azurewebsites.net/api/Users", {
              username: this.ApplyForm.username,
              password: this.ApplyForm.password,
            })
            .then((response) => this.doSomething(response))
            .catch((error) =>
              this.$message(
                {
                  message: "賬號重複",
                  type: "warning",
                },
                console.log(error)
              )
            );
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.Apply_container {
  background-image: linear-gradient(to top, #4f4f4f, #3d7878);

  height: 100vh;
  width: 100%;
}
.Apply_box {
  width: 600px;
  height: 500px;
  background-color: #fff;
  border-radius: 9px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 20px #303133;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
.Apply_from {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 90%;
  padding: 10px 60px;
  box-sizing: border-box;
}
</style>
