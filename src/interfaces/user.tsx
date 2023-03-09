export interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  city: string;
  image_url: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface UserRegister {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  body:{
    user?: UserRegister;
    user_exists: boolean;
  }
}
