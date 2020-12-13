import { AbstractEntity } from '@common/abstract.entity';
import { Column, Entity, JoinColumn, OneToOne, Unique } from 'typeorm';

import { UserEntity } from './user.entity';

@Entity('account')
@Unique('unique_email', ['email'])
export class AccountEntity extends AbstractEntity {
    @Column('varchar', { name: 'email', nullable: true, length: 45 })
    email: string | null;

    @Column('varchar', { name: 'password', nullable: true, length: 100 })
    password: string | null;

    @Column('int', { name: 'user_id' })
    userId: number;

    @OneToOne(() => UserEntity, (user) => user.account, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
        eager: true,
    })
    @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
    user: UserEntity;
}
