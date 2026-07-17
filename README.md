# PayrollFlow Miniapp

薪酬绩效运营移动端，覆盖薪资周期查看、个人薪资单、绩效结果、调整项确认和反馈提交。演示数据均为虚构，不接入真实人事或薪资隐私。

## 本地运行

```bash
npm install
npm run dev
```

开发服务器默认把 `/api/*` 代理到 `http://localhost:8080`，与同目录的 `payrollflow-admin/server` 默认端口一致。也可以通过环境变量修改：

```bash
VITE_API_PROXY_TARGET=http://localhost:8088 npm run dev
```

## API 与状态同步

页面默认请求 `/api/v1`，生产环境可通过 `VITE_API_BASE_URL` 指向独立的 PayrollFlow API 服务。所有写操作会自动生成 `Idempotency-Key`，避免重复薪资单、重复确认和重复完成回访。

- 薪资单：`GET/POST /api/v1/appointments`
- 确认：`POST /api/v1/appointments/:id/checkin`
- 状态流转：`POST /api/v1/appointments/:id/status`，支持“已确认→候诊中→处理中→已完成”
- 回访：`GET/POST /api/v1/followups`、`POST /api/v1/followups/:id/complete`

接口不可用或返回错误时，移动端会保留并继续展示内置演示数据，同时标记当前数据来源，方便离线预览。

## 验证

```bash
npm test
npm run build
```

## 运行范围

PayrollFlow 移动端与对应 Admin/API 通过同一套幂等接口联动，员工和主管可在移动端查看周期、确认调整并提交反馈。

