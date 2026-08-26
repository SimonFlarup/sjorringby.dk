import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { MarkdownContentService } from '../services/markdown-content.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home-page.component.html'
})
export class HomePageComponent {
  private readonly markdownContent = inject(MarkdownContentService);

  heroHtml = toSignal(this.markdownContent.loadAsHtml('/content/home-hero.md'), {
    initialValue: '<p>Indhold indlæses...</p>'
  });

  omkringHtml = toSignal(this.markdownContent.loadAsHtml('/content/home-omkring.md'), {
    initialValue: '<p>Indhold indlæses...</p>'
  });

  husHtml = toSignal(this.markdownContent.loadAsHtml('/content/home-hus.md'), {
    initialValue: '<p>Indhold indlæses...</p>'
  });

  kisHtml = toSignal(this.markdownContent.loadAsHtml('/content/home-kis.md'), {
    initialValue: '<p>Indhold indlæses...</p>'
  });
}

