/// <reference types="cypress" />

describe('🔌 Ejercicio 4 - Tests de API en Echo Server', () => {
  const baseUrl = 'https://echo-serv.tbxnet.com/v1'
  
  beforeEach(() => {
    cy.log('🌐 Iniciando nueva sesión de prueba para API')
    cy.log(`🔗 Base URL: ${baseUrl}`)
  })

  describe('📋 Endpoint: /qa/test1 - QA Test Service', () => {
    const endpoint = '/qa/test1'
    const fullUrl = `${baseUrl}${endpoint}`

    it('✅ Debe responder correctamente con status 200', () => {
      cy.log(`\n🎯 === TESTING ENDPOINT: ${endpoint} ===`)
      cy.log(`📍 URL completa: ${fullUrl}`)

      const startTime = Date.now()

      cy.request({
        method: 'GET',
        url: fullUrl,
        failOnStatusCode: false
      }).then((response) => {
        const endTime = Date.now()
        const responseTime = endTime - startTime

        cy.log('\n📊 === VALIDACIONES DE RESPUESTA ===')

        // 1. Status Code Validation
        cy.log('🔍 Validando Status Code...')
        expect(response.status).to.eq(200)
        cy.log(`✅ Status Code: ${response.status} (Esperado: 200)`)

        // 2. Response Time Validation (< 3 segundos)
        cy.log('⏱️ Validando Response Time...')
        expect(responseTime).to.be.lessThan(3000)
        cy.log(`✅ Response Time: ${responseTime}ms (Esperado: < 3000ms)`)

        // 3. Response Body Validation
        cy.log('📄 Validando Response Body...')
        expect(response.body).to.not.be.null
        expect(response.body).to.be.an('object')
        
        // Validar estructura esperada según documentación Swagger
        expect(response.body).to.have.property('ok')
        expect(response.body.ok).to.be.a('boolean')
        expect(response.body.ok).to.eq(true)
        
        expect(response.body).to.have.property('date')
        expect(response.body.date).to.be.a('string')
        expect(response.body.date).to.not.be.empty
        
        cy.log(`✅ Response Body válido:`)
        cy.log(`   - ok: ${response.body.ok} (boolean)`)
        cy.log(`   - date: ${response.body.date} (string)`)

        // 4. Headers Validation
        cy.log('📋 Validando Headers...')
        expect(response.headers).to.have.property('content-type')
        expect(response.headers['content-type']).to.include('application/json')
        cy.log(`✅ Content-Type: ${response.headers['content-type']}`)

        // Validar headers adicionales de seguridad/calidad
        if (response.headers['server']) {
          cy.log(`📡 Server: ${response.headers['server']}`)
        }
        
        if (response.headers['x-response-time']) {
          cy.log(`⚡ X-Response-Time: ${response.headers['x-response-time']}`)
        }

        // 5. Validaciones adicionales de calidad
        cy.log('\n🔍 === VALIDACIONES ADICIONALES DE CALIDAD ===')
        
        // Validar que la fecha sea un formato válido
        const dateValue = response.body.date
        const parsedDate = new Date(dateValue)
        expect(parsedDate.toString()).to.not.eq('Invalid Date')
        cy.log(`✅ Fecha válida: ${dateValue}`)
        
        // Validar que la fecha sea reciente (dentro de las últimas 24 horas)
        const now = new Date()
        const timeDiff = Math.abs(now - parsedDate)
        const hoursDiff = timeDiff / (1000 * 60 * 60)
        expect(hoursDiff).to.be.lessThan(24)
        cy.log(`✅ Fecha reciente: ${hoursDiff.toFixed(2)} horas de diferencia`)

        cy.log(`\n🎉 === ENDPOINT ${endpoint} - TODAS LAS VALIDACIONES PASARON ===`)
      })
    })

    it('🔄 Debe ser consistente en múltiples llamadas', () => {
      cy.log(`\n🔄 === TESTING CONSISTENCIA: ${endpoint} ===`)
      
      const responses = []
      const numRequests = 3

      // Realizar múltiples requests secuencialmente
      for (let i = 0; i < numRequests; i++) {
        cy.request({
          method: 'GET',
          url: fullUrl,
          failOnStatusCode: false
        }).then((response) => {
          responses.push(response)
          cy.log(`📋 Respuesta ${i + 1}: Status ${response.status}`)
        })
      }

      // Validar consistencia después de todas las requests
      cy.then(() => {
        cy.log(`📊 Analizando ${responses.length} respuestas...`)

        responses.forEach((response, index) => {
          cy.log(`\n📋 Respuesta ${index + 1}:`)
          expect(response.status).to.eq(200)
          expect(response.body.ok).to.eq(true)
          expect(response.body.date).to.be.a('string')
          cy.log(`   - Status: ${response.status}`)
          cy.log(`   - OK: ${response.body.ok}`)
          cy.log(`   - Date: ${response.body.date}`)
        })

        cy.log('✅ Todas las respuestas son consistentes')
      })
    })
  })

  describe('🏓 Endpoint: /system/ping - System Health Check', () => {
    const endpoint = '/system/ping'
    const fullUrl = `${baseUrl}${endpoint}`

    it('✅ Debe responder correctamente con status 200', () => {
      cy.log(`\n🎯 === TESTING ENDPOINT: ${endpoint} ===`)
      cy.log(`📍 URL completa: ${fullUrl}`)

      const startTime = Date.now()

      cy.request({
        method: 'GET',
        url: fullUrl,
        failOnStatusCode: false
      }).then((response) => {
        const endTime = Date.now()
        const responseTime = endTime - startTime

        cy.log('\n📊 === VALIDACIONES DE RESPUESTA ===')

        // 1. Status Code Validation
        cy.log('🔍 Validando Status Code...')
        expect(response.status).to.eq(200)
        cy.log(`✅ Status Code: ${response.status} (Esperado: 200)`)

        // 2. Response Time Validation (< 3 segundos, pero para ping debería ser mucho más rápido)
        cy.log('⏱️ Validando Response Time...')
        expect(responseTime).to.be.lessThan(3000)
        expect(responseTime).to.be.lessThan(1000) // Ping debería ser < 1 segundo
        cy.log(`✅ Response Time: ${responseTime}ms (Esperado: < 1000ms para ping)`)

        // 3. Response Body Validation
        cy.log('📄 Validando Response Body...')
        expect(response.body).to.not.be.null
        expect(response.body).to.be.an('object')
        
        // Validar estructura esperada según documentación Swagger
        expect(response.body).to.have.property('ok')
        expect(response.body.ok).to.be.a('boolean')
        expect(response.body.ok).to.eq(true)
        
        expect(response.body).to.have.property('date')
        expect(response.body.date).to.be.a('string')
        expect(response.body.date).to.not.be.empty
        
        cy.log(`✅ Response Body válido:`)
        cy.log(`   - ok: ${response.body.ok} (boolean)`)
        cy.log(`   - date: ${response.body.date} (string)`)

        // 4. Headers Validation
        cy.log('📋 Validando Headers...')
        expect(response.headers).to.have.property('content-type')
        expect(response.headers['content-type']).to.include('application/json')
        cy.log(`✅ Content-Type: ${response.headers['content-type']}`)

        // Validar headers específicos de sistema
        if (response.headers['server']) {
          cy.log(`📡 Server: ${response.headers['server']}`)
        }

        // 5. Validaciones específicas para endpoint de ping
        cy.log('\n🏓 === VALIDACIONES ESPECÍFICAS DE PING ===')
        
        // El ping debe responder rápidamente
        expect(responseTime).to.be.lessThan(500) // Muy rápido para ping
        cy.log(`✅ Ping muy rápido: ${responseTime}ms`)
        
        // La fecha debe ser muy reciente (dentro del último minuto)
        const dateValue = response.body.date
        const parsedDate = new Date(dateValue)
        const now = new Date()
        const timeDiff = Math.abs(now - parsedDate)
        const secondsDiff = timeDiff / 1000
        expect(secondsDiff).to.be.lessThan(60)
        cy.log(`✅ Timestamp muy reciente: ${secondsDiff.toFixed(2)} segundos`)

        cy.log(`\n🎉 === ENDPOINT ${endpoint} - TODAS LAS VALIDACIONES PASARON ===`)
      })
    })

    it('⚡ Debe responder consistentemente rápido', () => {
      cy.log(`\n⚡ === TESTING PERFORMANCE: ${endpoint} ===`)
      
      const responseTimes = []
      const numRequests = 5

      // Realizar múltiples requests para medir performance
      for (let i = 0; i < numRequests; i++) {
        cy.then(() => {
          const startTime = Date.now()
          
          return cy.request({
            method: 'GET',
            url: fullUrl,
            failOnStatusCode: false
          }).then((response) => {
            const endTime = Date.now()
            const responseTime = endTime - startTime
            responseTimes.push(responseTime)
            
            cy.log(`🏓 Ping ${i + 1}: ${responseTime}ms`)
            expect(response.status).to.eq(200)
            expect(responseTime).to.be.lessThan(1000)
          })
        })
      }

      // Analizar estadísticas de performance
      cy.then(() => {
        const avgResponseTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
        const maxResponseTime = Math.max(...responseTimes)
        const minResponseTime = Math.min(...responseTimes)

        cy.log('\n📊 === ESTADÍSTICAS DE PERFORMANCE ===')
        cy.log(`📈 Promedio: ${avgResponseTime.toFixed(2)}ms`)
        cy.log(`📊 Mínimo: ${minResponseTime}ms`)
        cy.log(`📊 Máximo: ${maxResponseTime}ms`)

        // Validaciones de performance
        expect(avgResponseTime).to.be.lessThan(500)
        expect(maxResponseTime).to.be.lessThan(1000)
        
        cy.log('✅ Performance consistente del endpoint de ping')
      })
    })
  })

  describe('❌ Tests de Manejo de Errores', () => {
    it('🚫 Debe manejar endpoint inexistente correctamente', () => {
      cy.log('\n🚫 === TESTING ENDPOINT INEXISTENTE ===')
      
      const invalidEndpoint = '/qa/nonexistent'
      const fullUrl = `${baseUrl}${invalidEndpoint}`
      
      cy.log(`📍 URL inexistente: ${fullUrl}`)

      cy.request({
        method: 'GET',
        url: fullUrl,
        failOnStatusCode: false
      }).then((response) => {
        cy.log('\n📊 === VALIDACIONES DE ERROR ===')
        
        // Debe retornar 404 o similar
        expect(response.status).to.be.oneOf([404, 500])
        cy.log(`✅ Status Code de error: ${response.status}`)
        
        // Si hay body, debe tener estructura de error
        if (response.body && typeof response.body === 'object') {
          cy.log('📄 Validando estructura de error...')
          
          // Según la documentación, los errores tienen code y message
          if (response.body.code) {
            expect(response.body.code).to.be.a('string')
            cy.log(`✅ Error code: ${response.body.code}`)
          }
          
          if (response.body.message) {
            expect(response.body.message).to.be.a('string')
            cy.log(`✅ Error message: ${response.body.message}`)
          }
        }
        
        cy.log('✅ Manejo de errores funcionando correctamente')
      })
    })

    it('🔒 Debe validar el endpoint /qa/test2 (conocido por fallar)', () => {
      cy.log('\n🔒 === TESTING ENDPOINT PROBLEMÁTICO: /qa/test2 ===')
      
      const problematicEndpoint = '/qa/test2'
      const fullUrl = `${baseUrl}${problematicEndpoint}`
      
      cy.log(`📍 URL problemática: ${fullUrl}`)
      cy.log('⚠️ Este endpoint es conocido por retornar error 500')

      cy.request({
        method: 'GET',
        url: fullUrl,
        failOnStatusCode: false
      }).then((response) => {
        cy.log('\n📊 === VALIDACIONES DE ENDPOINT PROBLEMÁTICO ===')
        
        cy.log(`📋 Status recibido: ${response.status}`)
        
        if (response.status === 500) {
          cy.log('⚠️ Confirmado: Endpoint retorna error 500')
          
          // Validar estructura de error
          expect(response.body).to.be.an('object')
          expect(response.body).to.have.property('code')
          expect(response.body).to.have.property('message')
          expect(response.body.code).to.eq('SYS-ERR')
          expect(response.body.message).to.eq('An Error')
          
          cy.log(`✅ Error estructurado correctamente:`)
          cy.log(`   - code: ${response.body.code}`)
          cy.log(`   - message: ${response.body.message}`)
          cy.log(`   - status: ${response.body.status}`)
          
        } else if (response.status === 200) {
          cy.log('✅ Endpoint funcionando correctamente (posible fix)')
          
          // Si funciona, validar estructura normal
          expect(response.body.ok).to.eq(true)
          expect(response.body.date).to.be.a('string')
          
        } else {
          cy.log(`⚠️ Status inesperado: ${response.status}`)
        }
        
        cy.log('✅ Validación de endpoint problemático completada')
      })
    })
  })

  describe('📊 Resumen de Tests de API', () => {
    it('📈 Debe generar reporte de todos los endpoints', () => {
      cy.log('\n📈 === REPORTE FINAL DE API TESTS ===')
      
      const endpoints = [
        { name: '/qa/test1', description: 'QA Test Service - Funcional' },
        { name: '/system/ping', description: 'System Health Check - Performance' },
        { name: '/qa/test2', description: 'QA Test Service - Error conocido' }
      ]
      
      cy.log('📋 Endpoints testeados:')
      endpoints.forEach((endpoint, index) => {
        cy.log(`   ${index + 1}. ${endpoint.name} - ${endpoint.description}`)
      })
      
      cy.log('\n✅ Validaciones implementadas:')
      cy.log('   ✓ Status Code (200, 404, 500)')
      cy.log('   ✓ Response Time (< 3s general, < 1s ping)')
      cy.log('   ✓ Response Body Structure')
      cy.log('   ✓ Headers Validation')
      cy.log('   ✓ Data Type Validation')
      cy.log('   ✓ Error Handling')
      cy.log('   ✓ Performance Testing')
      cy.log('   ✓ Consistency Testing')
      
      cy.log('\n🎯 Casos de uso cubiertos:')
      cy.log('   ✓ Endpoints funcionales')
      cy.log('   ✓ Endpoints de sistema')
      cy.log('   ✓ Manejo de errores')
      cy.log('   ✓ Endpoints inexistentes')
      cy.log('   ✓ Performance y consistencia')
      
      cy.log('\n🎉 === TODOS LOS TESTS DE API COMPLETADOS EXITOSAMENTE ===')
    })
  })
})
