# 🟢 Historia 1 — Registro de gasto en lenguaje natural (NÚCLEO)

## 🧩 Tarea 1.1 — Endpoint de registro de gasto en texto libre

**Título:** API para registrar gasto desde texto en lenguaje natural
**Descripción:** Implementar un endpoint backend que reciba texto libre, lo procese y registre un gasto asociado al usuario autenticado.
**Criterios de Aceptación:**

* Endpoint protegido por autenticación.
* Recibe texto plano como input.
* Retorna éxito o error explícito según validaciones.
* Nunca persiste gastos inválidos.
  **Prioridad:** Alta
  **Etiquetas:** Backend, API, Sprint 1
  **Comentarios:** Este endpoint es bloqueante para todo el sistema.
  **Enlaces:** PRD – Registro de gasto
  **Historial de Cambios:**
* Creado: [fecha]

---

## 🧩 Tarea 1.2 — Servicio de interpretación de texto (IA / reglas)

**Título:** Servicio de extracción de monto y fecha desde texto
**Descripción:** Implementar la lógica que interpreta el texto y extrae monto y fecha mínima requerida.
**Criterios de Aceptación:**

* Extrae monto numérico > 0 o falla explícitamente.
* Asigna fecha del mes actual por defecto.
* Rechaza textos con múltiples gastos.
  **Prioridad:** Alta
  **Etiquetas:** Backend, IA, Dominio
  **Comentarios:** No optimizar precisión, priorizar control de errores.
  **Enlaces:** Definición de errores aceptables IA
  **Historial de Cambios:**
* Creado: [fecha]

---

## 🧩 Tarea 1.3 — Persistencia del gasto

**Título:** Persistencia de gasto asociado a usuario
**Descripción:** Guardar el gasto validado en base de datos y asegurar su consulta inmediata.
**Criterios de Aceptación:**

* El gasto queda asociado al userId.
* Persistencia transaccional.
* Disponible inmediatamente tras el registro.
  **Prioridad:** Alta
  **Etiquetas:** Backend, DB
  **Comentarios:** Validar consistencia con futuros cálculos.
  **Enlaces:** Modelo de datos
  **Historial de Cambios:**
* Creado: [fecha]

---

## 🧩 Tarea 1.4 — UI de registro por texto

**Título:** Interfaz para ingreso de gasto en texto libre
**Descripción:** Crear componente frontend que permita ingresar texto y mostrar confirmación o error.
**Criterios de Aceptación:**

* Campo único de texto.
* Feedback inmediato de éxito o error.
* No muestra formularios adicionales.
  **Prioridad:** Alta
  **Etiquetas:** Frontend, UX
  **Comentarios:** UX simple, sin distracciones.
  **Enlaces:** Wireframes
  **Historial de Cambios:**
* Creado: [fecha]

---

# 🟢 Historia 2 — Definición de tope mensual

## 🧩 Tarea 2.1 — API de gestión de tope mensual

**Título:** Endpoint para definir y modificar tope mensual
**Descripción:** Permitir crear o actualizar el tope del mes actual para un usuario.
**Criterios de Aceptación:**

* Solo un tope activo por mes.
* Reemplazo directo del valor anterior.
* Rechaza valores ≤ 0.
  **Prioridad:** Alta
  **Etiquetas:** Backend, API
  **Comentarios:** No versionar topes históricos.
  **Enlaces:** PRD – Tope mensual
  **Historial de Cambios:**
* Creado: [fecha]

---

## 🧩 Tarea 2.2 — Persistencia del tope

**Título:** Almacenamiento del tope mensual vigente
**Descripción:** Guardar el tope asociado a usuario y mes.
**Criterios de Aceptación:**

* Clave única usuario + mes.
* Actualización idempotente.
  **Prioridad:** Media
  **Etiquetas:** Backend, DB
  **Comentarios:** Simplificar consultas posteriores.
  **Historial de Cambios:**
* Creado: [fecha]

---

## 🧩 Tarea 2.3 — UI de configuración de tope

**Título:** Pantalla de definición de tope mensual
**Descripción:** Permitir al usuario definir y modificar su tope mensual.
**Criterios de Aceptación:**

* Campo numérico validado.
* Visualización del tope actual.
* Mensajes claros de error.
  **Prioridad:** Media
  **Etiquetas:** Frontend
  **Comentarios:** No sobrecargar la pantalla.
  **Historial de Cambios:**
* Creado: [fecha]

---

# 🟡 Historia 3 — Alerta por excedente del tope

## 🧩 Tarea 3.1 — Cálculo de gasto acumulado

**Título:** Servicio de cálculo de gasto mensual acumulado
**Descripción:** Calcular el total de gastos del mes tras cada nuevo registro.
**Criterios de Aceptación:**

* Cálculo correcto y consistente.
* Solo considera gastos del mes actual.
  **Prioridad:** Media
  **Etiquetas:** Backend, Dominio
  **Comentarios:** Preparar para optimización futura.
  **Historial de Cambios:**
* Creado: [fecha]

---

## 🧩 Tarea 3.2 — Generación de alerta por excedente

**Título:** Lógica de alerta por superación de tope
**Descripción:** Detectar el primer excedente mensual y generar alerta.
**Criterios de Aceptación:**

* Una sola alerta por mes.
* Se dispara inmediatamente.
* No se repite.
  **Prioridad:** Media
  **Etiquetas:** Backend, Reglas de negocio
  **Comentarios:** Evitar spam al usuario.
  **Historial de Cambios:**
* Creado: [fecha]

---

## 🧩 Tarea 3.3 — Visualización de alerta

**Título:** Mostrar alerta de excedente al usuario
**Descripción:** Mostrar alerta clara y no técnica en la UI.
**Criterios de Aceptación:**

* Visible tras el gasto causante.
* Mensaje simple y entendible.
  **Prioridad:** Media
  **Etiquetas:** Frontend, UX
  **Comentarios:** No bloquear acciones posteriores.
  **Historial de Cambios:**
* Creado: [fecha]

---

# 🟡 Historia 4 — Registro de usuario

## 🧩 Tarea 4.1 — API de registro de usuario

**Título:** Endpoint de creación de usuario
**Descripción:** Permitir crear usuarios con correo y contraseña.
**Criterios de Aceptación:**

* Validación de formato de correo.
* Contraseña con longitud mínima.
* Usuario persistido correctamente.
  **Prioridad:** Alta
  **Etiquetas:** Backend, Seguridad
  **Comentarios:** No implementar recuperación de contraseña.
  **Historial de Cambios:**
* Creado: [fecha]

---

## 🧩 Tarea 4.2 — Autenticación básica

**Título:** Implementar login de usuario
**Descripción:** Permitir autenticación con credenciales creadas.
**Criterios de Aceptación:**

* Sesión válida tras login.
* Aislamiento de datos por usuario.
  **Prioridad:** Alta
  **Etiquetas:** Backend, Seguridad
  **Comentarios:** Base para todo el sistema.
  **Historial de Cambios:**
* Creado: [fecha]

---

## 🧩 Tarea 4.3 — UI de registro e inicio de sesión

**Título:** Pantallas de registro y login
**Descripción:** Formularios simples para creación de cuenta y acceso.
**Criterios de Aceptación:**

* Validaciones visibles.
* Mensajes claros de error.
  **Prioridad:** Alta
  **Etiquetas:** Frontend
  **Comentarios:** UX mínima, sin extras.
  **Historial de Cambios:**
* Creado: [fecha]
