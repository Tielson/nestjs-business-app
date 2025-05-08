import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { registerMessage } from 'src/utils/message';
import { sendEmail } from 'src/utils/nodemailer';
import { CreateUserDto, UpdateUserDto } from '../../dtos/users/user.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany({
      include: {
        sales_representative: true,
        payments: true,
      },
    });
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        sales_representative: true,
        payments: true,
      },
    });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.prisma.user.create({
        data: {
        id: createUserDto.id,
        company: createUserDto.company,
        email: createUserDto.email,
        number: createUserDto.number,
        cnpj: createUserDto.cnpj,
      }});
      

      await sendEmail(user.email, 'Bem-vindo ao ZENDA- Gestão Inteligente'
        , registerMessage({ company: user.company }));

      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          const fields = error.meta?.target;
          throw new ConflictException(`${fields}`);
        }
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const userData = { ...updateUserDto };
      const user = await this.prisma.user.update({
        where: { id },
        data: userData,
      });
      if (!user) {
        throw new NotFoundException('Usuário não encontrado');
      }
      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Email já está em uso');
        }
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  async remove(id: string): Promise<User> {
    try {
      const user = await this.prisma.user.delete({
        where: { id },
      });
      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Usuário não encontrado');
        }
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }
}