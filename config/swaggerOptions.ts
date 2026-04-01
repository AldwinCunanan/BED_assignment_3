import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Back End Assignment API Documentation",
            version: "1.0.0",
            description:
                "This is the API documentation for the event Management System.",
        },
        servers: [
            {
                url: "http://localhost:3000/api/v1",
                description: "Development server",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./src/api/v1/routes/*.ts", "./src/api/v1/validation/*.ts"], // Path to the API docs and schemas
};

// Generate the Swagger spec
export const generateSwaggerSpec = (): object => {
    const spec = swaggerJsdoc(swaggerOptions);

    console.log(JSON.stringify(spec, null, 2)); // 👈 ADD THIS

    return spec;
};