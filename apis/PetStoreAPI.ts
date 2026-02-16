import { APIRequestContext, APIResponse } from '@playwright/test';

export class PetStoreAPI {
  readonly request: APIRequestContext;
  readonly base = '/v2';

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async createPet(pet: any): Promise<APIResponse> {
    return this.request.post(`${this.base}/pet`, { data: pet });
  }

  async getPetById(id: number): Promise<APIResponse> {
    return this.request.get(`${this.base}/pet/${id}`);
  }

  async findPetsByStatus(status: string): Promise<APIResponse> {
    return this.request.get(`${this.base}/pet/findByStatus`, { params: { status } });
  }

  async createOrder(order: any): Promise<APIResponse> {
    return this.request.post(`${this.base}/store/order`, { data: order });
  }
}
