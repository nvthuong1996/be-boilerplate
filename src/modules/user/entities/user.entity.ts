import { AbstractEntity } from '@common/abstract.entity';
import { RoleType } from '@common/constants/role-type';
import { Column, Entity, OneToOne } from 'typeorm';

import { AccountEntity } from './account.entity';

@Entity('user')
export class UserEntity extends AbstractEntity {
    @Column('varchar', { name: 'fullname', nullable: true, length: 45 })
    fullname: string | null;

    @Column('varchar', { name: 'avatar', nullable: true, length: 500 })
    avatar: string | null;

    @Column('varchar', { name: 'phone', nullable: true, length: 45 })
    phone: string | null;

    @Column('varchar', { name: 'first_name', nullable: true, length: 45 })
    firstName: string | null;

    @Column('varchar', { name: 'last_name', nullable: true, length: 45 })
    lastName: string | null;

    @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
    role: RoleType;

    @OneToOne(() => AccountEntity, (account) => account.user, {
        cascade: true,
    })
    account: AccountEntity;
}
