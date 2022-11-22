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
              @keyup.enter.native="getArticleFromWord()"
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
                <el-dropdown-item><a href="/#/Login">登入</a></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </header>
    <!-- header END -->
    <!-- vetur.validation.template -->
    <!-- main START -->
    <section class="main">
      <div class="outter">
        <!-- <div class="box1"></div> -->
        <div v-for="(text, index) in texts" class="box">
          <div class="user">
            <el-avatar
              shape="square"
              :size="20"
              :src="squareUrl"
              class="icon"
            ></el-avatar>
            <!-- {{ text.user }} -->
          </div>

          <el-button
            type="text"
            @click="(centerDialogVisible = true), getIndex(index)"
            class="title"
            ><p class="ellipsis1">{{ text.title }}</p></el-button
          >

          <div class="content">
            <p class="ellipsis1">{{ text.text }}</p>
          </div>
        </div>
      </div>
    </section>
    <!-- main END -->

    <!-- Dialog START 對話框 -->

    <el-dialog
      :visible.sync="centerDialogVisible"
      width="65%"
      center
      top="-10px"
    >
      <!-- main start -->
      <div class="user dialog_user">
        <el-avatar
          shape="square"
          :size="30"
          :src="squareUrl"
          class="icon"
        ></el-avatar>
        <!-- {{ this.texts[this.currentIndex].user }} -->
      </div>
      <div class="title dialog_title">
        <p>{{ this.texts[this.currentIndex].title }}</p>
      </div>
      <div class="content dialog_content">
        <p>{{ this.texts[this.currentIndex].text }}</p>
      </div>

      <!-- main end -->
    </el-dialog>
    <!-- Dialog END -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {
    // 時間週期(開啟這個網頁的時候就執行)
    this.getArticle();
  },
  data() {
    return {
      replyText: "",
      currentIndex: 0,
      centerDialogVisible: false,
      input2: "",
      squareUrl: "",
      texts: [{ title: "" }],
    };
  },
  methods: {
    getIndex(index) {
      this.currentIndex = index;
      // alert(this.texts[this.currentIndex].title);
    },
    async getArticle() {
      const tokenStr = window.sessionStorage.getItem("token");
      const { data: res } = await axios
        .get("https://forum1234.azurewebsites.net/api/Article", {})
        .catch((error) =>
          this.$message({
            message: error,
            type: "warning",
          })
        );
      //console.log(res);
      this.texts = res;
    },
    async getArticleFromWord() {
      /*
      console.log(
        "https://forum1234.azurewebsites.net/api/Article/select?word=" +
          this.input2
      );
      */
      const { data: res } = await axios
        .get(
          "https://forum1234.azurewebsites.net/api/Article/select?word=" +
            this.input2
        )
        .then(() =>
          this.$message({
            message: "查詢成功",
            type: "success",
          })
        )
        .catch((error) =>
          this.$message({
            message: error,
            type: "warning",
          })
        );
      //console.log(res);
      this.texts = res;
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
  margin: 80px auto;
  border-radius: 5px;
  padding: 2px;
}
.box {
  width: 99%;
  height: 200px;
  background-color: #fff;
  border: 2px solid #ebeef5;
  margin: 0px auto;
  margin-top: 3px;
  padding-top: 10px;
  border-radius: 5px;
}
.pagination {
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #909399;
}
.pagination2 {
  background-color: #fff;
}
.user {
  float: left;
  left: 20px;
  font-size: 15px;
  font-family: 微軟正黑體;
  color: #606266;
}
.user > .icon {
  margin-right: 5px;
  transform: translate(0, 25%);
}
.title {
  margin-top: 20px;
  padding: 20px 40px 8px 40px;
  font-size: 20px;
  font-family: 微軟正黑體;
  font-weight: bold;
}
.content {
  margin-top: 20px;
  padding: 15px 40px;
  font-size: 15px;
  font-family: 微軟正黑體;
  color: #606266;
}
.box_bottom {
  text-align: right;
  padding: 15px 40px;
  margin-bottom: 5px;
  font-size: 15px;
  font-family: 微軟正黑體;
  color: #606266;
}
.ellipsis1 {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.m05 {
  margin: 8px 10px 0px 10px;
}
.dialog_box1 {
  height: 1000px;
}
.dialog_title {
  margin-top: 60px;
  font-size: 30px;
}
.dialog_content {
  margin-top: 60px;
  padding-right: 90px;

  font-size: 18px;
}
.reply_box {
  border: none;
}
.box-border {
  position: relative;
  left: 5%;
  width: 90%;
  border-top: 1px solid #000;
}
.replyText {
  margin-top: 10px;
  left: 5%;
  width: 90%;
}
</style>
</style>
