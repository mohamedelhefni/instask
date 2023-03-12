-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "object" TEXT NOT NULL,
    "actorId" INTEGER NOT NULL,
    "group" TEXT NOT NULL,
    "actionId" INTEGER NOT NULL,
    "targetId" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "occurred_at" TIMESTAMP(3) NOT NULL,
    "metadata" JSONB NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Action" (
    "id" SERIAL NOT NULL,
    "object" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "Action"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
