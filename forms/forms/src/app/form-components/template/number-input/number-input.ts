import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-template-number-input',
  templateUrl: './number-input.html',
  styleUrl: './number-input.scss',
  providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TemplateNumberInput),
            multi: true,
        },
    ],
    imports: [CommonModule, FormsModule],

})
export class TemplateNumberInput implements ControlValueAccessor {
    @Input() min: number = Number.MIN_SAFE_INTEGER;
    @Input() max: number = Number.MAX_SAFE_INTEGER;
    @Output() onSubmit: EventEmitter<void> = new EventEmitter<void>();
    public value: number | undefined;

    onChange: (value: number) => void = () => {};
    onTouched: () => void = () => {
        // FIXME: é isso que queremos? Se deixar um numero inválido e confirmar ele vai trocar na hora do click
        // atribui um valor válido ao campo apenas quando ocorre o blur
        this.value = this.getValidValue(this.value);
    };

    /**
     * Funçoes do ControlValueAccessor
     */
    public writeValue(value: number): void {
        this.value = this.getValidValue(value);
    }

    public registerOnChange(fn: () => void): void {
        this.onChange = fn;
    }
    public registerOnTouched(fn: () => void): void {
        // FIXME: Se fizer a atribuição abaixo, não conseguimos ouvir o blur
        // this.onTouched = fn;
    }
    /**
     * Fim funções do ControlValueAccessor
     */

    private getValidValue(currentValue: number | undefined): number {
        // if (isNaN(currentValue)) {
        //     return null;
        // }

        // Usando parse flow porque o currentValue nem sempre vem de fato como number
        // eg: 10--2 vira 10
        currentValue = parseFloat(`${currentValue}`);
        if (currentValue < this.min) {
            return this.min;
        }
        if (currentValue > this.max) {
            return this.max;
        }
        return currentValue;
    }
}
