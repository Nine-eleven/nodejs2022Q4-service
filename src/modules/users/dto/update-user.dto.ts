import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly oldPassword: string; // previous password

  @IsString()
  @IsNotEmpty()
  readonly newPassword: string; // new password
}
