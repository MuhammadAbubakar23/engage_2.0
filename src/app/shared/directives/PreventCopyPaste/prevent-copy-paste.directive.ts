import { Directive, HostListener, ElementRef  } from '@angular/core';

@Directive({
  selector: '[appPreventCopyPaste]',
  standalone: true
})
export class PreventCopyPasteDirective {
  constructor(private el: ElementRef) {}

  @HostListener('copy', ['$event'])
  onCopy(event: ClipboardEvent) {
    event.preventDefault(); // Prevent copying
  }

  @HostListener('cut', ['$event'])
  onCut(event: ClipboardEvent) {
    event.preventDefault(); // Prevent cutting
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    event.preventDefault(); // Prevent pasting
  }

  @HostListener('selectstart', ['$event'])
  onSelectStart(event: Event) {
    event.preventDefault(); // Prevent text selection
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.ctrlKey && (event.key === 'x' || event.key === 'c' || event.key === 'v')) {
      event.preventDefault(); // Prevent Ctrl+X (cut), Ctrl+C (copy), and Ctrl+V (paste)
    }
  }
}
