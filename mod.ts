import './src/mod.ts'

// for Deno Deploy

interface FetchEvent extends Event {
  respondWith(r: Response | Promise<Response>): void;
}

const version = Deno.env.get('VERSION') ?? '0.0.0'

const fetchHandler = {
  handleEvent: (event:FetchEvent) => {
    const response = new Response(`Kakeai ${version} is alive!`, {
      headers: { "content-type": "text/plain" },
    });
    event.respondWith(response);
  }
}

addEventListener("fetch", fetchHandler);
