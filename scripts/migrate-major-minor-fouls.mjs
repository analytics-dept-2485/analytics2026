#!/usr/bin/env node
/**
 * Add majorfouls/minorfouls to dcmp2026 and migrate legacy `fouls` if present.
 * Run from repo root: node analytics2026/scripts/migrate-major-minor-fouls.mjs
 * Uses analytics2026/.env.local (POSTGRES_URL or DATABASE_URL).
 */
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import pkg from 'pg';
const { Client } = pkg;

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const envPath = join(rootDir, '.env.local');

try {
  const envContent = readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach((line) => {
    const m = line.match(/^\s*([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, '');
  });
} catch {
  console.warn('No .env.local found, using existing process.env');
}

const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;
if (!connectionString) {
  console.error('Missing POSTGRES_URL or DATABASE_URL in .env.local');
  process.exit(1);
}

const client = new Client({ connectionString });
await client.connect();
try {
  await client.query(
    'ALTER TABLE dcmp2026 ADD COLUMN IF NOT EXISTS majorfouls INTEGER DEFAULT 0;'
  );
  await client.query(
    'ALTER TABLE dcmp2026 ADD COLUMN IF NOT EXISTS minorfouls INTEGER DEFAULT 0;'
  );
  console.log('dcmp2026.majorfouls / minorfouls columns ensured.');

  const { rows } = await client.query(`
    SELECT column_name FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'dcmp2026' AND column_name = 'fouls'
  `);
  if (rows.length > 0) {
    await client.query(`
      UPDATE dcmp2026
      SET minorfouls = COALESCE(fouls, minorfouls, 0),
          majorfouls = COALESCE(majorfouls, 0)
    `);
    await client.query('ALTER TABLE dcmp2026 DROP COLUMN fouls;');
    console.log('Legacy fouls column copied into minorfouls (with COALESCE) and dropped.');
  } else {
    console.log('No legacy fouls column; skip data copy.');
  }
} finally {
  await client.end();
}
