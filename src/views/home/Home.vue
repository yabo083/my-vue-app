<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img src="../../assets/images/user.png" alt="用户" />
          <div class="user-info">
            <p class="name">Admin</p>
            <p class="role">1级权限</p>
          </div>
        </div>
        <div class="login-info">
          <p>
            <span class="label">上次登录时间:</span>
            <span class="info">2021-01-01 12:00:00</span>
          </p>
          <p>
            <span class="label">上次登录IP:</span>
            <span class="info">北京市海淀区</span>
          </p>
        </div>
      </el-card>

      <el-card shadow="hover" style="margin-top: 20px" height="450px">
        <el-table :data="tableData">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          ></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top: 20px">
      <div class="condition">
        <el-card
          :body-style="{ display: 'flex', padding: 0 }"
          v-for="item in countData"
          :key="item.name"
        >
          <component class="icons" :is="item.icon" :style="{ background: item.color }"></component>
          <div class="details">
            <p class="text">{{ item.name }}</p>
            <p class="price">¥{{ item.value }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="heigt: 280px">
        <div ref="echart" style="height: 280px"></div>
      </el-card>
      <div class="graph">
        <el-card style="height: 260px;">
          <div ref="pie" style="height: 240px"></div>
        </el-card>
        <el-card style="height: 260px;">
          <div ref="bar" style="height: 240px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { defineComponent, onMounted, ref, getCurrentInstance, reactive } from "vue";
import * as echarts from "echarts";

export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance();

    const tableData = [
      {
        name: "oppo",
        todayBuy: 500,
        monthBuy: 3500,
        totalBuy: 22000,
      },
      {
        name: "vivo",
        todayBuy: 300,
        monthBuy: 2200,
        totalBuy: 24000,
      },
      {
        name: "苹果",
        todayBuy: 800,
        monthBuy: 4500,
        totalBuy: 65000,
      },
      {
        name: "小米",
        todayBuy: 1200,
        monthBuy: 6500,
        totalBuy: 45000,
      },
      {
        name: "三星",
        todayBuy: 300,
        monthBuy: 2000,
        totalBuy: 34000,
      },
      {
        name: "魅族",
        todayBuy: 350,
        monthBuy: 3000,
        totalBuy: 22000,
      },
    ];
    const tableLabel = {
      name: "手机品牌",
      todayBuy: "今日销量",
      monthBuy: "本月销量",
      totalBuy: "总销量",
    };

    // 销售统计数据
    let countData = ref([]);
    // 获取销售统计数据
    const getCountData = async () => {
      let res = await proxy.$api.getCountData();
      // console.log(res);
      countData.value = res;
    };

    // 通用的echarts图表配置
    let XOptions = reactive({
      // 图例文字颜色
      textStyle: {
        color: "#333",
      },
      grid: {
        left: "20%",
      },
      // 提示框
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category", // 类目轴
        data: [],
        axisLine: {
          lineStyle: {
            color: "#17b3a3",
          },
        },
        axisLabel: {
          interval: 0,
          color: "#333",
        },
      },
      yAxis: [
        {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
        },
      ],
      color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
      series: [],
    });
    // 饼图配置
    let pieOptions = reactive({
      tooltip: {
        trigger: "item",
      },
      color: ["#0f78f4", "#dd536b", "#9462e5", "#a6a6a6", "#e1bb22", "#39c362", "#3ed1cf"],
      series: [],
    });

    // 图表数据
    let orderData = reactive({
      xData: [],
      series: [],
    });
    let userData = reactive({
      xData: [],
      series: [],
    });
    let videoData = reactive({
      series: [],
    });

    const getChartData = async () => {
      let res = await proxy.$api.getOrderData();
      // console.log(res);
      let res1 = res.orderData;
      let res2 = res.userData;
      let res3 = res.videoData;

      // 折线图渲染
      orderData.xData = res1.date;
      const keyArray = Object.keys(res1.data[0]);
      keyArray.forEach(key => {
        orderData.series.push({
          name: key,
          type: "line",
          data: res1.data.map(item => item[key]),
        });
        // console.log(res1.data.map(item => item[key]));
      });
      // console.log(orderData.series);

      XOptions.xAxis.data = orderData.xData;
      XOptions.series = orderData.series;
      let ECharts1 = echarts.init(proxy.$refs["echart"]);
      ECharts1.setOption(XOptions);

      // 柱状图渲染
      userData.xData = res2.map((item) => item.date);
      userData.series = [
        {
          name: "用户数",
          type: "bar",
          data: res2.map((item) => item.new),
        },
        {
          name: "活跃用户",
          type: "bar",
          data: res2.map((item) => item.active),
        },
      ];

      XOptions.xAxis.data = userData.xData;
      XOptions.series = userData.series;
      let ECharts2 = echarts.init(proxy.$refs["bar"]);
      ECharts2.setOption(XOptions);

      // 饼图渲染
      videoData.series = [
        {
          data: res3,
          type: "pie",
        }
      ]
      // console.log(videoData.series);
      pieOptions.series = videoData.series;
      let ECharts3 = echarts.init(proxy.$refs["pie"]);
      ECharts3.setOption(pieOptions);

      
    };

    onMounted(() => {
      getCountData();
      getChartData();
    });

    return {
      tableData,
      tableLabel,
      countData,
      XOptions,
      pieOptions,
      orderData,
      userData,
      videoData,
    };
  },
});
</script>

<style lang="less" scoped>
.home {
  
  .user {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;

    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-right: 40px;
    }

    .user-info {
      .name {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 10px;
      }

      .role {
        font-size: 16px;
        color: #999;
      }
    }
  }

  .login-info {
    p {
      font-size: 16px;
      margin-bottom: 10px;
      line-height: 30px;
      color: #999;
      display: flex;
      justify-content: space-between;

      .info {
        min-width: 100px;
      }
    }
  }

  .condition {
    display: flex; //水平排列
    flex-wrap: wrap; //换行
    justify-content: space-between; //两端对齐

    .el-card {
      width: 32%;
      margin-bottom: 20px;
    }
    .icons {
      width: 80px; //设置宽高
      height: 80px; //设置宽高
      font-size: 30px; //设置字体大小
      text-align: center; //设置文字居中
      line-height: 80px; //设置行高
      color: #fff; //设置字体颜色
    }
    .details {
      margin-left: 20px; //设置左边距
      display: flex; //水平排列
      flex-direction: column; //垂直排列
      justify-content: center; //两端对齐
      .text {
        font-size: 14px; //设置字体大小
        text-align: center; //设置文字居中
        color: #999; //设置字体颜色
      }
      .price {
        font-size: 30px; //设置字体大小
        margin-bottom: 10px; //设置下边距
      }
    }
  }

  .graph {
    display: flex; //水平排列
    justify-content: space-between; //两端对齐
    margin-top: 20px; //设置上边距
    .el-card {
      width: 48%;
    }
  }
}
</style>
