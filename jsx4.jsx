// Charts.jsx
import { Bar } from 'react-chartjs-2';

export default () => {
    const { transactions } = useContext(AppContext);

    const data = {
        labels: transactions.map(t => t.date),
        datasets: [{
            label: 'Расходы по дням',
            data: transactions.map(t => t.amount),
            backgroundColor: 'rgba(75,192,192,0.6)'
        }]
    };

    return <Bar data={data} />;
};
