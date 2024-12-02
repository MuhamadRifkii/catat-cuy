export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export const getInitials = (name) => {
  if (!name) return "";

  const nama = name.split(" ");
  let inisial = "";

  for (let i = 0; i < Math.min(nama.length, 2); i++) {
    inisial += nama[i][0];
  }

  return inisial.toUpperCase();
}