

export default function LandingPage() {

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="p-6 flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-green-600">HealCon</h1>
        <button
          // onClick={() => navigate("/cadastrar")}
          className="bg-green-500 text-white px-6 py-2 rounded-xl hover:bg-green-600"
        >
          Criar Conta
        </button>
      </header>

      <main className="px-6 py-16 max-w-6xl mx-auto">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Seu histórico médico organizado em um só lugar
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            O HealCon ajuda você a guardar e acessar seus documentos médicos de
            forma simples, segura e acessível. Tenha seus exames, consultas e
            receitas disponíveis sempre que precisar.
          </p>
          <button
            // onClick={() => navigate("/cadastrar")}
            className="bg-green-500 text-white text-lg px-8 py-3 rounded-xl hover:bg-green-600"
          >
            Comece Agora
          </button>
        </div>

        <section className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="bg-green-50 rounded-2xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-green-700">
              Acesso Rápido
            </h3>
            <p className="text-gray-600 text-sm">
              Tenha suas consultas e exames disponíveis na palma da mão, a
              qualquer momento.
            </p>
          </div>
          <div className="bg-green-50 rounded-2xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-green-700">
              Segurança
            </h3>
            <p className="text-gray-600 text-sm">
              Seus dados armazenados com segurança e privacidade, protegidos por
              autenticação JWT.
            </p>
          </div>
          <div className="bg-green-50 rounded-2xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-green-700">
              Organização
            </h3>
            <p className="text-gray-600 text-sm">
              Classifique seus registros por tipo, data e especialidade para
              facilitar seu acompanhamento.
            </p>
          </div>
        </section>

        <section className="mt-24 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Comece gratuitamente
          </h3>
          <p className="text-gray-600 mb-6">
            Crie sua conta e comece a usar agora mesmo sem custo inicial.
          </p>
          <button
            // onClick={() => navigate("/cadastrar")}
            className="bg-green-500 text-white px-8 py-3 rounded-xl hover:bg-green-600"
          >
            Criar Conta Gratuita
          </button>
        </section>
      </main>

      <footer className="text-center py-8 text-sm text-gray-400">
        © {new Date().getFullYear()} HealCon. Todos os direitos reservados.
      </footer>
    </div>
  );
}
