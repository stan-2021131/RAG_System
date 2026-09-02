# RAG System - FAQ Chatbot para Parachute S.A. 2026

Un agente inteligente de preguntas frecuentes basado en consola, implementado para **Parachute S.A.** utilizando una arquitectura **RAG (Retrieval-Augmented Generation)** simple y directa.

---

## Demostración en Video

> **Video del funcionamiento (Local):** [Ver video de demostración (docs/demo_RAG.mp4)](./docs/demo_RAG.mp4)

<video src="./docs/demo_RAG.mp4" controls="controls" width="100%"></video>

> **Video en YouTube:**
> 
> *Link:* [https://youtu.be/ejUgs5yJW8o](https://youtu.be/ejUgs5yJW8o)

---

## ¿Qué es y para qué sirve?

Este proyecto es una prueba de concepto (Demo) de un chatbot interactivo por terminal diseñado para resolver dudas sobre el próximo evento de **Parachute S.A. Guatemala 2026**.

El agente:
- **Responde exclusivamente con base en la información oficial** proporcionada en el archivo de preguntas frecuentes (`FAQs_Parachute_SA_Guatemala_2026.txt`).
- **Rechaza responder o asume falta de información** si la consulta no se encuentra documentada en la base de conocimiento.
- **Mantiene una sesión interactiva continua** permitiendo hacer múltiples consultas hasta que el usuario decida salir escribiendo `Bye`.

---

## Arquitectura del Sistema

El proyecto implementa la forma más simple y eficiente de **RAG In-Context**:

```
+-------------------------------------------------+
| FAQs_Parachute_SA_Guatemala_2026.txt (Contexto) |
+-------------------------------------------------+
                        │
                        ▼ (Carga en memoria al iniciar)
+-------------------------------------------------+
|                 index.js (Node.js)              |
|   - Manejo de terminal / Interfaz interactiva   |
|   - Inyección de contexto al Prompt del Sistema |
+-------------------------------------------------+
                        │
                        ▼ (Llamada a API con SDK OpenAI)
+-------------------------------------------------+
|              Proveedor LLM compatible           |
|            (ej. Groq / Nvidia Build)            |
+-------------------------------------------------+
```

1. **Base de conocimiento**: Archivo de texto plano local cargado en memoria al iniciar la aplicación.
2. **Context Injection**: Se inyecta la base de conocimiento en el `system prompt` estableciendo reglas estrictas para evitar alucinaciones.
3. **SDK OpenAI**: Comunicación estandarizada compatible con cualquier proveedor con API OpenAI (Groq, OpenAI, Nvidia NIM, etc.).

---

## Requisitos Previos

- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada).
- Cuenta y API Key en un proveedor compatible con la API de OpenAI (por ejemplo, [Groq Console](https://console.groq.com/) o [NVIDIA Build](https://build.nvidia.com/)).

---

## Instalación y Configuración

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/stan-2021131/RAG_System.git
   cd RAG_System
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Crea un archivo `.env` en la raíz del proyecto basándote en el archivo de ejemplo `.env.example`:
   ```bash
   cp .env.example .env
   ```

   Edita el archivo `.env` y define tus credenciales:
   ```env
   OPENAI_API_KEY=tu_api_key_aqui
   BASE_URL=https://api.groq.com/openai/v1
   ```
   *(Asegúrate de ajustar `BASE_URL` según el proveedor que utilices).*

---

## Ejecución y Uso

Para iniciar el chatbot en tu terminal:

```bash
node index.js
```

### Comandos y Funcionamiento:
- **Hacer una pregunta**: Escribe tu duda en la consola y presiona `Enter`.
- **Finalizar la sesión**: Escribe `Bye` o presiona `Ctrl + C`.

---

## Seguridad

- Las credenciales y claves API se gestionan mediante variables de entorno y están excluidas del control de versiones mediante `.gitignore`.