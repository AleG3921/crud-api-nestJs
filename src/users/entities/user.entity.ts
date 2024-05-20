import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { Role } from "../users.module";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userName: string;

    @Column()
    password: string;

    @ManyToOne(()=>Role)
    rol: Role;
    @RelationId((user:User)=>user.rol)
    roleId:number;

    @Column({default: true})
    isActive: boolean;
}
