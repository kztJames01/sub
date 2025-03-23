'use client'

import Image from "next/image";

import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>
        <div className="grid grid-rows-[20px_1fr_20px] bg-foreground items-center justify-items-center w-full lg:w-[50%] min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            <div className="flex flex-col items-center justify-center text-center bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-lg max-w-xl mx-auto">
              <Image
                src="/v3lo-trans.svg"
                alt="Logo"
                width={250}
                height={250}
              />
              <p className="text-lg text-foreground m-8">
              A modern, user-friendly financial management platform that helps users track, analyze, and optimize their finances with intelligent AI-powered suggestions.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/sign-up"
                  className="bg-secondary text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-foreground hover:text-primary transition-colors"
                >
                  Join the Platform
                </Link>
                <Link
                  href="/sign-in"
                  className="bg-transparent text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-foreground hover:text-primary transition-colors"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </main>
          <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
            <a
              className="flex items-center gap-2 text-primary hover:underline hover:underline-offset-4"
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/file.svg"
                alt="File icon"
                width={16}
                height={16}
              />
              About us
            </a>
            <a
              className="flex items-center gap-2 text-primary hover:underline hover:underline-offset-4"
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/window.svg"
                alt="Window icon"
                width={16}
                height={16}
              />
              Source Code
            </a>
            <a
              className="flex items-center gap-2 text-primary hover:underline hover:underline-offset-4"
              href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/globe.svg"
                alt="Globe icon"
                width={16}
                height={16}
              />
              Explore and Connect →
            </a>
          </footer>
        </div>
      </div>

      {/* Image Container (Right 50%) */}
      <Image
        src="/home.jpg"
        alt="home"
        width={500}
        height={500}
        className="fixed top-0 right-0 w-[50%] h-full hidden lg:block"
      />
    </>
  );
}