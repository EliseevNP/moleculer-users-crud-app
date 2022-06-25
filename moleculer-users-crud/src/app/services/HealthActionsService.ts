import {
  ActionLink, ActionService, ServiceLink,
} from '../../common';

@ServiceLink({ prefix: 'HealthActions' })
class HealthActionsService extends ActionService {
  @ActionLink({
    rest: 'GET /health',
    description: 'Метод проверяет работоспособность сервера',
  })
  public health(): string {
    return 'ok';
  }
}

export const healthActionsService = new HealthActionsService();
