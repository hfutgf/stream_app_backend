import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserByUsername(username: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { username } });

    return user;
  }

  async getByGoogleId(googleId: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { googleId } });

    return user;
  }

  async getById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user;
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = await this.prisma.user.create({ data: dto });
    return user;
  }

  async updateUser(userId: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: dto,
    });
    return user;
  }

  async deleteUser(userId: string): Promise<User> {
    const user = await this.prisma.user.delete({
      where: { id: userId },
    });
    return user;
  }
}
