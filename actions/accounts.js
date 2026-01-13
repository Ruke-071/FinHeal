"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import {revalidatePath} from "next/cache";
import {date} from "zod";
const serializeTransaction = (obj) => {
  const serialized = { ...obj };

  if (obj.balance) {
    serialized.balance = obj.balance.toNumber();
  }

   if (obj.amount) {
    serialized.amount = obj.amount.toNumber();
  }

  

  return serialized;
};

export async function getAccount(accountId) {
  const authResult = await auth();
  if (!authResult.userId) {
    console.error("[getAccount] No userId from auth()");
    throw new Error("User not authenticated");
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: authResult.userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const account = await db.account.findUnique({
    where: { id: accountId, userId: user.id },
    include: {
      transactions: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!account) {
    throw new Error("Account not found");
  }

  return serializeTransaction(account);
}

export async function updateDefaultAccount(accountId) {
  const authResult = await auth();
      console.log("[createAccount] auth() ->", authResult);
      try{
      const { userId } = authResult;
      if (!userId) {
        console.error("[createAccount] No userId from auth()");
        throw new Error("User not authenticated");
      }

      const user = await db.user.findUnique({
        where: { clerkUserId: userId },
      });

      if (!user) {
        throw new Error("User not found");
      }

      await db.account.updateMany({
        where: { userId: user.id, isDefault: true },
        data: { isDefault: false },
      });

      const account = await db.account.update({
        where: { id: accountId, userId: user.id },
        data: { isDefault: true },
      });

      revalidatePath("/dashboard");
      return {success:true, data: serializeTransaction(account)};
    }catch(error){
      console.error("Error in updateDefaultAccount:", error);
      return {success:false, error: error.message};
    }
}

export async function getAccountWithTransactions(accountId) {
  const authResult = await auth();
  if (!authResult.userId) {
    console.error("[getAccount] No userId from auth()");
    throw new Error("User not authenticated");
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: authResult.userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const account = await db.account.findUnique({
    where: { id: accountId, userId: user.id },
    include: {
      transactions: {
        orderBy: { date: "desc" },
      },
      _count: {
        select: { transactions: true },
      },
    },
  });
  if (!account) return null;

  return {...serializeTransaction(account), transactions: account.transactions.map(serializeTransaction) };
}

export async function bulkDeleteTransactions(transactionIds) {
  try {
  const authResult = await auth();
  if (!authResult.userId) {
    console.error("[bulkDeleteTransactions] No userId from auth()");
    throw new Error("User not authenticated");
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: authResult.userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const transactions = await db.transaction.findMany({
    where: {
      id: { in: transactionIds },
      userId: user.id,
    },
  });

  const accountBalanceChanges = transactions.reduce((acc, transaction) => {
    const change = transaction.type ==="EXPENSE" ? -transaction.amount : transaction.amount;
    acc[transaction.accountId] = (acc[transaction.accountId] || 0) + change;
    return acc;
  },{});

  await db.$transaction(async(tx) => {
      await tx.transaction.deleteMany({
        where: {
          id: { in: transactionIds },
          userId: user.id,
        },
      });

    for(const [accountId, balanceChange] of Object.entries(accountBalanceChanges)){
      await tx.account.update({
        where: { id: accountId, userId: user.id },
        data: {
          balance: {
            increment: balanceChange,
          },
        },
      });
    }
  });
  
  revalidatePath("/dashboard");
  revalidatePath("/transaction");
   

  return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
