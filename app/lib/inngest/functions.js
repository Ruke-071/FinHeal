import { inngest } from "./client";
import { db } from "@/lib/prisma";
import { TransactionType } from "@/generated/prisma/enums";

export const checkBudgetAlert = inngest.createFunction(
  { name: "CheckBudgetAlert" },
  { cron: "0 */6 * * *" }, // every 6 hours
  async ({ step }) => {

    const budgets = await step.run("Fetch Budgets", async () => {
      try {
        console.log("[CheckBudgetAlert] Starting to fetch budgets...");
        const result = await db.budget.findMany({
          include: {
            user: {
              include: {
                accounts: {
                  where: { isDefault: true },
                },
              },
            },
          },
        });
        console.log(`[CheckBudgetAlert] Found ${result.length} budgets`);
        if (result.length > 0) {
          console.log(`[CheckBudgetAlert] Budget IDs: ${result.map(b => b.id).join(', ')}`);
          result.forEach(budget => {
            console.log(`[CheckBudgetAlert] Budget ${budget.id}: userId=${budget.userId}, user exists=${!!budget.user}, default accounts=${budget.user?.accounts?.length || 0}`);
          });
        }
        return result;
      } catch (error) {
        console.error("[CheckBudgetAlert] Error fetching budgets:", error);
        console.error("[CheckBudgetAlert] Error stack:", error.stack);
        throw error;
      }
    });

    if (!budgets || budgets.length === 0) {
      console.log("[CheckBudgetAlert] No budgets found to check");
      return;
    }

    for (const budget of budgets) {
      if (!budget.user) {
        console.log(`[CheckBudgetAlert] Budget ${budget.id} has no user, skipping`);
        continue;
      }

      const defaultAccount = budget.user.accounts?.[0];

      if (!defaultAccount) {
        console.log(
          `[CheckBudgetAlert] No default account for user ${budget.user.id}, skipping budget ${budget.id}`
        );
        continue;
      }

      await step.run(`Check Budget ${budget.id}`, async () => {
        const startDate = new Date();
        startDate.setDate(1);

        const expenses = await db.transaction.aggregate({
          where: {
            userId: budget.userId,
            accountId: defaultAccount.id,
            type: TransactionType.EXPENSE,
            date: {
              gte: startDate,
            },
          },
          _sum: {
            amount: true,
          },
        });

        const totalExpense = expenses._sum.amount?.toNumber() || 0;
        const budgetLimit = typeof budget.amount === 'object' && budget.amount?.toNumber 
          ? budget.amount.toNumber() 
          : Number(budget.amount);
        const usagePercentage = budgetLimit > 0 ? (totalExpense / budgetLimit) * 100 : 0;
        console.log(
          `Budget ${budget.id} usage: ${usagePercentage.toFixed(2)}%`
        );
        if (
          usagePercentage >= 80 &&
          (!budget.lastAlertSent ||
            isNewMonth(budget.lastAlertSent, new Date()))
        ) {
          // TODO: Send alert (email / notification)
          console.log(usagePercentage.toFixed(2) ,budget.lastAlertSent);
          await db.budget.update({
            where: { id: budget.id },
            data: { lastAlertSent: new Date() },
          });
        }
      });
    }
  }
);

function isNewMonth(lastAlertDate, currentDate) {
  return (
    lastAlertDate.getFullYear() !== currentDate.getFullYear() ||
    lastAlertDate.getMonth() !== currentDate.getMonth()
  );
}
