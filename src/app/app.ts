import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Topbar } from './core/components/topbar/topbar';
import { Header } from './core/components/header/header';
import { GalleryOverlay } from './shared/gallery-overlay';
import { routeFade } from './shared/animation';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Topbar, Header, GalleryOverlay],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  animations: [routeFade]
})
export class App {
  protected readonly title = signal('shamolima');
}
