import { Table } from "antd"
import { ColumnsType } from "antd/es/table"

interface TableProps {
    darkMode?:boolean,
    dataset: DataType[],
}

interface DataType {
    key: string,
    name: string,
    number: number,
    position: string,
    exp: number,
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
        filterSearch: true,
        sorter: (a,b) => a.name.length - b.name.length,
        filters: [
            {text: 'kobe',
        value:'kobe'}
        ],
        onFilter: (value: string, record) => record.name.startsWith(value),
        width: '30%',
    },
    {
        title: 'Number',
        dataIndex: 'number',
        sorter: (a,b) => a.number - b.number
    },
    {
        title: 'Position',
        dataIndex: 'position'
    }
] 

const data: DataType[] = [
    {
        key: '1',
        name: 'Kobe Bryant',
        number: 8,
        position: 'SG',
        exp: 4,
    },
    {
        key: '2',
        name: 'Derek Fisher',
        number: 2,
        position: 'PG',
        exp: 4,
    },
    {
        key: '3',
        name: 'Greg Foster',
        number: 40,
        position: 'C',
        exp: 10,
    },
    {
        key: '4',
        name: 'Rick Fox',
        number: 17,
        position: 'SF',
        exp: 9
    }
]

export default function DisplayTable({
    dataset=data,
    darkMode=false,
    }: TableProps) {
    // const columns: ColumnsType = []
    // const keys = Object.keys(dataset[0]).filter(key => key !== 'key')
    // keys.forEach(k => columns.push({
    //     title: k.toUpperCase(), 
    //     dataIndex: k, 
    //     key: k,
    //     }))
    if(!darkMode)
    return (
        <Table columns={columns} dataSource={dataset} />
    )
}