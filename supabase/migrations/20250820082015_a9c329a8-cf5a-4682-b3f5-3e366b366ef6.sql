-- Rendre la colonne pain_injuries nullable dans personal_training_requests
ALTER TABLE personal_training_requests ALTER COLUMN pain_injuries DROP NOT NULL;