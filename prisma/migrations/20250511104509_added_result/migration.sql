-- CreateEnum
CREATE TYPE "GameResult" AS ENUM ('DRAW', 'CHECKMATE', 'RESIGN', 'STALEMATE');

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "result" "GameResult",
ADD COLUMN     "winner" TEXT;
