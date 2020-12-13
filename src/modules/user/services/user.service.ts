import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';

import { FileNotImageException } from '../../../exceptions/file-not-image.exception';
import { IFile } from '../../../interfaces/IFile';
import { AwsS3Service } from '../../../shared/services/aws-s3.service';
import { ValidatorService } from '../../../shared/services/validator.service';
import { UserRegisterDto } from '../../auth/dtos/user-register.dto';
import { AccountEntity } from '../entities/account.entity';
import { UserEntity } from '../entities/user.entity';
import { AccountService } from './account.service';

@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {
    constructor(
        public readonly validatorService: ValidatorService,
        public readonly awsS3Service: AwsS3Service,
        public readonly accountService: AccountService,
        @InjectRepository(AccountEntity)
        public readonly accountRepo: Repository<AccountEntity>,
        @InjectRepository(UserEntity) repo,
    ) {
        super(repo);
    }

    async createUser(
        userRegisterDto: UserRegisterDto,
        file: IFile,
    ): Promise<UserEntity> {
        let avatar: string;
        if (file && !this.validatorService.isImage(file.mimetype)) {
            throw new FileNotImageException();
        }

        if (file) {
            avatar = await this.awsS3Service.uploadImage(file);
        }

        const { email, password, ...userData } = userRegisterDto;

        const account = { email, password };

        return this.repo.save({
            ...userData,
            avatar,
            account,
        });
    }
}
