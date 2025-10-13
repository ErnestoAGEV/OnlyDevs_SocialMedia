import { Icon } from "@iconify/react";

export const HomePage = () => {
  return (
    <main className="flex min-h-screen bg-white dark:bg-bg-dark max-w-[1200px] mx-auto ">
      <section className="flex flex-col w-full h-screen ">
        <articule className="flex flex-col h-screen overflow-hidden border border-gray-200 border-t-0 border-b-0 dark:border-gray-600">
          <div className="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-600 px-4 py-3">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold">INICIO</h1>
              <button className="flex gap-2">
                <span class="font-semibold text-gray-500/80">200 usuarios</span>
                <Icon icon="mage:dots" width="24" height="24" />
              </button>
            </div>
          </div>
          Principal
        </articule>
        <articule>Sidebar derecho</articule>
      </section>
    </main>
  );
};
