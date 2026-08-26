import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MarkdownContentService } from '../services/markdown-content.service';

@Component({
  selector: 'app-omkring-page',
  standalone: true,
  templateUrl: './omkring-page.component.html'
})
export class OmkringPageComponent {
  private readonly markdownContent = inject(MarkdownContentService);

  articleHtml = toSignal(this.markdownContent.loadAsHtml('/content/omkring.md', 'Kunne ikke hente indholdet. Prøv igen senere.'), {
    initialValue: '<p>Indhold indlæses...</p>'
  });
}

