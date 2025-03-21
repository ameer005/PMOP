-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('Folder', 'Video');

-- CreateTable
CREATE TABLE "Item" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "parentId" BIGINT,
    "type" "ItemType" NOT NULL,
    "path" TEXT NOT NULL,
    "size" BIGINT,
    "duration" INTEGER,
    "resolution" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Item_path_key" ON "Item"("path");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
