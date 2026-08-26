import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, SecurityContext, ViewChild, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { marked } from 'marked';

@Component({
  selector: 'app-forsamling-page',
  standalone: true,
  templateUrl: './forsamling-page.component.html'
})
export class ForsamlingPageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('facebookHost', { static: true })
  private facebookHost?: ElementRef<HTMLElement>;

  private readonly sanitizer = inject(DomSanitizer);
  private readonly http = inject(HttpClient);
  private resizeObserver?: ResizeObserver;

  articleHtml = '<p>Indhold indlæses...</p>';

  facebookWidth = 340;
  facebookHeight = 560;
  facebookSrc: SafeResourceUrl = this.buildFacebookSrc(this.facebookWidth, this.facebookHeight);

  ngAfterViewInit() {
    this.loadArticleContent();

    const host = this.facebookHost?.nativeElement;
    if (!host) {
      return;
    }

    this.updateFacebookSize(host.clientWidth);

    if (typeof ResizeObserver === 'undefined') {
      return;
    }

    this.resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        this.updateFacebookSize(entry.contentRect.width);
      }
    });

    this.resizeObserver.observe(host);
  }

  ngOnDestroy() {
    this.resizeObserver?.disconnect();
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.updateFacebookSize();
  }

  onFacebookLoad() {
    this.updateFacebookSize();
  }

  private loadArticleContent() {
    this.http.get('/content/forsamling.md', { responseType: 'text' }).subscribe({
      next: (markdown) => {
        const rendered = marked.parse(markdown, { async: false });
        this.articleHtml = this.sanitizer.sanitize(SecurityContext.HTML, rendered) ?? '<p>Indhold kunne ikke vises.</p>';
      },
      error: () => {
        this.articleHtml = '<p>Kunne ikke hente indholdet. Prøv igen senere.</p>';
      }
    });
  }

  private updateFacebookSize(rawWidth?: number) {
    const host = this.facebookHost?.nativeElement;
    const computed = host ? getComputedStyle(host) : null;
    const paddingX = computed ? parseFloat(computed.paddingLeft) + parseFloat(computed.paddingRight) : 0;
    const measuredWidth = rawWidth ?? host?.clientWidth ?? this.facebookWidth;
    const availableWidth = rawWidth === undefined ? measuredWidth - paddingX : measuredWidth;

    // Facebook Page plugin width range: 180 - 500.
    const width = Math.max(180, Math.min(500, Math.floor(availableWidth)));
    const height = Math.max(500, Math.min(900, Math.round(width * 1.6)));

    if (this.facebookWidth === width && this.facebookHeight === height) {
      return;
    }

    this.facebookWidth = width;
    this.facebookHeight = height;
    this.facebookSrc = this.buildFacebookSrc(width, height);
  }

  private buildFacebookSrc(width: number, height: number): SafeResourceUrl {
    const params = new URLSearchParams({
      locale: 'da_DK',
      href: 'https://www.facebook.com/sjorringby',
      tabs: 'timeline,events',
      width: width.toString(),
      height: height.toString(),
      small_header: 'false',
      adapt_container_width: 'true',
      hide_cover: 'false',
      show_facepile: 'true',
      appId: ''
    });

    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.facebook.com/plugins/page.php?${params.toString()}`);
  }
}

