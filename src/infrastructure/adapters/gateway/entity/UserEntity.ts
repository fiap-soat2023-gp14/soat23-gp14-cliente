import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', nullable: false, length: 50 })
  name: string;

  @Column({ name: 'email', nullable: false })
  email: string;

  @Column({ name: 'phone', nullable: false })
  phone: string;

  @Column({ name: 'cpf', nullable: false })
  cpf: string;

  @Column({ name: 'createdAt', default: new Date(), nullable: false })
  createdAt: Date;

  @Column({ name: 'updatedAt', default: new Date(), nullable: true })
  updatedAt: Date;
}
