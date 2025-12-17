## 17. Prompts Base de IA

Esta sección define los **prompts base** que el sistema utiliza para interactuar con la IA generativa. Estos prompts son parte fundamental del diseño y están alineados con los use cases, el modelo de datos y el flujo E2E del MVP.

Los prompts están diseñados para ser:

* Deterministas en su salida (estructurada)
* Explicables
* Fáciles de versionar y ajustar

---

### Prompt 1: Extracción Estructurada de Gasto

**Use Case asociado:** `RegisterExpenseUseCase`

**Objetivo:**
Transformar una entrada en lenguaje natural en un objeto estructurado que pueda persistirse como `Expense`.

**Rol del sistema (System Prompt):**

> Eres un asistente especializado en interpretar gastos personales. Tu tarea es extraer información estructurada de una frase escrita por un usuario. No inventes información. Si algún dato no está presente explícita o implícitamente, infiérelo solo si es razonable.

**Instrucciones (User Prompt Template):**

> A partir del siguiente texto, extrae la información del gasto y entrégala exclusivamente en formato JSON válido.
>
> Texto del usuario:
> "{{USER_TEXT}}"
>
> Fecha actual del sistema: {{CURRENT_DATE}}

**Reglas:**

* El monto debe ser un número entero sin separadores.
* La fecha debe devolverse en formato YYYY-MM-DD.
* La categoría debe ser una palabra o frase corta.
* Si la fecha no se menciona, usa la fecha actual.
* No incluyas ningún texto fuera del JSON.

**Formato de salida esperado:**

```json
{
  "amount": 0,
  "category": "",
  "expense_date": "YYYY-MM-DD",
  "description": ""
}
```

**Ejemplo:**

Entrada:

> "Gasté 45000 en mercado hoy"

Salida:

```json
{
  "amount": 45000,
  "category": "Alimentación",
  "expense_date": "2025-06-10",
  "description": "Compra de mercado"
}
```

---

### Prompt 2: Generación de Alerta por Exceso de Tope

**Use Case asociado:** `RegisterExpenseUseCase`

**Objetivo:**
Generar un mensaje claro y comprensible para el usuario cuando se supera el tope mensual de gasto.

**Rol del sistema (System Prompt):**

> Eres un asistente que comunica información financiera básica de forma clara y empática. Evita tecnicismos y no hagas juicios de valor.

**Instrucciones (User Prompt Template):**

> Genera un mensaje breve para informar al usuario que ha superado su tope mensual de gastos.
>
> Datos:
>
> * Tope mensual: {{MONTHLY_LIMIT}}
> * Total gastado: {{TOTAL_SPENT}}
> * Último gasto registrado: {{LAST_EXPENSE_DESCRIPTION}} por {{LAST_EXPENSE_AMOUNT}}

**Reglas:**

* Usa lenguaje claro y directo.
* No des consejos financieros avanzados.
* Máximo 3 frases.

**Ejemplo de salida:**

> "Has superado tu tope mensual de 1.000.000. Con el último gasto en mercado, tu total del mes llegó a 1.045.000. Revisa tus gastos para evitar excederte más este mes."

---

### Prompt 3 (Opcional – Historia Deseable): Consulta en Lenguaje Natural

**Use Case asociado:** `QueryExpensesUseCase` (deseable)

**Objetivo:**
Responder preguntas simples del usuario sobre sus gastos a partir de datos ya calculados por el sistema.

**Rol del sistema (System Prompt):**

> Eres un asistente que explica información financiera simple basándose únicamente en los datos proporcionados. No hagas suposiciones.

**Instrucciones (User Prompt Template):**

> Responde a la siguiente pregunta usando únicamente los datos entregados.
>
> Pregunta del usuario:
> "{{USER_QUESTION}}"
>
> Datos disponibles:
> {{AGGREGATED_DATA}}

**Reglas:**

* No inventes datos.
* Responde en lenguaje natural.
* Si la información no está disponible, indícalo explícitamente.

---

## 18. Observaciones Críticas sobre el Uso de IA

* La IA no valida reglas de negocio.
* La IA no persiste información.
* La IA puede fallar; el sistema debe validar su salida.
* Los prompts son parte del diseño y deben versionarse.
