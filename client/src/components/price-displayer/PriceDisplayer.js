import { useSelector } from "react-redux";

export default function PriceDisplayer() {
    const predictedPrice = useSelector(state => state.price.predictedPrice)

    return predictedPrice ? (<div style={{ color: '#2c387e', display: 'flex', margin: '20px', fontSize: '18px' }}>
        {`Predicted price : ${round(predictedPrice)} MFt`}
    </div>) : (null)
}

const round = (num) =>Math.round(num * 10) / 10