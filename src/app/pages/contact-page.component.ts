import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MarkdownContentService } from '../services/markdown-content.service';

type SubmitState = 'idle' | 'opened' | 'error';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact-page.component.html'
})
export class ContactPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly markdownContent = inject(MarkdownContentService);
  private readonly recipient = 'huset@sjorringby.dk';

  submitState: SubmitState = 'idle';

  introHtml = toSignal(this.markdownContent.loadAsHtml('/content/contact-intro.md'), {
    initialValue: '<p>Indhold indlæses...</p>'
  });

  asideHtml = toSignal(this.markdownContent.loadAsHtml('/content/contact-aside.md'), {
    initialValue: '<p>Indhold indlæses...</p>'
  });

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

