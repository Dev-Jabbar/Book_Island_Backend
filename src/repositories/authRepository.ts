// authRepository.ts
import { UserEntity } from '../entities/userEntity';

export class AuthRepository {
  private users: UserEntity[] = [];

  createUser(user: UserEntity): void {
    // Repository logic for creating a user
    this.users.push(user);
  }

  findUserByUsername(username: string): UserEntity | undefined {
    // Repository logic for finding a user by username
    return this.users.find((user) => user.username === username) || undefined;
  }

  // Other repository methods...
}

