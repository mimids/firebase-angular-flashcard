export enum AuthError {
    InvalidEmail = 'Invalid email',
    InvalidPassword = 'Invalid password',
    EmailExists = 'Email already exists',
    EmailConfirmed = 'Email already confirmed',
    EmailNotFound = 'Email not found',
    InvalidToken = 'Invalid token',
    NewPasswordMustBeDifferentFromCurrent = 'New password must be different from current',
  }



  export interface LoginDto {
    email: string;
    password: string;
  }



  export interface Upload {
    /**
     * File path, must be prefixed by server host
     * @example 'uploads/public/uuid.jpg'
     */
    path: string;
  
    /**
     * Resized file path, must be prefixed by server host
     * @example 'uploads/public/uuid-thumb.jpg'
     */
    thumbPath: string;
  }
  