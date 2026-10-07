import { BankAccount } from '../models';

/**
 * QR images use the public VietQR image API so the demo works out of the box.
 * Replace `qrImage` with your own uploaded QR (e.g. `/images/qr-bride.png`)
 * or with a URL returned from your backend.
 */
const vietQr = (bankCode: string, accountNumber: string, accountName: string): string =>
  `https://img.vietqr.io/image/${bankCode}-${accountNumber}-compact.png?accountName=${encodeURIComponent(accountName)}`;

export const BANK_ACCOUNTS: BankAccount[] = [
  {
    id: 'bride',
    role: 'bride',
    owner: 'HOANG THI DIEU ANH',
    bank: 'Ngân hàng TMCP Ngoại thương Việt Nam',
    bankShort: 'Vietcombank',
    accountNumber: '0011004567890',
    qrImage: vietQr('VCB', '0011004567890', 'HOANG THI DIEU ANH'),
  },
  {
    id: 'groom',
    role: 'groom',
    owner: 'HOANG QUAN',
    bank: 'Ngân hàng TMCP Kỹ thương Việt Nam',
    bankShort: 'Techcombank',
    accountNumber: '19031234567012',
    qrImage: vietQr('TCB', '19031234567012', 'HOANG QUAN'),
  },
];
