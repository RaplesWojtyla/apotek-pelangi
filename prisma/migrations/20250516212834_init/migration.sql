/*
  Warnings:

  - The values [USER] on the enum `LevelUser` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LevelUser_new" AS ENUM ('ADMIN', 'KASIR', 'CUSTOMER');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "LevelUser_new" USING ("role"::text::"LevelUser_new");
ALTER TYPE "LevelUser" RENAME TO "LevelUser_old";
ALTER TYPE "LevelUser_new" RENAME TO "LevelUser";
DROP TYPE "LevelUser_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'CUSTOMER';
COMMIT;

-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'CUSTOMER',
ALTER COLUMN "status" SET DEFAULT 'AKTIF';

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Session";
