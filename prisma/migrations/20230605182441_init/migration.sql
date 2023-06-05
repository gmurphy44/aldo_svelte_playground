-- CreateTable
CREATE TABLE "Store" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Shoe" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "model" TEXT NOT NULL,
    "inventory" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "ShoesAtStore" (
    "storeId" INTEGER NOT NULL,
    "shoeId" INTEGER NOT NULL,
    "updatedAt" DATETIME NOT NULL,

    PRIMARY KEY ("storeId", "shoeId"),
    CONSTRAINT "ShoesAtStore_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ShoesAtStore_shoeId_fkey" FOREIGN KEY ("shoeId") REFERENCES "Shoe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Store_name_key" ON "Store"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Shoe_model_key" ON "Shoe"("model");
