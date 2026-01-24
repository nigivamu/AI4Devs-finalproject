## Índice

1. [Descripción general del producto](#1-descripción-general-del-producto)
2. [Arquitectura del sistema](#2-arquitectura-del-sistema)
3. [Modelo de datos](#3-modelo-de-datos)
4. [Especificación de la API](#4-especificación-de-la-api)
5. [Historias de usuario](#5-historias-de-usuario)
6. [Tickets de trabajo](#6-tickets-de-trabajo)
7. [Pull requests](#7-pull-requests)

---

## 1. Descripció0n general del producto

Inicializar la comprensión del proyecto y los puntos que aportan valor en la solución
**Prompt 1:** Se usa CHATGPT
```
Actúa como un Consultor de Estrategia de Producto y Experto en Startups Fintech.
Tengo la intención de desarrollar una aplicación de seguimiento de gastos personales.
Sé que el mercado está saturado con apps que requieren mucha entrada manual y dashboards complejos que nadie mira.

Tu tarea:
1. Analiza las falencias críticas de las apps tradicionales de gastos (ej: fatiga del usuario, fricción en la entrada de datos).
2. Propón 3 ángulos de diferenciación radical utilizando Inteligencia Artificial Generativa. No quiero "dashboards predictivos", quiero soluciones que cambien el comportamiento del usuario.
3. Céntrate en el concepto de "Fricción Cero". ¿Cómo sería una app donde la UI gráfica es secundaria y la conversación es primaria?

Salida esperada: Un análisis crítico y 3 propuestas de valor únicas (Value Propositions) que justifiquen la existencia de esta nueva app en el mercado.
```

**Prompt 2:**
```
Me gusta, ahora basado en la propuesta de "Fricción Cero" y uso de Lenguaje Natural (NLP) que identificas, vamos a definir el mercado.
Cual sería el mercado target de la aplicación?
Tu tarea:
1. Define 2 Arquetipos de Cliente (Buyer Personas) que sufran dolorosamente la gestión administrativa de sus gastos (ej: Freelancers caóticos, Nómadas digitales, o personas con TDAH financiero).
2. Para el mejor arquetipo, define el "Job to be Done" (Trabajo a realizar). No es "registrar gastos", es el beneficio emocional/funcional final (ej: "Tener paz mental sin dedicar tiempo").
3. Describe el "Happy Path" del usuario: Desde que hace una compra en la calle hasta que recibe un insight valioso, sin abrir formularios complejos.
Salida esperada: Definición precisa del nicho de mercado y el flujo de experiencia de usuario ideal que valide la idea de negocio.
```

**Prompt 3:**
```
Con el nicho y la propuesta de valor definidos, necesito concretar la idea de negocio en un formato ejecutable.
Vamos a estructurar el MVP y el Modelo de Negocio.
Tu tarea es generar un resumen tipo "Lean Canvas" enfocado en la viabilidad:
1. **Features del MVP (Strict Scope):** Enumera las 4 funcionalidades nucleares que permiten cobrar por el servicio desde el día 1 (Alertas de tope en tiempo real).
2. **Lo que NO es el MVP:** Lista qué funcionalidades costosas quedan fuera (ej: Conexión bancaria PSD2, Inversiones, Multiusuario).
3. **Estrategia de Monetización:** Propón un modelo de ingresos que no sea publicidad. (ej: Freemium vs Suscripción por "Ahorro generado").
4. **Elevator Pitch:** Escribe una frase de venta de 2 líneas que resuma la idea para un inversor.
Objetivo final: Tener una hoja de ruta clara para construir un producto vendible, no solo un proyecto de código.
```

---

## 2. Arquitectura del Sistema

### **2.1. Diagrama de arquitectura:**

**Prompt 1:**

**Prompt 2:**

**Prompt 3:**

### **2.2. Descripción de componentes principales:**

**Prompt 1:**

**Prompt 2:**

**Prompt 3:**

### **2.3. Descripción de alto nivel del proyecto y estructura de ficheros**

**Prompt 1:**

**Prompt 2:**

**Prompt 3:**

### **2.4. Infraestructura y despliegue**

**Prompt 1:**

**Prompt 2:**

**Prompt 3:**

### **2.5. Seguridad**

**Prompt 1:**

**Prompt 2:**

**Prompt 3:**

### **2.6. Tests**

**Prompt 1:**

**Prompt 2:**

**Prompt 3:**

---

### 3. Modelo de Datos

**Prompt 1:**

**Prompt 2:**

**Prompt 3:**

---

### 4. Especificación de la API

**Prompt 1:**

**Prompt 2:**

**Prompt 3:**

---

### 5. Historias de Usuario
Antes de la generación de historias se genera el PRD con
```
Con la información y las aclaraciones que tenemos hasta el momento quiero que elabores un Product Requirements Document (PRD) detallado con las funcionalidades propuestas y lo que haría el sistema. 
Realiza un documento muy completo, detallado y profesional como para continuar con el proceso.
```

**Prompt 1:**
```
#Rol:
Eres un gerente de producto con más de 15 años de experiencia con especializción en generación de historias de usuario.
#Contexto:
El contexto está en el documento PDR adjunto.
#Instrucciones:
Genera una lista de 4 historias de usuario.
Cada historia de usuario debe ser independiente y desarrollarse y probarse por separado.
Evita incluir detalles de implementación.
Tóma tiempo para planificr y completar la tarea.
#Estilo:
El tono debe ser profesaional y directo. Evita el uso de jerga técnica.
#Formato:
Todas las historias de usuario deben seguir el formato:
    Como [tipo de usuario], quiero [objetivo] para [beneficio].
 y estar en formato markdown.
#Ejemplo: **Como** usuario de la aplicación para la gestión de datos, **quiero** recibir alertas en la aplicación cuando superte mis topes de gastos, **para** así conocer cuando he superado mis límites

```

**Prompt 2:**
```
Dadas las historias de usuario, pririza y define: criterios de aceptación, criterios de aceptación negativos (errores aceptables) y definir los casos de prueba por historia(happy path + edge cases)
```

**Prompt 3:**

---

### 6. Tickets de Trabajo
```
#Rol:
Eres un experto Administrador de proyectos con 15 años de experiencia dividiendo historias de usuario en tareas para ser trabajadas por los equipos de desarrollo tanto de backe end como front end. Utilizar tu experiencia para dividir las tareas te tal suerte que cumplan con los criterios INVEST de Bil Wake.
#Contexto:
Se ha definido las historias para la implementación de la solución Gestor de Gastos Personal en <<ARCHIVO>> y se requiere de tu experiencia y conocimiento para generar las tareas para dichas historias y ser entregadas al equipo de desarrollo.
#Instrucciones:
Genera las historias necesarias para que cada una de las historias de usuario registradas se cumplan y al finalizar puedan ser probadas y funcionales.
#Estilo:
**Título:**
**Descripción:**
**Criterios de Aceptación:**
**Prioridad:**
**Etiquetas:** 
**Comentarios:** 
**Enlaces:** 
**Historial de Cambios:**
#Ejemplo:
**Título:** Implementación de Autenticación de Dos Factores (2FA)
**Descripción:** Añadir autenticación de dos factores para mejorar la seguridad del login de usuarios. Debe soportar aplicaciones de autenticación como Authenticator y mensajes SMS.
**Criterios de Aceptación:**
- Los usuarios pueden seleccionar 2FA desde su perfil.
- Soporte para Google Authenticator y SMS.
- Los usuarios deben confirmar el dispositivo 2FA durante la configuración.
**Prioridad:** Alta
**Etiquetas:** Seguridad, Backend, Sprint 10
**Comentarios:** Verificar la compatibilidad con la base de usuarios internacionales para el envío de SMS.
**Enlaces:** Documento de Especificación de Requerimientos de Seguridad
**Historial de Cambios:**
- 01/10/2023: Creado por [nombre]
- 05/10/2023: Prioridad actualizada a Alta por [nombre]
```

**Prompt 1:**

**Prompt 2:**

**Prompt 3:**

---

### 7. Pull Requests

**Prompt 1:**

**Prompt 2:**

**Prompt 3:**
