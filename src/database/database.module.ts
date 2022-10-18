import { Module } from '@nestjs/common';
import { databaseProviders, databaseTwoProviders } from './repository/database.repository';

@Module({
    providers: [...databaseProviders, ...databaseTwoProviders],
    exports: [...databaseProviders, ...databaseTwoProviders]
})
export class DatabaseModule {}
