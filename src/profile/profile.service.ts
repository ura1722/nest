import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User)  private userRepository: Repository<User>,
    @InjectRepository(Profile)  private profileRepository: Repository<Profile>
  ){}
  
  async create(id: number, createProfileDto: CreateProfileDto) {
    const user = await this.userRepository.findOneBy({id});
    if (!user) {
      throw new Error('User not found');
    }
    const profile = this.profileRepository.create({...createProfileDto});
    const savedProfile = await this.profileRepository.save(profile);
    user.profile = savedProfile;
    return this.userRepository.save(user);
  }

  findAll() {
    return `This action returns all profile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
