import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User)  private userRepository: Repository<User>){}
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

  remove(id: number) {
    return this.userRepository.delete({id});
  }
}
