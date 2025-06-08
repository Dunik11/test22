// TransactionList.jsx
import { useTable, useSortBy, useGlobalFilter } from 'react-table';

export default () => {
    const { transactions } = useContext(AppContext);
    const columns = useMemo(() => [
        { Header: 'Дата', accessor: 'date' },
        { Header: 'Название', accessor: 'title' },
        { Header: 'Сумма', accessor: 'amount' }
    ], []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        setGlobalFilter
    } = useTable({ columns, data: transactions }, useGlobalFilter, useSortBy);

    return (
        <>
            <input onChange={e => setGlobalFilter(e.target.value)} placeholder="Поиск..." />
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    {column.isSorted ? (column.isSortedDesc ? ' ▼' : ' ▲') : ''}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};
