import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load = (async () => {
  // 1.
  const response = await prisma.store.findMany({
      include: { shoes: true },
    })

  // 2.
  return { feed: response };
}) satisfies PageServerLoad;