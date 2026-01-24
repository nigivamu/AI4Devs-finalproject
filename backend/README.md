# Backend - Personal Expense Tracker

Este directorio contiene la implementación del backend para la aplicación de seguimiento de gastos. Está construido con Python usando [FastAPI](https://fastapi.tiangolo.com/).

## 📋 Requisitos Previos

- Python 3.9 o superior
- pip (gestor de paquetes de Python)
- Virtualenv (opcional pero recomendado)

## 🚀 Configuración y Ejecución

Sigue estos pasos para levantar el backend localmente:

### 1. Crear y Activar Entorno Virtual

Se recomienda usar un entorno virtual para aislar las dependencias.

```bash
# Estando en la carpeta /backend
python3 -m venv venv

# Activar en Linux/Mac
source venv/bin/activate
```

### 2. Instalar Dependencias

```bash
pip install -r requirements.txt
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env` basado en el ejemplo proporcionado.

```bash
cp .env.example .env
```

Edita el archivo `.env` y configura tu `OPENAI_API_KEY` si deseas probar la funcionalidad real de IA.
```ini
OPENAI_API_KEY="sk-..."
```
> **Nota**: Si no configuras la API Key, el servicio de IA funcionará en modo "mock" simulado si incluyes la palabra "mock" en tus descripciones de gasto.

### 4. Ejecutar el Servidor

```bash
uvicorn main:app --reload
```
El servidor se iniciará en `http://localhost:8000`.

## 📚 Documentación de API

Una vez que el servidor esté corriendo, puedes acceder a la documentación interactiva (Swagger UI) en:

- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

## 🧪 Estructura del Proyecto

- `app/main.py`: Punto de entrada de la aplicación.
- `app/api`: Definición de endpoints (Auth, Gastos, Límites).
- `app/core`: Configuraciones y seguridad (JWT, Argon2).
- `app/models`: Modelos de base de datos (SQLAlchemy).
- `app/schemas`: Esquemas de validación (Pydantic).
- `app/services`: Lógica de negocio externa (Cliente OpenAI).

## 🧪 Pruebas de Verificación

Se incluye un script `verify_backend.py` en la raíz del proyecto (fuera de backend) para probar el flujo completo.

```bash
# Estando en la raíz del proyecto con el venv activado
python verify_backend.py
```
