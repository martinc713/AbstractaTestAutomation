import { test, expect, request as playwrightRequest } from '@playwright/test';
import { PetStoreAPI } from '../../apis/PetStoreAPI';
import { createPetPayload, createOrderPayload } from '../../utils/petData';

test.describe('Petstore API tests', () => {
  test('Part1: create 10 pets and get sold pet', async () => {
    const apiRequest = await playwrightRequest.newContext({ baseURL: 'https://petstore.swagger.io' });
    const api = new PetStoreAPI(apiRequest);

    const createdIds: number[] = [];

    // 5 available
    for (let i = 0; i < 5; i++) {
      const pet = createPetPayload('available');
      const res = await api.createPet(pet);
      expect(res.status()).toBe(200);
      const body = await res.json();
      console.log('CREATED_PET', body.id, body.name, body.status);
      expect(body.id).toBe(pet.id);
      expect(body.name).toBe(pet.name);
      expect(body.status).toBe(pet.status);
      createdIds.push(body.id);
    }

    // 4 pending
    for (let i = 0; i < 4; i++) {
      const pet = createPetPayload('pending');
      const res = await api.createPet(pet);
      expect(res.status()).toBe(200);
      const body = await res.json();
      console.log('CREATED_PET', body.id, body.name, body.status);
      expect(body.id).toBe(pet.id);
      expect(body.name).toBe(pet.name);
      expect(body.status).toBe(pet.status);
      createdIds.push(body.id);
    }

    // 1 sold
    const soldPet = createPetPayload('sold');
    const soldRes = await api.createPet(soldPet);
    expect(soldRes.status()).toBe(200);
    const soldBody = await soldRes.json();
    console.log('CREATED_PET', soldBody.id, soldBody.name, soldBody.status);
    expect(soldBody.id).toBe(soldPet.id);
    expect(soldBody.name).toBe(soldPet.name);
    expect(soldBody.status).toBe(soldPet.status);
    const soldId = soldBody.id;

    // Get sold pet details
    const getRes = await api.getPetById(soldId);
    expect(getRes.status()).toBe(200);
    const getBody = await getRes.json();
    expect(getBody.status).toBe('sold');

    await apiRequest.dispose();
  });

  test('Part2: list available and create orders for 5 pets', async () => {
    const apiRequest = await playwrightRequest.newContext({ baseURL: 'https://petstore.swagger.io' });
    const api = new PetStoreAPI(apiRequest);

    const listRes = await api.findPetsByStatus('available');
    expect(listRes.status()).toBe(200);
    const pets = await listRes.json();
    expect(Array.isArray(pets)).toBeTruthy();

    const selected = pets.slice(0, 5);
    // If there are fewer than 5 available pets, the test will still attempt orders for what exists
    for (const pet of selected) {
      const order = createOrderPayload(pet.id);
      const res = await api.createOrder(order);
      expect(res.status()).toBe(200);
      const body = await res.json();
      console.log('CREATED_ORDER', body.id, body.petId, body.status);
      expect(body.petId).toBe(order.petId);
      expect(body.id).toBeDefined();
    }

    await apiRequest.dispose();
  });
});
