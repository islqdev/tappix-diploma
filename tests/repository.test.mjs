import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const root = fileURLToPath(new URL('../', import.meta.url));
const tracked = execFileSync('git', ['ls-files', '-z'], { cwd: root, encoding: 'utf8' })
  .split('\0').filter(Boolean);
const reportExports = new Set([
  'docs/report/en/Tappix-Pre-Defense-Report-EN.pdf',
  'docs/report/en/Tappix-Pre-Defense-Report-EN.docx',
]);
const forbiddenArtifact = /(^|\/)(secrets|backups|uploads|node_modules|\.next)(\/|$)|\.(pem|key|p12|pfx|dump|db|sqlite3?|docx|pdf|zip|tar(?:\.gz)?|sql\.gz)$/i;
const isForbiddenArtifact = (name) => forbiddenArtifact.test(name) && !reportExports.has(name);

test('required project areas exist and are documented', () => {
  for (const area of [
    'backend', 'frontend', 'docs/proposal', 'docs/literature', 'docs/comparisons',
    'docs/requirements', 'diagrams', 'tests', 'infra/docker', 'infra/nginx',
  ]) {
    assert.ok(statSync(path.join(root, area)).isDirectory(), area);
    assert.ok(readFileSync(path.join(root, area, 'README.md'), 'utf8').trim(), area);
  }
  assert.ok(existsSync(path.join(root, 'docs/ADR/0001-modular-monolith.md')));
});

test('tracked files exclude common sensitive artifacts', () => {
  for (const name of tracked) {
    assert.ok(!isForbiddenArtifact(name), `Forbidden tracked artifact: ${name}`);
    const base = path.basename(name);
    assert.ok(!base.startsWith('.env') || base === '.env.example', `Environment file: ${name}`);
  }
});

test('report exception never allows unrelated documents or sensitive artifacts', () => {
  for (const name of [
    'customer.pdf', 'student-application.docx', 'docs/report/en/customer.pdf',
    'docs/report/en/Tappix-Pre-Defense-Report-EN.pdf.zip',
    'backups/Tappix-Pre-Defense-Report-EN.pdf', 'infra/secrets/session.key',
    'docs/report/en/nested/Tappix-Pre-Defense-Report-EN.docx',
  ]) assert.ok(isForbiddenArtifact(name), name);
  for (const name of reportExports) assert.equal(isForbiddenArtifact(name), false, name);
});

test('reviewed report exports match the checked-in integrity manifest', () => {
  const manifest = JSON.parse(readFileSync(path.join(root, 'docs/report/en/manifest.json'), 'utf8'));
  assert.deepEqual(Object.keys(manifest.files).sort(), [...reportExports].sort());
  for (const name of reportExports) {
    assert.ok(tracked.includes(name), `Report not tracked: ${name}`);
    const data = readFileSync(path.join(root, name));
    assert.ok(data.length > 1000 && data.length < 10 * 1024 * 1024, name);
    assert.equal(data.subarray(0, name.endsWith('.pdf') ? 5 : 2).toString(), name.endsWith('.pdf') ? '%PDF-' : 'PK');
    assert.equal(createHash('sha256').update(data).digest('hex'), manifest.files[name], name);
  }
});

test('ignore rules reject secrets and backups but allow examples and migrations', () => {
  const ignored = [
    '.env', 'backend/.env.local', 'infra/secrets/session.key', 'backups/db.dump',
    'frontend/node_modules/package/index.js', 'student-application.docx',
    'docs/report/en/customer.pdf', 'docs/report/en/customer.docx',
  ];
  const allowed = ['.env.example', 'backend/.env.example', 'backend/migrations/001_initial.sql', ...reportExports];
  for (const name of ignored) {
    execFileSync('git', ['check-ignore', '--no-index', '-q', name], { cwd: root });
  }
  for (const name of allowed) {
    assert.throws(
      () => execFileSync('git', ['check-ignore', '--no-index', '-q', name], { cwd: root }),
      (error) => error.status === 1,
      `Required source must not be ignored: ${name}`,
    );
  }
});

test('local Markdown links resolve inside the repository', () => {
  for (const name of tracked.filter((item) => item.endsWith('.md'))) {
    const content = readFileSync(path.join(root, name), 'utf8');
    for (const match of content.matchAll(/\[[^\]]+\]\(([^\s)]+)\)/g)) {
      const href = match[1];
      if (/^(https?:|mailto:|#)/.test(href)) continue;
      const target = path.resolve(root, path.dirname(name), decodeURIComponent(href.split('#')[0]));
      const relative = path.relative(root, target);
      assert.ok(relative !== '..' && !relative.startsWith(`..${path.sep}`), `${name}: outside link`);
      assert.ok(existsSync(target), `${name}: broken local link ${href}`);
    }
  }
});

test('tracked text files follow basic whitespace conventions', () => {
  for (const name of tracked.filter((item) => /\.(md|mjs|ya?ml)$/.test(item))) {
    const content = readFileSync(path.join(root, name), 'utf8');
    assert.ok(content.endsWith('\n'), `${name}: missing final newline`);
    assert.ok(!/\r/.test(content), `${name}: CR line endings`);
    assert.ok(!/[\t ]+$/m.test(content), `${name}: trailing whitespace`);
  }
});
