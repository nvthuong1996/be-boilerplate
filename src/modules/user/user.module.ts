import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountEntity } from './entities/account.entity';
import { UserEntity } from './entities/user.entity';
import { AccountService } from './services/account.service';
import { UserService } from './services/user.service';

@Module({
    imports: [TypeOrmModule.forFeature([AccountEntity, UserEntity])],
    providers: [AccountService, UserService],
    exports: [AccountService, UserService],
    controllers: [],
})
export class UserModule {}
