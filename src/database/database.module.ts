import { Module } from '@nestjs/common';
import { databaseProviders } from './repository/database.repository';
import { databaseTwoProviders } from './repository/database_2.repository';

@Module({
    providers: [...databaseProviders, ...databaseTwoProviders],
    exports: [...databaseProviders, ...databaseTwoProviders]
})
export class DatabaseModule {}
