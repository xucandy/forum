import { MessageEntity } from '../../message/entities/message.entity';
import { Column } from 'typeorm/decorator/columns/Column';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { OneToMany } from 'typeorm/decorator/relations/OneToMany';

@Entity('channels')
export class ChannelEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'varchar',
    length: 30,
    nullable: false,
    unique: true,
    comment: 'channel name',
  })
  name: string;
  @OneToMany(() => MessageEntity, (messages) => messages.channel, {
    cascade: true,
  })
  messages: MessageEntity[];
}
