import { Code, Palette, Lightbulb, Search, Map, Terminal, Rocket } from 'lucide-react';
import { faEarthAmericas, faBrain, faProjectDiagram } from '@fortawesome/free-solid-svg-icons';

const lucideIcons = {
  Code,
  Palette,
  Lightbulb,
  Search,
  Map,
  Terminal,
  Rocket,
};

const fontAwesomeIcons = {
  faEarthAmericas,
  faBrain,
  faProjectDiagram,
};

export function resolveLucideIcon(name) {
  return lucideIcons[name] || null;
}

export function resolveFaIcon(name) {
  return fontAwesomeIcons[name] || null;
}
