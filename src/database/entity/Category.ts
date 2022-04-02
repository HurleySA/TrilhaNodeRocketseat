import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("text")
    name: string;

    @Column("text")
    description: string;

    @Column({ type: 'timestamptz' }) // Recommended
    created_at: Date;


    
}

/* class Category {
    id?: string;
    name: string;
    description: string;
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { Category }; */
