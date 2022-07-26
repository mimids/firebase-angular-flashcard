export enum Role {
  Admin = 'admin',
  Ghost = 'ghost',
  User = 'user',
  Visiter='visiter'
}
  
  export interface LoggedInUser {
    jwt: string;
    account: Account;
  }
  export interface Account {
    uid?: string;
    firstName?: string;
    lastName?: string;
    roles?: Role;
    avatar?: Upload;
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
  