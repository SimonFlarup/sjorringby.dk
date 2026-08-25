import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

type SubmitState = 'idle' | 'opened' | 'error';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact-page.component.html'
})
export class ContactPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly recipient = 'huset@sjorringby.dk';

  submitState: SubmitState = 'idle';

  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    tlf: [''],
    title: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  get controls() {
    return this.form.controls;
  }

  submitForm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, tlf, title, message } = this.form.getRawValue();
    const bodyLines = [
      `Navn: ${name}`,
      `Telefon: ${tlf || '(ikke oplyst)'}`,
      '',
      'Besked:',
      message
    ];

    const mailto = `mailto:${this.recipient}?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;

    try {
      window.location.href = mailto;
      this.submitState = 'opened';
      this.form.reset();
    } catch {
      this.submitState = 'error';
    }
  }
}

