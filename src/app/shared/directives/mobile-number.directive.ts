import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appMobileNumber]'
})
export class MobileNumberDirective implements OnInit {

  private readonly prefix: string = '+20 1';
  private readonly maxLength: number = this.prefix.length + 9 + 1; // +20 1xx xxxxxxx (13 characters total)

  constructor(private el: ElementRef, private control: NgControl) {}

  ngOnInit() {
    this.el.nativeElement.value = this.prefix;
    this.control.control?.setValue(this.prefix);
  }

  @HostListener('input', ['$event'])
  onInputChange(event: KeyboardEvent): void {
    const input = this.el.nativeElement;
    let value = input.value.replace(/\D/g, '');

    if (!value.startsWith('201')) {
      value = '201';
    }

    if (value.length > 12) {
      value = value.substring(0, 12);
    }

    const formattedValue = this.formatMobileNumber(value);
    input.value = formattedValue;
    this.control.control?.setValue(formattedValue);
  }

  private formatMobileNumber(value: string): string {
    let formattedValue = '+20 ';
    if (value.length > 2) {
      formattedValue += value.substring(2, 5) + ' ';
    }
    if (value.length > 5) {
      formattedValue += value.substring(5);
    }
    return formattedValue;
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const input = this.el.nativeElement;
    const cursorPosition = input.selectionStart;

    if ((event.key < '0' || event.key > '9') && event.key !== 'Backspace' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight' && event.key !== 'Delete') {
      event.preventDefault();
    }

    if (cursorPosition < this.prefix.length && event.key !== 'Backspace' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      event.preventDefault();
    }
  }
}