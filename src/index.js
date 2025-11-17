export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let pathname = url.pathname;

    // Ruta raíz
    if (pathname === '/') {
      pathname = '/index.html';
    }

    try {
      // Intenta servir el archivo desde ASSETS
      const response = await env.ASSETS.fetch(request);
      
      // Si el archivo no existe y no es un archivo específico, sirve index.html
      if (response.status === 404 && !pathname.includes('.')) {
        const indexResponse = await env.ASSETS.fetch(new Request(new URL('/index.html', request.url).toString()));
        return indexResponse;
      }
      
      return response;
    } catch (error) {
      return new Response('Error serving file: ' + error.message, {
        status: 500,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  }
};
