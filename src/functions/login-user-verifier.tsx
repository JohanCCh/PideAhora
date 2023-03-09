import {UserServices} from '../services/user-services';

export async function loginUserVerifier(email: string, password: string) {
  const data: any = await UserServices.login({email, password});
  if (data.token != null) {
    return '';
  }else{
    return 'Email o contraseña incorrectos';
  }
  
}
