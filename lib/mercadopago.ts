// lib/mercadopago.ts
import { MercadoPagoConfig, PreApproval, Payment } from 'mercadopago';

// Inicializar cliente
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
  options: {
    timeout: 5000,
  }
});

// Instanciar APIs
export const preApprovalAPI = new PreApproval(client);
export const paymentAPI = new Payment(client);

// Tipos
export interface CreatePreapprovalParams {
  reason: string;
  payer_email: string;
  auto_recurring: {
    frequency: number;
    frequency_type: 'months';
    transaction_amount: number;
    currency_id: 'ARS';
    free_trial?: {
      frequency: number;
      frequency_type: 'days';
    };
  };
  back_url: string;
  external_reference: string; // escribanoId
}

export interface PreapprovalResponse {
  id: string;
  init_point: string;
  status: string;
}