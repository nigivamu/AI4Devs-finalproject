## 13. Modelo de Datos Mínimo

Este modelo de datos está estrictamente alineado con las funcionalidades definidas en el MVP y el flujo E2E prioritario. Su objetivo es soportar el valor del producto sin introducir complejidad innecesaria.

### Principios de diseño

* Persistir únicamente la información indispensable
* Evitar entidades prematuras
* Favorecer simplicidad sobre extensibilidad
* Cada entidad debe mapearse directamente a una funcionalidad

---

### Entidad: User

Representa al usuario individual del sistema.

**Propósito:**
Permitir autenticación básica y asociación de gastos y topes.

**Atributos:**

* `id` (UUID / PK)
* `email` (string, único)
* `password_hash` (string)
* `created_at` (timestamp)

**Notas:**

* No se modelan perfiles, roles ni preferencias.
* No se almacena información personal adicional.

---

### Entidad: MonthlyLimit

Representa el tope de gasto mensual definido por el usuario.

**Propósito:**
Soportar el control de gasto y la generación de alertas.

**Atributos:**

* `id` (UUID / PK)
* `user_id` (FK → User.id)
* `month` (YYYY-MM)
* `amount` (decimal)
* `created_at` (timestamp)
* `updated_at` (timestamp)

**Restricciones:**

* Un solo registro activo por usuario y mes

**Notas:**

* No se mantiene histórico más allá del mes actual para el MVP.

---

### Entidad: Expense

Representa un gasto individual registrado por el usuario.

**Propósito:**
Persistir los gastos registrados mediante lenguaje natural.

**Atributos:**

* `id` (UUID / PK)
* `user_id` (FK → User.id)
* `amount` (decimal)
* `category` (string)
* `description` (string)
* `expense_date` (date)
* `created_at` (timestamp)

**Notas:**

* Los campos `category`, `description` y `expense_date` son inferidos por IA.
* No se permite edición posterior del gasto en el MVP.

---

### Entidad Derivada (No Persistida): MonthlySpending

**Descripción:**
Entidad lógica calculada a partir de `Expense`.

**Propósito:**
Soportar el cálculo del gasto acumulado mensual.

**Cálculo:**

* Suma de `amount` de todos los gastos del usuario para el mes actual.

**Nota:**

* No se persiste para evitar duplicación de datos.

---

### Entidad Derivada (No Persistida): Alert

**Descripción:**
Representa una alerta generada cuando se supera el tope mensual.

**Propósito:**
Informar al usuario de forma inmediata y comprensible.

**Características:**

* Generada dinámicamente
* Texto producido por IA
* No persistida como historial

---

### Relaciones entre Entidades

* User 1 → N Expense
* User 1 → 1 MonthlyLimit (por mes)

---

### Entidades Excluidas Deliberadamente

No se modelan las siguientes entidades para el MVP:

* Categoría como entidad independiente
* Presupuesto por categoría
* Historial de alertas
* Sesiones persistidas

Estas exclusiones reducen complejidad y refuerzan el enfoque MVP.

---

## 14. Próximos Pasos

Con el modelo de datos definido, los siguientes pasos habilitados son:

* Diseño de arquitectura mínima
* Definición de contratos de API
* Diseño de prompts de IA
* Implementación incremental

Este modelo de datos se considera **cerrado para el alcance del MVP**.
