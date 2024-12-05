import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DashboardService } from '../../Services/dashboard.service';
import { Chart, ChartOptions } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { dashboard, pipeline } from '../../Models/jobs-count.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Initialization for ES Users
// import { Carousel, initTE } from "../view-dahsboard/view-dahsboard.component.spec";

// initTE({ Carousel });

@Component({
  selector: 'app-view-dahsboard',
  templateUrl: './view-dahsboard.component.html',
  styleUrls: ['./view-dahsboard.component.scss'],
})
export class ViewDahsboardComponent implements OnInit {
  @ViewChild('chartContainer') chartContainer!: ElementRef;
  drop: boolean = false;
  position: dashboard = new dashboard();
  candidatesCount: pipeline = new pipeline();
  data: any;
  reqManager: any;
  name: any;
  Carousel: any;
  initTE: any;
  id: any;
  token: string = '';
  message: any = null;
  sended: boolean = false;
  recruiter: any = '';
  monthlySummary: any;
  sourceMix: any = {
    selected: 0,
    searchSourcedSelected: 0,
    appliedSelected: 0,
    overviewSelected: 0
  };

  overviewSelected: any;
  overviewCandidate: any;
  searchCandidates: any;
  appliedCandidates: any;
  totalselected: number = 0;
  accountDetails: any;
  todaychart: pipeline = new pipeline();
  sevenChart: pipeline = new pipeline();
  thirtyChart: pipeline = new pipeline();
  Token = {
    recruitermanagerId: '',
    fullName: 'string',
  };

  Tokens = {
    recruiterId: '',
    fullName: 'string',
  };

  constructor(private dashboardService: DashboardService, private http: HttpClient) {
    this.data = localStorage.getItem('accountId');
    console.log("accountId",this.data)
  }

  ngOnInit(): void {
    this.getTotalPosition();
    this.getCandidatesCount();
    setTimeout(() => {
      this.monthlySummaryGraph(this.data);
      this.sourceMixGraph(this.data);
    }, 1000);
    this.requestPermission();
    this.listen();
    this.sendPushNotification('device-token', 'Hello World!').subscribe(response => {
      console.log(response);
    });

  }

  chart: Chart | undefined;

  @HostListener('window:resize')
  onWindowResize() {
    if (this.chart) {
      const chartSize = Math.min(window.innerWidth, window.innerHeight) * 0.8;
      this.chart.resize(chartSize, chartSize);
    }
  }




  sendPushNotification(deviceToken: string, message: string) {
    const url = 'https://your-backend-api-endpoint.com/send-push-notification';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = { deviceToken, message };
    return this.http.post(url, body, { headers });
  }

  //Total Possitions
  getTotalPosition() {   
    this.dashboardService.GetTotalPosition(this.data).subscribe((data: any) => {
      this.position = data;
      
    });
  }
  getCandidatesCount() {   
    this.dashboardService. GetCandidatesCount(this.data).subscribe((data: any) => {
      this.candidatesCount = data;
      
    });
  }
  
  getAccount() {
    this.dashboardService.getaccount(this.data).subscribe((res) => {
      this.accountDetails = res;
      console.log('res', res);
      if (this.accountDetails.role == 'RECRUITERMANAGER') {
        sessionStorage.setItem('ReqManId', this.accountDetails.accountId);
        this.postrecruiterman();
        this.requestPermission();
      } else if (this.accountDetails.role == 'RECRUITER') {
        sessionStorage.setItem('ReqId', this.accountDetails.accountId);
        this.postrecruiter();
        this.requestPermission();
      }
    });
  }

