import prisma from '../prisma/client';
import { hashPassword } from '../utils/hash';

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export const registerUserService = async ({ name, email, password }: RegisterInput) => {
  const hashedPassword = await hashPassword(password);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return newUser;
};

export const updateUserService = async (id: string, data: Partial<{ name: string; email: string }>) => {
  const updatedUser = await prisma.user.update({
    where: { id },
    data,
  });

  return updatedUser;
};

export const getUserService = async (id: string) => {
  return prisma.user.findUnique({ where: { id } });
};

export const deleteUserService = async (id: string) => {
  return prisma.user.delete({ where: { id } });
};
