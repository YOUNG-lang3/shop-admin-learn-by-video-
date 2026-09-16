import { createStore } from "vuex";
import { login, getinfo } from "../api/manager";
import { toast } from "../composables/utils";
import { setToken,removeToken } from "../composables/auth";

// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      user: {}
    }
  },
  mutations: {
    SET_USERINFO(state, user) {
      state.user = user;
    }
  },
  actions: {
    //登录
    login({ commit }, { username, password}) {
      return new Promise((resolve, reject) => {
        login(username, password).then(res => {
          console.log(res);
          //提示成功
          toast("登录成功");
          //存储token和用户相关信息
          setToken(res.token);
          resolve(res);
        }).catch(error=>{
          reject(error);
        })
      })
    },
    //获取当前登录用户信息
    getinfo({ commit }) {
      return new Promise((resolve, reject) => {
        getinfo().then(res => {
          commit("SET_USERINFO", res);
          resolve(res);
        }).catch(err => reject(err))
      })
    },
    //退出登录
    logout({ commit }) {
      //移除token
      removeToken();
      //清除用户状态
      commit("SET_USERINFO", {});
    }
  }
})

export default store;