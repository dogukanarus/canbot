import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './dto/user.entitiy';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/signUp.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // Kayıt olma.
  async createUser(signUpDto: SignUpDto): Promise<User> {
    const { name, surname, fathername, phone, ref, password } = signUpDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.create({
      name,
      surname,
      fathername,
      phone,
      ref,
      password: hashedPassword,
    });
    try {
      await this.save(user);
      return user;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Bu kullanıcı adı daha önce alınmış.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
