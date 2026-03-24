import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import EventEmitter2 from 'eventemitter2';
import { USER_EVENTS, UserDeletedEvent } from './events/user.events';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)  private userRepository: Repository<User>,
    private eventEmitter: EventEmitter2,
  ){}
  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create({...createUserDto, createdAt: new Date(),});
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find({relations: {profile: true, posts: true}});
  }

  async findOne(id: number) {
  return this.userRepository.findOne({
    where: { id },
    relations: {profile: true, posts: true}
  });
}

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update({id}, {...updateUserDto});
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { profile: true, posts: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    

    await this.userRepository.remove(user);
    
    this.eventEmitter.emit(
      USER_EVENTS.DELETED,
      new UserDeletedEvent(id, user.email, user.name),
    );
    
    return { message: 'User deleted', user };
  }

}
