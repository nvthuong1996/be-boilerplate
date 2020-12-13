import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { ApiFile } from '../../../decorators/swagger.schema';
import { IFile } from '../../../interfaces/IFile';
import { UserService } from '../../user/services/user.service';
import { LoginPayloadDto } from '../dtos/login-payload.dto';
import { UpdateProfileDto } from '../dtos/update-profile.dto';
import { UserLoginDto } from '../dtos/user-login.dto';
import { UserRegisterDto } from '../dtos/user-register.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(
        public readonly userService: UserService,
        public readonly authService: AuthService,
    ) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: LoginPayloadDto,
        description: 'User info with access token',
    })
    async userLogin(@Body() userLoginDto: UserLoginDto): Promise<any> {
        const account = await this.authService.validateAccount(userLoginDto);

        const token = await this.authService.createToken(account);
        return { token };
    }

    @Post('register')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: UpdateProfileDto,
        description: 'Successfully Registered',
    })
    @ApiConsumes('multipart/form-data')
    @ApiFile('avatar')
    @ApiBody({ type: UserRegisterDto })
    @UseInterceptors(FileInterceptor('avatar'))
    async userRegister(
        @Body() userRegisterDto: UserRegisterDto,
        @UploadedFile() file: IFile,
    ): Promise<any> {
        const createdUser = await this.userService.createUser(
            userRegisterDto,
            file,
        );
        // eslint-disable-next-line @typescript-eslint/tslint/config
        return createdUser;
    }
}
