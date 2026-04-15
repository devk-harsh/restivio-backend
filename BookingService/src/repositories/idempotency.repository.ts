import logger from "../config/logger.config";
import IdempotencyKey from "../db/models/idempotencyKey";
import { Transaction } from "sequelize";
import {validate as isValidUUID} from "uuid";
import { NotFoundError } from "../utils/errors/app.error";

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

export async function getIdempotencyKeyWithLock(
  idemKey: string,
  transaction: Transaction
) {
  if (!isValidUUID(idemKey)) {
    logger.error(`Invalid idempotency key format: ${idemKey}`);
    throw new Error("Invalid idempotency key format");
  }
  const idempotencyKey = await IdempotencyKey.findOne({
    where: { idemKey },
    transaction,
    lock: transaction.LOCK.UPDATE
  });

  if(!idempotencyKey) {
    throw new NotFoundError("Idempotency key not found");
  }
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