import axios from 'axios'

export function request(config){
  //1.创建axios实例
  const instance = axios.create({
    baseURL:'http://106.54.54.237:8000/api/mn',
    timeout:5000
  })
  //2.设置拦截器
  //请求拦截
  axios.interceptors.request.use(config=>{
    console.log(config);
    return config 
  },err=>{
    console.log(err);
  })
//响应拦截
  axios.interceptors.response.use(res=>{
    console.log(res.data);
    return res.data
  },err=>{
    console.log(err);
  })

//3.发送真正的网络请求
return instance(config)
}