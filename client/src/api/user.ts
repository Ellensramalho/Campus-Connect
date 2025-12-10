import axiosInstace from "./axiosInstance";

// Editar dados do perfil
export const EditData = async (
  name: string | undefined,
  nameUser: string | undefined,
  bio: string,
  token: string
) => {
  const res = await axiosInstace.patch(
    "/api/auth/profile-edit",
    {
      name,
      nameUser,
      bio,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

// Solicitar categoria de professor
export const BecomeTeacher = async (token: string, formation: string, departament: string) => {
  const res = await axiosInstace.post("/api/teacher", 
    {
      formation,
      departament
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return res.data;
}

// Solicitar categoria de aluno
export const BecomeStudent = async (token: string, course: string, matricula: string) => {
  const res = await axiosInstace.post("/api/become/student", 
    {
      course,
      matricula
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return res.data;
}
