export function createPetPayload(status: 'available' | 'pending' | 'sold') {
  const id = Date.now() % 1000000000 + Math.floor(Math.random() * 1000);
  return {
    id,
    name: `${status}-AutoPet-${id}`,
    photoUrls: ['https://example.com/image.jpg'],
    tags: [{ id: 0, name: 'auto' }],
    status,
  };
}

export function createOrderPayload(petId: number) {
  // The Petstore test server expects orderId values between 1 and 10 for valid GET/DELETE
  // Use a module-level set to ensure we pick unique IDs in 1..10 until exhausted.
  if (!(global as any).__usedOrderIds) {
    (global as any).__usedOrderIds = new Set<number>();
  }
  const used: Set<number> = (global as any).__usedOrderIds;

  let id: number | undefined;
  for (let candidate = 1; candidate <= 10; candidate++) {
    if (!used.has(candidate)) {
      id = candidate;
      used.add(candidate);
      break;
    }
  }

  // If all IDs 1..10 used, fall back to a timestamp-based id (unlikely in these tests)
  if (!id) {
    id = Date.now() % 1000000000 + Math.floor(Math.random() * 1000);
  }

  return {
    id,
    petId,
    quantity: 1,
    shipDate: new Date().toISOString(),
    status: 'placed',
    complete: true,
  };
}

export function resetOrderIds() {
  if ((global as any).__usedOrderIds) {
    (global as any).__usedOrderIds.clear();
  }
}
