import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const root = fileURLToPath(new URL('../', import.meta.url));
const tracked = execFileSync('git', ['ls-files', '-z'], { cwd: root, encoding: 'utf8' })
  .split('\0').filter(Boolean);

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
  const forbidden = /(^|\/)(secrets|backups|uploads|node_modules|\.next)(\/|$)|\.(pem|key|p12|pfx|dump|db|sqlite3?|docx|pdf|zip|tar(?:\.gz)?|sql\.gz)$/i;
  for (const name of tracked) {
    assert.ok(!forbidden.test(name), `Forbidden tracked artifact: ${name}`);
    const base = path.basename(name);
    assert.ok(!base.startsWith('.env') || base === '.env.example', `Environment file: ${name}`);
  }
});

test('ignore rules reject secrets and backups but allow examples and migrations', () => {
  const ignored = [
    '.env', 'backend/.env.local', 'infra/secrets/session.key', 'backups/db.dump',
    'frontend/node_modules/package/index.js', 'student-application.docx',
  ];
  const allowed = ['.env.example', 'backend/.env.example', 'backend/migrations/001_initial.sql'];
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
