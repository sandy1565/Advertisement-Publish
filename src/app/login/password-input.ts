import {
    Component,
    AfterViewInit,
    Input,
    ElementRef,
    ViewChild
} from '@angular/core';

import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';


const noop = () => {
};

@Component({
    selector: 'password-input',
    template: `
    <div class="input-group mb-2 mr-sm-2 mb-sm-0">
        <input type="password" class="form-control" placeholder="{{placeholder}}" #input [(ngModel)]="value">
        <div class="input-group-addon" style="    position: absolute;
        right: 8px;
        top: 10px;" #toggler><i class="fa fa-eye"></i></div>
    </div>`,
    providers: [
        {provide: NG_VALUE_ACCESSOR, multi: true, useExisting: PasswordInputComponent}
    ]
})
export class PasswordInputComponent implements AfterViewInit, ControlValueAccessor {

    private _value: string;
    private _onChange: (_: any) => void = noop;

    @ViewChild('input') el: ElementRef;
    @ViewChild('toggler') toggler: ElementRef;
    @Input() placeholder: string;
    @Input() behaviour: string = 'press';


    get value(): any {
        return this._value;
    };

    set value(v: any) {
        if (v !== this._value) {
            this._value = v;
            this._onChange(v);
        }
    }

    ngAfterViewInit() {
        let __this = this;
        let textbox = __this.el.nativeElement;
        let toggler = __this.toggler.nativeElement;
        let togglerIcon = toggler.childNodes[0];

        if (__this.behaviour === 'press') {
            toggler.addEventListener('mousedown', (e) => {
                textbox.type = 'text';
                togglerIcon.classList.remove('fa-eye');
                togglerIcon.classList.add('fa-eye-slash');
            });
            toggler.addEventListener('mouseup', (e) => {
                textbox.type = 'password';
                togglerIcon.classList.remove('fa-eye-slash');
                togglerIcon.classList.add('fa-eye');
            });
        }

        if (__this.behaviour === 'click') {
            toggler.addEventListener('click', (e) => {
                textbox.type = textbox.type === 'password' ? 'text' : 'password';
                togglerIcon.classList.toggle('fa-eye');
                togglerIcon.classList.toggle('fa-eye-slash');
            });
        }
    }

    writeValue(value: any) {
        this._value = value;
    }

    registerOnChange(fn: (value: any) => void) {
        this._onChange = fn;
    }

    registerOnTouched(fn: any) {}

}
