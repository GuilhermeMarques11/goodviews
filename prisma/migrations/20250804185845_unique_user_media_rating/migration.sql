/*
  Warnings:

  - A unique constraint covering the columns `[userId,mediaId,mediaType]` on the table `Rating` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Rating_userId_mediaId_mediaType_key" ON "Rating"("userId", "mediaId", "mediaType");
