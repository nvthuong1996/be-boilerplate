import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { AccountEntity } from '../entities/account.entity';

@Injectable()
export class AccountService extends TypeOrmCrudService<AccountEntity> {
    constructor(@InjectRepository(AccountEntity) repo) {
        super(repo);
    }

    findByEmail(email: string) {
        return this.repo.findOne({ email });
    }
}
