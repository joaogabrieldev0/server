ALTER TABLE "audio_chuncks" ADD COLUMN "transcription" text NOT NULL;--> statement-breakpoint
ALTER TABLE "audio_chuncks" ADD COLUMN "embbeddings" vector(768) NOT NULL;