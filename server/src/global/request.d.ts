declare namespace Express {
  export interface Request {
    user: import('src/users/user.dto').UserDTO;
  }
}
