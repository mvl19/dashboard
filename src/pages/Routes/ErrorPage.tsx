import { Link } from "react-router-dom"
import { Result, Button } from "antd"

export const Error500 = () => {
    return (
        <Result 
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={<Button><Link to="/">Back Home</Link></Button>}
        />
    )
}

export const Error404 = () => {
    return (
            <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Link to="/"><Button type="default">Back Home</Button></Link>}
            />
    )
}
