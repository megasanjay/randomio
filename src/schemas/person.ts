import { Static, Type } from "@sinclair/typebox";

export const PersonQuerySchema = Type.Object({
  sex: Type.Optional(
    Type.Union([Type.Literal("male"), Type.Literal("female")])
  ),
  prefix: Type.Optional(Type.Boolean()),
  middleName: Type.Optional(Type.Boolean()),
  count: Type.Optional(Type.Integer({ minimum: 1, maximum: 100 })),
});

export type PersonQueryType = Static<typeof PersonQuerySchema>;

export const PersonResponseItemSchema = Type.Object({
  prefix: Type.Optional(Type.String()),
  firstName: Type.String(),
  middleName: Type.Optional(Type.String()),
  lastName: Type.String(),
  fullName: Type.String(),
  sex: Type.Union([Type.Literal("male"), Type.Literal("female")]),
  city: Type.String(),
  country: Type.String(),
});

export const PersonResponseSchema = Type.Union([
  PersonResponseItemSchema,
  Type.Array(PersonResponseItemSchema),
]);

export type PersonResponseType = Static<typeof PersonResponseSchema>;

export const NameQuerySchema = Type.Object({
  sex: Type.Optional(
    Type.Union([Type.Literal("male"), Type.Literal("female")])
  ),
  count: Type.Optional(Type.Integer({ minimum: 1, maximum: 100 })),
});

export type NameQueryType = Static<typeof NameQuerySchema>;

export const NameResponseSchema = Type.Union([
  Type.String(),
  Type.Array(Type.String()),
]);

export type NameResponseType = Static<typeof NameResponseSchema>;
