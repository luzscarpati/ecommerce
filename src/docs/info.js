export const info = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API E-COMMERCE",
            version: "1.0.0",
            description: "API de comercio electrónico"
        },
        servers: [
            {
                url: "https://ecommerce-qp8i.onrender.com",
    
            },
        ],
    },
    apis: ["./src/docs/*.yml"],
}