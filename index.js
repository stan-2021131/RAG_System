import OpenAI from "openai";
import fs from "fs/promises";
import 'dotenv/config';
import readline from "readline/promises";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.BASE_URL,
})

// Colores ANSI para la consola
const colors = {
    reset: "\x1b[0m",
    cyan: "\x1b[36m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    magenta: "\x1b[35m"
};

async function sendQuestion(pregunta, faqs) {
    const response = await client.chat.completions.create({
        "model": "openai/gpt-oss-20b",
        "messages": [
            {
                "role": "system",
                "content": `You are a helpful assistant.
                    Use only the following context to answer the question.
                    If the question is not related to the context, say so.
                    Answer in the same language as the question.

                    Context:
                    ${faqs}
                    
                    If the question can't be answered using ONLY the provided context,
                    clearly state that you don't have that information and can't answer it.
                    Do not invent or assume anything outside this context.
                    `
            },
            {
                "role": "user",
                "content": pregunta
            },
        ],
    });
    return response.choices[0].message.content;
}


async function main() {
    try {
        console.clear();
        console.log(`${colors.cyan}======================================================${colors.reset}`);
        console.log(`${colors.cyan}  Bienvenido al chatbot de Parachute S.A. 2026${colors.reset}`);
        console.log(`${colors.cyan}======================================================${colors.reset}\n`);

        console.log(`${colors.magenta}Cargando base de conocimiento...${colors.reset}`);
        // Se lee el archivo una vez al iniciar el programa
        const faqs = await fs.readFile("./context/FAQs_Parachute_SA_Guatemala_2026.txt", "utf-8");
        console.log(`${colors.green}✓ Base de conocimiento lista.${colors.reset}\n`);

        console.log(`Escríbenos cualquier pregunta o escribe ${colors.yellow}'Bye'${colors.reset} para salir.\n`);

        while (true) {
            const pregunta = await rl.question(`${colors.green}Tú:${colors.reset} `);

            if (pregunta.trim().toLowerCase() === "bye") {
                console.log(`${colors.cyan}Chatbot:${colors.reset} ¡Hasta pronto!`);
                rl.close();
                return;
            }

            // Animación de "escribiendo..."
            process.stdout.write(`${colors.cyan}Chatbot está escribiendo...${colors.reset}\r`);

            const response = await sendQuestion(pregunta, faqs);

            // Se borra "escribiendo..." y se muestra la respuesta
            process.stdout.write("\x1b[2K\r");
            console.log(`${colors.cyan}Chatbot:${colors.reset} ${colors.yellow}${response}${colors.reset}\n`);
        }
    } catch (err) {
        console.log(`${colors.magenta}Error:${colors.reset}`, err);
        rl.close();
    }
}

main();