import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/axios";
import { toast } from "react-toastify";
import { useState } from "react";
import LoadingModal from "../../components/Loadingmodal";

const cadastroSchema = z.object({
  nome: z.string().min(1, "Nome obrigatório"),
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "Senha com no mínimo 6 caracteres"),
});

type CadastroData = z.infer<typeof cadastroSchema>;

export default function Cadastro() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CadastroData>({
    resolver: zodResolver(cadastroSchema),
  });

  const onSubmit = async (data: CadastroData) => {
    try {
      setIsLoading(true);
      await api.post("/auth/register", {
        name: data.nome,
        email: data.email,
        password: data.senha,
      });
      toast.info("Usuário cadastrado com sucesso!");
      navigate("/");
    } catch (err) {
      toast.error("Erro ao cadastrar.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
        <div className="flex items-center justify-center mb-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-4 text-xl hover:bg-green-200"
          >
            ←
          </button>
          <h2 className="text-2xl font-bold text-center text-green-600">
            Cadastro
          </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("nome")}
            type="text"
            placeholder="Nome completo"
            className="w-full px-4 py-3 border rounded-xl"
          />
          {errors.nome && (
            <p className="text-sm text-red-500">{errors.nome.message}</p>
          )}
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border rounded-xl"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
          <input
            {...register("senha")}
            type="password"
            placeholder="Senha"
            className="w-full px-4 py-3 border rounded-xl"
          />
          {errors.senha && (
            <p className="text-sm text-red-500">{errors.senha.message}</p>
          )}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-xl hover:cursor-pointer hover:bg-green-600"
          >
            Cadastrar
          </button>
        </form>
        <Link
          to="/login"
          className="block text-center mt-4 text-green-500 text-sm underline hover:cursor-pointer hover:text-green-700"
        >
          Já tem uma conta? Faça Login
        </Link>
      </div>
      <LoadingModal show={isLoading} />
    </div>
  );
}
