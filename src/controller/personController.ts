import { FastifyInstance } from "fastify";
import { faker } from "@faker-js/faker";
import * as Person from "../schemas/person";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

export default async function personController(fastify: FastifyInstance) {
  fastify.withTypeProvider<TypeBoxTypeProvider>();

  fastify.get<{
    Querystring: Person.PersonQueryType;
    Response: Person.PersonResponseType;
  }>("/", {
    schema: {
      querystring: Person.PersonQuerySchema,
      response: {
        200: Person.PersonResponseSchema,
      },
    },
    handler: (request, reply) => {
      const generate = (query: Person.PersonQueryType) => {
        let person: Person.PersonResponseType = {
          firstName: "",
          lastName: "",
          fullName: "",
          sex: "female",
          city: "",
          country: "",
        };

        const sex = query.sex || faker.person.sexType();

        const queryPrefix = query.prefix || false;
        const queryMiddleName = query.middleName || false;

        person.sex = sex;

        person.firstName = faker.person.firstName(sex);
        person.lastName = faker.person.lastName();

        person.city = faker.location.city();
        person.country = faker.location.country();

        person.fullName = `${person.firstName} ${person.lastName}`;

        if (queryMiddleName) {
          person.middleName = faker.person.middleName();
          person.fullName = `${person.firstName} ${person.middleName} ${person.lastName}`;
        }

        if (queryPrefix) {
          person.prefix = faker.person.prefix(sex);
          person.fullName = `${person.prefix} ${person.fullName}`;
        }

        return person;
      };

      const count = request.query.count || 1;

      if (count > 1) {
        const persons: Person.PersonResponseType[] = [];
        let index = 0;

        while (index < count) {
          const person = generate(request.query);
          persons.push(person);

          index++;
        }

        reply.send(persons);
      } else {
        const person = generate(request.query);
        reply.send(person);
      }
    },
  });

  fastify.get<{
    Querystring: Person.NameQueryType;
    Response: Person.NameResponseType;
  }>("/firstName", {
    schema: {
      querystring: Person.NameQuerySchema,
      response: {
        200: Person.NameResponseSchema,
      },
    },
    handler: (request, reply) => {
      const query = request.query;

      const count = query.count || 1;

      const firstNames: string[] = [];
      let index = 0;

      while (index < count) {
        const sex = query.sex || faker.person.sexType();

        const firstName = faker.person.firstName(sex);

        firstNames.push(firstName);

        index++;
      }

      if (count > 1) {
        reply.send(firstNames);
      } else {
        reply.send(firstNames[0]);
      }
    },
  });

  fastify.get<{
    Querystring: Person.NameQueryType;
    Response: Person.NameResponseType;
  }>("/middleName", {
    schema: {
      querystring: Person.NameQuerySchema,
      response: {
        200: Person.NameResponseSchema,
      },
    },
    handler: (request, reply) => {
      const query = request.query;

      const count = query.count || 1;

      const middleNames: string[] = [];
      let index = 0;

      while (index < count) {
        const sex = query.sex || faker.person.sexType();

        const middleName = faker.person.middleName(sex);

        middleNames.push(middleName);

        index++;
      }

      if (count > 1) {
        reply.send(middleNames);
      } else {
        reply.send(middleNames[0]);
      }
    },
  });

  fastify.get<{
    Querystring: Person.NameQueryType;
    Response: Person.NameResponseType;
  }>("/lastName", {
    schema: {
      querystring: Person.NameQuerySchema,
      response: {
        200: Person.NameResponseSchema,
      },
    },
    handler: (request, reply) => {
      const query = request.query;

      const count = query.count || 1;

      const lastNames: string[] = [];
      let index = 0;

      while (index < count) {
        const sex = query.sex || faker.person.sexType();

        const lastName = faker.person.lastName(sex);

        lastNames.push(lastName);

        index++;
      }

      if (count > 1) {
        reply.send(lastNames);
      } else {
        reply.send(lastNames[0]);
      }
    },
  });

  fastify.get<{
    Querystring: Person.NameQueryType;
    Response: Person.NameResponseType;
  }>("/fullName", {
    schema: {
      querystring: Person.NameQuerySchema,
      response: {
        200: Person.NameResponseSchema,
      },
    },
    handler: (request, reply) => {
      const query = request.query;

      const count = query.count || 1;

      const fullNames: string[] = [];
      let index = 0;

      while (index < count) {
        const sex = query.sex || faker.person.sexType();

        const fullName = faker.person.fullName({ sex });

        fullNames.push(fullName);

        index++;
      }

      if (count > 1) {
        reply.send(fullNames);
      } else {
        reply.send(fullNames[0]);
      }
    },
  });
}
