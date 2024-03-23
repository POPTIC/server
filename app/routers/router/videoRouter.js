const Router = require('koa-router');
const videoController = require('../../controller/videoController.')

let videoRouter = new Router();

videoRouter.post('/user/uploadVideo', videoController.uploadVideo)
  .get('/user/loadRequest', videoController.loadRequst)
  .get('/user/videoMerge', videoController.videoMerge)
  .get('/user/getVideo', videoController.getVideo)

module.exports = videoRouter;

