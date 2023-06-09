import app from "./app";

const FASTIFY_PORT = Number(process.env.FASTIFY_PORT) || 3000;
const FASTIFY_HOST = process.env.FASTIFY_HOST || "0.0.0.0";

app.listen({ port: FASTIFY_PORT, host: FASTIFY_HOST });

console.log(`🚀  Fastify server running on port ${FASTIFY_PORT}`);
console.log(`Route index: /`);
console.log(`Route user: /api/v1/user`);
