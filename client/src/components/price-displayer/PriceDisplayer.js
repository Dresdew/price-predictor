import { useSelector } from "react-redux";
import style from './price-displayer.module.css'

export default function PriceDisplayer() {
    const predictedPrice = useSelector(state => state.price.predictedPrice)

    return predictedPrice ?
        (<div className={style.price_displayer}>
            {`Predicted price : ${round(predictedPrice)} MFt`}
        </div>)
        : (null)
}

const round = (num) => Math.round(num * 10) / 10