-- CreateTable
CREATE TABLE "Board" (
    "id" SERIAL NOT NULL,
    "boardId" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "colorBoard" TEXT NOT NULL,

    CONSTRAINT "Board_pkey" PRIMARY KEY ("id")
);
