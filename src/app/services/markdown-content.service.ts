import { Injectable, SecurityContext, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, catchError, map, of } from 'rxjs';
import { marked } from 'marked';

@Injectable({ providedIn: 'root' })
export class MarkdownContentService {
  private readonly http = inject(HttpClient);
  private readonly sanitizer = inject(DomSanitizer);

  loadAsHtml(path: string, fallbackMessage = 'Kunne ikke hente indholdet. Prøv igen senere.'): Observable<string> {
    return this.http.get(path, { responseType: 'text' }).pipe(
      map((markdown) => this.parse(markdown)),
      catchError(() => of(`<p>${fallbackMessage}</p>`))
    );
  }

  private parse(markdown: string, fallbackMessage = 'Indhold kunne ikke vises.'): string {
    const rendered = marked.parse(markdown, { async: false });
    return this.sanitizer.sanitize(SecurityContext.HTML, rendered) ?? `<p>${fallbackMessage}</p>`;
  }
}


