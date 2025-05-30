import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../store/useAuth";
import api from "../../services/axios";
import { toast } from "react-toastify";

const loginSchema = z.object({
  email: z.string().min(1, "Email obrigatório"),
  senha: z.string().min(1, "Senha obrigatória"),
});

type LoginData = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    try {
      const res = await api.post("/auth/login", {
        email: data.email,
        password: data.senha
      });
      setToken(res.data.token);
      navigate("/home");
    } catch (err) {
      toast.error("Email ou senha incorretos");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center text-green-600">
          HealCon
        </h1>
        <p className="text-center text-sm text-gray-500 mb-6">
          Organizador de documentos médicos
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("email")}
            type="text"
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
            className="w-full bg-green-500 text-white py-3 rounded-xl"
          >
            Login
          </button>
        </form>
        <Link
          to="/cadastrar"
          className="block text-center mt-4 text-green-500 text-sm underline hover:cursor-pointer hover:text-green-700"
        >
          Cadastrar novo usuário
        </Link>
      </div>
    </div>
  );
}
