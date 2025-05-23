import { eq } from "drizzle-orm";

import { Transaction } from "../common";
import * as Users from "../schemas/users";

export type Type = Users.Type;

export async function insert(
  txn: Transaction,
  args: Users.CreateValues,
): Promise<Users.Type> {
  const [user] = await txn.insert(Users.Table).values(args).returning();
  return user;
}

export async function getById(
  txn: Transaction,
  args: { id: string },
): Promise<Users.Type> {
  const [user] = await txn
    .select()
    .from(Users.Table)
    .where(eq(Users.Table.id, args.id));
  return user;
}

export async function updateById(
  txn: Transaction,
  args: {
    id: string;
    updateValues: Users.UpdateValues;
  },
): Promise<Users.Type> {
  const [user] = await txn
    .update(Users.Table)
    .set(args.updateValues)
    .where(eq(Users.Table.id, args.id))
    .returning();
  return user;
}

export async function deleteById(
  txn: Transaction,
  args: { id: string },
): Promise<void> {
  await txn.delete(Users.Table).where(eq(Users.Table.id, args.id));
}
