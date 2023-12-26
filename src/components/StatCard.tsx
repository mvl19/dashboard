import { Row, Card, Statistic, Col, ConfigProvider, theme } from "antd"
import { RiseOutlined } from "@ant-design/icons"

interface StatCardProps {
    title: string,
    value: string | number,
    precision?: number,
    style: React.CSSProperties | string,
    suffix?: string | React.ReactElement,
    prefix?: React.ReactElement | string
}

export default function StatCard({
    title='Salary',
    value='17.00',
    style='#3f8600',
    precision=2,
    prefix=<RiseOutlined />,
    suffix='%',
    }: StatCardProps) {
    return (
            <Row gutter={16}>
                <Col span={12}>
                    <Card>
                        <Statistic 
                        title={title}
                        value={value}
                        precision={precision}
                        valueStyle={{color: style}}
                        prefix={prefix}
                        suffix={suffix}
                        />
                    </Card>
                </Col>
            </Row>
    )
}