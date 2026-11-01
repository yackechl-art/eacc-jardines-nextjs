import { test } from "node:test";
import assert from "node:assert/strict";
import { buildWhatsAppUrl, PHONE } from "../lib/whatsapp.ts";

test("prepara una consulta completa conservando tildes, caracteres especiales y saltos de línea", () => {
  const url = new URL(
    buildWhatsAppUrl(
      "Podas y talas de árboles y palmeras",
      " Córdoba, Córdoba ",
      " Revisión de árboles & riego\nZona de entrada ",
    ),
  );
  assert.equal(url.origin, "https://wa.me");
  assert.equal(url.pathname, "/" + PHONE);
  assert.equal(
    url.searchParams.get("text"),
    "Hola, EACC Jardines. Me gustaría pedir un presupuesto sin compromiso.\n\nServicio: Podas y talas de árboles y palmeras\nLocalidad: Córdoba, Córdoba\nDetalles: Revisión de árboles & riego\nZona de entrada",
  );
  assert.equal([...url.searchParams.keys()].length, 1);
});

test("permite omitir la descripción sin añadir una línea vacía de detalles", () => {
  const message = new URL(
    buildWhatsAppUrl("Sistemas de riego", "Sevilla", "  "),
  ).searchParams.get("text");
  assert.ok(!message.includes("Detalles:"));
  assert.ok(message.endsWith("Localidad: Sevilla"));
});

test("impide consultas sin servicio o sin localidad", () => {
  assert.throws(() => buildWhatsAppUrl(" ", "Sevilla"));
  assert.throws(() => buildWhatsAppUrl("Riego", "   "));
});
