import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';

import { UserDto } from '../dtos/user.dto';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@Crud({
    model: {
        type: UserEntity,
    },
    dto: {
        create: UserDto,
        update: UserDto,
        replace: UserDto,
    },
    query: {
        join: {
            account: {},
        },
    },
})
@ApiTags('user')
@Controller('user')
export class UserController implements CrudController<UserEntity> {
    constructor(public service: UserService) {}
}
