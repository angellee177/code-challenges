// src/entities/Task.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { Category } from "./Category.entity";
import { Status, StatusType } from "../enum/status";

@Entity({ name: 'todos' }) // for table name
export class Task {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    title!: string;

    @Column({ nullable: true })
    description?: string;

    @Column({
        type: "varchar",
        default: Status.Pending,
    })
    status!: StatusType;

    @ManyToOne(() => Category, (category) => category.tasks)
    @JoinColumn({ name: "categoryId" })
    category!: Category;

    @Column()
    categoryId!: string;

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
