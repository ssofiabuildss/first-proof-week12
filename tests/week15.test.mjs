import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const src=readFileSync(new URL('../app/launch/page.tsx',import.meta.url),'utf8');
const css=readFileSync(new URL('../app/launch/launch.css',import.meta.url),'utf8');
const pdf=readFileSync(new URL('../public/week15/guia-privada-v1.pdf',import.meta.url));
test('six concepts and four carousel panels',()=>{for(let n=1;n<=6;n++) assert.ok(src.includes(`Concepto ${n} ·`));assert.equal((src.match(/className="fppanel"/g)||[]).length,4)});
test('finished assets, fictional demonstration, working anchor targets',()=>{for(const id of ['asset1','asset3','asset5','ejemplo']) assert.ok(src.includes(`id="${id}"`)); for(const [,id] of src.matchAll(/href="#([^"]+)"/g)) assert.ok(src.includes(`id="${id}"`));assert.match(src,/<details>/);assert.match(src,/Resultado ficticio/)});
test('no public form, storage, network writes or obvious secret markers in new source',()=>{assert.doesNotMatch(src,/<(?:input|form|textarea)\b|localStorage|fetch\(|service_role|process\.env|api[_-]?key/i);assert.match(src,/habilidades y autenticidad no verificadas/)});
test('PDF signature and download target',()=>{assert.equal(pdf.subarray(0,5).toString(),'%PDF-');assert.match(src,/\/week15\/guia-privada-v1\.pdf/);assert.match(src,/download/)});
test('responsive rules present (source check only)',()=>{assert.match(css,/@media\(max-width:600px\)/);assert.match(css,/overflow-x:auto/)});

test('P15-01 fictional interview answer and safeguards',()=>{
  assert.ok(src.includes('Así podrías explicarlo en una entrevista'));
  assert.ok(src.includes('Pregunta del entrevistador:'));
  assert.ok(src.includes('Cuéntame sobre un proyecto universitario'));
  assert.ok(src.includes('Después — ejemplo de respuesta'));
  assert.ok(src.includes('Durante la universidad participé'));
  assert.ok(src.includes('Mi aportación fue organizar los datos'));
  assert.ok(src.includes('hoja de cálculo y análisis descriptivo'));
  assert.ok(src.includes('presentación y la tabla de resultados'));
  assert.ok(src.includes('Describe únicamente tu aportación'));
  assert.ok(src.includes('evita compartir información confidencial'));
  assert.ok(src.includes('FIRST-PROOF organiza información; no verifica ni certifica habilidades.'));
});
