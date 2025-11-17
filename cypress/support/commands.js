// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Comandos personalizados para tests de UI - Automation Exercise

// Comando para guardar usuarios creados exitosamente
Cypress.Commands.add('saveCreatedUser', (user, uniqueEmail) => {
  const createdUser = {
    ...user,
    email: uniqueEmail,
    createdAt: new Date().toISOString()
  }
  
  // Intentar leer el archivo existente, si no existe crear uno nuevo
  cy.task('fileExists', 'cypress/fixtures/created-users.json').then((exists) => {
    if (exists) {
      cy.readFile('cypress/fixtures/created-users.json').then((data) => {
        data.createdUsers.push(createdUser)
        cy.writeFile('cypress/fixtures/created-users.json', data)
        cy.log(`💾 Usuario guardado en archivo temporal: ${user.name}`)
      })
    } else {
      const initialData = { createdUsers: [createdUser] }
      cy.writeFile('cypress/fixtures/created-users.json', initialData)
      cy.log(`💾 Archivo temporal creado y usuario guardado: ${user.name}`)
    }
  })
})

// Comando para limpiar archivo de usuarios creados
Cypress.Commands.add('clearCreatedUsers', () => {
  const emptyData = { createdUsers: [] }
  cy.writeFile('cypress/fixtures/created-users.json', emptyData)
  cy.log('🗑️ Archivo de usuarios creados limpiado')
})

Cypress.Commands.add('registerUser', (user) => {
  // Generar email único con timestamp para evitar conflictos
  const uniqueEmail = user.email.replace('@example.com', `+${Date.now()}@example.com`)
  
  cy.log(`🚀 Iniciando registro para usuario: ${user.name}`)
  cy.log(`📧 Email único generado: ${uniqueEmail}`)
  
  // Navegar a la página de registro
  cy.visit('/login')
  cy.log('📍 Navegando a página de login/registro')
  
  // Llenar formulario de registro inicial
  cy.get('[data-qa="signup-name"]').type(user.name)
  cy.log(`✏️ Ingresando nombre: ${user.name}`)
  
  cy.get('[data-qa="signup-email"]').type(uniqueEmail)
  cy.log(`✏️ Ingresando email: ${uniqueEmail}`)
  
  cy.get('[data-qa="signup-button"]').click()
  cy.log('🔘 Haciendo clic en botón de registro')
  
  // Llenar formulario de información detallada
  // Esperar a que la página de registro se cargue completamente
  cy.get('[data-qa="password"]').should('be.visible')
  
  // Seleccionar título usando un selector más específico
  if (user.title === 'Mr') {
    cy.get('#id_gender1').check()
  } else {
    cy.get('#id_gender2').check()
  }
  cy.log(`✅ Seleccionando título: ${user.title}`)
  
  cy.get('[data-qa="password"]').type(user.password)
  cy.log('🔐 Ingresando contraseña')
  
  // Fecha de nacimiento
  cy.get('[data-qa="days"]').select(user.dateOfBirth.day)
  cy.get('[data-qa="months"]').select(user.dateOfBirth.month)
  cy.get('[data-qa="years"]').select(user.dateOfBirth.year)
  cy.log(`📅 Configurando fecha de nacimiento: ${user.dateOfBirth.day}/${user.dateOfBirth.month}/${user.dateOfBirth.year}`)
  
  // Información personal
  cy.get('[data-qa="first_name"]').type(user.firstName)
  cy.get('[data-qa="last_name"]').type(user.lastName)
  cy.log(`👤 Ingresando nombre completo: ${user.firstName} ${user.lastName}`)
  
  cy.get('[data-qa="company"]').type(user.company)
  cy.log(`🏢 Ingresando empresa: ${user.company}`)
  
  cy.get('[data-qa="address"]').type(user.address1)
  cy.get('[data-qa="address2"]').type(user.address2)
  cy.log(`🏠 Ingresando dirección: ${user.address1}, ${user.address2}`)
  
  cy.get('[data-qa="country"]').select(user.country)
  cy.get('[data-qa="state"]').type(user.state)
  cy.get('[data-qa="city"]').type(user.city)
  cy.get('[data-qa="zipcode"]').type(user.zipcode)
  cy.log(`🌍 Configurando ubicación: ${user.city}, ${user.state}, ${user.country} - ${user.zipcode}`)
  
  cy.get('[data-qa="mobile_number"]').type(user.mobileNumber)
  cy.log(`📱 Ingresando número móvil: ${user.mobileNumber}`)
  
  // Enviar formulario
  cy.get('[data-qa="create-account"]').click()
  cy.log('🚀 Enviando formulario de registro')
  
  // Validar registro exitoso
  cy.get('[data-qa="account-created"]').should('be.visible')
  cy.log('✅ Registro completado exitosamente')
  
  // Continuar después del registro
  cy.get('[data-qa="continue-button"]').click()
  cy.log('➡️ Continuando después del registro')
  
  // Validar que el usuario está logueado después del continue (paralelo)
  cy.get('a[href="/logout"]').should('be.visible')
    .get('li').contains('Logged in as').should('contain', user.name)
  cy.log('✅ Usuario logueado correctamente después del registro')
  cy.log(`✅ Nombre de usuario "${user.name}" visible en la interfaz`)
  
  // Logout del usuario para limpiar la sesión
  cy.get('a[href="/logout"]').click()
  cy.log('🚪 Haciendo logout del usuario registrado')
  
  // Verificar que el logout fue exitoso
  cy.get('a[href="/login"]').should('be.visible')
  cy.log('✅ Logout exitoso - Usuario deslogueado correctamente')
  
  // Guardar usuario creado exitosamente en archivo temporal
  cy.saveCreatedUser(user, uniqueEmail)
})

Cypress.Commands.add('loginUser', (email, password) => {
  cy.log(`🔑 Iniciando login para usuario: ${email}`)
  
  // Navegar a la página de login
  cy.visit('/login')
  cy.log('📍 Navegando a página de login')
  
  // Llenar formulario de login
  cy.get('[data-qa="login-email"]').type(email)
  cy.log(`✏️ Ingresando email: ${email}`)
  
  cy.get('[data-qa="login-password"]').type(password)
  cy.log('🔐 Ingresando contraseña')
  
  // Hacer clic en login
  cy.get('[data-qa="login-button"]').click()
  cy.log('🔘 Haciendo clic en botón de login')
  
  // Validar login exitoso (optimizado)
  cy.get('a[href="/logout"]').should('be.visible')
  cy.log('✅ Login completado exitosamente')
})

Cypress.Commands.add('logoutUser', () => {
  cy.log('🚪 Cerrando sesión')
  cy.get('a[href="/logout"]').click()
  cy.log('✅ Sesión cerrada exitosamente')
})

Cypress.Commands.add('deleteAccount', () => {
  cy.log('🗑️ Eliminando cuenta de usuario')
  cy.get('a[href="/delete_account"]').click()
  cy.get('[data-qa="account-deleted"]').should('be.visible')
  cy.log('✅ Cuenta eliminada exitosamente')
})

// Comandos personalizados para tests de API
Cypress.Commands.add('apiRequest', (method, endpoint, body = null) => {
  const options = {
    method: method,
    url: `${Cypress.env('apiUrl')}${endpoint}`,
    failOnStatusCode: false,
  }
  
  if (body) {
    options.body = body
  }
  
  return cy.request(options)
})

// Ejemplo de comando para esperar carga de página
Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('body').should('be.visible')
  cy.window().its('document.readyState').should('eq', 'complete')
})

