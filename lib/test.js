import * as echarts from 'echarts'
const test1 = {
    dd(params) {
        console.log('这是lib中的test的打印', params);
    },
    WidthAdaptive(windthafter, width) {
        var windth = window.screen.width;
        let fontSize = windth / width;
        return fontSize * windthafter;
    },

    /**
     *
     *
     * @param {*} divid //嵌入的div
     * @param {*} Arraydata //数据
     * @param {*} width //屏幕宽度
     */
    chart1(divid, Arraydata, width) {
        let myChart = echarts.init(document.getElementById(divid));
        const dataArray = Arraydata

        // 计算总数
        let total = dataArray.reduce((p, v) => {
            return p + v.value
        }, 0)
        const color = ['#0066F5', '#CFDA00', '#F9A728']


        let color1 = [];
        // 设置每层圆环颜色和添加间隔的透明色
        color.forEach((item) => {
            color1.push(item, 'transparent');
        });
        let data1 = [];
        let sum = 0;
        // 根据总值设置间隔值大小
        dataArray.forEach((item) => {
            sum += Number(item.value);
        });
        // 给每个数据后添加特定的透明的数据形成间隔
        dataArray.forEach((item, index) => {
            if (item.value !== 0) {
                data1.push(item, {
                    name: '',
                    value: sum / 90,
                    labelLine: {
                        show: false,
                        lineStyle: {
                            color: 'transparent',
                        },
                    },
                    itemStyle: {
                        color: 'transparent',
                    },
                });
            }
        });

        const title = {
            text: '{val|' + total + '}\n{name|总用电量}',
            top: 'center',
            left: 'center',
            textStyle: {
                rich: {
                    name: {
                        fontSize: this.WidthAdaptive(10, width),
                        color: '#FFA800',
                        padding: [this.WidthAdaptive(-10, width), 0, 0, 0]
                    },
                    val: {
                        fontSize: this.WidthAdaptive(23, width),
                        color: '#ffffff',
                        padding: [this.WidthAdaptive(10, width), 0, 0, 0]
                    }
                }
            }
        }

        const graphic = {
                elements: [{
                    type: "image",
                    style: {
                        image: require("../img/leftonebg.png"),
                        width: this.WidthAdaptive(125, width),
                        height: this.WidthAdaptive(125, width),
                    },
                    left: 'center',
                    top: 'center',
                    silent: true,
                }],
            }
            // series
        const series = [{
                name: '用电分类',
                type: 'pie',
                radius: ['52%', '70%'],
                center: ['50%', '50%'],
                hoverAnimation: false,
                itemStyle: {
                    normal: {
                        color: (params) => {
                            return color1[params.dataIndex];
                        },
                    },
                },
                label: {
                    show: true,
                    fontSize: this.WidthAdaptive(16, width),
                    formatter: '{d}%'
                },
                labelLine: {
                    normal: {
                        length: this.WidthAdaptive(10, width),
                        length2: this.WidthAdaptive(10, width),
                        lineStyle: {
                            color: '#ffffff',
                            opacity: 0.3
                        }
                    }
                },
                data: data1,

            },
            {
                name: '用电分类',
                type: 'pie',
                radius: ['75%', '76%'],
                center: ['50%', '50%'],
                hoverAnimation: false,
                itemStyle: {
                    normal: {
                        color: (params) => {
                            return color1[params.dataIndex];
                        },
                    },
                },
                label: {
                    show: false,
                },
                data: data1,

            }
        ]

        // 渲染
        var option = {
            title,
            graphic,
            series,
            color
        }
        myChart.setOption(option);

        window.onresize = myChart.resize;
    },
}
export default test1