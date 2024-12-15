import { Account, CreateAccountInput } from '../types/account';
import { prisma } from '../../prisma/client';

export async function createAccountDB(
  account: CreateAccountInput,
): Promise<Account> {
  const newAccount = await prisma.account.create({
    data: {
      name: account.name,
      userId: account.userId,
    },
  });
  const res: Account = {
    id: newAccount.id,
    name: newAccount.name,
    userId: newAccount.userId,
    createdAt: newAccount.createdAt,
    updatedAt: newAccount.updatedAt,
  };
  return res;
}

export async function getAccountsByUserDB(userId: string): Promise<Account[]> {
  const accounts = await prisma.account.findMany({
    where: {
      userId,
    },
  });
  return accounts.map((account) => ({
    id: account.id,
    name: account.name,
    userId: account.userId,
    createdAt: account.createdAt,
    updatedAt: account.updatedAt,
  }));
}

export async function getAccountByIdDB(
  accountId: string,
): Promise<Account | null> {
  const account = await prisma.account.findFirst({
    where: {
      id: accountId,
    },
  });
  if (!account) {
    return null;
  }
  return {
    id: account.id,
    name: account.name,
    userId: account.userId,
    createdAt: account.createdAt,
    updatedAt: account.updatedAt,
  };
}

export async function updateAccountDB(
  accountId: string,
  name: string,
): Promise<Account | null> {
  const account = await prisma.account.update({
    where: {
      id: accountId,
    },
    data: {
      name,
    },
  });
  return {
    id: account.id,
    name: account.name,
    userId: account.userId,
    createdAt: account.createdAt,
    updatedAt: account.updatedAt,
  };
}

export async function deleteAccountDB(accountId: string): Promise<void> {
  await prisma.account.delete({
    where: {
      id: accountId,
    },
  });
}