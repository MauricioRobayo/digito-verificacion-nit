import Head from "next/head";
import { useRouter } from "next/router";
import { getVerificationDigit } from "nit-verifier";
import { ChangeEvent, useMemo, useState } from "react";

const formatter = new Intl.NumberFormat("es-CO", { useGrouping: true });

export default function Home() {
  const [nit, setNit] = useState("");
  const [copied, setCopied] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setNit(value.length > 15 ? value.slice(0, 15) : value);
  };
  const verificationDigit = getVerificationDigit(nit);
  const formattedNit = formatter.format(Number(nit));
  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${formattedNit}-${verificationDigit}`);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return (
    <div className="grid place-items-center h-screen">
      <Head>
        <title>Dígito de verificación NIT</title>
        <meta name="description" content="Dígito de verificación NIT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-center">
        <h1 className="text-2xl my-12">Dígito de Verificación</h1>
        <article>
          <label htmlFor="nit" className="block">
            NIT o C.C.
          </label>
          <input
            id="nit"
            className="text-lg p-2 my-2 mx-2 rounded-lg bg-green-50"
            value={nit}
            onChange={onChange}
          />
          {nit && (
            <div className="text-green-900">
              <button onClick={copyToClipboard}>
                <div className="text-4xl">
                  {formattedNit}-
                  <span className="text-red-700 font-bold">
                    {verificationDigit}
                  </span>
                </div>
                <div>{copied ? "Copiado" : "Copiar"}</div>
              </button>
            </div>
          )}
        </article>
      </main>
      <footer></footer>
    </div>
  );
}
