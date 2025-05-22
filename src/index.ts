import './styles/global.css';
import './pages/authPage';
import './pages/homePage';
import './components/auth/login';
import './components/auth/register';
import './components/layout/sidebar';
import './components/layout/topbar';
import './components/tasks/taskBoard';
import './components/tasks/taskColumn';
import './components/tasks/taskCard';
import './components/tasks/taskForm';
import { router } from './router';


window.addEventListener('load', () => {
  router(window.location.pathname);
});

window.addEventListener('popstate', () => {
  router(window.location.pathname);
});
