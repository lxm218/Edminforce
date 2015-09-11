
Cal.Home = React.createClass({
    render() {
        return <RC.List>
            <RC.Item theme="text-wrap">
                <p>Test home page</p>
            </RC.Item>
            <RC.Item theme="divider">Auth模块</RC.Item>

            <RC.Item theme="divider">用户信息编辑模块</RC.Item>

            <RC.Item theme="divider">课程编辑模块</RC.Item>

            <RC.Item  href="/classedit/yourswimmers"  key={0}>
                Account swimmers test
            </RC.Item>

            <RC.Item theme="divider">课程注册模块</RC.Item>
        </RC.List>

    }
})
