let store = {
    storage: {},
    // 这里进行了数据操作封装
    set (key, session) {
      this.storage[key] = session;
    },
    get (key) {
      return this.storage[key];
    },
    destroy (key) {
      delete this.storage[key];
    }
  }
  let sessionConfig = {
    key: 'koa:session',
    maxAge: 86400000,
    autoCommit: true,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: false,
    sameSite: null,
    store
  }
  module.exports = {sessionConfig};