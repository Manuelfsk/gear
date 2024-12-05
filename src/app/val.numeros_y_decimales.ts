import { Directive, HostListener } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

@Directive({
    selector: '[filtrarNumeros]',
    providers: [{
        provide: NG_VALIDATORS,
        multi: true,
        useExisting: SoloNumeros_y_decimales
    }]
})

export class SoloNumeros_y_decimales implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        const valor = control.value;
        if (valor == null || valor == undefined || valor == "") {
            console.log("--->si el valor es null", valor);
            return null;
        }
        const regex = /^[0-9]+(\.[0-9]*)?$/;
        if (regex.test(valor)) {
            console.log("--- si cumple con la expresion solo num", valor);
            return null
        } else {
            return { filtarNumeros: true }
        }
    }

    @HostListener('keypress', ['$event'])
    onKeyPress(event: KeyboardEvent) {
        const charCode = event.charCode;
        const inputChar = String.fromCharCode(charCode);
        if (!/^[0-9.]$/.test(inputChar)) {
            event.preventDefault();
            return;
        }

        const currentInputValue = (event.target as HTMLInputElement).value;
        if (inputChar === '.' && currentInputValue.includes('.')) {
            event.preventDefault(); 
        }
    }

    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        if ([
            'Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete', 'Enter'
        ].indexOf(event.key) !== -1) {
            return; 
        }
    }
}
