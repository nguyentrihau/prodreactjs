import axios from "axios";
import { isExpired } from "react-jwt";
import { history } from "../App";

export const USER_LOGIN = "userLogin";
export const TOKEN = "accessToken";

export const {
  luuStore,
  luuStoreJson,
  layStore,
  layStoreJson,
  huyStore,
  setCookie,
  getCookie,
  eraseCookie,
  getToken,
  sl,
} = {
  sl: (arr, select) => {
    let total = 0;
    for (const key in arr) {
      total += arr[key][select];
    }
    return total;
  },
  luuStore: (name, data) => {
    localStorage.setItem(name, data);
  },
  luuStoreJson: (name, jsonData) => {
    const data = JSON.stringify(jsonData);
    localStorage.setItem(name, data);
  },
  layStore: (name) => {
    if (localStorage.getItem(name)) {
      return localStorage.getItem(name);
    }
    return null;
  },

  layStoreJson: (name, token) => {
    if (localStorage.getItem(name)) {
      return JSON.parse(localStorage.getItem(name))[token];
    }
    return null;
  },
  huyStore: (name) => {
    localStorage.removeItem(name);
  },
  setCookie: (name, value, days) => {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  },
  getCookie: (name) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },
  eraseCookie: (name) => {
    document.cookie =
      name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  },
  getToken: () => {
    const token = localStorage.getItem("userLogin");
    if (token) return JSON.parse(token);
    return null;
  },
};

//cau hinh interceptor (cau hinh cho tat request(gui di),response(du lieu nhan ve))

export const http = axios.create({
  baseURL: "http://localhost:8000/api/",
  timeout: 30000,
});

//cau hinh cho request deu co token
http.interceptors.request.use(
  (config) => {
    let token = getToken();
    // console.log("layStore(TOKEN)",token);
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

//cau hinh cho tat ca response api
http.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    // if(err.response?.status === 415){alert('dang nhap that bai')}
    //Bat loi 400 hoac 404
    if (err.response?.status === 400 || err.response?.status === 404) {
      //Loi do tham so => backend tra ve 400 hoac 404 minh se xu ly
      alert("tham so khong hop le hoac trung email");
      //chuyen huong ve home
      history.push("/");
    }
    if (err.response?.status === 401 || err.response?.status === 403) {
      const isMyTokenExpired = isExpired(layStore(TOKEN));
      //token het han
      if (isMyTokenExpired) {
        // alert('Het phien dang nhap yeu cau dang nhap lai !');
        // huyStore(TOKEN);
        // huyStore(USER_LOGIN);
        // // chuyen huong dang trang f5
        // window.location.href = '/login';
      }
      // history.push('/login');
    }
    if (err.code === "ERR_NETWORK") {
      localStorage.removeItem(USER_LOGIN);
      window.location.reload();
    }
    return Promise.reject(err);
  }
);
