## Índice

0. [Ficha del proyecto](#0-ficha-del-proyecto)
1. [Descripción general del producto](#1-descripción-general-del-producto)
2. [Arquitectura del sistema](#2-arquitectura-del-sistema)
3. [Modelo de datos](#3-modelo-de-datos)
4. [Especificación de la API](#4-especificación-de-la-api)
5. [Historias de usuario](#5-historias-de-usuario)
6. [Tickets de trabajo](#6-tickets-de-trabajo)
7. [Pull requests](#7-pull-requests)

---

## 0. Ficha del proyecto

El objetivo del presente proyecto es por medio del uso de herramientas de Inteligencia Artificial Generativa implementar un proceso de ingeniería de software con el uso de las mismas.

### **0.1. Tu nombre completo:**

Nilson Giovanny Valdés Muñoz

### **0.2. Nombre del proyecto:**

Gestor de Gastos Personal (GGP)

### **0.3. Descripción breve del proyecto:**

Las personas no registran sus gastos porque el proceso suele resultar tedioso, rígido y requiere disciplina constante. El proyecto pretende desarrollar una aplicación web que permita reducir la fricción y mejorar la comprensión financiera con mínima interacción del usuario.
Para ello se pretende que el usuario no solo use la interfaz gráfica de la aplicación sino que pueda usar herramientas como un chatbot para agilizar el registro de los gastos.

### **0.4. URL del proyecto:**

https://github.com/nigivamu/AI4Devs-finalproject

### 0.5. URL o archivo comprimido del repositorio

https://github.com/nigivamu/AI4Devs-finalproject


---

## 1. Descripción general del producto

### **1.1. Objetivo:**

Demostrar cómo un desarrollador puede utilizar IA generativa como copiloto integral a lo largo del ciclo de vida del software. Desde la ideación hasta la validación, mediante la construcción de un MVP funcional de seguimiento de gastos personales con interacción en lenguaje natural.

Para ello se ha escogido desarrollar un Software para Gestión de Gastos Personales que permita:

* **Reducir el esfuerzo y la disciplina** requerida para registrar gastos de forma consistente.
* Brindar control **básico** y percepción temprana de exceso de gasto.
* Mantener simplicidad técnica y foco en el valor principal.
* Permitir decisiones rápidas sin interpretación técnica de datos.

### **1.2. Características y funcionalidades principales:**

El producto:
* Introduce un mecanismo explícito de auto–limitación (tope mensual) que permita al usuario tomar conciencia de sus hábitos de gasto sin análisis financiero avanzado. 
* Comunica eventos relevantes (exceso de tope) en lenguaje natural, evitando métricas abstractas o dashboards complejos. 
* Permite al usuario interactuar con el sistema usando lenguaje natural para registrar información financiera, eliminando formularios complejos y reduciendo fricción cognitiva.
* Gestiona datos únicamente del usuario autenticado, sin funcionalidades sociales ni multiusuario.

### **1.3. Diseño y experiencia de usuario:**

La interfaz de usuario se basa en un diseño minimalista y centrado en la reducción de fricción cognitiva. La aplicación web utiliza React con Tailwind CSS para una experiencia moderna y responsiva.

#### Componentes Principales de la Interfaz:

**Vista de Autenticación ([`AuthView.jsx`](frontend/src/components/AuthView.jsx:1))**
- Formulario unificado para registro e inicio de sesión
- Diseño con gradiente visual atractivo
- Validación de email y contraseña (mínimo 6 caracteres)
- Transición fluida entre modos de registro/login
- Mensajes de error claros y visibles

**Vista de Dashboard ([`DashboardView.jsx`](frontend/src/components/DashboardView.jsx:1))**
- Pantalla principal con información financiera consolidada
- Tarjetas de estadísticas: Gasto Total, Presupuesto, Disponible
- Gráfica de evolución de gastos por fecha
- Lista de movimientos recientes
- Banner de alerta para excedentes de presupuesto

**Componente de Registro de Gastos ([`ExpenseInput.jsx`](frontend/src/components/ExpenseInput.jsx:1))**
- Campo de texto libre para entrada en lenguaje natural
- Botón de envío con indicador de carga
- Frases de ejemplo para guiar al usuario
- Feedback inmediato de éxito o error
- Soporte para envío con tecla Enter

**Componente de Lista de Gastos ([`ExpenseList.jsx`](frontend/src/components/ExpenseList.jsx:1))**
- Visualización cronológica de gastos
- Iconos por categoría (Alimentación, Transporte, Entretenimiento, etc.)
- Formato de fecha localizado (es-CO)
- Estado vacío con mensaje amigable

**Componente de Progreso de Presupuesto ([`BudgetProgress.jsx`](frontend/src/components/BudgetProgress.jsx:1))**
- Gráfico circular de progreso mensual
- Indicador de porcentaje gastado
- Colores dinámicos según estado (verde, naranja, rojo)
- Visualización de monto gastado y disponible

**Componente de Tope Mensual ([`MonthlyLimit.jsx`](frontend/src/components/MonthlyLimit.jsx:1))**
- Visualización del límite actual
- Modo de edición inline
- Validación de valores positivos
- Actualización inmediata sin recarga

**Banner de Alerta ([`AlertBanner.jsx`](frontend/src/components/AlertBanner.jsx:1))**
- Notificación destacada cuando se excede el tope
- Mensaje generado por IA
- Opción de descartar alerta
- Diseño con icono de advertencia

#### Principios de Diseño:

1. **Minimalismo**: Interfaz limpia sin elementos distractores
2. **Feedback Inmediato**: Confirmación visual de cada acción
3. **Accesibilidad**: Colores con contraste adecuado y etiquetas claras
4. **Responsividad**: Diseño adaptable a diferentes tamaños de pantalla
5. **Lenguaje Natural**: Entrada de datos sin formularios complejos

### **1.4. Instrucciones de instalación:**

**Backend (Python/FastAPI):**
1. Navega a la carpeta `backend/`.
2. Sigue las instrucciones detalladas en [backend/README.md](backend/README.md).
3. Resumen rápido:
   ```bash
   cd backend
   python3 -m venv venv && source venv/bin/activate
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```

---

## 2. Arquitectura del Sistema

### **2.1. Diagrama de arquitectura:**

```mermaid
flowchart LR
    UI[Frontend Web SPA<br/>React + Vite + Tailwind]

    API[Backend API<br/>FastAPI]
    UC[Use Cases<br/>Lógica de Negocio]
    DOMAIN[Domain Model<br/>User, Expense, MonthlyLimit]

    DB[(Database<br/>SQLite)]
    AI[IA Generativa<br/>OpenAI GPT-3.5]

    UI -->|REST API| API
    API --> UC
    UC --> DOMAIN
    UC --> DB
    UC -->|Prompt / Response| AI

    DB --> UC
```

**Descripción del flujo:**

1. El usuario interactúa con el Frontend Web SPA (React)
2. El Frontend realiza peticiones REST al Backend API (FastAPI)
3. El Backend procesa las solicitudes a través de los Use Cases (lógica de negocio)
4. Los Use Cases interactúan con el Domain Model (entidades del dominio)
5. Los Use Cases persisten datos en la Database (SQLite)
6. Los Use Cases consultan el servicio de IA Generativa (OpenAI) para:
   - Extracción de datos estructurados desde lenguaje natural
   - Generación de mensajes de alerta

### **2.2. Descripción de componentes principales:**

#### Frontend (Web SPA)
- **Tecnología**: React + Vite + Tailwind CSS
- **Responsabilidades**:
  - Interacción con el usuario
  - Captura de lenguaje natural
  - Visualización de estado
  - Gestión de autenticación (JWT tokens)
- **Componentes clave**:
  - [`AuthView`](frontend/src/components/AuthView.jsx:1): Registro y login
  - [`DashboardView`](frontend/src/components/DashboardView.jsx:1): Vista principal
  - [`ExpenseInput`](frontend/src/components/ExpenseInput.jsx:1): Entrada de gastos
  - [`ExpenseList`](frontend/src/components/ExpenseList.jsx:1): Lista de gastos
  - [`BudgetProgress`](frontend/src/components/BudgetProgress.jsx:1): Progreso del presupuesto
  - [`MonthlyLimit`](frontend/src/components/MonthlyLimit.jsx:1): Gestión de tope
  - [`AlertBanner`](frontend/src/components/AlertBanner.jsx:1): Alertas

#### Backend (API FastAPI)
- **Tecnología**: Python + FastAPI + SQLAlchemy
- **Responsabilidades**:
  - Autenticación (JWT)
  - Reglas de negocio
  - Persistencia
  - Orquestación con IA
- **Estructura**:
  - [`main.py`](backend/main.py:1): Punto de entrada y configuración
  - [`app/api/v1/`](backend/app/api/v1/): Endpoints REST
  - [`app/models/`](backend/app/models/): Modelos de datos
  - [`app/schemas/`](backend/app/schemas/): Schemas Pydantic
  - [`app/core/`](backend/app/core/): Configuración y seguridad
  - [`app/services/`](backend/app/services/): Servicios externos (IA)

#### Servicio de IA Generativa
- **Tecnología**: OpenAI GPT-3.5 Turbo
- **Responsabilidades**:
  - Extracción estructurada de gastos desde lenguaje natural
  - Generación de mensajes de alerta
- **Implementación**: [`ai_client.py`](backend/app/services/ai_client.py:1)

#### Base de Datos
- **Tecnología**: SQLite
- **Responsabilidades**:
  - Estado persistente del dominio
  - Almacenamiento de usuarios, gastos y topes mensuales

### **2.3. Descripción de alto nivel del proyecto y estructura de ficheros**

```
AI4Devs-finalproject/
├── backend/                          # Backend FastAPI
│   ├── app/
│   │   ├── api/                      # Capa de API
│   │   │   ├── v1/                  # Endpoints v1
│   │   │   │   ├── auth.py          # Registro y login
│   │   │   │   ├── expenses.py      # Gestión de gastos
│   │   │   │   └── limit.py        # Gestión de tope mensual
│   │   │   ├── deps.py              # Dependencias (DB, auth)
│   │   │   └── api_v1.py           # Router principal
│   │   ├── core/                    # Configuración central
│   │   │   ├── config.py            # Settings
│   │   │   └── security.py         # JWT y hashing
│   │   ├── db/                      # Base de datos
│   │   │   ├── base.py             # Base SQLAlchemy
│   │   │   └── session.py         # Sesión DB
│   │   ├── models/                  # Modelos ORM
│   │   │   ├── user.py
│   │   │   ├── expense.py
│   │   │   └── monthly_limit.py
│   │   ├── schemas/                 # Schemas Pydantic
│   │   │   ├── user.py
│   │   │   ├── expense.py
│   │   │   ├── monthly_limit.py
│   │   │   └── utils.py
│   │   └── services/                # Servicios externos
│   │       └── ai_client.py         # Cliente OpenAI
│   ├── main.py                      # Aplicación FastAPI
│   ├── requirements.txt              # Dependencias Python
│   └── .env.example                # Variables de entorno
│
├── frontend/                         # Frontend React
│   ├── src/
│   │   ├── components/              # Componentes UI
│   │   │   ├── AuthView.jsx
│   │   │   ├── DashboardView.jsx
│   │   │   ├── ExpenseInput.jsx
│   │   │   ├── ExpenseList.jsx
│   │   │   ├── BudgetProgress.jsx
│   │   │   ├── MonthlyLimit.jsx
│   │   │   ├── AlertBanner.jsx
│   │   │   ├── StatCard.jsx
│   │   │   └── ExpenseChart.jsx
│   │   ├── contexts/                # Contextos React
│   │   │   └── AuthContext.jsx     # Gestión de autenticación
│   │   ├── services/                # Servicios API
│   │   │   ├── api.js              # Cliente HTTP
│   │   │   └── mockApi.js          # Mock para pruebas
│   │   ├── App.jsx                  # Componente principal
│   │   └── main.jsx                # Punto de entrada
│   ├── package.json                 # Dependencias Node
│   ├── vite.config.js              # Configuración Vite
│   └── tailwind.config.js          # Configuración Tailwind
│
├── docs/                           # Documentación del proyecto
│   ├── 00 prd.md                   # Product Requirements Document
│   ├── 01 historias_usuario_priorizadas.md
│   ├── 02 modelo_datos.md
│   ├── 03 arquitectura_minima.md
│   ├── 04 contrato.md              # Contrato OpenAPI
│   ├── 05 mapeo_API_usecases.md
│   ├── 06 promptsAI.md
│   ├── 07 tareas.md                # Desglose de tareas
│   └── FINAL_PRD.md
│
├── readme.md                        # Documentación principal
├── prompts.md                       # Prompts de IA
├── verify_backend.py                # Script de verificación backend
└── verify_integration.py            # Script de verificación integración
```

### **2.4. Infraestructura y despliegue**

Por avanzar en la fase 2

### **2.5. Seguridad**

Por avanzar en la fase 2

### **2.6. Tests**

Por avanzar en la fase 2

---

## 3. Modelo de Datos

### **3.1. Diagrama del modelo de datos:**
```mermaid
erDiagram

    USER {
        uuid id PK
        string email
        string password_hash
        timestamp created_at
    }

    MONTHLY_LIMIT {
        uuid id PK
        uuid user_id FK
        string month
        decimal amount
        timestamp created_at
        timestamp updated_at
    }

    EXPENSE {
        uuid id PK
        uuid user_id FK
        decimal amount
        string category
        string description
        date expense_date
        timestamp created_at
    }

    USER ||--o{ EXPENSE : "registra"
    USER ||--o{ MONTHLY_LIMIT : "define"
```

### **3.2. Descripción de entidades principales:**

[Definiciones del modelo](02modelodatos.md#seccion-2)

---

## 4. Especificación de la API

La API REST está implementada con FastAPI y sigue el contrato OpenAPI 3.0. Todos los endpoints están bajo el prefijo `/api/v1`.

### **4.1. Autenticación**

#### POST `/api/v1/auth/register`
Registro de un nuevo usuario.

**Request Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "id": 1,
  "email": "usuario@ejemplo.com",
  "isActive": true
}
```

**Error (400):** El email ya existe en el sistema.

---

#### POST `/api/v1/auth/login/access-token`
Inicio de sesión y obtención de token JWT.

**Request Body (form-data):**
```
username: usuario@ejemplo.com
password: password123
```

**Response (200):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

**Error (400):** Credenciales inválidas.

---

### **4.2. Gestión de Tope Mensual**

#### POST `/api/v1/monthly-limit`
Definir o actualizar el tope mensual del usuario autenticado.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "amount": 1000000
}
```

**Response (200):**
```json
{
  "id": 1,
  "userId": 1,
  "month": "2025-01",
  "amount": 1000000,
  "createdAt": "2025-01-15T10:30:00",
  "updatedAt": "2025-01-15T10:30:00"
}
```

---

### **4.3. Gestión de Gastos**

#### POST `/api/v1/expenses`
Registrar un gasto usando lenguaje natural.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "text": "Gasté 45000 en mercado hoy"
}
```

**Response (201):** Retorna el estado actualizado del dashboard.
```json
{
  "monthlyLimit": 1000000,
  "totalSpent": 45000,
  "expenses": [
    {
      "id": 1,
      "userId": 1,
      "amount": 45000,
      "category": "Alimentación",
      "description": "Compra de mercado",
      "expenseDate": "2025-01-15",
      "createdAt": "2025-01-15T10:30:00"
    }
  ],
  "alert": null
}
```

**Error (400):** La IA no pudo procesar el texto.

---

### **4.4. Dashboard**

#### GET `/api/v1/dashboard`
Obtener el estado financiero actual del usuario.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200):**
```json
{
  "monthlyLimit": 1000000,
  "totalSpent": 1045000,
  "expenses": [
    {
      "id": 1,
      "userId": 1,
      "amount": 45000,
      "category": "Alimentación",
      "description": "Compra de mercado",
      "expenseDate": "2025-01-15",
      "createdAt": "2025-01-15T10:30:00"
    }
  ],
  "alert": {
    "message": "Alert: You have exceeded your monthly limit of 1000000 by 45000. Be careful!"
  }
}
```

---

### **4.5. Documentación Interactiva**

La API incluye documentación automática disponible en:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

---

## 5. Historias de Usuario

### Flujo E2E seleccionado
** Registro → Login → Definir tope mensual → Registrar gasto → Alerta por excedente **
- Tiene inicio claro (usuario nuevo)
- Tiene decisión explícita (tope)
- Tiene acción repetible (registro de gasto)
- Tiene resultado observable (alerta)
- Permite uso de IA fuera y dentro del código
- Se puede probar extremo a extremo en minutos

**Historia de Usuario 1**
Como usuario nuevo, quiero crear una cuenta con mis credenciales básicas, para poder acceder de forma segura a mi información de gastos personales.

**Historia de Usuario 2**
Como usuario autenticado, quiero definir un tope mensual de gasto, para tener una referencia clara de cuánto puedo gastar durante el mes.

**Historia de Usuario 3**
Como usuario autenticado, quiero registrar un gasto escribiéndolo en lenguaje natural, para evitar formularios complejos y reducir el esfuerzo al llevar el control de mis gastos.

**Historia de Usuario 4**
Como usuario que controla sus gastos, quiero recibir una alerta clara cuando supere mi tope mensual, para ser consciente inmediatamente de que he excedido mi límite.

---

## 6. Tickets de Trabajo

Los tickets de trabajo se derivan del desglose de tareas definido en [`docs/07 tareas.md`](docs/07 tareas.md:1). A continuación se documentan los tickets principales implementados:

**Ticket 1 - Endpoint de registro de gasto en texto libre**
- **Descripción**: Implementar un endpoint backend que reciba texto libre, lo procese y registre un gasto asociado al usuario autenticado.
- **Estado**: Completado
- **Implementación**: [`backend/app/api/v1/expenses.py`](backend/app/api/v1/expenses.py:16)
- **Criterios de Aceptación**:
  - Endpoint protegido por autenticación
  - Recibe texto plano como input
  - Retorna éxito o error explícito según validaciones
  - Nunca persiste gastos inválidos

**Ticket 2 - Servicio de interpretación de texto (IA)**
- **Descripción**: Implementar la lógica que interpreta el texto y extrae monto y fecha mínima requerida.
- **Estado**: Completado
- **Implementación**: [`backend/app/services/ai_client.py`](backend/app/services/ai_client.py:12)
- **Criterios de Aceptación**:
  - Extrae monto numérico > 0 o falla explícitamente
  - Asigna fecha del mes actual por defecto
  - Rechaza textos con múltiples gastos

**Ticket 3 - UI de registro por texto**
- **Descripción**: Crear componente frontend que permita ingresar texto y mostrar confirmación o error.
- **Estado**: Completado
- **Implementación**: [`frontend/src/components/ExpenseInput.jsx`](frontend/src/components/ExpenseInput.jsx:1)
- **Criterios de Aceptación**:
  - Campo único de texto
  - Feedback inmediato de éxito o error
  - No muestra formularios adicionales

---

## 7. Pull Requests

> Documenta 3 de las Pull Requests realizadas durante la ejecución del proyecto

**Pull Request 1 - feature/etapa1-documentacion**
- **Título**: Merge pull request #1 from nigivamu/feature/etapa1-documentacion
- **Fecha**: Hace 6 semanas
- **Commits incluidos**:
  - `c77cfb7` - 📝 docs: add task breakdown documentation and prompt template
  - `aaa06d3` - 📝 docs: add comprehensive project documentation and architecture
- **Descripción**: Esta PR estableció la base documental del proyecto, incluyendo:
  - Documentación completa del PRD ([`docs/00 prd.md`](docs/00 prd.md:1))
  - Historias de usuario priorizadas ([`docs/01 historias_usuario_priorizadas.md`](docs/01 historias_usuario_priorizadas.md:1))
  - Modelo de datos ([`docs/02 modelo_datos.md`](docs/02 modelo_datos.md:1))
  - Arquitectura mínima ([`docs/03 arquitectura_minima.md`](docs/03 arquitectura_minima.md:1))
  - Contrato de API ([`docs/04 contrato.md`](docs/04 contrato.md:1))
  - Mapeo API-UseCases ([`docs/05 mapeo_API_usecases.md`](docs/05 mapeo_API_usecases.md:1))
  - Prompts de IA ([`docs/06 promptsAI.md`](docs/06 promptsAI.md:1))
  - Desglose de tareas ([`docs/07 tareas.md`](docs/07 tareas.md:1))

**Pull Request 2 - feature-entrega2-ngvm**
- **Título**: Merge pull request #2 from nigivamu/feature-entrega2-ngvm
- **Fecha**: Hace 4 días
- **Commits incluidos**:
  - `9a55a27` - feat: update database and gitignore files
  - `9c59f6a` - ✅ test: add backend integration verification script
  - `6f231fc` - ✅ test: add E2E testing setup with Playwright
  - `37d8d35` - 🐛 fix: resolve auth flow issues
  - `1a0d1fe` - ✨ feat: integrate frontend with real backend API
  - `c2d4967` - feat: Initialize React frontend application for personal expense tracking
  - `139c652` - feat: implement FastAPI backend with expense tracking and AI integration
- **Descripción**: Esta PR implementó el MVP funcional del sistema, incluyendo:
  - Backend FastAPI completo con autenticación JWT
  - Frontend React con componentes UI
  - Integración con OpenAI para procesamiento de lenguaje natural
  - Scripts de verificación de backend e integración
  - Configuración de pruebas E2E con Playwright

**Pull Request 3 - Pendiente**
- **Nota**: Solo se encontraron 2 pull requests en el historial de git del proyecto. Para completar esta sección, se requiere información adicional sobre una tercera PR o confirmación de que solo existen 2 PRs en el proyecto.

