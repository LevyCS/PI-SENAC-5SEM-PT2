import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/axios";
import { toast } from "react-toastify";
import { useAuth } from "../store/useAuth";
import React from "react";
import moment from "moment";
export interface Consulta {
  id: number;
  local: string;
  date: string;
  type: string;
  doctor: string;
  description: string;
  files: {
    id: string
    consultationId: string
    filename: string
  }[]
}

interface IUserInfo {
  name: string;
}

export const mapTipoToLabel = {
  CONSULT: "Consulta",
  EXAM: "Exame",
  RETURN: "Retorno",
};

export default function Home() {
  const navigate = useNavigate();
  const { clear } = useAuth();

  const [registros, setRegistros] = useState<Consulta[]>([]);
  const [userInfos, setUserInfos] = useState<IUserInfo | null>(null);

  const handleGetRegistros = async () => {
    const response = await api.get("/consultations/");
    setRegistros(response.data);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este registro?")) {
      try {
        await api.delete(`/consultations/${id}`);
        handleGetRegistros();
      } catch (error: any) {
        toast.error(error.toString());
      }
    }
  };

  const handleEdit = (id: number) => {
    return navigate(`/registro/${id}`);
  };

  const handleView = (id: number) => {
    return navigate(`/registro/${id}/view`);
  };

  const handleGetUserInfos = async () => {
    try {
      const infos = await api.get<IUserInfo>(`/user/info`);
      setUserInfos(infos.data);
    } catch (error: any) {
      toast.error(error.toString());
    }
  };

  useEffect(() => {
    handleGetRegistros();
    handleGetUserInfos();
  }, []);

  function capitalizeFirstLetter(val: string) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-green-600">HealCon</h1>
          <p className="text-sm text-gray-500">
            Bem-vindo, {capitalizeFirstLetter(userInfos?.name || "")}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/registro")}
            className="bg-green-500 text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-green-600"
          >
            Novo Registro
          </button>
          <button
            onClick={() => {
              clear();
              navigate("/");
            }}
            className="bg-red-100 text-red-600 px-4 py-2 rounded-xl cursor-pointer hover:bg-red-200"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Pesquisar pelo local da consulta..."
            className="flex-1 px-4 py-3 border rounded-xl"
          />
          <button className="bg-gray-200 px-4 py-3 rounded-xl">🔍</button>
        </div>

        {registros.length < 1 ? (
          <div className="items-center justify-center flex">
            Nenhuma consulta encontrada :(
          </div>
        ) : (
          <React.Fragment>
            {registros?.map((r) => (
              <div
                key={r.id}
                className="bg-white rounded-2xl p-4 shadow-sm mb-4"
              >
                <div className="font-bold text-gray-800">{r.local}</div>
                <div className="text-sm text-gray-600">
                  Data: {moment.parseZone(r.date).format("DD/MM/YYYY")}
                </div>
                <div className="text-sm text-gray-600">
                  Tipo: {mapTipoToLabel[r.type as keyof typeof mapTipoToLabel]}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  Doutor: {r.doctor}
                </div>
                <div className="flex gap-2">
                  <button
                    className="bg-green-100 text-green-700 px-3 py-1 rounded-md text-sm hover:cursor-pointer hover:bg-green-200"
                    onClick={() => handleView(r.id)}
                  >
                    Visualizar
                  </button>
                  <button
                    className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-md text-sm hover:cursor-pointer hover:bg-yellow-200"
                    onClick={() => handleEdit(r.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-100 text-red-700 px-3 py-1 rounded-md text-sm hover:cursor-pointer"
                    onClick={() => handleDelete(r.id)}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </React.Fragment>
        )}
      </main>
    </div>
  );
}
