import Router from "koa-router";
import swaggerJSDoc from "swagger-jsdoc";
export const swaggerRouter = new Router();

const swaggerDefinition = {
  info: {
    description:
      'This is a sample server Koa2 server.  You can find out more about     Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).',
    version: '1.0.0',
    title: 'Koa2_server Swagger',
    contact: {
      name: 'Contact developers',
      url: 'https://mail.qq.com/',
      email: '2094596800@qq.com'
    },
    license: {
      name: 'Apache 2.0',
      url: 'http://www.apache.org/licenses/LICENSE-2.0.html'
    }
  },
  host: 'localhost:9000',
  basePath: '/', 
  schemes: ['http', 'https'],
  securityDefinitions: {
 Bearer: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'Bearer your token',
    },
  },
  components: {
    description: {
      description: '登入成功'
    }
  },
  definitions: {
    Order: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          format: 'int64'
        },
        petId: {
          type: 'integer',
          format: 'int64'
        },
        quantity: {
          type: 'integer',
          format: 'int32'
        },
        shipDate: {
          type: 'string',
          format: 'date-time'
        },
        status: {
          description: '状态',
          type: 'string',
          enum: '',
          0: 'placed',
          1: 'approved',
          2: 'delivered'
        },
        complete: {
          type: 'boolean',
          default: false
        }
      },
      xml: {
        name: 'Order'
      }
    }
  }
};
const options = {
  swaggerDefinition,
  apis: ['./app/routers/router/*.ts'] 
};
const swaggerSpec = swaggerJSDoc(options);
swaggerRouter.get('/swagger.json', async ctx => {
  ctx.set('Content-Type', 'application/json');
  ctx.body = swaggerSpec;
});