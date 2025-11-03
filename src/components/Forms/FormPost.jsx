export const FormPost = () => {
  return (
    <main className="fixed z-50 flex items-center justify-center inset-0">
      {/* Fondo difuninado */}
      <div className="absolute backdrop-blur-sm cursor-pointer inset-0"></div>
      <section className="bg-white relative w-full max-w-md dark:bg-bg-dark rounded-lg shadow-xl">
        {/* header */}
        <header className="flex items-center justify-between p-4 border-b border-gray-500/40">
            <h2>Crear publicación</h2>
            
        </header>
      </section>
    </main>
  );
};
