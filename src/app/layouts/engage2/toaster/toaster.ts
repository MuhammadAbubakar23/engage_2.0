import { ToasterType } from './toaster.type';

export interface Toaster {
  type: ToasterType;
  title?: string;
  body?: string;
  delay?: number;
}