import React, { useEffect } from 'react'

import { Link } from 'react-router-dom'

import Chart from 'react-apexcharts'

import { useSelector } from 'react-redux'

import StatusCard from '../components/status-card/StatusCard'

import Table from '../components/table/Table'

import Badge from '../components/badge/Badge'

import statusCards from '../assets/JsonData/status-card-data.json'

const chartOptions = {
    series: [{
        name: 'Public Cloud Fn',
        data: [10, 24, 38, 49, 57, 70, 78, 83, 88, 99]
    }, {
        name: 'Private Cloud Fn',
        data: [3, 5, 8, 13, 21, 34, 55, 66, 69, 71]
    }],
    options: {
        color: ['#6ab04c', '#2980b9'],
        chart: {
            background: 'transparent'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'May', 'Jul', 'Aug', 'Sep', 'Oct']
        },
        legend: {
            position: 'top'
        },
        grid: {
            show: false
        }
    }
}

const topCustomers = {
    head: [
        'user',
        'total functions',
        'total saved'
    ],
    body: [
        {
            "username": "Dilax",
            "function": "490",
            "saved": "$870"
        },
        {
            "username": "Baby",
            "function": "250",
            "saved": "$251"
        },
        {
            "username": "Diana",
            "function": "120",
            "saved": "$840"
        },
        {
            "username": "Prathees",
            "function": "110",
            "saved": "$251"
        },
        {
            "username": "Diana",
            "function": "80",
            "saved": "$140"
        }
    ]
}

const renderCusomerHead = (item, index) => (
    <th key={index}>{item}</th>
)

const renderCusomerBody = (item, index) => (
    <tr key={index}>
        <td>{item.username}</td>
        <td>{item.function}</td>
        <td>{item.saved}</td>
    </tr>
)

const latestOrders = {
    header: [
        "function id",
        "user",
        "total saved",
        "date",
        "status"
    ],
    body: [
        {
            id: "#OD1711",
            user: "Dilax",
            date: "17 May 2023",
            saved: "$96",
            status: "Hold"
        },
        {
            id: "#OD1712",
            user: "Pirathees K",
            date: "1 May 2023",
            saved: "$45",
            status: "Deployed"
        },
        {
            id: "#OD1713",
            user: "Prathees P",
            date: "27 May 2023",
            saved: "$27",
            status: "Pending"
        },
        {
            id: "#OD1712",
            user: "Pirathees K",
            date: "8 May 2023",
            saved: "$38",
            status: "Deployed"
        },
        {
            id: "#OD1713",
            user: "Prathees P",
            date: "23 May 2023",
            saved: "$74",
            status: "Deployed"
        }
    ]
}

const functionStatus = {
    "Hold": "primary",
    "Pending": "warning",
    "Deployed": "success",
}

const renderOrderHead = (item, index) => (
    <th key={index}>{item}</th>
)

const renderOrderBody = (item, index) => (
    <tr key={index}>
        <td>{item.id}</td>
        <td>{item.user}</td>
        <td>{item.saved}</td>
        <td>{item.date}</td>
        <td>
            <Badge type={functionStatus[item.status]} content={item.status} />
        </td>
    </tr>
)

const Dashboard = () => {

    const themeReducer = useSelector(state => state.ThemeReducer.mode)

    return (
        <div>
            <h2 className="page-header">Dashboard</h2>
            <div className="row">
                <div className="col-6">
                    <div className="row">
                        {
                            statusCards.map((item, index) => (
                                <div className="col-6" key={index}>
                                    <StatusCard
                                        icon={item.icon}
                                        count={item.count}
                                        title={item.title}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="col-6">
                    <div className="card full-height">
                        {/* chart */}
                        <Chart
                            options={themeReducer === 'theme-mode-dark' ? {
                                ...chartOptions.options,
                                theme: { mode: 'dark' }
                            } : {
                                ...chartOptions.options,
                                theme: { mode: 'light' }
                            }}
                            series={chartOptions.series}
                            type='line'
                            height='100%'
                        />
                    </div>
                </div>
                <div className="col-5">
                    <div className="card">
                        <div className="card__header">
                            <h3>top customers</h3>
                        </div>
                        <div className="card__body">
                            <Table
                                headData={topCustomers.head}
                                renderHead={(item, index) => renderCusomerHead(item, index)}
                                bodyData={topCustomers.body}
                                renderBody={(item, index) => renderCusomerBody(item, index)}
                            />
                        </div>
                        <div className="card__footer">
                            <Link to='/'>view all</Link>
                        </div>
                    </div>
                </div>
                <div className="col-7">
                    <div className="card">
                        <div className="card__header">
                            <h3>latest functions</h3>
                        </div>
                        <div className="card__body">
                            <Table
                                headData={latestOrders.header}
                                renderHead={(item, index) => renderOrderHead(item, index)}
                                bodyData={latestOrders.body}
                                renderBody={(item, index) => renderOrderBody(item, index)}
                            />
                        </div>
                        <div className="card__footer">
                            <Link to='/'>view all</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
