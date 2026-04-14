import logger from "../config/logger.config";
import IdempotencyKey from "../db/models/idempotencyKey";
import { Transaction } from "sequelize";

interface CreateIdempotencyKeyRepositoryDTO {
  idemKey: string;
  bookingId: number;
  finalized: boolean;
}

export async function createIdempotencyKey(
  data: CreateIdempotencyKeyRepositoryDTO,
  transaction: Transaction
) {
  const idempotencyKey = await IdempotencyKey.create(data, { transaction });
  logger.info(`Idempotency key created for booking ID: ${data.bookingId}`);
  return idempotencyKey;
}

export async function getIdempotencyKey(
  idemKey: string,
  transaction: Transaction
) {
  const idempotencyKey = await IdempotencyKey.findOne({
    where: { idemKey },
    transaction
  });
  return idempotencyKey;
}

export async function finalizeIdempotencyKey(
  idemKey: string,
  transaction: Transaction
) {
  const idempotencyKey = await IdempotencyKey.update(
    { finalized: true },
    { 
      where: { idemKey },
      transaction
    }
  );
  logger.info(`Idempotency key ${idemKey} finalized`);
  return idempotencyKey;
}