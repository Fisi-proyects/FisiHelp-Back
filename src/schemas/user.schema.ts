import { z } from "zod";

export const ADMIN_ROLE = {
  id: 1,
  name: "ADMIN",
};

export const USER_ROLE = {
  id: 2,
  name: "USER",
};

export const getRoleIdByName = (name: string) => {
  switch (name) {
    case ADMIN_ROLE.name:
      return ADMIN_ROLE.id;
    case USER_ROLE.name:
      return USER_ROLE.id;
    default:
      return -1;
  }
};

export const userRoleSchema = z.union([
  z.literal(ADMIN_ROLE.name),
  z.literal(USER_ROLE.name),
]);

export const createUserSchema = z.object({
  names: z.string().min(1),
  surnames: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  roles: z.array(userRoleSchema).min(1),
});

export const updateUserSchema = z.object({
  names: z.string().min(1),
  surnames: z.string().min(1),
  roles: z.array(userRoleSchema).min(1),
});

export const userResponseSchema = z.object({
  id: z.number().int(),
  email: z.string().email(),
  names: z.string().min(1),
  surnames: z.string().min(1),
  roles: z.array(
    z.object({
      id: z.number().int(),
      name: z.string(),
    }),
  ),
});

export const idSchema = z.number().min(1).int();

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UserRoleInput = z.infer<typeof userRoleSchema>;
