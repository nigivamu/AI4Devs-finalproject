## 15. Mapeo Endpoint → Use Case → Dominio

Este mapeo establece la trazabilidad completa entre la capa de exposición (API), la capa de aplicación (use cases) y el modelo de dominio. Su objetivo es eliminar ambigüedades durante la implementación y reforzar la separación de responsabilidades.

---

### Endpoint: POST /auth/register

**Intención:** Crear un nuevo usuario en el sistema.

**Use Case:** `RegisterUserUseCase`

**Responsabilidades del Use Case:**

* Validar unicidad del email
* Hashear contraseña
* Crear entidad `User`
* Persistir el usuario

**Dominio involucrado:**

* `User`

**Infraestructura:**

* UserRepository
* PasswordHasher

---

### Endpoint: POST /auth/login

**Intención:** Autenticar un usuario existente.

**Use Case:** `AuthenticateUserUseCase`

**Responsabilidades del Use Case:**

* Validar credenciales
* Recuperar entidad `User`
* Generar token JWT

**Dominio involucrado:**

* `User`

**Infraestructura:**

* UserRepository
* PasswordHasher
* TokenProvider

---

### Endpoint: POST /monthly-limit

**Intención:** Definir o actualizar el tope mensual del usuario.

**Use Case:** `SetMonthlyLimitUseCase`

**Responsabilidades del Use Case:**

* Determinar mes actual
* Crear o actualizar entidad `MonthlyLimit`
* Persistir cambios

**Dominio involucrado:**

* `MonthlyLimit`

**Infraestructura:**

* MonthlyLimitRepository

---

### Endpoint: POST /expenses

**Intención:** Registrar un gasto usando lenguaje natural.

**Use Case:** `RegisterExpenseUseCase`

**Responsabilidades del Use Case:**

* Enviar texto a la IA para extracción estructurada
* Validar datos extraídos
* Crear entidad `Expense`
* Persistir gasto
* Calcular gasto mensual acumulado
* Comparar con tope mensual
* Generar alerta si corresponde

**Dominio involucrado:**

* `Expense`
* `MonthlyLimit`

**Infraestructura:**

* ExpenseRepository
* MonthlyLimitRepository
* GenerativeAIClient

---

### Endpoint: GET /dashboard

**Intención:** Obtener el estado financiero actual del usuario.

**Use Case:** `GetDashboardStateUseCase`

**Responsabilidades del Use Case:**

* Recuperar tope mensual
* Recuperar gastos del mes
* Calcular total acumulado
* Determinar estado de alerta

**Dominio involucrado:**

* `Expense`
* `MonthlyLimit`

**Infraestructura:**

* ExpenseRepository
* MonthlyLimitRepository

---

## 16. Observaciones Clave de Diseño

* Los controladores no contienen lógica de negocio.
* Toda decisión relevante vive en los use cases.
* El dominio permanece independiente de frameworks, HTTP e IA.
* La IA solo participa como servicio de apoyo dentro de un use case.

