import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setError } from "store/slices/errorSlice";
import { setPrice } from "store/slices/priceSlice";
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

    const handleSearch = () => {
        const filter = createRequest(features, featureFilter)
        if (!filter) {
            setFeatureFilter({})
            setErrorMessage('Please use correct values')
        }
        else {
            setErrorMessage(null)
            callPricePredict(featureFilter);
        }
    }

    const createRequest = (features, filter) => {
        const featureFilter = { ...filter }
        for (const { key, type, min, max } of features) {
            if (!featureFilter[key]) {
                return null
            }
            if (type !== 'numeric') {
                continue
            }
            const intValue = parseInt(featureFilter[key])
            if (isNaN(intValue)) {
                return null
            }
            if ((intValue < min) || (intValue > max)) {
                return null
            }
            featureFilter[key] = intValue
        }
        return featureFilter
    }

    return {
        features,
        featureFilter,
        setFeatureFilter,
        errorMessage,
        handleSearch
    }
}