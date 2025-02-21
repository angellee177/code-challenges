import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { Task } from "./Task.entity";

@Entity({ name: 'categories' })
export class Category {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    name!: string;

    @OneToMany(() => Task, (task) => task.category)
    tasks?: Task[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @UpdateDateColumn({ 
        type: 'timestamp', 
        default: () => 'CURRENT_TIMESTAMP', 
        onUpdate: 'CURRENT_TIMESTAMP' 
    })
    updatedAt!: Date;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deletedAt?: Date;
}
