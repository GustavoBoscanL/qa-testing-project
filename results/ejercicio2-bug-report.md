---
name: "API endpoint /v1/qa/test2 returns 500 Internal Server Error"
about: Create a report to help us improve
title: ''
labels: 'bug, api, server-error'
assignees: ''
---

### Environment

URL: https://echo-serv.tbxnet.com/v1/qa/test2
Stage: qa

No screenshot required (API endpoint)

### Logs

```
[ERROR] Failed to load resource: the server responded with a status of 500 () @ https://echo-serv.tbxnet.com/v1/qa/test2:0
```

### Network Requests

```
Request:
GET https://echo-serv.tbxnet.com/v1/qa/test2
Status: 500 Internal Server Error

Response Body:
{
  "code": "SYS-ERR",
  "message": "An Error", 
  "details": "SYSTEM_ERROR",
  "status": 500
}
```

### Browser Metadata

| Field      | Value                                    |
|------------|------------------------------------------|
| Browser    | Chrome                                   |
| Version    | 142.0.7444.163 (Official Build) (64-bit) |
| Dimensions | 1280x720                                 |
| User Agent | Mozilla/5.0                              |

### Device Metadata

| Field      | Value            |
|------------|------------------|
| Device     | Windows PC       |
| Dimensions | 1280x720         |
| OS         | Windows 11 Pro N |
| ...        | ...              |

### User Data

| Field      | Value                                                         |
|------------|---------------------------------------------------------------|
| Id         | N/A                                                           |
| Local Time | Sun Nov 16 2025 23:11:49 GMT-0300 (Argentina Standard Time)   |
| Session    | N/A                                                           |
| ...        | ...                                                           |

### Custom Data

| Field      | Value                    |
|------------|--------------------------|
| Test Type  | API Endpoint             |
| Expected   | 200 OK                   |
| Actual     | 500 Error                |
| Comparison | test1 works, test2 fails |