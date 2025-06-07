-- CreateTable
CREATE TABLE "BoardsGroup" (
    "id" SERIAL NOT NULL,
    "designers" TEXT[],
    "editors" TEXT[],
    "productions" TEXT[],
    "operators" TEXT[],

    CONSTRAINT "BoardsGroup_pkey" PRIMARY KEY ("id")
);
