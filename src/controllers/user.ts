import { PrismaClient } from '@prisma/client';
import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const createUser: RequestHandler = async (req, res) => {
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
  });
};

export const getUserById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  res.json(user);
};

export const updateUser: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const user = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      name,
      email,
    },
  });

  res.json(user);
};
