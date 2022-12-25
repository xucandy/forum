import { ChannelEntity } from '../../channel/entities/channel.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { JoinColumn } from 'typeorm/decorator/relations/JoinColumn';

@Entity('messages')
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    comment: 'message title',
  })
  title: string;
  @Column({
    type: 'text',
    nullable: false,
    comment: 'message body',
  })
  content: string;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;
  @ManyToOne(() => ChannelEntity, (channel) => channel.messages, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'channel_id' })
  channel: ChannelEntity;
}
