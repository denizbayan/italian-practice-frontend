import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EventService } from '../_services/event.service';
import { EnumGameType } from '../_structs/enums/enum.game_type';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit {

  constructor(private eventService: EventService){}

  chartOptions : any= []
  chartData : any= []
  events: any = []
  tableData: any =[]

  showDateDetails = false
  selectedDate :any = {}
  selectedDateEvents: any = []

  gameTypeOptions : any = [
    { label: "Gli Articoli", value: EnumGameType.ARTICLE},
    { label: "Coniugazione", value: EnumGameType.CONJUGATION},
    { label: "Dizinoraio", value: EnumGameType.DICTIONARY}
  ]
  
  selectedGameType = this.gameTypeOptions[0].value

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
      if (!acc[item.gameType]) {
        acc[item.gameType] = {} ;
        acc[item.gameType][item.eventDateStr] = { count: 0, totalSuccessRate: 0 } 
      }
      if(!acc[item.gameType][item.eventDateStr]){
        acc[item.gameType][item.eventDateStr] = { count: 0, totalSuccessRate: 0 } 
      }
      acc[item.gameType][item.eventDateStr].count += 1;
      acc[item.gameType][item.eventDateStr].totalSuccessRate += item.successRate;
      return acc;
    }, {});

    console.log(accumulated)

    Object.keys(accumulated).forEach(gameType => {
      this.tableData[gameType] = Object.keys(accumulated[gameType]).map(date => ({
        Date: date,
        Count: accumulated[gameType][date].count,
        averageSuccessRate: 100*accumulated[gameType][date].totalSuccessRate / accumulated[gameType][date].count
      }));
    })

    console.log(this.tableData)

    Object.keys(accumulated).forEach(gameType => {
      this.chartData[gameType] = {
        labels:  Object.keys(accumulated[gameType]).map((entry:any) => entry),
        datasets: [
            {
                label:'Average Success Rate',
                type: 'line',
                data: Object.values(accumulated[gameType]).map((entry:any) => 100*entry.totalSuccessRate/entry.count),
                fill: false,
                borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
                tension: 0.3,
                yAxisID: 'y',
            },
            
            {
              label:'Game Count',
              type: 'bar',
              data: Object.values(accumulated[gameType]).map((entry:any) => entry.count),
              fill: false,
              borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
              tension: 0.3,
              yAxisID: 'y1',
          }
        ]
      };
    })
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
