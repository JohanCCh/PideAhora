export function emailValidator(email: string) {
  const re = /\S+@\S+\.\S+/;
  if (!email) return 'Falta correo electronica.';
  if (!re.test(email)) return 'Oops! Dirección de correo electrónico inválida.';
  return '';
}
