import { resolve } from 'path';

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const database: () => TypeOrmModuleOptions = () => ({
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: '',
  database: 'forum',
  entities: ['dist/**/*.entity{.ts,.js}'],
  dateStrings: true,
  autoLoadEntities: true,
  synchronize: true,
});
