import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { BASE_URL } from './../../shared/constants';
import { LocalstorageService } from './../../shared/localstorage.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
    dispColumns: string[] = ['time', 'bloodSugarLevel', 'carbs', 'insulin', 'mealType'];
    dataList: any = [];
    viewType!: string;
    therapyFG!: FormGroup;
    addTherapyFG!: FormGroup;
    therapyList: any[] = [];
    constructor(private ls: LocalstorageService, private http: HttpClient) { }

    ngOnInit() {
        const firstTime = this.ls.getItem('user').firstTime;
        if (firstTime) {
            this.viewType = 'newTherapy'
            this.therapyFG = new FormGroup({
                type: new FormControl('', [Validators.required]),
                therapy: new FormControl('', [Validators.required]),
                onPills: new FormControl(false, [Validators.required])
            })
        } else {
            this.getData();
        }
    }
    get type(): any {
        return this.therapyFG.get('type');
    }
    get therapy(): any {
        return this.therapyFG.get('therapy');
    }
    get onPills(): any {
        return this.therapyFG.get('onPills');
    }
    getData() {
        // this.dataList = new MatTableDataSource<any>([]);
        // this.viewType = 'list';
        // this.dataList = new MatTableDataSource<any>(this.therapyList);
        this.http.get(`${BASE_URL}/diabetes`).subscribe((res:any) => {
            this.therapyList = res
            this.dataList = new MatTableDataSource<any>(res);
            this.viewType = 'list';
        })
    }
    logout() {
        // TODO: Clear local storeage like token,..
        this.ls.removeItem('token');
        this.ls.removeItem('user');
    }
    postTherapy(therapyFGVals: any) {
        this.http.post(`${BASE_URL}/therapy`, therapyFGVals).subscribe((res) => {
          this.getData();
          const user = this.ls.getItem('user')
          user.firstTime = false
          this.ls.saveItem('user', user);
        })
        // Move below line to above api call
    }
    addNew() {
        this.addTherapyFG = new FormGroup({
            // time: new FormControl('', [Validators.required]),
            bloodSugarLevel: new FormControl(0, [Validators.required]),
            carbs: new FormControl(0, [Validators.required]),
            insulin: new FormControl(0, [Validators.required]),
            mealType: new FormControl('', [Validators.required])
        });
        this.viewType = 'addNewTherapy';
    }
    // get time(): any {
    //     return this.addTherapyFG.get('time');
    // }
    get bloodSugarLevel(): any {
        return this.addTherapyFG.get('bloodSugarLevel');
    }
    get carbs(): any {
        return this.addTherapyFG.get('carbs');
    }
    get insulin(): any {
        return this.addTherapyFG.get('insulin');
    }
    get mealType(): any {
        return this.addTherapyFG.get('mealType');
    }
    postNewReadings(addTherapyFGVals: any) {
        this.http.post(`${BASE_URL}/diabetes`, addTherapyFGVals).subscribe((res) => {
          this.getData();
        })
    }
}
