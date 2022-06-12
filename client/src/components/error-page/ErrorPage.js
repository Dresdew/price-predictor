import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import styles from './error-page.module.css'

export default function ErrorPage({ errorMessage }) {
    return <div className={styles.error_page}>
        <Alert severity="error">
            <AlertTitle>Error: {errorMessage}</AlertTitle>
            An error has occurred, sorry for the inconvenience. Please try again!
        </Alert>
    </div>
}