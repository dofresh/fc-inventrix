import { A } from "@solidjs/router";

export default function NotFound() {
  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
        Not Found
      </h1>
      <p class="mt-8">
        Visit{" "}
        <a
          href={import.meta.env.HOME_URL}
          target="_blank"
          class="text-sky-600 hover:underline"
        >
          fc.inventrix.freshhada.com
        </a>{" "}
        to learn how to build Solid apps.
      </p>
      <p class="my-4">
        <A href="/" class="text-sky-600 hover:underline">
          Home
        </A>
        {" - "}
        <A href="/auth/login" class="text-sky-600 hover:underline">
          Log in
        </A>
      </p>
    </main>
  );
}
