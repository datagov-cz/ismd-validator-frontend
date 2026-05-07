import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ISMD - Připravujeme',
  description:
    'Validátor pro kontrolu a převod slovníků v rámci Informačního systému pro modelování dat se připravuje k veřejnému spuštění.',
};

export default function ComingSoonPage() {
  return (
    <main className="min-h-[calc(100vh-12rem)] flex items-center justify-center px-5 py-16">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-medium text-blue-primary mb-6">
          Připravujeme
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Validátor pro kontrolu a převod slovníků v rámci Informačního systému
          pro modelování dat dokončujeme. Veřejně dostupný bude v nejbližší
          době.
        </p>
        <p className="text-base text-gray-500">Děkujeme za trpělivost.</p>
      </div>
    </main>
  );
}
