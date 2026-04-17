import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="page-wrap">
      <section className="card-panel mx-auto max-w-2xl p-10 text-center">
        <p className="text-lg font-semibold uppercase tracking-wide text-brand-mid">404</p>
        <h1 className="mt-2 text-4xl font-extrabold text-slate-800 sm:text-5xl">Page not found</h1>
        <p className="mt-3 text-base text-slate-500 sm:text-lg">
          This route does not exist. Head back home and continue keeping your friendships healthy.
        </p>
        <Link
          to="/"
          className="mt-7 inline-flex rounded-md bg-brand-dark px-5 py-3 font-bold text-white transition hover:bg-brand-mid"
        >
          Go Back Home
        </Link>
      </section>
    </div>
  );
}
