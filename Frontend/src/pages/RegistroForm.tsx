import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api, { API_URL } from "../services/axios";
import type { Consulta, mapTipoToLabel } from "./Home";

const schema = z.object({
  local: z.string().min(1, "Local obrigatório"),
  data: z.string().min(1, "Data obrigatória"),
  tipo: z.enum(["CONSULT", "EXAM", "RETURN"]),
  medico: z.string().min(1, "Médico obrigatório"),
  observacoes: z.string().optional(),
  anexos: z.any().optional(),
});

type FormData = z.infer<typeof schema>;

type Props = {
  viewOnly?: boolean;
};

const mapTipo = {
  Consulta: "CONSULT",
  Exame: "EXAM",
  Retorno: "RETURN",
};

export default function RegistroForm({ viewOnly = false }: Props) {
  const navigate = useNavigate();

  const [anexosSalvos, setAnexosSalvos] = useState<string[]>([]);

  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (id) {
      handleGetConsultation(id);
    }
  }, [id, setValue]);

  const onSubmit = async (data: FormData) => {
    if (viewOnly) return;

    if (id) {
      return handleEditConsultation(id, data);
    }

    return handleCreateConsultation(data);
  };

  const handleGetConsultation = async (id: string) => {
    try {
      const { data: consultation } = await api.get<Consulta>(
        `/consultations/${id}`
      );
      if (consultation) {
        setValue("local", consultation.local);
        setValue("data", consultation.date.slice(0, 10));
        setValue("tipo", consultation.type as keyof typeof mapTipoToLabel);
        setValue("medico", consultation.doctor);
        setValue("observacoes", consultation.description);
        if (consultation.files) {
          setAnexosSalvos(consultation.files.map((a) => a.filename));
        }
      }
    } catch (error) {
      toast.error("Erro ao consultar consulta");
    }
  };

  const handleGetFormData = (data: FormData) => {
    const formData = new FormData();
    formData.append("local", data.local);
    formData.append("date", new Date(data.data).toISOString());
    formData.append(
      "type",
      mapTipo[data.tipo as keyof typeof mapTipo] || data.tipo
    );
    formData.append("doctor", data.medico);
    formData.append("description", data.observacoes || "");

    if (data.anexos && data.anexos.length) {
      for (const file of data.anexos) {
        formData.append("files", file);
      }
    }

    return formData;
  };

  const handleCreateConsultation = async (data: FormData) => {
    try {
      await api.post("/consultations", handleGetFormData(data));

      toast.info("Consulta cadastrada com sucesso!");
      navigate("/home");
    } catch (error) {
      toast.error("Erro ao cadastrar consulta");
    }
  };

  const handleEditConsultation = async (id: string, data: FormData) => {
    try {
      await api.put(`/consultations/${id}`, handleGetFormData(data));

      toast.info("Consulta Editada com sucesso!");
      navigate("/home");
    } catch (error) {
      toast.error("Erro ao Editar consulta");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-8 shadow-md w-full max-w-2xl">
        <div className="flex items-center mb-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-4 text-xl hover:bg-green-200"
          >
            ←
          </button>
          <h2 className="text-2xl font-semibold text-gray-800">
            {viewOnly
              ? "Visualizar Registro"
              : id
              ? "Editar Registro"
              : "Novo Registro"}
          </h2>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-4"
        >
          <div>
            <label className="block mb-1 font-medium text-gray-600">
              Local da consulta
            </label>
            <input
              {...register("local")}
              disabled={viewOnly}
              placeholder="Ex: Hospital São Paulo"
              className="w-full px-4 py-3 border rounded-xl disabled:bg-gray-100"
            />
            {errors.local && (
              <p className="text-sm text-red-500 mt-1">
                {errors.local.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-600">Data</label>
            <input
              {...register("data")}
              type="date"
              disabled={viewOnly}
              className="w-full px-4 py-3 border rounded-xl disabled:bg-gray-100"
            />
            {errors.data && (
              <p className="text-sm text-red-500 mt-1">{errors.data.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-600">
              Tipo de atendimento
            </label>
            <select
              {...register("tipo")}
              disabled={viewOnly}
              className="w-full px-4 py-3 border rounded-xl disabled:bg-gray-100"
            >
              <option value="">Selecione</option>
              <option value="CONSULT">Consulta</option>
              <option value="EXAM">Exame</option>
              <option value="RETURN">Retorno</option>
            </select>
            {errors.tipo && (
              <p className="text-sm text-red-500 mt-1">{errors.tipo.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-600">
              Médico Responsável
            </label>
            <input
              {...register("medico")}
              disabled={viewOnly}
              placeholder="Nome do profissional"
              className="w-full px-4 py-3 border rounded-xl disabled:bg-gray-100"
            />
            {errors.medico && (
              <p className="text-sm text-red-500 mt-1">
                {errors.medico.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-600">
              Observações
            </label>
            <textarea
              {...register("observacoes")}
              disabled={viewOnly}
              rows={4}
              placeholder="Sintomas, diagnóstico, etc."
              className="w-full px-4 py-3 border rounded-xl disabled:bg-gray-100"
            ></textarea>
          </div>

          {viewOnly ? (
            <div>
              <label className="block mb-1 font-medium text-gray-600">
                Anexos
              </label>
              <ul className="list-disc ml-5 text-sm text-blue-600">
                {anexosSalvos.length === 0 && (
                  <li className="text-gray-400">Nenhum anexo disponível.</li>
                )}
                {anexosSalvos.map((filename) => (
                  <li key={filename}>
                    <a
                      href={`${API_URL}uploads/${filename}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-blue-800"
                    >
                      {filename}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div>
              <label className="block mb-1 font-medium text-gray-600">
                Anexo de documento
              </label>
              <input
                {...register("anexos")}
                type="file"
                multiple
                disabled={viewOnly}
                className="w-full px-4 py-2 border rounded-xl disabled:bg-gray-100 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
              />
            </div>
          )}

          {!viewOnly && (
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl mt-2"
            >
              {id ? "Atualizar" : "Salvar"} Registro
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
