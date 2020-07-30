/**
 * Created by myh on 2019.10.14.
 */
import axios from 'axios'
import qs from 'qs'
import { alert } from './util';
import * as base from './base';

const request = axios.create({
  timeout: 30000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true
});


request.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
});

request.interceptors.response.use(response => {
  return response

}, error => {
  return Promise.resolve(error.response)
});

export const checkStatus = (response) => {
  /**
   * loading
   * 如果http状态码正常，则直接返回数据
   * */

  if (response) {
    if (response.status == 200 || response.status == 304 || response.status == 400) {
      return response;
    }

    else if (response.status == 403 || response.data.subcode == 403) {
      alert("登录超时，请重新登录！");
      location.href = `/auth/login?redirect=${encodeURIComponent(location.href)}`;
      return false;
    }

    else if (response.status == 500) {
      alert("抱歉，程序出错了，请稍后再试!")
    }
  }
}

export const checkCode = (response) => {
  /**
   * 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，
   * 可以弹出一个错误提示，告诉用户
   * */
  if (response.status == 404) {
    Modal.error({
      title: response.data.subMessage
    });
  }
  if (response.data && response.data.subcode != 200) {
    Modal.error({
      title: response.data.subMessage
    });
  }
  return response
}


/**
 * post请求类型
*/
export function post(url, data) {
  return request({
    method: 'post',
    data: qs.stringify(data),
    timeout: 30000,
    url: base.BASEURL + url,
    headers: {
      "Authorization": localStorage.getItem('token') || ''
    }
  }).then(response => {
    return checkStatus(response)
  }
  ).catch(res => {
    return checkCode(res)
  }
  )
}

/**
 * get请求类型
*/
export function get(url, params) {
  return request({
    method: 'get',
    url: base.BASEURL + url,
    params,
    headers: {
      "Authorization": localStorage.getItem('token') || ''
    }
  }).then(response => {
    return checkStatus(response)
  }
  ).catch(res => {
    return checkCode(res)
  }
  )
}



