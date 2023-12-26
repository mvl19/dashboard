import { Badge, Calendar } from "antd"
import type { Dayjs } from "dayjs"

interface Data {
    id: number,
    date: string,
    content: string,
    horario: string[],
}

interface CalendarChartProps {
    lightMode?: boolean,
    dataset: Data [],
}

const data = [
    {
        id: 1,
        content: "Example",
        date: "01/12/2023",
        horario: [
            "2023-12-01T06:00:00.925Z",
            "2023-12-01T07:00:00.478Z"
        ],

    },
    {
        id: 2,
        content: "Example",
        date: "08/12/2023",
        horario: [
            "2023-12-T11:00:00.859Z",
            "2023-12-26T14:00:00.976Z"
        ],
    }
]

export default function CalendarChart({
    dataset={data}
    }: CalendarChartProps): React.ReactNode {
        const data = [
            {
                "id": 1,
                "content": "Example",
                "date": "01/05/2022",
                "horario": [
                    "2022-05-26T06:00:00.925Z",
                    "2022-05-26T07:00:00.478Z"
                ],
            },
            {
                "id": 2,
                "content": "Example",
                "date": "08/05/2022",
                "horario": [
                    "2022-05-26T11:00:00.859Z",
                    "2022-05-26T14:00:00.976Z"
                ],
            }
        ];
          const dateCellRender = (value: Dayjs) => {
            const stringValue = value.format("DD/MM/yyyy");
            const listData = data.filter(({date})=> date === stringValue)
            return (
              <ul className="events">
                {listData.map((item) => (
                  <li key={item.content}>
                    <Badge status={"success"} text={item.content} />
                  </li>
                ))}
              </ul>
            );
          };
        
          return <Calendar dateCellRender={dateCellRender} />;
}