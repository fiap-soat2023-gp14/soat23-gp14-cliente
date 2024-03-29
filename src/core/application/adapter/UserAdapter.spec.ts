import { UserAdapter } from "./UserAdapter";
import { CPF } from '../../domain/valueObjects/Cpf';
import { UserCreationDTO } from "../dto/UserCreationDTO";
import { UserUpdateDTO } from "../dto/UserUpdateDTO";

jest.mock("../../domain/valueObjects/Cpf", () => ({
  CPF: {
    create: jest.fn(),
  },
}));

describe("UserAdapter", () => {
  let userAdapter: UserAdapter;
  let mockCPF: any;

  beforeEach(() => {
    userAdapter = new UserAdapter();
    mockCPF = CPF.create as jest.Mock;
  });

  describe("toDomain", () => {
    it("should map a UserCreationDTO to a User", async () => {
      const userCreationDTO: UserCreationDTO = {
        id: "dbad9ae5-92d0-493f-bbbb-10895f3c15e9",
        name: "Fulano Beltrano",
        email: "fulanob@gmail.com",
        cpf: "59370565078",
        phone: "11987896525",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockCPF.mockResolvedValue({
        value: userCreationDTO.cpf,
        isValid: true,
      });

      const result = await userAdapter.toDomain(userCreationDTO);

      expect(result).toEqual({
        id: userCreationDTO.id,
        name: userCreationDTO.name,
        email: userCreationDTO.email,
        cpf: {
          value: userCreationDTO.cpf,
          isValid: true,
        },
        phone: userCreationDTO.phone,
        createdAt: userCreationDTO.createdAt,
        updatedAt: userCreationDTO.updatedAt,
      });
    });

    it("should map a UserCreationDTO to a User", async () => {
      const userCreationDTO: UserCreationDTO = {
        id: "dbad9ae5-92d0-493f-bbbb-10895f3c15e9",
        name: "Fulano Beltrano",
        email: "fulanob@gmail.com",
        cpf: "59370565078",
        phone: "11987896525",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      delete userCreationDTO.createdAt;
      delete userCreationDTO.updatedAt;

      mockCPF.mockResolvedValue({
        value: userCreationDTO.cpf,
        isValid: true,
      });

      const result = await userAdapter.toDomain(userCreationDTO);

      expect(result).toEqual({
        id: userCreationDTO.id,
        name: userCreationDTO.name,
        email: userCreationDTO.email,
        cpf: {
          value: userCreationDTO.cpf,
          isValid: true,
        },
        phone: userCreationDTO.phone,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
  });

  describe("toResponse", () => {
    it("should map a User to a UserResponseDTO", () => {
      const user = {
        id: "dbad9ae5-92d0-493f-bbbb-10895f3c15e9",
        name: "Fulano Beltrano",
        email: "fulanob@gmail.com",
        cpf: mockCPF,
        phone: "11987896525",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = userAdapter.toResponse(user);

      expect(result).toEqual({
        id: user.id,
        name: user.name,
        email: user.email,
        cpf: user.cpf.value,
        phone: user.phone,
      });
    });
  });

  describe("toUpdateDTO", () => {
    it("should map a UserUpdateDTO to a User", async () => {
      const userUpdateDTO: UserUpdateDTO = {
        name: "Fulano Beltrano",
        email: "fulanob2@gmail.com",
        phone: "11987896525",
        updatedAt: new Date(),
      };

      const result = userAdapter.toUpdateDTO(userUpdateDTO);

      expect(result).toEqual({
        name: userUpdateDTO.name,
        email: userUpdateDTO.email,
        phone: userUpdateDTO.phone,
        updatedAt: userUpdateDTO.updatedAt,
      });
    });
  });

  describe("toResponseList", () => {
    it("should map a list of User to a list of UserResponseDTO", () => {
      const users = [
        {
          id: "dbad9ae5-92d0-493f-bbbb-10895f3c15e9",
          name: "Fulano Beltrano",
          email: "fulanob@gmail.com",
          cpf: mockCPF,
          phone: "11987896525",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ];

      const result = userAdapter.toResponseList(users);

      expect(result).toEqual([
        {
          id: users[0].id,
          name: users[0].name,
          email: users[0].email,
          cpf: users[0].cpf.value,
          phone: users[0].phone,
        },
      ]);
    });
  });
});
