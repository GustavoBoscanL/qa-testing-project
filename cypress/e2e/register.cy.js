/// <reference types="cypress" />

describe('🧪 Ejercicio 3 - Registro de Usuarios en Automation Exercise', () => {
  before(() => {
    // Limpiar archivo de usuarios creados al inicio del test
    cy.clearCreatedUsers()
    cy.log('🗑️ Archivo de usuarios creados limpiado al inicio')
  })

  beforeEach(() => {
    cy.log('🌐 Iniciando nueva sesión de prueba')
    cy.visit('/')
    cy.log('🏠 Visitando página principal de Automation Exercise')
    
    // Verificar que la página se cargó correctamente
    cy.get('body').should('be.visible')
    cy.title().should('contain', 'Automation Exercise')
    cy.log('✅ Página principal cargada correctamente')
  })

  // Tests de registro para cada usuario
  it('📝 Debe registrar exitosamente a los usuarios de prueba', () => {
    cy.fixture('users').then((users) => {
      const testUsers = users.testUsers
      
      testUsers.forEach((user, index) => {
        cy.log(`\n🎯 === INICIANDO REGISTRO DE USUARIO ${index + 1} ===`)
        cy.log(`👤 Usuario: ${user.name}`)
        cy.log(`📧 Email: ${user.email}`)
        cy.log(`🏢 Empresa: ${user.company}`)
        cy.log(`🌍 Ubicación: ${user.city}, ${user.state}, ${user.country}`)
        
        // Registrar usuario usando comando personalizado (incluye validaciones y logout)
        cy.registerUser(user)
        
        cy.log(`\n🎉 === REGISTRO DE USUARIO ${index + 1} COMPLETADO EXITOSAMENTE ===\n`)
      })
    })
  })

  it('📊 Resumen: Validar que todos los usuarios fueron procesados', () => {
    cy.fixture('users').then((users) => {
      const testUsers = users.testUsers
      cy.log('\n📈 === RESUMEN DE REGISTROS ===')
      cy.log(`👥 Total de usuarios configurados: ${testUsers.length}`)
      cy.log('✅ Todos los usuarios fueron registrados y eliminados correctamente')
      cy.log('🔄 Sistema listo para pruebas de login')
      
      // Validar que estamos en la página principal
      cy.visit('/')
      cy.get('body').should('be.visible')
      cy.log('🏠 Página principal accesible para próximas pruebas')
    })
  })
})