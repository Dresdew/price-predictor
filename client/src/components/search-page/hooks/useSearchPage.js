import React from "react";
import { setError } from "slices/errorSlice";

import { useDispatch, useSelector } from "react-redux";
import { setPrice } from "slices/priceSlice";
import { callFetch } from "app/utils";

export default function useSearchPage() {
    const dispatch = useDispatch()
    const [featureFilter, setFeatureFilter] = React.useState({})
    const [errorMessage, setErrorMessage] = React.useState(null)
    const features = useSelector(state => state.features.features).filter(f => !f.target)

    const onFetchFailed = (message) => {
        dispatch(setError({ error: message }));
    }
    const onFetchSuccess = (data) => dispatch(setPrice(data));

    async function callPricePredict(featureFilter) {
        await callFetch('/api/predict-price', onFetchSuccess, onFetchFailed, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(featureFilter)
        })
    }
    return { features, featureFilter, setFeatureFilter, errorMessage, setErrorMessage, callPricePredict }
}