import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
      @InjectRepository(User)  private userRepository: Repository<User>,
      @InjectRepository(Post)  private postRepository: Repository<Post>
    ){}
  
  async create(id: number, createPostDto: CreatePostDto) {
      const user = await this.userRepository.findOneBy({id});
      if (!user) {
        throw new Error('User not found');
      }
      const post = this.postRepository.create({...createPostDto, user});
      
      return this.postRepository.save(post);
    }

  findAll() {
    return `This action returns all post`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
