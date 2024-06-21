import { Component } from '@angular/core';
import { FanService } from '../../../tools/services/fan.service';
import { Fan } from '../../../tools/models/fan';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    selector: 'app-get-fan',
    templateUrl: './get-fan.component.html',
    styleUrl: './get-fan.component.scss',
})
export class GetFanComponent {
    fan: Fan | undefined = new Fan();

    constructor(
        private fanService: FanService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        let id = this.activatedRoute.snapshot.paramMap.get('id');
        this.fan = this.fanService.getFan(parseInt(id!));
    }

    updateFan(fan: Fan) {
        this.router.navigateByUrl(`/fan/update/${fan.id}`);
    }

    deleteFan(fan: Fan) {
        this.fanService.removeFan(fan.id);
        this.router.navigateByUrl(`/fan/fans`);
    }
}
