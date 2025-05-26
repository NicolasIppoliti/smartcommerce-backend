export class RegisterDto {
  email!: string;
  password!: string;
  role?: 'admin' | 'client';
}
