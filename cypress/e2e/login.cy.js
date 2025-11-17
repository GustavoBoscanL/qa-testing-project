/// <reference types="cypress" />

describe('🔐 Ejercicio 3 - Login de Usuarios en Automation Exercise', () => {
  beforeEach(() => {
    cy.log('🌐 Iniciando nueva sesión de prueba para login')
    cy.visit('/')
    cy.log('🏠 Visitando página principal de Automation Exercise')
    
    // Verificar que la página se cargó correctamente
    cy.get('body').should('be.visible')
    cy.title().should('contain', 'Automation Exercise')
    cy.log('✅ Página principal cargada correctamente')
  })

  // Test principal: Login con usuarios creados exitosamente
  it('🔑 Debe hacer login exitoso con usuarios creados previamente', () => {
    cy.readFile('cypress/fixtures/created-users.json').then((data) => {
      const createdUsers = data.createdUsers
      
      if (createdUsers.length === 0) {
        cy.log('⚠️ No hay usuarios creados. Ejecutar primero el test de registro.')
        throw new Error('No hay usuarios creados para probar login')
      }
      
      cy.log(`\n📋 === USUARIOS DISPONIBLES PARA LOGIN ===`)
      cy.log(`👥 Total de usuarios creados: ${createdUsers.length}`)
      
      createdUsers.forEach((user, index) => {
        cy.log(`\n🎯 === INICIANDO LOGIN DE USUARIO ${index + 1} ===`)
        cy.log(`👤 Usuario: ${user.name}`)
        cy.log(`📧 Email: ${user.email}`)
        cy.log(`🏢 Empresa: ${user.company}`)
        cy.log(`📅 Creado: ${user.createdAt}`)
        
        // Realizar login usando comando personalizado
        cy.loginUser(user.email, user.password)
        
        // Validaciones post-login (optimizadas y paralelas)
        cy.log('\n🔍 === VALIDACIONES POST-LOGIN ===')
        
        // Validaciones paralelas de elementos de interfaz
        cy.get('a[href="/logout"]').should('be.visible')
          .get('li').contains('Logged in as').should('contain', user.name)
          .get('a[href="/delete_account"]').should('be.visible').and('contain', 'Delete Account')
          .get('a[href="/products"]').should('be.visible')
        
        cy.log('✅ Botón de logout visible - Login exitoso')
        cy.log(`✅ Nombre de usuario "${user.name}" visible en la interfaz`)
        cy.log('✅ Acceso a funciones de cuenta disponible')
        cy.log('✅ Acceso a productos disponible (sin navegación innecesaria)')
        
        // Logout para limpiar sesión antes del siguiente usuario
        cy.log('\n🚪 === LOGOUT Y LIMPIEZA ===')
        cy.logoutUser()
        
        // Verificar que el logout fue exitoso
        cy.get('a[href="/login"]').should('be.visible')
        cy.log('✅ Logout exitoso - Botón de login visible nuevamente')
        
        cy.log(`\n🎉 === LOGIN DE USUARIO ${index + 1} COMPLETADO EXITOSAMENTE ===\n`)
      })
      
      cy.log(`\n🏆 === TODOS LOS LOGINS COMPLETADOS EXITOSAMENTE ===`)
      cy.log(`✅ ${createdUsers.length} usuarios probados correctamente`)
    })
  })

  // Test de login con credenciales incorrectas
  it('❌ Debe fallar el login con credenciales incorrectas', () => {
    cy.log('\n🚫 === PRUEBA DE LOGIN CON CREDENCIALES INCORRECTAS ===')
    
    const invalidCredentials = {
      email: 'usuario.inexistente@example.com',
      password: 'PasswordIncorrecto123!'
    }
    
    cy.log(`📧 Email inválido: ${invalidCredentials.email}`)
    cy.log('🔐 Password inválido: [OCULTO POR SEGURIDAD]')
    
    // Navegar a login
    cy.visit('/login')
    cy.log('📍 Navegando a página de login')
    
    // Intentar login con credenciales incorrectas
    cy.get('[data-qa="login-email"]').type(invalidCredentials.email)
    cy.get('[data-qa="login-password"]').type(invalidCredentials.password)
    cy.get('[data-qa="login-button"]').click()
    cy.log('🔘 Intentando login con credenciales incorrectas')
    
    // Verificar que el login falló
    cy.get('p').should('contain', 'Your email or password is incorrect!')
    cy.log('✅ Mensaje de error mostrado correctamente')
    
    // Verificar que no hay botón de logout (no está logueado)
    cy.get('a[href="/logout"]').should('not.exist')
    cy.log('✅ Usuario no logueado - Sin acceso a funcionalidades')
    
    cy.log('\n🎯 === PRUEBA DE CREDENCIALES INCORRECTAS COMPLETADA ===')
  })

  // Test de validación de campos vacíos
  it('📝 Debe validar campos obligatorios en login', () => {
    cy.log('\n📋 === PRUEBA DE VALIDACIÓN DE CAMPOS OBLIGATORIOS ===')
    
    // Navegar a login
    cy.visit('/login')
    cy.log('📍 Navegando a página de login')
    
    // Intentar login sin llenar campos
    cy.get('[data-qa="login-button"]').click()
    cy.log('🔘 Intentando login sin credenciales')
    
    // Verificar validación HTML5 o comportamiento esperado
    cy.get('[data-qa="login-email"]').then(($email) => {
      expect($email[0].validationMessage).to.not.be.empty
      cy.log('✅ Validación de email requerido funcionando')
    })
    
    // Llenar solo email, dejar password vacío
    cy.get('[data-qa="login-email"]').type('test@example.com')
    cy.get('[data-qa="login-button"]').click()
    cy.log('🔘 Intentando login solo con email')
    
    cy.get('[data-qa="login-password"]').then(($password) => {
      expect($password[0].validationMessage).to.not.be.empty
      cy.log('✅ Validación de password requerido funcionando')
    })
    
    cy.log('\n🎯 === PRUEBA DE VALIDACIÓN DE CAMPOS COMPLETADA ===')
  })

  // Cleanup final - eliminar usuarios de prueba
  it('🧹 Cleanup: Eliminar usuarios de prueba', () => {
    cy.readFile('cypress/fixtures/created-users.json').then((data) => {
      const createdUsers = data.createdUsers
      
      if (createdUsers.length === 0) {
        cy.log('ℹ️ No hay usuarios para eliminar')
        return
      }
      
      cy.log('\n🗑️ === LIMPIEZA FINAL - ELIMINANDO USUARIOS DE PRUEBA ===')
      
      createdUsers.forEach((user, index) => {
        cy.log(`\n🗑️ Eliminando Usuario ${index + 1}: ${user.name}`)
        
        // Login del usuario
        cy.loginUser(user.email, user.password)
        cy.log(`✅ Login exitoso para ${user.name}`)
        
        // Eliminar cuenta
        cy.deleteAccount()
        cy.get('[data-qa="continue-button"]').click()
        cy.log(`✅ Usuario ${index + 1} eliminado exitosamente`)
      })
      
      // Limpiar archivo de usuarios creados
      cy.clearCreatedUsers()
      
      cy.log('\n🎉 === LIMPIEZA COMPLETADA - TODOS LOS USUARIOS ELIMINADOS ===')
      cy.log('🔄 Sistema restaurado al estado inicial')
    })
  })
})