import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MarkdownContentService } from '../services/markdown-content.service';

@Component({
  selector: 'app-kis-page',
  standalone: true,
  templateUrl: './kis-page.component.html'
})
export class KisPageComponent {
  private readonly markdownContent = inject(MarkdownContentService);

  articleHtml = toSignal(this.markdownContent.loadAsHtml('/content/kis.md', 'Kunne ikke hente indholdet. Prøv igen senere.'), {
    initialValue: '<p>Indhold indlæses...</p>'
  });
}

