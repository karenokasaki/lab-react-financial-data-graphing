import { useEffect, useState } from "react";
import axios from "axios";
import Chart from 'chart.js/auto'
import DateFilter from "./DateFilter";


function BitcomApi() {

    const [dataApi, setDataApi] = useState({
        'date': 'value'
    })

    const [link, setLink] = useState('http://api.coindesk.com/v1/bpi/historical/close.json')
    const [dia, setDia] = useState(null) //data dos valores do bitcoin {from: YYYY-MM-DD, to: YYYY-MM-DD}
    const [loading, setLoading] = useState(false)
    const [chart, setChart] = useState(null);


    //se o dia mudar, mudar também o link que está sendo enviado para a api
    useEffect(() => {
        if (dia !== null) {                                                        // 2020-01-01  2021-01-01
            setLink(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${dia.from}&end=${dia.to}`)
        }

    }, [dia])

    //se o link mudar, mudar os parametros que estão sendo enviadas pra api
    useEffect(() => {
        setLoading(true)
        axios.get(link)
            .then(function (response) {
                setDataApi(response.data.bpi)
                setLoading(false)
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    }, [link]);
    console.log(dataApi) // "data: bitconprice" "key: value"

    useEffect(() => {
        if (!loading) { // se loading for false (api já terminou de enviar as informações), renderizar o chart

            function renderChart() {
                const ctx = document.getElementById('instanceChart').getContext('2d');

                if (chart) {
                    chart.destroy();
                }

                const instanceChart = new Chart(
                    ctx, { //config
                    type: 'line',
                    data: {
                        labels: Object.keys(dataApi),
                        datasets: [{
                            label: "Preço Bitcoin",
                            data: Object.values(dataApi)
                        }]
                    },
                }
                )
                setChart(instanceChart)
            }
            renderChart()
        }
    }, [loading, dataApi])


    console.log(Object.values(dataApi))

    return (
        <div>
            <DateFilter setDia={setDia} />
            <div>{loading ? "Carregando..." : <canvas id="instanceChart" />}</div>

            <h1 id='oi'>Grafico</h1>

            <p></p>
        </div>
    );
}

export default BitcomApi;