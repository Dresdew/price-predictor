import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "slices/errorSlice";
import { setFeatures } from "slices/featuresSlice";

export default function useApp() {
    const dispatch = useDispatch();
    const errorMessage = useSelector(state => state.error.message)
    const dataFetched = useSelector(state => state.features.dataFetched)

    useEffect(() => {
        const onFetchFailed = (message) => {
            dispatch(setError({ error: message }));
        }
        const getFeatures = async () => {
            try {
                const response = await fetch('/static/features.json');
                if (response.ok) {
                    const data = await response.json();
                    console.log(data)
                    dispatch(setFeatures({ features: data }))
                } else {
                    const message = response.status;
                    throw new Error(message);
                }
            }
            catch (err) {
                if (err instanceof SyntaxError) {
                    onFetchFailed('Bad response from server.');
                } else {
                    onFetchFailed(err.message);
                }
            }
        };
        getFeatures();
    }, [dispatch]);
    return { dataFetched, errorMessage }
}