-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PLACED', 'CANCELLED', 'SHIPPED', 'DELIVERED');

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medicines" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "medicines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "medicines" JSONB NOT NULL,
    "total_amount" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'PLACED',

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "ratings" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "categories_id_idx" ON "categories"("id");

-- CreateIndex
CREATE INDEX "medicines_id_idx" ON "medicines"("id");

-- CreateIndex
CREATE INDEX "medicines_user_id_idx" ON "medicines"("user_id");

-- CreateIndex
CREATE INDEX "orders_id_idx" ON "orders"("id");

-- CreateIndex
CREATE INDEX "orders_user_id_idx" ON "orders"("user_id");

-- CreateIndex
CREATE INDEX "reviews_id_idx" ON "reviews"("id");

-- AddForeignKey
ALTER TABLE "medicines" ADD CONSTRAINT "medicines_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medicines" ADD CONSTRAINT "medicines_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
