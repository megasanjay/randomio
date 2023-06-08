import { FastifyInstance } from "fastify";
import { faker } from "@faker-js/faker";
import { Static, Type } from "@sinclair/typebox";

const PersonQuerystringSchema = Type.Object({
  sex: Type.Optional(Type.String({})),
});

type PersonQuerystring = Static<typeof PersonQuerystringSchema>;

export default async function personController(fastify: FastifyInstance) {
  fastify.get<{
    Querystring: PersonQuerystring;
  }>("/", {
    schema: {
      querystring: PersonQuerystringSchema,
    },
    handler: (request, reply) => {
      const query = request.query;

      console.log(query.sex);

      const sex = faker.person.sexType();

      const firstName = faker.person.firstName(sex);
      const lastName = faker.person.lastName();

      const fullName = `${firstName} ${lastName}`;

      const person = {
        firstName,
        lastName,
        fullName,
      };

      reply.send(person);
    },
  });
}
