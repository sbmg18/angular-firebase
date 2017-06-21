import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {

    @HostBinding('class.open') isOpen = false;

    @HostListener('click') toggleDropdown(event: Event) {
        this.isOpen = !this.isOpen;
    }
}
