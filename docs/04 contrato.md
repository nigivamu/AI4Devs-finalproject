## 14. Contratos de API (OpenAPI 3.0)

El siguiente contrato define la API mínima necesaria para soportar el flujo E2E del MVP. Está alineado estrictamente con el modelo de datos y las funcionalidades del PRD.

```yaml
openapi: 3.0.3
info:
  title: MVP Seguimiento de Gastos – API
  description: API para un MVP de seguimiento de gastos personales asistido por IA generativa.
  version: 1.0.0

servers:
  - url: http://localhost:8080/api

paths:
  /auth/register:
    post:
      summary: Registro de usuario
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/RegisterRequest'
      responses:
        '201':
          description: Usuario creado
        '400':
          description: Datos inválidos

  /auth/login:
    post:
      summary: Login de usuario
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/LoginRequest'
      responses:
        '200':
          description: Login exitoso
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AuthResponse'
        '401':
          description: Credenciales inválidas

  /monthly-limit:
    post:
      summary: Definir o actualizar tope mensual
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/MonthlyLimitRequest'
      responses:
        '200':
          description: Tope definido o actualizado

  /expenses:
    post:
      summary: Registrar gasto en lenguaje natural
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ExpenseInputRequest'
      responses:
        '201':
          description: Gasto registrado
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/DashboardResponse'

  /dashboard:
    get:
      summary: Obtener estado actual del usuario
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Estado financiero actual
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/DashboardResponse'

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

  schemas:
    RegisterRequest:
      type: object
      required: [email, password]
      properties:
        email:
          type: string
          format: email
        password:
          type: string
          minLength: 6

    LoginRequest:
      type: object
      required: [email, password]
      properties:
        email:
          type: string
        password:
          type: string

    AuthResponse:
      type: object
      properties:
        token:
          type: string

    MonthlyLimitRequest:
      type: object
      required: [amount]
      properties:
        amount:
          type: number
          format: decimal

    ExpenseInputRequest:
      type: object
      required: [text]
      properties:
        text:
          type: string
          example: "Gasté 45000 en mercado hoy"

    Expense:
      type: object
      properties:
        id:
          type: string
        amount:
          type: number
        category:
          type: string
        description:
          type: string
        expenseDate:
          type: string
          format: date

    Alert:
      type: object
      properties:
        message:
          type: string

    DashboardResponse:
      type: object
      properties:
        monthlyLimit:
          type: number
        totalSpent:
          type: number
        expenses:
          type: array
          items:
            $ref: '#/components/schemas/Expense'
        alert:
          $ref: '#/components/schemas/Alert'
```