import { useState } from "react";

function DateFilter({ setDia }) {

    const [inputDia, setInputDia] = useState({
        from: '',
        to: ''
    })

    const handleSearch = (event) => {
        setInputDia({ ...inputDia, [event.target.name]: event.target.value })
    }

    const handleSubmit = (event) => {
        setDia(inputDia)
    }

    return (
        <div>
            <h2>Pesquise a data para saber o valor do Bitcoin</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <label>From: </label>
                <input
                    onChange={handleSearch}
                    type='date'  // YYYY - MM - DD
                    id="from"
                    name='from'
                    required
                />
                <label>To: </label>
                <input
                    onChange={handleSearch}
                    type='date'
                    id='to'
                    name='to'
                    required
                />
                <button onClick={handleSubmit}>Search</button>
            </form>
        </div>
    );
}

export default DateFilter;