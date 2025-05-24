interface Env {
  VISIT_COUNTS: KVNamespace;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const path = url.pathname;

  if (context.request.method === 'POST') {
    // Increment counter
    const currentCount = (await context.env.VISIT_COUNTS.get(path, 'json')) || { total: 0 };
    const newCount = { total: currentCount.total + 1 };
    await context.env.VISIT_COUNTS.put(path, JSON.stringify(newCount));

    return new Response(JSON.stringify(newCount), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } else if (context.request.method === 'GET') {
    // Get counter
    const count = (await context.env.VISIT_COUNTS.get(path, 'json')) || { total: 0 };

    return new Response(JSON.stringify(count), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  return new Response('Method not allowed', { status: 405 });
};
