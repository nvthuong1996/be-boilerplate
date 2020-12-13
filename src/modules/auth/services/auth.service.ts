import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserNotFoundException } from '../../../exceptions/user-not-found.exception';
import { ContextService } from '../../../providers/context.service';
import { UtilsService } from '../../../providers/utils.service';
import { ConfigService } from '../../../shared/services/config.service';
import { AccountEntity } from '../../user/entities/account.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { AccountService } from '../../user/services/account.service';
import { UserService } from '../../user/services/user.service';
import { TokenPayloadDto } from '../dtos/token-payload.dto';
import { UserLoginDto } from '../dtos/user-login.dto';

@Injectable()
export class AuthService {
    private static _authUserKey = 'user_key';

    constructor(
        public readonly jwtService: JwtService,
        public readonly configService: ConfigService,
        public readonly userService: UserService,
        public readonly accountService: AccountService,
    ) {}

    async createToken(account: AccountEntity): Promise<TokenPayloadDto> {
        return new TokenPayloadDto({
            expiresIn: this.configService.getNumber('JWT_EXPIRATION_TIME'),
            accessToken: await this.jwtService.signAsync({
                id: account.user.id,
            }),
        });
    }

    async validateAccount(userLoginDto: UserLoginDto): Promise<AccountEntity> {
        const account = await this.accountService.findByEmail(
            userLoginDto.email,
        );
        const isPasswordValid = await UtilsService.validateHash(
            userLoginDto.password,
            account && account.password,
        );
        if (!account || !isPasswordValid) {
            throw new UserNotFoundException();
        }
        return account;
    }

    static setAuthUser(user: UserEntity) {
        ContextService.set(AuthService._authUserKey, user);
    }

    static getAuthUser(): UserEntity {
        return ContextService.get(AuthService._authUserKey);
    }
}
