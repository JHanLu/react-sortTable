import React from 'react';
import { render} from 'react-dom';
import SortableTable from '../../src';

const columns = [
    {
        key: 'name',
        title: '交易对',
        sorter: (a, b) => a.name.length - b.name.length
    },
    {
        key: 'lastPrice',
        title: '最新价',
        indexFunction: (data) => (
            data.price + 1
        ),
        sorter: (a, b) => a.price - b.price
    },
    {
        key: 'operation',
        title: '操作',
    },
];

const list = [
    {
        name: 'btc',
        price: '1212.42',
        operation: '交易',
    },
    {
        name: 'okb',
        price: '1342.1',
        operation: '交易'
    },
    {
        name: 'eth',
        price: '1212.42',
        operation: '交易'
    },
]

const App = () => (
    <SortableTable columns={columns} dataList={list} />
);

render(<App />, document.getElementById("root"));