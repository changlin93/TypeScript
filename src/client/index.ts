import { createTRPCClient, splitLink, unstable_httpBatchStreamLink, unstable_httpSubscriptionLink } from '@trpc/client';
import type { AppRouter } from '../server';
//     👆 **type-only** import

// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
const trpc = createTRPCClient<AppRouter>({
    links: [
        splitLink({
            condition: (op) => op.type === 'subscription',
            true: unstable_httpSubscriptionLink({
                url: 'http://localhost:3000',
            }),
            false: unstable_httpBatchStreamLink({
                url: 'http://localhost:3000',
            }),
        }),
    ],
});


async function main() {
    const users = await trpc.userList.query();
    console.log(users);
}

main();