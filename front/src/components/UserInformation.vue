<template>
  <div class="wrapper">
    <!-- bg START -->
    <div class="bg"></div>
    <!-- bg END -->

    <!-- header START -->
    <header class="header">
      <div class="container">
        <div class="navbar">
          <div class="social-bar">
            <a href="" class="icon-btn">
              <i class="el-icon-s-home"></i>
            </a>
          </div>
          <div class="search">
            <el-input
              placeholder="請輸入內容"
              prefix-icon="el-icon-search"
              v-model="input2"
            >
            </el-input>
          </div>
          <div class="nav">
            <el-dropdown>
              <span class="el-dropdown-link">
                <el-avatar icon="el-icon-user-solid"></el-avatar>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  ><a href="/#/UserInformation">用戶資料</a></el-dropdown-item
                >
                <el-dropdown-item
                  ><a href="/#/CreateArticle">發表文章</a></el-dropdown-item
                >
                <el-dropdown-item
                  ><a href="/#/ArticleList">文章管理</a></el-dropdown-item
                >
                <el<el-dropdown-item
                  ><a href="/#/home" @click="logout()">登出 </a></el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </header>
    <!-- header END -->

    <!-- main START -->
    <section class="main">
      <div class="outter">
        <div class="box">
          <el-form :model="informations">
            <el-form-item label="username">
              <el-input disabled v-model="informations.username"></el-input>
            </el-form-item>
            <el-form-item label="name">
              <el-input v-model="informations.name"></el-input>
            </el-form-item>

            <el-form-item label="email">
              <el-input v-model="informations.email"></el-input>
            </el-form-item>
            <el-form-item label="sex">
              <el-input v-model="informations.sex"></el-input>
            </el-form-item>
            <el-form-item label="phone">
              <el-input v-model="informations.phone"></el-input>
            </el-form-item>

            <div class="fromButton">
              <el-form-item size="large">
                <el-button
                  type="warning"
                  @click="onSubmit, (centerDialogVisible = true)"
                  >修改密碼</el-button
                >
                <el-button type="primary" @click="updateInfo"
                  >修改資料</el-button
                >
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
    </section>
    <!-- main END -->
    <!-- Dialog START 對話框 -->

    <el-dialog
      title=""
      :visible.sync="centerDialogVisible"
      width="55%"
      center
      top="100px"
    >
      <!-- main start -->

      <el-form label-width="80px">
        <el-form-item label="舊密碼">
          <el-input
            placeholder="请输入密码"
            v-model="oldPassword"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="新密碼">
          <el-input
            placeholder="请输入密码"
            v-model="newPassword"
            show-password
          ></el-input>
        </el-form-item>

        <div class="fromButton">
          <el-form-item size="large" class="left55">
            <el-button type="primary" @click="updatePassword"
              >修改密碼</el-button
            >
            <el-button @click="centerDialogVisible = false">取消</el-button>
          </el-form-item>
        </div>
      </el-form>

      <!-- main end -->
    </el-dialog>
    <!-- Dialog END -->
  </div>
</template>

<script>
import axios from "axios";
// axios.defaults.withCredentials = true;
export default {
  created() {
    // 時間週期(開啟這個網頁的時候就執行)
    this.checkLogin();
    this.getUserInfo();
  },
  data() {
    return {
      replyText: "",
      currentIndex: 0,
      centerDialogVisible: false,
      oldPassword: "",
      newPassword: "",
      input2: "",
      informations: {
        id: "",
        name: "",
        username: "",
        email: "",
        sex: "",
        phone: "",
      },
    };
  },
  methods: {
    onSubmit() {},
    async getUserInfo() {
      const tokenStr = window.sessionStorage.getItem("token");
      // console.log(tokenStr);
      const { data: res } = await axios
        .get("https://forum1234.azurewebsites.net/api/UserInfo", {
          headers: {
            Authorization: "bearer " + tokenStr,
          },
        })
        .catch((error) =>
          this.$message({
            message: error,
            type: "warning",
          })
        );
      //console.log(res);
      this.informations = res;
    },
    async updateInfo() {
      const tokenStr = window.sessionStorage.getItem("token");
      const { res } = await axios
        .post(
          "https://forum1234.azurewebsites.net/api/UserInfo",
          {
            id: this.informations.id,
            Name: this.informations.name,
            Email: this.informations.email,
            Sex: this.informations.sex,
            Phone: this.informations.phone,
          },
          {
            headers: {
              Authorization: "bearer " + tokenStr,
            },
          }
        )
        .then((response) =>
          this.$message({
            message: "修改成功",
            type: "success",
          })
        )
        .catch((error) =>
          this.$message({
            message: error,
            type: "warning",
          })
        );
    },
    async updatePassword() {
      const tokenStr = window.sessionStorage.getItem("token");
      const { res } = await axios
        .post(
          "https://forum1234.azurewebsites.net/api/UpdateUserAccout",
          {
            oldPassword: this.oldPassword,
            newPassword: this.newPassword,
            username: this.informations.username,
          },
          {
            headers: {
              Authorization: "bearer " + tokenStr,
            },
          }
        )
        .then(
          (response) =>
            this.$message({
              message: "修改成功",
              type: "success",
            }),
          this.$router.push({ path: "/ArticleList" })
        )
        .catch((error) =>
          this.$message({
            message: error,
            type: "warning",
          })
        );
    },
    checkLogin() {
      const tokenStr = window.sessionStorage.getItem("token");
      if (tokenStr == null) this.$router.push({ path: "/login" });
    },
    logout() {
      window.sessionStorage.removeItem("token");
      this.$router.push({ path: "/home" });
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>
/* 消除浮動 */
.u-cf:after {
  content: "";
  display: block;
  clear: both;
  height: 0;
  visibility: hidden;
}
.bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background: linear-gradient(70deg, #4e4f95, #49c0b6);
  opacity: 0.6;
}
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  /* background-color: #fff; */
}
.navbar {
  padding: 8px;
  height: 60px;
  border: 2px solid #ebeef5;
  background: #6d6e70;
  border-radius: 5px;
  opacity: 0.6;
}
.container {
  width: 700px;
  margin: 0 auto;
}
.el-icon-s-home {
  font-size: 38px;
  color: #fff;
}
.social-bar {
  float: left;
}
.nav {
  float: right;
}
.search {
  float: left;
  margin-left: 9%;
  width: 70%;
}
.outter {
  width: 800px;
  background-color: #909399;
  /* display: flex; */
  height: 850px;
  margin: 80px auto;
  border-radius: 5px;
  padding: 2px;
}
.box {
  left: 1%;
  top: 10px;
  width: 98%;
  height: 98%;
  background-color: #fff;
  border-radius: 5px;
  padding: 30px 0;
}
.el-form-item {
  left: 10%;
  width: 80%;
  margin-top: 40px;
}
.fromButton {
  margin-top: 40px;
  left: 30%;
}
</style>