  //For getting tokens for getting notifications
  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging, { vapidKey: environment.firebase.vapidKey })
      .then((currentToken) => {
        if (currentToken) {
          console.log('Recruiter!!! we got the token.....');
          console.log(currentToken);
          this.token = currentToken;
          this.sendTokens();

          sessionStorage.setItem('token', currentToken);
        } else {
          console.log(
            'No registration token available. Request permission to generate one.'
          );
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
  }

  //For receiving notifications
  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload: any) => {
      console.log('Message received. ', payload);
      this.message = payload;
      // this.showToast(this.message.notification);
    });
  }

  sendTokens() {
    this.reqManager = sessionStorage.getItem('ReqManId');
    this.recruiter = sessionStorage.getItem('ReqId');

    if (this.reqManager != null) {
      this.dashboardService
        .sendRecrutierManagerToken(this.reqManager, this.token)
        .subscribe(
          (res) => {
            console.log('successfully added');
            this.sended = true;
          },
          (err) => {
            console.log('successfully added');
          }
        );
    } else if (this.recruiter != null) {
      this.dashboardService
        .sendRecrutierToken(this.recruiter, this.token)
        .subscribe((res) => {
          console.log('successfully added');
          this.sended = true;
        });
    }
  }

  //posting the recruitermanagerId
  postrecruiterman() {
    this.Token.recruitermanagerId = this.accountDetails.accountId;
    this.Token.fullName = this.accountDetails.fullName;
    this.dashboardService.PostreqmanagerId(this.Token).subscribe((res: any) => {
      sessionStorage.setItem('tokenId', res.tokenId);
      console.log('successfully ID  added');
    });
    this.recruitermanagertoken();
  }

  //posting the recruiterId
  postrecruiter() {
    this.Tokens.recruiterId = this.accountDetails.accountId;
    this.Tokens.fullName = this.accountDetails.fullName;
    this.dashboardService.PostrecruiterId(this.Tokens).subscribe((res: any) => {
      sessionStorage.setItem('tokenId', res.tokenId);
      console.log('successfully ID  added');
    });
    this.recruitertoken();
  }

  //recruitermanager token
  recruitermanagertoken() {
    this.dashboardService
      .RecruiterManagerToken(
        this.accountDetails.accountId,
        this.token,
        this.token
      )
      .subscribe((res) => {
        console.log('successfully token  added');
      });
  }

  //recruiter token
  recruitertoken() {
    this.dashboardService
      .RecruiterToken(this.accountDetails.accountId, this.token, this.token)
      .subscribe((res) => {
        console.log('successfully token  added');
      });
  }

  option() {
    this.drop = !this.drop;
  }

  //monthly summary
  monthlySummaryGraph(data: any) {
    this.dashboardService
      .GetMonthlySummary(this.data)
      .subscribe((data: any) => {
        this.monthlySummary = data;
        this.thisweek();
      });
  }


  thisweek() {
    const myChart = new Chart('monthlySummary', {
      type: 'bar',
      data: {
        labels: ['1st Week', '2nd Week', '3rd Week', '4th Week'],
        datasets: [
          {
            label: 'Jobs Posted',
            data: [
              this.monthlySummary.firstWeekJobsPosted,
              this.monthlySummary.secondWeekJobsPosted,
              this.monthlySummary.thirdWeekJobsPosted,
              this.monthlySummary.fourthWeekJobsPosted,
            ],
            backgroundColor: ['rgba(3, 133, 15, 0.8)'],
            barThickness: 20,
            barPercentage: 0,
          },
          {
            label: 'Candidate Offered',
            data: [
              this.monthlySummary.firstWeekCandidatesOffered,
              this.monthlySummary.secondWeekCandidatesOffered,
              this.monthlySummary.thirdWeekCandidatesOffered,
              this.monthlySummary.fourthWeekCandidatesOffered,
            ],
            backgroundColor: ['rgba(4, 60, 157, 0.8)'],
            barThickness: 20,
            barPercentage: 0,

          },
        ],
      },

      options: {
        plugins: {
          legend: {
            position: "top",
            labels: {
              boxWidth: 14,
              boxHeight: 14,
              pointStyle: 'rect',

              font: {
                size: 12,
                weight: 'bold',
              },
              padding: 10,

            },
            maxWidth: 2,
          },
        },

        scales: {
          x: {
            grid: {
              display: false, // Remove x-axis grid lines
            },
          },
          y: {
            grid: {
              display: false, // Remove y-axis grid lines
            },
            beginAtZero: true,
            ticks: {
              stepSize: 10,
            },
          },
        },
      },
    });
    const myCharts = new Chart('monthlySummarys', {
      type: 'bar',
      data: {
        labels: ['1st Week', '2nd Week', '3rd Week', '4th Week'],
        datasets: [
          {
            label: 'Jobs Posted',
            data: [
              this.monthlySummary.firstWeekJobsPosted,
              this.monthlySummary.secondWeekJobsPosted,
              this.monthlySummary.thirdWeekJobsPosted,
              this.monthlySummary.fourthWeekJobsPosted,
            ],
            backgroundColor: ['rgba(3, 133, 15, 0.8)'],
            barThickness: 20,
            barPercentage: 0,
          },
          {
            label: 'Candidate Offered',
            data: [
              this.monthlySummary.firstWeekCandidatesOffered,
              this.monthlySummary.secondWeekCandidatesOffered,
              this.monthlySummary.thirdWeekCandidatesOffered,
              this.monthlySummary.fourthWeekCandidatesOffered,
            ],
            backgroundColor: ['rgba(4, 60, 157, 0.8)'],
            barThickness: 20,
            barPercentage: 0,

          },
        ],
      },

      options: {
        plugins: {
          legend: {
            position: "top",
            labels: {
              boxWidth: 14,
              boxHeight: 14,
              pointStyle: 'rect',

              font: {
                size: 12,
                weight: 'bold',
              },
              padding: 10,

            },
            maxWidth: 2,
          },
        },

        scales: {
          x: {
            grid: {
              display: false, // Remove x-axis grid lines
            },
          },
          y: {
            grid: {
              display: false, // Remove y-axis grid lines
            },
            beginAtZero: true,
            ticks: {
              stepSize: 10,
            },
          },
        },
      },
    });
  }
  sourceMixGraph(data: any) {

    this.dashboardService.SourceMix(this.data).subscribe((data: any) => {
      this.sourceMix = data;
      this.totalselected = data.selected
      this.sourceMixAnalysis();

      console.log('soucemix./////+++++++++++++++++...', data);
    });

  }
  innertext(data: number) {
    return {
      id: 'inner',


      afterDatasetsDraw(chart: any, args: any, options: any, cancelable: any) {
        const {
          ctx,
          width,
          height,
          chartArea: { centerX, centerY },
        } = chart;

        ctx.save;

        ctx.font = '20px semibold rubic ';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(JSON.stringify(data), width / 2 - 0, height / 1.8);
        ctx.fillText(' Selected', width / 2 - 0, height / 1.6);

      },
    }
  };
  sourceMixAnalysis() {
    this.overviewCandidate =
      this.sourceMix.overviewSelected == 'NaN'
        ? 0
        : this.sourceMix.overviewSelected;
    this.searchCandidates =
      this.sourceMix.searchSourcedSelected == 'NaN'
        ? 0
        : this.sourceMix.searchSourcedSelected;
    this.appliedCandidates =
      this.sourceMix.appliedSelected == 'NaN'
        ? 0
        : this.sourceMix.appliedSelected;
    // this.totalselected = this.sourceMix.selected;
    const myChart = new Chart('sourceMixChart', {
      type: 'doughnut',
      data: {
        labels: [
          'Added by recruiter',
          'Directly applied',
          'System recommended',
        ],
        datasets: [
          {
            data: [
              this.searchCandidates,
              this.appliedCandidates,
              this.overviewCandidate,
            ],
            backgroundColor: [
              'rgba(254, 163, 0, 0.82)',
              'rgba(109, 191, 199, 0.82)',
              'rgba(255, 35, 46, 0.8)',
            ],
          },
        ],
      },

      plugins: [ChartDataLabels, this.innertext(this.sourceMix.selected)],
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
            },
          },
          datalabels: {
            display: true,
            backgroundColor: '#ffffff',
            borderRadius: 3,
            borderWidth: 1,
            font: {
              weight: 'bold',
            },
            formatter: (value) => {
              return value.toFixed(2) + '%';
            },
          },
        },
      },
    });
    const myCharts = new Chart('sourceMixCharts', {
      type: 'doughnut',
      data: {
        labels: [
          'Added by recruiter',
          'Directly applied',
          'System recommended',
        ],
        datasets: [
          {
            data: [
              this.searchCandidates,
              this.appliedCandidates,
              this.overviewCandidate,
            ],
            backgroundColor: [
              'rgba(254, 163, 0, 0.82)',
              'rgba(109, 191, 199, 0.82)',
              'rgba(255, 35, 46, 0.8)',
            ],
          },
        ],
      },

      plugins: [ChartDataLabels, this.innertext(this.sourceMix.selected)],
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
            },
          },
          datalabels: {
            display: true,
            backgroundColor: '#ffffff',
            borderRadius: 3,
            borderWidth: 1,
            font: {
              weight: 'bold',
            },
            formatter: (value) => {
              return value.toFixed(2) + '%';
            },
          },
        },
      },
    });
  }
  pipelineEngagemet: Array<pipeline> = [];

  getPipelineEngagement() {
    // this.dashboardService
    //   .PipelineEngagement(this.data)
    //   .subscribe((data: any) => {
    //     this.pipelineEngagemet = data;
    //     this.todaychart = this.pipelineEngagemet[0];
    //     this.sevenChart = this.pipelineEngagemet[1];
    //     this.thirtyChart = this.pipelineEngagemet[0];

    //     console.log(
    //       'hiii.....................',
    //       this.pipelineEngagemet[0].candidatesSourced
    //     );
    //     this.todayChart(this.todaychart);
    //     this.last7daysChart(this.sevenChart);
    //     this.last30daysChart(this.thirtyChart);
    //   });
  }

  todayChart(chart: pipeline) {
    let arr = Object.values(chart);
    console.log(arr.filter((s) => s > 0));
    arr = arr.filter((s) => s > 0);
    if (arr.length == 0) {
      const myChart = new Chart('today', {
        type: 'doughnut',
        ...this.emptyChartFiled(),
      });
    } else {
      const myChart = new Chart('today', {
        type: 'doughnut',
        data: {
          datasets: [
            {
              data: [
                chart.candidatesSourced,
                chart.candidatesApplied,
                chart.candidatesShortListed,
                chart.candidatesOffered,
              ],
              // data:[23,34,56,45]
              backgroundColor: [
                'rgba(254, 163, 0, 0.82)',
                'rgba(109, 191, 199, 0.82)',
                'rgba(255, 35, 46, 0.8)',
                'rgba(219, 219, 247, 0.71)',
              ],
            },
          ],

          labels: [],
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
      });
    }
  }

  emptyChartFiled() {
    return {
      data: {
        datasets: [
          {
            data: [100],
            // data:[23,34,56,45]
            backgroundColor: ['#ddad'],
            fill: true,
            hoverOffset: 0,
          },
        ],

        labels: [],
      },
      options: {
        // responsive: true,
        plugins: {
          tooltip: {
            enabled: false, // <-- this option disables tooltips
          },
        },
      },
    };
  }

  last7daysChart(chart: pipeline) {
    let arr = Object.values(chart);
    console.log(arr.filter((s) => s > 0));
    arr = arr.filter((s) => s > 0);
    if (arr.length == 0) {
      const myChart = new Chart('7daysChart', {
        type: 'doughnut',
        ...this.emptyChartFiled(),
      });
    } else {
      const myChart = new Chart('7daysChart', {
        type: 'doughnut',
        data: {
          datasets: [
            {
              data: [
                chart.candidatesSourced,
                chart.candidatesApplied,
                chart.candidatesShortListed,
                chart.candidatesOffered
              ],
              // data:[23,34,56,45]
              backgroundColor: [
                'rgba(254, 163, 0, 0.82)',
                'rgba(109, 191, 199, 0.82)',
                'rgba(255, 35, 46, 0.8)',
                'rgba(219, 219, 247, 0.71)',
              ],
            },
          ],

          labels: [],
        },
      });
    }
  }

  last30daysChart(chart: pipeline) {
    let arr = Object.values(chart);
    console.log(arr.filter((s) => s > 0));
    arr = arr.filter((s) => s > 0);

    if (arr.length == 0) {
      const myChart = new Chart('30daysChart', {
        type: 'doughnut',
        ...this.emptyChartFiled(),
      });
    } else {
      const myChart = new Chart('30daysChart', {
        type: 'doughnut',
        data: {
          datasets: [
            {
              data: [
                chart.candidatesSourced,
                chart.candidatesApplied,
                chart.candidatesShortListed,
                chart.candidatesOffered,
              ],
              // data:[23,34,56,45]
              backgroundColor: [
                'rgba(254, 163, 0, 0.82)',
                'rgba(109, 191, 199, 0.82)',
                'rgba(255, 35, 46, 0.8)',
                'rgba(219, 219, 247, 0.71)',
              ],
            },
          ],

          labels: [],
        },
      });
    }
  }
}
function initTE(arg0: { Carousel: any }) {
  throw new Error('Function not implemented.');
}
