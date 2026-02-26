-- CreateEnum
CREATE TYPE "userRole" AS ENUM ('ADMIN', 'SELLER', 'CUSTOMER');

-- CreateEnum
CREATE TYPE "userStatus" AS ENUM ('ACTIVE', 'BANNED');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "role" "userRole" NOT NULL DEFAULT 'CUSTOMER',
ADD COLUMN     "status" "userStatus" NOT NULL DEFAULT 'ACTIVE';
