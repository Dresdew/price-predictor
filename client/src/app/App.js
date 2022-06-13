import CircularProgress from '@mui/material/CircularProgress';
import ErrorPage from '../components/error-page'
import useApp from './hooks/useApp';
import style from './app.module.css'
import SearchPage from 'components/search-page/SearchPage';

function App() {
  const { dataFetched, errorMessage } = useApp();
  if (errorMessage) return <ErrorPage errorMessage={errorMessage} />
  if (!dataFetched) return <LoadingPage />
  return (
    <div
      className={style.app}
    >
      <SearchPage />
    </div>
  );
}

function LoadingPage() {

  return <div
    className={style.loading_screen}>
    <CircularProgress />
  </div>
}

export default App;
