import React from "react";
import { setError } from "slices/errorSlice";

import { useDispatch, useSelector } from "react-redux";
import { setPrice } from "slices/priceSlice";

export default function useSearchPage() {
    const dispatch = useDispatch()
    const [featureFilter, setFeatureFilter] = React.useState({})
    const [errorMessage, setErrorMessage] = React.useState(null)
    const features = useSelector(state => state.features.features).filter(f => !f.target)

    const onFetchFailed = (message) => {
        dispatch(setError({ error: message }));
    }
    async function callPricePredict(featureFilter) {
        console.log(featureFilter)
        try {
            const response = await fetch('/api/predict-price', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(featureFilter)
            });
            if (response.ok) {
                const data = await response.json();
                dispatch(setPrice(data));
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
    }
    return { features, featureFilter, setFeatureFilter, errorMessage, setErrorMessage, callPricePredict }
}