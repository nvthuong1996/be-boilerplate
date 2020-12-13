import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// import { UserDto } from './user.dto';

export class AccountDto {
    @ApiProperty()
    @ApiPropertyOptional()
    email: string | null;

    @ApiProperty()
    @ApiPropertyOptional()
    password: string | null;
}
