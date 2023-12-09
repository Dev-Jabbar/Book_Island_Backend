// authController.ts
import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

export class AuthController {
  constructor(private authService: AuthService) {}

  register(req: Request, res: Response): void {
    const { username, password } = req.body;
    this.authService.registerUser(username, password);
    res.status(201).json({ message: 'User registered successfully' });
  }

  login(req: Request, res: Response): void {
    const { username, password } = req.body;
    const user = this.authService.loginUser(username, password);
    if (user) {
      res.status(200).json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  }

  logout(req: Request, res: Response): void {
    this.authService.logoutUser();
    res.status(200).json({ message: 'Logout successful' });
  }
}
