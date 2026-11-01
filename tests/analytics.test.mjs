import { test } from "node:test";
import assert from "node:assert/strict";
import { sanitizeAnalyticsUrl } from "../lib/analytics.ts";
test("measurement URL context never includes form-like query parameters or fragments", () => {
  assert.equal(
    sanitizeAnalyticsUrl(
      "https://www.eaccjardines.com/contacto?email=personal@example.com&service=3#phone",
    ),
    "https://www.eaccjardines.com/contacto",
  );
  assert.equal(
    sanitizeAnalyticsUrl("https://www.google.com/search?q=private+query"),
    "https://www.google.com/search",
  );
});
test("empty, malformed and non-web referrers are not sent to analytics", () => {
  assert.equal(sanitizeAnalyticsUrl(""), "");
  assert.equal(sanitizeAnalyticsUrl("invalid"), "");
  assert.equal(sanitizeAnalyticsUrl("javascript:alert(1)"), "");
});
