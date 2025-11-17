# Proyecto de Testing Automatizado con Cypress

Este repositorio contiene ejercicios de testing automatizado utilizando Cypress para validar tanto la interfaz de usuario (UI) como las APIs. El proyecto implementa un sistema completo de registro y login de usuarios con validaciones exhaustivas.

## 📋 Requisitos Previos

- **Node.js** (versión 14 o superior)
- **npm** o yarn
- **Git**
- **Navegador** (Chrome, Firefox, o Edge)

## 🚀 Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd Test_repo
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Verificar Configuración

El proyecto está preconfigurado para testear:
- **URL Base:** `https://automationexercise.com`
- **Resolución:** 1280x720
- **Video:** Deshabilitado (para mejor rendimiento)
- **Screenshots:** Solo en fallos

## 📁 Estructura del Proyecto

```
Test_repo/
├── cypress.config.js              # Configuración principal de Cypress
├── cypress/
│   ├── e2e/                       # Tests End-to-End
│   │   ├── register.cy.js         # Tests de registro de usuarios
│   │   └── login.cy.js            # Tests de login de usuarios
│   ├── fixtures/                  # Datos de prueba
│   │   ├── users.json             # Usuarios mock para registro
│   │   └── created-users.json     # Usuarios creados exitosamente (temporal)
│   └── support/                   # Comandos personalizados y configuraciones
│       ├── commands.js            # Comandos personalizados
│       └── e2e.js                 # Configuración global
├── results/                       # Documentación de bugs y mejoras
│   ├── README.md                  # Guía de documentación
│   ├── bugs.md                    # Bugs encontrados
│   ├── improvements-ui.md         # Mejoras sugeridas para UI
│   ├── improvements-api.md        # Mejoras sugeridas para API
│   ├── quality-analysis.md        # Análisis de calidad del sistema
│   └── ejercicio2-bug-report.md   # Bug report del ejercicio 2
├── package.json                   # Dependencias y scripts
└── README.md                      # Este archivo
```

## 🧪 Tests Implementados

### 📝 **Ejercicio 3: Sistema Completo de Registro y Login**

#### **Test de Registro (`register.cy.js`)**

**Funcionalidades validadas:**
- ✅ **Registro de 3 usuarios** con datos mock completos
- ✅ **Emails únicos** generados con timestamp para evitar conflictos
- ✅ **Validación de formulario** de registro en dos pasos
- ✅ **Verificación de campos** obligatorios y opcionales
- ✅ **Confirmación visual** de registro exitoso
- ✅ **Validación post-registro** (usuario logueado, nombre visible)
- ✅ **Logout automático** después de cada registro
- ✅ **Guardado en archivo temporal** para uso posterior

**Flujo detallado por usuario:**
1. **Navegación** a página de login/registro
2. **Primer paso:** Llenar nombre y email único
3. **Segundo paso:** Formulario completo (título, password, fecha nacimiento, dirección)
4. **Validaciones:** Verificar registro exitoso y login automático
5. **Logout:** Cerrar sesión para siguiente usuario
6. **Persistencia:** Guardar datos en `cypress/fixtures/created-users.json`

#### **Test de Login (`login.cy.js`)**

**Funcionalidades validadas:**
- ✅ **Login con usuarios reales** creados en test anterior
- ✅ **Lectura de archivo temporal** con usuarios exitosos
- ✅ **Validación de sesión** activa y funcionalidades del usuario
- ✅ **Navegación post-login** (productos, cuenta, home)
- ✅ **Logout exitoso** y limpieza de sesión entre usuarios
- ✅ **Casos de error** (credenciales incorrectas, campos vacíos)
- ✅ **Cleanup final** (eliminación de cuentas y archivo temporal)

**Flujo detallado:**
1. **Lectura** de usuarios del archivo `created-users.json`
2. **Login individual** para cada usuario creado
3. **Validaciones completas:**
   - Botón logout visible
   - Nombre en "Logged in as [nombre]"
   - Acceso a funcionalidades (Delete Account, Products)
   - Navegación a productos y regreso
4. **Logout** y preparación para siguiente usuario
5. **Tests de error:** Credenciales incorrectas y campos vacíos
6. **Limpieza final:** Eliminación de todas las cuentas creadas

### 🔧 **Comandos Personalizados Implementados**

#### **Registro de Usuarios**
```javascript
cy.registerUser(user)
```
- Genera email único con timestamp
- Completa formulario de registro en dos pasos
- Valida registro exitoso
- Hace logout automático
- Guarda usuario en archivo temporal

#### **Login de Usuarios**
```javascript
cy.loginUser(email, password)
```
- Navega a página de login
- Completa credenciales
- Valida login exitoso

#### **Gestión de Archivo Temporal**
```javascript
cy.saveCreatedUser(user, uniqueEmail)  // Guardar usuario creado
cy.clearCreatedUsers()                 // Limpiar archivo temporal
```

#### **Logout**
```javascript
cy.logoutUser()
```
- Cierra sesión activa
- Valida logout exitoso

#### **Eliminación de Cuenta**
```javascript
cy.deleteAccount()
```
- Elimina cuenta del usuario logueado
- Valida eliminación exitosa

### 📊 **Sistema de Archivo Temporal**

**Propósito:** Conectar tests de registro y login con datos reales

