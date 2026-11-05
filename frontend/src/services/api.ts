// Menghubungkan format React dengan respons FastAPI.
// Request /api/v1 diteruskan melalui proxy Vite.

function mapStatus(status: string): string {
  if (status === 'identified') return 'predicted';
  if (status === 'not_snake') return 'not_snake';
  if (status === 'manual') return 'manual';
  if (status === 'unknown') return 'unidentified';
  return status;
}

export async function apiFetch(
  input: string,
  init: RequestInit = {},
): Promise<Response> {
  const url = new URL(input, window.location.origin);
  const method = (init.method || 'GET').toUpperCase();

  let target = '/api/v1/history';
  const headers=new Headers(init.headers);
  headers.set('X-Serpenta-Request','1');
  const options: RequestInit = { ...init, method, headers, credentials:'same-origin' };

  if (url.pathname === '/api/detect') {
    target =
      method === 'GET'
        ? '/api/v1/detections/status'
        : '/api/v1/detections';
  }

  if (url.pathname === '/api/history' && method === 'DELETE') {
    target += '/' + encodeURIComponent(url.searchParams.get('id') || '');
  }

  if (url.pathname === '/api/history' && method === 'PATCH') {
    const payload = JSON.parse(String(init.body));
    target += '/' + encodeURIComponent(payload.id);
    options.body = JSON.stringify({ note: payload.note });
  }

  const response = await fetch(target, options);
  if(response.status===401)window.dispatchEvent(new Event('serpenta:expired'));

  if (response.status === 204) {
    return Response.json({ ok: true });
  }

  let data: any = null;
  try {
    data = await response.json();
  } catch {
    // Backend returned non-JSON body (e.g. 500 Internal Server Error)
  }

  if (!response.ok) {
    return Response.json(
      {
        error:
          typeof data?.detail === 'string'
            ? data.detail
            : response.status >= 500
            ? 'Terjadi kesalahan pada server backend.'
            : JSON.stringify(data?.detail || data || 'Permintaan gagal.'),
      },
      { status: response.status },
    );
  }

  if (url.pathname === '/api/detect' && method === 'GET') {
    return Response.json({
      configured: data.ready,
      message: data.message,
      threshold: data.threshold,
    });
  }

  if (url.pathname === '/api/history' && method === 'GET') {
    return Response.json({
      observations: data.map(
        (row: {
          species_id: string | null;
          created_at: string;
          image_url: string;
          status: string;
          [key: string]: unknown;
        }) => ({
          ...row,
          speciesId: row.species_id,
          createdAt: new Date(row.created_at).getTime(),
          image: row.image_url,
          status: mapStatus(row.status),
        }),
      ),
    });
  }

  if (url.pathname === '/api/detect') {
    return Response.json(
      {
        ...data,
        status: mapStatus(data.status),
      },
      { status: response.status },
    );
  }

  return Response.json(data, { status: response.status });
}