import { ServiceSchema } from 'moleculer';
import ApiGateway from 'moleculer-web';

const ApiService: ServiceSchema = {
  name: 'api-gateway',
  mixins: [ApiGateway],
  settings: {
    port: process.env.PORT || 3000,
    routes: [
      {
        path: '/users',
        bodyParsers: {
          json: { limit: '50MB' },
        },
        aliases: {
          'GET /': 'v1.services.moleculer-users-crud.UsersActions.getList',
          'GET /:id': 'v1.services.moleculer-users-crud.UsersActions.getById',
          'POST /': 'v1.services.moleculer-users-crud.UsersActions.create',
          'DELETE /:id': 'v1.services.moleculer-users-crud.UsersActions.delete',
          'PATCH /:id': 'v1.services.moleculer-users-crud.UsersActions.update',
        },
      },
    ],
  },
};

export = ApiService;
