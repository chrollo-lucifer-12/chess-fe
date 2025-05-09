/*
  Warnings:

  - You are about to drop the column `player1` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `player2` on the `Game` table. All the data in the column will be lost.
  - Added the required column `turnNumber` to the `Move` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MoveType" AS ENUM ('NORMAL', 'CASTLING_KINGSIDE', 'CASTLING_QUEENSIDE', 'PROMOTION');

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "player1",
DROP COLUMN "player2",
ADD COLUMN     "playerId1" TEXT,
ADD COLUMN     "playerId2" TEXT;

-- AlterTable
ALTER TABLE "Move" ADD COLUMN     "moveType" "MoveType" NOT NULL DEFAULT 'NORMAL',
ADD COLUMN     "promotion" TEXT,
ADD COLUMN     "turnNumber" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_playerId1_fkey" FOREIGN KEY ("playerId1") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_playerId2_fkey" FOREIGN KEY ("playerId2") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;
