import { Component, OnInit } from '@angular/core';
import { pipeline } from '../../Models/jobs-count.model';
import { Chart, ChartOptions } from 'chart.js';
import { ChartsService } from '../../Services/charts.service';
import { DashboardService } from '../../Services/dashboard.service';

@Component({
  selector: 'app-view-pipeline-chart',
  templateUrl: './view-pipeline-chart.component.html',
  styleUrls: ['./view-pipeline-chart.component.scss']
})
export class ViewPipelineChartComponent implements OnInit {
  pipelineEngagemet: any;
  todaychart: pipeline = new pipeline();
  sevenChart: pipeline = new pipeline();
  thirtyChart: pipeline = new pipeline();
  data: any;
  name: any;
  id: any;
  constructor(private api: ChartsService,private api1: DashboardService) {
    this.data = localStorage.getItem("accountId");

  }

  ngOnInit(): void {
    this.getPipelineEngagement();
  }

  getPipelineEngagement() {
    this.api.PipelineEngagement(this.data).subscribe((data: any) => {
      this.pipelineEngagemet = data;


      console.log('hiii.....................', this.pipelineEngagemet);
      this.todayChart(this.pipelineEngagemet);
      this.last7daysChart(this.pipelineEngagemet);
      this.last30daysChart(this.pipelineEngagemet);
    });
  }


  todayChart(chart: any) {


    if (chart.candidatesSourcedToday==0&&
      chart.candidatesAppliedToday==0&& 
      chart.candidatesShortListedTodayy==0&&
      chart.candidatesOfferedTodayy==0) {
      const myChart = new Chart("today", {
        type: 'doughnut',
        ...this.emptyChartFiled()

      })
    }
    else {

      const myChart = new Chart("today", {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [
              chart.candidatesSourcedToday,
              chart.candidatesAppliedToday
              ,
              chart.candidatesShortListedToday,
              chart.candidatesOfferedToday
            ],
            // data:[23,34,56,45]
            backgroundColor: [
              'rgba(254, 163, 0, 0.82)',
              'rgba(109, 191, 199, 0.82)',
              'rgba(255, 35, 46, 0.8)',
              'rgba(219, 219, 247, 0.71)',
            ]
          }],

          labels: [
          ]
        },

        options: {
          aspectRatio: 1,

          plugins: {
            datalabels: {
              display: true,
              backgroundColor: '#ccc',
              borderRadius: 3,
              font: {
                weight: 'bold',
              },
              formatter: (value) => {
                return value.toFixed(2) + '%';
              },
            },
          },
        },
      })
    }

  }

  emptyChartFiled() {
    return {
      data: {
        datasets: [
          {
            data: [
              100
            ],
            // data:[23,34,56,45]
            backgroundColor: [
              '#ddad'
            ],
            fill: true,
            hoverOffset: 0,
          },


        ],

        labels: [
        ],

      },
      options: {
        // responsive: true,
        plugins: {
          tooltip: {
            enabled: false // <-- this option disables tooltips
          }
        }
      },
    }
  }

  last7daysChart(chart: any) {
 
  
    if ( chart.candidatesSourcedLast7Days==0&&
      chart.candidatesAppliedLast7Days==0&&
      chart.candidatesShortListedLast7Days==0&&
      chart.candidatesOfferedLast7Days==0 ) {
      const myChart = new Chart("7daysChart", {
        type: 'doughnut',
        ...this.emptyChartFiled()

      })
    }
    else {
      const myChart = new Chart("7daysChart", {
        type: 'doughnut',
        data: {
          datasets: [
            {
              data: [
                chart.candidatesSourcedLast7Days,
                chart.candidatesAppliedLast7Days,
                chart.candidatesShortListedLast7Days,
                chart.candidatesOfferedLast7Days
              ],
              // data:[23,34,56,45]
              backgroundColor: [
                'rgba(254, 163, 0, 0.82)',
                'rgba(109, 191, 199, 0.82)',
                'rgba(255, 35, 46, 0.8)',
                'rgba(219, 219, 247, 0.71)',
              ]
            }

          ],

          labels: [
          ],

        },

      })
    }

  }

  last30daysChart(chart: any) {
    
    if (chart.candidatesSourcedLast30Days==0&&
      chart.candidatesAppliedLast30Days==0&&
      chart.candidatesShortListedLast30Days==0&&
      chart.candidatesOfferedLast30Days==0 ) {
      const myChart = new Chart("30daysChart", {
        type: 'doughnut',
        ...this.emptyChartFiled()

      })
    }
    else {
      const myChart = new Chart("30daysChart", {
        type: 'doughnut',
        data: {
          datasets: [
            {
              data: [
                chart.candidatesSourcedLast30Days,
                chart.candidatesAppliedLast30Days,
                chart.candidatesShortListedLast30Days,
                chart.candidatesOfferedLast30Days
              ],
              // data:[23,34,56,45]
              backgroundColor: [
                'rgba(254, 163, 0, 0.82)',
                'rgba(109, 191, 199, 0.82)',
                'rgba(255, 35, 46, 0.8)',
                'rgba(219, 219, 247, 0.71)',
              ]
            }

          ],

          labels: [
          ],

        },

      })
    }
  }

}
