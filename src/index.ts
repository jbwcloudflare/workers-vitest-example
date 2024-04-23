export class MyDurableObject implements DurableObject {
	async fetch(req: Request) {
		console.log('log from inside the DO');
		return new Response('OK');
	}
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		console.log('log from inside the worker');

		const stub = env.MY_DURABLE_OBJECT.get(env.MY_DURABLE_OBJECT.idFromName('test'));
		const resp = await stub.fetch(new Request('http://fake.invalid'));
		return resp;
	},
};
