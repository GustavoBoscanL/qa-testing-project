# Bugs Encontrados

Este archivo documenta los bugs encontrados durante las pruebas automatizadas.

> **Nota:** Este archivo se completará durante la ejecución de los ejercicios.

## Bugs de UI

_Se documentarán aquí los bugs encontrados en la interfaz de usuario._

## Bugs de API

### Bug #1: API endpoint /v1/qa/test2 returns 500 Internal Server Error

**Severidad:** Alta
**Prioridad:** Alta
**Componente:** API

**Descripción:**
El endpoint `/v1/qa/test2` de la API `https://echo-serv.tbxnet.com` está devolviendo un error 500 Internal Server Error de manera consistente.

**Pasos para Reproducir:**
1. Navegar a `https://echo-serv.tbxnet.com/v1/qa/test2`
2. Realizar petición GET al endpoint

**Resultado Esperado:**
Respuesta exitosa (200 OK) con datos válidos, similar al endpoint `/v1/qa/test1`

**Resultado Actual:**
Error 500 con respuesta JSON:
```json
{
  "code": "SYS-ERR",
  "message": "An Error",
  "details": "SYSTEM_ERROR", 
  "status": 500
}
```

**Evidencia:**
- Ver `ejercicio2-bug-report.md` para detalles completos
- Console error: Failed to load resource: the server responded with a status of 500

**Ambiente:**
- Navegador: Chrome 142.0.7444.163 (Official Build) (64-bit)
- OS: Windows 11 Pro N
- Fecha: Sun Nov 16 2025

**Estado:** Reportado - Pendiente de corrección por equipo de backend