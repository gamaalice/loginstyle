// Elementos do DOM
const toggle = document.querySelector(".toggle")
const inputCheck = document.querySelector(".input-check")
const body = document.querySelector("body")
const h2 = document.querySelector("h2")
const inputLines = document.querySelectorAll(".input-line")
const inputs = document.querySelectorAll(".input-box input")
const icons = document.querySelectorAll(".icon ion-icon")
const button = document.querySelector("button")
const toggleTextOff = document.querySelector(".text.off")
const toggleTextOn = document.querySelector(".text.on")
const loginForm = document.getElementById("loginForm")
const emailInput = document.getElementById("email")
const passwordInput = document.getElementById("password")
const rememberCheckbox = document.getElementById("remember")
const errorMessage = document.getElementById("errorMessage")
const successMessage = document.getElementById("successMessage")

// Credenciais de exemplo (em um projeto real, isso seria validado no servidor)
const validCredentials = {
  email: "admin@example.com",
  password: "123456",
}

// Listener para o checkbox do toggle
inputCheck.addEventListener("change", () => {
  const isActive = inputCheck.checked

  // Aplicar estilos com base no estado
  if (isActive) {
    body.classList.add("active")
    h2.style.color = "#8b008b"
    h2.style.textShadow = "0 0 15px #8b008b, 0 0 30px #cc00cc"

    inputLines.forEach((line) => {
      line.style.background = "#8b008b"
      line.style.boxShadow = "0 0 10px #8b008b"
    })

    inputs.forEach((input) => {
      input.style.color = "#8b008b"
    })

    icons.forEach((icon) => {
      icon.style.color = "#8b008b"
    })

    button.style.background = "#8b008b"
    button.style.boxShadow = "0 0 15px #8b008b, 0 0 15px #cc00cc"

    toggleTextOn.style.opacity = "1"
    toggleTextOff.style.opacity = "0"
  } else {
    body.classList.remove("active")
    h2.style.color = "#fff"
    h2.style.textShadow = ""

    inputLines.forEach((line) => {
      line.style.background = "#fff"
      line.style.boxShadow = ""
    })

    inputs.forEach((input) => {
      input.style.color = "#fff"
    })

    icons.forEach((icon) => {
      icon.style.color = "#fff"
    })

    button.style.background = "#fff"
    button.style.boxShadow = ""

    toggleTextOn.style.opacity = "0"
    toggleTextOff.style.opacity = "1"
  }
})

// Função para mostrar mensagens
function showMessage(element, message, duration = 3000) {
  element.textContent = message
  element.classList.add("show")

  setTimeout(() => {
    element.classList.remove("show")
  }, duration)
}

// Função para validar email
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Função para validar campos
function validateField(input, condition, errorMsg) {
  const inputLine = input.parentElement.querySelector(".input-line")

  if (condition) {
    input.classList.remove("error")
    input.classList.add("success")
    inputLine.classList.remove("error")
    inputLine.classList.add("success")
    return true
  } else {
    input.classList.remove("success")
    input.classList.add("error")
    inputLine.classList.remove("success")
    inputLine.classList.add("error")
    showMessage(errorMessage, errorMsg)
    return false
  }
}

// Função para limpar validações visuais
function clearValidations() {
  inputs.forEach((input) => {
    input.classList.remove("error", "success")
    const inputLine = input.parentElement.querySelector(".input-line")
    inputLine.classList.remove("error", "success")
  })
}

// Função para simular loading
function setButtonLoading(loading) {
  if (loading) {
    button.classList.add("button-loading")
    button.disabled = true
  } else {
    button.classList.remove("button-loading")
    button.disabled = false
  }
}

// Listener para o formulário de login
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  // Limpar mensagens anteriores
  errorMessage.classList.remove("show")
  successMessage.classList.remove("show")
  clearValidations()

  const email = emailInput.value.trim()
  const password = passwordInput.value.trim()

  // Validações
  let isValid = true

  if (!email) {
    isValid = validateField(emailInput, false, "Por favor, digite seu email")
  } else if (!validateEmail(email)) {
    isValid = validateField(emailInput, false, "Por favor, digite um email válido")
  } else {
    validateField(emailInput, true, "")
  }

  if (!password) {
    isValid = validateField(passwordInput, false, "Por favor, digite sua senha")
  } else if (password.length < 6) {
    isValid = validateField(passwordInput, false, "A senha deve ter pelo menos 6 caracteres")
  } else {
    validateField(passwordInput, true, "")
  }

  if (!isValid) return

  // Simular processo de login
  setButtonLoading(true)

  // Simular delay de requisição
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Verificar credenciais
  if (email === validCredentials.email && password === validCredentials.password) {
    setButtonLoading(false)
    showMessage(successMessage, "Login realizado com sucesso! Redirecionando...", 2000)

    // Salvar estado "lembrar-me" se marcado
    if (rememberCheckbox.checked) {
      localStorage.setItem("rememberLogin", "true")
      localStorage.setItem("userEmail", email)
    }

    // Simular redirecionamento após 2 segundos
    setTimeout(() => {
      alert("Redirecionando para o dashboard...")
      // window.location.href = 'dashboard.html'; // Descomente para redirecionar
    }, 2000)
  } else {
    setButtonLoading(false)
    showMessage(errorMessage, "Email ou senha incorretos. Tente novamente.")

    // Marcar campos como erro
    validateField(emailInput, false, "")
    validateField(passwordInput, false, "")
  }
})

// Verificar se deve lembrar do login ao carregar a página
window.addEventListener("load", () => {
  if (localStorage.getItem("rememberLogin") === "true") {
    const savedEmail = localStorage.getItem("userEmail")
    if (savedEmail) {
      emailInput.value = savedEmail
      rememberCheckbox.checked = true
    }
  }
})

// Listener para "Esqueci minha senha"
document.getElementById("forgotPassword").addEventListener("click", (e) => {
  e.preventDefault()
  alert(
    'Funcionalidade "Esqueci minha senha" seria implementada aqui.\n\nPara teste, use:\nEmail: admin@example.com\nSenha: 123456',
  )
})

// Listener para "Registrar"
document.getElementById("registerLink").addEventListener("click", (e) => {
  e.preventDefault()
  alert("Página de registro seria aberta aqui.")
})

// Validação em tempo real
emailInput.addEventListener("input", () => {
  if (emailInput.classList.contains("error") && emailInput.value.trim()) {
    clearValidations()
  }
})

passwordInput.addEventListener("input", () => {
  if (passwordInput.classList.contains("error") && passwordInput.value.trim()) {
    clearValidations()
  }
})
