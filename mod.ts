import 'https://deno.land/x/worker_types@v1.0.1/service-worker-types.ts';

const fetchHandler = {
  handleEvent: (event:FetchEvent) => {
    const response = new Response("Kakeai is alive!", {
      headers: { "content-type": "text/plain" },
    });
    event.respondWith(response);
  }
}

addEventListener("fetch", fetchHandler);
