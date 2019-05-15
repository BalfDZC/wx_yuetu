
function request(url, data = {}, header = {}, method = "GET") {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      method,
      header,
      success: res => {
        resolve(res);
      },
      fail: () => {
        reject();
      }
    });
  });
}

request.get = function(url, data) {
  return request(url, data, {}, "GET");
};


request.post = function(url, data) {
  return request(url, data, {}, "POST");
};

export default request;

