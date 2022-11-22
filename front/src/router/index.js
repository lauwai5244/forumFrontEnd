import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import UserInformation from '../components/UserInformation.vue'
import CreateArticle from '../components/CreateArticle.vue'
import ArticleList from '../components/ArticleList.vue'
import ApplyAccount from '../components/ApplyAccount.vue'
import Login from '../components/Login.vue'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/Home' },
    { path: '/Home', component: Home },
    { path: '/UserInformation', component: UserInformation },
    { path: '/CreateArticle', component: CreateArticle },
    { path: '/ArticleList', component: ArticleList },
    { path: '/Apply', component: ApplyAccount },
    { path: '/Login', component: Login }
  ],
})

export default router
