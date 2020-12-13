import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { AccountDto } from './account.dto';

export class UserDto {
    @ApiProperty()
    @ApiPropertyOptional()
    fullname: string | null;

    @ApiProperty()
    @ApiPropertyOptional()
    avatar: string | null;

    @ApiProperty()
    @ApiPropertyOptional()
    phone: string | null;

    @ApiProperty()
    @ApiPropertyOptional()
    firstName: string | null;

    @ApiProperty()
    @ApiPropertyOptional()
    lastName: string | null;

    @ApiProperty({
        type: AccountDto,
        isArray: true,
    })
    @ApiPropertyOptional()
    account: AccountDto;
}
