import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { QueryRunner } from 'typeorm';


@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User)  private userRepository: Repository<User>,
    @InjectRepository(Profile)  private profileRepository: Repository<Profile>,
  ){}
  
  async create(
    user: User,
    createProfileDto: CreateProfileDto,
    queryRunner: QueryRunner
  ) {
    // Use queryRunner.manager so all ops share the same transaction
    const profile = queryRunner.manager.create(Profile, { ...createProfileDto });
    const savedProfile = await queryRunner.manager.save(Profile, profile);

    user.profile = savedProfile;
    await queryRunner.manager.save(User, user);
  }

  findAll() {
    return `This action returns all profile`;
  }

  async findOne(id: number) {
    const profile = await this.profileRepository.findOne({
  where: { id },
    relations: {user: true}
});
return profile
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return this.profileRepository.update({id}, {...updateProfileDto});
  }

  async remove(id: number) {
    const profile = await this.profileRepository.findOneBy({ id });
    if (!profile) {
        throw new NotFoundException('Profile not found');
    }

    
    await this.profileRepository.remove(profile);
    return profile;
  }

  

}
