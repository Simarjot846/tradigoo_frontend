// Order status type (local, backend-agnostic)

export type OrderStatus =
  | 'ORDER_CREATED'
  | 'PAYMENT_HELD'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'OTP_CONFIRMED'
  | 'INSPECTION_PENDING'
  | 'PAYMENT_RELEASED'
  | 'DISPUTED'
  | 'CANCELLED'
  | 'REFUNDED';

// All possible states
export const ORDER_STATES: OrderStatus[] = [
  'ORDER_CREATED',
  'PAYMENT_HELD',
  'SHIPPED',
  'DELIVERED',
  'OTP_CONFIRMED',
  'INSPECTION_PENDING',
  'PAYMENT_RELEASED',
  'DISPUTED',
  'CANCELLED',
  'REFUNDED',
];

// Valid transitions mapping
const VALID_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  ORDER_CREATED: ['PAYMENT_HELD', 'CANCELLED'],
  PAYMENT_HELD: ['SHIPPED', 'CANCELLED'],
  SHIPPED: ['DELIVERED'],
  DELIVERED: ['OTP_CONFIRMED', 'DISPUTED'],
  OTP_CONFIRMED: ['INSPECTION_PENDING', 'DISPUTED'],
  INSPECTION_PENDING: ['PAYMENT_RELEASED', 'DISPUTED'],
  PAYMENT_RELEASED: [],
  DISPUTED: ['PAYMENT_RELEASED', 'REFUNDED'],
  CANCELLED: [],
  REFUNDED: [],
};

// Check if a status change is allowed
export function validateTransition(
  currentStatus: OrderStatus,
  newStatus: OrderStatus
): boolean {
  return VALID_TRANSITIONS[currentStatus]?.includes(newStatus) ?? false;
}

// Human-readable next step
export function getNextStepDescription(
  status: OrderStatus,
  role: 'retailer' | 'wholesaler'
): string {
  switch (status) {
    case 'ORDER_CREATED':
      return role === 'retailer'
        ? 'Make payment to secure order'
        : 'Waiting for payment';

    case 'PAYMENT_HELD':
      return role === 'wholesaler'
        ? 'Pack and ship the order'
        : 'Waiting for shipment';

    case 'SHIPPED':
      return role === 'retailer'
        ? 'Share OTP upon delivery'
        : 'Transit in progress';

    case 'DELIVERED':
      return role === 'retailer'
        ? 'Verify goods with OTP'
        : 'Waiting for OTP confirmation';

    case 'OTP_CONFIRMED':
      return 'Inspection window active';

    case 'INSPECTION_PENDING':
      return role === 'retailer'
        ? 'Check goods - Raise dispute if needed'
        : 'Waiting for inspection expiry';

    case 'DISPUTED':
      return 'Under manual review';

    case 'PAYMENT_RELEASED':
      return 'Transaction completed';

    case 'CANCELLED':
      return 'Order cancelled';

    case 'REFUNDED':
      return 'Amount refunded';

    default:
      return '';
  }
}
