import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'profile'})
export class Profile {
    @PrimaryGeneratedColumn()
        id: number;
    
        @Column()
        first_name: string;
        
        @Column()
        last_name: string;
    
        @Column()
        age: number;

        @OneToOne(() => User, (user) => user.profile, {
            onDelete: 'CASCADE', 
        })
        @JoinColumn() 
        user: User;
    
}
