# Product Requirements Document (PRD)

## 1. Información General

**Nombre del producto:** MVP de Seguimiento de Gastos Personales asistido por IA Generativa
**Tipo:** Aplicación web (MVP)
**Audiencia objetivo:** Usuarios individuales que desean controlar sus gastos personales con mínima fricción
**Contexto académico:** Proyecto final de un curso orientado a desarrolladores sobre uso de IA generativa como copiloto a lo largo del ciclo de vida del software

---

## 2. Propósito del Documento

Este documento define de manera formal, completa y no ambigua los requisitos del producto (funcionales y no funcionales) para el desarrollo de un **MVP** de seguimiento de gastos personales.
El PRD sirve como **fuente única de verdad** para continuar con las siguientes fases del proceso: diseño técnico, implementación, pruebas y validación académica.

---

## 3. Objetivo del Producto

El objetivo del producto es **demostrar cómo la IA generativa puede integrarse de forma efectiva y consciente en un producto de software**, reduciendo la fricción de uso y aportando valor real, al mismo tiempo que sirve como caso de estudio de un proceso de desarrollo asistido por IA de extremo a extremo.

El producto busca validar que:

* El lenguaje natural puede reemplazar formularios rígidos en flujos simples.
* La IA generativa puede asistir tanto en la interacción con el usuario como en la lógica de negocio explicativa.
* Un MVP bien acotado puede entregar valor completo sin complejidad innecesaria.

---

## 4. Problema a Resolver

Muchos usuarios desean llevar control de sus gastos, pero abandonan rápidamente las herramientas existentes debido a:

* Procesos de registro tediosos
* Formularios extensos y poco naturales
* Sobrecarga de información (gráficas, métricas complejas)

El producto aborda este problema **reduciendo la carga cognitiva**, permitiendo que el usuario:

* Registre gastos usando lenguaje natural
* Defina un límite simple de gasto
* Reciba retroalimentación inmediata y comprensible

---

## 5. Alcance del MVP

### 5.1 Incluido en el MVP

* Registro y autenticación básica de usuarios
* Definición de un tope mensual de gasto
* Registro de gastos en lenguaje natural mediante IA generativa y mediante interfaz web
* Cálculo automático del gasto mensual acumulado
* Generación de alertas cuando se supera el tope
* Visualización básica del estado financiero actual

### 5.2 Fuera de Alcance (explícitamente excluido)

* Integraciones bancarias
* Presupuestos por categoría
* Análisis histórico avanzado
* Dashboards gráficos
* Multiusuario avanzado o roles
* Notificaciones externas (email, push, SMS)

Estas exclusiones son decisiones conscientes para mantener el foco en el objetivo del MVP.

---

## 6. Flujo E2E Prioritario

El producto implementa un único flujo de valor completo:

1. Registro de usuario
2. Inicio de sesión
3. Definición de tope mensual
4. Registro de gasto en lenguaje natural
5. Evaluación del gasto acumulado
6. Generación de alerta por excedente (si aplica)

Este flujo tiene principio y fin claros y permite validar el uso de IA de forma tangible.

---

## 7. Funcionalidades Detalladas

### F1. Registro de Usuario

**Descripción:**
Permite crear una cuenta mediante email y contraseña.

**Requisitos funcionales:**

* Validación básica de email
* Contraseña con longitud mínima
* Persistencia del usuario

**Restricciones:**

* No incluye recuperación de contraseña
* No incluye autenticación social

---

### F2. Autenticación (Login)

**Descripción:**
Permite al usuario iniciar sesión para acceder a sus datos.

**Requisitos funcionales:**

* Autenticación basada en credenciales
* Sesión activa mientras dure el uso

---

### F3. Definición de Tope Mensual

**Descripción:**
Permite al usuario definir un monto máximo de gasto para el mes en curso.

**Requisitos funcionales:**

* Tope numérico positivo
* Editable en cualquier momento
* Asociado al usuario y al mes actual

**Restricciones:**

* No se gestionan topes históricos
* No existen topes por categoría

---

### F4. Registro de Gasto en Lenguaje Natural (Funcionalidad Núcleo)

**Descripción:**
Permite registrar un gasto mediante una frase libre escrita por el usuario.

**Ejemplo de entrada:**

> "Gasté 45.000 en mercado hoy"

**Procesamiento mediante IA generativa:**

* Extracción del monto
* Inferencia de fecha (explícita o implícita)
* Clasificación básica por categoría
* Generación de descripción estructurada

**Requisitos funcionales:**

* Un gasto por mensaje
* Persistencia inmediata del gasto

**Restricciones:**

* No se permite edición posterior del gasto

---

### F5. Cálculo del Gasto Mensual Acumulado

**Descripción:**
El sistema calcula automáticamente el total de gastos del mes actual cada vez que se registra un nuevo gasto.

**Requisitos funcionales:**

* Suma de todos los gastos del mes en curso
* Asociación correcta por usuario

---

### F6. Generación de Alerta por Excedente de Tope

**Descripción:**
Cuando el gasto acumulado supera el tope mensual, el sistema genera una alerta en lenguaje natural.

**Características:**

* Texto generado por IA
* Mensaje claro, contextual y no técnico
* Visible inmediatamente tras el evento

**Restricciones:**

* No se envían notificaciones externas
* Solo una alerta activa

---

### F7. Visualización Básica del Estado Actual

**Descripción:**
Pantalla única que muestra:

* Tope mensual
* Gasto acumulado
* Lista simple de gastos registrados

**Restricciones:**

* Sin filtros
* Sin búsqueda
* Sin orden avanzado

---

## 8. Requisitos No Funcionales

* **Usabilidad:** Interfaz simple, con una sola vista principal
* **Rendimiento:** Respuesta inmediata para operaciones básicas
* **Seguridad:** Manejo básico de credenciales y sesiones
* **Escalabilidad:** No prioritaria para el MVP

---

## 9. Suposiciones y Dependencias

* El usuario introduce gastos de forma honesta
* La IA generativa puede cometer errores y estos son aceptables dentro del MVP
* El proyecto prioriza aprendizaje y demostración sobre robustez productiva

---

## 10. Métricas de Éxito

* El flujo E2E puede completarse sin errores
* El usuario puede registrar un gasto sin usar formularios
* La alerta se genera correctamente al superar el tope
* El uso de IA está claramente justificado y documentado

---

## 11. Riesgos Identificados

* Ambigüedad en el lenguaje natural del usuario
* Errores de inferencia de fecha o monto
* Sobredependencia de la IA

Estos riesgos son aceptados y documentados como parte del aprendizaje.

---

## 12. Consideraciones Éticas y de Privacidad

* Los datos financieros son sensibles
* El MVP minimiza la recolección de información
* No se comparten datos con terceros
