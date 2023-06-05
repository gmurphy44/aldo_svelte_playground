import prisma from '$lib/prisma';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
  // 1.
  const response = await prisma.store.findMany({
      include: { shoes: true },
    })

  // 2.
  return { feed: response };
}) satisfies PageServerLoad;

export const actions = {
  // 2.
  addEvent: async ({ params: { store, model, inventory } }) => {
    console.log("UPSERTING")
    await prisma.store.upsert({
      where: {name: store},
      create: {
        name: store,
        shoes: {
          connectOrCreate: [{model, inventory}]
        }
      }, 
      update: {
        shoes: {
          connectOrCreate: [{model, inventory}]
        }
      }
    })

      throw redirect(303, `/p/${id}`);
  }


} satisfies Actions;