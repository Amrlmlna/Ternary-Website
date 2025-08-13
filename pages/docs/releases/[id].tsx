import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { getReleaseIds, getReleaseById } from "@/components/docs/releases";

interface ReleasePageProps {
  id: string;
}

export default function ReleasePage({ id }: ReleasePageProps) {
  const router = useRouter();
  const release = getReleaseById(id);
  const hideHeader = router.query.hideHeader === "true";
  const theme = typeof router.query.theme === "string" ? router.query.theme : undefined;

  if (!release) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-2">Release not found</h1>
          <p className="text-muted-foreground">No release notes found for id: {id}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Head>
        <title>Release {release.title}</title>
        {theme ? <meta name="color-scheme" content={theme} /> : null}
      </Head>

      {!hideHeader && (
        <header className="w-full border-b">
          <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-xl font-bold">What&apos;s new in v{release.title}</h1>
          </div>
        </header>
      )}

      <main className="max-w-4xl mx-auto p-4">
        <article className="prose prose-slate dark:prose-invert">
          <h2 className="flex items-center gap-2">{release.content.title}</h2>
          <p>{release.content.description}</p>

          <div className="mt-6 space-y-6">
            {release.content.items.map((item, idx) => (
              <section key={idx}>
                <h3 className="mt-0">{item.title}</h3>
                <pre className="whitespace-pre-wrap font-sans text-base leading-6">{item.content}</pre>
              </section>
            ))}
          </div>
        </article>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<ReleasePageProps> = async (
  ctx,
) => {
  const id = (ctx.params?.id as string) || "";
  const release = getReleaseById(id);
  if (!release) {
    return { notFound: true };
  }
  return { props: { id } };
};
