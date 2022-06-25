import { Service } from 'moleculer-decorators';
import { Service as MoleculerService } from 'moleculer';
import path from 'path';
import { DBMixin } from '../common';
import * as DBConfig from '../db/config';
import { healthActionsService } from '../app/services/HealthActionsService';
import { usersActionsService } from '../app/services/UsersActionsService';

@Service({
  name: 'services.moleculer-users-crud',
  version: 1,
  settings: {
    sync: false,
    dbConfig: DBConfig,
    dbModelsPath: path.join(__dirname, '../app/models'),
  },
  mixins: [
    DBMixin,
    healthActionsService.getSchema(),
    usersActionsService.getSchema(),
  ],
})
export default class MoleculerUsersCrudService extends MoleculerService {
}
