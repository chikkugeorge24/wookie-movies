const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const logger = require("./logger");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Wookie Movies API Docs",
      version: "",
    },
    schemes: ["http"],
    components: {
      securitySchemes: {
        Bearer: {
          type: "http",
          description: " JWT authorization of an API",
          name: "Authorization",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Movies: {
          type: "object",
          required: ["id"],
          properties: {
            backdrop: {
              type: "string",
            },
            cast: {
              type: "array",
            },
            classification: {
              type: "string",
            },
            director: {
              type: "string",
            },
            genres: {
              type: "array",
            },
            id: {
              type: "string",
              uniqueItems: true,
            },
            imdb_rating: {
              type: "number",
            },
            length: {
              type: "string",
            },
            overview: {
              type: "string",
            },
            poster: {
              type: "string",
            },
            released_on: {
              type: "string",
            },
            slug: {
              type: "string",
            },
            title: {
              type: "string",
            },
          },
        },
      },
    },
    paths: {
      "/movies": {
        get: {
          tags: ["Movies"],
          summary: "Get Movies List",
          parameters: [
            {
              name: "page",
              in: "query",
              type: "string",
              default: 1,
            },
            {
              name: "limit",
              in: "query",
              type: "string",
              default: 10,
            },
          ],
          security: [{ Bearer: [] }],
          produces: ["application/json"],
          responses: {
            200: {
              description: "Success",
              schema: {
                $ref: "#/components/schemas/Movies",
              },
            },
            400: {
              description: "Failed",
            },
            401: {
              description: "Access Denied!",
            },
          },
        },
      },
      "/movies/group": {
        get: {
          tags: ["Movies"],
          summary: "Get Movies List grouped by Genres",
          security: [{ Bearer: [] }],
          produces: ["application/json"],
          responses: {
            200: {
              description: "Success",
              schema: {
                $ref: "#/components/schemas/Movies",
              },
            },
            400: {
              description: "Failed",
            },
            401: {
              description: "Access Denied!",
            },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app, port) => {
  // Swagger page
  app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

  //Docs in JSON format
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  logger.info(
    `Docs available at http://localhost:${port}/docs - 200 - Success`
  );
};

module.exports = swaggerDocs;
