import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import PriceDisplayer from 'components/price-displayer';

import useSearchPage from "./hooks/useSearchPage";
import style from './search-page.module.css'


export default function SearchPage() {
    const {
        features,
        featureFilter,
        setFeatureFilter,
        errorMessage,
        handleSearch } = useSearchPage()

    return <Box sx={{ boxShadow: 3 }} className={style.serach_page}>
        {errorMessage && <label style={{ color: 'red' }}>{errorMessage}</label>}
        {features.map(feature => {
            if (feature.type === 'enum') {
                return <FeatureSelect
                    key={feature.key}
                    feature={feature}
                    featureFilter={featureFilter}
                    setFeatureFilter={setFeatureFilter}
                />
            }
            else {
                return <NumberInput
                    feature={feature}
                    featureFilter={featureFilter}
                    setFeatureFilter={setFeatureFilter}
                    key={feature.key}

                />
            }
        })}
        <Button onClick={handleSearch} style={{ color: 'white', backgroundColor: '#2c387e' }}>
            Search
        </Button>
        <PriceDisplayer />

    </Box>
}



const FeatureSelect = ({ feature, featureFilter, setFeatureFilter }) =>
    <div
        className={style.container}>
        <FormControl
            className={style.basic_search}
            variant="filled"
            sx={{ m: 1, minWidth: 500 }}
        >
            <InputLabel
                id="demo-simple-select-filled-label">
                {feature.displayingName}
            </InputLabel>
            <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={featureFilter[feature.key]}
                onChange={event => setFeatureFilter({ ...featureFilter, [feature.key]: event.target.value })}
            >
                {feature.values.map(v =>
                    <MenuItem key={v} value={v}>{v}</MenuItem>
                )}
            </Select>
        </FormControl>
    </div>

const NumberInput = ({ feature, featureFilter, setFeatureFilter }) =>
    <div
        className={style.container}>
        <TextField
            className={style.basic_search}
            size={'small'}
            value={featureFilter[feature.key] || ''}
            onChange={(ev) => {
                const value = ev.target.value;
                setFeatureFilter({ ...featureFilter, [feature.key]: value })
            }
            }
            label={feature.displayingName}
            onKeyPress={(ev) => {
                if (ev.key === 'Enter') {
                    ev.preventDefault()
                }
            }}
        />
    </div>

