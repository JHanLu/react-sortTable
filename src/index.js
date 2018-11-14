import React, {Component} from 'react';
import classNames from 'classnames';
import IconSort from './svg/icon-sort.svg';
import IconAsc from './svg/icon-sort-asc.svg';
import IconDesc from './svg/icon-sort-desc.svg';
import './styles.css';

export default class SortableTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            asc: false,
            sortBy: ''
        }
        this.changeSequence = this.changeSequence.bind(this);
    }

    changeSequence(col) {
        const { asc, sortedBy } = this.state;

        if (sortedBy !== col) {
            this.setState({
                sortedBy: col,
                asc: false
            })
        } else if (!asc) {
            this.setState({asc: !asc});
        } else {
            this.setState({
                asc: false,
                sortedBy: ''
            })
        }
    }

    render() {
        const {sortedBy, asc} = this.state;
        const {columns, dataList} = this.props;

        let sortedList = dataList.concat();
        if (sortedBy) {
            sortedList = sortedList.sort(columns.find(column => column.key === sortedBy).sorter);
            sortedList = asc ? sortedList : sortedList.reverse();
        }

        return (
            <table className="sortable-table">
                <thead>
                <tr>
                    {
                        columns.map(column => (
                            <th
                                key={column.key}
                                onClick={() => {
                                    if (column.sorter) {
                                        this.changeSequence(column.key)
                                    }
                                }}
                                className={classNames(column.key, column.sorter && 'sortable')}
                            >
                                {column.title}
                                {
                                    column.sorter && (
                                        sortedBy === column.key ?
                                            asc ? <IconAsc className="sort-icon" /> : <IconDesc className="sort-icon" />
                                            : <IconSort className="sort-icon" />
                                    )
                                }
                            </th>
                        ))
                    }
                </tr>
                </thead>
                <tbody>
                {
                    sortedList.map((data, index) => (
                        <tr key={data.key || index}>
                            {
                                columns.map(column => {
                                    if (!column.indexFunction) {
                                        return <td key={column.key}>{data[column.key]}</td>
                                    }

                                    return (
                                        <td key={column.key}>
                                            {
                                                column.indexFunction(data)
                                            }
                                        </td>
                                    )
                                })
                            }
                        </tr>
                    ))
                }
                </tbody>
            </table>
        )
    }
};