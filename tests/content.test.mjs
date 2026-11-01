import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
const content = JSON.parse(
  readFileSync(new URL("../data/content.json", import.meta.url)),
);
test("todos los contenidos enlazan a imágenes locales disponibles", () => {
  for (const item of [...content.services, ...content.projects]) {
    assert.ok(item.title.trim());
    assert.ok(item.description.trim());
    assert.ok(item.image.startsWith("assets/"));
    assert.ok(
      existsSync(new URL("../public/" + item.image, import.meta.url)),
      item.image,
    );
  }
});
