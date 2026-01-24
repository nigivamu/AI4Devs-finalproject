# 🟢 Historia 1 — Registro de gasto en lenguaje natural (NÚCLEO)

### Historia de usuario

**Como** usuario autenticado,
**quiero** registrar un gasto escribiéndolo en lenguaje natural,
**para** poder llevar control de mis gastos sin usar formularios complejos.

---

## Criterios de aceptación (positivos)

1. El usuario puede ingresar un texto libre describiendo **un único gasto**.
2. El sistema registra el gasto asociado al usuario autenticado.
3. El gasto registrado contiene:

   * Un monto numérico mayor a cero.
   * Una fecha asociada al mes actual.
4. El gasto queda persistido y visible inmediatamente tras el registro.
5. El sistema confirma al usuario que el gasto fue registrado exitosamente.
6. El usuario no debe completar campos adicionales ni confirmar manualmente datos inferidos.

---

## Criterios de aceptación negativos (errores aceptables de IA)

Se **acepta** que la IA:

* Asigne una categoría genérica o incorrecta al gasto.
* Infiera la fecha como “hoy” cuando el texto sea ambiguo.
* No extraiga información secundaria (lugar, tipo de comercio).
* No registre el gasto si:

  * El monto no puede inferirse con claridad.
  * El texto describe más de un gasto.
  * El texto no representa un gasto.

No se acepta que la IA:

* Registre un gasto con monto cero o negativo.
* Registre un gasto sin asociarlo al usuario correcto.
* Registre silenciosamente un gasto cuando el texto es inválido.

---

## Casos de prueba

**Caso 1 – Registro válido simple**
Dado un usuario autenticado
Cuando ingresa una frase con un monto claro
Entonces el gasto se registra correctamente

**Caso 2 – Texto ambiguo sin monto**
Cuando el usuario ingresa texto sin monto identificable
Entonces el sistema informa que no pudo registrar el gasto

**Caso 3 – Texto con múltiples gastos**
Cuando el texto describe más de un gasto
Entonces el sistema rechaza el registro y lo comunica claramente

**Caso 4 – Confirmación inmediata**
Cuando el gasto se registra
Entonces aparece inmediatamente en la lista de gastos

---

# 🟢 Historia 2 — Definición de tope mensual

### Historia de usuario

**Como** usuario autenticado,
**quiero** definir un tope mensual de gasto,
**para** tener una referencia clara de cuánto puedo gastar durante el mes.

---

## Criterios de aceptación (positivos)

1. El usuario puede definir un monto máximo para el mes actual.
2. El monto debe ser un valor numérico positivo.
3. El usuario puede modificar el tope en cualquier momento.
4. El sistema muestra siempre el tope vigente.
5. El tope aplica únicamente al mes en curso.

---

## Criterios de aceptación negativos

Se acepta que el sistema:

* No conserve topes históricos.
* Reemplace el tope anterior sin confirmación adicional.

No se acepta que el sistema:

* Permita valores cero o negativos.
* Permita múltiples topes activos para el mismo mes.

---

## Casos de prueba

**Caso 1 – Definición inicial del tope**
Cuando el usuario define un monto válido
Entonces el sistema guarda y muestra el tope

**Caso 2 – Modificación del tope**
Cuando el usuario cambia el monto
Entonces el nuevo tope reemplaza al anterior

**Caso 3 – Valor inválido**
Cuando el usuario ingresa un valor no positivo
Entonces el sistema rechaza la acción

---

# 🟡 Historia 3 — Alerta por excedente del tope

### Historia de usuario

**Como** usuario que controla sus gastos,
**quiero** recibir una alerta clara cuando supere mi tope mensual,
**para** ser consciente inmediatamente de que he excedido mi límite.

---

## Criterios de aceptación (positivos)

1. El sistema evalúa el gasto acumulado tras cada registro.
2. Cuando el total supera el tope, se genera una alerta visible.
3. La alerta se presenta inmediatamente después del gasto causante.
4. El mensaje es claro y comprensible para un usuario no técnico.
5. Solo existe una alerta activa por mes.

---

## Criterios de aceptación negativos (IA)

Se acepta que la IA:

* Use mensajes genéricos o repetitivos.
* No sugiera acciones correctivas.

No se acepta que la IA:

* No genere la alerta cuando el tope fue superado.
* Genere múltiples alertas por el mismo evento.
* Use lenguaje técnico o ambiguo.

---

## Casos de prueba

**Caso 1 – Superación exacta del tope**
Cuando el gasto acumulado supera el tope
Entonces se muestra la alerta

**Caso 2 – Gasto posterior al excedente**
Cuando se registra un nuevo gasto tras el excedente
Entonces no se genera una nueva alerta

**Caso 3 – Sin tope definido**
Cuando no existe un tope
Entonces no se genera ninguna alerta

---

# 🟡 Historia 4 — Registro de usuario

### Historia de usuario

**Como** usuario nuevo,
**quiero** crear una cuenta con mis credenciales básicas,
**para** poder acceder de forma segura a mi información de gastos personales.

---

## Criterios de aceptación (positivos)

1. El usuario puede registrarse con correo y contraseña.
2. El correo debe tener formato válido.
3. La contraseña cumple una longitud mínima.
4. El usuario puede iniciar sesión tras registrarse.
5. El usuario solo accede a su propia información.

---

## Criterios de aceptación negativos

Se acepta que:

* No exista recuperación de contraseña.
* No exista autenticación social.

No se acepta que:

* Se creen cuentas con correos inválidos.
* Un usuario acceda a datos de otro.

---

## Casos de prueba

**Caso 1 – Registro exitoso**
Cuando el usuario ingresa credenciales válidas
Entonces la cuenta se crea correctamente

**Caso 2 – Correo inválido**
Cuando el correo no es válido
Entonces el registro es rechazado

**Caso 3 – Acceso a datos**
Cuando el usuario inicia sesión
Entonces solo ve su propia información

