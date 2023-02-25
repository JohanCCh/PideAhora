export function loginUserVerifier(email: string, password: string) {
  if (email == 'admin@ejemplo.com' && password == '123456') return '';
  return 'Email o contraseña incorrectos';
}
