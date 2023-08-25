var clients = [];
var facts = [];

class EventsController {
  eventsHandler(request, response, next) {
    const headers = {
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache'
    };
    response.writeHead(200, headers);

    const data = `data: ${JSON.stringify(facts)}\n\n`;

    response.write(data);

    const clientId = Date.now();

    const newClient = {
      id: clientId,
      response
    };

    clients.push(newClient);

    request.on('close', () => {
      console.log(`${clientId} Connection closed`);
      clients = clients.filter(client => client.id !== clientId);
    });
  }

  sendEventsToAll(newFact) {
    clients.forEach(client => client.response.write(`data: ${JSON.stringify(newFact)}\n\n`))
  }
}

module.exports = new EventsController