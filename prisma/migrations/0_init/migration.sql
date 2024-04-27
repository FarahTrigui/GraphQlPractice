-- CreateTable
CREATE TABLE "cv" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "firstname" VARCHAR NOT NULL,
    "age" INTEGER NOT NULL,
    "cin" INTEGER NOT NULL,
    "job" VARCHAR NOT NULL,
    "path" VARCHAR NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "PK_4ddf7891daf83c3506efa503bb8" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skill" (
    "id" SERIAL NOT NULL,
    "designation" VARCHAR NOT NULL,

    CONSTRAINT "PK_a0d33334424e64fb78dc3ce7196" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skill_cvs_cv" (
    "skillId" INTEGER NOT NULL,
    "cvId" INTEGER NOT NULL,

    CONSTRAINT "PK_558137b2117bfdadb13c04ae40b" PRIMARY KEY ("skillId","cvId")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,

    CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "IDX_0b05d8baaa2f76a65859ba804a" ON "skill_cvs_cv"("skillId");

-- CreateIndex
CREATE INDEX "IDX_59bbaafd7773d6b9bc4b5358f8" ON "skill_cvs_cv"("cvId");

-- AddForeignKey
ALTER TABLE "cv" ADD CONSTRAINT "FK_e4b7330e64fd0ecce86720e62f9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "skill_cvs_cv" ADD CONSTRAINT "FK_0b05d8baaa2f76a65859ba804ad" FOREIGN KEY ("skillId") REFERENCES "skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skill_cvs_cv" ADD CONSTRAINT "FK_59bbaafd7773d6b9bc4b5358f82" FOREIGN KEY ("cvId") REFERENCES "cv"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

