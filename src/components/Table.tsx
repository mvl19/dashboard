import { InputRef, Table, Space, Button, Input, ConfigProvider, theme } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import { ColumnsType } from "antd/es/table"
import { FilterConfirmProps } from "antd/es/table/interface"
import { useRef, useState } from "react"


interface TableProps {
    darkMode?:boolean,
    dataset: Record<string, string|number>,
}

interface DataType {
    key: string,
    name: string,
    number: number,
    position: string,
    exp: number,
}

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
    const [searchText, setSearchText] = useState<string>('')
    const [searchedColumn, setSearchedColumn] = useState<string>('')
    const searchInput = useRef<InputRef>(null)

    const handleSearch = (
        selectedKeys: string[], 
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataType
        ) => {
            confirm()
            setSearchText(selectedKeys[0])
            setSearchedColumn(dataIndex)
        }
    
    const handleReset = (clearFilters: () => void) => {
        clearFilters()
        setSearchText('')
    }

    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
          <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
            <Input
              ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
              style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Search
              </Button>
              <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{ width: 90 }}
              >
                Reset
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  confirm({ closeDropdown: false });
                  setSearchText((selectedKeys as string[])[0]);
                  setSearchedColumn(dataIndex);
                }}
              >
                Filter
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  close();
                }}
              >
                close
              </Button>
            </Space>
          </div>
        ),
        filterIcon: (filtered: boolean) => (
          <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            .toString()
            .toLowerCase()
            .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
          if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
          }
        },
      })

    interface Columns {
        title: string,
        dataIndex: string, 
        key: string,
        sorter: () => void,
        getColumnSearchProps: () => void,
    }

    const columns: ColumnsType<Columns> = []
    const keys = Object.keys(dataset[0]).filter(key => key !== 'key')
    keys.forEach(key => {
        if(typeof(dataset[0][key])==='number') {
            columns.push({
                title:key.slice(0,1).toUpperCase() + key.slice(1,key.length),
                dataIndex: key,
                key:key,
                sorter: (a, b) => a[key] - b[key],
                ...getColumnSearchProps(key),
            }) 
        }
        else {
            columns.push({
                title:key.slice(0,1).toUpperCase() + key.slice(1,key.length),
                dataIndex: key,
                key:key,
                sorter: (a,b) => a[key].length - b[key].length,
                ...getColumnSearchProps(key),
            })
        }
    })

    if(!darkMode)
    return (
        <ConfigProvider theme={{
            algorithm: theme.darkAlgorithm,
          }}>
            <Table columns={columns} dataSource={data}  />
        </ConfigProvider>
    )
}