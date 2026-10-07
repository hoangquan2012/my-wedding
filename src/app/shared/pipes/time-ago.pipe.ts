import { Pipe, PipeTransform } from '@angular/core';

/** Relative time in Vietnamese: "vừa xong", "5 phút trước", "2 ngày trước"… */
@Pipe({ name: 'timeAgo', standalone: true })
export class TimeAgoPipe implements PipeTransform {
  transform(value: string | Date | null | undefined, now: Date = new Date()): string {
    if (!value) {
      return '';
    }
    const date = typeof value === 'string' ? new Date(value) : value;
    const seconds = Math.max(0, Math.round((now.getTime() - date.getTime()) / 1000));

    if (seconds < 60) {
      return 'vừa xong';
    }
    const minutes = Math.round(seconds / 60);
    if (minutes < 60) {
      return `${minutes} phút trước`;
    }
    const hours = Math.round(minutes / 60);
    if (hours < 24) {
      return `${hours} giờ trước`;
    }
    const days = Math.round(hours / 24);
    if (days < 30) {
      return `${days} ngày trước`;
    }
    const months = Math.round(days / 30);
    if (months < 12) {
      return `${months} tháng trước`;
    }
    return `${Math.round(months / 12)} năm trước`;
  }
}
