import Inspector from './Inspector';
import { elemForm } from './utils';

const inspector = new Inspector();

elemForm.addEventListener('submit', (e) => {
  e.preventDefault();
  inspector.getName();
});
