import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud';

import { UseAppGuard } from '../../../decorators/app-guard';
import { UserEntity } from '../../user/entities/user.entity';
import { UserService } from '../../user/services/user.service';
import { UpdateProfileDto } from '../dtos/update-profile.dto';

@Crud({
    model: {
        type: UserEntity,
    },
    routes: {
        only: ['getOneBase', 'updateOneBase'],
    },
    params: {
        id: {
            primary: true,
            disabled: true,
        },
    },
    dto: {
        update: UpdateProfileDto,
    },
    query: {
        join: {
            account: {},
        },
    },
})
@CrudAuth({
    property: 'user',
    filter: (user) => ({
        id: user.id,
    }),
})
@ApiTags('auth')
@Controller('me')
@UseAppGuard()
export class UserProfileController implements CrudController<UserEntity> {
    constructor(public service: UserService) {}
}
