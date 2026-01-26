# Frontend - Control de Gastos Personales (Mock)

Esta es una aplicación React que sirve como mock para demostrar la funcionalidad esperada del MVP de Seguimiento de Gastos Personales asistido por IA Generativa.

## Características

### Autenticación
- Registro de usuario con email y contraseña
- Inicio de sesión
- Cierre de sesión

### Dashboard
- **Tope Mensual**: Definir y editar el límite de gasto mensual
- **Registro de Gastos**: Ingresar gastos en lenguaje natural (ej: "Gasté 45000 en mercado hoy")
- **Resumen del Mes**: Visualización del gasto acumulado y progreso hacia el tope
- **Lista de Gastos**: Historial de gastos del mes actual con categorías
- **Alertas**: Notificación cuando se supera el tope mensual

## Tecnologías

- React 18
- React Router DOM
- Vite

## Instalación

```bash
cd frontend
npm install
```

## Ejecutar en modo desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## Construir para producción

```bash
npm run build
```

## Notas

Esta es una aplicación mock que:
- Simula todas las funcionalidades descritas en la documentación
- No se conecta a una base de datos real
- No integra con un servicio de IA real (usa lógica simulada)
- Los datos se almacenan en memoria y se pierden al recargar la página

## Estructura del Proyecto

```
frontend/
├── src/
│   ├── components/
│   │   ├── AlertBanner.jsx       # Banner de alerta por excedente
│   │   ├── AuthView.jsx          # Vista de login/registro
│   │   ├── DashboardView.jsx     # Vista principal del dashboard
│   │   ├── ExpenseInput.jsx      # Formulario para registrar gastos
│   │   ├── ExpenseList.jsx       # Lista de gastos
│   │   ├── MonthlyLimit.jsx      # Componente para definir tope mensual
│   │   └── SpendingSummary.jsx   # Resumen de gastos del mes
│   ├── contexts/
│   │   └── AuthContext.jsx       # Contexto de autenticación
│   ├── services/
│   │   └── mockApi.js            # API simulada
│   ├── App.jsx                   # Componente principal con rutas
│   └── main.jsx                  # Punto de entrada
├── index.html
├── package.json
└── vite.config.js
```

## Flujo de Usuario

1. **Registro/Login**: El usuario crea una cuenta o inicia sesión
2. **Definir Tope**: El usuario establece su límite mensual de gasto
3. **Registrar Gastos**: El usuario escribe gastos en lenguaje natural
4. **Visualizar Progreso**: El usuario ve su gasto acumulado y alertas si excede el tope
