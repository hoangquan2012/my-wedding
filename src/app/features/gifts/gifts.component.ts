import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { BankAccount, WeddingConfig } from '../../core/models';
import { ToastService } from '../../core/services/toast.service';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { SmartImageComponent } from '../../shared/components/smart-image/smart-image.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { SECTION_IDS } from '../../shared/section-ids';

@Component({
  selector: 'app-gifts',
  standalone: true,
  imports: [SectionHeadingComponent, RevealDirective, IconComponent, ModalComponent, SmartImageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './gifts.component.html',
})
export class GiftsComponent {
  private readonly toast = inject(ToastService);
  private readonly document = inject(DOCUMENT);

  readonly gift = input.required<WeddingConfig['gift']>();
  readonly accounts = input.required<BankAccount[]>();

  protected readonly ids = SECTION_IDS;
  protected readonly selected = signal<BankAccount | null>(null);

  protected roleLabel(account: BankAccount): string {
    return account.role === 'bride' ? 'Cô dâu' : 'Chú rể';
  }

  /** Groups digits for readability: 0011 0045 6789 0 */
  protected formatAccount(value: string): string {
    return value.replace(/(.{4})/g, '$1 ').trim();
  }

  openQr(account: BankAccount): void {
    this.selected.set(account);
  }

  closeQr(): void {
    this.selected.set(null);
  }

  async copy(account: BankAccount): Promise<void> {
    const ok = await this.writeClipboard(account.accountNumber);
    if (ok) {
      this.toast.success(this.gift().copySuccessMessage);
    } else {
      this.toast.error('Không thể sao chép. Vui lòng sao chép thủ công.');
    }
  }

  private async writeClipboard(text: string): Promise<boolean> {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {
      /* fall through to legacy path */
    }
    try {
      const textarea = this.document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      this.document.body.appendChild(textarea);
      textarea.select();
      const ok = this.document.execCommand('copy');
      this.document.body.removeChild(textarea);
      return ok;
    } catch {
      return false;
    }
  }
}
