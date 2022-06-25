import { Context, Errors } from 'moleculer';
import _ from 'lodash';
import {
  ActionLink, ActionService, ServiceLink,
} from '../../common';
import User from '../models/User';

type Response<ResponseData = any> = { data: ResponseData };

const sleepRandomly = () => new Promise((resolve) => {
  setTimeout(resolve, _.random(100, 300));
});

const throwErrorRandomly = () => {
  if (_.random(0, 100) < 15) {
    throw new Errors.MoleculerError('Error for metrics testing');
  }
};

@ServiceLink({ prefix: 'UsersActions' })
class UsersActionsService extends ActionService {
  @ActionLink({
    rest: 'GET /',
    description: 'Метод возвращает список пользователей',
  })
  public async getList(): Promise<Response<User[]>> {
    throwErrorRandomly();
    await sleepRandomly();

    const list = await User.findAll();

    return { data: list };
  }

  @ActionLink({
    rest: 'GET /:id',
    description: 'Метод возвращает пользователя по id',
    params: {
      id: {
        type: 'uuid',
        optional: false,
      },
    },
  })
  public async getById(ctx: Context<{ id: string }>): Promise<Response<User | null>> {
    throwErrorRandomly();
    await sleepRandomly();

    const user = await User.findByPk(ctx.params.id);

    return { data: user };
  }

  @ActionLink({
    rest: 'POST /:id',
    description: 'Метод создает нового пользователя',
    params: {
      name: {
        type: 'string',
        optional: true,
        max: 255,
      },
      surname: {
        type: 'string',
        optional: true,
        max: 255,
      },
      patronymic: {
        type: 'string',
        optional: true,
        max: 255,
      },
    },
  })
  public async create(ctx: Context<{ name?: string | null, surname?: string | null, patronymic?: string | null }>): Promise<Response<User>> {
    throwErrorRandomly();
    await sleepRandomly();

    const user = await User.create(_.pick(ctx.params, ['name', 'surname', 'patronymic']));

    return { data: user };
  }

  @ActionLink({
    rest: 'PATCH /:id',
    description: 'Метод обновляет пользователя',
    params: {
      id: {
        type: 'uuid',
        optional: false,
      },
      name: {
        type: 'string',
        optional: true,
        max: 255,
      },
      surname: {
        type: 'string',
        optional: true,
        max: 255,
      },
      patronymic: {
        type: 'string',
        optional: true,
        max: 255,
      },
    },
  })
  public async update(ctx: Context<{
    id: string,
    name?: string | null,
    surname?: string | null,
    patronymic?: string | null,
  }>): Promise<Response<User | null>> {
    throwErrorRandomly();
    await sleepRandomly();

    const [affectedRowsNumber, affectedRows] = await User.update(
      _.pick(ctx.params, ['name', 'surname', 'patronymic']),
      {
        where: { userId: ctx.params.id },
        returning: true,
      },
    );

    return affectedRowsNumber
      ? { data: affectedRows[0] }
      : { data: null };
  }

  @ActionLink({
    rest: 'GET /:id',
    description: 'Метод удаляет пользователя по id',
    params: {
      id: {
        type: 'uuid',
        optional: false,
      },
    },
  })
  public async delete(ctx: Context<{ id: string }>): Promise<Response<number>> {
    throwErrorRandomly();
    await sleepRandomly();

    const destroyedRowsNumber = await User.destroy({ where: { userId: ctx.params.id } });

    return { data: destroyedRowsNumber };
  }
}

export const usersActionsService = new UsersActionsService();
