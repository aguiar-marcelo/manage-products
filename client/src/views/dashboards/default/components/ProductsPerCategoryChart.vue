<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  chartData: { name: string; product_count: number }[];
}>();


const chartSeries = computed(() => {
  return [
    {
      name: 'Quantidade de Produtos',
      data: props.chartData.map((item) => item.product_count)
    }
  ];
});

const chartCategories = computed(() => {
  return props.chartData.map((item) => item.name);
});

const chartOptions1 = computed(() => {
  return {
    chart: {
      type: 'bar',
      height: 480,
      fontFamily: `inherit`,
      foreColor: '#a1aab2',
      stacked: true,
      toolbar: {
        show: true
      }
    },
    colors: ['#1e88e5'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%'
      }
    },
    xaxis: {
      categories: chartCategories.value
    },
    legend: {
      show: true,
      fontFamily: `'Roboto', sans-serif`,
      position: 'bottom',
      offsetX: 20,
      labels: {
        useSeriesColors: false
      },
      markers: {
        width: 16,
        height: 16,
        radius: 5
      },
      itemMargin: {
        horizontal: 15,
        vertical: 8
      }
    },
    fill: {
      type: 'solid'
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      show: true
    },
    tooltip: {
      theme: 'light'
    }
  };
});
</script>

<template>
  <v-card elevation="0">
    <v-card variant="outlined">
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="9">
            <span class="text-subtitle-4 text-disabled font-weight-bold">Produtos por Categoria</span>
          </v-col>
        </v-row>
        <div class="mt-4">
          <apexchart type="bar" height="480" :options="chartOptions1" :series="chartSeries"> </apexchart>
        </div>
      </v-card-text>
    </v-card>
  </v-card>
</template>
