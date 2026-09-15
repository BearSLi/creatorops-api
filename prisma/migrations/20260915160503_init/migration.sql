-- CreateTable
CREATE TABLE "creators" (
    "id" SERIAL NOT NULL,
    "nickname" VARCHAR(50) NOT NULL,
    "platform" VARCHAR(20) NOT NULL,
    "followers" INTEGER NOT NULL DEFAULT 0,
    "status" VARCHAR(20) NOT NULL DEFAULT '洽谈中',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "creators_pkey" PRIMARY KEY ("id")
);