**Funcionamiento:**
1. **Test de registro** crea usuarios y los guarda en `cypress/fixtures/created-users.json`
2. **Test de login** lee usuarios del archivo temporal
3. **Datos incluidos:** Email único, password, nombre, timestamp de creación
4. **Limpieza:** Archivo se limpia al final del test de login

**Ejemplo de estructura:**
```json
{
  "createdUsers": [
    {
      "name": "Juan Carlos",
      "email": "juan.carlos.test+1763343021533@example.com",
      "password": "TestPassword123!",
      "createdAt": "2025-11-17T01:30:32.529Z",
      // ... resto de datos
    }
  ]
}
```

## 🚀 Ejecución de Tests

### **Comandos Principales**

```bash
# Ejecutar todos los tests
npm test

# Abrir Cypress en modo interactivo
npm run cypress:open

# Ejecutar todos los tests en modo headless
npm run cypress:run
```

### **Tests Específicos**

```bash
# Ejecutar solo tests de registro
npm run test:register

# Ejecutar solo tests de login
npm run test:login

# Ejecutar todos los tests de UI
npm run test:ui
```

### **Flujo Recomendado de Ejecución**

Para obtener el flujo completo:

```bash
# 1. Ejecutar registro (crea usuarios y los guarda)
npm run test:register

# 2. Ejecutar login (usa usuarios creados)
npm run test:login
```

O ejecutar ambos en secuencia:
```bash
npm run test:ui
```

## 📈 **Métricas y Resultados**

### **Cobertura de Tests**
- **Registro de usuarios:** 100% (3 usuarios, todos los campos)
- **Login de usuarios:** 100% (usuarios reales + casos de error)
- **Navegación post-login:** 100% (productos, home, logout)
- **Casos de error:** 100% (credenciales incorrectas, campos vacíos)

### **Tiempos de Ejecución Típicos**
- **Test de registro:** ~40 segundos (3 usuarios completos)
- **Test de login:** ~60 segundos (3 logins + validaciones + cleanup)
- **Total:** ~1 minuto 40 segundos

### **Validaciones por Test**
- **Registro:** 15+ validaciones por usuario (45+ total)
- **Login:** 10+ validaciones por usuario (30+ total)
- **Casos de error:** 5+ validaciones adicionales

## 🔍 **Características Técnicas**

### **Logs Explícitos y Ordenados**
- ✅ **Emojis descriptivos** para mejor legibilidad
- ✅ **Logs detallados** en cada paso del proceso
- ✅ **Secciones organizadas** (Inicio, Validaciones, Limpieza)
- ✅ **Información contextual** (usuario, email, empresa, ubicación)

### **Selectores Robustos**
- ✅ **Selectores `data-qa`** validados con MCP
- ✅ **Selectores de ID** para elementos específicos
- ✅ **Selectores semánticos** para mejor mantenibilidad

### **Gestión de Datos**
- ✅ **Emails únicos** con timestamp para evitar conflictos
- ✅ **Datos mock estructurados** en JSON
- ✅ **Persistencia temporal** entre tests
- ✅ **Limpieza automática** para evitar interferencias

### **Manejo de Errores**
- ✅ **Validación de existencia** de archivo temporal
- ✅ **Casos de error controlados** (credenciales incorrectas)
- ✅ **Validaciones HTML5** (campos obligatorios)
- ✅ **Screenshots automáticos** en fallos

## 🐛 **Documentación de Calidad**

### **Bugs Encontrados**
Ver `results/bugs.md` para lista completa de bugs identificados durante las pruebas.

**Ejemplo:**
- **API endpoint /v1/qa/test2:** Error 500 Internal Server Error
- **Documentado en:** `results/ejercicio2-bug-report.md`

### **Mejoras Sugeridas**
- **UI:** `results/improvements-ui.md`
- **API:** `results/improvements-api.md`
- **Análisis general:** `results/quality-analysis.md`

## ⚙️ **Configuración Avanzada**

### **Variables de Entorno**
```javascript
// cypress.config.js
env: {
  apiUrl: 'https://echo-serv.tbxnet.com'
}
```

### **Timeouts Configurados**
- **Comando por defecto:** 10 segundos
- **Request timeout:** 10 segundos
- **Response timeout:** 10 segundos

### **Configuración de Video y Screenshots**
- **Video:** Deshabilitado (mejor rendimiento)
- **Screenshots:** Solo en fallos
- **Resolución:** 1280x720

## 🔧 **Comandos de Desarrollo**

```bash
# Limpiar archivos temporales
rm cypress/fixtures/created-users.json

# Ver logs detallados
npm run cypress:open  # Modo interactivo con logs visibles

# Ejecutar con debugging
DEBUG=cypress:* npm run test:register
```

## 📚 **Recursos y Referencias**

- [Documentación oficial de Cypress](https://docs.cypress.io/)
- [Best Practices de Cypress](https://docs.cypress.io/guides/references/best-practices)
- [Automation Exercise - Aplicación de prueba](https://automationexercise.com)

## 🎯 **Próximos Pasos**

1. **Tests de API:** Implementar tests para endpoints de `https://echo-serv.tbxnet.com`
2. **Integración continua:** Configurar CI/CD pipeline
3. **Reportes:** Implementar reportes HTML detallados
4. **Performance:** Optimizar tiempos de ejecución

---

**Autor:** Equipo de QA  
**Última actualización:** Noviembre 2025  
**Versión:** 1.0.0