import { BasicAuthorizer } from '@common/basic-authorizer';
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { newEnforcer } from 'casbin';
import { resolve } from 'path';

import { UserEntity } from '../modules/user/entities/user.entity';

@Injectable()
export class AuthorizeGuard implements CanActivate {
    constructor(private readonly _reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // const roles = this._reflector.get<string[]>(
        //     'roles',
        //     context.getHandler(),
        // );
        //
        // if (!roles) {
        //     return true;
        // }

        const enforcer = await newEnforcer(
            resolve(__dirname, '../casbin_conf/model.conf'),
            resolve(__dirname, '../casbin_conf/policy.csv'),
        );

        const request = context.switchToHttp().getRequest();
        const user = <UserEntity>request.user;
        const role = user?.role || 'any';
        const authorizer = new BasicAuthorizer(request, enforcer);
        if (!(await authorizer.checkPermission(role))) {
            throw new UnauthorizedException();
        }

        return true;
    }
}
