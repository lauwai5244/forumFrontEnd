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
                <el-dropdown-item
                  ><a href="/#/home" @click="logout()"
                    >登出
                  </a></el-dropdown-item
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
          <el-card>
            <!-- 表單 -->
            <el-table :data="tableData" style="width: 100%" border stripe>
              <el-table-column type="index" label="#"> </el-table-column>
              <el-table-column prop="title" label="文章標題"> </el-table-column>
              <el-table-column label="操作" width="150px">
                <template slot-scope="scope">
                  <!-- 修改按鈕 -->

                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    size="mini"
                    @click="(centerDialogVisible = true), getArticle(scope.row)"
                    class="fromBox"
                  ></el-button>
                  <!-- 刪除按鈕 -->
                  <el-button
                    type="warning"
                    icon="el-icon-delete"
                    size="mini"
                    class="fromBox"
                    @click="delectArticle(scope.row)"
                  ></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </div>
      </div>
    </section>
    <!-- main END -->

    <!-- Dialog START 對話框 -->

    <el-dialog
      title=""
      :visible.sync="centerDialogVisible"
      width="65%"
      center
      top="10px"
    >
      <!-- main start -->
      <section class="main">
        <div class="outter">
          <div class="box">
            <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="標題" prop="desc">
                <el-input
                  type="article"
                  v-model="article.title"
                  :autosize="{ minRows: 2, maxRows: 4 }"
                ></el-input>
              </el-form-item>

              <el-form-item label="內文" prop="desc">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 8, maxRows: 12 }"
                  placeholder="請輸入內容"
                  v-model="article.text"
                >
                </el-input>
              </el-form-item>

              <div class="fromButton">
                <el-form-item size="large" class="left55">
                  <el-button type="primary" @click="updateArticle"
                    >修改文章</el-button
                  >

                  <el-button @click="centerDialogVisible = false"
                    >取消</el-button
                  >
                </el-form-item>
              </div>
            </el-form>
          </div>
        </div>
      </section>
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
    this.checkLogin();
    this.getArticleList();
  },
  data() {
    return {
      tableData: [{}],
      article: { id: "", title: "", text: "" },
      currentIndex: 0,
      centerDialogVisible: false,
      input2: "",
    };
  },
  methods: {
    async getArticleList() {
      const tokenStr = window.sessionStorage.getItem("token");
      //console.log("tks" + tokenStr);
      const { data: res } = await axios
        .get(
          "https://forum1234.azurewebsites.net/api/Article/GetArticleFromUserId",
          {
            headers: {
              Authorization: "bearer " + tokenStr,
            },
          }
        )
        .catch((error) =>
          this.$message(
            {
              message: error,
              type: "warning",
            },
            console.log(error)
          )
        );

      this.tableData = res;
    },
    getArticle(scope) {
      this.article.id = scope.id;
      this.article.title = scope.title;
      this.article.text = scope.text;
    },
    async updateArticle() {
      const { data: res } = await axios
        .put("https://forum1234.azurewebsites.net/api/Article", {
          id: this.article.id,
          Title: this.article.title,
          Text: this.article.text,
        })
        .then(() =>
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

      //console.log(res);
    },
    async delectArticle(scope) {
      console.log(
        "https://forum1234.azurewebsites.net/api/Article/" + scope.id
      );
      const { data: res } = await axios
        .delete("https://forum1234.azurewebsites.net/api/Article/" + scope.id)
        .then(() =>
          this.$message({
            message: "刪除成功",
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
    },
    checkLogin() {
      const tokenStr = window.sessionStorage.getItem("token");
      if (tokenStr == null) this.$router.push({ path: "/login" });
    },
    logout() {
      window.sessionStorage.removeItem("token");
      //this.$router.push({ path: "/home" });
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

  /* display: flex; */

  margin: 80px auto;
  border-radius: 5px;
  padding: 2px;
}
.box {
  left: 1%;
  top: 5px;
  width: 98%;
  height: 98%;

  border-radius: 5px;
  padding: 30px 0;
}
.fromBox {
  left: 10%;
}
.el-form-item {
  width: 90%;
}
.left55 {
  left: 55%;
}
</style>
