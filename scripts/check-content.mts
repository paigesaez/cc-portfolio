// Parses every content entry with the same rules the Keystatic editor uses. Runs before every build so an entry that would error in the editor fails the deploy instead.
import { createReader } from '@keystatic/core/reader';
import config from '../keystatic.config';
const reader = createReader(process.cwd(), config);
let bad=0;
for (const [name, coll] of Object.entries(reader.collections)) {
  const slugs = await (coll as any).list();
  for (const slug of slugs) {
    try { const e = await (coll as any).readOrThrow(slug,{resolveLinkedFiles:true}); const b = typeof e.body==='function'?await e.body():e.body; console.log('ok  ',name,slug,'nodes',JSON.stringify(b).length); }
    catch(err){ bad++; console.log('FAIL',name,slug,String(err).split('\n')[0]); }
  }
}
for (const [name, s] of Object.entries(reader.singletons||{})) {
  try { await (s as any).readOrThrow({resolveLinkedFiles:true}); console.log('ok   singleton',name);} catch(err){bad++;console.log('FAIL singleton',name,String(err).split('\n')[0]);}
}
console.log(bad?`${bad} FAILING`:'ALL ENTRIES PARSE'); if (bad) process.exit(1);
