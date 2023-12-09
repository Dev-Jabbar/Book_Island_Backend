// authService.ts
import { AuthRepository } from '../repositories/authRepository';
import { UserEntity } from '../entities/userEntity';

export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  registerUser(username: string, password: string): void {
    // Service logic for registering a user
    const user = new UserEntity(Date.now(), username, password, 100); // Pass a default value for 'points'
    this.authRepository.createUser(user);
  }

  loginUser(username: string, password: string): UserEntity | undefined {
    // Service logic for logging in a user
    const user = this.authRepository.findUserByUsername(username);
    if (user && user.password === password) {
      return user;
    }
    return undefined;
  }

  logoutUser(): void {
    // Service logic for logging out a user
  }
}
