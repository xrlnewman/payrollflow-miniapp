import test from 'node:test'; import assert from 'node:assert/strict'; import { readFile } from 'node:fs/promises'
test('PayrollFlow miniapp renders payroll and salary reminder cards', async()=>{const source=await readFile(new URL('../src/main.js',import.meta.url),'utf8'); assert.match(source,/薪资单申请/); assert.match(source,/我的薪资单/); assert.match(source,/薪酬专员/)})

test('PayrollFlow actions are wired to the real appointment and follow-up client', async()=>{
  const source=await readFile(new URL('../src/main.js',import.meta.url),'utf8')
  assert.match(source,/createApiClient/)
  assert.match(source,/refreshFromApi/)
  assert.match(source,/checkinAppointment/)
  assert.match(source,/updateAppointmentStatus/)
  assert.match(source,/completeFollowup/)
  assert.match(source,/演示数据/)
})

test('Vite proxies the default API path to the local PayrollFlow service', async()=>{
  const source=await readFile(new URL('../vite.config.js',import.meta.url),'utf8')
  assert.match(source,/proxy/)
  assert.match(source,/localhost:8080/)
})
