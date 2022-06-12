import CircularProgress from '@mui/material/CircularProgress';
import ErrorPage from '../components/error-page'
import useApp from './hooks/useApp';
import style from './app.module.css'

function App() {
  const { dataFetched, errorMessage } = useApp();
  if (errorMessage) return <ErrorPage errorMessage={errorMessage} />
  if (!dataFetched) return <LoadingPage />
  return (
    <div>
    </div>
  );
}

function LoadingPage() {

  return <div className={style.loading_screen}>
    <CircularProgress />
  </div>
}

export default App;
