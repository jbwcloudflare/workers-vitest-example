import { env, createExecutionContext, waitOnExecutionContext } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../src';

const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe('tests with logs', () => {
	it('handles requests to the worker', async () => {
		const request = new IncomingRequest('http://example.com');

		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);

		ctx.waitUntil(scheduler.wait(100)); // attempt to give time for logs to flush
		await waitOnExecutionContext(ctx);

		console.log('done waiting');
		expect(await response.text()).toBe('Hello World!');
	});
});

// Error: Isolated storage failed. There should be additional logs above.
