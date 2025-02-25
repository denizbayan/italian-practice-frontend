import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EventService } from '../_services/event.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit {

  constructor(private eventService: EventService){}

  chartOptions : any
  chartData : any
  events: any = []
  tableData: any =[]

  showDateDetails = false
  selectedDate :any = {}
  selectedDateEvents: any = []

  ngOnInit(): void {
    this.getData()    
  }

  getData(){
    this.eventService.getEvents().subscribe(
      data =>{
        this.events = data 
        this.setChartData()
        this.setChartOptions()
      },
      err  => {
        console.log(err)
      }
    )
  }

  setChartData(){
    const documentStyle = getComputedStyle(document.documentElement);

    const accumulated = this.events.reduce((acc:any, item:any) => {
      if (!acc[item.eventDateStr]) {
        acc[item.eventDateStr] = { count: 0, totalSuccessRate: 0 };
      }
      acc[item.eventDateStr].count += 1;
      acc[item.eventDateStr].totalSuccessRate += item.successRate;
      return acc;
    }, {});

    this.tableData = Object.keys(accumulated).map(date => ({
      Date: date,
      Count: accumulated[date].count,
      averageSuccessRate: 100*accumulated[date].totalSuccessRate / accumulated[date].count
    }));

    console.log(this.tableData)

    this.chartData = {
      labels:  Object.keys(accumulated).map((entry:any) => entry),
      datasets: [
          {
              label:'Average Success Rate',
              type: 'line',
              data: Object.values(accumulated).map((entry:any) => 100*entry.totalSuccessRate/entry.count),
              fill: false,
              borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
              tension: 0.3,
              yAxisID: 'y',
          },
          
          {
            label:'Game Count',
            type: 'bar',
            data: Object.values(accumulated).map((entry:any) => entry.count),
            fill: false,
            borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
            tension: 0.3,
            yAxisID: 'y1',
        }
      ]
    };

  }

  setChartOptions(){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    this.chartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.7,
      plugins: {
          legend: {
              labels: {
                  color: textColor
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          },
          y: {
              type: 'linear',
              display: true,
              position: 'right',
              min:0,
              max:100,
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  drawOnChartArea: false,
                  color: surfaceBorder
              }
          },
          y1: {
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          }
      }
  };
  }

  openDateDetails(){
    this.showDateDetails = true;
    
    this.selectedDateEvents = this.events.filter((event:any) => event.eventDateStr == this.selectedDate.Date);


  }


  closeDateDetails(){

    this.showDateDetails = false;
    this.selectedDateEvents = []

  }


}
