import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "slices/errorSlice";
import { setFeatures } from "slices/featuresSlice";
import { callFetch } from "app/utils";


export default function useApp() {
    const dispatch = useDispatch();
    const errorMessage = useSelector(state => state.error.message)
    const dataFetched = useSelector(state => state.features.dataFetched)

    useEffect(() => {
        const onFetchFailed = (message) => {
            dispatch(setError({ error: message }));
        }
        const onFetchSuccess = (data) => dispatch(setFeatures({ features: data }))
        const getFeatures = async () => {
            await callFetch('/static/features.json', onFetchSuccess, onFetchFailed)
        };
        getFeatures();
    }, [dispatch]);
    return { dataFetched, errorMessage }
}